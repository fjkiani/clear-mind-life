'use client'

import { useState, useRef, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

// ── Identity Verticals ─────────────────────────────────────────────────────
const VERTICAL_CONFIG: Record<string, {
    label: string
    icon: string
    color: string
    gradient: string
    cardBg: string
    border: string
    badge: string
    endpoint: string
    scenarios: string[]
}> = {
    mfa_auth: {
        label: 'MFA Authentication',
        icon: '🔐',
        color: 'violet',
        gradient: 'from-violet-600 to-purple-600',
        cardBg: 'bg-violet-50',
        border: 'border-violet-200',
        badge: 'bg-violet-100 text-violet-700 border border-violet-200',
        endpoint: '/api/v1/identity/agent/chat',
        scenarios: [
            "A user is logging in from both New York and London within 20 minutes. Flag this.",
            "Check whether user@acme.com has MFA enrolled and if their last session was from a trusted device.",
            "Run MFA bypass check — token replay attack pattern detected for user ID: usr_8x92k.",
            "Downgrade MFA from TOTP to SMS for user@corp.com — is this a security risk?"
        ]
    },
    rbac_engine: {
        label: 'RBAC Access Control',
        icon: '👤',
        color: 'blue',
        gradient: 'from-blue-600 to-cyan-600',
        cardBg: 'bg-blue-50',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700 border border-blue-200',
        endpoint: '/api/v1/identity/agent/chat',
        scenarios: [
            "User 'john.doe' is trying to access admin:billing but only has role:viewer. Is this escalation valid?",
            "Audit all users with role:admin who haven't logged in for 90 days — are their permissions stale?",
            "A PATCH request with role:admin in the JSON body just hit our API. Detect mass assignment.",
            "Map the full role inheritance chain for role:team_lead → role:editor → role:viewer."
        ]
    },
    compliance_audit: {
        label: 'Compliance Audit',
        icon: '📋',
        color: 'emerald',
        gradient: 'from-emerald-600 to-teal-600',
        cardBg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        endpoint: '/api/v1/identity/agent/chat',
        scenarios: [
            "Generate a SOC2 audit trail for all admin-level access in the last 30 days.",
            "GDPR right-to-erasure request for user@example.com — which systems have their data?",
            "A log entry was modified. Run integrity check on the audit trail for the last 24 hours.",
            "Which users have access to PII data but have not completed their annual security training?"
        ]
    }
}

const TOOL_ICONS: Record<string, string> = {
    scan_threats: '🛡️',
    check_mfa_status: '🔐',
    evaluate_rbac: '👤',
    audit_compliance: '📋',
    revoke_session: '🔴',
    patch_role: '✏️',
    generate_report: '📄',
    default: '⚙️'
}

// ── Sub-components ─────────────────────────────────────────────────────────
function ActionTrace({ actions }: { actions?: any[] }) {
    const [expanded, setExpanded] = useState<number | null>(null)
    if (!actions?.length) return null

    return (
        <div className="mt-5 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Agent Trace</p>
            {actions.map((action, i) => (
                <div
                    key={i}
                    className={`rounded-xl border transition-all cursor-pointer text-sm shadow-sm ${action.success
                        ? 'border-gray-200 bg-white hover:border-gray-300'
                        : 'border-red-200 bg-red-50 hover:border-red-300'
                        }`}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                >
                    <div className="flex items-center gap-3 px-4 py-3">
                        <span className="text-base">{TOOL_ICONS[action.tool] || TOOL_ICONS.default}</span>
                        <span className="text-sm font-mono font-medium text-gray-800 flex-1">{action.tool}</span>
                        <span className={`text-sm font-bold ${action.success ? 'text-green-600' : 'text-red-600'}`}>
                            {action.success ? '✓' : '✗'}
                        </span>
                        <span className="text-xs text-gray-400">{expanded === i ? '▲' : '▼'}</span>
                    </div>
                    {expanded === i && (
                        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                            <div>
                                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Args</p>
                                <pre className="text-xs text-gray-700 font-mono bg-gray-50 border border-gray-200 shadow-inner rounded-xl p-3 overflow-auto max-h-32">
                                    {JSON.stringify(action.args, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Result</p>
                                <pre className="text-xs text-gray-700 font-mono bg-gray-50 border border-gray-200 shadow-inner rounded-xl p-3 overflow-auto max-h-48">
                                    {JSON.stringify(action.result, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

function ResponseCard({ response, vertical }: { response: any; vertical: string }) {
    const config = VERTICAL_CONFIG[vertical]
    if (!response) return null

    const riskBadge =
        response.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' :
            response.risk_level === 'HIGH' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                response.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                    'bg-green-100 text-green-700 border border-green-200'

    return (
        <div className={`rounded-2xl border ${config.border} ${config.cardBg} p-6 shadow-sm space-y-5`}>
            {/* Status badges */}
            <div className="flex flex-wrap items-center gap-2">
                {response.risk_level && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${riskBadge}`}>
                        {response.risk_level} RISK
                    </span>
                )}
                {response.action_taken && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200 shadow-sm">
                        {response.action_taken}
                    </span>
                )}
                {response.compliant === true && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 shadow-sm">
                        ✅ Compliant
                    </span>
                )}
                {response.compliant === false && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 shadow-sm">
                        ❌ Non-Compliant
                    </span>
                )}
            </div>

            {/* Agent message */}
            <p className="text-gray-800 text-base leading-relaxed font-medium">{response.message}</p>

            {/* Recommendation block */}
            {response.recommendation && (
                <div className="bg-white/80 rounded-xl p-5 border border-white shadow-sm">
                    <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">Recommendation</p>
                    <p className="text-base text-gray-800 leading-relaxed font-medium">{response.recommendation}</p>
                </div>
            )}

            {/* Remediation code snippet */}
            {response.patch_command && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 shadow-inner">
                    <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wide">Auto-Remediation</p>
                    <pre className="text-sm font-mono text-green-400 overflow-auto">{response.patch_command}</pre>
                </div>
            )}

            {/* Action trace */}
            <ActionTrace actions={response.actions} />
        </div>
    )
}

// ── Threat stats sidebar ───────────────────────────────────────────────────
function ThreatStatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
    const lightColor = color.replace('-400', '-600')
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
            <p className={`text-3xl font-extrabold ${lightColor}`}>{value}</p>
            <p className="text-xs font-medium text-gray-400 mt-1">{sub}</p>
        </div>
    )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function IdentityAgentHub() {
    const [vertical, setVertical] = useState('mfa_auth')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [apiHealth, setApiHealth] = useState<any>(null)
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'agent'; text: string; response?: any }[]>([])
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    const config = VERTICAL_CONFIG[vertical]

    useEffect(() => {
        fetch(`${API_BASE}/api/v1/identity/agent/health`)
            .then(r => r.json())
            .then(data => setApiHealth(data))
            .catch(() => setApiHealth(null))
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, loading])

    const handleSubmit = async () => {
        if (!message.trim() || loading) return
        const userMsg = message.trim()
        setLoading(true)
        setError(null)
        setResponse(null)
        setMessage('')
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }])

        try {
            const res = await fetch(`${API_BASE}${config.endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    vertical,
                    context: 'identity_agent'
                })
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.detail || `HTTP ${res.status}`)
            }
            const data = await res.json()
            setResponse(data)
            setChatHistory(prev => [...prev, { role: 'agent', text: data.message, response: data }])
        } catch (e: any) {
            const errMsg = e.message
            setError(errMsg)
            setChatHistory(prev => [...prev, { role: 'agent', text: `Error: ${errMsg}` }])
        } finally {
            setLoading(false)
        }
    }

    const handleScenario = (text: string) => {
        setMessage(text)
        setResponse(null)
        setError(null)
        textareaRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
    }

    return (
        <div className="flex flex-col h-full min-h-0 bg-white text-gray-900 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 bg-white">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Identity Agent Hub 🛡️</h1>
                    <p className="text-sm text-gray-500">Ask in plain English. The agent enforces, audits, and remediates.</p>
                </div>
                <div className="flex items-center gap-2 text-xs flex-wrap">
                    {apiHealth ? (
                        <>
                            <span className={`px-2.5 py-1 rounded-full font-semibold border ${apiHealth.auth_configured ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                ● Auth Engine
                            </span>
                            <span className={`px-2.5 py-1 rounded-full font-semibold border ${apiHealth.rbac_configured ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                ● RBAC Engine
                            </span>
                            <span className={`px-2.5 py-1 rounded-full font-semibold border ${apiHealth.mock_mode ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                {apiHealth.mock_mode ? '⚠ Mock Mode' : '● Live'}
                            </span>
                        </>
                    ) : (
                        <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-500 border border-gray-200">Connecting...</span>
                    )}
                </div>
            </div>

            {/* ── Body ───────────────────────────────────────────────────────── */}
            <div className="flex flex-1 min-h-0 overflow-hidden">

                {/* Left column: verticals + scenarios */}
                <div className="w-80 shrink-0 border-r border-gray-100 bg-gray-50/50 flex flex-col overflow-y-auto p-5 space-y-6">

                    {/* Stats */}
                    <div className="space-y-2">
                        <ThreatStatCard label="Threats Blocked" value="2,847" sub="Last 30 days" color="text-red-600" />
                        <ThreatStatCard label="RBAC Violations" value="138" sub="Auto-remediated" color="text-yellow-600" />
                        <ThreatStatCard label="Compliance Score" value="98.2%" sub="SOC2 / GDPR ready" color="text-green-600" />
                    </div>

                    {/* Vertical selector */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Domain</p>
                        {Object.entries(VERTICAL_CONFIG).map(([key, cfg]) => (
                            <button
                                key={key}
                                onClick={() => { setVertical(key); setResponse(null); setError(null); setMessage('') }}
                                className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all font-bold text-sm flex items-center gap-3 ${vertical === key
                                    ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-md`
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 bg-white shadow-sm hover:shadow-md'
                                    }`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/20 shadow-sm ${vertical === key ? 'text-white' : 'bg-gray-100 text-gray-600'}`}>{cfg.icon}</span>
                                <span>{cfg.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Quick scenarios */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Scenarios</p>
                        {config.scenarios.map((scenario, i) => (
                            <button
                                key={i}
                                onClick={() => handleScenario(scenario)}
                                className={`w-full text-left text-xs px-4 py-3 rounded-xl border transition-all leading-relaxed font-medium ${message === scenario
                                    ? `${config.border} ${config.badge} shadow-sm`
                                    : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 bg-white shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {scenario.slice(0, 90)}…
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right column: chat thread + input */}
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-white">

                    {/* Chat thread */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                        {chatHistory.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100">
                                    <span className="text-4xl text-blue-500">🛡️</span>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900">Identity Agent ready.</p>
                                    <p className="text-sm text-gray-500 mt-2 max-w-sm">Select a domain, pick a scenario, or type a natural language command. The agent will enforce, audit, or remediate automatically.</p>
                                </div>
                            </div>
                        )}
                        {chatHistory.map((item, i) => (
                            <div key={i} className={item.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                                {item.role === 'user' ? (
                                    <div className={`max-w-[70%] bg-gradient-to-r ${config.gradient} text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm shadow-md font-medium`}>
                                        {item.text}
                                    </div>
                                ) : (
                                    <div className="max-w-[85%] space-y-3">
                                        {item.response ? (
                                            <ResponseCard response={item.response} vertical={vertical} />
                                        ) : (
                                            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-gray-800 leading-relaxed font-medium">
                                                {item.text}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-3">
                                    <span className="w-5 h-5 border-2 border-violet-500/20 border-t-violet-600 rounded-full animate-spin" />
                                    <span className="text-sm font-semibold text-gray-600">Agent processing…</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} className="h-4" />
                    </div>

                    {/* Input bar */}
                    <div className={`shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-5`}>
                        {error && (
                            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                                <span className="font-bold">⚠️ Error:</span> {error}
                            </div>
                        )}
                        <div className={`flex gap-3 items-center rounded-2xl border ${config.border} bg-white shadow-sm p-2.5 focus-within:ring-4 focus-within:ring-violet-500/10 focus-within:border-violet-300 transition-all`}>
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={`Ask the ${config.label} agent anything…`}
                                rows={1}
                                className="flex-1 bg-transparent px-3 py-2 text-base text-gray-900 placeholder-gray-400 resize-none focus:outline-none min-h-[44px]"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!message.trim() || loading}
                                className={`shrink-0 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${loading || !message.trim()
                                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                    : `bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 hover:shadow-md border border-transparent`
                                    }`}
                            >
                                {loading ? '…' : 'Send →'}
                            </button>
                        </div>
                        <p className="text-[11px] font-medium text-gray-400 mt-3 text-center tracking-wide uppercase">
                            ⌘+Enter to send · Connected to Clear Mind Life Engine on Port {process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL).port : '8001'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
