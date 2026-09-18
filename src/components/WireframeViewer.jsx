import { useEffect } from 'react'
import Logo from './Logo'
import { asset } from '../lib/asset'

const WIREFRAME_URL = asset('/navegavel/index.html')

function CloseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function WireframeViewer({ onClose }) {
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
          <span className="text-[13px] font-medium text-secondary">Wireframe navegável — Manobra X</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border-[0.5px] border-border px-3 py-1.5 text-[12px] text-ink transition-colors duration-150 hover:bg-row-hover"
        >
          <CloseIcon />
          Voltar à apresentação
        </button>
      </div>

      <iframe
        src={WIREFRAME_URL}
        title="Wireframe navegável"
        className="min-h-0 flex-1 w-full border-none"
      />
    </div>
  )
}
