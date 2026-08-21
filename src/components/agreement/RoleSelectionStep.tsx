import * as React from "react"
import { Briefcase, ShoppingBag, User, Check } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import type { AgreementType } from "@/lib/c2c-config"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
  agreementType?: AgreementType | null
}

const ROLE_COPY: Record<
  "sale" | "rental",
  {
    seller: { title: string; subtitle: string; icon: React.ElementType; iconColor: string }
    buyer: { title: string; subtitle: string; icon: React.ElementType; iconColor: string }
    accentColor: string
    /** Sale: icon color is fixed per role. Rental: icon color reflects selection (accent vs gray). */
    iconReflectsSelection: boolean
  }
> = {
  sale: {
    seller: { title: "I am the Seller", subtitle: "I want to sell a product or service", icon: Briefcase, iconColor: "#2563EB" },
    buyer: { title: "I am the Buyer", subtitle: "I want to buy a product or service", icon: ShoppingBag, iconColor: "#1E9E40" },
    accentColor: "#2563EB",
    iconReflectsSelection: false,
  },
  rental: {
    seller: { title: "I am the Owner", subtitle: "I want to rent out my property or item", icon: User, iconColor: "#10B981" },
    buyer: { title: "I am the Tenant / Renter", subtitle: "I want to rent a property or item", icon: User, iconColor: "#10B981" },
    accentColor: "#10B981",
    iconReflectsSelection: true,
  },
}

export function RoleSelectionStep({ data, updateData, onNext, agreementType }: Props) {
  const copy = ROLE_COPY[agreementType === "rental" ? "rental" : "sale"]
  const accent = copy.accentColor

  const handleSelect = (role: "seller" | "buyer") => {
    updateData({ role })
    setTimeout(onNext, 400) // Auto-proceed with slight delay
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Title */}
      <div className="text-center mt-6 mb-10">
        <h2 className="text-[22px] font-bold text-[#041B4A] leading-tight">
          Select Your Role<br/>in this Agreement
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4 flex-1">
        {(["seller", "buyer"] as const).map((role) => {
          const { title, subtitle, icon: Icon, iconColor } = copy[role]
          const selected = data.role === role
          const resolvedIconColor = copy.iconReflectsSelection
            ? (selected ? iconColor : "#94A3B8")
            : iconColor
          return (
            <button
              key={role}
              onClick={() => handleSelect(role)}
              className="w-full text-left p-5 rounded-[16px] border-[1.5px] transition-all flex items-center justify-between"
              style={{
                borderColor: selected ? accent : "#E5E7EB",
                backgroundColor: selected ? `${accent}08` : "#FFFFFF",
                boxShadow: selected ? "0 1px 2px 0 rgba(0,0,0,0.05)" : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: resolvedIconColor }}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#041B4A]">{title}</h3>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">{subtitle}</p>
                </div>
              </div>
              {selected && (
                <div className="w-6 h-6 rounded-full bg-[#1E9E40] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 bg-[#EAF7EE] p-3 rounded-[12px]">
          <div className="w-6 h-6 rounded-full bg-[#1A8A3C] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <p className="text-[11px] font-medium text-[#1A8A3C] leading-snug">
            You can create agreements<br/>
            {agreementType === "rental" ? "as Owner or Tenant on this device." : "as Seller or Buyer on this device."}
          </p>
        </div>
      </div>

    </div>
  )
}
