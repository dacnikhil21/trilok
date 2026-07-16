"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Plus, FileText, Inbox, ShieldCheck, Home, Settings, Bell, 
  Clock, ArrowUpRight, ChevronRight, LogOut, CheckCircle2 
} from "lucide-react"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { StatusCard } from "@/components/ui/StatusCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/ui/BottomNavigation"

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
          title: "Trilok B2B",
          subtitle: "Enterprise Contract Suite",
        }
      case "b2c":
        return {
          title: "Trilok B2C",
          subtitle: "Merchant Agreement Portal",
        }
      case "c2c":
      default:
        return {
          title: "Trilok C2C",
          subtitle: "Peer-to-Peer Agreement Hub",
        }
    }
  }, [moduleType])

  const greeting = React.useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning 👋"
    if (hour < 17) return "Good Afternoon 👋"
    return "Good Evening 👋"
  }, [])

  const recentAgreements = AGREEMENTS_BY_MODULE[moduleType] || AGREEMENTS_BY_MODULE.c2c
  const pendingInvs = PENDING_INVITATIONS[moduleType] || PENDING_INVITATIONS.c2c

  const handleLogout = () => {
    router.push("/login")
  }

  const appleSpring = { type: "spring", stiffness: 350, damping: 28, mass: 0.8 } as const

  return (
    <AppContainer>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* SIDE NAVIGATION (Desktop Only) */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface/30 backdrop-blur-[24px] border-r border-border/40 p-6 justify-between shrink-0 z-20">
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-0 z-10">
          {/* HEADER */}
          <header className="bg-surface/30 backdrop-blur-[24px] border-b border-border/30 px-6 py-5 sticky top-0 z-30">
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
              <div className="space-y-1">
                <p className="text-[13px] text-secondary-text font-bold tracking-wider uppercase leading-none">{greeting}</p>
                <h2 className="text-[28px] font-display font-bold text-foreground leading-tight tracking-tight">Nikhil</h2>
                <p className="text-[11px] text-primary font-bold tracking-wider uppercase mt-1">{config.title} • {config.subtitle}</p>
              </div>

              <div className="flex items-center gap-3.5">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 text-secondary-text hover:text-foreground hover:bg-divider/50 rounded-full transition-colors relative border border-border"
                >
                  <Bell strokeWidth={2.2} className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
                </button>

                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center font-display font-bold text-[14px] border border-primary/10 shadow-sm">
                  N
                </div>
              </div>
            </div>
          </header>

          {/* DASHBOARD HOME HIERARCHY */}
          <div className="flex-1 p-5 sm:p-6 space-y-8 max-w-4xl w-full mx-auto">
            {/* 1. VERIFICATION STATUS BANNER */}
            <StatusCard
              variant="success"
              icon={CheckCircle2}
              title="Identity Fully Authenticated"
              description="Your Aadhaar eKYC is verified. You are authorized to construct, legally stamp, and sign agreements inside the workspace."
            />

            {/* 2. HERO CREATE AGREEMENT CARD (Compact, Mobile-First) */}
            <motion.button 
              whileHover={{ y: -3, scale: 1.002 }}
              whileTap={{ scale: 0.995 }}
              transition={appleSpring}
              className="relative w-full p-5 sm:p-6 rounded-[var(--radius-md)] bg-gradient-to-br from-[#0A5C36] via-[#0E7345] to-[#0A5C36] text-surface text-left flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-[0_12px_30px_-6px_rgba(10,92,54,0.2)] border border-primary/20 overflow-hidden group"
            >
              {/* Apple light sweep reflection */}
              <div className="sweep-overlay" />
              
              <div className="w-10 h-10 rounded-full bg-white/12 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                <Plus strokeWidth={2.4} className="w-5 h-5 text-surface" />
              </div>
              
              <div className="space-y-1 mt-4">
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] leading-tight flex items-center gap-1.5">
                  Create Agreement
                  <ArrowUpRight strokeWidth={2.5} className="w-4.5 h-4.5 opacity-80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                <p className="text-[13px] text-surface/85 font-medium leading-normal max-w-[420px]">
                  Draft a legally-compliant contract tailored for your specific transaction type.
                </p>
              </div>
            </motion.button>

            {/* 3. RECENT AGREEMENTS SECTION */}
            <div className="space-y-3">
              <SectionTitle
                title="Recent Agreements"
                icon={Clock}
                actionLabel="View All"
                onActionClick={() => {}}
              />

              <Card className="divide-y divide-divider overflow-hidden">
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
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
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
              </Card>
            </div>

            {/* 4. PENDING INVITATIONS */}
            {pendingInvs.length > 0 && (
              <div className="space-y-3">
                <SectionTitle title={`Pending Invitations (${pendingInvs.length})`} icon={Inbox} />
                
                <div className="space-y-2.5">
                  {pendingInvs.map((inv) => (
                    <StatusCard
                      key={inv.id}
                      variant="warning"
                      title={inv.title}
                      description={`Sent by ${inv.sender} • ${inv.date}`}
                      actionNode={
                        <Button size="sm" className="h-9 text-[12px] px-3.5 font-bold shadow-sm">
                          Review & Sign
                        </Button>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 5. TEMPLATES (Secondary Action) */}
            <div className="space-y-3">
              <SectionTitle title="Agreement Layout Templates" icon={FileText} />
              
              <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-[16px] leading-tight">Template Library</h4>
                  <p className="text-[13px] text-secondary-text leading-relaxed font-medium">
                    Access certified corporate forms, individual lease covenants, and vendor contracts.
                  </p>
                </div>
                <Button variant="secondary" className="h-11 text-[13px] font-bold shadow-sm group whitespace-nowrap">
                  Browse Covenants
                  <ChevronRight strokeWidth={2.4} className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Card>
            </div>
          </div>
        </main>

        {/* 6. BOTTOM NAVIGATION (Mobile Glass Deck) */}
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout}
          unreadCount={pendingInvs.length}
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
