import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, FileText, Camera, CreditCard, ShieldCheck, X } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function ReviewSignStep({ data, onNext }: Props) {
  const [agreed, setAgreed] = React.useState(false)
  const [showSignModal, setShowSignModal] = React.useState<"customer" | "business" | null>(null)
  const [signedBy, setSignedBy] = React.useState({ customer: false, business: false })

  const handleSign = () => {
    if (showSignModal === "customer") setSignedBy(prev => ({ ...prev, customer: true }))
    if (showSignModal === "business") setSignedBy(prev => ({ ...prev, business: true }))
    setShowSignModal(null)
  }

  // Auto proceed when both are signed
  React.useEffect(() => {
    if (signedBy.customer && signedBy.business) {
      setTimeout(onNext, 600)
    }
  }, [signedBy, onNext])

  const sections = [
    { id: "seller", icon: User, title: "Seller Details" },
    { id: "customer", icon: User, title: "Customer Details" },
    { id: "product", icon: FileText, title: "Product Details" },
    { id: "photos", icon: Camera, title: "Product Photos" },
    { id: "payment", icon: CreditCard, title: "Payment & Delivery" },
    { id: "terms", icon: ShieldCheck, title: "Terms & Conditions" },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Review Agreement
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Please review all details carefully
        </p>
      </div>

      {/* Accordions (Mocked visually) */}
      <div className="space-y-3 mb-6">
        {sections.map(sec => (
          <div key={sec.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-[12px] shadow-sm">
            <div className="flex items-center gap-3">
              <sec.icon className="w-5 h-5 text-[#041B4A]/60" />
              <span className="text-[14px] font-semibold text-[#041B4A]">{sec.title}</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer mt-auto">
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input 
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-[6px] checked:bg-[#0033A0] checked:border-[#0033A0] transition-colors"
          />
          <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-[12.5px] font-medium text-[#041B4A] leading-tight pt-0.5">
          I have reviewed all details and agree to the terms.
        </p>
      </label>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3 pb-6">
        <Button 
          disabled={signedBy.customer}
          onClick={() => setShowSignModal("customer")}
          className="w-full h-[52px] bg-[#1E9E40] hover:bg-[#168833] text-white rounded-[14px] text-[16px] font-bold shadow-lg flex justify-between px-6"
        >
          <span>Customer eSign</span>
          <span className="text-white/80 font-medium text-[13px]">(Customer Sign)</span>
        </Button>

        <Button 
          disabled={signedBy.business}
          onClick={() => setShowSignModal("business")}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg flex justify-between px-6"
        >
          <span>Business eSign</span>
          <span className="text-white/80 font-medium text-[13px]">(You Sign)</span>
        </Button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showSignModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-sm rounded-t-[24px] sm:rounded-[24px] p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowSignModal(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mt-2 mb-6">
                <div className="w-16 h-16 bg-[#0033A0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#0033A0]" />
                </div>
                <h3 className="text-[20px] font-bold text-[#041B4A]">
                  {showSignModal === "customer" ? "Customer Signature" : "Business Signature"}
                </h3>
                <p className="text-[13px] text-gray-500 mt-2 font-medium">
                  By signing below, you legally agree to the terms stated in this document.
                </p>
              </div>

              {/* Mock Signature Pad */}
              <div className="w-full h-[140px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-[16px] flex items-center justify-center mb-6">
                <span className="text-gray-400 font-medium text-[14px]">Draw signature here...</span>
              </div>

              <Button 
                onClick={handleSign}
                className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
              >
                Complete eSign
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
