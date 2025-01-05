'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Check if the current path is `/chat`
  if (pathname === '/chat') {
    return null;
  }

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200">
      <p className="py-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        © 2024 DebateHub. All rights reserved.
      </p>
    </footer>
  );
}
