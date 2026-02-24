import React from 'react'
import { McpMetrics } from './use-mcp-data'

export default function McpMetricsCards({ metrics }: { metrics: McpMetrics | null }) {
    if (!metrics) return null

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sprint Overview */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Sprint</p>
                    <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{metrics.currentSprint}</p>
                    <p className="text-sm font-medium text-slate-400">Next: {metrics.nextSprint}</p>
                </div>

                {/* Overall Pass Rate */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Pass Rate</p>
                    <p className={`text-3xl font-extrabold ${metrics.passRate >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {metrics.passRate}%
                    </p>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${metrics.passRate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${metrics.passRate}%` }} />
                    </div>
                </div>

                {/* Tasks Completed */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasks Complete</p>
                    <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                        {metrics.tasksCompleted} <span className="text-lg text-slate-400 font-medium">/ {metrics.tasksTotal}</span>
                    </p>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${metrics.tasksProgress}%` }} />
                    </div>
                </div>

                {/* Servers Connected */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identity APIs Tested</p>
                    <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                        {metrics.serversTested} <span className="text-lg text-slate-400 font-medium">/ {metrics.serversTotal}</span>
                    </p>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500" style={{ width: `${metrics.serversProgress}%` }} />
                    </div>
                </div>
            </div>

            {/* Priorities */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Sprint Priorities</h3>
                    <span className="text-xs font-medium text-slate-500">Updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {metrics.priorities.map((p, i) => (
                        <div key={i} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${p.status === 'completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                                    {p.status === 'completed' ? '✓' : '▶'}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-100">{p.name}</p>
                                    <p className="text-sm text-slate-500 capitalize">{p.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 sm:w-64">
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-500 font-medium">{p.completed} / {p.tasks} tasks</span>
                                        <span className="text-slate-700 dark:text-slate-300 font-bold">{Math.round((p.completed / p.tasks) * 100)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${(p.completed / p.tasks) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
