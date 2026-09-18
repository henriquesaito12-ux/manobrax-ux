export default function NavArrows({ onPrev, onNext, showPrev = true, showNext = true }) {
  return (
    <div className="nav-arrows">
      {showPrev && (
        <button
          onClick={onPrev}
          aria-label="Slide anterior"
          className="fixed top-1/2 -translate-y-1/2 left-4 md:left-6 w-9 h-9 rounded-full bg-bg/90 border border-border flex items-center justify-center text-muted hover:text-ink hover:border-secondary/40 transition-colors z-20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {showNext && (
        <button
          onClick={onNext}
          aria-label="Próximo slide"
          className="fixed top-1/2 -translate-y-1/2 right-4 md:right-6 w-9 h-9 rounded-full bg-bg/90 border border-border flex items-center justify-center text-muted hover:text-ink hover:border-secondary/40 transition-colors z-20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
