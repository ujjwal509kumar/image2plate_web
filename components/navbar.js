'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from './dark-mode';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-background border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-orange-500 tracking-wide">
            Image2Plate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-orange-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {status === 'authenticated' ? (
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4"
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4"
                asChild
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <SheetHeader>
                  <SheetTitle className="text-lg text-orange-500">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-orange-500 transition-colors"
                      onClick={handleClose}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {status === 'authenticated' ? (
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        handleClose();
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      asChild
                      onClick={handleClose}
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
