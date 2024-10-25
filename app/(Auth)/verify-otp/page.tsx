"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")

  const handleVerifyOTP = () => {
    console.log("OTP verified:", otp)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">Enter the OTP sent to your email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link href={'/login'} className="text-gray-900 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
