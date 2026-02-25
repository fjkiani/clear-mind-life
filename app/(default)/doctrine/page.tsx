import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Crosshair, TrendingDown, Scale, Target, ArrowRight, AlertTriangle, Activity, CheckCircle2, FileDigit, Server, Stethoscope, Wallet, Workflow, Smartphone, MessageSquare } from 'lucide-react'
import { Lead, Body, Highlight } from '@/components/ui/typography'
import { ExecutiveTakeaway } from '@/components/ui/takeaway'

// Simulators to use as examples for the leaks
import EligibilityChecker from '@/components/dashboard/eligibility-checker'
import EncounterSimulator from '@/components/dashboard/encounter-simulator'
import BillingSimulator from '@/components/dashboard/billing-simulator'

export const metadata: Metadata = {
    title: 'The Doctrine — Clear Mind Life',
    description: 'The Underwriters Laboratories for AI Agents. Our end-to-end doctrine for certifying and governing AI.',
}

export default function Doctrine() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">
            <main className="flex-grow pt-32 pb-24 border-b border-gray-100">

                {/* ── Header Section ── */}
                <section className="px-6 mb-20 text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-sm font-bold tracking-widest uppercase mb-8">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> The AI Orchestration Layer
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                        The Revenue Doctrine
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
                        The healthcare industry is bleeding $20B annually. <span className="underline decoration-rose-400 decoration-2 underline-offset-4 text-slate-900 font-bold">Untested AI agents will only accelerate the loss.</span> We don't replace your human staff; we deploy an Orchestration Layer to stop the bleeding and put them in command.
                    </p>
                </section>

                {/* ── The Liability Reality ── */}
                <section className="max-w-5xl mx-auto px-6 mb-32">
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-rose-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
                                <AlertTriangle className="w-8 h-8 text-rose-500" />
                                The Liability Reality
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                                Clinical directors aren't losing sleep over LLM benchmarks or EU compliance. They are terrified of two things: <span className="font-bold text-slate-900">their revenue cycle silently bleeding out from integration failures</span>, and their human staff being forcibly replaced by black-box algorithms they can't trust.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 relative z-10 mb-12">
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                                <h3 className="text-4xl font-black text-rose-500 mb-2">$20B</h3>
                                <p className="text-slate-900 font-bold mb-1">Annual Leakage</p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Lost across the industry due to eligibility blind spots, authorization timeouts, and coding drift.
                                </p>
                            </div>
                            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50 hover:bg-amber-50 transition-colors">
                                <h3 className="text-4xl font-black text-amber-500 mb-2">25%</h3>
                                <p className="text-slate-900 font-bold mb-1">Denial Rate</p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Of all claims are denied or delayed because of minor human data entry errors in the pre-visit phase.
                                </p>
                            </div>
                            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                                <h3 className="text-4xl font-black text-indigo-500 mb-2">100%</h3>
                                <p className="text-slate-900 font-bold mb-1">Human Oversight</p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    We don't replace your staff. We mandate that the human acts as the protocol engineer with final approval authority.
                                </p>
                            </div>
                        </div>

                        <ExecutiveTakeaway color="rose">
                            Stop deploying untested point solutions that threaten your staff and trap your data. Clear Mind Life provides an <Highlight color="rose">AI Orchestration Layer</Highlight> that securely intercepts the four critical failure points of your revenue cycle. High reward, zero lock-in, and total human oversight.
                        </ExecutiveTakeaway>
                    </div>
                </section>

                {/* ── The 4 Revenue Leaks (Component Driven) ── */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">The 4 Healthcare Revenue Leaks</h2>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                            The healthcare revenue cycle is bleeding. If any link in the chain breaks, the money disappears. Here is how we deploy our <span className="underline decoration-indigo-500 decoration-4 underline-offset-4 text-slate-900 font-bold">low-risk Orchestration Layer</span> across the 4 critical failure points.
                        </p>
                    </div>

                    <div className="space-y-32">

                        {/* Leak 1: Pre-Visit Check-In */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Left Side: The Leak */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-rose-500/10 text-rose-700 border-rose-200 shadow-sm">
                                    <Wallet className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 1</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pre-Visit Check-In</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Front desks waste 8+ hours a day on phone tag. 60% of claim denials are caused by simple eligibility issues before the patient even walks in.
                                </p>
                            </div>

                            {/* Right Side: The Solution & Design */}
                            <div className="space-y-8">
                                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-rose-600" /> The Orchestration Fix</h4>
                                    <p className="text-rose-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Receptionist Agent</strong> intercepts HL7 data from your existing legacy kiosks, autonomously querying Availity for real-time X12 270/271 eligibility. <span className="underline decoration-rose-400 decoration-2 underline-offset-4 font-bold">No need to rip out your hardware. High reward, zero lock-in.</span>
                                    </p>
                                </div>

                                {/* Component Embed */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -right-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div> Eligibility Sim
                                    </div>
                                    <div className="pointer-events-auto bg-white rounded-2xl overflow-hidden relative z-20 shadow-inner">
                                        <EligibilityChecker />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 2: During Visit */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Left Side: The Leak */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-indigo-500/10 text-indigo-700 border-indigo-200 shadow-sm">
                                    <Stethoscope className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 2</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">During Visit</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Providers spend 2 hours a day on documentation. They deliberately under-code complex visits just to finish their shift, leaving $50K+ on the table annually per provider.
                                </p>
                            </div>

                            {/* Right Side: The Solution & Design */}
                            <div className="space-y-8">
                                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-indigo-600" /> The Orchestration Fix</h4>
                                    <p className="text-indigo-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Encounter Agent</strong> listens ambiently, generating structured SOAP notes and precise ICD-10/CPT codes. <span className="underline decoration-indigo-400 decoration-2 underline-offset-4 font-bold">The provider simply taps "Approve"</span> and the structured FHIR payload maps directly back into Epic or Cerner.
                                    </p>
                                </div>

                                {/* Component Embed */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -left-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div> Live Ambient Dictation
                                    </div>
                                    <div className="pointer-events-auto bg-white rounded-2xl overflow-hidden relative z-20 shadow-inner">
                                        <EncounterSimulator />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 3: Post-Visit Claims */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Left Side: The Leak */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-700 border-emerald-200 shadow-sm">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 3</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Post-Visit Claims</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Claims sit in a 45-day A/R void. 15-25% are denied for minor missing modifiers. Billers drown in a backlog of manual recoding and resubmissions.
                                </p>
                            </div>

                            {/* Right Side: The Solution & Design */}
                            <div className="space-y-8">
                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-emerald-600" /> The Orchestration Fix</h4>
                                    <p className="text-emerald-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Billing Agent</strong> scrubs the 837 claim against millions of payer-specific edit rules <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">*before* it hits the clearinghouse</span>, automatically applying modifiers to yield a 99% clean claim rate.
                                    </p>
                                </div>

                                {/* Component Embed */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -right-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Code Scrubbing Engine
                                    </div>
                                    <div className="pointer-events-auto bg-white rounded-2xl overflow-hidden relative z-20 shadow-inner">
                                        <BillingSimulator />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 4: Patient Collections */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Left Side: The Leak */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-amber-500/10 text-amber-700 border-amber-200 shadow-sm">
                                    <FileDigit className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 4</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Patient Collections</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Patients abandon care and ignore bills because they receive confusing statements six weeks after the visit. Practices collect pennies on the dollar via collections agencies.
                                </p>
                            </div>

                            {/* Right Side: The Solution & Design */}
                            <div className="space-y-8">
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-amber-600" /> The Orchestration Fix</h4>
                                    <p className="text-amber-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Patient Financial Agent</strong> translates complex EOBs into plain-language text messages. <span className="underline decoration-amber-400 decoration-2 underline-offset-4 font-bold">It delivers exact cost breakdowns and one-tap payment links</span> the moment the claim clears, increasing collection rates by 300%.
                                    </p>
                                </div>

                                {/* Visual Mock for Collections */}
                                <div className="p-2 bg-slate-200 rounded-3xl border border-slate-300 shadow-2xl relative">
                                    <div className="absolute -top-4 -left-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2 z-30">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> Financial Agent SMS
                                    </div>
                                    <div className="pointer-events-auto bg-white rounded-2xl overflow-hidden relative z-20 shadow-inner flex items-center justify-center min-h-[400px]">

                                        <div className="w-[320px] bg-slate-50 border-8 border-slate-900 rounded-[40px] shadow-2xl overflow-hidden relative my-8">
                                            {/* Phone Notch */}
                                            <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-2xl mx-16 z-20 shadow-md"></div>

                                            <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between pt-8 sticky top-0 z-10 backdrop-blur-md bg-white/80">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                                                        <Activity className="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-900">Clear Mind Billing</p>
                                                        <p className="text-[10px] text-slate-500">Automated Assistant</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 space-y-4 min-h-[300px] flex flex-col justify-end">
                                                <div className="bg-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-sm text-sm self-start max-w-[85%] shadow-sm leading-relaxed">
                                                    Hi Sarah, your recent EOB from Aetna just cleared for your 10/24 visit with Dr. Smith.
                                                </div>
                                                <div className="bg-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-sm text-sm self-start max-w-[85%] shadow-sm leading-relaxed">
                                                    Total billed: $350.00
                                                    <br />Insurance covered: $280.00
                                                    <br /><strong>Your copay balance: $70.00</strong>
                                                </div>
                                                <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm self-end max-w-[85%] shadow-sm leading-relaxed border border-indigo-700">
                                                    Tap here to pay with Apple Pay instantly: <u>cm.life/pay/892x</u>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <div className="max-w-4xl mx-auto px-6 mb-24">
                    <ExecutiveTakeaway color="emerald">
                        We don't sell another point solution that traps your data. Clear Mind Life operates as a <Highlight color="emerald">universal orchestration layer</Highlight>, wrapping your existing EHR and hardware in an autonomous safety net that guarantees payment.
                    </ExecutiveTakeaway>
                </div>

                {/* ── CTA Section ── */}
                <section className="py-20 px-6 bg-slate-950 text-center border-t border-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Stop the Bleeding</h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
                            Don't wait for your revenue cycle to collapse under the weight of untested AI. Deploy the Orchestration Layer and empower your staff today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/platform" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]">
                                See the Platform in Action <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}
