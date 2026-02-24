import FilterButton from '@/components/dashboard/dropdown-filter'
import Datepicker from '@/components/dashboard/datepicker'
import Link from 'next/link'
import { Shield, Activity, Video, Users, Stethoscope, Lock, FileText, Bot } from 'lucide-react'

export const metadata = {
    title: 'Clear Mind Life Protocol - Command Center',
}

export default function Dashboard() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-bold flex items-center gap-3">
                        <Activity className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                        Clear Mind Life Command Center
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Unified matrix for Healthcare Operations, Identity Intelligence, and LLM Copilots</p>
                </div>
                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <Datepicker align="right" />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Healthcare & Telehealth Hub */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Stethoscope className="w-6 h-6 text-indigo-500" />
                                Healthcare Hub
                            </h2>
                            <span className="text-xs font-bold uppercase tracking-widest bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-3 py-1 rounded-full">
                                AI Accelerated
                            </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Link href="/dashboard/healthcare/telehealth" className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:shadow-md">
                                <div className="bg-indigo-100 dark:bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600 dark:text-indigo-400">
                                    <Video className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Telehealth Co-Pilot</h3>
                                <p className="text-xs font-medium text-slate-500">Video SDK rooms with real-time AssemblyAI transcription & GPT-4o Action Reports.</p>
                            </Link>

                            <Link href="/dashboard/healthcare/appointments" className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 transition-all hover:shadow-md">
                                <div className="bg-sky-100 dark:bg-sky-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors text-sky-600 dark:text-sky-400">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">NexHealth Appointments</h3>
                                <p className="text-xs font-medium text-slate-500">Live booking integration with NexHealth API MCP server capabilities.</p>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Bot className="w-5 h-5 text-emerald-500" />
                                Recent AI Transcriptions
                            </h2>
                        </div>
                        <div className="text-sm font-medium text-slate-500 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-8 text-center border-dashed">
                            Navigate to <b>Telehealth Co-Pilot</b> to initiate a video session. The LLM transcriptions will appear in real-time.
                        </div>
                    </div>
                </div>

                {/* Security & Identity Hub */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Shield className="w-6 h-6 text-rose-500" />
                                Identity & Security Matrix
                            </h2>
                            <span className="text-xs font-bold uppercase tracking-widest bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 px-3 py-1 rounded-full">
                                Adaptive Threat Radar
                            </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Link href="/dashboard/security/benchmark" className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 transition-all hover:shadow-md">
                                <div className="bg-rose-100 dark:bg-rose-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors text-rose-600 dark:text-rose-400">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Identity Benchmark</h3>
                                <p className="text-xs font-medium text-slate-500">Live test suite evaluating Auth, RBAC, and HIPAA compliance policies.</p>
                            </Link>

                            <Link href="/dashboard/security/audits" className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all hover:shadow-md">
                                <div className="bg-orange-100 dark:bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors text-orange-600 dark:text-orange-400">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Threat Remediation</h3>
                                <p className="text-xs font-medium text-slate-500">Automated okta auto-fixes for detected misconfigurations and stale sessions.</p>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 dark:bg-rose-500/5 blur-3xl rounded-full"></div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-slate-500" />
                            Live Matrix Telemetry
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {[
                                { title: 'Auth Service', status: 'Optimal', load: '12ms ping', ok: true },
                                { title: 'MCP Sandbox', status: 'Secured', load: '0 rogue queries', ok: true },
                                { title: 'HIPAA Boundaries', status: 'Verified', load: 'AES-256 Active', ok: true }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                    <div>
                                        <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{s.title}</p>
                                        <p className="text-xs font-medium text-slate-400">{s.load}</p>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded">
                                        {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
