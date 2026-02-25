import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Coins, Rocket, GraduationCap, Network, Terminal, Code, FileDigit, Receipt, Activity, CheckCircle2, AlertTriangle, Eye, Target } from 'lucide-react';
import LevelBadge from '@/components/hub/level-badge';
import XPBar from '@/components/hub/xp-bar';
import AITrustScoreCard from '@/components/hub/trust-score-card';
import DualPaneReviewer from '@/components/hub/dual-pane-reviewer';
import LogicGateBuilder from '@/components/hub/logic-gate-builder';

export const metadata: Metadata = {
    title: 'The Human Empowerment Hub — Train to Ascend',
    description: 'Learn the fundamentals of Medical Billing and how Clear Mind Life elevates billers into Protocol Engineers.',
};

export default function TrainPage() {

    const mockSourceText = `Patient: John Doe (DOB: 05/12/1980)\nDate of Service: 10/24/2023\nChief Complaint: Severe lower back pain radiating to left leg for 3 weeks.\nAssessment: Sciatica, left side. Muscle spasms.\nPlan: Prescribed NSAIDs. Ordered lumbar MRI. Recommended physical therapy starting next week.`;

    const mockStagedData = {
        codes: [
            { type: 'ICD-10', code: 'M54.32', desc: 'Sciatica, left side' },
            { type: 'ICD-10', code: 'M62.838', desc: 'Other muscle spasm' },
            { type: 'CPT', code: '99214', desc: 'Office/Outpatient visit, mod complexity' }
        ],
        confidence: 88
    };

    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">
            <main className="flex-grow pt-32 pb-24 border-b border-gray-100">
                {/* Header Section */}
                <section className="px-6 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-widest uppercase mb-8 border border-indigo-200">
                        <GraduationCap className="w-4 h-4" /> The Executive Training Framework
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                        Ascension over Automation
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
                        We don't replace your billing team. We give them an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-bold">Iron Man Suit</span>. Welcome to the Human Empowerment Hub, where your facility dictates the intelligence of the AI.
                    </p>
                </section>

                {/* ── Context: Medical Billing 101 ── */}
                <section className="max-w-5xl mx-auto px-6 mb-32">
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-rose-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
                                <AlertTriangle className="w-8 h-8 text-rose-500" />
                                The Status Quo: A Broken System
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                                The US Healthcare System runs on an esoteric, 30-year-old data format. It was designed for mainframes, not humans. This complexity leads to <span className="underline decoration-rose-400 decoration-2 underline-offset-4 text-slate-900 font-bold">massive denial rates, staff burnout, and lost revenue.</span> Here is what your human billers are fighting against every day:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                <div className="bg-white w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mb-4 border border-rose-100"><Terminal className="w-5 h-5 text-rose-500" /></div>
                                <h3 className="text-base font-bold text-slate-900 mb-2 font-mono">X12 EDI</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    The strict, unreadable file format used to transmit healthcare data. <span className="bg-rose-100 text-rose-900 font-medium px-1 rounded">Rejects instantly</span> if a single delimiter `~` is out of place.
                                </p>
                            </div>
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                <div className="bg-white w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mb-4 border border-rose-100"><Code className="w-5 h-5 text-rose-500" /></div>
                                <h3 className="text-base font-bold text-slate-900 mb-2 font-mono">ICD-10 & CPT</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    <strong className="text-slate-800">Diagnosis</strong> mapped to <strong className="text-slate-800">Treatment</strong>. Payers demand these match perfectly to establish <span className="underline decoration-rose-300 decoration-2 underline-offset-2">"medical necessity"</span>.
                                </p>
                            </div>
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                <div className="bg-white w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mb-4 border border-rose-100"><FileDigit className="w-5 h-5 text-rose-500" /></div>
                                <h3 className="text-base font-bold text-slate-900 mb-2 font-mono">837 (The Claim)</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    The X12 file sent <span className="italic">to</span> the Payer asking for money. Every single line item must represent <span className="font-medium text-slate-900">flawless codification</span> of the clinical note.
                                </p>
                            </div>
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                <div className="bg-white w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mb-4 border border-rose-100"><Receipt className="w-5 h-5 text-rose-500" /></div>
                                <h3 className="text-base font-bold text-slate-900 mb-2 font-mono">835 (The ERA)</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    The X12 file sent <span className="italic">back</span> from the Payer explaining what they paid, what they delayed, and the <span className="font-bold text-rose-600">cryptic CARC codes</span> for why they denied it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── How We Train: The 3 Levels of Ascension ── */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">The Executive Framework for Human-Led AI</h2>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                            We don't believe in "black-box" automation blindly firing off claims. We believe that <span className="underline decoration-indigo-500 decoration-4 underline-offset-4 text-slate-900 font-bold">the human provides the supervision, the strategy, and the final say.</span> You remain entirely in control. Here is how your team trains to master the engine.
                        </p>
                    </div>

                    <div className="space-y-32">

                        {/* Level 1: The Academy */}
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-5 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-700 border-emerald-200 shadow-sm">
                                    <span className="text-xs font-bold uppercase tracking-wider">Level 1: Reviewer (Academy Trainee)</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Eradicating Data Entry</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    New staff no longer waste hours typing demographic data or hunting for standard codes. They start in the <strong>Hub Academy</strong> using the <strong>DualPane Reviewer</strong>.
                                </p>
                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2"><Target className="w-5 h-5" /> The Key Takeaway for Executives</h4>
                                    <p className="text-emerald-800 font-medium">
                                        The AI takes the first pass, but <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">when the engine is unsure (sub-95% confidence), it pauses and asks the human to make the final call.</span> Every human correction trains your facility's customized model, preventing the same mistake twice.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                {/* Component Embed */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -right-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Component Demo
                                    </div>
                                    <div className="pointer-events-auto bg-white rounded-2xl overflow-hidden relative z-20 shadow-inner">
                                        <DualPaneReviewer sourceText={mockSourceText} stagedData={mockStagedData} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Level 2: The Pilot */}
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7 order-2 lg:order-1">
                                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -ml-20 -mt-20 pointer-events-none"></div>
                                    <div className="relative z-10 space-y-10">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-blue-400" /> Active Telemetry
                                            </h4>
                                            <AITrustScoreCard score={98.7} trend="up" claimsProcessed={38250} />
                                        </div>
                                        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Live Progression System</h4>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                                <LevelBadge level="pilot" className="scale-110 origin-left" />
                                                <div className="flex-1">
                                                    <XPBar currentXP={4500} nextLevelXP={5000} label="XP to Level 3 (Protocol Engineer)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-blue-500/10 text-blue-700 border-blue-200 shadow-sm">
                                    <span className="text-xs font-bold uppercase tracking-wider">Level 2: The Pilot</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trust but Verify</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    After proving consistency and earning enough XP in the Academy, users ascend to Pilots. They no longer review individual, mundane claims.
                                </p>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Target className="w-5 h-5" /> The Key Takeaway for Executives</h4>
                                    <p className="text-blue-800 font-medium">
                                        Pilots oversee the AI at a macro-level. <span className="underline decoration-blue-400 decoration-2 underline-offset-4 font-bold">They manage by exception.</span> They monitor the live Telemetry Dashboard, stepping in only to handle high-complexity edge cases, zero-day denials, and participate in Bounty Network overflow.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Level 3: Protocol Engineer */}
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-5 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-indigo-500/10 text-indigo-700 border-indigo-200 shadow-sm">
                                    <span className="text-xs font-bold uppercase tracking-wider">Level 3: Protocol Engineer</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Codifying Institutional Logic</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    The ultimate ascension. Protocol Engineers do not review claims; they build the logic governing how the AI engine executes them.
                                </p>
                                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Target className="w-5 h-5" /> The Key Takeaway for Executives</h4>
                                    <p className="text-indigo-800 font-medium">
                                        Every facility has unique payer quirks. Instead of submitting IT tickets, <span className="underline decoration-indigo-400 decoration-2 underline-offset-4 font-bold">your senior staff use this no-code builder to instantly update the AI's behavior</span>. If a payer changes a rule, your Protocol Engineers deploy a fix in 30 seconds that protects the entire facility from future denials.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                {/* Component Embed */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> Interactive Builder
                                    </div>
                                    <div className="absolute inset-x-2 inset-y-2 pointer-events-none z-20 shadow-[inset_0_0_30px_rgba(0,0,0,0.05)] rounded-2xl"></div>
                                    <LogicGateBuilder />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* The Bounty Network CTA */}
                <section className="bg-slate-950 py-24 px-6 text-white text-center rounded-3xl max-w-6xl mx-auto shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] relative overflow-hidden my-32 border border-emerald-900/50">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="w-20 h-20 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <Network className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Activate The Bounty Network</h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium leading-relaxed">
                            Turn your best billers into a scalable, gig-economy workforce. <span className="text-white font-bold underline decoration-emerald-500 decoration-4 underline-offset-4">Route high-priority denial batches into an internal marketplace</span> where your certified Pilots and Protocol Engineers can claim them for bonus compensation.
                        </p>
                        <Link href="/dashboard/hub" className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xl font-bold rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:-translate-y-1">
                            Enter the Hub Demo <ArrowRight className="w-6 h-6 ml-3" />
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}
