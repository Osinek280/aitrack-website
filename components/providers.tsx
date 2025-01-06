'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { Toaster } from './ui/sonner'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: dark
      }}
    >
      <ThemeProvider
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  )
}