'use client'

import { Info, Trophy } from 'lucide-react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { IBadge } from '@/types/interface/user.interface'
import { useIsMobile } from '@/hooks/use-mobile'
import { BadgeModal } from './badge-modal'

interface UserAchievementsProps {
  badges: IBadge[]
  score: number
}

export function UserAchievements({ badges, score }: UserAchievementsProps) {
  const isMobile = useIsMobile()
  const MAX_VISIBLE_BADGES = isMobile ? 2 : 5
  const visibleBadges = badges.slice(0, MAX_VISIBLE_BADGES)
  const hasMoreBadges = badges.length > MAX_VISIBLE_BADGES

  return (
    <div className="flex flex-col items-center md:items-start space-y-4">
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold">Score: {score}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Gain score by participating in public events</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {visibleBadges.map((badge) => (
          <TooltipProvider key={badge._id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-1">
                    <Image
                      src={badge.image}
                      alt={badge.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {isMobile && (
                    <span className="text-xs text-center">{badge.name}</span>
                  )}
                </div>
              </TooltipTrigger>
              {!isMobile && (
                <TooltipContent>
                  <p>{badge.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
        {hasMoreBadges && (
          <BadgeModal badges={badges} />
        )}
      </div>
    </div>
  )
}

