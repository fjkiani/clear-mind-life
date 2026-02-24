'use client'

import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

const ATTACK_SCENARIOS = [
    { label: 'JWT alg:none bypass', tier: 'T1', payload: { jwt_token: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyXzEyMyIsInJvbGUiOiJhZG1pbiJ9.' } },
    { label: 'Impossible travel', tier: 'T1', payload: { token_id: 'reused_token_abc123', ip: '10.0.0.5', prev_ip: '8.8.8.8' } },
    { label: 'Role Escalation (Mass Assignment)', tier: 'T3', payload: { submitted_fields: { name: 'John', 'role': 'admin' }, allowed_fields: ['name', 'email'] } },
    { label: 'IDOR (Cross-Tenant)', tier: 'T3', payload: { requesting_user_id: 'user_tenant_A', target_resource_owner_id: 'user_tenant_B', target_resource_id: 'doc_123' } },
    { label: 'Token Scope Creep', tier: 'T5', payload: { token_scopes: ['read:profile', 'read:email'], requested_resource: 'financial_records' } },
    { label: 'Audit Log Injection (CRLF)', tier: 'T4', payload: { username: 'admin\\r\\n2024-01-15 AUDIT: user=root action=delete_all' } },
    { label: 'OAuth Redirect Hijack', tier: 'T2', payload: { redirect_uri: 'https://auth.zeta-corp.com.evil.com/callback', registered_domains: ['zeta-corp.com'] } },
    { label: 'MFA Push Fatigue', tier: 'T6', payload: { mfa_push_user_id: 'victim_user_123', _repeat_clicks: 4 } },
]

const SEV_STYLES: Record<string, string> = {
    CRITICAL: 'bg-red-500/20 text-red-300 border border-red-500/40',
    HIGH: 'bg-orange-500/20 text-orange-300 border border-orange-500/40',
    MEDIUM: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
    LOW: 'bg-gray-500/20 text-gray-300 border border-gray-500/40',
}

const ACTION_STYLES: Record<string, { className: string; label: string }> = {
    BLOCK_AND_ALERT: { className: 'bg-red-600 text-white font-black tracking-widest', label: '🔴 BLOCK & ALERT' },
    ALLOW: { className: 'bg-green-600 text-white font-black tracking-widest', label: '✅ ALLOW' },
    CHALLENGE_AND_LOG: { className: 'bg-yellow-600 text-white font-black tracking-widest', label: '⚠️ CHALLENGE MFA' },
    LOG_AND_MONITOR: { className: 'bg-blue-600 text-white font-black tracking-widest', label: '🔵 MONITOR' },
}

export default function ThreatScannerPage() {
    const [payload, setPayload] = useState('')
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleScenario = (scenario: typeof ATTACK_SCENARIOS[0], idx: number) => {
        setSelectedIdx(idx)
        setPayload(JSON.stringify(scenario.payload, null, 2))
        setResult(null)
        setError(null)
    }

    const handleScan = async () => {
        setScanning(true)
        setError(null)
        setResult(null)
        try {
            let parsed
            try { parsed = JSON.parse(payload) } catch { throw new Error('Invalid JSON payload format') }

            // Handle MFA Fatigue simulation which requires multiple identical requests hitting the state
            const requestsCount = parsed._repeat_clicks || 1;
            const purePayload = { ...parsed };
            delete purePayload._repeat_clicks;

            let res;
            for (let i = 0; i < requestsCount; i++) {
                res = await fetch(`${API_BASE}/api/v1/identity/threat/scan`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(purePayload)
                });
            }
            if (!res || !res.ok) {
                const e = res ? await res.json().catch(() => ({})) : {};
                throw new Error(e.detail || `HTTP Error`);
            }
            const data = await res.json();
            setResult(data)
        } catch (e: any) { setError(e.message) }
        finally { setScanning(false) }
    }

    const sortedThreats = result?.threats
        ? [...result.threats].sort((a: any, b: any) => ({ CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }[b.severity as string] || 0) - ({ CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }[a.severity as string] || 0))
        : []

    const actionStyle = result ? (ACTION_STYLES[result.recommended_action] || ACTION_STYLES.ALLOW) : null

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto text-gray-900">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Threat Detection Engine 🛡️</h1>
                <p className="text-gray-500 text-base">6-tier deterministic CVE scanner · JWT · OAuth · RBAC · Audit · Exfil</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Scenarios */}
                <div className="col-span-12 lg:col-span-4 space-y-3">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Attack Scenarios (CVE-mapped)</p>
                    {ATTACK_SCENARIOS.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleScenario(s, i)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all font-medium text-base shadow-sm hover:shadow-md ${selectedIdx === i
                                ? 'border-violet-400 bg-violet-50 text-violet-800 ring-1 ring-violet-400 scale-[1.02]'
                                : 'border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 bg-white'
                                }`}
                        >
                            <span className={`font-mono text-xs px-2 py-0.5 rounded mr-3 ${selectedIdx === i ? 'bg-violet-200 text-violet-800' : 'bg-gray-100 text-gray-500'}`}>{s.tier}</span>
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Scanner */}
                <div className="col-span-12 lg:col-span-8 space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                            Request Payload {selectedIdx !== null ? `— ${ATTACK_SCENARIOS[selectedIdx].label}` : ''}
                        </p>
                        <textarea
                            value={payload}
                            onChange={e => setPayload(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleScan() }}
                            placeholder={'{\n  "jwt_token": "...",\n  "ip": "...",\n  "username": "..."\n}'}
                            rows={10}
                            spellCheck={false}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-base text-green-400 font-mono placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-shadow shadow-inner leading-relaxed"
                        />
                        <button
                            onClick={handleScan}
                            disabled={!payload.trim() || scanning}
                            className={`w-full py-4 rounded-xl font-bold text-base transition-all ${scanning || !payload.trim()
                                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90 shadow-xl hover:scale-[1.02]'
                                }`}
                        >
                            {scanning ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Scanning 6 tiers...
                                </span>
                            ) : '🔴 Run Threat Scan  ⌘↵'}
                        </button>
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-3 text-sm text-red-300">
                            <span className="font-semibold">Error: </span>{error}
                        </div>
                    )}

                    {result && (
                        <div className="space-y-3">
                            <div className={`rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border ${result.clean ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div>
                                    <p className={`font-bold text-xl ${result.clean ? 'text-green-800' : 'text-red-800'}`}>
                                        {result.clean ? '✅ No threats detected' : `🚨 ${result.threats_found} threat${result.threats_found > 1 ? 's' : ''} detected`}
                                    </p>
                                    <p className={`text-sm mt-1 font-medium ${result.clean ? 'text-green-600' : 'text-red-600'}`}>Scanned at: {new Date(result.scanned_at).toLocaleTimeString()}</p>
                                </div>
                                {actionStyle && (
                                    <span className={`text-base font-bold px-5 py-2.5 rounded-xl shrink-0 shadow-sm ${actionStyle.className}`}>
                                        {actionStyle.label}
                                    </span>
                                )}
                            </div>
                            {sortedThreats.map((threat: any, i: number) => {
                                const sevStyle = threat.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border-red-200' : threat.severity === 'HIGH' ? 'bg-orange-100 text-orange-700 border-orange-200' : threat.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                                return (
                                    <div key={i} className={`rounded-2xl border bg-white shadow-sm p-6 space-y-4`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${sevStyle}`}>{threat.severity}</span>
                                            <span className="text-base font-bold text-gray-900">{threat.attack_class} {threat.cve ? `— ${threat.cve}` : ''}</span>
                                        </div>
                                        <p className="text-base text-gray-700 leading-relaxed font-medium">{threat.mitigation || threat.attacker_technique || 'Threat pattern detected.'}</p>

                                        {threat.evidence && (
                                            <pre className="text-sm text-gray-600 font-mono bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-auto shadow-inner">
                                                {JSON.stringify(threat.evidence, null, 2)}
                                            </pre>
                                        )}

                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {!result && !scanning && !error && (
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-4xl">
                                🔴
                            </div>
                            <p className="text-gray-900 font-bold text-xl">Select an attack scenario or paste a custom payload</p>
                            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">Checks JWT alg, OAuth flows, RBAC ownership, audit integrity, token scope, MFA fatigue, and zero-day patterns</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
