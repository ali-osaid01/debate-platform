"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"

export default function Register() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["name", "email", "password", "confirm-password"].map((field) => (
            <div key={field} className="relative">
              <Input
                id={field}
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                className="w-full h-10 px-3 text-base placeholder-transparent border-gray-300 peer"
                onFocus={() => setFocusedInput(field)}
                onBlur={(e) => e.target.value === "" && setFocusedInput(null)}
              />
              <label
                htmlFor={field}
                className={`absolute left-3 ${
                  focusedInput === field ? "-top-2 text-xs bg-white" : "top-2 text-base"
                } text-gray-600 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace("-", " ")}
              </label>
            </div>
          ))}
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Register
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or register with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-100">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href={'/login'} className="text-gray-900 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}