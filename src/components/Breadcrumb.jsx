import { DOT_CLASSES } from '../lib/accents'

export default function Breadcrumb({ color = 'neutral', phase, step }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted mb-4 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASSES[color]}`} />
      <strong className="text-secondary font-medium">{phase}</strong>
      {step && <span>→ {step}</span>}
    </div>
  )
}
