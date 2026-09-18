function StatusChip({ status }) {
  if (!status) return null
  const inProgress = status === 'Em andamento'
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${
        inProgress ? 'bg-amber-bg text-amber' : 'bg-bg text-muted'
      }`}
    >
      {status}
    </span>
  )
}

export default function MacroRow({ name, description, summary, status, onClick, last }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full flex items-center gap-6 px-4 py-4 text-left cursor-pointer transition-colors duration-150 hover:bg-row-hover ${
        last ? '' : 'border-b-[0.5px] border-border'
      }`}
    >
      <div className="w-[190px] shrink-0">
        <div className="text-[13px] font-medium text-ink leading-snug">{name}</div>
        <div className="text-[13px] text-secondary leading-snug">{description}</div>
      </div>

      <div className="flex-1 min-w-0 text-[13px] text-secondary leading-relaxed">{summary}</div>

      <StatusChip status={status} />

      <svg
        className="shrink-0 text-ink/40 transition-all duration-150 group-hover:text-ink group-hover:translate-x-[3px]"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="5 2.5 10.5 7 5 11.5" />
      </svg>
    </button>
  )
}
