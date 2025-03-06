'use client'
import React from "react";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { menuItem } from "@/utils/constant";
import { SidebarNav } from "@/components/shared/admin-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentPageTitle = menuItem.find((item) => item.href === pathname)?.name || "Dashboard";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-[250px]">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar */}
        <nav className="px-9 pt-9 pb-2 bg-[#FAFAFA] h-44 flex flex-col text-black">
          {/* Top Right Icons */}
          <div className="flex justify-end items-center gap-5">
            <Bell />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* Dynamic Page Title */}
          <div className="pt-6">
            <h1 className="text-5xl font-bold text-[#093732]">{currentPageTitle}</h1>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6">{children ? children : <p>Content goes here</p>}</div>
      </main>
    </div>
  );
}
