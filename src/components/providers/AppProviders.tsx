"use client"

import { DevSettingsProvider } from "@/components/ui/DevSettingsProvider"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <DevSettingsProvider>{children}</DevSettingsProvider>
}
