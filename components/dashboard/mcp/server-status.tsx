import React from 'react'
import { McpServer } from './use-mcp-data'

export default function ServerStatusGrid({ servers }: { servers: McpServer[] }) {
    if (!servers?.length) return null

    const statusBadge = (s: string) => {
        switch (s) {
            case 'connected': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
            case 'disconnected': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-500/30'
            case 'error': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30'
            case 'testing': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30'
            default: return 'bg-slate-100 text-slate-700 border-slate-200'
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servers.map((s, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg 
                                ${s.status === 'connected' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-50 text-slate-500 dark:bg-slate-500/20 dark:text-slate-400'}`}>
                                {s.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">{s.name}</h4>
                                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${statusBadge(s.status)} uppercase tracking-widest`}>
                                    {s.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                        <div>
                            <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Available Tools</p>
                            <div className="flex flex-wrap gap-2">
                                {s.tools.slice(0, 5).map((t, idx) => (
                                    <span key={idx} className="text-[13px] bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-100 px-3 py-1 rounded-lg font-mono font-bold border border-slate-200 dark:border-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95">
                                        {t.name || t}
                                    </span>
                                ))}
                                {s.tools.length > 5 && (
                                    <span className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-400 px-2 py-1 rounded-lg font-bold border border-slate-200 dark:border-slate-700">
                                        +{s.tools.length - 5}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm pt-2">
                            <span className="text-slate-500 font-bold uppercase tracking-tight">Node Integrity</span>
                            <div className="flex items-center gap-3 font-black">
                                <span className="text-emerald-500 dark:text-emerald-400 drop-shadow-sm">{s.testsPassed || 0} ✓</span>
                                <span className="text-red-500 dark:text-red-400 drop-shadow-sm">{s.testsFailed || 0} ✗</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
