"use client"

import Datepicker from '@/components/dashboard/datepicker'
import Link from 'next/link'
import { Activity, Video, Users, Stethoscope, ShieldCheck, DollarSign, BrainCircuit, Bot, PlayCircle } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto bg-slate-50 min-h-screen font-inter">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-10">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl md:text-4xl text-slate-900 font-black flex items-center gap-3 tracking-tight">
                        <Activity className="w-8 h-8 text-violet-600" />
                        Revenue Command Center
                    </h1>
                    <p className="text-base font-medium text-slate-500 mt-2">Unified telemetry for your Autonomous Receptionist, Encounter, and Billing Agents.</p>
                </div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <Datepicker align="right" />
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Today's Visits</span>
                    <span className="text-3xl font-black text-slate-900">42</span>
                    <span className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1">↑ 12% vs yesterday</span>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">SOAP Notes Approved</span>
                    <span className="text-3xl font-black text-slate-900">38</span>
                    <span className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1">100% AI Generated</span>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Predicted Pass Rate</span>
                    <span className="text-3xl font-black text-emerald-600">98.4%</span>
                    <span className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-1">On 42 pending claims</span>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Recovered Revenue</span>
                    <span className="text-3xl font-black text-violet-600">$4,250</span>
                    <span className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-1">Saved via Denial AI Today</span>
                </div>
            </div>

            {/* The 3 Agents Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Agent 1: Receptionist */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full group-hover:bg-sky-500/20 transition-colors"></div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-100">
                                <Users className="w-7 h-7 text-sky-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full border border-sky-200/50">
                                Real-Time X12
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Receptionist Agent</h2>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                                Zero-click insurance verification via Availity. Automatically pulls patient copays, deductibles, and prior-auth status before they arrive.
                            </p>
                            <Link href="/dashboard/checkin" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                                <PlayCircle className="w-4 h-4" />
                                Launch Eligibility Simulator
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Agent 2: Encounter */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors"></div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                                <Stethoscope className="w-7 h-7 text-indigo-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200/50">
                                Live Audio AI
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Encounter Agent</h2>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                                Split-screen telehealth with real-time transcription. Auto-generates compliant SOAP notes and suggests ICD-10/CPT codes on the fly.
                            </p>
                            <Link href="/dashboard/encounter/sj-8921-a" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                                <Video className="w-4 h-4" />
                                Open Telehealth Simulator
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Agent 3: Billing */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/20 transition-colors"></div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center border border-violet-100">
                                <DollarSign className="w-7 h-7 text-violet-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-violet-100 text-violet-700 px-3 py-1.5 rounded-full border border-violet-200/50">
                                Predictive Denial
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Billing Agent</h2>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                                Claims scrubbing against UHC, Aetna, and BCBS rule engines. Predicts denials before 837 submission and auto-applies NCCI modifier fixes.
                            </p>
                            <Link href="/dashboard/billing" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                                <BrainCircuit className="w-4 h-4" />
                                Enter Revenue Pipeline
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
