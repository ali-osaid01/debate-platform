// src/components/Subscription.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubscription, fetchSubscription } from "@/services/subscription.service";
import { useUserStore } from "@/store/user.store";
import { STATUS } from "@/types/enum";
import { SubscriptionProduct } from "@/types/interface/subscription.interface";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";

export default function Subscription() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
    staleTime: 1000 * 60 * 5,
  });

  const { user } = useUserStore();

  if (isLoading) {
    return <div className="flex justify-center min-h-screen items-center"><Loader2 className="animate-spin " /></div>;
  }

  const puchaseSubscription = async (priceId: string) => {
    console.log("PURCHASE SUBSCRIPTION ->", priceId);
    const { status, response } = await createSubscription({ customer: user?.customer!, price: priceId });
    console.log("PURCHASE SUBSCRIPTION RESPONSE ->", status, response);
    if(status == STATUS.SUCCESS){
      window.location.href = response?.data?.data?.url
    }
    // window.location.href = response.data.url;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="max-w-7xl w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Choose Your Debate Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your full potential with our tailored subscription plans. Elevate your debating skills and join a community of passionate thinkers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data?.response?.data.data?.map((tier: SubscriptionProduct, index: number) => (
            <Card
              key={tier.id}
              className={`flex flex-col justify-between transition-all duration-200 ease-in-out transform hover:scale-105 ${index === 1 ? "border-primary md:-mt-4 md:mb-4" : ""
                }`}
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
                  {/* Example Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-3 h-5 w-5 text-primary" />
                      Access to sessions
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-3 h-5 w-5 text-primary" />
                      Priority event registration
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-3 h-5 w-5 text-primary" />
                      Expert-led resources
                    </li>
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="mt-6">
                <Button
                  className="w-full text-lg py-6"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => puchaseSubscription(tier.default_price)}
                >
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
