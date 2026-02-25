import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cpu, Activity } from 'lucide-react'
import LogicGateBuilder from '@/components/hub/logic-gate-builder'

export const metadata: Metadata = {
    title: 'Protocol Builder - Clear Mind Life',
    description: 'Write custom logic gates that orchestrate autonomous actions across your payers.',
}

export default function HubProtocolsPage() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">
            <main className="flex-grow pt-24 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <Link href="/dashboard/hub" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 tracking-widest uppercase">
                                <Cpu className="w-4 h-4" />
                                Protocol Builder
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                                Level 2 & 3: Logic Orchestration
                            </h1>
                            <p className="text-lg text-slate-600 font-medium max-w-2xl">
                                Define explicit rules to control the autonomous staging engine. Create rules to flag claims, hold for manual review, or route overflow volume directly to the Bounty Network based on high-risk payer requirements.
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-xl min-w-[200px]">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                                <Activity className="w-3 h-3 text-emerald-400 mr-1.5 animate-pulse" />
                                Engine Status
                            </div>
                            <div className="text-2xl font-black">7 Active Rules</div>
                            <div className="text-xs text-slate-400 mt-1 cursor-pointer hover:text-white underline underline-offset-2">View Rule Registry →</div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <LogicGateBuilder />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border text-sm text-slate-600 leading-relaxed border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Rule Highlight: Modifier 25 Hold</h3>
                            <p className="mb-4">"If Payer equals UHC and CPT contains 99214, Then Require Manual Review."</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">Active</span>
                                <span className="text-xs font-bold text-slate-400">Deployed 3 days ago</span>
                            </div>
                        </div>

                        <div className="bg-white border text-sm text-slate-600 leading-relaxed border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Rule Highlight: Med-Mal Route</h3>
                            <p className="mb-4">"If Diagnosis contains Z04.41 (Assault) and Confidence Score is Less Than 99, Then Send to Bounty Marketplace."</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded uppercase">Testing</span>
                                <span className="text-xs font-bold text-slate-400">Simulating...</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
