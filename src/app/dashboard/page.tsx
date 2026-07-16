"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, FileText, Inbox, ShieldCheck, Bell, Home,
  ArrowUpRight, ChevronRight,
  Scan, HelpCircle, Activity, LogOut
} from "lucide-react"
import { AppContainer } from "@/components/ui/AppContainer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/ui/BottomNavigation"

// ─── Data ─────────────────────────────────────────────────────────────────────
const AGREEMENTS_BY_MODULE = {
  c2c: [
    { id: "agr-01", title: "Residential Lease Agreement", party: "Rohan Kapoor", date: "12 Jul 2026", status: "Active", amount: "₹24,000/mo" },
    { id: "agr-02", title: "Car Sale Agreement", party: "Amit Verma", date: "09 Jul 2026", status: "Pending Signature", amount: "₹4,50,000" },
    { id: "agr-03", title: "Bicycle Sale Contract", party: "Sneha Patel", date: "28 Jun 2026", status: "Completed", amount: "₹12,500" },
  ],
  b2b: [
    { id: "agr-11", title: "SaaS Enterprise SLA", party: "Acme Analytics Inc.", date: "15 Jul 2026", status: "Active", amount: "₹18,50,000/yr" },
    { id: "agr-12", title: "Mutual NDA", party: "Stark Industries", date: "10 Jul 2026", status: "Pending Signature", amount: "N/A" },
    { id: "agr-13", title: "Vendor Supply Agreement", party: "Global Logistics Ltd.", date: "04 Jul 2026", status: "Completed", amount: "₹64,20,000" },
  ],
  b2c: [
    { id: "agr-21", title: "Standard Customer Service SLA", party: "Vikram Sen", date: "16 Jul 2026", status: "Active", amount: "₹8,500" },
    { id: "agr-22", title: "Gym Membership Liability Waiver", party: "Divya Rao", date: "14 Jul 2026", status: "Pending Signature", amount: "₹15,000" },
    { id: "agr-23", title: "Freelance Design Contract", party: "Karan Johar", date: "02 Jul 2026", status: "Completed", amount: "₹1,20,000" },
  ]
}

const PENDING_ACTIONS = {
  c2c: [
    { id: "act-01", type: "Review & Sign", title: "Lease - Rohan Kapoor", status: "Signatures Pending", time: "Action Needed" },
    { id: "act-02", type: "OTP Verification", title: "Car Sale - Amit Verma", status: "Aadhaar eKYC", time: "Expires soon" }
  ],
  b2b: [
    { id: "act-11", type: "Counter-Sign", title: "SaaS SLA - Acme Analytics", status: "Awaiting CFO", time: "Action Needed" },
    { id: "act-12", type: "Identity Check", title: "NDA - Stark Industries", status: "Authorized Signer", time: "Verify now" }
  ],
  b2c: [
    { id: "act-21", type: "OTP Pending", title: "Freelance - Karan Johar", status: "OTP Pending", time: "Action Needed" },
    { id: "act-22", type: "Accept Invite", title: "Terms - Aditya Roy", status: "Awaiting Action", time: "Accept now" }
  ]
}

const ACTIVITY_LOG = {
  c2c: [
    { id: "log-1", type: "signed", message: "Residential Lease Signed", details: "Lease executed with Rohan Kapoor", time: "1h ago" },
    { id: "log-2", type: "joined", message: "Buyer Joined Workspace", details: "Rohan Kapoor completed eKYC", time: "3h ago" },
    { id: "log-3", type: "payment", message: "Stamp Duty Paid", details: "Payment completed successfully", time: "1d ago" }
  ],
  b2b: [
    { id: "log-11", type: "signed", message: "SaaS Enterprise SLA Signed", details: "SLA finalized by Stark Industries", time: "2h ago" },
    { id: "log-12", type: "joined", message: "CFO Authenticated", details: "Authorized signatory verified", time: "5h ago" },
    { id: "log-13", type: "payment", message: "Contract Duty Stamped", details: "Stamp transaction verified", time: "2d ago" }
  ],
  b2c: [
    { id: "log-21", type: "signed", message: "Gym Waiver Signed", details: "Waiver signed by Divya Rao", time: "30m ago" },
    { id: "log-22", type: "joined", message: "Client Accepted Invite", details: "Karan Johar entered workspace", time: "2h ago" },
    { id: "log-23", type: "payment", message: "Service Fee Escrowed", details: "Transaction security active", time: "1d ago" }
  ]
}

