'use client'
import * as React from "react"
import { X } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean
  onRemove: () => void
}

export function FilterChip({
  children,
  selected,
  onRemove,
  className,
  ...props
}: FilterChipProps) {
  return (
    <Button
      variant={selected ? "secondary" : "outline"}
      size="sm"
      className={cn(
        "h-auto rounded-full px-3 py-1 text-xs font-normal",
        selected && "pr-1",
        className
      )}
      {...props}
    >
      {children}
      {selected && (
        <X
          className="ml-1 h-3 w-3 cursor-pointer opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        />
      )}
    </Button>
  )
}

