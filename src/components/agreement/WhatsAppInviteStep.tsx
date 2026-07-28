import * as React from "react"
import { MessageSquare, User, Loader2, Link as LinkIcon, Smartphone } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function WhatsAppInviteStep({ data, updateData, onNext }: Props) {
  const [sending, setSending] = React.useState<string | null>(null)

  const handleSend = (method: string) => {
    setSending(method)
    setTimeout(() => {
      setSending(null)
      onNext() // Move to WaitingForResponseStep
    }, 1500)
  }

  const otherRole = data.role === "seller" ? "Buyer" : "Seller"

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Other Party Details
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[240px] mx-auto">
          Enter the {otherRole.toLowerCase()}'s details to send them a secure invitation link.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">{otherRole} Name</label>
          <div className="relative">
            <Input 
              type="text"
              value={data.invitedPartyName}
              onChange={(e) => updateData({ invitedPartyName: e.target.value })}
              placeholder={`e.g. Ramesh Kumar`}
              className="pl-12 pr-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">{otherRole} Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-[#041B4A]">+91</span>
            <Input 
              type="tel"
              value={data.invitedPartyMobile}
              onChange={(e) => updateData({ invitedPartyMobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="91234 56789"
              className="pl-12 pr-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-auto mb-8 space-y-3 pt-6">
        <Button 
          onClick={() => handleSend("gmail")}
          disabled={!data.invitedPartyMobile || !data.invitedPartyName || !!sending}
          className="w-full h-[52px] bg-[#EA4335] hover:bg-[#D93025] text-white rounded-[14px] text-[16px] font-bold shadow-lg shadow-[#EA4335]/20 flex items-center justify-center gap-2"
        >
          {sending === "gmail" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#FFFFFF" />
              </svg>
              Send via Gmail
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary"
            onClick={() => handleSend("sms")}
            disabled={!data.invitedPartyMobile || !data.invitedPartyName || !!sending}
            className="w-full h-[52px] border-2 border-gray-200 text-[#041B4A] hover:bg-gray-50 rounded-[14px] text-[15px] font-bold"
          >
            {sending === "sms" ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Smartphone className="w-4 h-4 mr-2" /> Send SMS</>}
          </Button>

          <Button 
            variant="secondary"
            onClick={() => handleSend("link")}
            disabled={!data.invitedPartyMobile || !data.invitedPartyName || !!sending}
            className="w-full h-[52px] border-2 border-gray-200 text-[#041B4A] hover:bg-gray-50 rounded-[14px] text-[15px] font-bold"
          >
            {sending === "link" ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LinkIcon className="w-4 h-4 mr-2" /> Share Link</>}
          </Button>
        </div>
      </div>

    </div>
  )
}
