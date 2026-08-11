"use client"

import * as React from "react"
import { ChevronRight, Lock, ShieldCheck } from "lucide-react"
import { Icon3D } from "@/components/icons/Icon3D"
import type { VerificationService } from "@/lib/dashboard-configs"

export function VerificationServiceGrid({
  services,
  onSelect,
}: {
  services: VerificationService[]
  onSelect: (service: VerificationService) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {services.map((service) => {
        const title = service.shortLabel ?? service.label
        const subtitle =
          service.description ??
          (service.shortLabel ? `Verify ${service.shortLabel}` : "Verification service")

        return (
          <button
            key={service.label}
            type="button"
            onClick={() => onSelect(service)}
            className="flex min-h-[76px] w-full items-center gap-2 rounded-[14px] border border-[#E8EDF3] bg-white px-2.5 py-2.5 text-left shadow-[0_2px_10px_rgba(15,23,42,0.04)] active:scale-[0.98] active:bg-[#FAFBFC]"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]"
              style={{ backgroundColor: `${service.color}18` }}
            >
              <Icon3D name={service.icon} size="sm" alt={title} bare />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[12px] font-bold leading-[1.2] text-[#0F172A]">{title}</p>
              <p className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-[#64748B]">{subtitle}</p>
            </div>
            <ChevronRight
              className="h-4 w-4 shrink-0"
              style={{ color: service.color }}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </div>
  )
}

export function VerificationTrustBanner() {
  return (
    <section className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-[#EFF6FF] to-[#F0F9FF] px-4 py-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="relative z-[1] flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <ShieldCheck className="h-5 w-5 text-[#2563EB]" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-[#2563EB]">Secure • Private • Reliable</p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#64748B]">
            Your data is encrypted and securely used only for verification purposes.
          </p>
        </div>
      </div>
      <Lock
        className="pointer-events-none absolute -right-1 bottom-0 h-16 w-16 text-[#BFDBFE]/70"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </section>
  )
}

export function VerificationServicePickerIntro() {
  return (
    <div className="px-4 pt-1 pb-3">
      <h1 className="text-[20px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
        Verify Your Identity
      </h1>
      <p className="mt-1.5 text-[12px] font-medium leading-snug text-[#64748B]">
        Choose a service to verify your identity securely and start creating agreements.
      </p>
    </div>
  )
}
