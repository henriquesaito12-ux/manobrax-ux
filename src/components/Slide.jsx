import Logo from './Logo'

export default function Slide({
  position,
  headerTitle,
  headerRight,
  current,
  total,
  showCounter = true,
  bottomBar = false,
  headerGap = 'mb-6',
  onLogoClick,
  children,
}) {
  const state =
    position === 'active'
      ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
      : position === 'prev'
        ? 'opacity-0 -translate-x-8 z-0 pointer-events-none'
        : 'opacity-0 translate-x-8 z-0 pointer-events-none'

  return (
    <div
      className={`absolute inset-0 flex flex-col px-12 pt-6 pb-10 md:px-16 md:pt-7 md:pb-12 bg-bg transition-all duration-300 ease-out ${state}`}
    >
      <div className={`flex items-center justify-between pb-4 ${headerGap} border-b border-border shrink-0`}>
        <div className="flex items-center gap-3 min-w-0">
          <Logo onClick={onLogoClick} />
          {headerTitle && (
            <>
              <span className="w-px h-4 bg-border shrink-0" />
              <span className="text-[13px] font-medium text-secondary truncate">{headerTitle}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {headerRight}
          {showCounter && (
            <span className="text-xs text-muted tabular-nums">
              {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">{children}</div>

      {bottomBar && (
        <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-brand-green" />
      )}
    </div>
  )
}
