"use client"

import { AppShell } from "@/components/layout/AppShell"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { AppHeader } from "@/components/layout/AppHeader"
import {
  DashboardCard,
  DashboardSectionHeader,
  DashboardStatGrid,
  DashboardTemplateGrid,
} from "@/components/dashboard/DashboardPrimitives"
import { AGREEMENT_STATS, DASHBOARD_CONFIGS } from "@/lib/dashboard-configs"
import { notFound } from "next/navigation"

const PREVIEW_TEMPLATES = DASHBOARD_CONFIGS.mobile.templates?.slice(0, 6) ?? []

export default function ShellPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound()
  }

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={<AppBottomNav activeTab="home" />}
      contentClassName="space-y-5 px-4 pb-4 pt-1"
    >
      <section className="rounded-[16px] bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] p-4">
        <p className="text-[13px] font-medium text-[#64748B]">AppShell preview (dev only)</p>
        <h1 className="mt-1 text-[18px] font-bold text-[#0F172A]">Foundation components</h1>
        <p className="mt-1 text-[12px] text-[#64748B]">
          Safe area + scroll + sticky bottom nav without FAB overlap.
        </p>
      </section>

      <section>
        <DashboardSectionHeader title="Template grid (3 columns max)" />
        <DashboardTemplateGrid
          items={PREVIEW_TEMPLATES}
          renderIcon={() => (
            <div className="h-7 w-7 rounded-lg bg-[#2563EB]/15" aria-hidden="true" />
          )}
        />
      </section>

      <section>
        <DashboardStatGrid stats={AGREEMENT_STATS} showHeader={false} />
      </section>

      <section>
        <DashboardSectionHeader title="Scroll card sample" />
        <DashboardCard
          label="Compact scroll card"
          icon={<div className="h-7 w-7 rounded-lg bg-[#2563EB]/15" />}
        />
      </section>
    </AppShell>
  )
}
