import * as React from "react"
import { ChevronDown, Camera, Plus, CheckCircle2, Sparkles } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { SALE_CATEGORIES, RENTAL_CATEGORIES, SERVICE_CATEGORIES } from "@/lib/c2c-config"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
  isB2C?: boolean
}

export function ProductDetailsStep({ data, updateData, onNext, isB2C = false }: Props) {
  const [uploaded, setUploaded] = React.useState<Record<string, boolean>>({})

  // Dropdown states and refs for click-outside handling
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [conditionOpen, setConditionOpen] = React.useState(false)
  const [warrantyOpen, setWarrantyOpen] = React.useState(false)

  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const conditionRef = React.useRef<HTMLDivElement>(null)
  const warrantyRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
      if (conditionRef.current && !conditionRef.current.contains(event.target as Node)) {
        setConditionOpen(false)
      }
      if (warrantyRef.current && !warrantyRef.current.contains(event.target as Node)) {
        setWarrantyOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const allCategories = React.useMemo(() => {
    return [...SALE_CATEGORIES, ...RENTAL_CATEGORIES, ...SERVICE_CATEGORIES]
  }, [])

  const productOptions = React.useMemo(() => {
    if (!data.category) return []
    const matched = allCategories.find(
      (c) => c.title.toLowerCase() === data.category.toLowerCase()
    )
    return matched ? matched.introItems : []
  }, [data.category, allCategories])

  const toggleUpload = (key: string) => {
    setUploaded(prev => ({ ...prev, [key]: !prev[key] }))
    // Simulate updating global state array
    if (!uploaded[key]) {
      updateData({ productPhotos: [...data.productPhotos, key] })
    } else {
      updateData({ productPhotos: data.productPhotos.filter(p => p !== key) })
    }
  }

  const photos = [
    { key: "front", label: "Front View" },
    { key: "back", label: "Back View" },
    { key: "left", label: "Left View" },
    { key: "right", label: "Right View" },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Product Details
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Enter item information & photos
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        
        {data.category ? (
          <div className="space-y-1.5 text-left">
            <label className="text-[13.5px] font-bold text-[#041B4A]">Category</label>
            <div className="flex h-14 items-center rounded-[12px] border border-slate-200/90 bg-[#F8FAFC] px-4 text-[14.5px] font-semibold text-[#041B4A]">
              {data.category}
            </div>
          </div>
        ) : null}

        <div className="space-y-1.5 text-left relative" ref={dropdownRef}>
          <label className="text-[13.5px] font-bold text-[#041B4A]">Product / Item Type</label>
          {productOptions.length > 0 ? (
            <div className="relative">
              {/* Dropdown Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-4 h-14 text-[14.5px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors flex items-center justify-between text-[#0F172A] cursor-pointer"
              >
                <span>{data.productName || "Select Item Type"}</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-200", dropdownOpen ? "transform rotate-180" : "")} />
              </button>

              {/* Custom Dropdown Overlay */}
              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-[60px] bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_20px_rgba(15,23,42,0.08)] z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="max-h-[200px] overflow-y-auto divide-y divide-slate-50">
                    {productOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          updateData({ productName: opt })
                          setDropdownOpen(false)
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 text-[13.5px] transition-colors font-semibold cursor-pointer",
                          data.productName === opt 
                            ? "bg-[#0033A0]/5 text-[#0033A0] font-bold" 
                            : "bg-white text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        updateData({ productName: "" })
                        setDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-[13.5px] transition-colors font-semibold border-t border-slate-100 cursor-pointer",
                        data.productName !== "" && !productOptions.includes(data.productName)
                          ? "bg-[#0033A0]/5 text-[#0033A0] font-bold" 
                          : "bg-white text-[#0033A0] hover:bg-slate-50"
                      )}
                    >
                      Other (Type custom)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Input 
              type="text"
              value={data.productName}
              onChange={(e) => updateData({ productName: e.target.value })}
              placeholder="e.g. Plastic Nozzle"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          )}
        </div>

        {/* Custom write-in text field if "other" is selected */}
        {productOptions.length > 0 && (!productOptions.includes(data.productName) || data.productName === "") && (
          <div className="space-y-1.5 text-left animate-in fade-in slide-in-from-top-1 duration-200">
            <label className="text-[13.5px] font-bold text-[#041B4A]">Custom Product Name</label>
            <Input 
              type="text"
              value={data.productName}
              onChange={(e) => updateData({ productName: e.target.value })}
              placeholder="Enter product name"
              className="px-4 h-14 text-[14.5px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Brand</label>
            <Input 
              type="text"
              value={data.brand}
              onChange={(e) => updateData({ brand: e.target.value })}
              placeholder="Brand"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Model</label>
            <Input 
              type="text"
              value={data.model}
              onChange={(e) => updateData({ model: e.target.value })}
              placeholder="Model"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Serial Number / IMEI</label>
          <Input 
            type="text"
            value={data.serialNumber}
            onChange={(e) => updateData({ serialNumber: e.target.value })}
            placeholder="e.g. SN123456789"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Quantity</label>
            <Input 
              type="text"
              value={data.quantity}
              onChange={(e) => updateData({ quantity: e.target.value })}
              placeholder="e.g. 1"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Price (₹)</label>
            <Input 
              type="text"
              value={data.saleAmount}
              onChange={(e) => updateData({ saleAmount: e.target.value })}
              placeholder="e.g. 5000"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Condition & Warranty</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={data.condition}
                onChange={(e) => updateData({ condition: e.target.value })}
                className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
              >
                <option value="" disabled>Condition</option>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">Used - Fair</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <select
                value={data.warranty}
                onChange={(e) => updateData({ warranty: e.target.value })}
                className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
              >
                <option value="" disabled>Warranty</option>
                <option value="None">None</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="Extended">Extended</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Description</label>
          <textarea 
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Brief description of the product..."
            className="w-full p-4 text-[15px] font-semibold rounded-[12px] border border-gray-200 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
          />
        </div>

        {/* Photos Inline */}
        <div className="space-y-2 pt-4">
          <label className="text-[13px] font-bold text-[#041B4A]">Product Photos</label>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((photo) => (
              <div key={photo.key} className="flex flex-col items-center gap-1">
                <div
                  className={`w-full aspect-square rounded-[12px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                    uploaded[photo.key] 
                      ? "bg-[#EAF7EE] border-2 border-[#1E9E40]" 
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleUpload(photo.key)}
                >
                  {uploaded[photo.key] ? (
                    <CheckCircle2 className="w-6 h-6 text-[#1E9E40]" strokeWidth={2.5} />
                  ) : (
                    <Camera className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  )}
                </div>
                <span className="text-[10px] font-semibold text-gray-500">{photo.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add Multiple Products Button */}
        <div className="pt-2">
          <div className="relative w-full max-w-[320px] mx-auto">
            <Button 
              variant="ghost" 
              className="w-full text-[#2563EB] font-bold text-[14px] border border-dashed border-[#2563EB]/30 hover:bg-[#2563EB]/5 h-[50px] rounded-[12px]"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Another Product
            </Button>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-[#E5EDFF] border-2 border-white rounded-full shadow-sm flex items-center justify-center pointer-events-none">
               <Sparkles className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Button */}
      <div className="mt-8 pt-6">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Next
        </Button>
      </div>

    </div>
  )
}
