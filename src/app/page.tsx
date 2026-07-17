"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    // We rely purely on the video's onEnded event to navigate.
    // No artificial timeouts here.
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black sm:bg-[#1A1D1F]"
        >
          <div className="relative w-full h-full sm:max-w-[412px] sm:max-h-[850px] sm:h-[90vh] sm:rounded-[32px] sm:border sm:border-white/10 sm:shadow-2xl overflow-hidden bg-black">
            <video
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/splash%20screen.jpg.mp4"
              onEnded={() => {
                setDone(true)
                setTimeout(() => router.push("/login"), 600)
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
