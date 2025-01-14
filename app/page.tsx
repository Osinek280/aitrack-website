"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { externalLinks } from '@/utils/external-links'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Stripe } from '@stripe/stripe-js'

export default function Home() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!))
  }, [])

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      const response = await fetch(`/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          email: user?.emailAddresses?.[0]?.emailAddress,
          priceId,
          subscription,
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to create checkout session:', response.statusText);
        toast('Failed to create checkout session');
        return;
      }
  
      const data = await response.json();
  
      if (data.sessionId) {
        const stripe = await stripePromise;
  
        const stripeResponse = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
  
        return stripeResponse;
      } else {
        console.error('Failed to create checkout session');
        toast('Failed to create checkout session');
        return;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast('Error during checkout');
      return;
    }
  };  

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="block">Supercharge your coding</span>
            <span className="block text-indigo-600">with AiTrack</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            AITrack is a powerful VS Code extension that helps you write better code faster. Get real-time AI-powered suggestions and insights as you code.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href={externalLinks.aitrack} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg" 
                  className="md:py-4 md:text-lg md:px-10"
                >
                  Get Ai-Track
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/billing">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="md:py-4 md:text-lg md:px-10"
                  onClick={(e) => {
                    e.preventDefault();
                    if(isSignedIn) {
                      handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!, true)
                    }else {
                      toast("Please login or sign up to purchase", {
                        description: "You must be logged in to make a purchase",
                        action: {
                          label: "Sign Up",
                          onClick: () => {
                            router.push("/sign-up")
                          },
                        },
                      })
                    }
                  }}
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-secondary-foreground sm:text-4xl">
            See AITrack in Action
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Watch how AITrack can revolutionize your coding experience
          </p>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={externalLinks.instruction}
            title="AITrack Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-secondary-foreground sm:text-4xl">
              Getting Started
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
              Follow these simple steps to start using AITrack
            </p>
          </div>
          <div className="mt-12 space-y-10">
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-secondary-foreground">1. Install the Extension</h3>
              <ul className="mt-2 ml-4 list-disc list-inside text-base text-secondary-foreground">
                <li>Open Visual Studio Code.</li>
                <li>Go to the Extensions Marketplace (Ctrl+Shift+X or Cmd+Shift+X).</li>
                <li>Search for &quot;AiTrack&ldquo; and click &quot;Install.&quot;</li>
              </ul>
              <p className="mt-2 text-base text-secondary-foreground">
                Alternatively: Install <a href={externalLinks.aitrack} className="text-indigo-600 hover:text-indigo-500">AiTrack from VS Code Marketplace</a>
              </p>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-secondary-foreground">2. Log in to GitHub</h3>
              <p className="mt-2 text-base text-secondary-foreground">
                The extension will automatically handle GitHub authentication when needed.
              </p>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-secondary-foreground">3. Choose your tracking preferences</h3>
              <p className="mt-2 text-base text-secondary-foreground">
                In VS Code Settings (Ctrl+, or Cmd+,), add the following:
              </p>
              <pre className="mt-2 bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`{
  "aitrack.repoName": "code-tracking",
  "aitrack.commitFrequency": 30,
  "aitrack.exclude": [
    "node_modules",
    "dist",
    ".git"
  ],
  "aitrack.saveDiffFiles": false
  "aitrack.repoVisibility": "private"
}`}
              </pre>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-secondary-foreground">4. Start Tracking</h3>
              <ul className="mt-2 ml-4 list-disc list-inside text-base text-secondary-foreground">
                <li>Tracking will start automatically once the extension is active.</li>
                <li>You don&apos;t need to take any further action.</li>
              </ul>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-secondary-foreground">5. View Your Progress</h3>
              <p className="mt-2 text-base text-secondary-foreground">
                Visit your tracking repository on GitHub to see your logs, AI-generated commit messages, and detailed diffs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-secondary-foreground">Key Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover how AITrack can revolutionize your coding experience.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {[
              {
                name: 'AI-Powered Suggestions',
                description: 'Get intelligent code suggestions as you type, helping you write better code faster.',
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                name: 'Real-time Code Analysis',
                description: 'Identify potential issues and optimize your code on the fly.',
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                name: 'Language Support',
                description: 'Works with a wide range of programming languages and frameworks.',
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
              {
                name: 'Customizable Settings',
                description: 'Tailor AITrack to your specific needs and coding style.',
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                name: 'Performance Optimization',
                description: "Lightweight extension that won't slow down your development environment.",
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                name: 'Regular Updates',
                description: 'Benefit from continuous improvements and new features.',
                icon: (
                  <svg className="absolute h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.name} className="relative p-6 bg-secondary rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <dt>
                  <div className="absolute left-6 top-6">
                    {feature.icon}
                  </div>
                  <p className="ml-9 text-lg leading-6 font-medium text-foreground">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}



