'use client'
import * as React from "react"
import { ChevronDown } from 'lucide-react'

import { FilterChip } from "@/components/helper/filter-chip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface Category {
  name: string
  topics: string[]
}

const categories: Category[] = [
  {
    name: "Technology and Ethics",
    topics: ["AI", "Privacy", "SocialMedia", "Cryptocurrency", "Surveillance"],
  },
  {
    name: "Society and Culture",
    topics: ["Speech", "Globalization", "Workweek", "CancelCulture", "MentalHealth"],
  },
  {
    name: "Education and Innovation",
    topics: ["Coding", "OnlineDegrees", "AI", "Assignments", "Tests"],
  },
  {
    name: "Environmental Policies",
    topics: ["Emissions", "Nuclear", "EVs", "Meat", "Geoengineering"],
  },
];

export function FilterSidebar() {
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([])

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    )
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-72 border-r">
      <SidebarContent className="pt-16">
        {categories.map((category) => (
          <SidebarGroup key={category.name}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-muted/50">
                {category.name}
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-wrap gap-2 p-4">
                  {category.topics.map((topic) => (
                    <FilterChip
                      key={topic}
                      selected={selectedTopics.includes(topic)}
                      onClick={() => toggleTopic(topic)}
                      onRemove={() => toggleTopic(topic)}
                    >
                      {topic}
                    </FilterChip>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

