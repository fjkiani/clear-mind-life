'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Shield, ShieldAlert, Cpu, Lock, Activity, Eye, ShieldCheck, FileText } from 'lucide-react'
import McpBenchmarks from '@/components/dashboard/mcp/mcp-benchmarks'
import { useMcpData } from '@/components/dashboard/mcp/use-mcp-data'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

const CATEGORY_META = {
    auth: { label: 'Authentication', icon: <Lock className="w-5 h-5" />, color: 'violet', gradient: 'from-violet-500 to-indigo-500', bg: 'bg-violet-50/50 dark:bg-violet-500/10', border: 'border-violet-200 dark:border-violet-500/20', text: 'text-violet-700 dark:text-violet-300' },
    rbac: { label: 'Access Control', icon: <Shield className="w-5 h-5" />, color: 'cyan', gradient: 'from-cyan-500 to-teal-500', bg: 'bg-cyan-50/50 dark:bg-cyan-500/10', border: 'border-cyan-200 dark:border-cyan-500/20', text: 'text-cyan-700 dark:text-cyan-300' },
    compliance: { label: 'Compliance', icon: <FileText className="w-5 h-5" />, color: 'emerald', gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50/50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300' }
}

const COMPLEXITY_BADGE: Record<string, string> = {
    simple: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    moderate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    complex: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
}

function RiskGauge({ score }: { score: number }) {
    const pct = Math.min(100, Math.max(0, score))
    const color = pct < 30 ? '#22c55e' : pct < 60 ? '#eab308' : pct < 80 ? '#f97316' : '#ef4444'
    const label = pct < 30 ? 'LOW' : pct < 60 ? 'MEDIUM' : pct < 80 ? 'HIGH' : 'CRITICAL'
    const circumference = 2 * Math.PI * 36

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90 drop-shadow-sm" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="36" fill="none" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="8" />
                    <circle
                        cx="44" cy="44" r="36" fill="none" stroke={color} strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - pct / 100)}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{pct}</span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">/ 100</span>
                </div>
            </div>
            <span className="text-sm font-black tracking-widest" style={{ color }}>{label} RISK</span>
        </div>
    )
}

