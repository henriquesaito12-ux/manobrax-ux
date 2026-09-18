import { useEffect } from 'react'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    // Esconde as setas de navegação de slide enquanto a imagem em tela cheia
    // estiver aberta (ver regra .lightbox-open .nav-arrows no index.css).
    document.body.classList.add('lightbox-open')
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('lightbox-open')
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-10 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg/10 hover:bg-bg/20 text-bg flex items-center justify-center transition-colors duration-150"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
