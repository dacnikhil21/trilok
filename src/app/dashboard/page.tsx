"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Plus, FileText, Inbox, ShieldCheck, Home, Settings, Bell, 
  Clock, ArrowUpRight, ChevronRight, CheckCircle2, AlertTriangle,
  Layers, Scan, HelpCircle, Activity, User, ChevronUp
} from "lucide-react"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { StatusCard } from "@/components/ui/StatusCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data reflecting premium content
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
          title: "Trilok B2B",
          subtitle: "Enterprise Suite",
        }
      case "b2c":
        return {
          title: "Trilok B2C",
          subtitle: "Merchant Portal",
        }
      case "c2c":
      default:
        return {
          title: "Trilok C2C",
          subtitle: "Agreement Hub",
        }
    }
  }, [moduleType])

  const greeting = React.useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }, [])

  const recentAgreements = (AGREEMENTS_BY_MODULE[moduleType] || AGREEMENTS_BY_MODULE.c2c).slice(0, 3)
  const pendingActions = PENDING_ACTIONS[moduleType] || PENDING_ACTIONS.c2c
  const activities = ACTIVITY_LOG[moduleType] || ACTIVITY_LOG.c2c

  const handleCreateNew = () => {
    router.push(`/register?module=${moduleType}`) // Redirect to onboarding builder flow
  }

  const appleSpring = { type: "spring", stiffness: 380, damping: 30, mass: 0.8 } as const

  return (
    <AppContainer>
      <div className="flex flex-col lg:flex-row min-h-screen pb-24 lg:pb-0">
        
        {/* SIDE BAR - DESKTOP ONLY */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface/30 backdrop-blur-[24px] border-r border-border p-6 justify-between shrink-0 z-20">
          <div className="space-y-8">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10">
                <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="font-display font-bold text-[18px] tracking-tight text-foreground">Trilok</span>
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
                onClick={() => setActiveTab("activity")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all duration-200 ${activeTab === "activity" ? "bg-primary/8 text-primary shadow-sm" : "text-secondary-text hover:text-foreground hover:bg-divider/40"}`}
              >
                <Activity strokeWidth={2.2} className="w-4.5 h-4.5" />
                Activity
              </button>
            </nav>
          </div>
        </aside>

        {/* MAIN BODY SCROLL */}
        <main className="flex-1 flex flex-col min-w-0 max-w-2xl mx-auto w-full px-4 sm:px-6">
          
          {/* SECTION 1: HEADER (Max Height 90px) */}
          <header className="h-[90px] flex items-center justify-between z-30 border-b border-border/30">
            <div className="flex flex-col">
              <span className="text-[12px] text-secondary-text font-bold uppercase tracking-wider leading-none">
                {greeting},
              </span>
              <div className="flex items-center gap-2 mt-1">
                <h1 className="text-[22px] font-display font-bold text-foreground leading-tight tracking-tight">
                  Nikhil
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-verified text-success text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-secondary-text hover:text-foreground hover:bg-divider/50 rounded-full transition-colors relative border border-border"
              >
                <Bell strokeWidth={2.2} className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>

              <div className="w-9 h-9 rounded-full bg-primary/8 text-primary flex items-center justify-center font-display font-bold text-[13px] border border-primary/10 shadow-sm">
                N
              </div>
            </div>
          </header>

          <div className="flex-1 py-6 space-y-8">
            
            {/* SECTION 2: PRIMARY HERO CARD (~170px, Rounded 24px) */}
            <motion.button 
              whileHover={{ y: -4, scale: 1.002 }}
              whileTap={{ scale: 0.99 }}
              transition={appleSpring}
              onClick={handleCreateNew}
              className="relative w-full p-6 rounded-[24px] bg-gradient-to-br from-[#0A5C36] via-[#0D7343] to-[#0A5C36] text-surface text-left flex flex-col justify-between h-[175px] shadow-[0_16px_36px_-6px_rgba(10,92,54,0.22)] border border-primary/20 overflow-hidden group cursor-pointer"
            >
              {/* Glossy sweep reflex overlay */}
              <div className="sweep-overlay" />
              
              <div className="w-11 h-11 rounded-full bg-white/12 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-sm">
                <Plus strokeWidth={2.6} className="w-5.5 h-5.5 text-surface" />
              </div>
              
              <div className="flex justify-between items-end w-full">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-[22px] leading-tight">
                    Create Agreement
                  </h3>
                  <p className="text-[13px] text-surface/85 font-medium max-w-[240px]">
                    Create legally binding digital agreements.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[13px] font-bold tracking-wider uppercase bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full border border-white/25">
                  Start
                  <ArrowUpRight strokeWidth={2.5} className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.button>

            {/* SECTION 3: PENDING ACTIONS (Horizontal Widget Feed) */}
            {pendingActions.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">
                  Pending Actions ({pendingActions.length})
                </h3>
                <div className="flex overflow-x-auto scrollbar-none gap-4 pb-2 -mx-4 px-4">
                  {pendingActions.map((act) => (
                    <motion.div
                      key={act.id}
                      whileTap={{ scale: 0.98 }}
                      className="min-w-[220px] max-w-[220px] p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between h-[115px] shadow-[var(--shadow-level-1)] shrink-0 cursor-pointer hover:border-warning/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded-full bg-warning/8 text-warning text-[9px] font-bold uppercase tracking-wider">
                          {act.type}
                        </span>
                        <span className="text-[10px] text-secondary-text font-semibold">{act.time}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-[13.5px] truncate">{act.title}</h4>
                        <p className="text-[11px] text-secondary-text mt-0.5 font-medium">{act.status}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: RECENT AGREEMENTS (Apple Wallet stacked look) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">
                  Recent Agreements
                </h3>
                <button className="text-[11.5px] text-primary hover:text-[#084D2D] font-bold tracking-wider uppercase transition-colors">
                  View All
                </button>
              </div>

              {/* Stacked layout items */}
              <div className="space-y-2.5">
                {recentAgreements.map((agreement) => (
                  <motion.div 
                    key={agreement.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-4 bg-surface border border-border rounded-[16px] flex items-center justify-between shadow-[var(--shadow-level-1)] hover:shadow-sm transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/[0.03] border border-primary/5 text-primary flex items-center justify-center shrink-0">
                        <FileText strokeWidth={1.8} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground text-[14.5px] truncate">{agreement.title}</h4>
                        <p className="text-[11.5px] text-secondary-text mt-0.5 font-medium">
                          Party: {agreement.party} • {agreement.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        agreement.status === "Active" ? "bg-verified text-success" :
                        agreement.status === "Pending Signature" ? "bg-[#FFF2E0] text-[#B76E00]" :
                        "bg-[#EFEFEF] text-foreground"
                      }`}>
                        {agreement.status}
                      </span>
                      <ChevronRight strokeWidth={2.4} className="w-4 h-4 text-secondary-text transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SECTION 5: QUICK ACTIONS (2x2 Grid) */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between h-[90px] shadow-[var(--shadow-level-1)] hover:border-primary/20 transition-all cursor-pointer"
                >
                  <FileText strokeWidth={2} className="w-5 h-5 text-primary" />
                  <span className="text-[13.5px] font-semibold text-foreground">Templates</span>
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between h-[90px] shadow-[var(--shadow-level-1)] hover:border-primary/20 transition-all cursor-pointer"
                >
                  <Inbox strokeWidth={2} className="w-5 h-5 text-primary" />
                  <span className="text-[13.5px] font-semibold text-foreground">Drafts</span>
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between h-[90px] shadow-[var(--shadow-level-1)] hover:border-primary/20 transition-all cursor-pointer"
                >
                  <Scan strokeWidth={2} className="w-5 h-5 text-primary" />
                  <span className="text-[13.5px] font-semibold text-foreground">Scan Document</span>
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-surface border border-border rounded-[16px] flex flex-col justify-between h-[90px] shadow-[var(--shadow-level-1)] hover:border-primary/20 transition-all cursor-pointer"
                >
                  <HelpCircle strokeWidth={2} className="w-5 h-5 text-primary" />
                  <span className="text-[13.5px] font-semibold text-foreground">Help Center</span>
                </motion.div>
              </div>
            </div>

            {/* SECTION 6: ACTIVITY TIMELINE (Lightweight Log) */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-[14px] text-secondary-text uppercase tracking-wider">
                Activity
              </h3>
              <div className="bg-surface/50 border border-border rounded-[16px] p-4 space-y-4 shadow-[var(--shadow-level-1)]">
                {activities.map((act, idx) => (
                  <div key={act.id} className="flex gap-3 text-[13px] leading-relaxed relative">
                    {/* Timeline line connection */}
                    {idx < activities.length - 1 && (
                      <span className="absolute left-2.5 top-6 bottom-[-16px] w-[1px] bg-border" />
                    )}
                    
                    <div className="w-5 h-5 rounded-full bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>

                    <div className="flex-1 flex justify-between gap-2 min-w-0">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{act.message}</p>
                        <p className="text-[11.5px] text-secondary-text mt-0.5 truncate">{act.details}</p>
                      </div>
                      <span className="text-[11px] text-secondary-text font-medium shrink-0">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </main>

        {/* SECTION 7: BOTTOM NAVIGATION (Floating Deck, centered Create tab emphasized, NO logout) */}
        <div className="lg:hidden fixed bottom-5 left-4 right-4 z-40">
          <nav className="h-16 backdrop-blur-[28px] bg-surface/75 border border-white/20 rounded-[20px] flex items-center justify-around px-2 shadow-[var(--shadow-level-3)]">
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

            {/* Emphasized Central Create Button */}
            <button
              onClick={handleCreateNew}
              className="flex flex-col items-center justify-center flex-1 py-1 -translate-y-2 relative"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-surface flex items-center justify-center shadow-lg border-4 border-background hover:bg-[#084D2D] transition-colors">
                <Plus strokeWidth={2.8} className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-bold text-primary mt-1 absolute -bottom-3">Create</span>
            </button>
            
            <button
              onClick={() => setActiveTab("activity")}
              className="flex flex-col items-center justify-center flex-1 py-1"
            >
              <div className={`px-4 py-1.5 rounded-full transition-all duration-300 ${activeTab === "activity" ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
                <Activity strokeWidth={activeTab === "activity" ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 transition-colors ${activeTab === "activity" ? "text-primary" : "text-secondary-text"}`}>Activity</span>
            </button>
            
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center justify-center flex-1 py-1"
            >
              <div className={`px-4 py-1.5 rounded-full transition-all duration-300 ${activeTab === "profile" ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
                <User strokeWidth={activeTab === "profile" ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 transition-colors ${activeTab === "profile" ? "text-primary" : "text-secondary-text"}`}>Profile</span>
            </button>
          </nav>
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
