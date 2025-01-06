'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Toaster } from './ui/sonner'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

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
        baseTheme: theme === 'dark' ? dark : undefined
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