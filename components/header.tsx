import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

export default function Header() {
  return (
    <header className="bg-background shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <ModeToggle />
            <Link href="/">
              <span className="sr-only">AiTrack</span>
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            <Link href="/login">
              Sign in
            </Link>
            <Link href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

