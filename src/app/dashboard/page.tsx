"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Plus, FileText, Inbox, ShieldCheck, Home, Settings, Search, Bell, 
  Clock, ArrowUpRight, Users, ChevronRight, Menu, LogOut, CheckCircle2 
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* SIDE NAVIGATION (Desktop Only) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface border-r border-border p-6 justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2 px-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-[18px] text-foreground">eSaleAgreement</span>
          </div>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all ${activeTab === "home" ? "bg-primary/10 text-primary" : "text-secondary-text hover:text-foreground hover:bg-divider"}`}
            >
              <Home className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("agreements")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all ${activeTab === "agreements" ? "bg-primary/10 text-primary" : "text-secondary-text hover:text-foreground hover:bg-divider"}`}
            >
              <FileText className="w-5 h-5" />
              My Agreements
            </button>
            <button
              onClick={() => setActiveTab("invitations")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all ${activeTab === "invitations" ? "bg-primary/10 text-primary" : "text-secondary-text hover:text-foreground hover:bg-divider"}`}
            >
              <Inbox className="w-5 h-5" />
              Inbox
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all ${activeTab === "settings" ? "bg-primary/10 text-primary" : "text-secondary-text hover:text-foreground hover:bg-divider"}`}
            >
              <Settings className="w-5 h-5" />
              Workspace Settings
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-error hover:bg-error/5 rounded-[var(--radius-sm)] text-[14px] font-semibold transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* HEADER AREA */}
        <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 lg:gap-0">
            <div className="lg:hidden p-1.5 hover:bg-divider rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-[20px] text-foreground leading-none">{config.title}</h1>
              <p className="text-[12px] text-secondary-text mt-1 font-medium">{config.subtitle} • {config.entityLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 text-secondary-text hover:text-foreground hover:bg-divider rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </button>

            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-[14px]">
              U
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="flex-1 p-6 space-y-6 max-w-5xl w-full mx-auto">
          {/* VERIFICATION SUCCESS BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-verified border border-primary/15 rounded-[var(--radius-md)] p-5 flex items-start gap-4 shadow-sm"
          >
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-[16px] mb-1">Identity Fully Authenticated</h3>
              <p className="text-[13px] text-secondary-text leading-relaxed">
                Your Aadhaar eKYC is verified. You are authorized to construct, legally stamp, and sign agreements inside the workspace.
              </p>
            </div>
            <div className="hidden sm:inline-flex px-3 py-1 rounded-full bg-primary text-surface font-semibold text-[11px] uppercase tracking-wider">
              Verified
            </div>
          </motion.div>

          {/* MAIN CTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Agreement Card */}
            <motion.button 
              whileHover={{ y: -4 }}
              className="p-6 rounded-[var(--radius-md)] bg-primary text-surface text-left flex flex-col justify-between min-h-[160px] shadow-[var(--shadow-level-2)] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-surface/15 flex items-center justify-center">
                <Plus className="w-6 h-6 text-surface" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[22px] leading-tight flex items-center gap-2 mb-1">
                  Create Agreement
                  <ArrowUpRight className="w-5 h-5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-[13px] text-surface/80">Draft a legally-compliant contract tailored for your specific transaction type.</p>
              </div>
            </motion.button>

            {/* Template Hub Card */}
            <motion.button 
              whileHover={{ y: -4 }}
              className="p-6 rounded-[var(--radius-md)] bg-surface border border-border text-left flex flex-col justify-between min-h-[160px] shadow-[var(--shadow-level-1)] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#F4F4F4] text-foreground flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[22px] text-foreground leading-tight flex items-center gap-2 mb-1">
                  Template Library
                  <ChevronRight className="w-5 h-5 text-secondary-text transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-[13px] text-secondary-text">Select from attorney-reviewed digital agreement layouts and formats.</p>
              </div>
            </motion.button>
          </div>

          {/* INBOX / PENDING ACTIONS */}
          {pendingInvs.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-[18px] text-foreground flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-primary" />
                  Pending Invitations ({pendingInvs.length})
                </h3>
              </div>
              <div className="space-y-3">
                {pendingInvs.map((inv) => (
                  <div key={inv.id} className="p-4 rounded-[var(--radius-md)] border border-warning/30 bg-[#FFFDF5] flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground text-[15px]">{inv.title}</h4>
                      <p className="text-[12px] text-secondary-text">Sent by <span className="font-medium text-foreground">{inv.sender}</span> • {inv.date}</p>
                    </div>
                    <Button size="sm" className="h-10 text-[13px] px-4">
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
              <h3 className="font-display font-bold text-[18px] text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Agreements
              </h3>
              <button className="text-[13px] text-primary hover:text-[#084D2D] font-bold">
                View All
              </button>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-md)] divide-y divide-divider overflow-hidden shadow-sm">
              {recentAgreements.map((agreement) => (
                <div key={agreement.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-[#FAF9F6] transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#F4F4F4] text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground text-[15px] truncate">{agreement.title}</h4>
                      <p className="text-[12px] text-secondary-text mt-0.5">
                        Party: <span className="font-medium text-foreground">{agreement.party}</span> • Created {agreement.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="font-semibold text-foreground text-[14px]">{agreement.amount}</span>
                      <span className="text-[11px] text-secondary-text">Agreement Value</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        agreement.status === "Active" ? "bg-verified text-success" :
                        agreement.status === "Pending Signature" ? "bg-[#FFF2E0] text-[#B76E00]" :
                        "bg-[#EFEFEF] text-foreground"
                      }`}>
                        {agreement.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-secondary-text" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM NAVIGATION (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around z-40 px-4">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center ${activeTab === "home" ? "text-primary" : "text-secondary-text"}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button
          onClick={() => setActiveTab("agreements")}
          className={`flex flex-col items-center justify-center ${activeTab === "agreements" ? "text-primary" : "text-secondary-text"}`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Contracts</span>
        </button>
        <button
          onClick={() => setActiveTab("invitations")}
          className={`flex flex-col items-center justify-center ${activeTab === "invitations" ? "text-primary" : "text-secondary-text"} relative`}
        >
          <Inbox className="w-5 h-5" />
          {pendingInvs.length > 0 && (
            <span className="absolute top-0 right-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface" />
          )}
          <span className="text-[10px] font-bold mt-1">Inbox</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center text-error"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Sign Out</span>
        </button>
      </nav>
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
