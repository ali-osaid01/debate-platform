'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfileAvatar from './Profile-Avatar';
import Logo from '@/public/assets/logo.jpg';
import Image from 'next/image';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import NotificationSheet from '../helper/notification-sheet';
// import { usePathname } from 'next/navigation';
import { MessageCircleMore } from 'lucide-react';

export default function Navbar() {
  const { user, isLoading } = useAuthenticatedUser();

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="px-5 flex flex-wrap items-center justify-between mx-auto">
        {/* Logo Section */}
        <Link href={user ? '/feed' : '/'} className="flex items-center">
          <span className="text-2xl font-semibold flex items-center">
            <Image src={Logo} alt="Logo" width={45} height={20} />
            <p className="font-extralight font-mono hidden lg:block">
              Virtual Debate
            </p>
          </span>
        </Link>

        {/* User Actions Section */}
        <div className="flex md:order-2">
          {!user && isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="flex gap-2 items-center">
              <Link href="/chat">
                <Button variant="outline" size="icon">
                  <MessageCircleMore className="h-5 w-5" />
                </Button>
              </Link>
              <NotificationSheet />
              <ProfileAvatar />
            </div>
          ) : (
            <div className="md:flex space-x-3">
              <Link href="/sign-up" passHref>
                <Button variant="outline">Register</Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="default">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
