import * as React from "react"
import { Camera, Plus, CheckCircle2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function ProductPhotosStep({ data, updateData, onNext }: Props) {
  const [uploaded, setUploaded] = React.useState<Record<string, boolean>>({})

  const toggleUpload = (key: string) => {
    setUploaded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const photos = [
    { key: "front", label: "Front View" },
    { key: "back", label: "Back View" },
    { key: "left", label: "Left View" },
    { key: "right", label: "Right View" },
    { key: "top", label: "Top View 2024" },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Product Photos
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Capture clear images of the product
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div key={photo.key} className="flex flex-col items-center gap-2">
            <div
              className={`w-[100px] h-[100px] rounded-[16px] flex flex-col items-center justify-center transition-all ${
                uploaded[photo.key] 
                  ? "bg-[#EAF7EE] border-2 border-[#1E9E40]" 
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              {uploaded[photo.key] ? (
                <CheckCircle2 className="w-8 h-8 text-[#1E9E40]" strokeWidth={2.5} />
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleUpload(photo.key)}
                    className="w-9 h-9 rounded-full bg-[#0033A0] flex items-center justify-center shadow-sm hover:bg-[#002277]"
                    title="Live Camera"
                  >
                    <Camera className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                  <button 
                    onClick={() => toggleUpload(photo.key)}
                    className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm hover:bg-gray-100"
                    title="Upload Gallery"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[12px] font-bold text-[#041B4A]">{photo.label}</span>
          </div>
        ))}
        
        {/* Add More */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-[100px] h-[100px] rounded-[16px] flex flex-col items-center justify-center transition-all bg-gray-50 border border-dashed border-gray-300 hover:bg-gray-100 text-[#0033A0]"
          >
            <Plus className="w-8 h-8" strokeWidth={2} />
          </button>
          <span className="text-[12px] font-bold text-[#041B4A]">Add More</span>
        </div>
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
