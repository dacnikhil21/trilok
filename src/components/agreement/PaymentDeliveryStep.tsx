import * as React from "react"
import { ChevronDown, Calendar, MapPin } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function PaymentDeliveryStep({ data, updateData, onNext }: Props) {
  const isValid = data.saleAmount && data.deliveryDate && data.deliveryLocation

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Payment & Delivery
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Enter payment and delivery details
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        
        {/* Sale Amount */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Sale Amount (₹)</label>
          <Input 
            type="text"
            inputMode="numeric"
            value={data.saleAmount}
            onChange={(e) => updateData({ saleAmount: e.target.value })}
            placeholder="e.g. 65,000"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Payment Method</label>
          <div className="relative">
            <select
              value={data.paymentMethod}
              onChange={(e) => updateData({ paymentMethod: e.target.value })}
              className="w-full appearance-none px-4 h-14 text-[15px] font-semibold bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0] transition-colors"
            >
              <option value="" disabled>Select Method</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Advance & Balance Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Advance Paid (₹)</label>
            <Input 
              type="text"
              inputMode="numeric"
              value={data.advancePaid}
              onChange={(e) => updateData({ advancePaid: e.target.value })}
              placeholder="e.g. 15,000"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-[#041B4A]">Balance (₹)</label>
            <Input 
              type="text"
              inputMode="numeric"
              value={data.balance}
              onChange={(e) => updateData({ balance: e.target.value })}
              placeholder="e.g. 50,000"
              className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
          </div>
        </div>

        {/* Delivery Date */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Delivery Date</label>
          <div className="relative">
            <Input 
              type="date"
              value={data.deliveryDate}
              onChange={(e) => updateData({ deliveryDate: e.target.value })}
              className="pl-4 pr-10 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Delivery Location</label>
          <div className="relative">
            <Input 
              type="text"
              value={data.deliveryLocation}
              onChange={(e) => updateData({ deliveryLocation: e.target.value })}
              placeholder="e.g. Pune, Maharashtra"
              className="pl-4 pr-10 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
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
