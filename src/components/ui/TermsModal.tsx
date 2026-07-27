"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from "lucide-react"

export type LegalDocTab = "privacy" | "terms" | "consent"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: LegalDocTab
}

export function TermsModal({ isOpen, onClose, initialTab = "terms" }: TermsModalProps) {
  const [activeTab, setActiveTab] = React.useState<LegalDocTab>(initialTab)

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="flex flex-col p-4 border-b border-slate-200/80 bg-slate-50/90 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0052CC]/10 flex items-center justify-center text-[#0052CC]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#0F172A] tracking-tight">Legal Documents</h3>
                  <p className="text-[11.5px] text-slate-500 font-medium">Trilok Infotech Private Limited • DPDP Act 2023</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Document Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-[14px]">
              <button
                type="button"
                onClick={() => setActiveTab("privacy")}
                className={`py-2 px-1 text-[11.5px] font-bold rounded-[10px] transition-all text-center truncate ${
                  activeTab === "privacy"
                    ? "bg-white text-[#0052CC] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1. Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("terms")}
                className={`py-2 px-1 text-[11.5px] font-bold rounded-[10px] transition-all text-center truncate ${
                  activeTab === "terms"
                    ? "bg-white text-[#0052CC] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2. Terms & Conditions
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("consent")}
                className={`py-2 px-1 text-[11.5px] font-bold rounded-[10px] transition-all text-center truncate ${
                  activeTab === "consent"
                    ? "bg-white text-[#0052CC] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                3. Consent Notice
              </button>
            </div>
          </div>

          {/* Body Content per Tab */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-[13px] leading-relaxed text-slate-700">
            
            {/* 1. PRIVACY POLICY */}
            {activeTab === "privacy" && (
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-blue-50/80 text-[#0052CC] text-[12px] font-semibold border border-blue-200/70 flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Compliant with Digital Personal Data Protection (DPDP) Act, 2023 (India)</span>
                </div>

                <h4 className="text-[16px] font-extrabold text-[#0F172A]">Privacy Policy</h4>
                <p className="text-[11.5px] text-slate-500 font-semibold">Last Updated: July 2026</p>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">1. Introduction</h5>
                  <p>
                    eSaleAgreement, a product of Trilok Infotech Private Limited, respects your privacy and is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 and other applicable Indian laws.
                  </p>
                </section>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">2. Information We Collect</h5>
                  <p>We may collect:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-[12.5px]">
                    <li>Full Name</li>
                    <li>Mobile Number & Email Address</li>
                    <li>Aadhaar Number (only for authentication) & eKYC details</li>
                    <li>Photograph, Address & Date of Birth</li>
                    <li>Device Information & IP Address</li>
                    <li>Agreement Details & Electronic Signatures</li>
                    <li>Transaction Logs</li>
                  </ul>
                </section>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">3. Purpose of Collection</h5>
                  <p>Your information is collected only to:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-[12.5px]">
                    <li>Verify identity</li>
                    <li>Generate legally valid electronic agreements</li>
                    <li>Prevent fraud & maintain transaction records</li>
                    <li>Comply with legal obligations & improve services</li>
                  </ul>
                </section>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">4. Legal Basis & Data Sharing</h5>
                  <p>
                    Your personal data is processed only after obtaining your explicit consent. Information is shared only with UIDAI Authorized eKYC Service Providers, Government Authorities (when legally required), Banks/NBFCs (upon your financing request), and Cloud Infrastructure Providers. We never sell your personal information.
                  </p>
                </section>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">5. Data Security & Retention</h5>
                  <p>
                    We use encryption, secure servers, role-based access, and audit logs. Information is retained only as long as required for regulatory, dispute resolution, or audit compliance.
                  </p>
                </section>

                <section className="space-y-1">
                  <h5 className="font-bold text-[#0F172A] text-[13.5px]">6. Grievance Redressal</h5>
                  <p>
                    Grievance Officer: Trilok Infotech Legal Team<br />
                    Email: legal@trilokinfotech.com | Website: esaleagreement.com
                  </p>
                </section>
              </div>
            )}

            {/* 2. TERMS & CONDITIONS */}
            {activeTab === "terms" && (
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-blue-50/80 text-[#0052CC] text-[12px] font-semibold border border-blue-200/70 flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Aadhaar eKYC Terms & Enforceability</span>
                </div>

                <h4 className="text-[16px] font-extrabold text-[#0F172A]">Terms & Conditions</h4>
                <p className="text-[11.5px] text-slate-500 font-semibold">By using eSaleAgreement, you agree that:</p>

                <ol className="list-decimal pl-5 space-y-1.5 text-[12.5px]">
                  <li>You voluntarily choose Aadhaar eKYC for identity verification.</li>
                  <li>You authorize eSaleAgreement to verify your identity using an authorized Aadhaar authentication service provider.</li>
                  <li>Your Aadhaar information will be used only for Identity Verification, Agreement Creation, Fraud Prevention, and Legal Compliance.</li>
                  <li>Your Aadhaar information will never be used for advertising or marketing.</li>
                  <li>You confirm the information provided by you is true and accurate.</li>
                  <li>Any misuse of the platform may result in immediate suspension.</li>
                  <li>eSaleAgreement does not guarantee approval of any financial transaction merely because identity verification succeeds.</li>
                  <li>Agreements generated remain subject to applicable Indian laws (IT Act 2000).</li>
                  <li>You agree to the Privacy Policy and Grievance Redressal mechanism.</li>
                  <li>Courts in India shall have jurisdiction unless otherwise required by law.</li>
                </ol>
              </div>
            )}

            {/* 3. AADHAAR EKYC CONSENT NOTICE */}
            {activeTab === "consent" && (
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-emerald-50 text-[#10B981] text-[12px] font-semibold border border-emerald-200/70 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Explicit DPDP Act 2023 Consent Notice</span>
                </div>

                <h4 className="text-[16px] font-extrabold text-[#0F172A]">Consent for Aadhaar eKYC</h4>
                <p className="text-[12.5px] text-slate-700">
                  By selecting <strong>"I Agree"</strong>, I voluntarily provide my consent to eSaleAgreement to collect and process my Aadhaar number and Aadhaar eKYC information solely for:
                </p>

                <ul className="list-disc pl-5 space-y-1 text-[12.5px]">
                  <li>Identity Verification</li>
                  <li>Electronic Agreement Creation</li>
                  <li>Fraud Prevention</li>
                  <li>Regulatory Compliance & Record Management</li>
                </ul>

                <div className="p-3 rounded-xl bg-slate-100/90 text-slate-700 space-y-1.5 text-[12px] font-medium border border-slate-200/80">
                  <p className="font-bold text-[#0F172A]">I Understand That:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>My Aadhaar information will only be used for the above purposes.</li>
                    <li>My data may be securely shared with authorized Aadhaar eKYC service providers solely to complete verification.</li>
                    <li>My data will be protected using appropriate technical and organizational security measures.</li>
                    <li>I may withdraw my consent where permitted by applicable law.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-[11.5px] font-medium border border-amber-200/70">
                  ⚡ <strong>Powered by an Authorized Aadhaar eKYC Service Provider.</strong> eSaleAgreement does not store or use Aadhaar data beyond the purposes described in the Privacy Policy and applicable law.
                </div>
              </div>
            )}
          </div>

          {/* Footer Button */}
          <div className="p-4 border-t border-slate-200/80 bg-slate-50/90 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-[46px] rounded-[14px] bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-bold text-[14.5px] shadow-md hover:opacity-95 transition-opacity"
            >
              I Have Read & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
