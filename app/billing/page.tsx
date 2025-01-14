"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, CreditCard, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const BillingPage = () => {
	const [isLoading] = useState(false);

  const subscription = {
    currentPeriodEnd: new Date(),
    planType: "Pro", // Replace with actual plan type
    status: "Active", // Replace with actual subscription status
    cancelAtPeriodEnd: true, // Replace with actual cancelation status
  };  

	const formatDate = (timestamp: number): string => {
		const date = new Date(timestamp * 1000);
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		return date.toLocaleDateString("en-US", options);
	};

	return (
		<div className='container mx-auto py-12 px-4 max-w-4xl '>
			<h1 className='text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100'>Billing Management</h1>
			<Card className='w-full shadow-lg border-0 overflow-hidden bg-white dark:bg-secondary'>
				{subscription ? (
					<>
						<CardHeader className='pb-0'>
							<CardTitle className='text-2xl text-gray-800 dark:text-foreground flex items-center gap-2'>
								<CheckCircle2 className='h-6 w-6 text-green-500' />
								Active Subscription
							</CardTitle>
							<CardDescription className='text-gray-600 dark:text-muted-foreground'>
								Manage your subscription details below
							</CardDescription>
						</CardHeader>

						<CardContent className='space-y-6 pt-6'>
						<div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-[hsl(240,3%,21%)] p-4 rounded-lg">
								<div>
									<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Plan</p>
									<p className='text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize'>
										{subscription.planType}
									</p>
								</div>

								<div>
									<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Status</p>
									<p className='text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize'>
										{subscription.status}
									</p>
								</div>
								<div className='col-span-2'>
									<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Next billing date</p>
									<p className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
										{formatDate(Math.floor(subscription.currentPeriodEnd.getTime() / 1000))}
									</p>
								</div>
							</div>
							{subscription.cancelAtPeriodEnd && (
								<div className='flex items-center bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg text-yellow-700 dark:text-yellow-300'>
									<AlertTriangle className='h-5 w-5 mr-3 flex-shrink-0' />
									<p className='text-sm'>
										Your subscription will be cancelled at the end of the current billing period.
									</p>
								</div>
							)}
						</CardContent>

						<CardFooter className='flex justify-end bg-gray-50 dark:bg-secondary mt-6'>
							<Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}>
							<Button
								disabled={isLoading}
								className='bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700'
							>
								{isLoading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Processing...
									</>
								) : (
									"Manage Billing"
								)}
							</Button>
							</Link>
						</CardFooter>
					</>
				) : (
					<>
						<div className='bg-gradient-to-r from-gray-200 to-gray-300 h-2 w-full'></div>
						<CardHeader>
							<CardTitle className='text-2xl text-gray-800 dark:text-gray-100 flex items-center gap-2'>
								<CreditCard className='h-6 w-6 text-gray-600 dark:text-gray-400' />
								No Active Subscription
							</CardTitle>
							<CardDescription className='text-gray-600 dark:text-gray-400'>
								Upgrade to Pro to unlock premium features
							</CardDescription>
						</CardHeader>
						<CardContent className='text-center py-12'>
							<p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>
								Get access to exclusive content and features with our Pro plan.
							</p>
							<Link href='/pro'>
								<Button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg dark:bg-purple-600 dark:hover:bg-purple-700'>
									<Zap className='mr-2 h-5 w-5' />
									Explore Pro Plans
								</Button>
							</Link>
						</CardContent>
					</>
				)}
			</Card>
		</div>
	);
};
export default BillingPage;
