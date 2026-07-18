import * as React from "react"
import { Camera, CheckCircle2, User } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function PartiesPhotosStep({ data, onNext }: Props) {
  const [uploaded, setUploaded] = React.useState<Record<string, boolean>>({})

  const toggleUpload = (key: string) => {
    setUploaded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const sellerName = data.role === "seller" ? data.customerName || "Seller" : data.buyerName || "Seller"
  const buyerName = data.role === "buyer" ? data.customerName || "Buyer" : data.buyerName || "Buyer"

  const photos = [
    { key: "seller", role: "Seller", name: sellerName },
    { key: "buyer", role: "Buyer", name: buyerName },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Parties Identity Photos
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[260px] mx-auto">
          Capture or upload clear photos of both parties for the official agreement record.
        </p>
      </div>

      {/* Photo Blocks */}
      <div className="space-y-6">
        {photos.map((photo) => (
          <div key={photo.key} className="border border-gray-200 rounded-[16px] p-5 flex flex-col items-center bg-white shadow-sm relative overflow-hidden">
            
            <div className="flex items-center gap-2 mb-4 w-full">
               <User className="w-5 h-5 text-[#0033A0]" />
               <div>
                  <h3 className="text-[14px] font-bold text-[#041B4A]">{photo.role} Photo</h3>
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
                <User className="w-10 h-10 text-gray-300" />
              )}
            </div>

            {!uploaded[photo.key] && (
              <div className="flex gap-4 w-full justify-center">
                <button 
                  onClick={() => toggleUpload(photo.key)}
                  className="flex items-center gap-2 px-5 h-[42px] rounded-full bg-[#0033A0] text-white text-[13px] font-bold shadow-sm hover:bg-[#002277] transition-colors"
                >
                  <Camera className="w-4 h-4" /> Live Camera
                </button>
                <button 
                  onClick={() => toggleUpload(photo.key)}
                  className="flex items-center gap-2 px-5 h-[42px] rounded-full bg-white border border-gray-300 text-[#041B4A] text-[13px] font-bold shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#041B4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload File
                </button>
              </div>
            )}
            
            {uploaded[photo.key] && (
              <p className="text-[12px] font-bold text-[#1E9E40]">Photo Captured Successfully</p>
            )}

          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-8 pt-6">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Next
        </Button>
      </div>

    </div>
  )
}
