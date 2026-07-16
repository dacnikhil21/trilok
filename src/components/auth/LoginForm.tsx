"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/useLogin"

export function LoginForm() {
  const { mobileNumber, isLoading, isValidMobile, handleMobileChange, submitLogin } = useLogin()

  return (
    <form onSubmit={submitLogin} className="flex flex-col flex-1">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-6"
      >
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          prefixNode="+91"
          value={mobileNumber}
          onChange={(e) => handleMobileChange(e.target.value)}
          placeholder=""
          aria-label="Indian Mobile Number"
          required
          autoFocus
        />
        
        {mobileNumber.length > 0 && !isValidMobile && mobileNumber.length === 10 && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-[13px] text-error font-medium pl-1"
          >
            Please enter a valid Indian mobile number.
          </motion.p>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 flex flex-col gap-4 lg:mt-12"
      >
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-14 text-[16px]"
          loading={isLoading}
          disabled={!isValidMobile}
          aria-disabled={!isValidMobile}
        >
          Continue
        </Button>

        <div className="text-center">
          <span className="text-[14px] text-secondary-text">
            Don't have an account?{" "}
          </span>
          <Link 
            href="/select-service" 
            className="text-[14px] font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-primary focus-visible:ring-2 rounded-sm"
          >
            Register account
          </Link>
        </div>
      </motion.div>
    </form>
  )
}
