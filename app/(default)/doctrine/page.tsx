import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, TrendingDown, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Our Approach — Clear Mind Life',
    description: 'Why we built an autonomous RCM engine instead of another billing tool.',
}

export default function Doctrine() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-white">
            <main className="flex-grow pt-32 pb-24">

                {/* Header */}
                <section className="px-6 mb-20 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-sm font-bold tracking-widest uppercase mb-8">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Our Approach
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Stop chasing denials. Stop them from happening.
                    </h1>
                    <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Every billing tool on the market helps you recover denied claims. We built something different: a system that scrubs claims before submission so most denials never happen.
                    </p>
                </section>

                {/* The Problem */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="bg-rose-50 rounded-3xl p-8 md:p-12 border border-rose-100">
                        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-rose-500" />
                            The numbers your billing team lives with
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { stat: '$20B', label: 'Lost annually', desc: 'Across the US healthcare system from preventable claim denials and administrative waste.' },
                                { stat: '25%', label: 'Average denial rate', desc: 'One in four claims is denied on first submission. Most are denied for fixable reasons.' },
                                { stat: '$118', label: 'Cost to appeal', desc: 'The average cost to work a single denied claim — before accounting for the 90-day cash flow hit.' },
                            ].map((s, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm">
                                    <div className="text-4xl font-black text-rose-500 mb-2">{s.stat}</div>
                                    <div className="text-base font-bold text-slate-900 mb-2">{s.label}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why reactive tools fail */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Why reactive tools don't fix this</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'They wait for the denial',
                                desc: 'Most "AI billing" tools are denial management tools. They help you appeal after the payer says no. You still lose 90 days of cash flow and pay $118 per appeal.',
                            },
                            {
                                title: 'They don\'t know the rules',
                                desc: 'CMS publishes 2.38 million NCCI edit pairs. Most billing software checks a fraction of them. We loaded all of them.',
                            },
                            {
                                title: 'They require manual input',
                                desc: 'If a biller has to enter the claim data, a biller can make a mistake. Our agents pull directly from the SOAP note — no re-keying.',
                            },
                            {
                                title: 'They don\'t connect the workflow',
                                desc: 'Eligibility, documentation, and billing are three separate systems. Errors fall through the gaps. We connect all three.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-rose-600 text-xs font-black">✕</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What we built instead */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
                        <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            What we built instead
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            {[
                                {
                                    step: '1',
                                    title: 'Pre-visit eligibility',
                                    desc: 'X12 270/271 runs the moment an appointment is booked. Copay, deductible, prior auth status — all confirmed before the patient arrives.',
                                },
                                {
                                    step: '2',
                                    title: 'Real-time documentation',
                                    desc: 'Ambient transcription during the session. SOAP note generated automatically. ICD-10 codes suggested from the clinical content — not guessed.',
                                },
                                {
                                    step: '3',
                                    title: 'Pre-submission scrubbing',
                                    desc: 'Every claim runs through 2.38M NCCI edit pairs before the 837 file is generated. Modifier conflicts caught. Bundling errors fixed. Clean claim goes out.',
                                },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-sm mb-4">{s.step}</div>
                                    <h3 className="font-bold text-white mb-2">{s.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-8">
                            <p className="text-slate-300 font-medium mb-2">The result for Dr. Sarah Chen's 5-provider NYC mental health practice:</p>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { before: '20%', after: '<5%', label: 'Denial rate' },
                                    { before: '$22', after: '$4.50', label: 'Cost to collect' },
                                    { before: '2h/day', after: '18 min', label: 'Admin time per provider' },
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-slate-500 line-through text-sm font-mono">{m.before}</span>
                                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                                        <span className="text-emerald-400 font-black font-mono">{m.after}</span>
                                        <span className="text-slate-400 text-sm">{m.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* HIPAA */}
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Built for HIPAA from the start</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: 'PHI never touches the LLM', desc: 'Audio streams are transcribed and immediately discarded. The LLM receives de-identified clinical text, not raw patient data.' },
                            { title: 'Zero-retention audio pipeline', desc: 'AssemblyAI processes audio under a BAA with zero-retention policy. Nothing is stored after transcription completes.' },
                            { title: 'AES-256 at rest, TLS 1.3 in transit', desc: 'All patient data encrypted at rest and in transit. No exceptions.' },
                            { title: 'Immutable audit logs', desc: 'Every agent action is logged with timestamp, user, and outcome. Required for HIPAA compliance and available for your compliance team.' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">See the agents in action</h2>
                    <p className="text-slate-500 font-medium mb-8">The dashboard is live. No signup required to explore the demo.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors">
                            Open Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/platform" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-colors">
                            How the Platform Works
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    )
}
