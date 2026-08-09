export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 2L24 6.5V13.5C24 19.5 19.8 24.8 14 26.5C8.2 24.8 4 19.5 4 13.5V6.5L14 2Z"
          fill="#2563EB"
        />
        <path
          d="M10.5 14.2L12.8 16.5L17.8 11.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[17px] font-bold tracking-[-0.02em] text-[#2563EB]">eSaleAgreement</span>
    </div>
  )
}
