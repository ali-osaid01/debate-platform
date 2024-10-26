"use client"
import Link from "next/link"
import GoogleButton from "@/components/shared/Google-Button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FloatingInput } from "@/components/shared/Auth-Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginValidation } from "@/validation/auth.validation"
import { toast } from "sonner"
import { ILogin } from "@/types/interface/auth.interface"
import { login } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { ERROR_LOGIN, NETWORK_ERROR, SUCCESS_LOGIN_PASSED } from "@/utils/constant"
import { STATUS } from "@/types/enum"


export default function Login() {
  // const { fcmToken,notificationPermissionStatus } = useFcmToken();

  // console.log("FCM TOKEN ->",fcmToken)
  // console.log("notificationPermissionStatus ->",notificationPermissionStatus)

  const {mutateAsync} = useMutation({
    mutationFn: login,
    onSuccess({status}) {
      if(status == STATUS.SUCCESS) return toast.success(SUCCESS_LOGIN_PASSED)
      else return toast.error(ERROR_LOGIN)  
    },
    onError:()=>{
      toast.error(NETWORK_ERROR)
    }
  })

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
     await mutateAsync(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  return (
    <form className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className={`${errors.root ? null : 'space-y-2'}`}>
          <div>
          <FloatingInput
            placeholder="Email"
            name="email"
            type="text"
            register={register}
            />
              {
            errors.email &&
            <p className="text-xs p-1 text-red-600 ">
              *{errors.email.message}
            </p>
          }
          </div>
        
        <div>
        <FloatingInput
            placeholder="Password"
            name="password"
            type="password"
            register={register}
          />
           {
            errors.password &&
            <p className="text-xs p-1 text-red-600 ">
              *{errors.password.message}
            </p>
          }
        </div>
         
          <Link href="/forget-password" className="text-sm text-gray-600 hover:underline" style={{ marginTop: '6px', display: 'inline-block' }}>
            Forget password?
          </Link>

          <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Login
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
          <GoogleButton />
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href={'/sign-up'} className="text-gray-900 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}