import * as React from "react"
import { MapPin, Navigation, CheckCircle2, Loader2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function GpsVerificationStep({ data, updateData, onNext }: Props) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const captureLocation = () => {
    setLoading(true)
    // Simulate GPS API call
    setTimeout(() => {
      updateData({ 
        creatorLocation: "19.0760° N, 72.8777° E (Mumbai)",
        invitedPartyLocation: "19.0760° N, 72.8777° E (Mumbai)"
      })
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          GPS Verification
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[260px] mx-auto">
          Capture the physical location of both parties at the time of signing.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10 space-y-8">
        
        {/* Map UI Mock */}
        <div className="w-full max-w-[280px] h-[280px] bg-blue-50 rounded-full flex flex-col items-center justify-center border-4 border-[#0033A0]/10 relative">
          
          {/* Radar Animation */}
          {loading && (
             <div className="absolute inset-0 rounded-full border-2 border-[#0033A0]/30 animate-ping" />
          )}

          {success ? (
            <div className="text-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-[#1E9E40] mx-auto mb-2" />
              <p className="text-[14px] font-bold text-[#1E9E40]">Location Captured</p>
              <p className="text-[11px] font-medium text-gray-500 mt-1">Accuracy: 5 meters</p>
            </div>
          ) : (
            <MapPin className={`w-16 h-16 text-[#0033A0] ${loading ? "animate-bounce" : ""}`} strokeWidth={1.5} />
          )}

          {/* Markers */}
          {success && (
            <>
              <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-[#0033A0] rounded-full border-2 border-white shadow-sm" />
              <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-[#1E9E40] rounded-full border-2 border-white shadow-sm" />
            </>
          )}
        </div>

        {/* Location Data */}
        {success && (
          <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
             <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[12px] font-medium text-gray-500">Your Location</span>
                <span className="text-[12px] font-bold text-[#041B4A]">{data.creatorLocation}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-gray-500">{data.invitedPartyName}'s Location</span>
                <span className="text-[12px] font-bold text-[#041B4A]">{data.invitedPartyLocation}</span>
             </div>
          </div>
        )}

      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6">
        {success ? (
          <Button 
            onClick={onNext}
            className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
          >
            Continue
          </Button>
        ) : (
          <Button 
            onClick={captureLocation}
            disabled={loading}
            className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Navigation className="w-5 h-5 mr-2" /> Capture GPS Coordinates</>}
          </Button>
        )}
      </div>

    </div>
  )
}
