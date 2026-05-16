'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Lead, Highlight } from '@/components/ui/typography'
import LevelBadge from '@/components/hub/level-badge'
import XPBar from '@/components/hub/xp-bar'
import AITrustScoreCard from '@/components/hub/trust-score-card'

export default function HumanEmpowermentSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Human-in-the-Loop
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            We Don&apos;t Replace Your Team. <br />
            <span className="text-indigo-600">We Give Them Superpowers.</span>
          </h2>
          <Lead className="max-w-3xl mx-auto">
            We don&apos;t replace your human staff; we deploy an Orchestration Layer to stop the bleeding and put them in command. Automation eliminates brutal, repetitive data entry so your team can focus on high-yield patient care.
          </Lead>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-center">
          {/* Left Column: Visual Teasers */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900">Your Rank Profile</span>
                <LevelBadge level="pilot" />
              </div>
              <XPBar currentXP={4850} nextLevelXP={5000} />
            </div>

            <div className="bg-white hover:-translate-y-1 transition-transform cursor-pointer">
              <AITrustScoreCard score={92} trend="up" claimsProcessed={12450} />
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Ascension Over Automation</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                When the engine is unsure (sub-95% confidence), it pauses and routes the exception to your staff. Every human correction trains <em>your</em> facility&apos;s customized model, preventing the same mistake twice.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Earn Reputation</h4>
                  <p className="text-gray-600 font-medium">Staff earn XP and ascend ranks (Academy → Pilot → Protocol Engineer) by catching AI anomalies.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Expert Task Network</h4>
                  <p className="text-gray-600 font-medium">Senior billers handle complex cases the AI escalates — and earn bonus compensation for each one resolved.</p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/train"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Enter the Empowerment Hub <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
