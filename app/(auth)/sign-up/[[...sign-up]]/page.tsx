"use client"
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
    const { theme } = useTheme()
    return (
        <div className="flex min-w-screen justify-center my-[5rem]">
            <SignUp 
                appearance={{
                    baseTheme: theme === 'dark' ? dark : undefined
                }} 
                fallbackRedirectUrl="/" 
                signInFallbackRedirectUrl="/billing" 
            />
        </div>
    );
}