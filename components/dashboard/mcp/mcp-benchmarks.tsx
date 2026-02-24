import React from 'react'
import { McpBenchmark } from './use-mcp-data'

export default function McpBenchmarks({ benchmarks }: { benchmarks: McpBenchmark[] }) {
    if (!benchmarks?.length) return null

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    🛡️ Multi-App Security Matrix
                </h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                    Live Evaluation
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-700/50">
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Application</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Test Scenario</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Latency</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {benchmarks.map((b, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400 font-bold">{b.id}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${b.app === 'identity' ? 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20' : 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'}`}>
                                        {b.app.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-xs font-semibold text-slate-500 capitalize">{b.category}</td>
                                <td className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">{b.label}</td>
                                <td className="px-5 py-3 text-xs font-mono text-slate-500 text-right">{b.latency_ms}ms</td>
                                <td className="px-5 py-3 text-center">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm border ${b.status === 'PASS' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30' : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30'}`}>
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
