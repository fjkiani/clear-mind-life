'use client'

import { useState, useEffect } from 'react'
import { X, FlaskConical, Users, MapPin } from 'lucide-react'

const DISMISS_KEY = 'cml_demo_banner_dismissed'

export default function DemoBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show banner unless user has dismissed it this session
    const dismissed = sessionStorage.getItem(DISMISS_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative z-50 w-full bg-amber-50 border-b border-amber-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-2.5 gap-4">
          {/* Left: Demo label */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300">
              <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest">Demo Mode</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-amber-800 font-medium min-w-0 flex-wrap">
              <span className="font-bold text-amber-900">Dr. Sarah Chen&apos;s Practice</span>
              <span className="flex items-center gap-1 text-amber-700">
                <Users className="w-3.5 h-3.5" />
                5 Providers
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <MapPin className="w-3.5 h-3.5" />
                NYC Mental Health
              </span>
              <span className="hidden sm:inline text-amber-600 text-xs">
                · 8 active patients · 3 pending claims · 1 flagged denial
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/signin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors shadow-sm"
            >
              Sign in with your account
            </a>
            <button
              onClick={dismiss}
              className="p-1.5 rounded-lg text-amber-600 hover:text-amber-900 hover:bg-amber-100 transition-colors"
              aria-label="Dismiss demo banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
