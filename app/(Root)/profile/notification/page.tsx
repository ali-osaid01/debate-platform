'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

export default function Component() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    productUpdates: false,
    accountActivity: true,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated preferences:', preferences)
    toast("Your notification settings have been saved.")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Notification Preferences</CardTitle>
            <CardDescription className="text-lg">
              Choose how you want to be notified about important updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <Label htmlFor={key} className="flex flex-col space-y-1">
                  <span className="text-lg font-medium">{formatLabel(key)}</span>
                  <span className="font-normal text-sm text-muted-foreground">{getDescription(key)}</span>
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={() => handleToggle(key as keyof typeof preferences)}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg py-6">Save Preferences</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

function formatLabel(key: string): string {
  return key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function getDescription(key: string): string {
  const descriptions: Record<string, string> = {
    emailNotifications: "Receive notifications via email",
    pushNotifications: "Receive notifications on your device",
    marketingEmails: "Receive emails about new features and offers",
    securityAlerts: "Receive alerts about your account security",
    productUpdates: "Get notified about new product features and improvements",
    accountActivity: "Receive updates about your account activity",
  }
  return descriptions[key] || "Manage this notification setting"
}