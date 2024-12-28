import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, Heart } from 'lucide-react'

export function EventCardSkeleton() {
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="aspect-video w-full rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" disabled className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <Skeleton className="h-4 w-8" />
          </Button>
          <div className="flex -space-x-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-8 h-8 rounded-full border-2 border-background" />
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <Skeleton className="h-4 w-24" />
        </Button>
      </CardFooter>
    </Card>
  )
}

