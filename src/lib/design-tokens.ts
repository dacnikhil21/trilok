/** Shared layout + visual tokens — RN-portable naming. */
export const tokens = {
  color: {
    primary: "#2563EB",
    primaryDark: "#0033A0",
    brandBlue: "#0052CC",
    brandGreen: "#10B981",
    text: "#0F172A",
    textMuted: "#64748B",
    textSecondary: "#334155",
    border: "#E2E8F0",
    surface: "#FFFFFF",
    canvas: "#F8FAFC",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    section: 20,
  },
  radius: {
    card: 12,
    hero: 16,
  },
  icon: {
    sm: 20,
    md: 28,
    lg: 40,
  },
  layout: {
    maxTemplateColumns: 3,
    templateCardMinHeight: 96,
    bottomNavHeight: 68,
    headerHeight: 52,
  },
} as const

export type TemplateGridColumns = 3 | 4
