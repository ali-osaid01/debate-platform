import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, CreditCard, Download, Users } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
    
  const subscriptionData = {
    plan: "Pro",
    nextBillDate: "2023-12-01",
    amount: "$19.99",
    billingCycle: "monthly",
    daysLeft: 22,
    totalDays: 30,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <Card>
          <CardHeader>
            <CardTitle>Current Plan: {subscriptionData.plan}</CardTitle>
            <CardDescription>
              You will be billed {subscriptionData.amount} {subscriptionData.billingCycle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <span>Next billing date:</span>
              </div>
              <span className="font-semibold">{subscriptionData.nextBillDate}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Billing period</span>
                <span>{subscriptionData.daysLeft} days left</span>
              </div>
              <Progress value={(subscriptionData.daysLeft / subscriptionData.totalDays) * 100} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/subscription">
            <Button variant="outline">Change Plan</Button>
            </Link>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="flex items-center"> 
            <CreditCard className="h-6 w-6 text-muted-foreground" />
              Update Payment Method</Button>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2023-11-01", amount: "$19.99", status: "Paid" },
                { date: "2023-10-01", amount: "$19.99", status: "Paid" },
                { date: "2023-09-01", amount: "$19.99", status: "Paid" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">{invoice.amount} - {invoice.status}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Invoices</Button>
          </CardFooter>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>Debate rooms joined</span>
                </div>
                <span className="font-semibold">3 </span>
              </div>
              <Progress value={60} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}