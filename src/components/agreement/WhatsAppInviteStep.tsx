import * as React from "react"
import { MessageSquare, User, Loader2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function WhatsAppInviteStep({ data, updateData, onNext }: Props) {
  const [sending, setSending] = React.useState(false)

  const handleSend = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      onNext() // Move to buyer verification simulation
    }, 2000)
  }

  const otherRole = data.role === "seller" ? "Buyer" : "Seller"

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Invite {otherRole}
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[240px] mx-auto">
          Send the agreement details to the {otherRole.toLowerCase()} via WhatsApp for review and Aadhaar verification.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">{otherRole} WhatsApp Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-[#041B4A]">+91</span>
            <Input 
              type="tel"
              value={data.buyerMobile}
              onChange={(e) => updateData({ buyerMobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="91234 56789"
              className="pl-12 pr-10 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
              <MessageSquare className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">{otherRole} Name</label>
          <div className="relative">
            <Input 
              type="text"
              value={data.buyerName}
              onChange={(e) => updateData({ buyerName: e.target.value })}
              placeholder={`e.g. Priya Verma`}
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center bg-blue-50/50 p-4 rounded-[12px] border border-blue-100">
        <p className="text-[12px] font-medium text-blue-800">
          <strong>Demo Note:</strong> Clicking Send will simulate the {otherRole} receiving the link and opening it to complete their Aadhaar verification.
        </p>
      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6">
        <Button 
          onClick={handleSend}
          disabled={sending}
          className="w-full h-[52px] bg-[#25D366] hover:bg-[#1DA851] text-white rounded-[14px] text-[16px] font-bold shadow-lg gap-2"
        >
          {sending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Invite...
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              Send WhatsApp Invite
            </>
          )}
        </Button>
      </div>

    </div>
  )
}
