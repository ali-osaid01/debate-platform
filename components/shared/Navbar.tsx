'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfileAvatar from './Profile-Avatar';
import Logo from '@/public/assets/logo.jpg';
import Image from 'next/image';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import NotificationSheet from '../helper/notification-sheet';
import { MessageCircleMore, Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Search from '../helper/search';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, isLoading } = useAuthenticatedUser();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href={user ? '/feed' : '/'} className="flex items-center">
              <span className="text-2xl font-semibold flex items-center">
                <Image src={Logo} alt="Logo" width={45} height={20} className="rounded-full" />
                <p className="font-extralight font-mono hidden lg:block ml-2 text-primary">
                  Virtual Debate
                </p>
              </span>
            </Link>
          </div>

          {pathname === '/feed' && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto hidden md:block">
              <Search />
            </div>
          )}

          {/* Mobile Search Toggle */}
          <div className="md:hidden flex-1  text-end mx-2">
            <Button variant="outline" size="icon" onClick={toggleMobileSearch}>
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* User Actions Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {!user && isLoading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <Link href="/chat">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <MessageCircleMore className="h-5 w-5 text-primary" />
                  </Button>
                </Link>
                <NotificationSheet />
                <ProfileAvatar />
                
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/sign-up" passHref>
                  <Button variant="outline" className="rounded-full">
                    Register
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button variant="default" className="rounded-full">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          showMobileSearch ? 'max-h-16 opacity-100 ' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto px-4 py-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={toggleMobileSearch}
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}