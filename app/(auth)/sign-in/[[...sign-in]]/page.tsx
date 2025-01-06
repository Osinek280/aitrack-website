"use client"
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme()
  return (
    <div className="flex min-w-screen justify-center my-[5rem]">
        <SignIn
          appearance={{
            baseTheme: theme === 'dark' ? dark : undefined
          }} 
          fallbackRedirectUrl="/" 
          signUpFallbackRedirectUrl="/pricing"
        />
    </div>
  );
}