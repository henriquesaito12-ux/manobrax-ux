import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { asset } from '../lib/asset'

const VIEWER_SCRIPT_SRC = 'https://viewer.diagrams.net/js/viewer-static.min.js'
const DRAWIO_URL = asset('/User_Flow_ManobraX.drawio')

// Carrega o script do visualizador oficial do diagrams.net uma única vez por
// sessão (mesmo que o overlay seja aberto/fechado várias vezes) e reaproveita
// a mesma Promise em remontagens seguintes.
let viewerScriptPromise = null
function loadViewerScript() {
  if (window.GraphViewer) return Promise.resolve()
  if (!viewerScriptPromise) {
    viewerScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = VIEWER_SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Falha ao carregar o viewer do diagrams.net'))
      document.body.appendChild(script)
    })
  }
  return viewerScriptPromise
}

function CloseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const MIN_SCALE = 0.05
const MAX_SCALE = 8

function DrawioEmbed() {
  const containerRef = useRef(null)
  const graphRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const el = containerRef.current
    let activeSvg = null

    // Na primeira vez que carrega, o script do viewer também faz seu próprio
    // scan automático de qualquer .mxgraph já presente na página, renderizando
    // um segundo SVG solto dentro do mesmo container — e esse (não o da nossa
    // instância manual) acaba sendo o que fica visível, fazendo nosso pan/zoom
    // (aplicado à instância certa, via `graphRef`) parecer não ter efeito
    // nenhum. Aqui a gente garante que só o SVG da nossa instância sobrevive.
    const observer = new MutationObserver(() => {
      if (!activeSvg) return
      el.querySelectorAll('svg').forEach((svg) => {
        if (svg !== activeSvg) svg.remove()
      })
    })
    observer.observe(el, { childList: true })

    loadViewerScript()
      .then(() => {
        if (cancelled || !el || !window.GraphViewer) return
        // Passar um callback dá acesso à instância real do mxGraph (viewer.graph),
        // que é o que permite fazer zoom centrado no cursor e pan manual — os
        // botões da toolbar sozinhos só dão zoom fixo no centro do diagrama.
        window.GraphViewer.createViewerForElement(el, (viewer) => {
          if (cancelled) return
          graphRef.current = viewer.graph
          activeSvg = viewer.graph.view.getCanvas().ownerSVGElement
          el.querySelectorAll('svg').forEach((svg) => {
            if (svg !== activeSvg) svg.remove()
          })
        })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    // Zoom com a roda do mouse, centrado no ponteiro: calcula o ponto do
    // diagrama que está sob o cursor antes de mudar a escala e ajusta o
    // translate pra manter esse mesmo ponto sob o cursor depois.
    function handleWheel(e) {
      const graph = graphRef.current
      if (!graph) return
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const view = graph.view
      const oldScale = view.scale
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, oldScale * factor))
      if (newScale === oldScale) return
      const graphX = cx / oldScale - view.translate.x
      const graphY = cy / oldScale - view.translate.y
      view.scaleAndTranslate(newScale, cx / newScale - graphX, cy / newScale - graphY)
    }
    el?.addEventListener('wheel', handleWheel, { passive: false })

    // Arrastar pra fazer pan. O panningHandler nativo do mxGraph só entra em
    // ação sobre área vazia do canvas — como o diagrama é quase todo coberto
    // por raias (que também são células), na prática ele quase nunca
    // disparava. Aqui o pan é feito manualmente, movendo o translate da view
    // proporcionalmente ao arrasto, não importa o que tenha sob o cursor.
    let pan = null
    function handleMouseDown(e) {
      const graph = graphRef.current
      if (!graph || e.button !== 0) return
      pan = {
        startX: e.clientX,
        startY: e.clientY,
        tx: graph.view.translate.x,
        ty: graph.view.translate.y,
        scale: graph.view.scale,
      }
      el.style.cursor = 'grabbing'
    }
    function handleMouseMove(e) {
      if (!pan) return
      const graph = graphRef.current
      if (!graph) return
      e.preventDefault()
      const dx = (e.clientX - pan.startX) / pan.scale
      const dy = (e.clientY - pan.startY) / pan.scale
      graph.view.setTranslate(pan.tx + dx, pan.ty + dy)
    }
    function handleMouseUp() {
      if (!pan) return
      pan = null
      el.style.cursor = ''
    }
    el?.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      cancelled = true
      observer.disconnect()
      el?.removeEventListener('wheel', handleWheel)
      el?.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      graphRef.current = null
      // O StrictMode do React roda este efeito duas vezes em dev (monta,
      // desmonta, monta de novo); sem isso o GraphViewer insere o diagrama
      // uma segunda vez dentro do mesmo container, duplicando-o.
      if (el) {
        while (el.firstChild) el.removeChild(el.firstChild)
      }
    }
  }, [])

  if (failed) {
    return (
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="max-w-sm text-[13px] text-secondary">
          Não foi possível carregar o fluxo interativo — verifique sua conexão.
        </p>
        <a href={DRAWIO_URL} className="text-[12px] font-medium text-ink underline underline-offset-2">
          Abrir o arquivo .drawio
        </a>
      </div>
    )
  }

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={containerRef}
        className="mxgraph h-full w-full cursor-grab"
        style={{ maxWidth: '100%', border: 'none' }}
        data-mxgraph={JSON.stringify({
          highlight: '#0000ff',
          lightbox: false,
          nav: true,
          resize: true,
          toolbar: 'zoom layers lightbox',
          edit: '_blank',
          url: DRAWIO_URL,
        })}
      />
    </div>
  )
}

export default function FlowDiagram({ onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-12 pt-6 pb-4 md:px-16 md:pt-7">
        <div className="flex items-center gap-3">
          <Logo onClick={onClose} />
          <span className="h-4 w-px shrink-0 bg-border" />
          <span className="text-[13px] font-medium text-secondary">Fluxo completo — Jornada do Manobra X</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border-[0.5px] border-border px-3 py-1.5 text-[12px] text-ink transition-colors duration-150 hover:bg-row-hover"
        >
          <CloseIcon />
          Voltar à capa
        </button>
      </div>

      <DrawioEmbed />
    </div>
  )
}
