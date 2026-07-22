"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Plus, FileText, Bell, Home, ChevronRight,
  Smartphone, Car, Wrench, Building2, Grid, UserPlus, ClipboardList,
  ScanLine, BarChart3, Inbox, User, Shield, PenTool
} from "lucide-react"
import { AppContainer } from "@/components/ui/AppContainer"
import { BrandLogo } from "@/components/ui/BrandLogo"

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()
  const [activeNav, setActiveNav] = React.useState<"home" | "agreements" | "inbox" | "profile">("home")

  const handleCreateNew = () => router.push(`/create-agreement?module=${moduleType}`)

  return (
    <AppContainer centered>
      <div className="w-full flex flex-col h-full bg-[#F8FAFC] pb-28 min-h-screen text-[#0F172A] font-sans select-none">

        {/* ── 1. HEADER (1:1 Match image.png) ─────────────────────────────────── */}
        <header className="flex items-center justify-between px-4 sm:px-5 pt-4 pb-3 bg-white border-b border-slate-100 shadow-sm shrink-0">
          <BrandLogo size="md" showSubtitle />

          <div className="flex items-center gap-2.5">
            {/* Notification Bell with Red Badge "3" */}
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center relative hover:bg-slate-200 transition-colors">
              <Bell className="w-4.5 h-4.5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                3
              </span>
            </button>

            {/* Profile Avatar "N" */}
            <div className="w-9 h-9 rounded-full bg-[#0052CC] text-white font-extrabold text-[15px] flex items-center justify-center shadow-sm">
              N
            </div>
          </div>
        </header>

        <div className="p-3.5 sm:p-5 space-y-5">

          {/* ── 2. HERO BANNER ("Create Agreement") — Optimized Mobile Perspective ─ */}
          <div className="w-full rounded-[20px] bg-gradient-to-r from-[#F0FDF4] via-[#F2F8F5] to-[#ECFDF5] border border-[#A7F3D0] p-4 sm:p-5 relative overflow-hidden shadow-xs flex items-center justify-between">
            <div className="space-y-2 max-w-[200px] sm:max-w-[270px] z-10">
              <h1 className="text-[19px] sm:text-[22px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Create Agreement
              </h1>
              <p className="text-[12px] sm:text-[13px] text-[#475569] font-medium leading-snug">
                Create eSign agreement for your customer in just 2 minutes
              </p>
              <button
                onClick={handleCreateNew}
                className="h-[38px] px-3.5 rounded-[10px] bg-[#059669] hover:bg-[#047857] text-white font-bold text-[13px] flex items-center gap-1.5 shadow-xs transition-all active:scale-95 mt-1"
              >
                <Plus className="w-4 h-4" strokeWidth={2.8} />
                <span>New Agreement</span>
              </button>
            </div>

            {/* Document & Pen Signature Illustration (Mobile-Sized Proportions) */}
            <div className="relative w-24 h-28 shrink-0 flex items-center justify-center -right-0.5 sm:right-0">
              <div className="w-18 h-24 bg-white rounded-lg shadow-sm border border-slate-200/80 p-2 relative flex flex-col gap-1">
                <div className="w-9 h-1 bg-slate-200 rounded-full" />
                <div className="w-12 h-1 bg-slate-200 rounded-full" />
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
                {/* Blue Checkmark Shield */}
                <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center absolute -left-2.5 top-7 shadow-xs">
                  <Shield className="w-3 h-3 fill-[#0052CC]" />
                </div>
                {/* Pen Signature */}
                <div className="mt-auto flex justify-end pr-0.5 text-[#059669] font-serif italic text-[13px] font-bold">
                  am
                </div>
              </div>
              <PenTool className="w-7 h-7 text-[#0052CC] absolute right-0 bottom-0.5 transform rotate-12 drop-shadow-xs" />
            </div>
          </div>

          {/* ── 3. CATEGORIES SECTION ────────────────────────────────────────── */}
          <div className="space-y-2.5">
            <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight">Categories</h2>

            {/* Top Row: 3 items (Always fits text + chevron arrow >) */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {[
                { name: "Electronics", icon: Smartphone, bg: "bg-[#ECFDF5] text-[#059669]" },
                { name: "Vehicles", icon: Car, bg: "bg-[#EFF6FF] text-[#2563EB]" },
                { name: "Services", icon: Wrench, bg: "bg-[#ECFDF5] text-[#059669]" },
              ].map((cat) => {
                const Icon = cat.icon
                return (
                  <div
                    key={cat.name}
                    onClick={handleCreateNew}
                    className="h-[44px] px-1.5 sm:px-2.5 py-1.5 rounded-[12px] bg-white border border-slate-200/80 hover:border-emerald-500/30 transition-all flex items-center justify-between cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] group min-w-0"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                      <div className={`w-6.5 h-6.5 rounded-md ${cat.bg} flex items-center justify-center shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-[11px] sm:text-[12.5px] text-[#0F172A] whitespace-nowrap overflow-hidden text-ellipsis">{cat.name}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-0.5" />
                  </div>
                )
              })}
            </div>

            {/* Bottom Row: 2 items */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {[
                { name: "Rental", icon: Building2, bg: "bg-[#EFF6FF] text-[#2563EB]" },
                { name: "Others", icon: Grid, bg: "bg-[#ECFDF5] text-[#059669]" },
              ].map((cat) => {
                const Icon = cat.icon
                return (
                  <div
                    key={cat.name}
                    onClick={handleCreateNew}
                    className="h-[44px] px-3 py-1.5 rounded-[12px] bg-white border border-slate-200/80 hover:border-emerald-500/30 transition-all flex items-center justify-between cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6.5 h-6.5 rounded-md ${cat.bg} flex items-center justify-center shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-[12px] sm:text-[13px] text-[#0F172A] whitespace-nowrap">{cat.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 4. MY AGREEMENTS & PENDING AGREEMENTS (2-Column Grid) ──────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* Left: My Agreements */}
            <div className="bg-white rounded-[18px] border border-slate-200/80 p-4 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-[14.5px] font-bold text-[#0F172A] tracking-tight">My Agreements</h2>
                <button className="text-[11.5px] font-bold text-[#0052CC] hover:underline">View All</button>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {[
                  { title: "Electronics Purchase Agreement", date: "12 May 2025", status: "Completed", iconBg: "bg-[#059669]" },
                  { title: "Mobile Sale Agreement", date: "10 May 2025", status: "Completed", iconBg: "bg-[#0052CC]" },
                  { title: "Laptop Purchase Agreement", date: "08 May 2025", status: "Pending", iconBg: "bg-[#059669]" },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""} hover:bg-slate-50 transition-colors cursor-pointer rounded-lg p-1`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8.5 h-8.5 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[12.5px] text-[#0F172A] truncate leading-snug">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {item.date} • <span className={item.status === "Completed" ? "text-[#059669] font-bold" : "text-[#D97706] font-bold"}>{item.status}</span>
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pending Agreements */}
            <div className="bg-white rounded-[18px] border border-slate-200/80 p-4 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-[14.5px] font-bold text-[#0F172A] tracking-tight">Pending Agreements</h2>
                <button className="text-[11.5px] font-bold text-[#0052CC] hover:underline">View All</button>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {[
                  { title: "Customer eSign Pending", desc: "Mobile Purchase", date: "11 May 2025", bg: "bg-[#DBEAFE] text-[#2563EB]" },
                  { title: "Customer eSign Pending", desc: "AC Service Agreement", date: "09 May 2025", bg: "bg-[#D1FAE5] text-[#059669]" },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""} hover:bg-slate-50 transition-colors cursor-pointer rounded-lg p-1`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8.5 h-8.5 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[12.5px] text-[#0F172A] truncate leading-snug">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                        <p className="text-[10.5px] text-slate-400 font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── 5. QUICK ACTIONS TOOLBAR ─────────────────────────────────────── */}
          <div className="w-full rounded-[18px] bg-[#EEF4FF] border border-[#D0E2FF] p-3 grid grid-cols-4 divide-x divide-[#D0E2FF]/80 text-center">
            {[
              { label: "Add Customer", icon: UserPlus, color: "text-[#0052CC]" },
              { label: "Templates", icon: ClipboardList, color: "text-[#059669]" },
              { label: "Scan & Verify", icon: ScanLine, color: "text-[#0052CC]" },
              { label: "Reports", icon: BarChart3, color: "text-[#059669]" },
            ].map((action) => {
              const Icon = action.icon
              return (
                <div
                  key={action.label}
                  onClick={handleCreateNew}
                  className="flex flex-col items-center justify-center gap-1.5 px-1 py-1 hover:bg-white/50 transition-colors cursor-pointer rounded-lg"
                >
                  <div className={`w-9 h-9 rounded-xl bg-white ${action.color} shadow-xs flex items-center justify-center mx-auto`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[11.5px] font-bold text-[#0F172A] leading-tight">{action.label}</span>
                </div>
              )
            })}
          </div>

        </div>

        {/* ── 6. FLOATING BOTTOM NAVIGATION ──────────────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-5 py-2 shadow-lg flex items-center justify-between max-w-[440px] mx-auto rounded-t-[22px]">
          <button
            onClick={() => setActiveNav("home")}
            className={`flex flex-col items-center gap-0.5 ${activeNav === "home" ? "text-[#0052CC]" : "text-slate-400"}`}
          >
            <Home className="w-5 h-5 fill-current" />
            <span className="text-[10.5px] font-bold">Home</span>
          </button>

          <button
            onClick={() => setActiveNav("agreements")}
            className={`flex flex-col items-center gap-0.5 ${activeNav === "agreements" ? "text-[#0052CC]" : "text-slate-400"}`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10.5px] font-bold">Agreements</span>
          </button>

          {/* Floating Center Create FAB */}
          <div className="flex flex-col items-center -mt-6">
            <button
              onClick={handleCreateNew}
              className="w-13 h-13 rounded-full bg-[#0052CC] hover:bg-[#0033A0] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform border-4 border-white"
            >
              <Plus className="w-6 h-6" strokeWidth={2.8} />
            </button>
            <span className="text-[10.5px] font-bold text-[#0052CC] mt-0.5">Create</span>
          </div>

          <button
            onClick={() => setActiveNav("inbox")}
            className={`flex flex-col items-center gap-0.5 ${activeNav === "inbox" ? "text-[#0052CC]" : "text-slate-400"}`}
          >
            <Inbox className="w-5 h-5" />
            <span className="text-[10.5px] font-bold">Inbox</span>
          </button>

          <button
            onClick={() => setActiveNav("profile")}
            className={`flex flex-col items-center gap-0.5 ${activeNav === "profile" ? "text-[#0052CC]" : "text-slate-400"}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10.5px] font-bold">Profile</span>
          </button>
        </div>

      </div>
    </AppContainer>
  )
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  )
}
