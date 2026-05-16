import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GraduationCap, CheckCircle2, AlertTriangle, TrendingUp, Users, Star, Zap } from 'lucide-react';
import LevelBadge from '@/components/hub/level-badge';
import XPBar from '@/components/hub/xp-bar';
import AITrustScoreCard from '@/components/hub/trust-score-card';
import DualPaneReviewer from '@/components/hub/dual-pane-reviewer';
import LogicGateBuilder from '@/components/hub/logic-gate-builder';

export const metadata: Metadata = {
    title: 'Train Your Team — Clear Mind Life',
    description: 'Your billing staff already know the rules. We give them the tools to enforce them at scale.',
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
            <main className="flex-grow pt-32 pb-24">

                {/* Header */}
                <section className="px-6 mb-20 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-widest uppercase mb-8 border border-indigo-200">
                        <GraduationCap className="w-4 h-4" /> Team Training
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Your billers know the rules. Now they can enforce them.
                    </h1>
                    <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        We don't replace your billing team. We give them a system that handles the volume so they can focus on the exceptions — the complex denials, the edge cases, the decisions that actually require human judgment.
                    </p>
                </section>

                {/* The problem with the status quo */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-rose-100 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-rose-500" />
                            What your billing team is up against
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { code: 'X12 EDI', desc: 'The file format payers require. One wrong delimiter and the claim rejects instantly — no explanation.' },
                                { code: 'ICD-10 + CPT', desc: 'Diagnosis must match treatment. Payers deny claims where the codes don\'t establish medical necessity.' },
                                { code: '837 Claim', desc: 'The file sent to the payer. Every line item must match the clinical note exactly.' },
                                { code: 'NCCI Edits', desc: '2.38 million rules about which procedure codes can be billed together. Updated quarterly.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                                    <div className="font-mono text-sm font-black text-rose-700 mb-2">{item.code}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-sm text-slate-600 font-medium">
                                <span className="font-bold text-slate-900">The result:</span> Experienced billers spend 60-70% of their time on routine claim submission — work that follows predictable rules. That leaves 30% for the complex cases that actually need their expertise.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How the training system works */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">How the training system works</h2>
                    <p className="text-slate-600 font-medium mb-10 max-w-2xl">
                        Staff learn by reviewing AI-generated claims — approving correct ones, catching errors, and flagging edge cases. Every review builds their profile and improves the AI's accuracy for your practice.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                icon: <Star className="w-5 h-5 text-indigo-600" />,
                                title: 'Academy',
                                desc: 'New staff review straightforward claims. Learn the coding rules by seeing them applied in real cases.',
                                badge: 'Starting level',
                                color: 'indigo',
                            },
                            {
                                icon: <Zap className="w-5 h-5 text-violet-600" />,
                                title: 'Pilot',
                                desc: 'Experienced billers handle complex cases — multi-payer claims, modifier disputes, prior auth appeals.',
                                badge: 'After 50 reviews',
                                color: 'violet',
                            },
                            {
                                icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
                                title: 'Protocol Engineer',
                                desc: 'Senior staff configure the rules the AI follows for your practice — payer-specific edits, specialty coding preferences.',
                                badge: 'After 200 reviews',
                                color: 'emerald',
                            },
                        ].map((tier, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                                    {tier.icon}
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{tier.badge}</div>
                                <h3 className="text-lg font-black text-slate-900 mb-2">{tier.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{tier.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Live components */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">Claim Review Interface</h3>
                            <p className="text-sm text-slate-500 mb-4">Review AI-generated codes against the clinical note. Approve, edit, or flag for escalation.</p>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <DualPaneReviewer sourceText={mockSourceText} stagedData={mockStagedData} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">Logic Gate Builder</h3>
                            <p className="text-sm text-slate-500 mb-4">Protocol Engineers configure payer-specific rules. When CPT X is billed with CPT Y, require modifier Z.</p>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <LogicGateBuilder />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Overflow task marketplace */}
                <section className="bg-slate-900 py-20 px-6 text-white rounded-3xl max-w-5xl mx-auto mb-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Users className="w-3.5 h-3.5" /> Expert Task Network
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">High-complexity cases, routed to your best people</h2>
                        <p className="text-lg text-slate-300 mb-8 font-medium leading-relaxed">
                            When a claim is too complex for the AI to handle with confidence, it goes into a task queue. Your Protocol Engineers pick it up, resolve it, and earn bonus compensation. The AI learns from the resolution.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
                            {[
                                { v: '< 4 hrs', l: 'Avg resolution time' },
                                { v: '94%', l: 'First-pass approval rate' },
                                { v: '$45–$120', l: 'Per complex case resolved' },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/10">
                                    <div className="text-2xl font-black text-emerald-400">{s.v}</div>
                                    <div className="text-xs text-slate-400 font-medium mt-1">{s.l}</div>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/hub" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg">
                            Open the Task Hub <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Progress tracking */}
                <section className="max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Track your team's progress</h2>
                    <p className="text-slate-600 font-medium mb-8">Every review is logged. Managers see accuracy rates, review volume, and which staff are ready to advance.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <LevelBadge level="Pilot" xp={1240} />
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <XPBar current={1240} next={2000} label="Pilot → Protocol Engineer" />
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <AITrustScoreCard score={87} trend={+4} />
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
