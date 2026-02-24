'use client'

import React from 'react'
import { useMcpData } from '@/components/dashboard/mcp/use-mcp-data'
import McpMetricsCards from '@/components/dashboard/mcp/mcp-metrics'
import ServerStatusGrid from '@/components/dashboard/mcp/server-status'
import SystemLogs from '@/components/dashboard/mcp/system-logs'
import McpBenchmarks from '@/components/dashboard/mcp/mcp-benchmarks'

export default function McpDashboardPage() {
    const { servers, metrics, logs, benchmarks, loading, error } = useMcpData()

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">Establishing secure link to Model Context Protocol (MCP) Hub...</p>
            </div>
        )
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">

            {/* Header */}
            <div className="sm:flex sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                            MCP Protocol Hub
                        </h1>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-500/30">
                            ● Live Telemetry
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Real-time metrics, node status, and test coverage across the agentic network
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-sm">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm focus:ring-4 focus:ring-blue-500/20">
                        ▶ Run Node Diagnostics
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-red-600 dark:text-red-400 font-bold">⚠️ Connection Issue:</span>
                    <span className="text-red-700 dark:text-red-300 text-sm">{error} Falling back to simulated cache.</span>
                </div>
            )}

            {/* Metrics Dashboard */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-blue-500">📊</span> Global Analytics
                </h2>
                <McpMetricsCards metrics={metrics} />
            </div>

            {/* Server Status Grid */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-violet-500">⚡</span> Node Status Matrix
                </h2>
                <ServerStatusGrid servers={servers} />
            </div>

            {/* Benchmark Matrix */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-amber-500">🛡️</span> Multi-App Benchmark Matrix
                </h2>
                <McpBenchmarks benchmarks={benchmarks} />
            </div>

            {/* Logs Console */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-emerald-500">📋</span> Centralized Telemetry Stream
                </h2>
                <SystemLogs logs={logs} />
            </div>
        </div>
    )
}
