const ITEMS = [
  { type: 'human', label: 'Ação humana', dot: 'bg-human' },
  { type: 'green', label: 'Integração automática', dot: 'bg-brand-green' },
  { type: 'amber', label: 'Regra do sistema', dot: 'bg-amber' },
]

export default function ColorLegend({ size = 'default' }) {
  const compact = size === 'compact'
  return (
    <div className={`flex items-center gap-5 ${compact ? '' : 'gap-6'}`}>
      {ITEMS.map((it) => (
        <div key={it.type} className="flex items-center gap-2">
          <span className={`rounded-[2px] shrink-0 ${it.dot} ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} />
          <span className={`text-secondary ${compact ? 'text-[10.5px]' : 'text-xs'}`}>{it.label}</span>
        </div>
      ))}
    </div>
  )
}
