import Breadcrumb from './Breadcrumb'
import MacroRow from './MacroRow'

export default function SlideVisaoMacro({ title, phases, onSelectPhase }) {
  return (
    <>
      <Breadcrumb color="neutral" phase="Visão geral" step="As 4 fases da jornada" />
      <h2 className="text-[24px] font-medium text-ink tracking-[-0.01em] mb-2 shrink-0">
        {title}
      </h2>
      <p className="text-sm text-secondary mb-6 shrink-0">
        Cada fase reúne um conjunto de passos — clique em uma fase para ver o detalhe.
      </p>

      <div className="flex-1 flex flex-col justify-center min-h-0">
        {phases.map((p, i) => (
          <MacroRow
            key={p.phaseLabel}
            name={p.name}
            description={p.description}
            summary={p.summary}
            status={p.status}
            last={i === phases.length - 1}
            onClick={() => onSelectPhase?.(p.phaseLabel)}
          />
        ))}
      </div>
    </>
  )
}
