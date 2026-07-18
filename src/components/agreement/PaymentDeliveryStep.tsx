import * as React from "react"
import { ChevronDown, Calendar, MapPin, FileText } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function PaymentDeliveryStep({ data, updateData, onNext }: Props) {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Terms & Conditions
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Define the agreement terms
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        
        {/* Payment Terms */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Payment Terms</label>
          <div className="relative">
            <select
              value={data.paymentTerms}
              onChange={(e) => updateData({ paymentTerms: e.target.value })}
              className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0] transition-colors"
            >
              <option value="" disabled>Select Payment Term</option>
              <option value="100% Advance">100% Advance</option>
              <option value="50% Advance, 50% on Delivery">50% Advance, 50% on Delivery</option>
              <option value="Post-delivery (Net 30)">Post-delivery (Net 30)</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Escrow Hold">Escrow Hold</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Delivery Terms */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Delivery Terms (Date & Location)</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input 
                type="date"
                value={data.deliveryDate}
                onChange={(e) => updateData({ deliveryDate: e.target.value })}
                className="pl-4 pr-10 h-14 text-[13px] font-semibold rounded-[12px] border-gray-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="relative flex-[1.5]">
              <Input 
                type="text"
                value={data.deliveryLocation}
                onChange={(e) => updateData({ deliveryLocation: e.target.value })}
                placeholder="Location"
                className="pl-4 pr-10 h-14 text-[14px] font-semibold rounded-[12px] border-gray-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Return Policy */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Return Policy</label>
          <div className="relative">
            <select
              value={data.returnPolicy}
              onChange={(e) => updateData({ returnPolicy: e.target.value })}
              className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0] transition-colors"
            >
              <option value="" disabled>Select Return Policy</option>
              <option value="No Returns Allowed">No Returns Allowed</option>
              <option value="7 Days Return">7 Days Return</option>
              <option value="15 Days Return">15 Days Return</option>
              <option value="Return only if defective">Return only if defective</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Warranty Terms */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Warranty Terms</label>
          <textarea 
            value={data.warrantyTerms}
            onChange={(e) => updateData({ warrantyTerms: e.target.value })}
            placeholder="Specify any warranty conditions..."
            className="w-full p-4 text-[15px] font-semibold rounded-[12px] border border-gray-200 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0]"
          />
        </div>

        {/* Additional Clauses */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Additional Clauses</label>
          <textarea 
            value={data.additionalClauses}
            onChange={(e) => updateData({ additionalClauses: e.target.value })}
            placeholder="Any other terms or clauses..."
            className="w-full p-4 text-[15px] font-semibold rounded-[12px] border border-gray-200 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0]"
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
