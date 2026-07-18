import * as React from "react"
import { ShieldCheck, MapPin, Calendar, Clock, FileText, CheckCircle2, Lock, Smartphone, User, CreditCard } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"

type Props = {
  data: AgreementData
  onHome: () => void
}

export function FinalAgreementNote({ data, onHome }: Props) {
  const sellerName = data.role === "seller" ? data.customerName || "Ramesh Kumar Sharma" : data.buyerName || "Ramesh Kumar Sharma"
  const sellerMobile = data.role === "seller" ? data.customerMobile || "9876543210" : data.buyerMobile || "9876543210"
  const sellerAadhaar = data.role === "seller" ? data.aadhaarNumber || "123456789012" : data.buyerAadhaar || "123456789012"

  const buyerName = data.role === "buyer" ? data.customerName || "Priya Verma" : data.buyerName || "Priya Verma"
  const buyerMobile = data.role === "buyer" ? data.customerMobile || "9123456789" : data.buyerMobile || "9123456789"
  const buyerAadhaar = data.role === "buyer" ? data.aadhaarNumber || "987654321098" : data.buyerAadhaar || "987654321098"

  const mockDate = "25 May 2025"
  const mockTimestamp = "25 May 2025, 10:45:32 AM (IST)"
  const mockRef = "ESA-2025-05-25-0018"
  
  const maskAadhaar = (num: string) => `XXXX XXXX ${num.slice(-4) || "1234"}`

  return (
    <div className="flex flex-col animate-in fade-in zoom-in-95 duration-500">
      
      {/* Note: In a real app this might be wrapped in a scrollable view or scaled. 
          We'll build it to be responsive but retain the document feel. */}
      
      <div className="bg-white relative border-[4px] border-[#18458B] p-2 mx-auto w-full max-w-4xl shadow-2xl">
        <div className="border-[2px] border-dashed border-[#1E9E40] p-4 sm:p-8 h-full flex flex-col relative">
          
          {/* Top Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-[#0033A0]" strokeWidth={2} />
              <p className="text-[9px] font-bold text-[#0033A0] text-center mt-1 leading-tight uppercase">
                Aadhaar & GPS<br/>Verified
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                {/* Mock Logo */}
                <span className="text-4xl font-black text-[#0033A0] tracking-tighter">e</span>
                <span className="text-4xl font-black text-[#1E9E40] tracking-tighter">a</span>
                <span className="text-4xl font-black text-[#0033A0] tracking-tighter">s</span>
              </div>
              <h1 className="text-xl font-bold text-[#0033A0]">Esaleagreement</h1>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                Secure. Verified. Trusted.
              </p>
            </div>

            <div className="w-16 h-16 rounded-full border-[2px] border-dashed border-[#0033A0] flex items-center justify-center">
               <p className="text-[10px] font-bold text-[#0033A0] text-center leading-tight uppercase">
                Verified<br/><span className="text-[14px]">*100%*</span><br/>Secure
              </p>
            </div>
          </div>

          <h2 className="text-center text-[20px] sm:text-[24px] font-black text-[#0033A0] uppercase tracking-wide mb-6">
            Aadhaar Verified Sale Agreement Note
          </h2>

          {/* Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between bg-blue-50/50 rounded-lg p-3 border border-blue-100 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#0033A0]" />
              <div>
                <p className="text-[11px] font-bold text-[#0033A0]">Date</p>
                <p className="text-[13px] font-semibold">{mockDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#1E9E40]" />
              <div>
                <p className="text-[11px] font-bold text-[#1E9E40]">Agreement Reference No.</p>
                <p className="text-[13px] font-semibold">{mockRef}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#0033A0]" />
              <div>
                <p className="text-[11px] font-bold text-[#0033A0]">Timestamp</p>
                <p className="text-[13px] font-semibold">{mockTimestamp}</p>
              </div>
            </div>
          </div>

          {/* Parties Section */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#0033A0]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[14px] font-bold text-[#0033A0] uppercase">
                Parties To The Agreement
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Seller */}
            <div className="border border-[#0033A0] rounded-xl p-5 relative bg-white">
              <h3 className="text-[14px] font-bold text-[#0033A0] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> 1. SELLER DETAILS
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3"><User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">Full Name</p><p className="text-[12px] font-semibold">{sellerName}</p></div></div>
                <div className="flex gap-3"><ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">Aadhaar No.</p><p className="text-[12px] font-semibold">{maskAadhaar(sellerAadhaar)} <span className="text-gray-500 font-normal">(Verified via e-KYC)</span></p></div></div>
                <div className="flex gap-3"><CreditCard className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">PAN</p><p className="text-[12px] font-semibold">ABCDE1234F</p></div></div>
                <div className="flex gap-3"><MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">Address & Location</p><p className="text-[12px] font-semibold">123, MG Road, New Delhi<br/><span className="text-gray-500 font-normal">GPS: 28.6139° N, 77.2090° E</span></p></div></div>
                <div className="flex gap-3"><Smartphone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">Mobile</p><p className="text-[12px] font-semibold">+91 {sellerMobile}</p></div></div>
                <div className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-[#1E9E40] shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#0033A0]">Aadhaar Authentication Status</p><p className="text-[12px] font-semibold text-[#1E9E40]">Successfully Verified</p></div></div>
              </div>
            </div>

            {/* Buyer */}
            <div className="border border-[#1E9E40] rounded-xl p-5 relative bg-white">
              <h3 className="text-[14px] font-bold text-[#1E9E40] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> 2. BUYER DETAILS
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3"><User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">Full Name</p><p className="text-[12px] font-semibold">{buyerName}</p></div></div>
                <div className="flex gap-3"><ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">Aadhaar No.</p><p className="text-[12px] font-semibold">{maskAadhaar(buyerAadhaar)} <span className="text-gray-500 font-normal">(Verified via e-KYC)</span></p></div></div>
                <div className="flex gap-3"><CreditCard className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">PAN</p><p className="text-[12px] font-semibold">PQRSV6789G</p></div></div>
                <div className="flex gap-3"><MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">Address & Location</p><p className="text-[12px] font-semibold">456, Green Park, New Delhi<br/><span className="text-gray-500 font-normal">GPS: 28.5495° N, 77.2001° E</span></p></div></div>
                <div className="flex gap-3"><Smartphone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">Mobile</p><p className="text-[12px] font-semibold">+91 {buyerMobile}</p></div></div>
                <div className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-[#1E9E40] shrink-0 mt-0.5" /><div><p className="text-[10px] font-bold text-[#1E9E40]">Aadhaar Authentication Status</p><p className="text-[12px] font-semibold text-[#1E9E40]">Successfully Verified</p></div></div>
              </div>
            </div>
          </div>

          {/* Agreement Details */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#0033A0]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[14px] font-bold text-[#0033A0] uppercase">
                Agreement Details
              </span>
            </div>
          </div>

          <div className="border border-[#0033A0]/30 rounded-xl p-5 mb-6 flex flex-col md:flex-row gap-6 bg-white">
            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-[#0033A0]" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-3">
                    <strong>1.</strong> The Seller and Buyer hereby agree to the sale/purchase of the following Property/Goods/Services:
                  </p>
                  <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                    <p className="text-[13px] text-[#0033A0] mb-2">
                      <strong>Description:</strong> {data.category || "Item"}, {data.productName || "Product"}, {data.brand} {data.model} ({data.quantity || "1"}).
                    </p>
                    <p className="text-[13px] text-[#0033A0]">
                      <strong>Total Consideration:</strong> ₹ {data.saleAmount || "45,00,000"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-gray-700 font-medium leading-relaxed pl-16">
                <strong>2.</strong> Both parties have voluntarily authenticated their identities and geolocation using Aadhaar-based e-KYC / e-Sign and device GPS.
              </p>
            </div>
            
            <div className="w-full md:w-[240px] shrink-0 border border-green-200 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-green-50 p-2 text-center border-b border-green-200">
                <span className="text-[10px] font-bold text-[#1E9E40]">PROPERTY / GOODS IMAGE</span>
              </div>
              <div className="bg-gray-200 h-[120px] w-full flex items-center justify-center text-gray-400">
                [Image Mock]
              </div>
              <div className="bg-green-50 p-2 text-[9px] text-[#166534] font-medium leading-tight flex justify-between items-center">
                <span>Captured: {mockDate}<br/>GPS Verified</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E9E40]" />
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#0033A0]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[14px] font-bold text-[#0033A0] uppercase">
                Digital Signatures
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 border border-gray-300 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[11px] font-bold text-[#0033A0] mb-4">Seller's e-Signature</p>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[28px] font-medium text-gray-800 leading-none" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>{sellerName.split(' ')[0]}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{sellerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-500">Aadhaar & GPS<br/>Verified</p>
                  <CheckCircle2 className="w-4 h-4 text-[#1E9E40] ml-auto mt-1" />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Signed on: {mockTimestamp}</p>
            </div>
            <div className="flex-1 border border-gray-300 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[11px] font-bold text-[#1E9E40] mb-4">Buyer's e-Signature</p>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[28px] font-medium text-gray-800 leading-none" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>{buyerName.split(' ')[0]}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{buyerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-500">Aadhaar & GPS<br/>Verified</p>
                  <CheckCircle2 className="w-4 h-4 text-[#1E9E40] ml-auto mt-1" />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Signed on: {mockTimestamp}</p>
            </div>
            <div className="w-[120px] shrink-0 border border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-center">
               <p className="text-[9px] font-bold text-[#0033A0] mb-2 uppercase">Scan to Verify</p>
               <div className="w-[70px] h-[70px] bg-gray-200 mb-2 flex items-center justify-center text-gray-400 text-[10px]">[QR]</div>
               <p className="text-[7px] text-gray-500 break-all">{mockRef}</p>
            </div>
          </div>

          {/* Trust Footer */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap justify-between items-center border border-gray-200 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-red-500"/></div>
              <p className="text-[9px] font-bold text-gray-700">AADHAAR e-KYC<br/><span className="text-[#1E9E40] flex items-center gap-1">Verified <CheckCircle2 className="w-3 h-3"/></span></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center"><MapPin className="w-4 h-4 text-[#0033A0]"/></div>
              <p className="text-[9px] font-bold text-gray-700">GPS Location<br/><span className="text-[#1E9E40] flex items-center gap-1">Verified <CheckCircle2 className="w-3 h-3"/></span></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center"><FileText className="w-4 h-4 text-[#0033A0]"/></div>
              <p className="text-[9px] font-bold text-gray-700">e-Sign (Digital)<br/><span className="text-[#1E9E40] flex items-center gap-1">Verified <CheckCircle2 className="w-3 h-3"/></span></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center"><Lock className="w-4 h-4 text-[#1E9E40]"/></div>
              <p className="text-[9px] font-bold text-gray-700">Secure & Trusted<br/>Platform</p>
            </div>
          </div>

        </div>
        
        {/* Absolute Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#18458B] flex items-center justify-between px-4 text-white text-[9px]">
          <div className="flex items-center gap-1"><Lock className="w-3 h-3"/> This document is digitally generated and legally valid under the IT Act, 2000</div>
          <div>Platform: Esaleagreement</div>
        </div>
      </div>

      <div className="mt-8 text-center pb-8 flex justify-center">
        <button 
          onClick={onHome}
          className="h-[52px] px-8 bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Return to Dashboard
        </button>
      </div>

    </div>
  )
}
