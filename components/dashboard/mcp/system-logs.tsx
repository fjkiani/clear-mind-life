import React from 'react'
import { McpLog } from './use-mcp-data'

export default function SystemLogs({ logs }: { logs: McpLog[] }) {
    if (!logs?.length) return null

    const logLevelColor = (level: string) => {
        switch (level) {
            case 'info': return 'text-blue-500 font-bold'
            case 'success': return 'text-emerald-500 font-bold'
            case 'warning': return 'text-amber-500 font-bold'
            case 'error': return 'text-red-500 font-bold'
            default: return 'text-slate-400'
        }
    }

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-inner overflow-hidden font-mono text-sm leading-relaxed">
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-emerald-500 animate-pulse">●</span>
                    <h3 className="font-bold text-slate-200">System Logs (Live)</h3>
                </div>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-700 hover:bg-red-500 transition-colors cursor-pointer" />
                    <span className="w-3 h-3 rounded-full bg-slate-700 hover:bg-amber-500 transition-colors cursor-pointer" />
                    <span className="w-3 h-3 rounded-full bg-slate-700 hover:bg-emerald-500 transition-colors cursor-pointer" />
                </div>
            </div>
            <div className="p-5 space-y-3 max-h-[400px] overflow-y-auto">
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 hover:bg-slate-800/50 -mx-5 px-5 py-1.5 transition-colors">
                        <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                        <span className={`w-20 shrink-0 uppercase tracking-widest ${logLevelColor(log.level)}`}>{log.level}</span>
                        <span className="text-slate-400 shrink-0 w-32 truncate">{log.source}</span>
                        <span className="text-slate-300 flex-1">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
