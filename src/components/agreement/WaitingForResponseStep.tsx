import * as React from "react"
import { Clock, Send, ShieldAlert, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onNext: () => void
}

export function WaitingForResponseStep({ onNext }: Props) {
  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Clock className="w-12 h-12 text-[#2563EB]" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center border-4 border-white shadow-sm">
            <Send className="w-3.5 h-3.5 text-white -ml-0.5 mt-0.5" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-[22px] font-bold text-[#0F172A] leading-tight text-center mb-3">
          Invitation Sent!
        </h2>
        <p className="text-[14px] text-[#64748B] font-medium text-center max-w-[260px] leading-relaxed">
          Waiting for the other party to review the agreement. You will be notified once they respond.
        </p>

        <div className="mt-8 bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100 max-w-[300px]">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[12px] font-medium text-amber-800 leading-relaxed text-left">
            You can close this app safely. We&apos;ll send you a notification when the agreement is accepted.
          </p>
        </div>

      </div>

      <div className="mt-auto pt-6">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Party Accepted — Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  )
}
