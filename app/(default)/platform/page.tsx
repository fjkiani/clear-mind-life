import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, AlertTriangle, DollarSign, Users, Stethoscope } from 'lucide-react'
import EligibilityChecker from '@/components/dashboard/eligibility-checker'
import EncounterSimulator from '@/components/dashboard/encounter-simulator'
import BillingSimulator from '@/components/dashboard/billing-simulator'

export const metadata: Metadata = {
    title: 'Platform — Clear Mind Life',
    description: 'Three AI agents that handle eligibility, documentation, and claims — so your team handles patients.',
}

const AGENTS = [
    {
        number: '01',
        name: 'Receptionist Agent',
        tagline: 'Insurance verified before the patient arrives.',
        problem: 'Front desk staff spend 20 minutes per patient calling payers to verify coverage. Half the time the information is wrong by the time the patient shows up.',
        solution: 'The moment an appointment is booked, we send an X12 270 eligibility request to the clearinghouse. The X12 271 response comes back in seconds — copay, deductible status, network tier, prior auth requirements. All of it, automatically.',
        outcomes: [
            '5 of 8 patients verified before 8 AM',
            'Copay collected at booking, not at checkout',
            'Prior auth flags surface 48 hours before the visit',
        ],
        color: 'sky',
        component: <EligibilityChecker />,
    },
    {
        number: '02',
        name: 'Encounter Agent',
        tagline: 'SOAP note done before the session ends.',
        problem: 'Providers spend 2 hours charting for every hour of patient care. That\'s not a productivity problem — it\'s a system design problem.',
        solution: 'Ambient transcription runs during the session. Speaker diarization separates provider from patient. When the session ends, a structured SOAP note is waiting for one-click approval — with ICD-10 codes already suggested.',
        outcomes: [
            'Average chart review: 3 minutes',
            'ICD-10 accuracy: 93%+ on mental health codes',
            'Zero PHI stored in the transcription pipeline',
        ],
        color: 'indigo',
        component: <EncounterSimulator />,
    },
    {
        number: '03',
        name: 'Billing Agent',
        tagline: 'Claims scrubbed against 2.38M payer rules before submission.',
        problem: 'The average claim denial costs $118 to appeal and takes 90 days. Most denials are preventable — wrong modifier, bundling conflict, missing auth.',
        solution: 'Every claim runs through our NCCI PTP database (2,387,727 edit pairs) before the 837 file is generated. Modifier conflicts are flagged and auto-corrected. The claim that goes out is clean.',
        outcomes: [
            '$47,200 recovered in month one for a 5-provider practice',
            'Denial rate: 20% → under 5%',
            'Cost to collect: $22 → $4.50',
        ],
        color: 'rose',
        component: <BillingSimulator />,
    },
]

const colorMap: Record<string, { badge: string; border: string; dot: string }> = {
    sky: { badge: 'bg-sky-100 text-sky-700 border-sky-200', border: 'border-sky-200', dot: 'bg-sky-500' },
    indigo: { badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', border: 'border-indigo-200', dot: 'bg-indigo-500' },
    rose: { badge: 'bg-rose-100 text-rose-700 border-rose-200', border: 'border-rose-200', dot: 'bg-rose-500' },
}

export default function Platform() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-white">
            <main className="flex-grow pt-32 pb-24">

                {/* Header */}
                <section className="px-6 mb-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-6 border border-slate-200 uppercase tracking-widest">
                            How It Works
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Three agents. One revenue cycle.</h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            Eligibility before the visit. Documentation during. Claims scrubbed after. Each agent hands off to the next — no gaps, no manual steps.
                        </p>
                    </div>
                </section>

                {/* Agents */}
                {AGENTS.map((agent, i) => {
                    const c = colorMap[agent.color]
                    return (
                        <section key={agent.number} className={`py-20 border-t border-gray-100 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'} overflow-hidden`}>
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="grid lg:grid-cols-2 gap-16 items-start">
                                    {/* Left: copy */}
                                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{agent.number}</span>
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge}`}>{agent.name}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">{agent.tagline}</h2>

                                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl">
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                                <p className="text-sm text-rose-800 font-medium leading-relaxed">{agent.problem}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 font-medium leading-relaxed mb-8">{agent.solution}</p>

                                        <ul className="space-y-3">
                                            {agent.outcomes.map((o, j) => (
                                                <li key={j} className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <span className="text-sm font-semibold text-gray-700">{o}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Right: live component */}
                                    <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} bg-slate-100 rounded-3xl p-4 border border-slate-200 shadow-inner relative`}>
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-slate-700 text-[10px] font-black px-3 py-1.5 rounded-full shadow border border-slate-200 uppercase tracking-widest flex items-center gap-1.5 z-10">
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`}></span>
                                            Live Demo
                                        </div>
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                                            {agent.component}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">See it with your practice's data</h2>
                        <p className="text-gray-500 font-medium mb-8">The demo above uses Dr. Sarah Chen's NYC mental health practice. Book a call and we'll run it with yours.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors shadow-sm">
                                Open Live Dashboard <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/compare" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-colors shadow-sm">
                                Compare vs. Legacy Systems
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}
