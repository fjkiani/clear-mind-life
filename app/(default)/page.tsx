import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Anchor, ShieldCheck, ArrowRight, Check, Activity, Search, Command, ArrowDownRight, Zap, Server, BrainCircuit, ActivitySquare, AlertCircle, FileText, TrendingDown, TriangleAlert, Clock, Wallet } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Lead, Highlight } from '@/components/ui/typography'
import { ExecutiveTakeaway } from '@/components/ui/takeaway'
import LevelBadge from '@/components/hub/level-badge'
import XPBar from '@/components/hub/xp-bar'
import AITrustScoreCard from '@/components/hub/trust-score-card'

export const metadata = {
  title: 'Clear Mind Life — The Autonomous Healthcare Revenue Orchestrator',
  description: 'Stop the $20B/year revenue bleed. Clear Mind Life deploys a Universal Orchestration Layer across your revenue cycle — no hardware rip-and-replace, zero lock-in, total human oversight.',
}

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-inter">

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 text-center lg:pt-40">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Stop the $20B/year claims denial bleed
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
            The Autonomous Healthcare <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Revenue Orchestrator
            </span>
          </h1>
          <Lead className="max-w-3xl mx-auto mb-12">
            Medical practices lose <Highlight color="rose">20% of their revenue</Highlight> to denied claims, opaque insurance verification, and physician burnout. We don't sell another point solution that traps your data. Clear Mind Life operates as a <Highlight color="indigo">Universal Orchestration Layer</Highlight> to stop the bleeding and put your staff back in command. <Highlight color="emerald">Live in 14 days. No hardware rip-and-replace.</Highlight>
          </Lead>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-gray-900 hover:bg-black text-white text-lg font-bold transition-all shadow-xl hover:shadow-gray-400/50 hover:-translate-y-1"
            >
              Request Enterprise Demo →
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 text-lg font-bold transition-all hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-violet-600"></span>
              Enter Command Center
            </Link>
          </div>
        </div>
      </section>

      {/* ── ROI Banner ── */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Proven 9:1 Return on Investment</h3>
              <p className="text-gray-400 font-medium">For a typical 5-provider practice processing $3M annually.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full md:w-auto">
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Before Clear Mind</span>
                <span className="text-3xl font-black text-rose-500">20%</span>
                <span className="text-gray-500 text-sm font-medium">Claim Denial Rate</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">After Clear Mind</span>
                <span className="text-3xl font-black text-emerald-400"><span className="text-emerald-400/50">&lt;</span>5%</span>
                <span className="text-gray-500 text-sm font-medium">First-Pass Denial Rate</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Cost to Collect</span>
                <span className="text-3xl font-black text-sky-400">$4.50</span>
                <span className="text-gray-500 text-sm font-medium">per claim (vs $22 avg)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Net Recovered</span>
                <span className="text-3xl font-black text-emerald-400">+$450K</span>
                <span className="text-gray-500 text-sm font-medium">Annual Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Revenue Cycle Black Hole Teaser ── */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">The Revenue Cycle Black Hole</h2>
              <p className="text-lg text-gray-600 font-medium tracking-tight">
                A typical practice leaks <Highlight color="rose">$250K–$500K a year</Highlight> across 4 critical breakpoints.
              </p>
            </div>
            <Link
              href="/doctrine"
              className="shrink-0 px-6 py-3 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-2"
            >
              Read the Doctrine <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Differentiator Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-3xl rounded-full"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-black">X</span>
                <h3 className="text-xl font-bold text-gray-900">Reactive AI Vendors</h3>
              </div>
              <p className="text-gray-600 font-medium mb-6 relative z-10">Wait for the claim to deny, pay human reviewers, appeal 90 days later.</p>
              <div className="flex items-center justify-between bg-white/60 p-4 rounded-xl border border-rose-100 relative z-10">
                <span className="text-sm font-bold text-gray-500">Cost to Collect</span>
                <span className="text-xl font-black text-gray-900">$22.00</span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 relative overflow-hidden ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-500/5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black">✓</span>
                <h3 className="text-xl font-bold text-gray-900">Clear Mind Life</h3>
              </div>
              <p className="text-gray-600 font-medium mb-6 relative z-10">Pre-scrub via ML, auto-fix NCCI errors, submit clean claims 100% of the time.</p>
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-emerald-200 shadow-sm relative z-10">
                <span className="text-sm font-bold text-gray-500">Cost to Collect</span>
                <span className="text-2xl font-black text-emerald-600">$4.50</span>
              </div>
              <div className="inline-block mt-6 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0 relative z-10 border border-emerald-200">
                We prevent what others force you to recover.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── API Ecosystem Cloud ── */}
      <section className="py-12 border-y border-gray-100 bg-gray-50 overflow-hidden" id="integrations">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">No rip-and-replace — We plug into your existing stack via standard APIs</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-opacity duration-500">
            <span className="text-2xl font-black text-gray-800 tracking-tighter">Availity / X12</span>
            <span className="text-2xl font-black text-gray-800 tracking-tighter">Epic FHIR</span>
            <span className="text-2xl font-black text-gray-800 tracking-tighter">Twilio</span>
            <span className="text-2xl font-black text-gray-800 tracking-tighter">Stripe</span>
            <span className="text-2xl font-black text-gray-800 tracking-tighter">OpenAI</span>
          </div>
        </div>
      </section>

      {/* ── The 3 Autonomous Agents ── */}
      <section id="platform" className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Three Orchestration Agents, One Revenue Pipeline</h2>
            <Lead>We don't sell generic chatbots. We deploy three highly-specialized agents that intercept the critical failure points of your revenue cycle — <Highlight color="indigo">your staff stays in command</Highlight>.</Lead>
          </div>

          <div className="space-y-16 lg:space-y-24">

            {/* Agent 1: Receptionist */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 pb-16 border-b border-gray-100 relative">
              <div className="w-full md:w-1/2 rounded-3xl bg-gray-50 border border-gray-200 shadow-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 flex gap-2 items-center">
                  <span className="px-2 py-1 bg-white border border-gray-200 text-gray-900 text-[10px] font-black tracking-widest rounded shadow-sm">NEXHEALTH</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 text-gray-900 text-[10px] font-black tracking-widest rounded shadow-sm">TWILIO</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                    Terminal Mode
                  </span>
                </div>
                <div className="font-mono text-sm text-gray-600 mt-10 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <p className="text-violet-600 font-bold">$ RUN X12_270_ELIGIBILITY_REQUEST</p>
                  <p className="text-gray-400 truncate">ISA*00*          *00*          *ZZ*AV09311993     *ZZ*PAYERID        *260224*1435*^*00501*000000001*0*P*:</p>
                  <p className="text-gray-400 truncate">GS*HS*AV09311993*PAYERID*20260224*1435*1*X*005010X279A1</p>
                  <p className="text-gray-400 mt-4">... AWAITING 271 RESPONSE ...</p>
                  <p className="text-emerald-600 font-bold">$ PATIENT_COVERAGE_VERIFIED : TRUE</p>
                  <p className="text-emerald-600 font-bold">$ COPAY_CALCULATED : $25.00</p>
                  <p className="text-blue-500 font-bold">$ TWILIO_DISPATCH : SECURE_PAYMENT_LINK</p>
                </div>
                <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative z-10 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black">S.J.</div>
                      <div>
                        <p className="font-bold text-gray-900">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">BlueCross BlueShield #A12B34</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">Active Coverage</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">Amount Due Today</span>
                    <span className="text-2xl font-black text-gray-900">$25.00</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">The Front-Desk Receptionist</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Eliminates the #1 reason for denied claims: **Insurance Eligibility Errors**.
                  Before the patient even arrives, the Receptionist Agent utilizes **NexHealth** to read bi-directional scheduling data, executes a live X12 270/271 EDI exchange, and dispatches a secure **Twilio** SMS token for pre-visit payment.
                </p>

                <div className="my-6">
                  <ExecutiveTakeaway color="emerald">
                    Unlike dinosaur PM systems that rely on phone tag and clipboards, our agent interfaces directly with your EHR via federated identity. <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">No master credentials stored. No new hardware.</span>
                  </ExecutiveTakeaway>
                </div>

                <ul className="space-y-4 pt-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5"><span className="text-blue-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Real-time Copay & Deductible calculation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5"><span className="text-blue-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Auto-detects missing Prior Authorizations (X12 278)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5"><span className="text-blue-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Patients pay *before* the visit, securing cash flow</span>
                  </li>
                </ul>
                <Link
                  href="/platform#receptionist"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  Interact with the UI Component <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Agent 2: Encounter */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 pb-16 border-b border-gray-100 relative">
              <div className="w-full md:w-1/2 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-white text-sm font-bold">Telehealth Transcript: Live</span>
                  </div>
                  <span className="px-2 py-1 bg-white text-gray-900 text-[10px] font-black tracking-widest rounded shadow-[0_0_15px_rgba(255,255,255,0.3)]">ASSEMBLYAI</span>
                </div>
                <div className="space-y-4 mb-8 h-32 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 z-10 pointer-events-none"></div>
                  <p className="text-sm text-gray-400"><span className="text-blue-400 font-bold">Patient:</span> The pain is mostly in my lower back, it radiates down my left leg.</p>
                  <p className="text-sm text-gray-400"><span className="text-emerald-400 font-bold">Provider:</span> Does it feel sharp, or more like a dull ache?</p>
                  <p className="text-sm text-gray-300"><span className="text-blue-400 font-bold">Patient:</span> Sharp, especially when I bend over.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Auto-Generated SOAP</span>
                    <span className="px-2 py-1 rounded bg-violet-500/20 text-violet-300 text-[10px] font-black tracking-widest">READY TO REVIEW</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-3">Subjective: Patient reports sharp lower back pain radiating down the left leg, exacerbated by bending.</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs font-mono font-bold border border-gray-600">ICD-10: M54.41 (Sciatica)</span>
                    <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs font-mono font-bold border border-gray-600">CPT: 99213</span>
                  </div>
                  <button className="mt-4 w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                    One-Tap Approve to EHR
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">The Post-Visit Analyzer</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Returns 2 hours back to every provider, every day.
                  Powered by **AssemblyAI**, the agent listens ambiently, constructs the full SOAP note, and automatically maps clinical context to accurate ICD-10 and CPT codes.
                </p>

                <div className="my-6">
                  <ExecutiveTakeaway color="violet">
                    Legacy scribes and basic dictation tools hoard your data. <span className="underline decoration-violet-400 decoration-2 underline-offset-4 font-bold">We enforce a strict Zero-Data Retention policy. Audio is ephemeral; only the FHIR payload survives.</span>
                  </ExecutiveTakeaway>
                </div>

                <ul className="space-y-4 pt-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mt-0.5"><span className="text-violet-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Zero-Click Charting directly into Epic/Cerner via FHIR</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mt-0.5"><span className="text-violet-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Prevents under-coding (recovering 15% missing revenue)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mt-0.5"><span className="text-violet-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Automated Safety Protocol triggers on dangerous keywords</span>
                  </li>
                </ul>
                <Link
                  href="/platform#encounter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-50 text-violet-700 font-bold hover:bg-violet-100 transition-colors border border-violet-200"
                >
                  Watch the Live Extractor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Agent 3: Billing */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 pb-16 relative">
              <div className="w-full md:w-1/2 rounded-3xl bg-gray-50 border border-gray-200 shadow-2xl p-8 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-gray-900 tracking-wider uppercase text-sm">Claims Scrubbing Queue</h4>
                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-900 text-[10px] font-black tracking-widest rounded shadow-sm">STRIPE</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold">22 Ready</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between transition-all hover:border-gray-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-10 rounded-full bg-emerald-500"></div>
                      <div>
                        <p className="font-bold text-gray-900">Claim #837-A91B</p>
                        <p className="text-xs text-emerald-600 font-bold mt-1">98% First-Pass Confidence</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold rounded-lg transition-colors">Submit</button>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-rose-200 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-rose-500"></div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                          <span className="text-rose-600 text-lg font-black">!</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Claim #837-C42X</p>
                          <p className="text-xs text-rose-600 font-bold mt-1">Denial Predicted (UHC Rules)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-3 border border-rose-100 mb-3">
                      <code className="text-[10px] text-rose-800 font-mono">ERROR: CPT 99214 requires modifier -25 when billed with procedure 20610.</code>
                    </div>
                    <button className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">Auto-Fix & Submit</button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">The Claims Intelligence Agent</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Reactive denial management is dead. The Claims agent simulates payer adjudication on every X12 837 claim *before* it leaves your facility, utilizing an ML model trained on millions of historical denials to flag and auto-correct errors.
                </p>

                <div className="my-6">
                  <ExecutiveTakeaway color="emerald">
                    Dinosaurs wait 90 days for a denial, then charge you $22/claim to appeal it. <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">By proactively scrubbing pre-submission, we push your cost-to-collect down to $4.50.</span>
                  </ExecutiveTakeaway>
                </div>

                <ul className="space-y-4 pt-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5"><span className="text-emerald-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Predictive scrubbing checks payer-specific edit rules</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5"><span className="text-emerald-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Auto-reconciles ERA/835 payments to catch underpayments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5"><span className="text-emerald-600 text-sm font-bold">✓</span></div>
                    <span className="text-gray-700 font-medium">Generates plain-language patient bills with Stripe integration</span>
                  </li>
                </ul>
                <Link
                  href="/platform#billing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  Test the Payer Logic Engine <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Human Empowerment Section ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Human-in-the-Loop
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              We Don't Replace Your Team. <br />
              <span className="text-indigo-600">We Give Them Superpowers.</span>
            </h2>
            <Lead className="max-w-3xl mx-auto">
              We don't replace your human staff; we deploy an Orchestration Layer to stop the bleeding and put them in command. Automation eliminates brutal, repetitive data entry so your team can focus on high-yield patient care.
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
                  When the engine is unsure (sub-95% confidence), it pauses and routes the exception to your staff. Every human correction trains *your* facility's customized model, preventing the same mistake twice.
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
                    <h4 className="font-bold text-gray-900 text-lg">Unlock the Bounty Network</h4>
                    <p className="text-gray-600 font-medium">Elite "Protocol Engineers" can pick up overflow tasks from the global network to earn supplemental income.</p>
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

      {/* ── Consolidation CTA ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-gray-200 shrink-0">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Zero Lock-In Guarantee
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Retain Your Infrastructure</h2>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            Legacy kiosks and point solutions try to trap your data. Clear Mind uses a BYOD (Bring Your Own Device) architecture. We don't rip and replace your hardware; we orchestrate it via standard APIs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/compare"
              className="px-8 py-4 rounded-xl bg-gray-900 hover:bg-black text-white text-lg font-black transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3"
            >
              See the Legacy Vendor Teardowns
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Faded Vendor Logos/Names Background */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 opacity-30 grayscale">
            <span className="text-xl font-bold decoration-rose-500/50 decoration-2 line-through">Phreesia</span>
            <span className="text-xl font-bold decoration-rose-500/50 decoration-2 line-through">ScribeAmerica</span>
            <span className="text-xl font-bold decoration-rose-500/50 decoration-2 line-through">Athena Collector</span>
            <span className="text-xl font-bold decoration-rose-500/50 decoration-2 line-through">Waystar Rules</span>
          </div>
        </div>
      </section>

      {/* ── Security Trust Banner ── */}
      <section className="py-24 px-6 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Zero-Trust Security — Built In, Not Bolted On</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
              Your staff maintains command authority over every agent action. Our Identity Hub enforces continuous validation, scrubs all PHI before LLM routing, and logs every decision for full auditability.
            </p>
            <Link
              href="/dashboard/security/benchmark"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-bold transition-all shadow-lg"
            >
              View Security Benchmarks →
            </Link>
          </div>
          <div className="w-full md:w-1/2 rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">Live Telemetry</span>
              <span className="text-xs font-mono text-gray-500">MCP OVERRIDE</span>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center"><span className="text-gray-400">Auth Validation</span><span className="text-emerald-400">PASS (100%)</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400">PHI Scrubbing</span><span className="text-emerald-400">PASS (100%)</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400">RBAC Boundaries</span><span className="text-emerald-400">PASS (100%)</span></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
