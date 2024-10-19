"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ForgotPassword() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [otp, setOtp] = useState("")

  // const { mutateAsync } = useMutation({
  //   mutationFn: onForgotPassword,
  // });

  const handleSendOTP = () => {
    setEmailSent(true)
    // Call API to send OTP
    console.log("OTP sent to email!")
  }

  const handleVerifyOTP = () => {
    // Call API to verify OTP
    console.log("OTP verified:", otp)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            {emailSent ? "Verify OTP" : "Forgot Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {emailSent ? "Enter the OTP sent to your email" : "Enter your email to receive an OTP"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!emailSent ? (
            <div className="relative">
              <Input
                id="email"
                type="email"
                className="w-full h-10 px-3 text-base placeholder-transparent border-gray-300 peer"
                onFocus={() => setFocusedInput("email")}
                onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 ${
                  focusedInput === "email" ? "-top-2 text-xs bg-white" : "top-2 text-base"
                } text-gray-600 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600`}
              >
                Email
              </label>
            </div>
          ) : (
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
          )}

          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
            onClick={emailSent ? handleVerifyOTP : handleSendOTP}
          >
            {emailSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-100">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>

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
