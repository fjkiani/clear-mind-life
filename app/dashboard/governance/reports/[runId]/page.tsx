"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ShieldCheck, ArrowLeft, CheckCircle2, XCircle, AlertTriangle,
    Clock, ChevronDown, ChevronUp, Layers, BarChart3
} from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_GOVERNANCE_API_URL || 'http://localhost:8001'

interface LevelScores {
    L1_syntax: number | null
    L2_resilience: number | null
    L3_protocol: number | null
    L4_objective: number | null
}

interface TaskDetail {
    task: string
    category: string
    level: string
    passed: boolean
    score: number | null
    error: string | null
}

interface Report {
    run_id: string
    agent: string
    domain: string
    grade: string
    overall_score: number
    level_scores: LevelScores
    total_tasks: number
    completed_tasks: number
    task_results: TaskDetail[]
}

function GradeBadge({ grade }: { grade: string }) {
    const config: Record<string, { color: string; bg: string; border: string }> = {
        CERTIFIED: { color: 'text-emerald-400', bg: 'bg-emerald-900/40', border: 'border-emerald-700' },
        CONDITIONAL: { color: 'text-amber-400', bg: 'bg-amber-900/40', border: 'border-amber-700' },
        FAILED: { color: 'text-rose-400', bg: 'bg-rose-900/40', border: 'border-rose-700' },
        INCONCLUSIVE: { color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-600' },
    }
    const c = config[grade] || config.INCONCLUSIVE
    return (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black border ${c.bg} ${c.color} ${c.border}`}>
            {grade === 'CERTIFIED' && <CheckCircle2 className="w-4 h-4" />}
            {grade === 'FAILED' && <XCircle className="w-4 h-4" />}
            {grade === 'CONDITIONAL' && <AlertTriangle className="w-4 h-4" />}
            {grade === 'INCONCLUSIVE' && <Clock className="w-4 h-4" />}
            {grade}
        </span>
    )
}

function ScoreBar({ label, score, weight }: { label: string; score: number | null; weight: string }) {
    const val = score ?? 0
    const color = val >= 80 ? 'bg-emerald-500' : val >= 60 ? 'bg-amber-500' : 'bg-rose-500'
    return (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="flex justify-between items-baseline mb-3">
                <div>
                    <span className="text-sm font-black text-white">{label}</span>
                    <span className="text-xs text-slate-500 ml-2">({weight})</span>
                </div>
                <span className="text-2xl font-black text-white tabular-nums">{val}%</span>
            </div>
            <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${val}%` }} />
            </div>
        </div>
    )
}

export default function ReportDetail() {
    const params = useParams()
    const router = useRouter()
    const runId = params?.runId as string

    const [report, setReport] = useState<Report | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [expandedLevel, setExpandedLevel] = useState<string | null>(null)

    useEffect(() => {
        if (!runId) return
        fetch(`${API_BASE}/api/v1/governance/certify/${runId}/report`)
            .then(r => {
                if (!r.ok) throw new Error(`${r.status}: ${r.statusText}`)
                return r.json()
            })
            .then(setReport)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [runId])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <div className="w-10 h-10 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
            </div>
        )
    }

    if (error || !report) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white gap-4">
                <XCircle className="w-12 h-12 text-rose-400" />
                <p className="font-bold">Report not found</p>
                <p className="text-slate-500 text-sm">{error}</p>
                <Link href="/dashboard/governance" className="text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back to Command Center
                </Link>
            </div>
        )
    }

    const tasksByLevel = ['L1', 'L2', 'L3', 'L4'].reduce<Record<string, TaskDetail[]>>((acc, level) => {
        acc[level] = report.task_results.filter(t => t.level === level)
        return acc
    }, {})

    const levelLabels: Record<string, { name: string; weight: string; key: keyof LevelScores }> = {
        L1: { name: 'Syntax & Tool Mastery', weight: '25%', key: 'L1_syntax' },
        L2: { name: 'Execution Resilience', weight: '25%', key: 'L2_resilience' },
        L3: { name: 'Protocol Adherence', weight: '30%', key: 'L3_protocol' },
        L4: { name: 'End-to-End Objective', weight: '20%', key: 'L4_objective' },
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white font-inter">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/50 px-8 py-4">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                    <Link href="/dashboard/governance" className="text-slate-500 hover:text-violet-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <ShieldCheck className="w-6 h-6 text-violet-400" />
                    <div>
                        <h1 className="text-base font-black text-white">Certification Report</h1>
                        <p className="text-xs text-slate-500 font-mono">{report.run_id}</p>
                    </div>
                    <div className="ml-auto">
                        <GradeBadge grade={report.grade} />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
                {/* Agent + Score Summary */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Agent</p>
                        <p className="text-xl font-black text-white font-mono">{report.agent}</p>
                        <p className="text-sm text-slate-500 mt-1">Domain: <span className="text-slate-300 font-mono">{report.domain}</span></p>
                        <p className="text-sm text-slate-500 mt-1">
                            Tasks: <span className="text-slate-300">{report.completed_tasks}/{report.total_tasks} passed</span>
                        </p>
                    </div>
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
                        <div className="text-6xl font-black text-white tabular-nums mb-2">{report.overall_score}%</div>
                        <GradeBadge grade={report.grade} />
                        <p className="text-xs text-slate-600 mt-3">
                            Weighted across L1–L4 levels
                        </p>
                    </div>
                </div>

                {/* Level Breakdown */}
                <div>
                    <h2 className="text-base font-black text-white mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-violet-400" />
                        Level Breakdown
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['L1', 'L2', 'L3', 'L4'].map((level) => {
                            const info = levelLabels[level]
                            const score = report.level_scores[info.key]
                            return (
                                <ScoreBar
                                    key={level}
                                    label={`${level} — ${info.name}`}
                                    score={score}
                                    weight={info.weight}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Per-Task Results */}
                <div>
                    <h2 className="text-base font-black text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-sky-400" />
                        Task Results by Level
                    </h2>
                    <div className="space-y-3">
                        {['L1', 'L2', 'L3', 'L4'].map((level) => {
                            const tasks = tasksByLevel[level] || []
                            const passed = tasks.filter(t => t.passed).length
                            const isOpen = expandedLevel === level
                            return (
                                <div key={level} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedLevel(isOpen ? null : level)}
                                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-black text-violet-400 font-mono">{level}</span>
                                            <span className="text-sm font-bold text-slate-300">{levelLabels[level].name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-mono text-slate-400">{passed}/{tasks.length}</span>
                                            <span className={`text-sm font-black ${passed / tasks.length >= 0.8 ? 'text-emerald-400' : passed / tasks.length >= 0.6 ? 'text-amber-400' : 'text-rose-400'}`}>
                                                {tasks.length > 0 ? Math.round(100 * passed / tasks.length) : 0}%
                                            </span>
                                            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                        </div>
                                    </button>
                                    {isOpen && tasks.length > 0 && (
                                        <div className="border-t border-slate-800 max-h-64 overflow-y-auto">
                                            {tasks.map((task, i) => (
                                                <div key={i} className={`flex items-start gap-3 px-5 py-3 border-b border-slate-800/50 last:border-0 ${!task.passed ? 'bg-rose-950/10' : ''}`}>
                                                    {task.passed
                                                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                        : <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                                    }
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-mono text-slate-400 truncate">{task.task}</p>
                                                        {task.error && (
                                                            <p className="text-xs text-rose-400 mt-1 font-mono">{task.error}</p>
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-500 flex-shrink-0">{task.category}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
