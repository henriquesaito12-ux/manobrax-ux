import { useState } from 'react'
import { TYPE_LABELS, TYPE_BG_CLASSES, TYPE_TEXT_CLASSES } from '../lib/accents'
import { asset } from '../lib/asset'
import ArrowRight from './ArrowRight'
import TypeIcon from './TypeIcon'
import DeviceIcon from './DeviceIcon'
import PhotoIcon from './PhotoIcon'
import LinkIcon from './LinkIcon'
import ChevronIcon from './ChevronIcon'
import Lightbox from './Lightbox'

function classify(steps) {
  return steps.map((step) => {
    if (step.decision) return { kind: 'decision', step }
    if (step.wireframe) return { kind: 'wireframe', step }
    if (step.minimal) return { kind: 'entry', step }
    return { kind: 'arrow', step }
  })
}

// Insere um conector simples entre dois cards de wireframe adjacentes
// (quando não há um passo automático entre eles nos dados), e um conector
// rotulado "NÃO" logo após um nó de decisão (o SIM já é resolvido dentro do
// próprio losango, como um ramo pra baixo).
function withBridges(items, bridgeTooltip) {
  const result = []
  items.forEach((it, i) => {
    result.push(it)
    const next = items[i + 1]
    if (it.kind === 'wireframe' && next?.kind === 'wireframe') {
      result.push({ kind: 'arrow', step: bridgeTooltip ? { tooltip: bridgeTooltip } : null })
    }
    if (it.kind === 'decision' && next) {
      result.push({
        kind: 'arrow',
        step: { label: it.step.decision?.noLabel || 'NÃO', labelColor: '#854F0B' },
      })
    }
  })
  return result
}

// Remove setas soltas nas pontas (sem card de um dos lados pra conectar).
function trimEdgeArrows(items) {
  let start = 0
  while (start < items.length && items[start].kind === 'arrow') start++
  let end = items.length
  while (end > start && items[end - 1].kind === 'arrow') end--
  return items.slice(start, end)
}

function MiniInfoCard({ icon, label }) {
  return (
    <div className="flex-1 min-w-0 flex items-center gap-1.5 bg-bg rounded-lg px-2 py-1.5">
      {icon}
      <span className="text-[11px] font-medium text-ink truncate">{label}</span>
    </div>
  )
}

function DataBadge({ label }) {
  return (
    <span
      className="absolute -top-2.5 right-3 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-medium leading-none"
      style={{ backgroundColor: '#1F1912', color: '#EFEEE6' }}
    >
      <LinkIcon size={9} />
      {label}
    </span>
  )
}

function StatusBadge({ hasV1, showingV1, onClick }) {
  if (hasV1) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-semibold leading-none bg-ink text-bg hover:opacity-90 transition-opacity duration-150"
      >
        {showingV1 ? 'Ver Wireframe' : 'Ver V1'}
      </button>
    )
  }
  return (
    <span
      className="shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-semibold leading-none text-muted"
      style={{ borderColor: '#DAD8CC' }}
    >
      Ainda sem tela
    </span>
  )
}

