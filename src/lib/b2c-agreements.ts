export type AgreementStatus = "Pending" | "Completed" | "Draft"

export type AgreementRecord = {
  id: string
  title: string
  party: string
  status: AgreementStatus
  date: string
  amount: string
  productName: string
  category: string
  role: "buyer" | "seller"
  brand?: string
  model?: string
  serialNumber?: string
  paymentTerms?: string
  deliveryDate?: string
  deliveryLocation?: string
  referenceNo: string
}

const B2C_STORAGE_KEY = "b2c-agreements"
const C2C_STORAGE_KEY = "c2c-agreements"

const B2C_SEED: AgreementRecord[] = [
  {
    id: "1",
    title: "iPhone 14 Pro Sale",
    party: "Rahul Sharma",
    status: "Pending",
    date: "10 Aug 2026",
    amount: "₹72,000",
    productName: "iPhone 14 Pro",
    category: "Mobile & Electronics",
    role: "seller",
    brand: "Apple",
    model: "14 Pro",
    serialNumber: "SN882910023",
    paymentTerms: "50% Advance",
    deliveryDate: "12 Aug 2026",
    deliveryLocation: "MG Road, Bengaluru",
    referenceNo: "ESA-2026-08-10-0001",
  },
  {
    id: "2",
    title: "MacBook Air M2 Sale",
    party: "Priya Nair",
    status: "Completed",
    date: "8 Aug 2026",
    amount: "₹85,000",
    productName: "MacBook Air M2",
    category: "Mobile & Electronics",
    role: "seller",
    brand: "Apple",
    model: "M2",
    referenceNo: "ESA-2026-08-08-0002",
  },
  {
    id: "3",
    title: "Samsung TV 55\"",
    party: "Amit Patel",
    status: "Draft",
    date: "7 Aug 2026",
    amount: "₹42,000",
    productName: "Samsung TV 55\"",
    category: "Mobile & Electronics",
    role: "seller",
    referenceNo: "ESA-2026-08-07-0003",
  },
  {
    id: "4",
    title: "iPad Air Sale",
    party: "Sneha Reddy",
    status: "Completed",
    date: "5 Aug 2026",
    amount: "₹38,000",
    productName: "iPad Air",
    category: "Mobile & Electronics",
    role: "seller",
    referenceNo: "ESA-2026-08-05-0004",
  },
]

function storageKey(module: "b2c" | "c2c"): string {
  return module === "c2c" ? C2C_STORAGE_KEY : B2C_STORAGE_KEY
}

function readAll(module: "b2c" | "c2c" = "b2c"): AgreementRecord[] {
  if (typeof window === "undefined") {
    return module === "b2c" ? B2C_SEED : []
  }
  const key = storageKey(module)
  const raw = localStorage.getItem(key)
  if (module === "c2c") {
    if (!raw) return []
    try {
      return JSON.parse(raw) as AgreementRecord[]
    } catch {
      return []
    }
  }
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(B2C_SEED))
    return B2C_SEED
  }
  try {
    const parsed = JSON.parse(raw) as AgreementRecord[]
    return parsed.length > 0 ? parsed : B2C_SEED
  } catch {
    return B2C_SEED
  }
}

function writeAll(records: AgreementRecord[], module: "b2c" | "c2c"): void {
  if (typeof window === "undefined") return
  localStorage.setItem(storageKey(module), JSON.stringify(records))
}

export function getAgreements(module: "b2c" | "c2c" = "b2c"): AgreementRecord[] {
  return readAll(module)
}

export function getAgreementById(id: string, module: "b2c" | "c2c" = "b2c"): AgreementRecord | undefined {
  return readAll(module).find((a) => a.id === id)
}

export function formatAgreementDate(d = new Date()): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export function generateReferenceNo(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 9000) + 1000)
  return `ESA-${y}-${m}-${day}-${seq}`
}

export function saveAgreementFromWizard(
  input: {
    productName: string
    category: string
    role: "buyer" | "seller" | null
    saleAmount: string
    brand?: string
    model?: string
    serialNumber?: string
    paymentTerms?: string
    deliveryDate?: string
    deliveryLocation?: string
    invitedPartyName?: string
  },
  module: "b2c" | "c2c" = "b2c"
): AgreementRecord {
  const records = readAll(module)
  const id = String(Date.now())
  const amount = input.saleAmount ? `₹${Number(input.saleAmount.replace(/\D/g, "") || 0).toLocaleString("en-IN")}` : "—"
  const record: AgreementRecord = {
    id,
    title: `${input.productName} ${input.role === "buyer" ? "Purchase" : "Sale"}`,
    party: input.invitedPartyName || "Awaiting party",
    status: "Pending",
    date: formatAgreementDate(),
    amount,
    productName: input.productName,
    category: input.category,
    role: input.role === "buyer" ? "buyer" : "seller",
    brand: input.brand,
    model: input.model,
    serialNumber: input.serialNumber,
    paymentTerms: input.paymentTerms,
    deliveryDate: input.deliveryDate,
    deliveryLocation: input.deliveryLocation,
    referenceNo: generateReferenceNo(),
  }
  writeAll([record, ...records], module)
  return record
}