function PassRateBar({ rate, label, color }: { rate: number, label: string, color?: string }) {
    const pct = Math.min(100, Math.max(0, rate || 0))
    const barColor = pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</span>
                <span className={`text-sm font-black ${pct >= 70 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {pct}%
                </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    )
}

function TaskResultRow({ result }: { result: any }) {
    const [open, setOpen] = useState(false)
    const cat = CATEGORY_META[result.category as keyof typeof CATEGORY_META] || CATEGORY_META.auth

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 shadow-sm transition-all hover:shadow-md">
            <div
                className={`cursor-pointer transition-colors ${result.passed ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-900/30'}`}
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-4 px-5 py-4">
                    <div className={`p-2 rounded-lg ${cat.bg} ${cat.text} ${cat.border} border`}>
                        {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-200 truncate">{result.task_id}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${COMPLEXITY_BADGE[result.response?.vertical] || 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                {result.category}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate mt-1">{result.reason}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{result.latency_ms}ms</span>
                        {result.passed
                            ? <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-sm" />
                            : <XCircle className="w-6 h-6 text-rose-500 drop-shadow-sm" />
                        }
                    </div>
                </div>
            </div>

            {open && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        {result.response?.risk_level && (
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Risk Level</p>
                                <p className="text-slate-900 dark:text-white font-mono font-bold">{result.response.risk_level} ({result.response.risk_score}/100)</p>
                            </div>
                        )}
                        {result.response?.auth_status && (
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Auth Status</p>
                                <p className="text-slate-900 dark:text-white font-mono font-bold">{result.response.auth_status}</p>
                            </div>
                        )}
                        {result.response?.compliance_status && (
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Compliance</p>
                                <p className="text-slate-900 dark:text-white font-mono font-bold">{result.response.compliance_status}</p>
                            </div>
                        )}
                        {result.response?.access_granted != null && (
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Access</p>
                                <p className={`font-mono font-black ${result.response.access_granted ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                    {result.response.access_granted ? 'GRANTED' : 'DENIED'}
                                </p>
                            </div>
                        )}
                    </div>
                    {result.response?.remediation_suggested && (
                        <div className="mt-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-500/20 shadow-sm flex items-start gap-3">
                            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider mb-1">Remediation Suggested</p>
                                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 leading-relaxed">{result.response.remediation_suggested}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function RemediationConsole({ results }: { results: any[] }) {
    const failures = (results || []).filter(r => !r.passed)
    if (!failures.length) return (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-10 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-1">Zero Security Anomalies Detected</p>
            <p className="text-emerald-700/80 dark:text-emerald-400/80 text-sm font-medium">All benchmark trials passed successfully. No remediation required.</p>
        </div>
    )

    const REMEDIATION_MAP: Record<string, any[]> = {
        auth: [
            { icon: <ShieldAlert className="w-5 h-5" />, issue: 'Auth failures detected', action: 'enforce_adaptive_mfa', cmd: 'okta.enableAdaptiveMFA(affectedUsers)', auto: true },
            { icon: <AlertTriangle className="w-5 h-5" />, issue: 'Lockout policy misconfigured', action: 'reset_lockout_policy', cmd: 'okta.updateLockoutPolicy({ threshold: 3, window: 300 })', auto: true }
        ],
        rbac: [
            { icon: <Lock className="w-5 h-5" />, issue: 'RBAC policy gap', action: 'prune_excess_permissions', cmd: 'okta.updateAccessPolicy(userId, minPrivilege)', auto: false },
            { icon: <Activity className="w-5 h-5" />, issue: 'Time-based controls missing', action: 'add_time_restrictions', cmd: 'okta.applyTimePolicy(roles, BusinessHours)', auto: true }
        ],
        compliance: [
            { icon: <Cpu className="w-5 h-5" />, issue: 'Anomalies in audit trail', action: 'force_session_kill', cmd: 'okta.revokeUserSessions(flaggedUsers)', auto: true },
            { icon: <Eye className="w-5 h-5" />, issue: 'GDPR data access without consent', action: 'audit_consent_flags', cmd: 'gdpr.auditConsentFlags(lastNEvents=100)', auto: false }
        ]
    }

    const failedCats = Array.from(new Set(failures.map(f => f.category)))
    const remediations = failedCats.flatMap(c => REMEDIATION_MAP[c as string] || [])

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 animate-pulse" />
                <p className="text-sm font-bold text-rose-900 dark:text-rose-300">{failures.length} failing test{failures.length > 1 ? 's' : ''} detected — reviewing remediation protocols</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remediations.map((r, i) => (
                    <div key={i} className={`rounded-xl border shadow-sm p-5 transition-all hover:shadow-md ${r.auto ? 'border-sky-200 dark:border-sky-500/30 bg-white dark:bg-sky-500/10' : 'border-amber-200 dark:border-amber-500/30 bg-white dark:bg-amber-500/10'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-xl shrink-0 ${r.auto ? 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'}`}>
                                {r.icon}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate">{r.issue}</p>
                                    {r.auto && (
                                        <span className="text-[10px] font-black tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-500/30 shrink-0">AUTO-FIX</span>
                                    )}
                                </div>
                                <code className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg block mt-3 overflow-x-auto whitespace-nowrap">{r.cmd}</code>

                                <div className="mt-4 flex justify-end">
                                    <button className={`text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm ${r.auto ? 'bg-sky-600 hover:bg-sky-700 text-white hover:shadow-md' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'}`}>
                                        {r.auto ? '▶ Deploy Fix' : '📋 Review Log'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const MOCK_BENCHMARK_RESULTS = {
    pass_rate: 84.5,
    total_tasks: 25,
    passed_tasks: 21,
    failed_tasks: 4,
    execution_time_ms: 3450,
    timestamp: new Date().toISOString(),
    failures: [
        { task_id: 'SEC-004', category: 'Authentication', description: 'MFA prompt fatigue mitigation failed to trigger after 5 rapid requests.', severity: 'CRITICAL' },
        { task_id: 'SEC-012', category: 'RBAC', description: 'Cross-tenant privilege escalation allowed via leaked session token.', severity: 'HIGH' },
        { task_id: 'SEC-019', category: 'Compliance', description: 'PII (Social Security Number) logged in plaintext to application stdout.', severity: 'CRITICAL' },
        { task_id: 'SEC-022', category: 'Rate Limiting', description: 'Password reset endpoint vulnerable to enumeration attacks.', severity: 'MEDIUM' }
    ]
};

export default function BenchmarkDashboardPage() {
    const { benchmarks } = useMcpData()
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [running, setRunning] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [filterCat, setFilterCat] = useState('all')

    const refreshData = async () => {
        setLoading(true);
        // Simulate network delay to prove the UI loading state works
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData(MOCK_BENCHMARK_RESULTS);
        setLoading(false);
    };

    const runBenchmark = async () => {
        setRunning(true)
        setData(null)
        // Simulate a 3.5s benchmark audit run
        await new Promise((resolve) => setTimeout(resolve, 3500));
        setData({ ...MOCK_BENCHMARK_RESULTS, timestamp: new Date().toISOString() })
        setRunning(false)
    }

    useEffect(() => { refreshData() }, [])

    const passRate = data?.pass_rate || 0
    const riskScore = data ? Math.round((1 - passRate / 100) * 100) : 0

    const filteredResults = (data?.results || []).filter((r: any) => filterCat === 'all' || r.category === filterCat)

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">Identity Matrix Benchmark</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Continuous Security Posture Intelligence · Automated Validation</p>
                </div>
                <div className="flex items-center gap-4">
                    {data && (
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                            Last execution: {new Date(data.timestamp).toLocaleTimeString()}
                        </p>
                    )}
                    <button
                        onClick={runBenchmark}
                        disabled={running}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${running
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 shadow-md hover:shadow-lg hover:scale-[1.02]'
                            }`}
                    >
                        {running ? (
                            <>
                                <span className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-500 rounded-full animate-spin" />
                                Validating Matrix...
                            </>
                        ) : (
                            <>
                                <Shield className="w-4 h-4" />
                                Run Full Audit
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {loading && !data ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 dark:border-slate-800 dark:border-t-white rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Synchronizing with Protocol Hub...</p>
                    </div>
                ) : data ? (
                    <>
                        {/* Top stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* Risk gauge */}
                            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center justify-center bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <RiskGauge score={riskScore} />
                            </div>

                            {/* Overall pass rate */}
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center text-center">
                                <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Overall Pass Rate</p>
                                <p className={`text-5xl font-black tracking-tighter mb-2 ${passRate >= 70 ? 'text-emerald-500 drop-shadow-sm' : passRate >= 40 ? 'text-amber-500 drop-shadow-sm' : 'text-rose-500 drop-shadow-sm'}`}>
                                    {passRate}%
                                </p>
                                <p className="text-sm font-medium text-slate-500">{data.passed} passing / {data.total_tasks} total tasks</p>
                            </div>

                            {/* Category cards */}
                            {Object.entries(data.by_category || {}).map(([cat, stats]: [string, any]) => {
                                const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META] || CATEGORY_META.auth
                                return (
                                    <div key={cat} className={`rounded-2xl shadow-sm border p-6 flex flex-col justify-center bg-white dark:bg-slate-900/50 ${meta.border} transition-colors hover:border-slate-400 dark:hover:border-slate-600`}>
                                        <div className="flex items-center gap-2 mb-3 justify-center text-slate-600 dark:text-slate-400">
                                            {meta.icon}
                                            <p className="text-[11px] font-black uppercase tracking-widest">{meta.label}</p>
                                        </div>
                                        <p className={`text-center text-4xl font-black tracking-tighter mb-2 ${stats.pass_rate >= 70 ? 'text-emerald-500 drop-shadow-sm' : stats.pass_rate >= 40 ? 'text-amber-500 drop-shadow-sm' : 'text-rose-500 drop-shadow-sm'}`}>
                                            {stats.pass_rate}%
                                        </p>
                                        <p className="text-center text-sm font-medium text-slate-500">{stats.passed}/{stats.total} verified</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Risk summary banner */}
                        <div className={`rounded-xl border shadow-sm px-6 py-4 flex items-center gap-3 ${passRate >= 70
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300'
                            : passRate >= 40
                                ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300'
                                : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300'
                            }`}>
                            {passRate >= 70 ? <ShieldCheck className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
                            <span className="text-sm font-bold tracking-wide">{data.risk_summary}</span>
                        </div>

                        {/* Pass rate bars */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(data.by_category || {}).map(([cat, stats]: [string, any]) => {
                                const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META] || CATEGORY_META.auth
                                return (
                                    <div key={cat} className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6 space-y-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${meta.bg} ${meta.text}`}>
                                                {meta.icon}
                                            </div>
                                            <p className="font-bold text-slate-900 dark:text-slate-100">{meta.label}</p>
                                        </div>
                                        <PassRateBar rate={stats.pass_rate} label={`${stats.passed}/${stats.total} Tasks Passing`} />
                                        {(stats.total - stats.passed) > 0 && (
                                            <p className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-3 py-2 rounded-lg inline-block shadow-inner border border-rose-100 dark:border-rose-900/50">
                                                🚨 {stats.total - stats.passed} critical failures require intervention
                                            </p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Tab navigation */}
                        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
                            {[
                                { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
                                { id: 'results', label: 'Task Execution Logs', icon: <FileText className="w-4 h-4" /> },
                                { id: 'remediation', label: 'Remediation Engine', icon: <Shield className="w-4 h-4" /> }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-3 text-sm font-bold capitalize transition-all border-b-2 -mb-px flex items-center gap-2 ${activeTab === tab.id
                                        ? 'border-black text-black dark:border-white dark:text-white'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-700'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="pt-2">
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6 lg:p-8">
                                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-slate-400" />
                                            Runtime Telemetry
                                        </h3>
                                        <div className="space-y-4 text-sm font-medium">
                                            {[
                                                { label: 'Evaluation Trace ID', value: data.run_id },
                                                { label: 'Execution Timestamp', value: new Date(data.timestamp).toLocaleString() },
                                                { label: 'Total Scenarios', value: data.total_tasks },
                                                { label: 'Successful Bypasses / Validations', value: data.passed, c: 'text-emerald-600 dark:text-emerald-400 font-bold' },
                                                { label: 'Anomalies Detected', value: data.failed, c: data.failed > 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-500' },
                                                { label: 'System Integrity Score', value: `${data.pass_rate}%`, c: passRate >= 70 ? 'text-emerald-600 dark:text-emerald-400 font-black text-lg' : 'text-amber-600 dark:text-amber-400 font-black text-lg' }
                                            ].map(({ label, value, c = 'text-slate-900 dark:text-slate-200 font-mono' }) => (
                                                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                                                    <span className={c}>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6 lg:p-8">
                                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-slate-400" />
                                            Protocol Verification Standards
                                        </h3>
                                        <div className="space-y-4 text-sm font-medium">
                                            {[
                                                { check: passRate >= 30 && passRate <= 70, label: 'Discriminative difficulty variance (30-70% acceptable margin)', pass: passRate >= 30 && passRate <= 70 },
                                                { check: data.failed > 0, label: 'Negative control verification (anomalies proven to trigger failures)', pass: data.failed > 0 },
                                                { check: data.by_category?.auth?.pass_rate > 0, label: 'Authentication sub-routine integrity', pass: data.by_category?.auth?.pass_rate > 0 },
                                                { check: data.by_category?.rbac?.pass_rate > 0, label: 'Role-based access matrix evaluation', pass: data.by_category?.rbac?.pass_rate > 0 },
                                                { check: data.by_category?.compliance?.pass_rate > 0, label: 'Cryptographic compliance audit', pass: data.by_category?.compliance?.pass_rate > 0 }
                                            ].map((item, i) => (
                                                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${item.pass ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/10' : 'bg-rose-50/50 border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/10'}`}>
                                                    <span className={`shrink-0 mt-0.5 ${item.pass ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {item.pass ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                                    </span>
                                                    <span className={item.pass ? 'text-slate-700 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'}>{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'results' && (
                                <div className="space-y-4 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2 pb-6 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest shrink-0">Filter Vector:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['all', 'auth', 'rbac', 'compliance'].map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFilterCat(cat)}
                                                    className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border transition-all ${filterCat === cat
                                                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md'
                                                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600'
                                                        }`}
                                                >
                                                    {cat === 'all' ? 'All Matrices' : CATEGORY_META[cat as keyof typeof CATEGORY_META]?.label}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 sm:ml-auto bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">{filteredResults.length} execution logs</span>
                                    </div>
                                    <div className="space-y-3">
                                        {filteredResults.map((r: any, i: number) => <TaskResultRow key={r.task_id} result={r} />)}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'remediation' && (
                                <div className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6 lg:p-8">
                                    <RemediationConsole results={data.results} />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                            <Shield className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-900 dark:text-white font-bold text-xl mb-2">Matrix Off-Grid</p>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm text-center">No benchmark payload data acquired. Protocol hub requires initialization.</p>
                        <button onClick={runBenchmark} className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl text-sm font-bold hover:scale-[1.02] shadow-xl transition-transform flex items-center gap-2 tracking-wide">
                            <Activity className="w-4 h-4" />
                            Ignite First Benchmark Sequence
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
                <McpBenchmarks benchmarks={benchmarks} />
            </div>
        </div>
    )
}
