const PATHS = {
  human: (
    <>
      <circle cx="7" cy="4.2" r="2.2" />
      <path d="M2.2 12.4c0-2.6 2.1-4.2 4.8-4.2s4.8 1.6 4.8 4.2" />
    </>
  ),
  green: (
    <>
      <path d="M2.5 6.2A4.7 4.7 0 0 1 11 4" />
      <polyline points="11.4 1.6 11.4 4.4 8.6 4.4" />
      <path d="M11.5 7.8A4.7 4.7 0 0 1 3 10" />
      <polyline points="2.6 12.4 2.6 9.6 5.4 9.6" />
    </>
  ),
  amber: (
    <>
      <path d="M7 1.6 12 3.4v3.4c0 3.1-2.1 5.4-5 6.6-2.9-1.2-5-3.5-5-6.6V3.4Z" />
      <path d="M4.9 7 6.3 8.4 9.3 5.4" />
    </>
  ),
}

export default function TypeIcon({ type, className = '', size = 13 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[type]}
    </svg>
  )
}
