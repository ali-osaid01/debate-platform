'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubscription, fetchSubscription } from "@/services/subscription.service";
import { useUserStore } from "@/store/user.store";
import { STATUS } from "@/types/enum";
import { SubscriptionProduct } from "@/types/interface/subscription.interface";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, X } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export default function Subscription() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
    staleTime: 1000 * 60 * 5,
  });

  const { user } = useUserStore();

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
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
          <p className="text-muted-foreground">We couldn't load the subscription plans. Please try again later.</p>
        </div>
      </div>
    );
  }

  const purchaseSubscription = async (priceId: string) => {
    try {
      const { status, response } = await createSubscription({ customer: user?.customer!, price: priceId });
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



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="max-w-7xl w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Choose Your Debate Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your full potential with our tailored subscription plans. Elevate your debating skills and join a community of passionate thinkers.
          </p>
        </div>

        {/* <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="annual-switch">Monthly</Label>
          <Switch
            id="annual-switch"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="annual-switch">Annual (Save 20%)</Label>
        </div> */}

        <div className="grid md:grid-cols-3 gap-8">
          {data?.response?.data.data?.map((tier: SubscriptionProduct, index: number) => (
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
                    <span className="text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>
                  {/* <ul className="space-y-3">
                    {tier.metadata.features.split(',').map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary" />
                        {feature.trim()}
                      </li>
                    ))}
                  </ul> */}
                </CardContent>
              </div>
              <CardFooter className="mt-6">
                <Button
                  className="w-full text-lg py-6 transition-all duration-300 ease-in-out"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    purchaseSubscription(tier.default_price);
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
      </div>
    </div>
  );
}

