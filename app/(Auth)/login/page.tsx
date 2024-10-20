"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query";

export default  function Login() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  // const { mutateAsync } = useMutation({
  //   mutationFn: onLogin,
  // });

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="relative">
            <Input
              id="password"
              type="password"
              className="w-full h-10 px-3 text-base placeholder-transparent border-gray-300 peer"
              onFocus={() => setFocusedInput("password")}
              onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 ${
                focusedInput === "password" ? "-top-2 text-xs bg-white" : "top-2 text-base"
              } text-gray-600 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600`}
            >
              Password
            </label>
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
          <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-100">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href={'/sign-up'} className="text-gray-900 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}