import { useState } from 'react'
import PhaseFlow from './PhaseFlow'
import LogicDiagramPanel from './LogicDiagramPanel'

export default function SlideFase({ note, steps, logicDiagram, bridgeTooltip, endTooltip, onNavigatePhase }) {
  const [diagramOpen, setDiagramOpen] = useState(false)
  const wireframeCount = steps.filter((s) => s.wireframe).length
  const compact = wireframeCount >= 4

  if (logicDiagram) {
    return (
      <div className={`flex-1 min-h-0 flex flex-col ${diagramOpen ? 'overflow-y-auto' : ''}`}>
        <LogicDiagramPanel
          note={note}
          diagram={logicDiagram}
          open={diagramOpen}
          onToggle={() => setDiagramOpen((o) => !o)}
        />
        <PhaseFlow
          steps={steps}
          compact={compact}
          bridgeTooltip={bridgeTooltip}
          endTooltip={endTooltip}
          alignTop={diagramOpen}
          onNavigatePhase={onNavigatePhase}
        />
      </div>
    )
  }

  return (
    <>
      {note && <p className="shrink-0 text-[13px] text-secondary mb-5">{note}</p>}
      <PhaseFlow steps={steps} compact={compact} endTooltip={endTooltip} onNavigatePhase={onNavigatePhase} />
    </>
  )
}