function VersionRow({ version, onClick, active }) {
  const { available } = version
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex items-start gap-2 text-left rounded-md -mx-1 px-1 py-[1px] transition-colors duration-150 ${
        onClick ? 'cursor-pointer hover:bg-row-hover' : ''
      } ${active ? 'bg-row-hover' : ''}`}
    >
      <span
        className={`shrink-0 rounded-full px-1.5 py-[1px] text-[9px] font-semibold leading-[1.5] ${
          available ? 'bg-ink text-bg' : 'border text-muted'
        }`}
        style={available ? undefined : { borderColor: '#DAD8CC' }}
      >
        {version.version}
      </span>
      <div className="min-w-0 flex-1 flex items-start justify-between gap-2">
        <div className="text-[9.5px] text-ink leading-[1.3]">{version.description}</div>
        <span
          className={`shrink-0 rounded-full px-1.5 py-[1px] text-[8.5px] font-medium leading-[1.5] ${
            available ? '' : 'bg-bg text-muted'
          }`}
          style={available ? { backgroundColor: '#EAF7EE', color: '#0F6E56' } : undefined}
        >
          {available ? 'Disponível' : 'Não iniciado'}
        </span>
      </div>
    </Tag>
  )
}

function ViewToggle({ view, onSelect, options }) {
  return (
    <div className="shrink-0 flex items-center gap-1">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onSelect(opt.key)}
          className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold leading-none transition-colors duration-150 ${
            view === opt.key ? 'bg-ink text-bg' : 'border text-muted hover:text-ink'
          }`}
          style={view === opt.key ? undefined : { borderColor: '#DAD8CC' }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function WireframeCard({ step, wireH, legacyH, cardH, onImageClick, onNavigatePhase }) {
  const wf = step.wireframe
  const [view, setView] = useState(wf.defaultView || 'base') // 'base' | 'v1' | 'v2' | 'v3'
  const hasV1 = Boolean(wf.v1Image)
  const hasV2 = Boolean(wf.v2Image)
  const hasPersonaRow = wf.persona || wf.dispositivo
  const hasWireframeImage = Boolean(wf.image || wf.v1Image || wf.v2Image || wf.v3Image)

  const viewImages = {
    base: { image: wf.image, alt: wf.imageAlt },
    v1: wf.v1Image ? { image: wf.v1Image, alt: wf.v1ImageAlt || wf.imageAlt } : null,
    v2: wf.v2Image ? { image: wf.v2Image, alt: wf.v2ImageAlt || wf.imageAlt } : null,
    v3: wf.v3Image ? { image: wf.v3Image, alt: wf.v3ImageAlt || wf.imageAlt } : null,
  }
  const currentView = viewImages[view] || viewImages.base
  const currentImage = currentView.image ? asset(currentView.image) : null
  const currentAlt = currentView.alt
  const legacyImage = wf.legacyImage ? asset(wf.legacyImage) : null

  const viewOptions =
    wf.viewOptions ||
    [
      { key: 'base', label: 'V1' },
      { key: 'v2', label: 'V2' },
    ]
  const versionViewMap = wf.versionViewMap || { V1: 'base', V2: 'v2' }

  return (
    <div
      style={{ minHeight: cardH }}
      className="relative flex-1 min-w-0 flex flex-col rounded-xl border border-[0.5px] border-border bg-card p-2.5 overflow-x-hidden"
    >
      {wf.dataBadge && <DataBadge label={wf.dataBadge} />}

      <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
        <div className="text-[12px] font-medium text-ink leading-snug truncate">{step.title}</div>
        {!wf.hideBadge && (
          hasV2 ? (
            <ViewToggle view={view} onSelect={setView} options={viewOptions} />
          ) : (
            <StatusBadge
              hasV1={hasV1}
              showingV1={view === 'v1'}
              onClick={() => setView((v) => (v === 'v1' ? 'base' : 'v1'))}
            />
          )
        )}
      </div>

      {hasWireframeImage && (
      <div
        style={{ height: wireH }}
        className="relative rounded-lg bg-bg overflow-hidden mb-1.5 shrink-0"
      >
        {wf.tag && (
          <span
            className="absolute top-1.5 left-1.5 z-20 rounded-full px-2 py-0.5 text-[8px] font-medium leading-none"
            style={{ backgroundColor: '#EEE6D3', color: '#854F0B' }}
          >
            {wf.tag}
          </span>
        )}

        <div
          onClick={currentImage ? () => onImageClick({ src: currentImage, alt: currentAlt }) : undefined}
          className={`absolute inset-0 flex items-center justify-center ${
            currentImage ? 'cursor-zoom-in hover:opacity-90 transition-opacity duration-150' : ''
          }`}
        >
          {currentImage ? (
            <img src={currentImage} alt={currentAlt} className="max-w-full max-h-full object-contain" />
          ) : (
            <PhotoIcon size={20} className="text-muted" />
          )}
        </div>
      </div>
      )}

      {hasPersonaRow && (
        <div className="flex gap-2 mb-1.5 shrink-0">
          {wf.persona && (
            <MiniInfoCard icon={<TypeIcon type="human" size={14} className="shrink-0 text-muted" />} label={wf.persona} />
          )}
          {wf.dispositivo && (
            <MiniInfoCard
              icon={<DeviceIcon device={wf.dispositivo} size={14} className="shrink-0 text-muted" />}
              label={wf.dispositivo}
            />
          )}
        </div>
      )}

      <div className="text-[11px] text-secondary leading-[1.35] line-clamp-2">{wf.resolve}</div>

      <div className="mt-2 pt-2 border-t border-border shrink-0">
        <div className="text-[10px] font-medium uppercase tracking-wide text-muted mb-1">
          Como é hoje
        </div>
        {legacyImage && (
          <div
            style={{ height: legacyH }}
            onClick={() => onImageClick({ src: legacyImage, alt: `Como é hoje — ${step.title}` })}
            className="rounded-lg overflow-hidden mb-1 bg-legacy flex items-center justify-center cursor-zoom-in hover:opacity-90 transition-opacity duration-150"
          >
            <img
              src={legacyImage}
              alt={`Como é hoje — ${step.title}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        {wf.legacyCaption && (
          <div className="text-[10px] text-muted leading-[1.3] line-clamp-2">{wf.legacyCaption}</div>
        )}
      </div>

      {(wf.versionsLink || (wf.versions && wf.versions.length > 0)) && (
        <div className="pt-2 mt-2 border-t border-border shrink-0">
          <div className="text-[9px] font-semibold uppercase tracking-wide text-muted mb-1">
            Versionamento
          </div>
          {wf.versionsLink ? (
            <button
              type="button"
              onClick={() => onNavigatePhase?.(wf.versionsLink.targetPhase)}
              className="w-full flex items-center justify-between gap-2 rounded-md -mx-1 px-1 py-1 text-left text-[10px] font-medium text-ink transition-colors duration-150 hover:bg-row-hover"
            >
              {wf.versionsLink.label}
              <ChevronIcon size={10} className="shrink-0 -rotate-90 text-muted" />
            </button>
          ) : (
          <div className="flex flex-col gap-0.5">
            {wf.versions.map((v) => {
              const targetView = versionViewMap[v.version] || null
              const clickable = hasV2 && targetView
              return (
                <VersionRow
                  key={v.version}
                  version={v}
                  onClick={clickable ? () => setView(targetView) : undefined}
                  active={clickable && view === targetView}
                />
              )
            })}
          </div>
          )}
        </div>
      )}
    </div>
  )
}

function ArrowDown({ size = 14, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  )
}

function Connector({ step }) {
  return (
    <div className="w-10 shrink-0 flex flex-col items-center justify-center gap-1">
      {step?.label && (
        <span className="text-[9px] font-semibold leading-none" style={{ color: step.labelColor || '#8A8980' }}>
          {step.label}
        </span>
      )}
      <div className="group relative flex items-center justify-center">
        <ArrowRight size={16} className="text-muted transition-colors duration-150 group-hover:text-ink" />
        {step?.tooltip && (
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-[150px] -translate-x-1/2 rounded-md bg-ink px-2.5 py-2 text-center text-[11px] leading-snug text-bg opacity-0 invisible transition-opacity duration-150 group-hover:opacity-100 group-hover:visible z-10">
            {step.tooltip}
          </div>
        )}
      </div>
    </div>
  )
}

function EntryCard({ step }) {
  return (
    <div className="flex-none w-[120px] shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center bg-brand-green/50">
      <ArrowRight size={16} className="text-ink" />
      <div className="text-[11px] font-medium text-ink leading-snug">{step.title}</div>
    </div>
  )
}

function BoundaryCard({ step, className = '' }) {
  return (
    <div
      className={`flex-1 min-w-0 flex flex-col items-center justify-center rounded-xl px-3 py-2.5 text-center ${TYPE_BG_CLASSES[step.type]} ${className}`}
    >
      <TypeIcon type={step.type} size={14} className={`mb-1.5 ${TYPE_TEXT_CLASSES[step.type]}`} />
      <div className={`text-[10px] font-medium mb-1 ${TYPE_TEXT_CLASSES[step.type]}`}>
        {TYPE_LABELS[step.type]}
      </div>
      <div className="text-[11px] font-medium text-ink leading-snug">{step.title}</div>
    </div>
  )
}

function DecisionNode({ step }) {
  const d = step.decision
  return (
    <div className="flex-none w-[168px] shrink-0 flex flex-col items-center justify-center gap-2">
      {d.badge && (
        <span
          className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-medium leading-none"
          style={{ backgroundColor: '#1F1912', color: '#EFEEE6' }}
        >
          <LinkIcon size={9} />
          {d.badge}
        </span>
      )}

      <div className="relative w-[148px] h-[148px] shrink-0 flex items-center justify-center">
        <div
          className="absolute w-[104px] h-[104px] rounded-[6px]"
          style={{ backgroundColor: '#EEE6D3', border: '1px solid #E3D3AC', transform: 'rotate(45deg)' }}
        />
        <div className="relative z-10 px-6 text-center text-[10px] font-medium leading-snug" style={{ color: '#1F1912' }}>
          {step.title}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] font-semibold leading-none" style={{ color: '#0F6E56' }}>
          {d.simLabel || 'SIM'}
        </span>
        <ArrowDown size={13} className="shrink-0 text-[#0F6E56]" />
        <div
          className="rounded-lg px-3 py-1 text-[11px] font-semibold leading-snug"
          style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
        >
          {d.simTarget || 'Fase 1'}
        </div>
      </div>
    </div>
  )
}

export default function PhaseFlow({ steps, compact, bridgeTooltip, endTooltip, alignTop = false, onNavigatePhase }) {
  const [lightbox, setLightbox] = useState(null)
  const wireH = compact ? 90 : 116
  const legacyH = compact ? 54 : 68
  const cardH = compact ? 310 : 355
  const hasAnyWireframe = steps.some((s) => s.wireframe)
  const justify = alignTop ? 'justify-start' : 'justify-[safe_center]'

  if (!hasAnyWireframe) {
    return (
      <div className={`flex-1 flex flex-col ${justify} min-h-0 overflow-y-auto overflow-x-hidden`}>
        <div className="flex items-stretch gap-2.5">
          {steps.map((step, i) => (
            <BoundaryCard key={i} step={step} className="py-6" />
          ))}
        </div>
      </div>
    )
  }

  const trimmedItems = trimEdgeArrows(withBridges(classify(steps), bridgeTooltip))
  const items = endTooltip
    ? [...trimmedItems, { kind: 'arrow', step: { tooltip: endTooltip } }]
    : trimmedItems

  return (
    <div className={`flex-1 flex flex-col ${justify} min-h-0 overflow-y-auto overflow-x-hidden`}>
      <div className="flex items-stretch gap-2.5 shrink-0">
        {items.map((it, i) => {
          if (it.kind === 'wireframe') {
            return (
              <WireframeCard
                key={i}
                step={it.step}
                wireH={wireH}
                legacyH={legacyH}
                cardH={cardH}
                onImageClick={setLightbox}
                onNavigatePhase={onNavigatePhase}
              />
            )
          }
          if (it.kind === 'decision') {
            return <DecisionNode key={i} step={it.step} />
          }
          if (it.kind === 'entry') {
            return <EntryCard key={i} step={it.step} />
          }
          return <Connector key={i} step={it.step} />
        })}
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
