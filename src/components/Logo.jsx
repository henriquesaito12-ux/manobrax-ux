import { asset } from '../lib/asset'

export default function Logo({ className = '', onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex items-center gap-2.5 shrink-0 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-150' : ''} ${className}`}
    >
      <img src={asset('/skopia-logo.png')} alt="Skopia" className="h-[18px] w-auto shrink-0" />
      <span className="h-4 w-px shrink-0 bg-border" />
      <img src={asset('/logovli.png')} alt="VLI" className="h-[36px] w-auto shrink-0" />
    </Tag>
  )
}
