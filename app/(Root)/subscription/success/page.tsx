'use client'
import { CheckCircle, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-300" />
      </div>
      
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-gray-200">
        <CardHeader className="text-center space-y-4">
          <div className="relative mx-auto">
            <div className="absolute inset-0 animate-ping bg-gray-200 rounded-full w-16 h-16 opacity-75" />
            <div className="relative mx-auto bg-white rounded-full p-3 w-16 h-16 flex items-center justify-center shadow-md">
              <CheckCircle className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900">Welcome Aboard!</CardTitle>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>Subscription Activated</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-gray-700">
            Thank you for subscribing to our service.
          </p>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              We've sent a confirmation email with all the details.
              Please check your inbox to get started.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 ">
          <Button className="w-full sm:w-auto" size="lg" asChild>
            <Link href="/feed">View Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}