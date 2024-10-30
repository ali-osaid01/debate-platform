'use client'
import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ProfileAvatar from './Profile-Avatar';
import Logo from '@/public/assets/logo.jpg'
import Image from 'next/image';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import NotificationSheet from '../helper/notification-sheet';
export default function Navbar() {

  const { user, isLoading } = useAuthenticatedUser();
  
  return (
    <div className="bg-background border-b">
      <div className="px-5 flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold flex items-center">
            <Image
              src={Logo}
              alt='Logo'
              width={45}
              height={20}
            />
            <p className='font-extralight font-mono hidden lg:block'>
              Virtual Debate
            </p>
          </span>
        </Link>
        <div className="flex md:order-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className='md:flex gap-2 items-center hidden'>
              <NotificationSheet />
              <ProfileAvatar />
            </div>
          ) : (
            <div className="hidden md:flex space-x-3">
              <Link href="/sign-up" passHref>
                <Button variant="outline">Register</Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="default">Login</Button>
              </Link>
            </div>
          )}
          <Sheet key="navbar-sheet">
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate our website or sign in.</SheetDescription>
              </SheetHeader>
              {user ? (
                <ProfileAvatar />
              ) : (
                <div className="mt-4 flex flex-col space-y-3">
                  <Link href="/sign-up" passHref>
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login" passHref>
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
