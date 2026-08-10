export function iconFieldToKey(icon: string): string {
  const map: Record<string, string> = {
    mobile: "phone",
    vehicle: "car",
    furniture: "furniture",
    pg: "pg",
    "electronics-rental": "electronics",
    freelance: "freelance",
    maid: "maid",
    repair: "repair",
    other: "more",
  }
  return map[icon] ?? icon
}
