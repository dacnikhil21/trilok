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

const STORAGE_KEY = "b2c-agreements"

const SEED: AgreementRecord[] = [
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

function readAll(): AgreementRecord[] {
  if (typeof window === "undefined") return SEED
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return SEED
  }
  try {
    const parsed = JSON.parse(raw) as AgreementRecord[]
    return parsed.length > 0 ? parsed : SEED
  } catch {
    return SEED
  }
}

function writeAll(records: AgreementRecord[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function getAgreements(): AgreementRecord[] {
  return readAll()
}

export function getAgreementById(id: string): AgreementRecord | undefined {
  return readAll().find((a) => a.id === id)
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

export function saveAgreementFromWizard(input: {
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
}): AgreementRecord {
  const records = readAll()
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
  writeAll([record, ...records])
  return record
}
