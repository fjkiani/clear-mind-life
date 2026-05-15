'use client'

import { useState, useRef, useEffect } from 'react'
import { VERTICAL_CONFIG, TOOL_ICONS, URGENCY_STYLES, DOCTORS } from '@/config/healthcare'
import Link from 'next/link'
import { Search, Database, AlertCircle, CheckCircle2, Loader2, ChevronRight } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend-healthtech.onrender.com'

// ─── Timeline trace ───────────────────────────────────────────────────────────
function AgentTimeline({ actions }: { actions: any[] }) {
    if (!actions?.length) return null
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Agent Execution Trace
            </h3>
            <div className="relative pl-5">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200"></div>
                {actions.map((action, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                        <div className={`absolute -left-3.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white ${action.success ? 'border-green-500' : 'border-red-500'}`}></div>
                        <div className="bg-white hover:bg-gray-50 transition-colors rounded-xl px-5 py-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-xl bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border border-gray-100">{(TOOL_ICONS as any)[action.tool] || TOOL_ICONS.default}</span>
                                <span className="text-sm font-bold text-gray-900">
                                    {action.tool.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                </span>
                                <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${action.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    {action.success ? '✓ Success' : '✗ Failed'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Appointment Result Card ──────────────────────────────────────────────────
function AppointmentResultCard({ response, vertical, onJoinVideo }: { response: any; vertical: string; onJoinVideo: (url: string) => void }) {
    const config = (VERTICAL_CONFIG as any)[vertical]
    const doctor = DOCTORS.find(d => d.vertical === vertical) || DOCTORS[0]
    if (!response) return null
    return (
        <div className={`rounded-2xl border ${config.border} ${config.cardBg} overflow-hidden`}>
            <div className="px-5 pt-5 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    {response.urgency && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${(URGENCY_STYLES as any)[response.urgency] || ''}`}>
                            {response.urgency === 'EMERGENT' ? '🚨' : response.urgency === 'URGENT' ? '⚠️' : '✅'} {response.urgency}
                        </span>
                    )}
                    {response.booking_confirmed && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">✅ Appointment Booked</span>
                    )}
                    {response.sms_sent && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">📱 SMS Sent</span>
                    )}
                </div>
                <p className="text-gray-800 leading-relaxed text-sm">{response.message}</p>
            </div>
            {response.appointment_id && (
                <div className="mx-5 mb-4 bg-gray-100/80 rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-200 bg-white">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${doctor.color} flex items-center justify-center text-gray-900 font-bold text-lg shrink-0 shadow-sm`}>
                            {doctor.name.split(' ')[1][0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-bold text-gray-900">{doctor.name}</p>
                            <p className="text-sm font-medium text-gray-500">{doctor.specialty}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Appointment ID</p>
                            <p className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded shadow-sm border border-gray-200 inline-block">{response.appointment_id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-gray-200 bg-white">
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</p>
                            <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">✓ Confirmed</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</p>
                            <span className="text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 inline-block">
                                {vertical === 'psychiatric_telehealth' ? '📹 Telehealth' : '🏥 In-Person'}
                            </span>
                        </div>
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SMS</p>
                            <span className={`text-sm font-bold px-3 py-1.5 rounded-full border inline-block ${response.sms_sent ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>{response.sms_sent ? '📱 Sent' : '⏳ Pending'}</span>
                        </div>
                    </div>
                    {response.video_patient_link && (
                        <div className="px-6 py-5 border-t border-gray-200 bg-violet-50/50">
                            <button
                                onClick={() => onJoinVideo(response.video_patient_link)}
                                className={`w-full py-4 rounded-xl font-bold text-base transition-all bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 shadow-md flex items-center justify-center gap-2`}
                            >
                                <span className="text-xl">📹</span> Join Telehealth Session
                            </button>
                        </div>
                    )}
                </div>
            )}
            <div className="border-t border-gray-200 px-6 py-4 flex gap-4 bg-gray-50">
                <Link href="/dashboard/healthcare/appointments" className="text-sm font-bold text-gray-600 hover:text-violet-700 transition-colors">View All Appointments →</Link>
                <Link href="/dashboard/healthcare/book" className="text-sm font-bold text-gray-600 hover:text-violet-700 transition-colors">Book Another →</Link>
            </div>
        </div>
    )
}

// ─── Code Intelligence Tab ────────────────────────────────────────────────────

type CodeTool = 'icd10' | 'ncci' | 'rvu' | 'mue'

const DEMO_RESULTS: Record<CodeTool, any> = {
    icd10: {
        results: [
            { code: 'F32.1', description: 'Major depressive disorder, single episode, moderate', category: 'Mental Health' },
            { code: 'F32.0', description: 'Major depressive disorder, single episode, mild', category: 'Mental Health' },
            { code: 'F33.1', description: 'Major depressive disorder, recurrent, moderate', category: 'Mental Health' },
            { code: 'F41.1', description: 'Generalized anxiety disorder', category: 'Mental Health' },
            { code: 'F32.9', description: 'Major depressive disorder, single episode, unspecified', category: 'Mental Health' },
        ]
    },
    ncci: {
        col_code: '99214', row_code: '20610',
        edit_exists: true,
        modifier_allowed: true,
        modifier: '25',
        description: 'Office visit (99214) and joint injection (20610) — modifier -25 required on E&M code to indicate separate, significant service.',
        payer_note: 'UHC Edit Rule 4.3.1: Append modifier -25 to 99214 when billed same-day as a procedure.'
    },
    rvu: {
        code: '99214',
        description: 'Office or other outpatient visit, established patient, moderate complexity',
        work_rvu: 1.92,
        practice_expense_rvu: 1.47,
        malpractice_rvu: 0.14,
        total_rvu: 3.53,
        national_payment: '$134.12',
        status: 'Active'
    },
    mue: {
        code: '99214',
        description: 'Office or other outpatient visit, established patient',
        mue_value: 1,
        mue_adjudication_indicator: '3',
        indicator_label: 'Clinical: 1 unit per date of service per provider',
        rationale: 'A single E&M visit per provider per date of service is the clinical standard.'
    }
}

function CodeIntelligenceTab() {
    const [activeTool, setActiveTool] = useState<CodeTool>('icd10')
    const [query, setQuery] = useState('')
    const [colCode, setColCode] = useState('99214')
    const [rowCode, setRowCode] = useState('20610')
    const [cptCode, setCptCode] = useState('99214')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [usingDemo, setUsingDemo] = useState(false)

    const tools: { id: CodeTool; label: string; icon: string; desc: string }[] = [
        { id: 'icd10', label: 'ICD-10 Lookup', icon: '🔍', desc: 'Search 74,719 diagnosis codes' },
        { id: 'ncci', label: 'NCCI PTP Checker', icon: '⚡', desc: 'Check 2.38M bundling edits' },
        { id: 'rvu', label: 'CPT RVU Lookup', icon: '💰', desc: 'Work & total RVUs for 15,804 codes' },
        { id: 'mue', label: 'MUE Limits', icon: '📊', desc: 'Max units per day for 15,095 codes' },
    ]

    const runQuery = async () => {
        setLoading(true)
        setError(null)
        setResult(null)
        setUsingDemo(false)

        try {
            let url = ''
            if (activeTool === 'icd10') url = `${API_BASE}/codes/icd10/search?q=${encodeURIComponent(query)}&limit=8`
            if (activeTool === 'ncci') url = `${API_BASE}/codes/ncci/ptp?col_code=${colCode}&row_code=${rowCode}`
            if (activeTool === 'rvu') url = `${API_BASE}/codes/cpt/rvu?code=${cptCode}`
            if (activeTool === 'mue') url = `${API_BASE}/codes/mue?code=${cptCode}`

            const controller = new AbortController()
            const timer = setTimeout(() => controller.abort(), 8000)
            const res = await fetch(url, { signal: controller.signal })
            clearTimeout(timer)

            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            setResult(await res.json())
        } catch (e: any) {
            // Show demo data with a note
            setResult(DEMO_RESULTS[activeTool])
            setUsingDemo(true)
            setError(null)
        } finally {
            setLoading(false)
        }
    }

    const handleToolChange = (tool: CodeTool) => {
        setActiveTool(tool)
        setResult(null)
        setError(null)
        setUsingDemo(false)
    }

    return (
        <div className="space-y-6">
            {/* DB Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'ICD-10 Codes', value: '74,719', color: 'bg-violet-50 border-violet-200 text-violet-700' },
                    { label: 'NCCI PTP Edits', value: '2,387,727', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                    { label: 'CPT RVU Records', value: '15,804', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                    { label: 'MUE Values', value: '15,095', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                ].map(s => (
                    <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.color}`}>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">{s.label}</p>
                        <p className="text-xl font-black mt-0.5">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Tool Selector */}
                <div className="xl:col-span-1 space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Tool</p>
                    {tools.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleToolChange(t.id)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${activeTool === t.id
                                ? 'bg-violet-600 border-violet-600 text-white shadow-lg'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 shadow-sm'
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-lg">{t.icon}</span>
                                <div>
                                    <p className="text-sm font-bold leading-tight">{t.label}</p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${activeTool === t.id ? 'text-violet-200' : 'text-gray-400'}`}>{t.desc}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Query Panel */}
                <div className="xl:col-span-3 space-y-4">
                    {/* Input */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                        {activeTool === 'icd10' && (
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">Search ICD-10 codes by code or description</label>
                                <div className="flex gap-2">
                                    <input
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && runQuery()}
                                        placeholder="e.g. depression, F32.1, anxiety..."
                                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                                    />
                                    <button onClick={runQuery} disabled={loading || !query.trim()} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                        Search
                                    </button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {['depression', 'anxiety', 'PTSD', 'F32.1', 'bipolar'].map(s => (
                                        <button key={s} onClick={() => { setQuery(s); }} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 font-medium transition-colors">{s}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTool === 'ncci' && (
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">Check if two CPT codes can be billed together (NCCI PTP)</label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Column Code (E&M / Primary)</p>
                                        <input value={colCode} onChange={e => setColCode(e.target.value)} placeholder="e.g. 99214" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500" />
                                    </div>
                                    <div className="text-gray-400 font-bold text-lg mt-5">+</div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Row Code (Procedure)</p>
                                        <input value={rowCode} onChange={e => setRowCode(e.target.value)} placeholder="e.g. 20610" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500" />
                                    </div>
                                    <button onClick={runQuery} disabled={loading} className="mt-5 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                                        Check
                                    </button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {[['99214', '20610'], ['99213', '93000'], ['99215', '36415']].map(([c, r]) => (
                                        <button key={c + r} onClick={() => { setColCode(c); setRowCode(r); }} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 font-medium transition-colors">{c} + {r}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(activeTool === 'rvu' || activeTool === 'mue') && (
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">
                                    {activeTool === 'rvu' ? 'Look up CPT RVU values (work, practice expense, malpractice)' : 'Look up MUE — maximum units per date of service'}
                                </label>
                                <div className="flex gap-2">
                                    <input value={cptCode} onChange={e => setCptCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && runQuery()} placeholder="e.g. 99214" className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500" />
                                    <button onClick={runQuery} disabled={loading || !cptCode.trim()} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                        Lookup
                                    </button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {['99214', '99213', '90837', '90834', '99215'].map(c => (
                                        <button key={c} onClick={() => setCptCode(c)} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 font-medium transition-colors font-mono">{c}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Demo data notice */}
                    {usingDemo && (
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Backend warming up (Render free tier cold start). Showing demo data — results will be live once the backend is ready (~30s).
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* ICD-10 results */}
                            {activeTool === 'icd10' && result.results && (
                                <div>
                                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                                        <p className="text-sm font-bold text-gray-900">Results <span className="text-gray-400 font-normal">({result.results.length} codes)</span></p>
                                        {usingDemo && <span className="text-xs text-amber-600 font-semibold">Demo data</span>}
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {result.results.map((r: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                                                <code className="text-sm font-mono font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100 shrink-0">{r.code}</code>
                                                <p className="text-sm text-gray-700 flex-1">{r.description || r.long_description || r.short_description}</p>
                                                {r.category && <span className="text-xs text-gray-400 font-medium shrink-0 hidden sm:block">{r.category}</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NCCI result */}
                            {activeTool === 'ncci' && (
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${result.edit_exists ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                                            {result.edit_exists ? <AlertCircle className="w-5 h-5 text-rose-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-gray-900">
                                                {result.edit_exists ? 'NCCI Edit Exists' : 'No Edit — Codes Can Be Billed Together'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <code className="font-mono font-bold text-violet-700">{result.col_code || colCode}</code> + <code className="font-mono font-bold text-violet-700">{result.row_code || rowCode}</code>
                                            </p>
                                        </div>
                                        {usingDemo && <span className="ml-auto text-xs text-amber-600 font-semibold">Demo data</span>}
                                    </div>
                                    {result.edit_exists && (
                                        <div className="space-y-3">
                                            <div className={`rounded-xl px-4 py-3 border ${result.modifier_allowed ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
                                                <p className="text-sm font-bold text-gray-800 mb-1">
                                                    {result.modifier_allowed ? `✅ Modifier -${result.modifier || '25'} allowed` : '❌ No modifier bypass — codes cannot be billed together'}
                                                </p>
                                                {result.description && <p className="text-sm text-gray-600">{result.description}</p>}
                                            </div>
                                            {result.payer_note && (
                                                <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Payer Note</p>
                                                    <p className="text-sm text-gray-700">{result.payer_note}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* RVU result */}
                            {activeTool === 'rvu' && (
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <code className="text-lg font-mono font-black text-violet-700">{result.code || cptCode}</code>
                                            <p className="text-sm text-gray-600 mt-0.5">{result.description}</p>
                                        </div>
                                        {usingDemo && <span className="text-xs text-amber-600 font-semibold">Demo data</span>}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            { label: 'Work RVU', value: result.work_rvu, color: 'bg-violet-50 border-violet-200 text-violet-700' },
                                            { label: 'Practice Expense', value: result.practice_expense_rvu, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                                            { label: 'Malpractice', value: result.malpractice_rvu, color: 'bg-gray-50 border-gray-200 text-gray-700' },
                                            { label: 'Total RVU', value: result.total_rvu, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                                        ].map(s => (
                                            <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.color}`}>
                                                <p className="text-xs font-bold uppercase tracking-wider opacity-70">{s.label}</p>
                                                <p className="text-2xl font-black mt-0.5">{s.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {result.national_payment && (
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                                            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">2024 National Payment Rate</p>
                                            <p className="text-2xl font-black text-emerald-800 mt-0.5">{result.national_payment}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* MUE result */}
                            {activeTool === 'mue' && (
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <code className="text-lg font-mono font-black text-violet-700">{result.code || cptCode}</code>
                                            <p className="text-sm text-gray-600 mt-0.5">{result.description}</p>
                                        </div>
                                        {usingDemo && <span className="text-xs text-amber-600 font-semibold">Demo data</span>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-4 text-center">
                                            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">Max Units / Day</p>
                                            <p className="text-4xl font-black text-rose-800 mt-1">{result.mue_value}</p>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Adjudication Indicator</p>
                                            <p className="text-sm font-bold text-gray-800">{result.indicator_label || `MAI ${result.mue_adjudication_indicator}`}</p>
                                            {result.rationale && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{result.rationale}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Empty state */}
                    {!result && !loading && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
                            <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium text-sm">Select a tool and run a query to search the medical coding database</p>
                            <p className="text-gray-400 text-xs mt-1">2,505,007 records · ICD-10 · NCCI · CPT RVU · MUE</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── AI Receptionist Tab ──────────────────────────────────────────────────────
function AgentReceptionistTab() {
    const [vertical, setVertical] = useState('psychiatric_telehealth')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [apiHealth, setApiHealth] = useState<any>(null)
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const config = (VERTICAL_CONFIG as any)[vertical]

    useEffect(() => {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 5000)
        fetch(`${API_BASE}/api/v1/agent/health`, { signal: controller.signal })
            .then(r => r.json())
            .then(data => { clearTimeout(timer); setApiHealth(data) })
            .catch(() => { clearTimeout(timer) })
    }, [])

    const handleSubmit = async () => {
        if (!message.trim() || loading) return
        setLoading(true)
        setError(null)
        setResponse(null)
        try {
            const res = await fetch(`${API_BASE}/api/v1/agent/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message.trim(),
                    vertical,
                    patient_id: 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
                    patient_phone: '+15551234567',
                    patient_name: 'Demo Patient',
                }),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.detail || `HTTP ${res.status}`)
            }
            setResponse(await res.json())
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Left: Vertical + Scenarios */}
            <div className="xl:col-span-2 space-y-5">
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Vertical</p>
                    {Object.entries(VERTICAL_CONFIG).map(([key, cfg]: [string, any]) => (
                        <button
                            key={key}
                            onClick={() => { setVertical(key); setResponse(null); setError(null); setMessage('') }}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-semibold text-base ${vertical === key
                                ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-lg scale-[1.02]`
                                : 'border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 bg-white shadow-sm hover:shadow-md'
                                }`}
                        >
                            {cfg.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Scenarios</p>
                    {config.scenarios.map((scenario: string, i: number) => (
                        <button
                            key={i}
                            onClick={() => { setMessage(scenario); setResponse(null); setError(null); textareaRef.current?.focus() }}
                            className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all leading-relaxed ${message === scenario
                                ? `${config.border} ${config.badge}`
                                : 'border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 bg-white shadow-sm hover:shadow-md'
                                }`}
                        >
                            {scenario.slice(0, 85)}...
                        </button>
                    ))}
                </div>

                <div className="border border-gray-200 shadow-sm rounded-2xl bg-white p-6 space-y-3">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</p>
                    <Link href="/dashboard/healthcare/book" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                        <span className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl">📅</span>
                        Book Appointment
                    </Link>
                    <Link href="/dashboard/healthcare/register" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🧑‍⚕️</span>
                        Register New Patient
                    </Link>
                    <Link href="/dashboard/healthcare/appointments" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                        <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">📋</span>
                        Manage Appointments
                    </Link>
                </div>

                {response?.actions && (
                    <div className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-4">
                        <AgentTimeline actions={response.actions} />
                    </div>
                )}
            </div>

            {/* Right: Chat + Response */}
            <div className="xl:col-span-3 space-y-5">
                {/* API health dots */}
                {apiHealth && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {[
                            { key: 'nexhealth_configured', label: 'NexHealth' },
                            { key: 'videosdk_configured', label: 'VideoSDK' },
                            { key: 'twilio_configured', label: 'Twilio' },
                            { key: 'openai_configured', label: 'OpenAI' },
                        ].map(({ key, label }) => (
                            <span key={key} className={`px-2 py-0.5 rounded-full ${apiHealth[key] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {apiHealth[key] ? '●' : '○'} {label}
                            </span>
                        ))}
                        {apiHealth.mock_mode && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">⚠ Mock</span>}
                    </div>
                )}

                {activeVideoUrl ? (
                    <div className="rounded-2xl border border-indigo-500/50 bg-gray-900 overflow-hidden shadow-2xl flex flex-col h-[600px]">
                        <div className="bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                Live Telehealth Session
                            </span>
                            <button onClick={() => setActiveVideoUrl(null)} className="text-xs font-semibold px-3 py-1 bg-gray-700 hover:bg-red-600 text-white rounded transition-colors">End Call</button>
                        </div>
                        <iframe src={activeVideoUrl} allow="camera; microphone; fullscreen; speaker; display-capture" className="w-full flex-1 border-none" title="VideoSDK Room" />
                    </div>
                ) : (
                    <>
                        <div className={`rounded-xl border ${config.border} bg-gray-50/80 p-4 space-y-3`}>
                            <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge} border inline-block`}>{config.label}</div>
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit() }}
                                placeholder="Describe what the patient is experiencing... (⌘+Enter to submit)"
                                rows={4}
                                className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!message.trim() || loading}
                                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${loading || !message.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : `bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 shadow-lg`}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Agent running...
                                    </span>
                                ) : 'Run Agent →'}
                            </button>
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <span className="font-semibold">Error: </span>{error}
                                <p className="text-xs mt-1 text-red-500">Backend may be warming up (Render free tier). Try again in ~30 seconds.</p>
                            </div>
                        )}

                        {response && <AppointmentResultCard response={response} vertical={vertical} onJoinVideo={setActiveVideoUrl} />}

                        {!loading && !response && !error && (
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                                    <p className="text-4xl">🏥</p>
                                </div>
                                <p className="text-gray-900 font-bold text-xl">AI-Powered Triage</p>
                                <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">Select a scenario or describe the patient's situation. The agent will triage, find a provider, book, and send confirmation.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HealthcarePage() {
    const [activeTab, setActiveTab] = useState<'agent' | 'codes'>('codes')

    const tabs = [
        { id: 'codes' as const, label: '🗄️ Code Intelligence', desc: '2.5M medical records' },
        { id: 'agent' as const, label: '🤖 AI Receptionist', desc: 'Triage & booking agent' },
    ]

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 mt-6 mx-4 mb-4 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Healthcare Intelligence</h1>
                        <p className="text-sm text-gray-500">Medical coding database · AI triage · End-to-end automation</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashboard/healthcare/register" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-violet-300 text-xs font-medium text-gray-600 hover:text-violet-700 transition-colors">+ Register Patient</Link>
                        <Link href="/dashboard/healthcare/appointments" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-violet-300 text-xs font-medium text-gray-600 hover:text-violet-700 transition-colors">View Schedule</Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                            <span className={`ml-2 text-[10px] font-medium ${activeTab === tab.id ? 'text-gray-400' : 'text-gray-400'}`}>{tab.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'codes' && <CodeIntelligenceTab />}
                {activeTab === 'agent' && <AgentReceptionistTab />}
            </div>
        </div>
    )
}
