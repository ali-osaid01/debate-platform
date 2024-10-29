'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { BellDot, Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useQuery } from '@tanstack/react-query';
import { authenticatedUser } from '@/services/user.service';
import { useUserStore } from '@/store/user.store';
import ProfileAvatar from './Profile-Avatar';
import Logo from '@/public/assets/logo.jpg'
import Image from 'next/image';
export default function Navbar() {
  const { user, setUser } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authenticatedUser,
    enabled: !user,
    staleTime: 5000 * 60,
  });

  useEffect(() => {
    if (!isLoading && data?.success && data.response && !user) {
      setUser(data.response.data.data);
    }
  }, [data, isLoading, user, setUser]);

  return (
    <nav className="bg-background border-b">
      <div className="px-5 flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold flex items-center">
            <Image
              src={Logo}
              alt='Logo'
              width={45}
              height={20}
            />
            <p className='font-extralight font-mono'>
              Virtual Debate
            </p>
          </span>
        </Link>
        <div className="flex md:order-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className='flex gap-2 items-center'>
              <MessageSquare />
              <BellDot />
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
    </nav>
  );
}
