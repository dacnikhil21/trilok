"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Wrench, X, Check, ArrowRight, Zap, ShieldAlert, Sparkles, Building2, IdCard, LayoutDashboard, FilePlus, Smartphone } from "lucide-react"

interface DeveloperSettingsModalProps {
  onAutoFillAadhaar?: (valid: boolean) => void
  onAutoFillBusiness?: () => void
  onJumpStep?: (step: number) => void
}

function DeveloperSettingsContent({
  onAutoFillAadhaar,
  onAutoFillBusiness,
  onJumpStep,
}: DeveloperSettingsModalProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isBypassMode, setIsBypassMode] = React.useState(true)
  const currentModule = searchParams.get("module") || "b2c"

  // Only render on localhost or development environment
  const isDevEnv = process.env.NODE_ENV === "development" || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))

  if (!isDevEnv) return null

  return (
    <>
      {/* ── Floating Developer Settings Trigger Pill (Bottom Right Corner) ── */}
      <div className="fixed bottom-4 right-4 z-50 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-10 px-3.5 rounded-full bg-[#0F172A] text-white border border-slate-700 shadow-xl flex items-center gap-2 hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          <Wrench className="w-4 h-4 text-[#10B981] animate-pulse" />
          <span className="text-[12px] font-extrabold tracking-wide">Dev Settings</span>
        </button>
      </div>

      {/* ── Developer Settings Modal Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 select-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-[420px] bg-white rounded-t-[24px] sm:rounded-[24px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="px-4 py-3.5 bg-[#0F172A] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                    <Wrench className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[14.5px] text-white tracking-tight">Developer Settings</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Localhost Rapid Testing Controls</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 overflow-y-auto space-y-4 text-[12.5px] font-sans">
                {/* 1. Bypass Validation Mode Toggle */}
                <div className="p-3.5 rounded-[16px] bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[#059669] font-extrabold">
                      <Zap className="w-4 h-4 fill-[#059669]" />
                      <span>Frictionless Step Bypass Mode</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Advance steps directly on Continue click for quick testing.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isBypassMode}
                    onChange={(e) => setIsBypassMode(e.target.checked)}
                    className="w-5 h-5 accent-[#059669] cursor-pointer"
                  />
                </div>

                {/* 2. Quick Route Switcher */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Quick Route Jumper
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { router.push("/login"); setIsOpen(false) }}
                      className="p-2.5 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-left flex items-center gap-2 transition-colors"
                    >
                      <Smartphone className="w-4 h-4 text-[#0052CC]" />
                      <span>Login Screen</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { router.push("/select-service"); setIsOpen(false) }}
                      className="p-2.5 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-left flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-[#0052CC]" />
                      <span>Select Service</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { router.push("/business-category"); setIsOpen(false) }}
                      className="p-2.5 rounded-[12px] bg-blue-50 hover:bg-blue-100 text-[#0052CC] font-bold text-left flex items-center gap-2 transition-colors col-span-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0052CC]" />
                      <span>Business Category Selection</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { router.push("/dashboard?module=b2c"); setIsOpen(false) }}
                      className="p-2.5 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-left flex items-center gap-2 transition-colors col-span-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0052CC]" />
                      <span>B2C Dashboard (/dashboard?module=b2c)</span>
                    </button>
                  </div>
                </div>

                {/* 3. B2C 5-Step Direct Registration Step Jumper */}
                {pathname.includes("/register") && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      B2C Registration 5-Step Direct Jumper
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        { step: 1, label: "Step 1: Mobile & OTP Verification", icon: Smartphone },
                        { step: 2, label: "Step 2: Business Owner Aadhaar eKYC", icon: IdCard },
                        { step: 3, label: "Step 3: Business GST / PAN / Udyam", icon: Building2 },
                        { step: 4, label: "Step 4: Tag Activation (₹99)", icon: Sparkles },
                        { step: 5, label: "Step 5: Registration Complete", icon: Check },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={item.step}
                            type="button"
                            onClick={() => {
                              onJumpStep?.(item.step)
                              setIsOpen(false)
                            }}
                            className="p-2.5 rounded-[12px] bg-slate-50 border border-slate-200/80 hover:border-[#0052CC] text-slate-800 font-bold text-left flex items-center justify-between transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-[#0052CC]" />
                              <span>{item.label}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Mock Data Auto-Fillers */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Mock Test Credential Generator
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onAutoFillAadhaar?.(true)
                        setIsOpen(false)
                      }}
                      className="p-2.5 rounded-[12px] bg-[#ECFDF5] border border-[#10B981]/30 hover:bg-[#D1FAE5] text-[#047857] font-bold text-left text-[11.5px] space-y-1"
                    >
                      <div className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Valid 12-Digit Aadhaar</span>
                      </div>
                      <p className="text-[10.5px] font-mono text-slate-600">2345 6789 0123</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onAutoFillAadhaar?.(false)
                        setIsOpen(false)
                      }}
                      className="p-2.5 rounded-[12px] bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold text-left text-[11.5px] space-y-1"
                    >
                      <div className="flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                        <span>Invalid UIDAI Aadhaar</span>
                      </div>
                      <p className="text-[10.5px] font-mono text-slate-600">0000 0000 0000</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onAutoFillBusiness?.()
                        setIsOpen(false)
                      }}
                      className="p-2.5 rounded-[12px] bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#0052CC] font-bold text-left text-[11.5px] space-y-1 col-span-2"
                    >
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#0052CC]" />
                        <span>Valid Test GSTIN / Business ID</span>
                      </div>
                      <p className="text-[10.5px] font-mono text-slate-600">37AAAAA0000A1Z5</p>
                    </button>
                  </div>
                </div>

                {/* 5. Create Agreement Fast-Track */}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/create-agreement?module=b2c")
                    setIsOpen(false)
                  }}
                  className="w-full h-11 rounded-[14px] bg-gradient-to-r from-[#0052CC] to-[#10B981] text-white font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                >
                  <FilePlus className="w-4.5 h-4.5 text-white" />
                  <span>Fast-Track to Create Agreement</span>
                </button>
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500 font-medium">
                Developer Mode Active • eSaleAgreement Localhost Environment
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export function DeveloperSettingsModal(props: DeveloperSettingsModalProps) {
  return (
    <React.Suspense fallback={null}>
      <DeveloperSettingsContent {...props} />
    </React.Suspense>
  )
}
