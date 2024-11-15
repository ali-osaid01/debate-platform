"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FloatingInput } from "@/components/shared/Auth-Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordValidation } from "@/validation/auth.validation";
import { IForgetPasswordForm } from "@/types/interface/auth.interface";
import { useFormMutation } from "@/hooks/useFormMutation";
import { forgetPassword } from "@/services/auth.service";
import { NETWORK_ERROR, SUCCESS_OTP_SEND_PASSED } from "@/utils/constant";



export default function ForgotPasswordPage() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<IForgetPasswordForm>({
    resolver: yupResolver(forgetPasswordValidation),
  });

  const { handleFormSubmit } = useFormMutation<unknown, Error, IForgetPasswordForm>({
    mutationFn: forgetPassword,
    successMessage: SUCCESS_OTP_SEND_PASSED as string,
    errorMessage: NETWORK_ERROR,
    route:`/verify-otp?email=${watch('email')}`
  });

  const onSubmit: SubmitHandler<IForgetPasswordForm> = async (data) => {
    await handleFormSubmit(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Enter your email to receive an OTP</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FloatingInput
              placeholder="Email"
              name="email"
              type="text"
              register={register}
            />
            {/* {errors.email && (
              <p className="text-xs p-1 text-red-600">
                *{errors.email.message}
              </p>
            )} */}

            <Button
              type="submit"
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "verify"}
            </Button>
          </CardContent>
        </form>

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
  );
}
