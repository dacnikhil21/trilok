"use client"

import * as React from "react"
import { DeveloperSettingsModal } from "@/components/ui/DeveloperSettingsModal"

export type DevSettingsHandlers = {
  onAutoFillAadhaar?: (valid: boolean) => void
  onAutoFillBusiness?: () => void
  onJumpStep?: (step: number) => void
}

type DevSettingsContextValue = {
  registerHandlers: (handlers: DevSettingsHandlers) => void
  clearHandlers: () => void
}

const DevSettingsContext = React.createContext<DevSettingsContextValue | null>(null)

export function DevSettingsProvider({ children }: { children: React.ReactNode }) {
  const handlersRef = React.useRef<DevSettingsHandlers>({})
  const [, bump] = React.useState(0)

  const registerHandlers = React.useCallback((handlers: DevSettingsHandlers) => {
    handlersRef.current = handlers
    bump((n) => n + 1)
  }, [])

  const clearHandlers = React.useCallback(() => {
    handlersRef.current = {}
    bump((n) => n + 1)
  }, [])

  return (
    <DevSettingsContext.Provider value={{ registerHandlers, clearHandlers }}>
      {children}
      <DeveloperSettingsModal
        onAutoFillAadhaar={handlersRef.current.onAutoFillAadhaar}
        onAutoFillBusiness={handlersRef.current.onAutoFillBusiness}
        onJumpStep={handlersRef.current.onJumpStep}
      />
    </DevSettingsContext.Provider>
  )
}

/** Register page-specific dev actions (register, login, etc.) */
export function useDevSettingsHandlers(handlers: DevSettingsHandlers) {
  const ctx = React.useContext(DevSettingsContext)
  const handlersRef = React.useRef(handlers)
  handlersRef.current = handlers

  React.useEffect(() => {
    if (!ctx) return

    ctx.registerHandlers({
      onAutoFillAadhaar: (valid) => handlersRef.current.onAutoFillAadhaar?.(valid),
      onAutoFillBusiness: () => handlersRef.current.onAutoFillBusiness?.(),
      onJumpStep: (step) => handlersRef.current.onJumpStep?.(step),
    })

    return () => ctx.clearHandlers()
  }, [ctx])
}
