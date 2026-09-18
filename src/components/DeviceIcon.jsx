export default function DeviceIcon({ device, size = 14, className = '' }) {
  const isTablet = /tablet/i.test(device || '')

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
      {isTablet ? (
        <>
          <rect x="3" y="1" width="8" height="12" rx="1.2" />
          <line x1="6" y1="10.8" x2="8" y2="10.8" />
        </>
      ) : (
        <>
          <rect x="1.4" y="2" width="11.2" height="7.6" rx="1" />
          <line x1="5" y1="12" x2="9" y2="12" />
          <line x1="7" y1="9.6" x2="7" y2="12" />
        </>
      )}
    </svg>
  )
}
