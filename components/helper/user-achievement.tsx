import { Info, Trophy } from 'lucide-react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export interface IBadge {
    id: string;
    name: string;
    image: string;
  }

interface UserAchievementsProps {
  badges: IBadge[]
  score: number
}

export function UserAchievements({ badges, score }: UserAchievementsProps) {
  return (
    <div className="flex flex-col items-center md:items-start space-y-4">
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold">Score: {score}</span>
        <TooltipProvider disableHoverableContent>
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Gain score by participating in public events</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center">
            <div className="relative w-12 h-12 mb-1">
              <Image
                src={badge.image}
                alt={badge.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-xs text-center">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
