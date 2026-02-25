import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Filter, Zap } from 'lucide-react'
import BountyCard, { BountyOffer } from '@/components/hub/bounty-card'

export const metadata: Metadata = {
    title: 'Bounty Network - Clear Mind Life',
    description: 'Clear overflow claims for gig-based cash bonuses.',
}

const mockBounties: BountyOffer[] = [
    {
        id: 'b-001',
        payer: 'BlueCross BlueShield',
        specialty: 'Orthopedics',
        batchSize: 150,
        payoutAmount: 450,
        timeLimitHours: 48,
        complexity: 'medium',
        description: 'Backlog of post-op physical therapy claims. High rate of modifier 59 denials needing manual review.',
    },
    {
        id: 'b-002',
        payer: 'Medicare',
        specialty: 'Cardiology',
        batchSize: 50,
        payoutAmount: 250,
        timeLimitHours: 24,
        complexity: 'high',
        description: 'Complex E/M level 5 code audits. AI flagged 50 claims as potentially upcoded. Require Level 3 Protocol Engineer.',
    },
    {
        id: 'b-003',
        payer: 'UnitedHealthcare',
        specialty: 'Dermatology',
        batchSize: 300,
        payoutAmount: 600,
        timeLimitHours: 72,
        complexity: 'low',
        description: 'Routine lesion removal overflow. Clean staging by AI, just needs human eyes for final sign-off before Friday batch.',
    },
]

export default function BountyMarketplacePage() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-950">
            <main className="flex-grow pt-24 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <Link href="/dashboard/hub" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4 tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Marketplace Live
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                                The Bounty Network
                            </h1>
                            <p className="text-lg text-slate-400 font-medium max-w-2xl">
                                Internal overflow orchestration. Put your AI superpowers to work by clearing backlogs for our network practices. Earn cash directly via Stripe payouts.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 min-w-[150px]">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Payouts</div>
                                <div className="text-3xl font-black text-emerald-400">$1,250</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Zap className="w-5 h-5 text-amber-400 mr-2" />
                            Available Batches (3)
                        </h2>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors">
                            <Filter className="w-4 h-4" /> Filter by Specialty
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockBounties.map((bounty) => (
                            <BountyCard key={bounty.id} bounty={bounty} />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    )
}
