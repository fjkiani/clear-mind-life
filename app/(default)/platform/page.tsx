import { Metadata } from 'next'
import { ArrowRight, Target, Activity, Zap, CheckCircle2, ShieldCheck, BrainCircuit } from 'lucide-react'
import Link from 'next/link'

// Simulators
import EligibilityChecker from '@/components/dashboard/eligibility-checker'
import EncounterSimulator from '@/components/dashboard/encounter-simulator'
import BillingSimulator from '@/components/dashboard/billing-simulator'

export const metadata: Metadata = {
    title: 'Platform — The Autonomous Healthcare Revenue Engine',
    description: 'Experience the 3 core AI agents that plug the leaks in the healthcare revenue cycle.',
}

export default function Platform() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-white">
            <main className="flex-grow pt-32 pb-0">
                {/* Intro */}
                <section className="px-6 mb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-6 border border-slate-200 uppercase tracking-widest">
                            The End-to-End Solution
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">The Revenue Engine</h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
                            The healthcare revenue cycle is broken into 4 massive leaks. Discover how our autonomous ecosystem plugs every single hole.
                        </p>
                    </div>
                </section>

                {/* Agent 1: The Receptionist (Targeting Leak 1 - Pre-Visit) */}
                <section className="py-24 border-t border-gray-100 bg-slate-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold mb-6 border border-rose-100 uppercase tracking-widest">
                                Leak 1: Pre-Visit Rejections
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight flex items-center justify-center gap-3">
                                <Zap className="w-10 h-10 text-violet-600" /> The Receptionist Agent
                            </h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                Front desk staff waste 20 minutes per patient verifying coverage. Our agent negotiates directly with clearinghouses via encrypted X12 EDI the second an appointment is booked.
                            </p>
                        </div>

                        {/* Live Simulator Embed */}
                        <div className="bg-slate-200/50 rounded-[2.5rem] p-4 md:p-8 shadow-inner border border-slate-200 mb-16 relative">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span> Live Component
                            </div>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative z-0">
                                <EligibilityChecker />
                            </div>
                        </div>

                        {/* Executive Takeaway */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-violet-50 p-8 rounded-2xl border border-violet-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-full border-b border-l border-violet-500/20"></div>
                                <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2 text-xl relative z-10"><Target className="w-6 h-6 text-violet-600" /> Executive Takeaway</h4>
                                <p className="text-violet-800 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                                    By automating the 270/271 EDI exchange, we eliminate the <span className="font-black">60% of initial claim denials</span> caused by inactive coverage or missed prior-authorizations before the patient even walks through the door.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agent 2: The Encounter (Targeting Leak 2 - During Visit) */}
                <section className="py-24 border-t border-gray-100 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100 uppercase tracking-widest">
                                Leak 2: Under-Coding & Burnout
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight flex items-center justify-center gap-3">
                                <Activity className="w-10 h-10 text-indigo-600" /> The Encounter Agent
                            </h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                Physicians spend 2 hours daily on charting. They downcode to save time. Our agent generates clinical SOAP notes and maps precise ICD-10/CPT codes ambiently while the doctor talks.
                            </p>
                        </div>

                        {/* Live Simulator Embed */}
                        <div className="bg-slate-100 rounded-[2.5rem] p-4 md:p-8 shadow-inner border border-slate-200 mb-16 relative">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Live Component
                            </div>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative z-0">
                                <EncounterSimulator />
                            </div>
                        </div>

                        {/* Executive Takeaway */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full border-b border-l border-indigo-500/20"></div>
                                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-xl relative z-10"><Target className="w-6 h-6 text-indigo-600" /> Executive Takeaway</h4>
                                <p className="text-indigo-800 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                                    Complete, accurate, zero-click documentation instantly recovers the <span className="font-black">$50k to $70k lost annually per provider</span> due to undocumented severity and administrative exhaustion.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agent 3: The Billing (Targeting Leaks 3 & 4) */}
                <section className="py-24 border-t border-gray-100 bg-slate-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-6 border border-emerald-100 uppercase tracking-widest">
                                Leaks 3 & 4: Erroneous Claims & Bad Debt
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight flex items-center justify-center gap-3">
                                <BrainCircuit className="w-10 h-10 text-emerald-600" /> The Billing Agent
                            </h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                Denials stack up in a 45-day A/R void. Our agent intercepts claims before submission, cross-referencing millions of payer rules to attach missing modifiers automatically.
                            </p>
                        </div>

                        {/* Live Simulator Embed */}
                        <div className="bg-slate-200/50 rounded-[2.5rem] p-4 md:p-8 shadow-inner border border-slate-200 mb-16 relative">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Component
                            </div>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative z-0">
                                <BillingSimulator />
                            </div>
                        </div>

                        {/* Executive Takeaway */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full border-b border-l border-emerald-500/20"></div>
                                <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2 text-xl relative z-10"><Target className="w-6 h-6 text-emerald-600" /> Executive Takeaway</h4>
                                <p className="text-emerald-800 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                                    Predictive claim scrubbing yields a <span className="font-black">99%+ first-pass clean claim rate</span>. Cash flow accelerates from 45 days to 14 days, effectively eliminating the need for a massive denial recovery team.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Human Empowerment Hub (Phase 6 tie-in) */}
                <section className="py-32 bg-slate-900 text-white border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-bold mb-6 border border-slate-700 uppercase tracking-widest shadow-inner">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> The Final Layer
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">The Human Oversight Node</h2>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-4xl mx-auto mb-16">
                            When the engine encounters an edge case it cannot resolve with 99% confidence, it instantly pauses and routes the claim to the Human Empowerment Hub. Real billing experts review the anomaly and <span className="text-white font-bold border-b-2 border-emerald-500">train the model never to miss it again.</span>
                        </p>

                        <div className="bg-slate-800/50 backdrop-blur rounded-[3rem] p-8 md:p-16 border border-slate-700 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

                            <h3 className="text-3xl font-bold mb-12 text-white relative z-10">Ascension Over Automation</h3>

                            <div className="grid md:grid-cols-3 gap-8 text-left relative z-10">
                                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-xl hover:border-emerald-500/50 transition-colors group">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h4 className="font-bold text-white text-xl mb-3">1. The Reviewer</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">Validates AI outputs, fixing data hallucinations and feeding the reinforcement learning loop to tailor the model to your facility.</p>
                                </div>

                                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-xl hover:border-violet-500/50 transition-colors group">
                                    <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-6 border border-violet-500/30 group-hover:scale-110 transition-transform">
                                        <Activity className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <h4 className="font-bold text-white text-xl mb-3">2. The Pilot</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">Oversees entire batches of claims autonomously generated by the engine, acting as the final QA sweep before clearinghouse transmission.</p>
                                </div>

                                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-xl hover:border-blue-500/50 transition-colors group">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
                                        <BrainCircuit className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-white text-xl mb-3">3. The Protocol Engineer</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">Builds custom clinical logic gates and rule-sets to codify the facility's unique billing nuances into the global autonomous engine.</p>
                                </div>
                            </div>

                            <div className="mt-16 relative z-10">
                                <Link href="/train" className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:shadow-white/20 hover:-translate-y-1">
                                    See How We Train Healthcare Teams <ArrowRight className="w-5 h-5 ml-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
