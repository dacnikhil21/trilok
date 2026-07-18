import * as React from "react"
import { Camera, CheckCircle2, User, ScanFace } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function PartiesPhotosStep({ data, updateData, onNext }: Props) {
  const [uploaded, setUploaded] = React.useState<Record<string, boolean>>({})

  const toggleUpload = (key: string) => {
    setUploaded(prev => ({ ...prev, [key]: !prev[key] }))
    if (key === "creator") {
      updateData({ creatorSelfie: uploaded.creator ? "" : "captured" })
    } else {
      updateData({ invitedPartySelfie: uploaded.invited ? "" : "captured" })
    }
  }

  const creatorName = data.customerName || "Creator"
  const invitedName = data.invitedPartyName || "Invited Party"

  const photos = [
    { key: "creator", role: "Your", name: creatorName },
    { key: "invited", role: "Their", name: invitedName },
  ]

  const isValid = uploaded.creator && uploaded.invited

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Live Selfie Verification
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[260px] mx-auto">
          Capture live selfies of both parties for the official agreement record.
        </p>
      </div>

      {/* Photo Blocks */}
      <div className="space-y-6">
        {photos.map((photo) => (
          <div key={photo.key} className="border border-gray-200 rounded-[16px] p-5 flex flex-col items-center bg-white shadow-sm relative overflow-hidden">
            
            <div className="flex items-center gap-2 mb-4 w-full">
               <ScanFace className="w-5 h-5 text-[#0033A0]" />
               <div>
                  <h3 className="text-[14px] font-bold text-[#041B4A]">{photo.role} Selfie</h3>
                  <p className="text-[11px] font-medium text-gray-500 uppercase">{photo.name}</p>
               </div>
            </div>

            <div
              className={`w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center transition-all mb-4 ${
                uploaded[photo.key] 
                  ? "bg-[#EAF7EE] border-4 border-[#1E9E40]" 
                  : "bg-gray-50 border-2 border-dashed border-gray-300"
              }`}
            >
              {uploaded[photo.key] ? (
                <CheckCircle2 className="w-12 h-12 text-[#1E9E40]" strokeWidth={2.5} />
              ) : (
                <User className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
              )}
            </div>

            <Button 
              variant="outline"
              onClick={() => toggleUpload(photo.key)}
              className={`w-full h-[44px] rounded-[10px] text-[14px] font-bold ${
                uploaded[photo.key] 
                  ? "border-[#1E9E40] text-[#1E9E40] hover:bg-[#EAF7EE]" 
                  : "border-gray-200 text-[#041B4A] hover:bg-gray-50"
              }`}
            >
              {uploaded[photo.key] ? "Retake Selfie" : <><Camera className="w-4 h-4 mr-2" /> Capture Live Selfie</>}
            </Button>
            
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-8 pt-6">
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Verify Photos
        </Button>
      </div>

    </div>
  )
}
