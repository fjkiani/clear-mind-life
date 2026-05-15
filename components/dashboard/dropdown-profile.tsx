'use client'

import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { LogOut, Settings, User } from 'lucide-react'

export default function DropdownProfile({ align }: {
  align?: 'left' | 'right'
}) {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  // Derive display name and initials
  const displayName = isLoaded
    ? user
      ? user.fullName || user.primaryEmailAddress?.emailAddress || 'User'
      : 'Demo User'
    : '…'

  const initials = isLoaded && user
    ? ((user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')).toUpperCase() || user.primaryEmailAddress?.emailAddress?.[0]?.toUpperCase() || 'U'
    : 'D'

  const role = isLoaded && user ? 'Provider' : 'Demo Mode'
  const email = isLoaded && user ? user.primaryEmailAddress?.emailAddress : 'demo@clearmindlife.com'

  return (
    <Menu as="div" className="relative inline-flex">
      <MenuButton className="inline-flex justify-center items-center gap-2 group">
        {/* Avatar — initials circle, no broken image */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm">
          {initials}
        </div>
        <div className="flex items-center truncate">
          <span className="truncate ml-1 text-sm font-semibold text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white max-w-[120px]">
            {displayName}
          </span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </MenuButton>

      <Transition
        as="div"
        className={`origin-top-right z-10 absolute top-full min-w-[13rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-xl shadow-xl overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* User info header */}
        <div className="pt-1 pb-2.5 px-3 mb-1 border-b border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-gray-800 dark:text-gray-100 truncate">{displayName}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{email}</div>
            </div>
          </div>
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100 uppercase tracking-wider">
              {role}
            </span>
          </div>
        </div>

        <MenuItems as="ul" className="focus:outline-none px-1">
          <MenuItem as="li">
            {({ active }) => (
              <Link
                className={`flex items-center gap-2 font-medium text-sm py-1.5 px-2 rounded-lg transition-colors ${active ? 'bg-gray-50 text-violet-600 dark:bg-gray-700/50 dark:text-violet-400' : 'text-gray-600 dark:text-gray-300'}`}
                href="/dashboard/settings"
              >
                <Settings className="w-4 h-4 shrink-0" />
                Settings
              </Link>
            )}
          </MenuItem>

          {!user && (
            <MenuItem as="li">
              {({ active }) => (
                <Link
                  className={`flex items-center gap-2 font-medium text-sm py-1.5 px-2 rounded-lg transition-colors ${active ? 'bg-gray-50 text-violet-600 dark:bg-gray-700/50 dark:text-violet-400' : 'text-gray-600 dark:text-gray-300'}`}
                  href="/signin"
                >
                  <User className="w-4 h-4 shrink-0" />
                  Sign In
                </Link>
              )}
            </MenuItem>
          )}

          {user && (
            <MenuItem as="li">
              {({ active }) => (
                <button
                  className={`w-full flex items-center gap-2 font-medium text-sm py-1.5 px-2 rounded-lg transition-colors ${active ? 'bg-gray-50 text-rose-600 dark:bg-gray-700/50 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300'}`}
                  onClick={() => signOut({ redirectUrl: '/' })}
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out
                </button>
              )}
            </MenuItem>
          )}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
