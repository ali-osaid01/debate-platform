import * as React from 'react'
import Link from 'next/link'

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import logo from '@/public/assets/logo.jpg'
import { menuItem} from '@/utils/constant'

export function SidebarNav() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center justify-center p-4">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={100}
                            height={100}
                            />
                    </div>
                </SidebarHeader>
                <SidebarContent className='flex  text-center mx-2'>
                    <SidebarMenu>
                        {menuItem.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href} className="flex items-center">
                                        <item.icon className="mr-2 h-4 w-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}