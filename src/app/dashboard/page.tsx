"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Plus, FileText, Inbox, ShieldCheck, Home, Settings, Bell, 
  Clock, ArrowUpRight, ChevronRight, LogOut, CheckCircle2 
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data based on selected module
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

const PENDING_INVITATIONS = {
  c2c: [
    { id: "inv-01", sender: "Priya Sharma", title: "Roommate Co-living Agreement", date: "1 hour ago" }
  ],
  b2b: [
    { id: "inv-11", sender: "Zenith Software", title: "Subcontractor Services Master Agreement", date: "3 hours ago" }
  ],
  b2c: [
    { id: "inv-21", sender: "Aditya Roy", title: "Equipment Rental Terms", date: "5 mins ago" }
  ]
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase() as "c2c" | "b2b" | "b2c"

  const [activeTab, setActiveTab] = React.useState("home")
  const [showNotifications, setShowNotifications] = React.useState(false)

  const config = React.useMemo(() => {
    switch (moduleType) {
      case "b2b":
        return {
          title: "B2B Agreement Desk",
          subtitle: "Enterprise Portal",
          entityLabel: "Acme Corp (Partner)",
        }
      case "b2c":
        return {
          title: "Merchant Workspace",
          subtitle: "B2C Business Portal",
          entityLabel: "Retailer Console",
        }
      case "c2c":
      default:
        return {
          title: "Personal Workspace",
          subtitle: "C2C Agreement Portal",
          entityLabel: "Individual",
        }
    }
  }, [moduleType])

  const recentAgreements = AGREEMENTS_BY_MODULE[moduleType] || AGREEMENTS_BY_MODULE.c2c
  const pendingInvs = PENDING_INVITATIONS[moduleType] || PENDING_INVITATIONS.c2c

  const handleLogout = () => {
    router.push("/login")
  }

  // Apple-style organic spring motion configuration
  const appleSpring = { type: "spring", stiffness: 350, damping: 28, mass: 0.8 } as const

  return (
    <div className="min-h-screen bg-background/30 text-foreground flex flex-col lg:flex-row relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-[#D4AF37]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* SIDE NAVIGATION (Desktop Only - Frosted Material Sideboard) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface/30 backdrop-blur-[24px] border-r border-border/40 p-6 justify-between shrink-0 z-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10">
              <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
            </div>
            <span className="font-display font-bold text-[18px] tracking-tight text-foreground">eSaleAgreement</span>
          </div>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === "home" ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
            >
              <Home strokeWidth={2.2} className="w-4.5 h-4.5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("agreements")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === "agreements" ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
            >
              <FileText strokeWidth={2.2} className="w-4.5 h-4.5" />
              My Agreements
            </button>
            <button
              onClick={() => setActiveTab("invitations")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === "invitations" ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
            >
              <Inbox strokeWidth={2.2} className="w-4.5 h-4.5" />
              Inbox
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === "settings" ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
            >
              <Settings strokeWidth={2.2} className="w-4.5 h-4.5" />
              Workspace Settings
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 text-error hover:bg-error/5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200"
        >
          <LogOut strokeWidth={2.2} className="w-4.5 h-4.5" />
          Sign Out
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-0 z-10">
        {/* HEADER AREA */}
        <header className="bg-surface/30 backdrop-blur-[24px] border-b border-border/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 lg:gap-0">
            <div className="lg:hidden p-2 bg-primary/8 rounded-full border border-primary/10 shadow-sm">
              <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-[19px] tracking-tight text-foreground leading-none">{config.title}</h1>
              <p className="text-[10px] text-secondary-text mt-1.5 font-bold tracking-wider uppercase">{config.subtitle} • {config.entityLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-secondary-text hover:text-foreground hover:bg-divider/40 rounded-full transition-colors relative"
            >
              <Bell strokeWidth={2.2} className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>

            <div className="w-8.5 h-8.5 rounded-full bg-primary/8 text-primary flex items-center justify-center font-display font-bold text-[13px] border border-primary/10 shadow-sm">
              U
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="flex-1 p-5 sm:p-6 space-y-6 max-w-5xl w-full mx-auto">
          {/* VERIFICATION SUCCESS BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-verified/60 border border-primary/10 rounded-[var(--radius-md)] p-4 sm:p-5 flex items-start gap-4 shadow-[var(--shadow-level-1)]"
          >
            <CheckCircle2 strokeWidth={2.4} className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-[14.5px] mb-0.5">Identity Fully Authenticated</h3>
              <p className="text-[13px] text-secondary-text leading-relaxed font-medium">
                Your Aadhaar eKYC is verified. You are authorized to construct, legally stamp, and sign agreements inside the workspace.
              </p>
            </div>
            <div className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-primary text-surface font-semibold text-[9.5px] uppercase tracking-wider">
              Verified
            </div>
          </motion.div>

          {/* MAIN CTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Create Agreement Hero Card */}
            <motion.button 
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={appleSpring}
              className="relative p-6 rounded-[var(--radius-md)] bg-gradient-to-br from-[#0A5C36] via-[#0E7345] to-[#0A5C36] text-surface text-left flex flex-col justify-between min-h-[180px] shadow-[0_16px_36px_-6px_rgba(10,92,54,0.22)] border border-primary/20 overflow-hidden transition-all group"
            >
              {/* Apple-style light sweep sheen */}
              <div className="sweep-overlay" />
              
              <div className="w-12 h-12 rounded-full bg-white/12 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-sm">
                <Plus strokeWidth={2.4} className="w-5.5 h-5.5 text-surface" />
              </div>
              
              <div>
                <h3 className="font-display font-bold text-[22px] leading-tight flex items-center gap-2 mb-1">
                  Create Agreement
                  <ArrowUpRight strokeWidth={2.5} className="w-5 h-5 opacity-80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                <p className="text-[13px] text-surface/85 font-medium leading-relaxed max-w-[280px]">
                  Draft a legally-compliant contract tailored for your specific transaction type.
                </p>
              </div>
            </motion.button>

            {/* Template Hub Card */}
            <motion.button 
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={appleSpring}
              className="relative p-6 rounded-[var(--radius-md)] bg-surface border border-border text-left flex flex-col justify-between min-h-[180px] shadow-[var(--shadow-level-1)] transition-all overflow-hidden group"
            >
              <div className="dark-sweep-overlay" />
              
              <div className="w-12 h-12 rounded-full bg-primary/[0.04] border border-primary/10 text-primary flex items-center justify-center">
                <FileText strokeWidth={2} className="w-5 h-5 text-primary" />
              </div>
              
              <div>
                <h3 className="font-display font-bold text-[22px] text-foreground leading-tight flex items-center gap-1.5 mb-1">
                  Template Library
                  <ChevronRight strokeWidth={2.4} className="w-5 h-5 text-secondary-text transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <p className="text-[13px] text-secondary-text leading-relaxed font-medium">
                  Select from attorney-reviewed digital agreement layouts and formats.
                </p>
              </div>
            </motion.button>
          </div>

          {/* INBOX / PENDING ACTIONS */}
          {pendingInvs.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-[16.5px] text-foreground flex items-center gap-2 tracking-tight">
                <Inbox strokeWidth={2.2} className="w-4.5 h-4.5 text-primary" />
                Pending Invitations ({pendingInvs.length})
              </h3>
              
              <div className="space-y-2">
                {pendingInvs.map((inv) => (
                  <div key={inv.id} className="p-4 rounded-[var(--radius-md)] border border-warning/10 bg-[#FFFDF7]/60 backdrop-blur-[8px] flex items-center justify-between shadow-[var(--shadow-level-1)]">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground text-[14px]">{inv.title}</h4>
                      <p className="text-[12px] text-secondary-text">Sent by <span className="font-semibold text-foreground">{inv.sender}</span> • {inv.date}</p>
                    </div>
                    <Button size="sm" className="h-9 text-[12px] px-3.5 font-bold shadow-sm">
                      Review & Sign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECENT AGREEMENTS */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-[16.5px] text-foreground flex items-center gap-2 tracking-tight">
                <Clock strokeWidth={2.2} className="w-4.5 h-4.5 text-primary" />
                Recent Agreements
              </h3>
              <button className="text-[11px] text-primary hover:text-[#084D2D] font-bold tracking-wider uppercase">
                View All
              </button>
            </div>

            {/* Boundary-less Layout Container */}
            <div className="bg-surface/50 backdrop-blur-[12px] border border-border rounded-[var(--radius-md)] divide-y divide-divider overflow-hidden shadow-[var(--shadow-level-1)]">
              {recentAgreements.map((agreement) => (
                <div key={agreement.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-background/40 transition-colors duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/[0.03] border border-primary/5 text-primary flex items-center justify-center shrink-0">
                      <FileText strokeWidth={1.8} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground text-[14.5px] truncate">{agreement.title}</h4>
                      <p className="text-[11.5px] text-secondary-text mt-0.5">
                        Party: <span className="font-semibold text-foreground">{agreement.party}</span> • Created {agreement.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="font-semibold text-foreground text-[13.5px]">{agreement.amount}</span>
                      <span className="text-[10px] text-secondary-text font-bold">Value</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        agreement.status === "Active" ? "bg-verified text-success" :
                        agreement.status === "Pending Signature" ? "bg-[#FFF2E0] text-[#B76E00]" :
                        "bg-[#EFEFEF] text-foreground"
                      }`}>
                        {agreement.status}
                      </span>
                      <ChevronRight strokeWidth={2.2} className="w-4 h-4 text-secondary-text" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM NAVIGATION (Mobile Only - Floating Glass Deck) */}
      <div className="lg:hidden fixed bottom-5 left-4 right-4 z-40">
        <nav className="h-16 backdrop-blur-[28px] bg-surface/75 border border-white/20 rounded-[var(--radius-md)] flex items-center justify-around px-2 shadow-[var(--shadow-level-3)]">
          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all duration-300 ${activeTab === "home" ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
              <Home strokeWidth={activeTab === "home" ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
            </div>
            <span className={`text-[9px] font-bold mt-0.5 transition-colors ${activeTab === "home" ? "text-primary" : "text-secondary-text"}`}>Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab("agreements")}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all duration-300 ${activeTab === "agreements" ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
              <FileText strokeWidth={activeTab === "agreements" ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
            </div>
            <span className={`text-[9px] font-bold mt-0.5 transition-colors ${activeTab === "agreements" ? "text-primary" : "text-secondary-text"}`}>Contracts</span>
          </button>
          
          <button
            onClick={() => setActiveTab("invitations")}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all duration-300 relative ${activeTab === "invitations" ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
              <Inbox strokeWidth={activeTab === "invitations" ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
              {pendingInvs.length > 0 && (
                <span className="absolute top-1.5 right-3.5 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </div>
            <span className={`text-[9px] font-bold mt-0.5 transition-colors ${activeTab === "invitations" ? "text-primary" : "text-secondary-text"}`}>Inbox</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 py-1 text-error"
          >
            <div className="px-4 py-1.5 text-error">
              <LogOut strokeWidth={2} className="w-4.5 h-4.5 mx-auto" />
            </div>
            <span className="text-[9px] font-bold mt-0.5">Sign Out</span>
          </button>
        </nav>
      </div>
    </div>
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
