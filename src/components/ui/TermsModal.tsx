"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShieldCheck, Lock } from "lucide-react"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-surface rounded-[24px] shadow-2xl border border-border overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-divider bg-[#F8FAFC]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-foreground tracking-tight">Terms & Conditions</h3>
                <p className="text-[12px] text-secondary-text font-medium">eSaleAgreement Legal Policy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-secondary-text hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto space-y-4 text-[13.5px] leading-relaxed text-secondary-text">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 text-primary text-[12.5px] font-semibold border border-primary/10">
              <Lock className="w-4 h-4 shrink-0" />
              <span>DPDP Act Compliant & Legally Enforceable eSign Platform</span>
            </div>

            <section className="space-y-1.5">
              <h4 className="font-bold text-foreground text-[14px]">1. Digital Identity Verification (eKYC)</h4>
              <p>
                By using eSaleAgreement, you authorize verification of your Aadhaar eKYC, Udyam registration, or GSTIN via authorized government identity gateways.
              </p>
            </section>

            <section className="space-y-1.5">
              <h4 className="font-bold text-foreground text-[14px]">2. eSign Legal Validity</h4>
              <p>
                Electronic signatures generated through Aadhaar OTP / eSign are legally valid and enforceable under the Information Technology Act, 2000 in India.
              </p>
            </section>

            <section className="space-y-1.5">
              <h4 className="font-bold text-foreground text-[14px]">3. Privacy & Data Protection</h4>
              <p>
                Your data is end-to-end encrypted. We comply strictly with Digital Personal Data Protection (DPDP) standards and never share personal records with unauthorized third parties.
              </p>
            </section>

            <section className="space-y-1.5">
              <h4 className="font-bold text-foreground text-[14px]">4. B2C Subscription Terms</h4>
              <p>
                B2C merchants pay a one-time ₹99 lifetime subscription fee for unlimited agreement generation and customer verification workflows.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-divider bg-surface">
            <button
              onClick={onClose}
              className="w-full h-[48px] rounded-[14px] bg-primary text-surface font-semibold text-[15px] hover:opacity-90 transition-opacity"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
