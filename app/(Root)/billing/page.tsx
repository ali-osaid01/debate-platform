'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/store/user.store";
import { getPrice } from "@/utils/constant";
import { CalendarDays, Users } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const { user} = useUserStore();

  const isSubscribed = user?.subscription?.subscribe;

  user?.subscription;

  const currentDate = new Date();
  const expiryDate = new Date(user?.subscription?.expirytime || 0);
  const daysLeft = Math.max(0, Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = 30;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">Billing & Subscription</h1>
        {isSubscribed ? (
          <Card>
            <CardHeader>
              <CardTitle>Current Plan: {user?.subscription.plan}</CardTitle>
              <CardDescription>
              You are billed {`${getPrice(user?.subscription?.plan)}`}/Monthly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <span>Subscription Expires On:</span>
                </div>
                <span className="font-semibold">
                  {expiryDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Billing period</span>
                  <span>{daysLeft} days left</span>
                </div>
                <Progress value={(daysLeft / totalDays) * 100} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/subscription">
                <Button variant="outline">Change Plan</Button>
              </Link>
              <Button variant="destructive">Cancel Subscription</Button>
            </CardFooter>
          </Card>
        ) : (
          // No Subscription UI
          <Card>
            <CardHeader>
              <CardTitle>You&apos;re Not Subscribed</CardTitle>
              <CardDescription>
                Unlock premium features by subscribing to one of our plans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Join our community and get access to exclusive debating resources and features.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/subscription">
                <Button>View Subscription Plans</Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {/* Usage Statistics */}
        {user?.subscription.subscribe && (
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
                  <span className="font-semibold">3</span>
                </div>
                <Progress value={60} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
