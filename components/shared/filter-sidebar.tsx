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
import { useEventFilterStore } from "@/store/filter-state.store";

export function FilterSidebar() {
  const { setSelectedTopic, selectedTopic, clearTopic } = useEventFilterStore();

  const { data, isLoading } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["Categories", { type: "Filter-Categories" }],
  });

  const toggleTopic = (topic: string) => {
    if (selectedTopic === topic) {
      clearTopic();
    } else {
      setSelectedTopic(topic);
    }
  };

  const EnhancedSkeleton = () => (
    <>
      {[...Array(3)].map((_, groupIndex) => (
        <SidebarGroup key={groupIndex}>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-xs">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-4 rounded" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-wrap gap-2 p-4">
                {[...Array(4)].map((_, chipIndex) => (
                  <Skeleton
                    key={chipIndex}
                    className="h-6 w-20 rounded-md"
                  />
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
            <EnhancedSkeleton />
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
                          selected={selectedTopic === subCategory._id}
                          onClick={() => toggleTopic(subCategory._id)}
                          onRemove={clearTopic}
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
