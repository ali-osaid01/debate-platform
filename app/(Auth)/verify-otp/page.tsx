"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP,InputOTPGroup,InputOTPSlot} from "@/components/ui/input-otp"
import { useFormMutation } from "@/hooks/useFormMutation"
import { IVerifyOTP } from "@/types/interface/auth.interface"
import { verifyOtp } from "@/services/auth.service"
import { SUCCESS_OTP_VERIFICATION_FAILED, SUCCESS_OTP_VERIFICATION_PASSED } from "@/utils/constant"
import { useSearchParams } from "next/navigation";
import { toast } from "sonner"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string>("")
  const searchParams = useSearchParams();
  
  const { handleFormSubmit } = useFormMutation<unknown, Error, IVerifyOTP>({
    mutationFn: verifyOtp,
    successMessage: SUCCESS_OTP_VERIFICATION_PASSED,
    errorMessage: SUCCESS_OTP_VERIFICATION_FAILED,
    route:'/reset-password'
  });

  const handleVerifyOTP = async ()  => {
    const email = searchParams.get('email')
    console.log("EMAIL",email)
    if(!email) return toast.error("Please Send OTP again")
    const payload = {
      otp:Number(otp),
      email
    }
    await handleFormSubmit(payload)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">Enter the OTP sent to your email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 ">
          <div className="relative flex justify-center items-center">
            <InputOTP maxLength={6} onChange={(value)=>setOtp(value)}>
              <InputOTPGroup >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
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
