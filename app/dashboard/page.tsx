'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const [subscription, setSubscription] = useState('Free')

  const handleUpgrade = () => {
    // Here you would integrate with Stripe to handle the upgrade process
    console.log('Upgrading subscription')
  }

  const handleCancel = () => {
    // Here you would integrate with Stripe to handle the cancellation process
    console.log('Cancelling subscription')
    setSubscription('Free')
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Your AITrack Dashboard</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your current AITrack subscription.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Current plan</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{subscription}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Billing cycle</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Monthly</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Next billing date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">July 1, 2023</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Subscription</CardTitle>
            <CardDescription>Upgrade or cancel your AITrack subscription</CardDescription>
          </CardHeader>
          <CardContent>
            {subscription === 'Free' ? (
              <p>Upgrade to our Pro plan to unlock all features!</p>
            ) : (
              <p>You are currently on the Pro plan. Enjoy all our premium features!</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {subscription === 'Free' ? (
              <Button onClick={handleUpgrade}>Upgrade to Pro</Button>
            ) : (
              <Button variant="destructive" onClick={handleCancel}>Cancel Subscription</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

