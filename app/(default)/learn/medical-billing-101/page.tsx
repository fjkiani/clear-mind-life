import { Metadata } from 'next'
import Link from 'next/link'
import { Terminal, Network, Code, FileDigit, Receipt, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Medical Billing 101 — The Money Flow',
    description: 'Understand the esoteric infrastructure of US Healthcare Billing and how Clear Mind Life automates it.',
}

export default function MedicalBilling101() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">

            <main className="flex-grow pt-32 pb-24 border-b border-gray-100">

                {/* Header Section */}
                <section className="px-6 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-widest uppercase mb-8 border border-blue-200">
                        <Network className="w-4 h-4" /> Engineering Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter">
                        Medical Billing 101
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
                        The US Healthcare System runs on an esoteric, 30-year-old data format called X12. If you don't speak it natively, <span className="text-rose-600 font-bold">you don't get paid.</span> Here is how the money flows.
                    </p>
                </section>

                {/* Technical Data Dictionary */}
                <section className="max-w-5xl mx-auto px-6 mb-24">
                    <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Key Terms Every Developer Must Know</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Terminal className="w-5 h-5 text-emerald-400" /></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-mono">X12 EDI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Electronic Data Interchange. The strict, unreadable file format used to transmit healthcare data. Rejects instantly if a single delimiter `~` is out of place.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Code className="w-5 h-5 text-emerald-400" /></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-mono">ICD-10 & CPT</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                <strong className="text-gray-900">ICD-10</strong> is the Diagnosis (e.g., J01.90 for Acute Sinusitis). <br /><strong className="text-gray-900">CPT</strong> is the Treatment (e.g., 99213 for a Level 3 Exam). Payers demand these match perfectly to establish "medical necessity".
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Network className="w-5 h-5 text-emerald-400" /></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-mono">Clearinghouse</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The massive API relay networks (like Availity or Change Healthcare) that sit between EHRs and Payers. They act as automated toll-booths checking X12 syntax.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><FileDigit className="w-5 h-5 text-emerald-400" /></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-mono">837 (The Claim)</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The X12 file sent <span className="italic font-medium">to</span> the Payer asking for money. Contains patient demographics, provider NPIs, and the ICD/CPT code pairings.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Receipt className="w-5 h-5 text-emerald-400" /></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-mono">835 (The ERA)</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Electronic Remittance Advice. The X12 file sent <span className="italic font-medium">back</span> from the Payer explaining exactly what they paid, what they denied, and why.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-center items-center text-center shadow-inner">
                            <p className="text-slate-500 font-medium text-sm">Clear Mind Life Agents speak all of these natively.</p>
                        </div>
                    </div>
                </section>

                {/* The Money Flow Timeline */}
                <section className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">The Architecture of a Claim</h2>

                    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-12 space-y-12 pb-8">

                        {/* Step 1 */}
                        <div className="relative pl-8 md:pl-16">
                            <div className="absolute -left-3 top-1 bg-white border-2 border-slate-300 w-6 h-6 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                            </div>
                            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative">
                                <span className="absolute -top-3 left-6 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">X12 270 / 271</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2">1. Eligibility Verification</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Before the visit, an <span className="bg-blue-50 text-blue-700 px-1 font-mono text-sm rounded">X12 270</span> inquiry is fired to check if the patient is actually covered. The Payer fires back an <span className="bg-blue-50 text-blue-700 px-1 font-mono text-sm rounded">X12 271</span> response detailing exact copays and deductibles.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-8 md:pl-16">
                            <div className="absolute -left-3 top-1 bg-white border-2 border-indigo-300 w-6 h-6 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            </div>
                            <div className="bg-indigo-50 p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-sm relative">
                                <h3 className="text-xl font-bold text-indigo-900 mb-3">2. Generating the 837 Claim</h3>
                                <p className="text-indigo-800 leading-relaxed font-medium">
                                    The doctor types notes into the EHR. A medical coder translates that English text into CPT/ICD-10 jargon. That jargon is packed into an <span className="bg-white text-indigo-900 px-1 font-mono text-sm shadow-sm rounded">837</span> payload and transmitted to the clearinghouse.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-8 md:pl-16">
                            <div className="absolute -left-3 top-1 bg-white border-2 border-rose-300 w-6 h-6 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            </div>
                            <div className="bg-white p-6 md:p-8 rounded-2xl border border-rose-100 shadow-sm relative">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">3. The Black Box Adjudication</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    The Payer receives the 837. Their internal risk-engines scrub it. If they find a single excuse (e.g., asthma medication given but no asthma diagnosis code), <span className="bg-rose-100 text-rose-800 px-1 font-bold rounded">they flag it as Denied.</span>
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative pl-8 md:pl-16">
                            <div className="absolute -left-3 top-1 bg-white border-2 border-emerald-300 w-6 h-6 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            </div>
                            <div className="bg-emerald-50 p-6 md:p-8 rounded-2xl border border-emerald-100 shadow-sm relative">
                                <span className="absolute -top-3 left-6 bg-emerald-700 text-white text-xs font-bold px-2 py-1 rounded">X12 835 ERA</span>
                                <h3 className="text-xl font-bold text-emerald-900 mb-3 mt-2">4. The Final Accounting</h3>
                                <p className="text-emerald-800 leading-relaxed font-medium">
                                    The Payer generates an <span className="bg-white text-emerald-900 px-1 font-mono text-sm border border-emerald-200 rounded">835 ERA</span> detailing the cash they are depositing into the clinic's bank account, minus the denials. The remaining uncovered balance is legally transferred to the patient to pay.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            {/* ── Conversion CTA ── */}
            <section className="py-20 px-6 bg-white text-center border-t border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">Now Watch an AI Do All of This</h2>
                    <p className="text-lg text-gray-600 font-medium mb-10 leading-relaxed">
                        Every step you just read — the 270, the 837, the 835 — is handled autonomously by our agents. See the live demo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                            View the Interactive Demo <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
