import { useState, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export interface McpServer {
    name: string
    status: 'connected' | 'disconnected' | 'error' | 'testing'
    tools: any[]
    testsPassed?: number
    testsFailed?: number
    lastTested?: string
}

export interface McpMetrics {
    currentSprint: string
    nextSprint: string
    passRate: number
    tasksCompleted: number
    tasksTotal: number
    tasksProgress: number
    serversTested: number
    serversTotal: number
    serversProgress: number
    priorities: any[]
    lastUpdated: string
}

export interface McpLog {
    timestamp: string
    level: 'info' | 'success' | 'warning' | 'error'
    message: string
    source: string
}

export interface McpBenchmark {
    id: string
    app: 'identity' | 'healthcare'
    category: string
    label: string
    status: 'PASS' | 'FAIL'
    latency_ms: number
}

export function useMcpData() {
    const [servers, setServers] = useState<McpServer[]>([])
    const [metrics, setMetrics] = useState<McpMetrics | null>(null)
    const [logs, setLogs] = useState<McpLog[]>([])
    const [benchmarks, setBenchmarks] = useState<McpBenchmark[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        const fetchData = async () => {
            try {
                // Try fetching from backend
                const [serversRes, metricsRes] = await Promise.all([
                    fetch(`${API_BASE}/api/v1/servers`).catch(() => null),
                    fetch(`${API_BASE}/api/v1/sprint/metrics`).catch(() => null)
                ])

                if (mounted) {
                    if (serversRes?.ok) {
                        const data = await serversRes.json()
                        setServers(data.apis || data || [])
                    } else {
                        // Fallback static servers
                        setServers([
                            { name: 'Identity Engine', status: 'connected', tools: ['mfa_auth', 'rbac_engine', 'compliance', 'audit_log'], testsPassed: 42, testsFailed: 0, lastTested: new Date().toISOString() },
                            { name: 'Healthcare Agent', status: 'connected', tools: ['send_hipaa_sms', 'make_voice_call', 'appointment_booking', 'patient_lookup', 'insurance_check'], testsPassed: 85, testsFailed: 1, lastTested: new Date().toISOString() },
                            { name: 'Threat Scanner', status: 'connected', tools: ['cve_scan', 'anomaly_detect'], testsPassed: 18, testsFailed: 0, lastTested: new Date().toISOString() },
                            { name: 'Legacy PBX', status: 'disconnected', tools: ['call_routing'], testsPassed: 0, testsFailed: 5, lastTested: new Date(Date.now() - 86400000).toISOString() }
                        ])
                    }

                    if (metricsRes?.ok) {
                        const data = await metricsRes.json()
                        setMetrics(data)
                    } else {
                        // Fallback static metrics
                        setMetrics({
                            currentSprint: 'Sprint 4',
                            nextSprint: 'Sprint 5',
                            passRate: 98.2,
                            tasksCompleted: 38,
                            tasksTotal: 40,
                            tasksProgress: 95.0,
                            serversTested: 3,
                            serversTotal: 4,
                            serversProgress: 75.0,
                            priorities: [
                                { id: 'p1', name: 'Identity Hub Integration', status: 'completed', tasks: 12, completed: 12 },
                                { id: 'p2', name: 'Healthcare Scheduler API', status: 'completed', tasks: 15, completed: 15 },
                                { id: 'p3', name: 'MCP Dashboard Migrations', status: 'pending', tasks: 13, completed: 11, remaining: 2 }
                            ],
                            lastUpdated: new Date().toISOString()
                        })
                    }

                    // Static mock logs
                    setLogs([
                        { timestamp: new Date().toLocaleTimeString(), level: 'info', message: 'MCP Hub dashboard initialized', source: 'client' },
                        { timestamp: new Date(Date.now() - 2000).toLocaleTimeString(), level: 'success', message: 'RBAC Engine tests passed (14/14)', source: 'test-runner' },
                        { timestamp: new Date(Date.now() - 4500).toLocaleTimeString(), level: 'warning', message: 'Legacy PBX connection timeout', source: 'health-monitor' },
                        { timestamp: new Date(Date.now() - 15000).toLocaleTimeString(), level: 'info', message: 'Identity MFA sync complete', source: 'identity-agent' },
                        { timestamp: new Date(Date.now() - 30000).toLocaleTimeString(), level: 'success', message: 'API Gateway metrics updated', source: 'system' }
                    ])

                    // Static mock benchmarks from both apps
                    setBenchmarks([
                        { id: 'ID-01', app: 'identity', category: 'auth', label: 'JWT alg:none protection', status: 'PASS', latency_ms: 245 },
                        { id: 'ID-02', app: 'identity', category: 'rbac', label: 'Cross-tenant IDOR leak', status: 'FAIL', latency_ms: 412 },
                        { id: 'HC-01', app: 'healthcare', category: 'hipaa', label: 'PHI access audit log', status: 'PASS', latency_ms: 188 },
                        { id: 'HC-02', app: 'healthcare', category: 'logic', label: 'Insurance claim validation', status: 'PASS', latency_ms: 310 },
                        { id: 'ID-03', app: 'identity', category: 'threat', label: 'MFA Fatigue Detection', status: 'PASS', latency_ms: 120 },
                        { id: 'HC-03', app: 'healthcare', category: 'scheduling', label: 'Conflict resolution latency', status: 'PASS', latency_ms: 540 }
                    ])

                    setLoading(false)
                }
            } catch (err: any) {
                if (mounted) {
                    setError('Failed to load MCP telemetry.')
                    setLoading(false)
                }
            }
        }

        fetchData()

        // Polling interval
        const interval = setInterval(fetchData, 15000)
        return () => {
            mounted = false
            clearInterval(interval)
        }
    }, [])

    return { servers, metrics, logs, benchmarks, loading, error }
}
