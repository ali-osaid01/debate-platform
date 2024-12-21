import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function SubscriptionErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">Oh no! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-4 text-gray-700">
            We encountered an issue while processing your subscription purchase.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Don't worry, your payment has not been processed. Please try again or contact our support team if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/subscription">Try Again</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/support">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
