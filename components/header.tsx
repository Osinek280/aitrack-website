"use client"
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
// import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { dark } from "@clerk/themes"
import { Button } from './ui/button';

export default function Header() {
  const { theme } = useTheme()
  return (
    <header className="bg-background shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between p-8 h-20"  aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <ModeToggle />
            <Link href="/">
              <span className="sr-only">AiTrack</span>
            </Link>
          </div>
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton 
                appearance={{
                  baseTheme: theme === 'dark' ? dark : undefined
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button size="lg" className='font-bold'>Login</Button>
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}

