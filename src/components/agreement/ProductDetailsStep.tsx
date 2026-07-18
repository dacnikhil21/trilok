import * as React from "react"
import { ChevronDown } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function ProductDetailsStep({ data, updateData, onNext }: Props) {
  const isValid = data.category && data.productName && data.quantity

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Product Details
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Enter item information
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        
        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Category</label>
          <div className="relative">
            <select
              value={data.category}
              onChange={(e) => updateData({ category: e.target.value })}
              className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0] transition-colors"
            >
              <option value="" disabled>Select Category</option>
              <option value="Industrial Plastic Parts">Industrial Plastic Parts</option>
              <option value="Electronics & IT">Electronics & IT</option>
              <option value="Automotive">Automotive</option>
              <option value="Textiles">Textiles</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Product Name</label>
          <Input 
            type="text"
            value={data.productName}
            onChange={(e) => updateData({ productName: e.target.value })}
            placeholder="e.g. Plastic Nozzle"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        {/* Brand */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Brand</label>
          <Input 
            type="text"
            value={data.brand}
            onChange={(e) => updateData({ brand: e.target.value })}
            placeholder="e.g. Aroma Plast"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        {/* Model / Type */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Model / Type</label>
          <Input 
            type="text"
            value={data.model}
            onChange={(e) => updateData({ model: e.target.value })}
            placeholder="e.g. APN-25"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Quantity</label>
          <Input 
            type="text"
            value={data.quantity}
            onChange={(e) => updateData({ quantity: e.target.value })}
            placeholder="e.g. 1000 Pieces"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
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
