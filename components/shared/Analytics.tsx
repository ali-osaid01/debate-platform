'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function Analytics() {
    const [userCount, setUserCount] = useState(0)
    const targetUserCount = 1000000 // 1 million users
  
    useEffect(() => {
      const interval = setInterval(() => {
        setUserCount(prevCount => {
          if (prevCount < targetUserCount) {
            return prevCount + Math.floor(Math.random() * 10000)
          }
          clearInterval(interval)
          return targetUserCount
        })
      }, 50)
  
      return () => clearInterval(interval)
    }, [])
  
    const userLocations = [
      { country: "United States", count: 450000 },
      { country: "Pakistan", count: 200000 },
      { country: "United Kingdom", count: 100000 },
      { country: "Canada", count: 75000 },
      { country: "Australia", count: 50000 },
    ]
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Global Impact
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{userCount.toLocaleString()}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">and growing every day</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userLocations.map((location, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{location.country}</span>
                        <span className="font-semibold">{location.count.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  )
}
