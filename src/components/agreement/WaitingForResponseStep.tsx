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
        
        {/* Status Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
            <Clock className="w-12 h-12 text-[#0033A0]" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#1E9E40] flex items-center justify-center border-4 border-white shadow-sm">
            <Send className="w-3.5 h-3.5 text-white -ml-0.5 mt-0.5" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-[22px] font-bold text-[#041B4A] leading-tight text-center mb-3">
          Invitation Sent!
        </h2>
        <p className="text-[14px] text-gray-500 font-medium text-center max-w-[260px] leading-relaxed">
          Waiting for the other party to review the agreement. You will be notified once they respond.
        </p>

        {/* Note */}
        <div className="mt-8 bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100 max-w-[300px]">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[12px] font-medium text-amber-800 leading-relaxed text-left">
            You can close this app safely. We'll send you a push notification when the agreement is accepted.
          </p>
        </div>

      </div>

      {/* Dev Action */}
      <div className="mt-auto pt-6 space-y-4">
        <div className="text-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Developer Mode</span>
        </div>
        <Button 
          onClick={onNext}
          variant="secondary"
          className="w-full h-[52px] border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 rounded-[14px] text-[14px] font-bold shadow-sm"
        >
          Simulate Acceptance <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  )
}
