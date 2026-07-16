"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// ── Premium Trilok Gem SVG Logo ───────────────────────────────────────────────
function TrilokGem({ size = 220 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gem gradient - deep emerald to lighter jade */}
        <linearGradient id="gemTop" x1="100" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A7A4A" />
          <stop offset="100%" stopColor="#0A5C36" />
        </linearGradient>
        <linearGradient id="gemLeft" x1="30" y1="80" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A4A2C" />
          <stop offset="100%" stopColor="#083D24" />
        </linearGradient>
        <linearGradient id="gemRight" x1="170" y1="80" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E9159" />
          <stop offset="100%" stopColor="#0D6B40" />
        </linearGradient>
        <linearGradient id="gemCenter" x1="100" y1="60" x2="100" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22A865" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0A5C36" />
        </linearGradient>
        <linearGradient id="gemGlow" x1="60" y1="30" x2="140" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4AE09A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0A5C36" stopOpacity="0" />
        </linearGradient>
        {/* Gold edge highlight */}
        <linearGradient id="edgeGold" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#F0D060" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0.2" />
        </linearGradient>
        <filter id="gemShadow">
          <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#0A5C36" floodOpacity="0.45" />
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#gemShadow)">
        {/* ── Outer Hexagon Shell ── */}
        {/* Top-left facet */}
        <path d="M100 22 L48 68 L100 90 Z" fill="url(#gemTop)" />
        {/* Top-right facet */}
        <path d="M100 22 L152 68 L100 90 Z" fill="url(#gemRight)" opacity="0.9" />
        {/* Left facet */}
        <path d="M48 68 L30 130 L100 90 Z" fill="url(#gemLeft)" />
        {/* Right facet */}
        <path d="M152 68 L170 130 L100 90 Z" fill="url(#gemRight)" />
        {/* Bottom-left facet */}
        <path d="M30 130 L100 178 L100 90 Z" fill="url(#gemLeft)" opacity="0.85" />
        {/* Bottom-right facet */}
        <path d="M170 130 L100 178 L100 90 Z" fill="url(#gemCenter)" opacity="0.9" />

        {/* ── Inner gem core / center facets ── */}
        <path d="M100 22 L152 68 L100 90 L48 68 Z" fill="url(#gemTop)" opacity="0.6" />
        <path d="M100 90 L48 68 L30 130 L100 178 L170 130 L152 68 Z" fill="url(#gemCenter)" opacity="0.3" />

        {/* ── Light reflection overlay ── */}
        <path d="M100 22 L60 55 L100 72 L140 55 Z" fill="url(#gemGlow)" />
        <path d="M58 72 L48 68 L100 90 L80 108 Z" fill="white" opacity="0.07" />
        <path d="M142 72 L152 68 L100 90 L120 108 Z" fill="white" opacity="0.12" />

        {/* ── Outer hexagon border ── */}
        <path
          d="M100 22 L152 68 L170 130 L100 178 L30 130 L48 68 Z"
          fill="none"
          stroke="url(#edgeGold)"
          strokeWidth="1.2"
        />

        {/* ── Inner dividing lines (facet edges) ── */}
        <line x1="100" y1="22" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.5" />
        <line x1="48" y1="68" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.5" />
        <line x1="152" y1="68" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.5" />
        <line x1="30" y1="130" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.4" />
        <line x1="170" y1="130" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.4" />
        <line x1="100" y1="178" x2="100" y2="90" stroke="url(#edgeGold)" strokeWidth="0.8" opacity="0.4" />

        {/* ── T letter mark etched in center ── */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Georgia, serif"
          fontSize="32"
          fontWeight="bold"
          fill="white"
          opacity="0.18"
          letterSpacing="0"
        >
          T
        </text>

        {/* ── Specular highlight sparkle top-left ── */}
        <ellipse cx="75" cy="52" rx="10" ry="6" fill="white" opacity="0.22" transform="rotate(-30 75 52)" />
        <ellipse cx="78" cy="50" rx="4" ry="2.5" fill="white" opacity="0.45" transform="rotate(-30 78 50)" />
      </g>
    </svg>
  )
}

// ── Main Splash Screen ─────────────────────────────────────────────────────────
export default function SplashScreen() {
  const router = useRouter()
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true)
      setTimeout(() => router.push("/login"), 600)
    }, 2800)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-between select-none"
          style={{
            background: "linear-gradient(165deg, #1C2B22 0%, #1E2C22 25%, #2A3D2E 50%, #D8C9A8 80%, #E8D9B8 100%)"
          }}
        >
          {/* Ambient radial glow behind gem */}
          <div
            className="absolute"
            style={{
              top: "22%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(180,210,190,0.18) 0%, rgba(180,210,190,0.06) 50%, transparent 72%)"
            }}
          />

          {/* Top spacer */}
          <div className="flex-1" />

          {/* Gem logo with entrance animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.26, 0.64, 1], delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <TrilokGem size={240} />
          </motion.div>

          {/* Bottom spacer */}
          <div className="flex-1" />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
            className="flex flex-col items-center pb-20"
          >
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: "400",
                letterSpacing: "0.32em",
                color: "#1A2B20",
                lineHeight: 1,
              }}
            >
              TRILOK
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "#5A6B5E",
                marginTop: "8px",
                textTransform: "uppercase",
              }}
            >
              Secure · Verified · Trusted
            </motion.span>
          </motion.div>

          {/* Loading dot pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-10 flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#0A5C36", opacity: 0.4 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
