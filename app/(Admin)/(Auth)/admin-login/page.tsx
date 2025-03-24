'use client'
import React, { FC } from 'react'
import { Shield, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUserStore } from '@/store/user.store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormMutation } from '@/hooks/useFormMutation'
import { IUser } from '@/types/interface/user.interface'
import { ILogin } from '@/types/interface/auth.interface'
import { login } from '@/services/auth.service'
import { SUCCESS_LOGIN_PASSED } from '@/utils/constant'
import { loginValidation } from '@/validation/auth.validation'
import { saveAccessToken } from '@/utils/token'

const Login: FC = () => {
  const { setUser } = useUserStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({
    resolver: yupResolver(loginValidation),
  });
  
  const { handleFormSubmit } = useFormMutation<{ data: { data: { user: IUser, accessToken: string } } }, Error, ILogin>({
    mutationFn: login,
    successMessage: SUCCESS_LOGIN_PASSED,
    route: '/dashboard'
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const payload = await handleFormSubmit(data);
    if (payload?.data?.data?.user && payload?.data?.data?.accessToken) {
      setUser(payload.data.data.user);
      saveAccessToken(payload.data.data.accessToken);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center mt-4">Admin Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="Email address"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t p-6">
            <div className="text-center text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary underline underline-offset-4">
                Forgot your password?
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login
