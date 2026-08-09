export function StatusBar() {
  return (
    <div className="flex h-[44px] shrink-0 items-end justify-between px-6 pb-2 pt-3">
      <span className="text-[15px] font-semibold tracking-tight text-[#0F172A]">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden="true">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="#0F172A" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="#0F172A" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" fill="#0F172A" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="#0F172A" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path
            d="M8 2.5C10.2 2.5 12.2 3.4 13.7 4.9L15 3.6C13.1 1.7 10.7 0.5 8 0.5C5.3 0.5 2.9 1.7 1 3.6L2.3 4.9C3.8 3.4 5.8 2.5 8 2.5ZM8 6.5C9.4 6.5 10.7 7 11.6 7.9L12.9 6.6C11.6 5.3 9.9 4.5 8 4.5C6.1 4.5 4.4 5.3 3.1 6.6L4.4 7.9C5.3 7 6.6 6.5 8 6.5ZM8 10.5C8.8 10.5 9.5 10.2 10.1 9.6L8 7.5L5.9 9.6C6.5 10.2 7.2 10.5 8 10.5Z"
            fill="#0F172A"
          />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#0F172A" strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#0F172A" />
          <path
            d="M23.5 4.5V7.5C24.3 7.2 24.9 6.4 24.9 5.5C24.9 4.6 24.3 3.8 23.5 3.5V4.5Z"
            fill="#0F172A"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  )
}
