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
                <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">The 4 Healthcare Revenue Leaks</h2>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                            The healthcare revenue cycle is bleeding. If any link in the chain breaks, the money disappears. Here is how we deploy our <span className="underline decoration-indigo-500 decoration-4 underline-offset-4 text-slate-900 font-bold">low-risk Orchestration Layer</span> across the 4 critical failure points.
                        </p>
                    </div>

                    <div className="space-y-16 lg:space-y-24">

                        {/* Leak 1: Pre-Visit Check-In */}
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 pb-16 border-b border-gray-100 relative">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-rose-500/10 text-rose-700 border-rose-200 shadow-sm">
                                    <Wallet className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 1</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pre-Visit Check-In</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Front desks waste 8+ hours a day on phone tag. 60% of claim denials are caused by simple eligibility issues before the patient even walks in.
                                </p>
                                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-rose-600" /> The Orchestration Fix</h4>
                                    <p className="text-rose-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Receptionist Agent</strong> intercepts HL7 data from your existing legacy kiosks, autonomously querying Availity for real-time X12 270/271 eligibility. <span className="underline decoration-rose-400 decoration-2 underline-offset-4 font-bold">No need to rip out your hardware. High reward, zero lock-in.</span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-8 relative overflow-hidden group h-full flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                            Terminal Mode
                                        </span>
                                    </div>
                                    <div className="font-mono text-sm text-gray-400 mt-6 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <p className="text-violet-400 font-bold">$ RUN X12_270_ELIGIBILITY_REQUEST</p>
                                        <p className="text-gray-500 truncate">ISA*00*          *00*          *ZZ*AV09311993     *ZZ*PAYERID        *260224*1435*^*00501*000000001*0*P*:</p>
                                        <p className="text-gray-500 truncate">GS*HS*AV09311993*PAYERID*20260224*1435*1*X*005010X279A1</p>
                                        <p className="text-gray-500 mt-4">... AWAITING 271 RESPONSE ...</p>
                                        <p className="text-emerald-400 font-bold">$ PATIENT_COVERAGE_VERIFIED : TRUE</p>
                                        <p className="text-emerald-400 font-bold">$ COPAY_CALCULATED : $25.00</p>
                                    </div>
                                    <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm relative z-10 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black">S.J.</div>
                                                <div>
                                                    <p className="font-bold text-white">Sarah Johnson</p>
                                                    <p className="text-sm text-gray-400">BlueCross BlueShield #A12B34</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Active Coverage</span>
                                        </div>
                                        <div className="bg-gray-900/50 rounded-lg p-4 flex justify-between items-center border border-gray-700">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Amount Due Today</span>
                                            <span className="text-2xl font-black text-white">$25.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 2: During Visit */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 pb-16 border-b border-gray-100 relative">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-indigo-500/10 text-indigo-700 border-indigo-200 shadow-sm">
                                    <Stethoscope className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 2</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">During Visit</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Providers spend 2 hours a day on documentation. They deliberately under-code complex visits just to finish their shift, leaving $50K+ on the table annually per provider.
                                </p>
                                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-indigo-600" /> The Orchestration Fix</h4>
                                    <p className="text-indigo-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Encounter Agent</strong> listens ambiently, generating structured SOAP notes and precise ICD-10/CPT codes. <span className="underline decoration-indigo-400 decoration-2 underline-offset-4 font-bold">The provider simply taps &quot;Approve&quot;</span> and the structured FHIR payload maps directly back into Epic or Cerner.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-8 relative overflow-hidden group h-full flex flex-col justify-center">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                                    <div className="mb-6 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                                            <span className="text-white text-sm font-bold">Telehealth Transcript: Live</span>
                                        </div>
                                        <span className="text-gray-400 text-xs font-mono">ASSEMBLY_AI :: ACTIVE</span>
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
                                        <div className="flex gap-2 mb-4">
                                            <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs font-mono font-bold border border-gray-600">ICD-10: M54.41 (Sciatica)</span>
                                            <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs font-mono font-bold border border-gray-600">CPT: 99213</span>
                                        </div>
                                        <button className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                                            One-Tap Approve to EHR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 3: Post-Visit Claims */}
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 pb-16 border-b border-gray-100 relative">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-700 border-emerald-200 shadow-sm">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 3</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Post-Visit Claims</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Claims sit in a 45-day A/R void. 15-25% are denied for minor missing modifiers. Billers drown in a backlog of manual recoding and resubmissions.
                                </p>
                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-emerald-600" /> The Orchestration Fix</h4>
                                    <p className="text-emerald-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Billing Agent</strong> scrubs the 837 claim against millions of payer-specific edit rules <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">*before* it hits the clearinghouse</span>, automatically applying modifiers to yield a 99% clean claim rate.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-8 relative overflow-hidden group h-full flex flex-col justify-center">
                                    <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                                        <h4 className="font-black text-white tracking-wider uppercase text-sm">Claims Scrubbing Queue</h4>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">22 Ready</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm flex items-center justify-between transition-all hover:border-gray-600 cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-10 rounded-full bg-emerald-500"></div>
                                                <div>
                                                    <p className="font-bold text-white">Claim #837-A91B</p>
                                                    <p className="text-xs text-emerald-400 font-bold mt-1">98% First-Pass Confidence</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg transition-colors">Submit</button>
                                        </div>

                                        <div className="bg-gray-800 rounded-xl p-4 border border-rose-500/30 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-x-0 top-0 h-1 bg-rose-500"></div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                                                        <span className="text-rose-400 text-lg font-black">!</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white">Claim #837-C42X</p>
                                                        <p className="text-xs text-rose-400 font-bold mt-1">Denial Predicted (UHC Rules)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-rose-500/10 rounded-lg p-3 border border-rose-500/20 mb-3">
                                                <code className="text-[10px] text-rose-300 font-mono">ERROR: CPT 99214 requires modifier -25 when billed with procedure 20610.</code>
                                            </div>
                                            <button className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">Auto-Fix & Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leak 4: Patient Collections */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 pb-16 relative">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-amber-500/10 text-amber-700 border-amber-200 shadow-sm">
                                    <FileDigit className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Leak Point 4</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Patient Collections</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Patients abandon care and ignore bills because they receive confusing statements six weeks after the visit. Practices collect pennies on the dollar via collections agencies.
                                </p>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2 relative z-10"><Target className="w-5 h-5 text-amber-600" /> The Orchestration Fix</h4>
                                    <p className="text-amber-800 font-medium relative z-10 leading-relaxed">
                                        The <strong>Patient Financial Agent</strong> translates complex EOBs into plain-language text messages. <span className="underline decoration-amber-400 decoration-2 underline-offset-4 font-bold">It delivers exact cost breakdowns and one-tap payment links</span> the moment the claim clears, increasing collection rates by 300%.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
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
