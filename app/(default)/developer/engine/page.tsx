import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Crosshair, TrendingDown, Scale, Server, ArrowRight, Code2, AlertOctagon } from 'lucide-react'
import { Lead, Body, Highlight } from '@/components/ui/typography'
import { ExecutiveTakeaway } from '@/components/ui/takeaway'

export const metadata: Metadata = {
    title: 'Adversarial Data Engine — Clear Mind Life',
    description: 'The technical specifications of the 4 Core Adversarial Pillars used to stress-test our AI agents.',
}

export default function DeveloperEngine() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-900 text-slate-300">
            <main className="flex-grow pt-32 pb-24 border-b border-slate-800">

                {/* Header Section */}
                <section className="px-6 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-8 border border-emerald-900/30">
                        <Code2 className="w-4 h-4" /> Technical Documentation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        The Adversarial Data Engine
                    </h1>
                    <Lead className="max-w-4xl mx-auto text-slate-400">
                        Standard benchmarks (MMLU, HumanEval) are useless for enterprise AI. We test if an agent can survive contact with live production data. We stress-test our agents against <Highlight color="indigo">4 Core Adversarial Pillars</Highlight>.
                    </Lead>
                </section>

                {/* The Execution Engine: 4 Pillars */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Trap 1 */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] border-b border-l border-indigo-500/20"></div>
                            <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                                <Crosshair className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">1. The Multi-Hop Information Trap</h3>
                            <p className="text-slate-400 mb-4 leading-relaxed relative z-10">
                                Breaks standard vector RAG by forcing the model to trace 5+ degrees of separation across multiple API endpoints.
                            </p>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm relative z-10">
                                <span className="text-rose-400 font-bold">Exposes:</span> Iterative planning failure, connection hallucination.
                            </div>
                        </div>

                        {/* Trap 2 */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px] border-b border-l border-amber-500/20"></div>
                            <div className="w-12 h-12 bg-amber-900/50 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-amber-500/30 group-hover:scale-110 transition-transform">
                                <TrendingDown className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">2. The Temporal Logic Trap</h3>
                            <p className="text-slate-400 mb-4 leading-relaxed relative z-10">
                                Injects contradictory time constraints into the prompt context (e.g., "The deadline is 26 days away, but approval takes 42 days.")
                            </p>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm relative z-10">
                                <span className="text-rose-400 font-bold">Exposes:</span> Blind execution failure vs high-order loophole reasoning.
                            </div>
                        </div>

                        {/* Trap 3 */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] border-b border-l border-emerald-500/20"></div>
                            <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                                <Scale className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">3. The Inverse Compliance Trap</h3>
                            <p className="text-slate-400 mb-4 leading-relaxed relative z-10">
                                Provides a strict list of requirements, but embeds hidden, overriding exemptions deep within the unstructured context payload.
                            </p>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm relative z-10">
                                <span className="text-rose-400 font-bold">Exposes:</span> Blind checklist-following vs true contextual protocol adherence.
                            </div>
                        </div>

                        {/* Trap 4 */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden group hover:border-violet-500/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-[100px] border-b border-l border-violet-500/20"></div>
                            <div className="w-12 h-12 bg-violet-900/50 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-violet-500/30 group-hover:scale-110 transition-transform">
                                <Server className="w-6 h-6 text-violet-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">4. The Chained Execution Trap</h3>
                            <p className="text-slate-400 mb-4 leading-relaxed relative z-10">
                                Forces state-dependent chains of mutations across disparate MCP servers (e.g., Create → Label → Assign → Link).
                            </p>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm relative z-10">
                                <span className="text-rose-400 font-bold">Exposes:</span> Stateless amnesia leaving broken relational data in the database.
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl text-center">
                        <AlertOctagon className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">The CI/CD Testing Pipeline</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our engine scores agents across 4 hierarchical strata: <span className="text-white font-bold">Syntax, Resilience, Protocol, and Objective</span>. We pinpoint exactly where cognition breaks down before the agent ever touches a live production environment.
                        </p>
                    </div>
                </section>

                {/* The Bottom Line */}
                <section className="max-w-5xl mx-auto px-6">
                    <div className="bg-black text-white rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden border border-emerald-900/50">
                        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#00ff00_1px,transparent_1px),linear-gradient(to_bottom,#00ff00_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-emerald-400">See The Test Results</h2>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                                We run the top foundation models through our trap suite daily. See which models crack under pressure and which ones survive.
                            </p>
                            <Link href="/dashboard/security/benchmark" className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                                View Live Benchmarks <ArrowRight className="w-6 h-6 ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}
