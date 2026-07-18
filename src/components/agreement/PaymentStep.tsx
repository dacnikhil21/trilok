import * as React from "react"
import { Wallet, CreditCard, Landmark, Loader2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function PaymentStep({ data, onNext }: Props) {
  const [loading, setLoading] = React.useState(false)

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Agreement Fee
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[260px] mx-auto">
          Pay the platform fee to generate the legally binding digital agreement.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        
        {/* Amount */}
        <div className="w-full max-w-[300px] bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm mb-8 text-center relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-1 bg-[#1E9E40]" />
           <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-2">Total Amount</p>
           <h3 className="text-[48px] font-black text-[#041B4A] tracking-tighter">₹49</h3>
           <p className="text-[12px] font-medium text-gray-400 mt-1">Inclusive of GST</p>
        </div>

        {/* Methods */}
        <div className="w-full space-y-3">
          <p className="text-[13px] font-bold text-[#041B4A] mb-2 px-1">Select Payment Method</p>
          
          <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-[16px] hover:border-[#0033A0] transition-colors focus:ring-2 focus:ring-[#0033A0]/20 outline-none">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-[10px] flex items-center justify-center">
                <SmartphoneIcon className="w-5 h-5 text-[#0033A0]" />
              </div>
              <div className="text-left">
                <p className="text-[15px] font-bold text-[#041B4A]">UPI</p>
                <p className="text-[12px] font-medium text-gray-500">Google Pay, PhonePe, Paytm</p>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-[16px] hover:border-[#0033A0] transition-colors focus:ring-2 focus:ring-[#0033A0]/20 outline-none">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-[10px] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-[15px] font-bold text-[#041B4A]">Card</p>
                <p className="text-[12px] font-medium text-gray-500">Visa, Mastercard, RuPay</p>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-[16px] hover:border-[#0033A0] transition-colors focus:ring-2 focus:ring-[#0033A0]/20 outline-none">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-[10px] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-[15px] font-bold text-[#041B4A]">Net Banking</p>
                <p className="text-[12px] font-medium text-gray-500">All Indian Banks</p>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
          </button>
        </div>

      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6">
        <Button 
          onClick={handlePay}
          disabled={loading}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay ₹49"}
        </Button>
      </div>

    </div>
  )
}

function SmartphoneIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}
