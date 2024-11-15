import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Subscription() {
  const tiers = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Perfect for beginners and casual debaters",
      features: [
        "Access to 5 debate rooms per month",
        "Basic topic suggestions",
        "Text-based debates",
        "24/7 community support"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "Ideal for regular debaters looking to improve",
      features: [
        "Unlimited access to debate rooms",
        "Advanced topic suggestions",
        "Text and voice-based debates",
        "Debate performance analytics",
        "Priority community support"
      ]
    },
    {
      name: "Elite",
      price: "$39.99",
      description: "For serious debaters and professionals",
      features: [
        "All Pro features",
        "Video-based debates",
        "Personal debate coach",
        "Exclusive masterclasses",
        "Debate tournament access",
        "VIP customer support"
      ]
    }
  ]

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
          {tiers.map((tier, index) => (
            <Card key={index} className={`flex flex-col justify-between transition-all duration-200 ease-in-out transform hover:scale-105 ${index === 1 ? "border-primary md:-mt-4 md:mb-4" : ""}`}>
              <div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-4xl font-extrabold mt-2">{tier.price}<span className="text-lg font-normal">/month</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="mt-6">
                <Button className="w-full text-lg py-6" variant={index === 1 ? "default" : "outline"}>
                  Choose {tier.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}