// ─── Status badge helper ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Active": "bg-[#EAF7EE] text-[#1A8A3C]",
    "Pending Signature": "bg-[#FFF4E0] text-[#B76E00]",
    "Completed": "bg-[#F0F0EE] text-[#5E6368]",
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider ${map[status] ?? "bg-[#F0F0EE] text-foreground"}`}>
      {status}
    </span>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-display font-bold text-[11px] text-secondary-text uppercase tracking-[0.08em]">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-[11px] text-primary font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
          {action}
        </button>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase() as "c2c" | "b2b" | "b2c"

  const [activeTab, setActiveTab] = React.useState("home")
  const [showNotifications, setShowNotifications] = React.useState(false)

  const config = React.useMemo(() => {
    switch (moduleType) {
      case "b2b": return { title: "Trilok B2B", subtitle: "Enterprise Contract Suite" }
      case "b2c": return { title: "Trilok B2C", subtitle: "Merchant Agreement Portal" }
      default:    return { title: "Trilok C2C", subtitle: "Peer-to-Peer Agreement Hub" }
    }
  }, [moduleType])

  const greeting = React.useMemo(() => {
    const h = new Date().getHours()
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening"
  }, [])

  const recentAgreements = (AGREEMENTS_BY_MODULE[moduleType] || AGREEMENTS_BY_MODULE.c2c).slice(0, 3)
  const pendingActions = PENDING_ACTIONS[moduleType] || PENDING_ACTIONS.c2c
  const activities = ACTIVITY_LOG[moduleType] || ACTIVITY_LOG.c2c

  const handleCreateNew = () => router.push(`/register?module=${moduleType}`)
  const handleLogout = () => router.push("/login")

  const spring = { type: "spring", stiffness: 380, damping: 30, mass: 0.8 } as const

  return (
    <AppContainer>

      {/* ═══════════════════════════════════════
          DESKTOP LAYOUT (≥ 1024px)
      ═══════════════════════════════════════ */}
      <div className="hidden lg:flex flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-surface/30 backdrop-blur-[24px] border-r border-border/40 p-6 justify-between flex flex-col shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10">
                <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="font-display font-bold text-[18px] tracking-tight text-foreground">Trilok</span>
            </div>
            <nav className="space-y-1">
              {[
                { id: "home", label: "Overview", Icon: Home },
                { id: "agreements", label: "My Agreements", Icon: FileText },
                { id: "activity", label: "Activity", Icon: Activity },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === id ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
                >
                  <Icon strokeWidth={2.2} className="w-4.5 h-4.5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3.5 py-2.5 text-error hover:bg-error/5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200">
            <LogOut strokeWidth={2.2} className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-[90px] bg-surface/30 backdrop-blur-[24px] border-b border-border/30 px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex flex-col">
              <span className="text-[12px] text-secondary-text font-bold uppercase tracking-wider leading-none">{greeting},</span>
              <div className="flex items-center gap-2 mt-1">
                <h1 className="text-[22px] font-display font-bold text-foreground leading-tight tracking-tight">Nikhil</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-verified text-success text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Signer
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-foreground leading-none">{config.title}</p>
                <p className="text-[11px] text-secondary-text mt-1">{config.subtitle}</p>
              </div>
              <button className="p-2.5 text-secondary-text hover:text-foreground hover:bg-divider/50 rounded-full transition-colors relative border border-border">
                <Bell strokeWidth={2.2} className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
              <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center font-display font-bold text-[14px] border border-primary/10 shadow-sm">N</div>
            </div>
          </header>

          <div className="flex-1 p-8 space-y-8 overflow-y-auto max-w-6xl w-full">
            {/* Hero + Quick Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ y: -4, scale: 1.002 }} whileTap={{ scale: 0.995 }} transition={spring}
                onClick={handleCreateNew}
                className="relative xl:col-span-2 p-8 rounded-[24px] bg-gradient-to-br from-[#0A5C36] via-[#0D7343] to-[#0A5C36] text-surface text-left flex flex-col justify-between h-[200px] shadow-[0_20px_48px_-8px_rgba(10,92,54,0.22)] border border-primary/20 overflow-hidden group cursor-pointer"
              >
                <div className="sweep-overlay" />
                <div className="w-12 h-12 rounded-full bg-white/12 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                  <Plus strokeWidth={2.6} className="w-6 h-6 text-surface" />
                </div>
                <div className="flex justify-between items-end w-full">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-[24px] leading-tight">Create Agreement</h3>
                    <p className="text-[14px] text-surface/85 font-medium max-w-[340px]">Create legally binding digital agreements in seconds.</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-wider uppercase bg-white/10 hover:bg-white/20 transition-colors px-5 py-2.5 rounded-full border border-white/25">
                    Start Creation <ArrowUpRight strokeWidth={2.5} className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.button>

              <div className="grid grid-cols-2 gap-4 h-[200px]">
                {[
                  { Icon: FileText, label: "Templates" },
                  { Icon: Inbox, label: "Drafts" },
                  { Icon: Scan, label: "Scan Doc" },
                  { Icon: HelpCircle, label: "Help Center" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between hover:border-primary/20 transition-all cursor-pointer shadow-[var(--shadow-level-1)]">
                    <Icon strokeWidth={2} className="w-5 h-5 text-primary" />
                    <span className="text-[13.5px] font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">Pending Action Feed</h3>
                <div className="space-y-3">
                  {pendingActions.map((act) => (
                    <div key={act.id} className="p-4 bg-surface border border-border rounded-[16px] flex items-center justify-between shadow-[var(--shadow-level-1)]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-warning/8 text-warning text-[9.5px] font-bold uppercase tracking-wider">{act.type}</span>
                          <span className="text-[11px] text-secondary-text font-medium">{act.time}</span>
                        </div>
                        <h4 className="font-bold text-foreground text-[14.5px]">{act.title}</h4>
                        <p className="text-[12px] text-secondary-text font-medium">{act.status}</p>
                      </div>
                      <Button size="sm" className="h-10 text-[12.5px] px-4 font-bold shadow-sm">Execute</Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">Activity Timeline</h3>
                <div className="bg-surface/50 border border-border rounded-[16px] p-5 space-y-4 shadow-[var(--shadow-level-1)]">
                  {activities.map((act, idx) => (
                    <div key={act.id} className="flex gap-4 text-[13.5px] relative">
                      {idx < activities.length - 1 && <span className="absolute left-2.5 top-6 bottom-[-20px] w-[1px] bg-border" />}
                      <div className="w-5 h-5 rounded-full bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div className="flex-1 flex justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{act.message}</p>
                          <p className="text-[12px] text-secondary-text font-medium mt-0.5">{act.details}</p>
                        </div>
                        <span className="text-[11.5px] text-secondary-text font-bold shrink-0">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Agreements */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">Recent Agreements</h3>
                <button className="text-[12px] text-primary hover:text-[#084D2D] font-bold tracking-wider uppercase">View all</button>
              </div>
              <Card className="divide-y divide-divider overflow-hidden">
                {recentAgreements.map((agreement) => (
                  <div key={agreement.id} className="p-5 flex items-center justify-between hover:bg-background/40 transition-colors duration-200">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/[0.03] border border-primary/5 text-primary flex items-center justify-center shrink-0">
                        <FileText strokeWidth={1.8} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground text-[15px] truncate">{agreement.title}</h4>
                        <p className="text-[12.5px] text-secondary-text font-medium mt-0.5">Party: {agreement.party} • {agreement.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-foreground text-[14px]">{agreement.amount}</span>
                        <span className="text-[10.5px] text-secondary-text font-bold">Covenant Value</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={agreement.status} />
                        <ChevronRight strokeWidth={2.4} className="w-4.5 h-4.5 text-secondary-text" />
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT (< 1024px)
      ═══════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col min-h-screen">

        {/* ── Mobile Header ─────────────────── */}
        <header className="flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-border/20 bg-surface/30 backdrop-blur-md">
          {/* Left: Trilok branding (replaces user name) */}
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-sm">
              <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] tracking-tight text-foreground leading-none">Trilok</span>
              <span className="text-[9px] text-secondary-text font-bold uppercase tracking-[0.08em] mt-0.5">Secure · eKYC</span>
            </div>
          </div>

          {/* Right: bell + avatar */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full border border-border bg-surface flex items-center justify-center relative shadow-[var(--shadow-level-1)]"
            >
              <Bell strokeWidth={2} className="w-4 h-4 text-secondary-text" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[#0D7343] text-white flex items-center justify-center font-display font-bold text-[13px] shadow-[0_4px_12px_rgba(10,92,54,0.25)]">
              N
            </div>
          </div>
        </header>


        {/* ── Mobile Scroll Body ─────────────── */}
        <div className="flex-1 overflow-y-auto pb-36 px-4 pt-4 space-y-4">

          {/* HERO CARD — Apple Wallet Premium Card */}
          <motion.div
            whileTap={{ scale: 0.985 }}
            onClick={handleCreateNew}
            className="relative w-full rounded-[22px] bg-gradient-to-br from-[#0A5C36] via-[#0D7343] to-[#053D24] text-white overflow-hidden cursor-pointer shadow-[0_12px_36px_-6px_rgba(10,92,54,0.30)] border border-primary/20"
          >
            {/* Gloss reflection glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-white/[0.035] rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            <div className="p-5 flex flex-col justify-between min-h-[142px]">
              {/* Top Row: Icon badge & Status Pill */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-inner">
                  <Plus strokeWidth={2.6} className="w-5 h-5 text-white" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-[9px] font-bold uppercase tracking-wider border border-white/10">
                  Instant Setup
                </span>
              </div>

              {/* Bottom Row: Title, Subtitle, and Pill Start Button */}
              <div className="flex justify-between items-end mt-4">
                <div className="space-y-0.5">
                  <h2 className="font-display font-bold text-[20px] leading-tight text-white tracking-tight">Create Agreement</h2>
                  <p className="text-[12px] text-white/70 font-medium tracking-wide">Secure C2C / B2B / B2C e-signing</p>
                </div>
                <div className="flex items-center gap-1 bg-white text-primary px-4 py-2 rounded-full font-bold text-[12px] shadow-md hover:opacity-90 transition-opacity">
                  Start <ArrowUpRight strokeWidth={2.5} className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>


          {/* PENDING ACTIONS */}
          {pendingActions.length > 0 && (
            <div>
              <SectionHeader title={`Pending Actions (${pendingActions.length})`} action="See All" />
              <div className="flex overflow-x-auto scrollbar-none gap-3 -mx-4 px-4 pb-1">
                {pendingActions.map((act, i) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 24 }}
                    className="min-w-[195px] max-w-[195px] p-4 bg-surface border border-border rounded-[18px] flex flex-col justify-between h-[108px] shadow-[var(--shadow-level-1)] shrink-0 cursor-pointer hover:border-warning/30 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-[9px] font-bold uppercase tracking-wider">{act.type}</span>
                      <span className="text-[9.5px] text-secondary-text font-bold">{act.time}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-[13.5px] leading-snug truncate">{act.title}</h4>
                      <p className="text-[11px] text-secondary-text mt-0.5 font-medium">{act.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* RECENT AGREEMENTS */}
          <div>
            <SectionHeader title="Recent Agreements" action="View All" />
            <div className="rounded-[18px] overflow-hidden border border-border shadow-[var(--shadow-level-1)] bg-surface divide-y divide-divider">
              {recentAgreements.map((agreement, i) => (
                <motion.div
                  key={agreement.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
                  className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-background/40 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-[12px] bg-primary/5 border border-primary/8 flex items-center justify-center shrink-0">
                    <FileText strokeWidth={1.8} className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-[14px] truncate leading-snug">{agreement.title}</h4>
                    <p className="text-[11px] text-secondary-text mt-0.5 font-medium">{agreement.party} · {agreement.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={agreement.status} />
                    <ChevronRight strokeWidth={2.5} className="w-3.5 h-3.5 text-secondary-text/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { Icon: FileText, label: "Templates" },
                { Icon: Inbox, label: "Drafts" },
                { Icon: Scan, label: "Scan" },
                { Icon: HelpCircle, label: "Help" },
              ].map(({ Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 350, damping: 24 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex flex-col items-center gap-2 py-3.5 bg-surface border border-border rounded-[16px] cursor-pointer hover:border-primary/20 hover:shadow-[var(--shadow-level-1)] transition-all"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-primary/6 flex items-center justify-center">
                    <Icon strokeWidth={2} className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-[10.5px] font-bold text-secondary-text text-center leading-none">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ACTIVITY */}
          <div>
            <SectionHeader title="Activity" />
            <div className="bg-surface border border-border rounded-[18px] divide-y divide-divider shadow-[var(--shadow-level-1)] overflow-hidden">
              {activities.map((act, idx) => (
                <div key={act.id} className="flex gap-3.5 px-4 py-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 flex justify-between gap-2 min-w-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-[13.5px] truncate">{act.message}</p>
                      <p className="text-[11px] text-secondary-text mt-0.5 font-medium truncate">{act.details}</p>
                    </div>
                    <span className="text-[10.5px] text-secondary-text font-bold shrink-0">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          onCreateNew={handleCreateNew}
          unreadCount={pendingActions.length}
        />
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
