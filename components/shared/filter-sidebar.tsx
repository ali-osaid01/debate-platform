"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { FilterChip } from "@/components/helper/filter-chip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/category.service";
import { ICategory } from "@/types/interface/category.interface";

export function FilterSidebar() {
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["Categories", { type: "Filter-Categories" }],
  });

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3].map((index) => (
        <SidebarGroup key={index}>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-xs">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-wrap gap-2 p-4">
                {[1, 2, 3, 4].map((chipIndex) => (
                  <Skeleton key={chipIndex} className="h-6 w-20" />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      ))}
    </>
  );

  return (
    <SidebarProvider>
      <Sidebar className="w-64 xl:w-80 border-r md:fixed md:left-0 md:top-0 md:h-full md:overflow-y-auto mt-10">
        <SidebarContent className="pt-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            data?.response?.data?.map((category: ICategory) => (
              <SidebarGroup key={category._id}>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-muted/50">
                    {category.title}
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-wrap gap-2 p-4">
                      {category?.subCategories?.map((subCategory: any) => (
                        <FilterChip
                          key={subCategory._id}
                          selected={selectedTopics.includes(subCategory._id)}
                          onClick={() => toggleTopic(subCategory._id)}
                          onRemove={() => toggleTopic(subCategory._id)}
                        >
                          {subCategory.title}
                        </FilterChip>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            ))
          )}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
