'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfileAvatar from './Profile-Avatar';
import Logo from '@/public/assets/logo.jpg'
import Image from 'next/image';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import NotificationSheet from '../helper/notification-sheet';
import { usePathname } from 'next/navigation';
export default function Navbar() {

  const { user, isLoading } = useAuthenticatedUser();
  const path = usePathname();
  
  return (
    <nav className="bg-background border-b sticky top-0 z-50">
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
      ) : user && path != '/' ? (
        <div className="flex gap-2 items-center">
          <NotificationSheet />
          <ProfileAvatar />
        </div>
      ) : path === '/' ? (
        <div className="md:flex space-x-3">
          <Link href="/sign-up" passHref>
            <Button variant="outline">Register</Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="default">Login</Button>
          </Link>
        </div>
      ) : null}
    </div>
      </div>
    </nav>
  );
}
