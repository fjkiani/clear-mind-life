"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Anchor, ShieldCheck, ArrowRight, Check, Activity, Search, Command, ArrowDownRight, Zap, Server, BrainCircuit, ActivitySquare, AlertCircle, FileText, TrendingDown, TriangleAlert } from 'lucide-react'
import Link from 'next/link'

// The Clear Mind Way
import EligibilityChecker from '@/components/dashboard/eligibility-checker'
import EncounterSimulator from '@/components/dashboard/encounter-simulator'
import BillingSimulator from '@/components/dashboard/billing-simulator'

// The Legacy Way
import LegacyIntakeSimulator from '@/components/compare/legacy/legacy-intake'
import LegacyScribeSimulator from '@/components/compare/legacy/legacy-scribe'
import LegacyRcmSimulator from '@/components/compare/legacy/legacy-rcm'

import BenchmarkPanel, { BenchmarkData } from '@/components/compare/benchmark-panel'
import HeadToHead from '@/components/compare/head-to-head'
import BenchmarkMoat from '@/components/compare/benchmark-moat'
import Footer from '@/components/ui/footer'
import { Lead, Highlight } from '@/components/ui/typography'
import { ExecutiveTakeaway } from '@/components/ui/takeaway'

type Vendor = {
    id: string
    name: string
    category: string
    icon: any
    benchmark: BenchmarkData
    trap: string
    collateralDamage: string[]
    legacyComponent: React.ReactNode
    solutionTitle: string
    component: React.ReactNode
}

const vendors: Vendor[] = [
    {
        id: 'intake',
        name: 'Patient Intake',
        category: 'Legacy Kiosks & Portals',
        icon: FileText,
        legacyComponent: <LegacyIntakeSimulator />,
        benchmark: {
            legacyTime: "15-20 Min/Pat",
            clearMindTime: "Instant (Pre-Arrival)",
            humanImpactTitle: "Re-humanizing the Reception",
            humanImpactDesc: "By automating X12 270 queries ahead of time, your staff is freed from navigating 5 different payer portals, allowing them to focus entirely on greeting the patient."
        },
        trap: 'The physical lock-in is severe. Kiosks are bolted to desks and custom forms take months to rebuild. Clear Mind bypasses this by intercepting HL7 payloads from your existing kiosks—no rip-and-replace required.',
        collateralDamage: [
            "Exorbitant monthly licensing fees for bolted-down hardware.",
            "12% average claim denial rate from unverified eligibility.",
            "Patient frustration with redundant clipboards & PDFs."
        ],
        solutionTitle: 'The Clear Mind Receptionist',
        component: <div className="scale-90 origin-top -m-8"><EligibilityChecker /></div>
    },
    {
        id: 'clinical',
        name: 'Clinical Documentation',
        category: 'Scribes & Basic AI',
        icon: Activity,
        legacyComponent: <LegacyScribeSimulator />,
        benchmark: {
            legacyTime: "2-3 Hrs/Day",
            clearMindTime: "0 Clicks",
            humanImpactTitle: "Returning the Provider's Time",
            humanImpactDesc: "The Encounter Agent generates structured, highly accurate SOAP notes instantly, allowing the physician to turn away from the screen and actually look at the patient."
        },
        trap: 'A direct productivity crutch. Doctors are drowning in charting; removing their scribe without a native replacement causes an immediate dive in RVUs. Contracts are multi-year traps.',
        collateralDamage: [
            "2+ hours of evening 'pajama time' for providers.",
            "Up to 30% under-coding (lost revenue) from incomplete notes.",
            "Multi-year, unbreakable scribe agency contracts."
        ],
        solutionTitle: 'The Clear Mind Encounter Agent',
        component: <div className="scale-[0.85] origin-top -m-12"><EncounterSimulator /></div>
    },
    {
        id: 'rcm',
        name: 'Revenue Cycle Management',
        category: 'Rules Engines & Agencies',
        icon: TrendingDown,
        legacyComponent: <LegacyRcmSimulator />,
        benchmark: {
            legacyTime: "30-45 Days Avg",
            clearMindTime: "0 Days (Prevented)",
            humanImpactTitle: "Empowering the Billing Team",
            humanImpactDesc: "Instead of wasting billers on tedious scrubbing and manual LCD cross-referencing, the AI prevents the denial upstream, allowing your experts to focus on strategy."
        },
        trap: 'RCM is life-or-death. Switching vendors risks 3–6 months of disrupted cash flow and brutal data migration. They extract a constant toll (often 6%) because leaving hurts more.',
        collateralDamage: [
            "30 to 45 days in A/R ballooning due to exception queues.",
            "6% take-rate extracted constantly by RCM agencies.",
            "Cash flow volatility and unpredictable practice revenue."
        ],
        solutionTitle: 'The Clear Mind Billing Agent',
        component: <div className="scale-90 origin-top -m-8"><BillingSimulator /></div>
    }
]

