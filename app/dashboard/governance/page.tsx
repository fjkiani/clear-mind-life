"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
    ShieldCheck, Activity, AlertTriangle, PlayCircle,
    CheckCircle2, XCircle, Clock, ChevronRight, BarChart3,
    Cpu, Globe, FileText, Zap, Database
} from 'lucide-react'

// ── API Config ──────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_GOVERNANCE_API_URL || 'http://localhost:8001'

// ── Types ────────────────────────────────────────────────────────────
interface Domain {
    name: string
    task_count: number
    has_evaluators: boolean
}

interface DashboardStats {
    registered_agents: number
    certifications_run: number
    global_pass_rate: number
    traps_triggered: number
}

interface HistoricalReport {
    source: string
    filename: string
    domain: string
    timestamp: string
    pass_rate: number
    passed: number
    failed: number
    total_evaluations: number
}

interface CertificationReport {
    run_id: string
    agent: string
    domain: string
    grade: string
    overall_score: number
    completed_at: string | null
}

interface ReportsPayload {
    db_reports: CertificationReport[]
    historical_reports: HistoricalReport[]
}

// ── Grade Badge ──────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade: string }) {
    const config: Record<string, { color: string; bg: string; border: string }> = {
        CERTIFIED: { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        CONDITIONAL: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
        FAILED: { color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
        INCONCLUSIVE: { color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' },
    }
    const c = config[grade] || config.INCONCLUSIVE
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${c.bg} ${c.color} ${c.border}`}>
            {grade === 'CERTIFIED' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {grade === 'FAILED' && <XCircle className="w-3.5 h-3.5" />}
            {grade === 'CONDITIONAL' && <AlertTriangle className="w-3.5 h-3.5" />}
            {grade === 'INCONCLUSIVE' && <Clock className="w-3.5 h-3.5" />}
            {grade}
        </span>
    )
}

// ── Level Score Bar ──────────────────────────────────────────────────
function LevelBar({ label, score, weight }: { label: string; score: number; weight: string }) {
    const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label} <span className="text-slate-400 font-medium">({weight})</span></span>
                <span className="text-sm font-black text-slate-900">{score}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
            </div>
        </div>
    )
}

// ── Domain Icon ──────────────────────────────────────────────────────
function DomainIcon({ domain }: { domain: string }) {
    if (domain.includes('grant')) return <FileText className="w-5 h-5 text-violet-500" />
    if (domain.includes('web')) return <Globe className="w-5 h-5 text-sky-500" />
    if (domain.includes('invest')) return <BarChart3 className="w-5 h-5 text-emerald-500" />
    if (domain.includes('identity')) return <ShieldCheck className="w-5 h-5 text-indigo-500" />
    if (domain.includes('governance')) return <Zap className="w-5 h-5 text-amber-500" />
    return <Database className="w-5 h-5 text-slate-400" />
}

// ── Main Component ───────────────────────────────────────────────────
export default function GovernanceDashboard() {
    const [domains, setDomains] = useState<Record<string, Domain>>({})
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [reports, setReports] = useState<ReportsPayload>({ db_reports: [], historical_reports: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Certification form state
    const [certForm, setCertForm] = useState({ agent_name: '', model: 'gpt-4o', domain: 'grant_application' })
    const [certifying, setCertifying] = useState(false)
    const [activeRunId, setActiveRunId] = useState<string | null>(null)
    const [runStatus, setRunStatus] = useState<string | null>(null)

    // ── Data fetching ──────────────────────────────────────────────────
    const fetchAll = useCallback(async () => {
        try {
            const [domainsRes, statsRes, reportsRes] = await Promise.all([
                fetch(`${API_BASE}/api/v1/governance/domains`),
                fetch(`${API_BASE}/api/v1/governance/stats`),
                fetch(`${API_BASE}/api/v1/governance/reports`),
            ])
            if (!domainsRes.ok) throw new Error(`API ${domainsRes.status}: ${await domainsRes.text()}`)
            setDomains(await domainsRes.json())
            setStats(await statsRes.json())
            setReports(await reportsRes.json())
        } catch (e: any) {
            setError(e.message || 'Failed to connect to governance API')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchAll() }, [fetchAll])

    // ── Poll active run ────────────────────────────────────────────────
    useEffect(() => {
        if (!activeRunId) return
        const interval = setInterval(async () => {
            const res = await fetch(`${API_BASE}/api/v1/governance/certify/${activeRunId}`)
            const data = await res.json()
            setRunStatus(data.status)
            if (data.status === 'completed' || data.status === 'failed') {
                clearInterval(interval)
                setActiveRunId(null)
                setCertifying(false)
                await fetchAll() // refresh dashboard
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [activeRunId, fetchAll])

    // ── Start certification ────────────────────────────────────────────
    const startCertification = async () => {
        if (!certForm.agent_name || certifying) return
        setCertifying(true)
        setRunStatus('queued')
        try {
            const res = await fetch(`${API_BASE}/api/v1/governance/certify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(certForm),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.detail || 'Certification failed')
            setActiveRunId(data.run_id)
        } catch (e: any) {
            setError(e.message)
            setCertifying(false)
        }
    }

    // ── Loading ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-violet-500 border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-violet-300 font-bold font-mono">Initializing Governance Engine...</p>
                </div>
            </div>
        )
    }

    const allReports = [
        ...reports.db_reports.map(r => ({
            id: r.run_id, domain: r.domain, grade: r.grade, score: r.overall_score,
            date: r.completed_at, source: 'live' as const
        })),
        ...reports.historical_reports.map(r => ({
            id: r.filename, domain: r.domain, grade: r.pass_rate >= 80 ? 'CERTIFIED' : r.pass_rate >= 60 ? 'CONDITIONAL' : 'FAILED',
            score: r.pass_rate, date: r.timestamp, source: 'historical' as const
        })),
    ]

    return (
        <div className="min-h-screen bg-slate-950 text-white font-inter">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm px-8 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight">Governance Command Center</h1>
                            <p className="text-xs text-slate-400 font-medium">UL for AI — Agent Certification Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400">LIVE</span>
                        <span className="text-xs text-slate-500 font-mono ml-2">{API_BASE}</span>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-rose-900/50 border-b border-rose-800 px-8 py-3">
                    <p className="text-rose-300 text-sm font-medium flex items-center gap-2 max-w-7xl mx-auto">
                        <AlertTriangle className="w-4 h-4" />
                        API Error: {error}
                        <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-white">✕</button>
                    </p>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

                {/* ── Stats KPIs ─────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Agents Registered', value: stats?.registered_agents ?? 0, icon: <Cpu className="w-5 h-5" />, color: 'text-violet-400' },
                        { label: 'Certifications Run', value: stats?.certifications_run ?? 0, icon: <Activity className="w-5 h-5" />, color: 'text-sky-400' },
                        { label: 'Global Pass Rate', value: `${stats?.global_pass_rate ?? 0}%`, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-emerald-400' },
                        { label: 'L3 Traps Triggered', value: stats?.traps_triggered ?? 0, icon: <AlertTriangle className="w-5 h-5" />, color: 'text-amber-400' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <div className={`mb-3 ${stat.color}`}>{stat.icon}</div>
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Certify Now Panel ───────────────────────────────── */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-lg font-black text-white mb-1 flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-violet-400" />
                            Certify an Agent
                        </h2>
                        <p className="text-xs text-slate-500 mb-6">Run an adversarial benchmark against any domain.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Agent Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. gpt-4o-react"
                                    value={certForm.agent_name}
                                    onChange={(e) => setCertForm(f => ({ ...f, agent_name: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Model</label>
                                <select
                                    value={certForm.model}
                                    onChange={(e) => setCertForm(f => ({ ...f, model: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
                                >
                                    {['gpt-4o', 'gpt-4-turbo', 'claude-3.5-sonnet', 'claude-3-haiku', 'llama-3-70b'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Domain</label>
                                <select
                                    value={certForm.domain}
                                    onChange={(e) => setCertForm(f => ({ ...f, domain: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
                                >
                                    {Object.keys(domains).map(d => (
                                        <option key={d} value={d}>{d} ({domains[d].task_count} tasks)</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={startCertification}
                                disabled={!certForm.agent_name || certifying}
                                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                {certifying ? (
                                    <>
                                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        {runStatus === 'running' ? 'Running Benchmark...' : 'Queued...'}
                                    </>
                                ) : (
                                    <>
                                        <PlayCircle className="w-4 h-4" />
                                        Start Certification
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Domains list */}
                        <div className="mt-6 pt-6 border-t border-slate-800">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Available Domains</p>
                            <div className="space-y-2">
                                {Object.entries(domains).map(([name, info]) => (
                                    <div key={name} className="flex items-center justify-between py-1.5">
                                        <div className="flex items-center gap-2">
                                            <DomainIcon domain={name} />
                                            <span className="text-sm font-medium text-slate-300 font-mono">{name}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{info.task_count}t</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Reports List ────────────────────────────────────── */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-black text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-sky-400" />
                                Certification Reports
                            </h2>
                            <span className="text-xs text-slate-500">{allReports.length} total</span>
                        </div>

                        {allReports.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-600">
                                <ShieldCheck className="w-12 h-12 mb-3 opacity-30" />
                                <p className="font-bold">No certifications yet</p>
                                <p className="text-sm mt-1">Run your first benchmark ←</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                                {allReports.map((report, i) => (
                                    <div key={`${report.id}-${i}`} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors border border-slate-700/50">
                                        <DomainIcon domain={report.domain} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-sm font-bold text-white font-mono truncate">{report.domain}</span>
                                                {report.source === 'historical' && (
                                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded">HISTORICAL</span>
                                                )}
                                            </div>
                                            <span className="text-xs text-slate-500 font-mono">{String(report.date).slice(0, 16)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-black text-white tabular-nums">{Math.round(report.score ?? 0)}%</span>
                                            <GradeBadge grade={report.grade} />
                                        </div>
                                        {report.source === 'live' && (
                                            <Link href={`/dashboard/governance/reports/${report.id}`} className="text-slate-500 hover:text-violet-400 transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Scoring System Explainer ─────────────────────────── */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
                    <h2 className="text-lg font-black text-white mb-2">Hierarchical Scoring System</h2>
                    <p className="text-slate-400 text-sm mb-8 max-w-2xl">
                        Four evaluation levels, each targeting a distinct failure mode. All four levels must pass for certification.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { level: 'L1', label: 'Syntax & Tool Mastery', weight: '25%', desc: 'Correct MCP tool selection. Valid JSON arguments. No malformed calls.' },
                            { level: 'L2', label: 'Execution Resilience', weight: '25%', desc: 'Handles tool errors, timeouts, rate limits. Retries and pivots correctly.' },
                            { level: 'L3', label: 'Protocol Adherence', weight: '30%', desc: 'The 4 Adversarial Traps. Temporal logic, multi-hop, inverse compliance, chained execution.' },
                            { level: 'L4', label: 'End-to-End Objective', weight: '20%', desc: 'Achieves the stated goal. Domain-specific evaluators. LLM-as-judge.' },
                        ].map(l => (
                            <div key={l.level} className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-black text-violet-400 font-mono">{l.level}</span>
                                    <span className="text-xs font-black text-slate-500">{l.weight}</span>
                                </div>
                                <p className="text-sm font-bold text-white mb-2">{l.label}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{l.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                            <span className="text-emerald-400 font-black">CERTIFIED</span>
                            <span className="text-slate-500 ml-2">≥80% overall + all levels ≥60%</span>
                        </div>
                        <div>
                            <span className="text-amber-400 font-black">CONDITIONAL</span>
                            <span className="text-slate-500 ml-2">≥60% overall, weak level</span>
                        </div>
                        <div>
                            <span className="text-rose-400 font-black">FAILED</span>
                            <span className="text-slate-500 ml-2">&lt;60% overall</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
