import { useEffect, useState } from 'react'
import Slide from './components/Slide'
import SlideVisaoMacro from './components/SlideVisaoMacro'
import SlideFase from './components/SlideFase'
import NavArrows from './components/NavArrows'
import FlowDiagram from './components/FlowDiagram'
import WireframeViewer from './components/WireframeViewer'
import SitemapIcon from './components/SitemapIcon'
import DeviceIcon from './components/DeviceIcon'
import ChevronIcon from './components/ChevronIcon'
import { slides } from './data/slides'

const MANOBRA_X_BADGE = (
  <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Manobra X</span>
)

function FlowButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-lg border-[0.5px] border-border px-3 py-1.5 text-[12px] text-ink transition-colors duration-150 hover:bg-row-hover"
    >
      <SitemapIcon size={14} className="text-ink" />
      Ver fluxo
      <ChevronIcon size={12} className="-rotate-90 text-ink" />
    </button>
  )
}

function WireframeButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-lg border-[0.5px] border-border px-3 py-1.5 text-[12px] text-ink transition-colors duration-150 hover:bg-row-hover"
    >
      <DeviceIcon size={14} className="text-ink" />
      Ver wireframe navegável
      <ChevronIcon size={12} className="-rotate-90 text-ink" />
    </button>
  )
}

function renderSlideContent(s, onSelectPhase) {
  switch (s.type) {
    case 'macro':
      return <SlideVisaoMacro {...s} onSelectPhase={onSelectPhase} />
    case 'fase':
      return <SlideFase {...s} onNavigatePhase={onSelectPhase} />
    default:
      return null
  }
}

function slideChrome(s, onOpenFlow, onOpenWireframe) {
  if (s.type === 'macro') {
    return {
      showCounter: false,
      headerRight: (
        <div className="flex items-center gap-3">
          {MANOBRA_X_BADGE}
          <WireframeButton onClick={onOpenWireframe} />
          <FlowButton onClick={onOpenFlow} />
        </div>
      ),
    }
  }
  if (s.type === 'fase') {
    return {
      headerTitle: `Fase ${s.phaseNumber} — ${s.phaseName}`,
      headerGap: 'mb-12',
    }
  }
  return {}
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [flowOpen, setFlowOpen] = useState(false)
  const [wireframeOpen, setWireframeOpen] = useState(false)
  const total = slides.length
  const isMacro = slides[current]?.type === 'macro'

  useEffect(() => {
    function onKeyDown(e) {
      if (flowOpen || wireframeOpen) {
        if (e.key === 'Escape') {
          e.preventDefault()
          setFlowOpen(false)
          setWireframeOpen(false)
        }
        return
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrent((c) => Math.min(c + 1, total - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrent((c) => Math.max(c - 1, 0))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [total, flowOpen, wireframeOpen])

  const next = () => setCurrent((c) => Math.min(c + 1, total - 1))
  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const goToStart = () => setCurrent(0)

  const jumpToPhase = (phaseLabel) => {
    const idx = slides.findIndex((s) => s.phaseLabel === phaseLabel)
    if (idx !== -1) setCurrent(idx)
    setFlowOpen(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-ink">
      {slides.map((s, i) => (
        <Slide
          key={i}
          position={i === current ? 'active' : i < current ? 'prev' : 'next'}
          current={i + 1}
          total={total}
          onLogoClick={goToStart}
          {...slideChrome(s, () => setFlowOpen(true), () => setWireframeOpen(true))}
        >
          {renderSlideContent(s, jumpToPhase)}
        </Slide>
      ))}
      {!isMacro && <NavArrows onPrev={prev} onNext={next} showNext={current < total - 1} />}
      {flowOpen && (
        <FlowDiagram
          onClose={() => {
            setFlowOpen(false)
            setCurrent(0)
          }}
        />
      )}
      {wireframeOpen && <WireframeViewer onClose={() => setWireframeOpen(false)} />}
    </div>
  )
}