export default function ComparePage() {
    const [activeId, setActiveId] = useState(vendors[0].id)
    const activeVendor = vendors.find(v => v.id === activeId)!

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-inter selection:bg-indigo-500/20">

            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-black text-xl tracking-tight flex items-center gap-2 group">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-inner">
                            <span className="w-2 h-2 rounded-full bg-white group-hover:animate-ping shadow-sm"></span>
                        </span>
                        <span className="text-gray-900">Clear Mind <span className="text-gray-400 font-medium">| VS</span></span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            Command Center
                        </Link>
                        <Link href="/signup" className="text-sm font-bold text-white bg-gray-900 hover:bg-black px-4 py-2 rounded-lg transition-all shadow-sm">
                            Request Demo
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto px-6 py-16">

                {/* Header */}
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
                        <Search className="w-4 h-4" />
                        Analyzing The Architecture
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-gray-900">
                        The era of manual <br className="hidden md:block" />bloat is <span className="text-gray-400 line-through decoration-indigo-500 decoration-4">over.</span>
                    </h1>
                    <Lead className="max-w-2xl mx-auto">
                        Experience the difference. See exactly how the <Highlight color="rose">old guard traps your staff</Highlight> in tedious, click-heavy workflows, and witness how Clear Mind empowers them instead.
                    </Lead>
                </div>

                {/* Interactive Comparison UI - Dual Pane Mode */}
                <div className="flex flex-col xl:flex-row gap-8">

                    {/* Left: Vendor Selector Sidebar */}
                    <div className="w-full xl:w-72 shrink-0 flex flex-col gap-2 relative z-20">

                        {/* Desktop View */}
                        <div className="hidden xl:flex flex-col gap-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-4 border-l-2 border-gray-200">Select Workflow Track</p>
                            {vendors.map(v => {
                                const Icon = v.icon
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setActiveId(v.id)}
                                        className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${activeId === v.id
                                            ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100'
                                            : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <div className="relative z-10 flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeId === v.id ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                                                <Icon strokeWidth={2.5} className={`w-4 h-4 ${activeId === v.id ? 'text-indigo-600' : 'text-gray-500'}`} />
                                            </div>
                                            <div>
                                                <h3 className={`text-base font-black leading-tight ${activeId === v.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {v.name}
                                                </h3>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${activeId === v.id ? 'text-indigo-500' : 'text-gray-400'}`}>
                                                    {v.category}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Mobile View: Horizontal Scroll */}
                        <div className="xl:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbars">
                            {vendors.map(v => {
                                const Icon = v.icon
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setActiveId(v.id)}
                                        className={`shrink-0 snap-center px-5 py-3 rounded-xl whitespace-nowrap transition-all border shadow-sm ${activeId === v.id ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100' : 'bg-white border-gray-200 text-gray-500'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon strokeWidth={2.5} className={`w-4 h-4 ${activeId === v.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                                            <div className="text-left">
                                                <span className={`block text-sm font-black ${activeId === v.id ? 'text-gray-900' : 'text-gray-500'}`}>{v.name}</span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right: Dual Pane Comparison (The Rot vs The Solution) */}
                    <div className="w-full relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeVendor.id}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="flex flex-col gap-8"
                            >
                                <div className="grid lg:grid-cols-12 gap-6 items-stretch">

                                    {/* ── Pane 1: The Legacy Methodology ── */}
                                    <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col h-full relative">
                                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 z-20"></div>

                                        <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between z-10 relative">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-gray-500" />
                                                <span className="font-black text-gray-800 uppercase tracking-wide">The Legacy Process</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold font-mono text-gray-500 bg-gray-200/50 border border-gray-300 px-2 py-1 rounded">
                                                <span className="hidden md:inline">INTERACTIVE </span>SIMULATION
                                            </div>
                                        </div>

                                        <div className="flex-grow flex flex-col z-10 bg-white p-6 md:p-8">

                                            {/* The Interactive Simulator replacing the static list */}
                                            <div className="flex-grow">
                                                {activeVendor.legacyComponent}
                                            </div>

                                            {/* Collateral Damage filling the bottom white space */}
                                            <div className="mt-auto pt-8 border-t border-gray-100">
                                                <h4 className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-4">
                                                    <TriangleAlert className="w-3.5 h-3.5" /> Collateral Damage
                                                </h4>
                                                <ul className="space-y-3">
                                                    {activeVendor.collateralDamage.map((point, idx) => (
                                                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 font-medium leading-relaxed">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    {/* ── Pane 2: The Clear Mind Way (Interactive Demo) ── */}
                                    <div className="col-span-12 lg:col-span-8 bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col h-full relative">
                                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 z-20"></div>

                                        <div className="p-6 bg-gray-950 border-b border-gray-800 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                                <span className="font-black text-white uppercase tracking-wide">The Autonomous Approach</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                <span className="hidden md:inline">LIVE </span>COMPONENT
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 bg-gray-900 border-b border-gray-800 shrink-0">
                                            <h3 className="text-2xl md:text-3xl font-black text-white">{activeVendor.solutionTitle}</h3>
                                            <p className="text-gray-400 text-sm mt-2 font-medium">Interact with the actual platform component below to witness the difference.</p>
                                        </div>

                                        {/* Mount the actual component */}
                                        <div className="relative flex-grow bg-gray-50 flex items-start justify-center overflow-hidden h-[740px] border-t-4 border-gray-900">
                                            {/* Scale wrapper to fit dashboard components neatly into this pane */}
                                            <div className="w-full absolute top-0 left-0 pt-4 px-2">
                                                {activeVendor.component}
                                            </div>
                                        </div>

                                    </div>
                                </div> {/* End of grid row */}

                                {/* ── Separated Row 2: Benchmark & Lock-in Risk ── */}
                                <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-12">
                                    <div className="w-full lg:w-1/2">
                                        <BenchmarkPanel data={activeVendor.benchmark} />
                                    </div>
                                    <div className="w-full lg:w-1/2 lg:border-l border-t lg:border-t-0 border-gray-200 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center h-full">
                                        <ExecutiveTakeaway color="rose" className="w-full border-none shadow-none bg-transparent md:p-0">
                                            <div className="text-rose-900 font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                                                <Anchor className="w-4 h-4" /> The Lock-in Risk
                                            </div>
                                            <span className="text-rose-800">{activeVendor.trap}</span>
                                        </ExecutiveTakeaway>
                                    </div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* ── The BYOD Escape Hatch (Optional Off-Ramp) ── */}
                <div className="mt-12 mb-24 bg-white rounded-3xl border border-indigo-100 p-8 md:p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-[200px] border-b border-l border-indigo-500/10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
                                <Zap className="w-4 h-4" /> The Optional Off-Ramp
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">The BYOD Escape Hatch</h2>
                            <Lead className="mb-6 text-gray-600">
                                When you are ready to stop paying thousands of dollars for bolted-down kiosk <Highlight color="indigo">hardware</Highlight>, we offer an elegant, frictionless way out.
                            </Lead>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                    </div>
                                    <p className="text-gray-700 font-medium"><span className="font-bold text-gray-900">1-Click AI Form Ingestion:</span> Upload your massive PDF surgical histories. Our LLM parses them into dynamic, mobile-friendly web forms instantly.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                    </div>
                                    <p className="text-gray-700 font-medium"><span className="font-bold text-gray-900">Bring Your Own Device (BYOD):</span> Patients receive a secure, HIPAA-compliant SMS link to complete intake on their own phones before arriving.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                    </div>
                                    <p className="text-gray-700 font-medium"><span className="font-bold text-gray-900">FHIR-Native Extraction:</span> The data isn't trapped in a flattened PDF blob. We parse it into discrete FHIR resources (`Patient`, `Observation`) mapped straight to Epic/Cerner.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-inner text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                            <BrainCircuit className="w-16 h-16 text-indigo-400 mb-4 animate-pulse" />
                            <h4 className="font-black text-xl text-gray-900 mb-2">Drag & Drop Legacy Forms</h4>
                            <p className="text-sm font-medium text-gray-500 max-w-sm mb-6">Drop your multi-page Phreesia PDFs here. Our ingestion engine will rebuild them dynamically in seconds.</p>
                            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2">
                                <Search className="w-4 h-4" /> Simulate Form Ingestion
                            </button>
                        </div>
                    </div>
                </div>

                <HeadToHead />

                <BenchmarkMoat />

            </main >

            <Footer />

            <style jsx global>{`
        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbars {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div >
    )
}
