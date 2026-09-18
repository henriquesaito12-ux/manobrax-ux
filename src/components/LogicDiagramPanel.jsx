import SitemapIcon from './SitemapIcon'
import ChevronIcon from './ChevronIcon'

function DiagramBox({ bg, color, className = '', children }) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-[11px] font-medium text-center leading-snug ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </div>
  )
}

function ArrowDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted shrink-0"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  )
}

export default function LogicDiagramPanel({ note, diagram, open, onToggle }) {
  return (
    <div className="shrink-0 mb-5">
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-[560px] text-[12px] text-muted leading-snug">{note}</p>
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border-[0.5px] border-border px-3 py-1.5 text-[12px] text-ink hover:bg-row-hover transition-colors duration-150"
        >
          <SitemapIcon size={14} className="text-ink" />
          Ver lógica completa
          <ChevronIcon
            size={12}
            className={`text-ink transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div
        className="overflow-hidden transition-[max-height] duration-[250ms] ease-out"
        style={{ maxHeight: open ? 640 : 0 }}
      >
        <div className="mt-4 rounded-[10px] border-[0.5px] border-border bg-card p-5 flex flex-col items-center gap-2">
          <DiagramBox bg="#E3E1D5" color="#1F1912" className="w-[220px]">
            {diagram.trigger}
          </DiagramBox>
          <ArrowDown />
          <DiagramBox bg="#EEE6D3" color="#854F0B" className="w-[220px]">
            {diagram.check}
          </DiagramBox>
          <ArrowDown />

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold" style={{ color: '#0F6E56' }}>
                {diagram.yes.label}
              </span>
              <DiagramBox bg="#E1F5EE" color="#0F6E56" className="w-[190px]">
                {diagram.yes.text}
              </DiagramBox>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold" style={{ color: '#854F0B' }}>
                {diagram.no.label}
              </span>
              <DiagramBox bg="#EEE6D3" color="#854F0B" className="w-[190px]">
                {diagram.no.text}
              </DiagramBox>
            </div>
          </div>

          <ArrowDown />
          <DiagramBox bg="#E3E1D5" color="#1F1912" className="w-[220px]">
            {diagram.outcome}
          </DiagramBox>
        </div>
      </div>
    </div>
  )
}
