import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IBadge } from "@/types/interface/user.interface"
import Image from "next/image"
import { MoreHorizontal } from 'lucide-react'

interface BadgeModalProps {
  badges: IBadge[]
}

export function BadgeModal({ badges }: BadgeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
          <span className="sr-only">View All Badges</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Badges</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4 max-h-[60vh] overflow-y-auto">
          {badges.map((badge) => (
            <div key={badge._id} className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-1">
                <Image
                  src={badge.image}
                  alt={badge.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center">{badge.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

