"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/generated/prisma/enums";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu, X } from "lucide-react";

export const Navbar = ({ userRole }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200">
        {/* Main Navbar Header */}
        <div className="px-6 py-4 flex justify-between items-center">
          <Link
            href={"/"}
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <Image src={"/logo.png"} alt="TreeBio" width={42} height={42} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-row items-center justify-center gap-x-6">
            <Link
              href="/problems"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 cursor-pointer dark:hover:text-amber-400 transition-colors"
            >
              Problems
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 cursor-pointer dark:hover:text-amber-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 cursor-pointer dark:hover:text-amber-400 transition-colors"
            >
              Profile
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Show when={"signed-in"}>
              {userRole && userRole === UserRole.ADMIN && (
                <Link href={"/create-problem"}>
                  <Button variant={"outline"} size={"default"}>
                    Create Problem
                  </Button>
                </Link>
              )}
              <UserButton />
            </Show>

            <Show when={"signed-out"}>
              <SignInButton />
              <SignUpButton>
                <Button
                  size="sm"
                  className="text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white transition-colors"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
          </div>

          {/* Mobile Toggle & Actions */}
          <div className="flex md:hidden items-center gap-3">
            <ModeToggle />
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10 dark:border-white/5">
            <Link
              href="/problems"
              onClick={closeMenu}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              Problems
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              About
            </Link>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              Profile
            </Link>

            <div className="flex flex-col gap-4 pt-4 border-t border-white/10 dark:border-white/5">
              <Show when={"signed-in"}>
                {userRole && userRole === UserRole.ADMIN && (
                  <Link href={"/create-problem"} onClick={closeMenu}>
                    <Button
                      variant={"outline"}
                      className="w-full justify-center"
                    >
                      Create Problem
                    </Button>
                  </Link>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Account
                  </span>
                  <UserButton />
                </div>
              </Show>

              <Show when={"signed-out"}>
                <div className="flex flex-col gap-2">
                  <SignInButton>
                    <Button variant="outline" className="w-full justify-center">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full justify-center bg-amber-400 hover:bg-amber-500 text-white">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </Show>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
