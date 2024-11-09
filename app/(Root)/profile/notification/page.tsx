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
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified about important updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">Receive notifications via email</span>
            </Label>
            <Switch
              id="emailNotifications"
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">Receive notifications on your device</span>
            </Label>
            <Switch
              id="pushNotifications"
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketingEmails" className="flex flex-col space-y-1">
              <span>Marketing Emails</span>
              <span className="font-normal text-sm text-muted-foreground">Receive emails about new features and offers</span>
            </Label>
            <Switch
              id="marketingEmails"
              checked={preferences.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="securityAlerts" className="flex flex-col space-y-1">
              <span>Security Alerts</span>
              <span className="font-normal text-sm text-muted-foreground">Receive alerts about your account security</span>
            </Label>
            <Switch
              id="securityAlerts"
              checked={preferences.securityAlerts}
              onCheckedChange={() => handleToggle('securityAlerts')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Preferences</Button>
        </CardFooter>
      </Card>
    </form>
  )
}