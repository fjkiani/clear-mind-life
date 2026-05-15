"use client"

import Link from 'next/link'
import { Activity, Video, Users, Stethoscope, DollarSign, BrainCircuit, PlayCircle, AlertTriangle, TrendingUp, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

// Dr. Sarah Chen's practice — demo data
const DEMO = {
  practice: "Dr. Sarah Chen's Practice",
  location: "NYC Mental Health · 5 Providers",
  stats: [
    {
      label: "Active Patients Today",
      value: "8",
      sub: "3 appointments remaining",
      trend: null,
      color: "text-slate-900",
    },
    {
      label: "SOAP Notes Approved",
      value: "5",
      sub: "100% AI-generated",
      trend: "↑ 0 pending review",
      color: "text-slate-900",
      trendColor: "text-emerald-600",
    },
    {
      label: "Predicted Pass Rate",
      value: "97.2%",
      sub: "On 3 pending claims",
      trend: null,
      color: "text-emerald-600",
    },
    {
      label: "Recovered This Month",
      value: "$47,200",
      sub: "Denial AI + pre-scrub",
      trend: "↑ $3,100 vs last month",
      color: "text-violet-600",
      trendColor: "text-violet-500",
    },
  ],
  flaggedClaim: {
    id: "837-C42X",
    payer: "UnitedHealthcare",
    error: "CPT 99214 requires modifier -25 when billed with procedure 20610 (UHC edit rule 4.3.1)",
    patient: "Marcus T.",
    amount: "$340.00",
    confidence: 12,
  },
}

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto bg-slate-50 min-h-screen font-inter">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-start mb-10">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl md:text-4xl text-slate-900 font-black flex items-center gap-3 tracking-tight">
            <Activity className="w-8 h-8 text-violet-600" />
            Revenue Command Center
          </h1>
          <p className="text-base font-medium text-slate-500 mt-1">
            {DEMO.practice} &middot; {DEMO.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Demo Mode
          </span>
          <Link
            href="/signin"
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors underline underline-offset-2"
          >
            Sign in with your account
          </Link>
        </div>
      </div>

      {/* Flagged denial alert */}
      <div className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-black text-rose-800 uppercase tracking-wider">Denial Risk Detected</p>
            <p className="text-xs text-rose-600 font-medium">Claim #{DEMO.flaggedClaim.id} · {DEMO.flaggedClaim.payer}</p>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-rose-700 font-medium leading-relaxed">
            <span className="font-bold">Patient:</span> {DEMO.flaggedClaim.patient} &middot; <span className="font-bold">Amount:</span> {DEMO.flaggedClaim.amount}
          </p>
          <code className="text-xs text-rose-800 font-mono bg-rose-100 px-2 py-0.5 rounded mt-1 inline-block">
            {DEMO.flaggedClaim.error}
          </code>
        </div>
        <Link
          href="/dashboard/billing"
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
        >
          Auto-Fix &amp; Submit <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {DEMO.stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{stat.label}</span>
            <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-sm font-medium text-slate-400 mt-1">{stat.sub}</span>
            {stat.trend && (
              <span className={`text-xs font-semibold mt-1 ${stat.trendColor ?? 'text-emerald-600'}`}>{stat.trend}</span>
            )}
          </div>
        ))}
      </div>

      {/* Today's patient queue */}
      <div className="mb-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Today&apos;s Patient Queue</h2>
          <Link href="/dashboard/healthcare/appointments" className="text-xs font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1">
            Manage Schedule <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: "Marcus T.", time: "9:00 AM", type: "Therapy — 60 min", status: "checked-in", insurance: "UHC · Copay $30 ✓", icd: "F32.1" },
            { name: "Priya S.", time: "10:30 AM", type: "Medication Mgmt — 30 min", status: "upcoming", insurance: "BCBS · Copay $25 ✓", icd: "F41.1" },
            { name: "James R.", time: "12:00 PM", type: "Intake — 90 min", status: "upcoming", insurance: "Aetna · Verifying…", icd: "Pending" },
            { name: "Leila M.", time: "2:00 PM", type: "Therapy — 60 min", status: "upcoming", insurance: "Medicaid · Copay $0 ✓", icd: "F33.0" },
            { name: "David K.", time: "3:30 PM", type: "Crisis — 45 min", status: "upcoming", insurance: "UHC · Auth Required", icd: "F43.10" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-black text-xs shrink-0">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{p.time} · {p.type}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-right">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{p.insurance}</p>
                  <p className="text-xs font-mono text-slate-400">{p.icd}</p>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  p.status === "checked-in"
                    ? "bg-emerald-100 text-emerald-700"
                    : p.insurance.includes("Verifying") || p.insurance.includes("Required")
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {p.status === "checked-in" ? "Checked In" : p.insurance.includes("Verifying") ? "Verifying" : p.insurance.includes("Required") ? "Auth Needed" : "Upcoming"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 3 Agents Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Agent 1: Receptionist */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full group-hover:bg-sky-500/20 transition-colors" />
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
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4">
              Zero-click insurance verification via Availity. Automatically pulls patient copays, deductibles, and prior-auth status before they arrive.
            </p>
            <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              5 of 8 patients verified today
            </div>
            <Link href="/dashboard/checkin" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
              <PlayCircle className="w-4 h-4" />
              Launch Eligibility Simulator
            </Link>
          </div>
        </div>

        {/* Agent 2: Encounter */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
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
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4">
              Split-screen telehealth with real-time transcription. Auto-generates compliant SOAP notes and suggests ICD-10/CPT codes on the fly.
            </p>
            <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              5 SOAP notes approved, 0 pending
            </div>
            <Link href="/dashboard/encounter/sj-8921-a" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
              <Video className="w-4 h-4" />
              Open Telehealth Simulator
            </Link>
          </div>
        </div>

        {/* Agent 3: Billing */}
        <div className="bg-white rounded-3xl p-8 border border-rose-200 shadow-md hover:shadow-xl transition-all relative overflow-hidden group ring-1 ring-rose-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full group-hover:bg-rose-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100">
              <DollarSign className="w-7 h-7 text-rose-600" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700 px-3 py-1.5 rounded-full border border-rose-200/50">
              1 Action Required
            </span>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Billing Agent</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4">
              Claims scrubbing against UHC, Aetna, and BCBS rule engines. Predicts denials before 837 submission and auto-applies NCCI modifier fixes.
            </p>
            <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Claim #837-C42X flagged — modifier fix ready
            </div>
            <Link href="/dashboard/billing" className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
              <BrainCircuit className="w-4 h-4" />
              Review &amp; Fix Flagged Claim
            </Link>
          </div>
        </div>

      </div>

      {/* Monthly recovery trend */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Revenue Recovery — Last 6 Months</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Denial prevention + pre-scrub savings · Dr. Sarah Chen&apos;s Practice</p>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            +34% vs prior period
          </div>
        </div>
        <div className="flex items-end gap-3 h-24">
          {[
            { month: "Dec", amount: 28400, pct: 60 },
            { month: "Jan", amount: 31200, pct: 66 },
            { month: "Feb", amount: 35800, pct: 76 },
            { month: "Mar", amount: 38100, pct: 81 },
            { month: "Apr", amount: 44100, pct: 94 },
            { month: "May", amount: 47200, pct: 100 },
          ].map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-500">${(m.amount / 1000).toFixed(0)}K</span>
              <div
                className={`w-full rounded-t-lg transition-all ${i === 5 ? 'bg-violet-500' : 'bg-slate-200'}`}
                style={{ height: `${m.pct}%` }}
              />
              <span className="text-[10px] font-semibold text-slate-400">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
