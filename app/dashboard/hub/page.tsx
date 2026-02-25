import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Cpu, Briefcase } from 'lucide-react'

import LevelBadge from '@/components/hub/level-badge'
import XPBar from '@/components/hub/xp-bar'
import AITrustScoreCard from '@/components/hub/trust-score-card'
import GlassBoxAlert from '@/components/hub/glass-box-alert'

export const metadata: Metadata = {
    title: 'Human Empowerment Hub - Clear Mind Life',
    description: 'Elevating medical billers from data entry to Protocol Engineers.',
}

export default function HubDashboard() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">
            <main className="flex-grow pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-4 tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                Zeta Protocol Live
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                Human Empowerment Hub
                            </h1>
                            <p className="text-lg text-slate-600 font-medium">
                                Welcome back, Sarah. You are 1,200 XP away from Protocol Engineer clearance.
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3 min-w-[300px]">
                            <LevelBadge level="pilot" />
                            <XPBar currentXP={3800} nextLevelXP={5000} label="Clearance Level 3 Progress" />
                        </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <AITrustScoreCard score={98.4} trend="up" claimsProcessed={142} />

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Available Bounties</h3>
                                <div className="text-4xl font-black text-slate-900">24</div>
                                <p className="text-sm text-slate-500 font-medium mt-1">High-yield denial appeals waiting</p>
                            </div>
                            <Link href="/dashboard/hub/bounties" className="group inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 mt-4">
                                View Bounty Board <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Protocols</h3>
                                <div className="text-4xl font-black text-slate-900">7</div>
                                <p className="text-sm text-slate-500 font-medium mt-1">Custom logic rules running</p>
                            </div>
                            <Link href="/dashboard/hub/protocols" className="group inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 mt-4">
                                Manage Logic Gates <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Action Modules */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Priority Action Queue</h2>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                                <GlassBoxAlert
                                    title="Aetna NCCI Edit Conflict Detected"
                                    reason="CPT code 99214 and 93000 billed together without Modifier 25. The AI automatically staged this claim but held submission due to a 94% denial risk prediction."
                                    severity="critical"
                                    actionText="Review & Fix Claim"
                                />
                                <GlassBoxAlert
                                    title="New Payer Policy Update"
                                    reason="UHC introduced a new Prior Auth requirement for code 70551 effective today. Would you like to build a protocol to flag these across the practice?"
                                    severity="info"
                                    actionText="Build Logic Gate"
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Ascension Modules</h2>

                            <div className="grid gap-4">
                                <Link href="/dashboard/hub/learning" className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                                        <BookOpen className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 flex items-center">
                                            The Academy
                                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Level 1 Required</span>
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">Master the Dual-Pane Reviewer. Learn how to train the AI by verifying its staging against source EHR notes.</p>
                                    </div>
                                </Link>

                                <Link href="/dashboard/hub/protocols" className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                        <Cpu className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 flex items-center">
                                            Protocol Builder
                                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Level 2+</span>
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">Stop doing data entry. Write custom logic gates that orchestrate autonomous actions across your payers.</p>
                                    </div>
                                </Link>

                                <Link href="/dashboard/hub/bounties" className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                                        <Briefcase className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 flex items-center">
                                            The Bounty Network
                                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Level 3 Clearance</span>
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">Accept overflow batches from the network. Use your AI superpowers to clear complex denials for gig-based cash bonuses.</p>
                                    </div>
                                </Link>

                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    )
}
