'use client';
import React, { useEffect } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { authenticatedUser } from '@/services/user.service';
import { useUserStore } from '@/store/user.store';

export default function Navbar() {
  const { user, setUser } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authenticatedUser,
    enabled: !user,
  });

  useEffect(() => {
    if (!isLoading && data?.success && data.response && !user) {
      setUser(data?.response?.data.data);
    }
  }, [data, isLoading, user, setUser]);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <span className="text-primary mr-2">Logo</span>
            Website Name
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? <div> hello world </div> :
          <div className="hidden md:flex space-x-3">
            <Link href="/sign-up" passHref>
              <Button variant="outline">Register</Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="default">Login</Button>
            </Link>
          </div>
          }
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
              {data ? (
                <div>hello world</div>
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
