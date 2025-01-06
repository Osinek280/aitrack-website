import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Supercharge your coding</span>
            <span className="block text-indigo-600">with AITrack</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            AITrack is a powerful VS Code extension that helps you write better code faster. Get real-time AI-powered suggestions and insights as you code.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="https://marketplace.visualstudio.com/items?itemName=Aitrack.aitrack" target="_blank" rel="noopener noreferrer">
                <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get AITrack
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/pricing">
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            See AITrack in Action
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Watch how AITrack can revolutionize your coding experience
          </p>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="AITrack Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* New Getting Started Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Getting Started
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Follow these simple steps to start using AITrack
            </p>
          </div>
          <div className="mt-12 space-y-10">
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-gray-900">1. Install the Extension</h3>
              <ul className="mt-2 ml-4 list-disc list-inside text-base text-gray-500">
                <li>Open Visual Studio Code.</li>
                <li>Go to the Extensions Marketplace (Ctrl+Shift+X or Cmd+Shift+X).</li>
                <li>Search for &quot;AiTrack&ldquo; and click &quot;Install.&quot;</li>
              </ul>
              <p className="mt-2 text-base text-gray-500">
                Alternatively: Install <a href="https://marketplace.visualstudio.com/" className="text-indigo-600 hover:text-indigo-500">AiTrack from VS Code Marketplace</a>
              </p>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-gray-900">2. Log in to GitHub</h3>
              <p className="mt-2 text-base text-gray-500">
                The extension will automatically handle GitHub authentication when needed.
              </p>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-gray-900">3. Choose your tracking preferences</h3>
              <p className="mt-2 text-base text-gray-500">
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
  ]
}`}
              </pre>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-gray-900">4. Start Tracking</h3>
              <ul className="mt-2 ml-4 list-disc list-inside text-base text-gray-500">
                <li>Tracking will start automatically once the extension is active.</li>
                <li>You don&apos;t need to take any further action.</li>
              </ul>
            </div>
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-gray-900">5. View Your Progress</h3>
              <p className="mt-2 text-base text-gray-500">
                Visit your tracking repository on GitHub to see your logs, AI-generated commit messages, and detailed diffs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover how AITrack can revolutionize your coding experience.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {[
              {
                name: 'AI-Powered Suggestions',
                description: 'Get intelligent code suggestions as you type, helping you write better code faster.',
              },
              {
                name: 'Real-time Code Analysis',
                description: 'Identify potential issues and optimize your code on the fly.',
              },
              {
                name: 'Language Support',
                description: 'Works with a wide range of programming languages and frameworks.',
              },
              {
                name: 'Customizable Settings',
                description: 'Tailor AITrack to your specific needs and coding style.',
              },
              {
                name: 'Performance Optimization',
                description: "Lightweight extension that won't slow down your development environment.",
              },
              {
                name: 'Regular Updates',
                description: 'Benefit from continuous improvements and new features.',
              },
            ].map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <svg
                    className="absolute h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}



