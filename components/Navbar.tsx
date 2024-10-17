import React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <span className="text-primary mr-2">Logo</span>
            Website Name
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="hidden md:flex space-x-3">
          <Link href={'/sign-up'}> <Button variant="outline">Register</Button></Link>
          <Link href={'/login'}> <Button variant="default">login</Button></Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate our website or sign in.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full"><Link href={'/sign-up'}>Register</Link></Button>
                <Button className="w-full" ><Link href={'/login'}>Login</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}