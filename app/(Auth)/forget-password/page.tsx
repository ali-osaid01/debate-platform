"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FloatingInput } from "@/components/shared/AuthInput"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { forgetPasswordValidation } from "@/validation/auth.validation"

export default function ForgotPasswordPage() {
  const router = useRouter()

  const handleSendOTP = () => {
    console.log("OTP sent to email!")
    router.push("/verify-otp")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgetPasswordValidation),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Enter your email to receive an OTP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FloatingInput
            placeholder="Email"
            name="email"
            type="text"
            register={register}
          />
          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
            onClick={handleSendOTP}
          >
            Send OTP
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
