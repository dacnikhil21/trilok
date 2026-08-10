/** Reserves notch/status-bar space only — no fake clock/battery (real phone already shows those). */
export function StatusBar() {
  return <div className="shrink-0 pt-[env(safe-area-inset-top,0px)]" aria-hidden="true" />
}
