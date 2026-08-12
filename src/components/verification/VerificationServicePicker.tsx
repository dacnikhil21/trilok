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
            className="flex min-h-[78px] w-full items-center gap-2.5 rounded-[16px] border border-slate-200/90 bg-white px-3 py-3 text-left shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:border-slate-350 transition-all duration-200 active:scale-[0.97] active:bg-[#FAFBFC] group cursor-pointer"
          >
            <div
              className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-[12px] transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: `${service.color}15` }}
            >
              <Icon3D name={service.icon} size="sm" alt={title} bare />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[11.5px] font-bold leading-[1.2] text-[#0F172A]">{title}</p>
              <p className="mt-0.5 line-clamp-1 text-[9.5px] leading-snug text-[#64748B] font-semibold">{subtitle}</p>
            </div>
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-250 group-hover:translate-x-0.5"
              style={{ color: service.color }}
              strokeWidth={3}
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
