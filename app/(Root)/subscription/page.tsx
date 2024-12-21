'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubscription, fetchSubscription } from "@/services/subscription.service";
import { useUserStore } from "@/store/user.store";
import { STATUS } from "@/types/enum";
import { SubscriptionProduct } from "@/types/interface/subscription.interface";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { getPrice } from '@/utils/constant';

export default function Subscription() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { user } = useUserStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center min-h-screen items-center text-center">
        <div>
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
          <p className="text-muted-foreground">We couldn't load the subscription plans. Please try again later.</p>
        </div>
      </div>
    );
  }

  const purchaseSubscription = async (priceId: string, plan: string) => {
    try {
      const { status, response } = await createSubscription({ price: priceId, plan });
      if (status === STATUS.SUCCESS) {
        window.location.href = response?.data?.data?.url;
      } else {
        throw new Error('Failed to create subscription');
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error("There was a problem processing your subscription. Please try again later.");
    }
  };

  // Check if the user is subscribed
  const isSubscribed = user?.subscription?.subscribe;

  const calculateDaysLeft = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const timeDiff = expiry.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="max-w-4xl w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {isSubscribed ? 'Your Subscription' : 'Choose Your Debate Plan'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isSubscribed
              ? 'Manage your current subscription and unlock your full debating potential.'
              : 'Elevate your debating skills and join a community of passionate thinkers with our tailored subscription plans.'}
          </p>
        </div>

        {isSubscribed ? (
          // Subscribed User UI
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <CheckCircle className="text-green-500 mr-2" />
                Active Subscription
              </CardTitle>
              <CardDescription>
                You're currently subscribed to our premium debate services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Plan</span>
                <span className="text-lg font-bold text-primary">{user.subscription.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Price</span>
                <span className="text-lg font-bold">{`${getPrice(user?.subscription?.plan)}`}/month</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Next billing date</span>
                  <span className="text-lg font-bold">{new Date(user.subscription.expirytime).toLocaleDateString()}</span>
                </div>
                {/* <Progress value={calculateDaysLeft(user.subscription.expirytime.toString())} max={30} className="h-2" /> */}
                <p className="text-sm text-muted-foreground text-right">
                  {calculateDaysLeft(user.subscription.expirytime.toString())} days left
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex w-full items-center mt-6">
              <Button variant="outline" asChild className='w-full'>
                <Link href="/billing">Manage Billing</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          // Subscription Plans UI
          <div className="grid md:grid-cols-3 gap-8">
            {data?.response?.data?.data?.map((tier: SubscriptionProduct, index: number) => (
              <Card
                key={tier.id}
                className={`flex flex-col justify-between transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedTier === tier.id ? 'ring-2 ring-primary' : ''
                } ${index === 1 ? "border-primary md:-mt-4 md:mb-4" : ""}`}
              >
                <div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{tier.metadata.plan}</CardTitle>
                    <CardDescription className="text-4xl font-extrabold mt-2">
                      ${tier.metadata.price}
                      <span className="text-lg font-normal">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{tier.description}</p>
                    <ul className="space-y-2">
                      {/* {tier.metadata.features.split(',').map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                          <span>{feature.trim()}</span>
                        </li>
                      ))} */}
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="mt-6">
                  <Button
                    className="w-full text-lg py-6 transition-all duration-300 ease-in-out"
                    variant={index === 1 ? "default" : "outline"}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      purchaseSubscription(tier.default_price, tier.metadata.plan.toUpperCase());
                    }}
                  >
                    {selectedTier === tier.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Choose {tier.metadata.plan}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

