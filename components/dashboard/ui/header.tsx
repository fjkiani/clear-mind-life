'use client'

import { useState } from 'react'
import { useAppProvider } from '@/app/app-provider'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { FlaskConical } from 'lucide-react'

import SearchModal from '@/components/dashboard/search-modal'
import Notifications from '@/components/dashboard/dropdown-notifications'
import DropdownHelp from '@/components/dashboard/dropdown-help'
import ThemeToggle from '@/components/dashboard/theme-toggle'
import DropdownProfile from '@/components/dashboard/dropdown-profile'

export default function Header({
  variant = 'default',
}: {
  variant?: 'default' | 'v2' | 'v3'
}) {
  const { sidebarOpen, setSidebarOpen } = useAppProvider()
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)
  const { user, isLoaded } = useUser()

  // Show practice context: real org name if authed, demo label if not
  const practiceLabel = isLoaded
    ? user
      ? user.organizationMemberships?.[0]?.organization?.name ?? user.fullName ?? 'Your Practice'
      : "Dr. Sarah Chen's Practice"
    : null

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'}`}>

          {/* Left: hamburger + practice context */}
          <div className="flex items-center gap-3">
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            {/* Practice context pill */}
            {practiceLabel && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {!user && isLoaded && (
                  <FlaskConical className="w-3 h-3 text-amber-600 shrink-0" />
                )}
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 max-w-[200px] truncate">
                  {practiceLabel}
                </span>
                {!user && isLoaded && (
                  <Link
                    href="/signin"
                    className="text-[10px] font-bold text-violet-600 hover:text-violet-800 ml-1 whitespace-nowrap"
                  >
                    Sign in →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center space-x-3">
            <div>
              <button
                className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3 ${searchModalOpen && 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={() => setSearchModalOpen(true)}
              >
                <span className="sr-only">Search</span>
                <svg className="fill-current text-gray-500/80 dark:text-gray-400/80" width={16} height={16} viewBox="0 0 16 16">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal isOpen={searchModalOpen} setIsOpen={setSearchModalOpen} />
            </div>
            <Notifications align="right" />
            <DropdownHelp align="right" />
            <ThemeToggle />
            <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <DropdownProfile align="right" />
          </div>

        </div>
      </div>
    </header>
  )
}
