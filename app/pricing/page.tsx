'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Hobby',
    priceId: 'price_hobby',
    priceMonthly: 0,
    description: 'All the basics for starting a new project',
    includedFeatures: ['Basic AI suggestions', 'Limited language support', 'Community support'],
  },
  {
    name: 'Professional',
    priceId: 'price_professional',
    priceMonthly: 15,
    description: 'Everything you need for a growing development team',
    includedFeatures: [
      'Advanced AI suggestions',
      'Full language support',
      'Real-time code analysis',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    priceId: 'price_enterprise',
    priceMonthly: 'Custom',
    description: 'Dedicated support and infrastructure for your company',
    includedFeatures: [
      'Advanced AI suggestions',
      'Full language support',
      'Real-time code analysis',
      'Custom integrations',
      '24/7 phone & email support',
    ],
  },
]

export default function Pricing() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (priceId: string) => {
    setLoading(true)
    console.log("price_id: ", priceId)    
  }

  return (
    <div className="bg-gray-100">
      {/* ... (previous JSX remains the same) ... */}
      <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              {tiers.map((tier) => (
                <div key={tier.name} className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{tier.name}</h3>
                  <p className="mt-6 text-base text-gray-500">{tier.description}</p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                        What&apos;s included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                      {tier.includedFeatures.map((feature) => (
                        <li key={feature} className="flex items-start lg:col-span-1">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                        Price
                      </h4>
                      <span className="text-4xl font-extrabold text-gray-900">${tier.priceMonthly}</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      onClick={() => handleSubscribe(tier.priceId)}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      {loading ? 'Processing...' : `Subscribe to ${tier.name}`}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

