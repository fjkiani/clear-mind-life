'use client'

import { useState, useRef, useEffect } from 'react'
import { VERTICAL_CONFIG, TOOL_ICONS, URGENCY_STYLES, DOCTORS } from '@/config/healthcare'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

// ─── Timeline trace: animated step-by-step (not raw JSON) ────────────────────
function AgentTimeline({ actions }: { actions: any[] }) {
    if (!actions?.length) return null
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Agent Execution Trace
            </h3>
            <div className="relative pl-5">
                {/* Vertical line */}
                <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200"></div>
                {actions.map((action, i) => (
                    <div key={i} className="relative mb-6 last:mb-0" style={{ animationDelay: `${i * 120}ms` }}>
                        {/* Dot */}
                        <div className={`absolute -left-3.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white ${action.success ? 'border-green-500' : 'border-red-500'}`}></div>
                        <div className="bg-white hover:bg-gray-50 transition-colors rounded-xl px-5 py-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-xl bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border border-gray-100">{(TOOL_ICONS as any)[action.tool] || TOOL_ICONS.default}</span>
                                <span className="text-sm font-bold text-gray-900">
                                    {action.tool.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                </span>
                                <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${action.success
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {action.success ? '✓ Success' : '✗ Failed'}
                                </span>
                            </div>
                            {/* Human-readable result summary */}
                            {action.result && (
                                <p className="text-sm text-gray-600 mt-3 pl-13 leading-relaxed border-t border-gray-100 pt-3">
                                    {summarizeResult(action.tool, action.result)}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function summarizeResult(tool: string, result: any): string {
    if (!result) return ''
    if (tool === 'triage_patient') return `Urgency: ${result.urgency || 'assessed'} → ${result.specialty || 'routed'}`
    if (tool === 'check_provider_availability') return `Found ${result.slots?.length || 'available'} slots with ${result.provider?.name || 'provider'}`
    if (tool === 'book_appointment') return `Appointment ${result.appointment_id || ''} confirmed at ${result.start_time || 'scheduled time'}`
    if (tool === 'create_telehealth_room') return `Room ${result.room_id || ''} ready — video link generated`
    if (tool === 'send_confirmation_sms') return result.sent ? 'SMS confirmation delivered to patient' : 'SMS delivery pending'
    if (result.message) return result.message
    return JSON.stringify(result).slice(0, 80) + '...'
}

// ─── Structured Appointment Card ──────────────────────────────────────────────
function AppointmentResultCard({ response, vertical, onJoinVideo }: { response: any; vertical: string; onJoinVideo: (url: string) => void }) {
    const config = (VERTICAL_CONFIG as any)[vertical]
    const doctor = DOCTORS.find(d => d.vertical === vertical) || DOCTORS[0]

    if (!response) return null

    return (
        <div className={`rounded-2xl border ${config.border} ${config.cardBg} overflow-hidden`}>
            {/* Card header: status + agent message */}
            <div className="px-5 pt-5 pb-4">
                {/* Status badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    {response.urgency && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${(URGENCY_STYLES as any)[response.urgency] || ''}`}>
                            {response.urgency === 'EMERGENT' ? '🚨' : response.urgency === 'URGENT' ? '⚠️' : '✅'} {response.urgency}
                        </span>
                    )}
                    {response.booking_confirmed && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                            ✅ Appointment Booked
                        </span>
                    )}
                    {response.sms_sent && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            📱 SMS Sent
                        </span>
                    )}
                </div>
                {/* Agent message */}
                <p className="text-gray-800 leading-relaxed text-sm">{response.message}</p>
            </div>

            {/* Appointment details */}
            {response.appointment_id && (
                <div className="mx-5 mb-4 bg-gray-100/80 rounded-xl border border-gray-200 overflow-hidden">
                    {/* Doctor row */}
                    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-200 bg-white">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${doctor.color} flex items-center justify-center text-gray-900 font-bold text-lg shrink-0 shadow-sm`}>
                            {doctor.name.split(' ')[1][0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-bold text-gray-900">{doctor.name}</p>
                            <p className="text-sm font-medium text-gray-500">{doctor.specialty}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Appointment ID</p>
                            <p className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded shadow-sm border border-gray-200 inline-block">{response.appointment_id}</p>
                        </div>
                    </div>

                    {/* Detail grid */}
                    <div className="grid grid-cols-3 divide-x divide-gray-200 bg-white">
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</p>
                            <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">✓ Confirmed</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</p>
                            <span className="text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 inline-block">
                                {vertical === 'psychiatric_telehealth' ? '📹 Telehealth' : '🏥 In-Person'}
                            </span>
                        </div>
                        <div className="px-5 py-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SMS</p>
                            <span className={`text-sm font-bold px-3 py-1.5 rounded-full border inline-block ${response.sms_sent ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>{response.sms_sent ? '📱 Sent' : '⏳ Pending'}</span>
                        </div>
                    </div>

                    {/* Video session button */}
                    {response.video_patient_link && (
                        <div className="px-6 py-5 border-t border-gray-200 bg-violet-50/50">
                            <div className="mb-4">
                                <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Telehealth Session Ready
                                </p>
                                <p className="text-sm text-gray-600 mt-1">Your secure video room has been provisioned. Click below to consult with your provider.</p>
                            </div>
                            <button
                                onClick={() => onJoinVideo(response.video_patient_link)}
                                className={`w-full py-4 rounded-xl font-bold text-base transition-all bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 shadow-md flex items-center justify-center gap-2 border border-black/5`}
                            >
                                <span className="text-xl">📹</span>
                                Join Telehealth Session
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Footer: navigation links */}
            <div className="border-t border-gray-200 px-6 py-4 flex gap-4 bg-gray-50">
                <Link href="/dashboard/healthcare/appointments" className="text-sm font-bold text-gray-600 hover:text-violet-700 transition-colors">
                    View All Appointments →
                </Link>
                <Link href="/dashboard/healthcare/book" className="text-sm font-bold text-gray-600 hover:text-violet-700 transition-colors">
                    Book Another →
                </Link>
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AgentHubPage() {
    const [vertical, setVertical] = useState('psychiatric_telehealth')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [apiHealth, setApiHealth] = useState<any>(null)
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const config = (VERTICAL_CONFIG as any)[vertical]

    useEffect(() => {
        fetch(`${API_BASE}/api/v1/agent/health`)
            .then(r => r.json())
            .then(data => setApiHealth(data))
            .catch(() => setApiHealth(null))
    }, [])

    const handleSubmit = async () => {
        if (!message.trim() || loading) return
        setLoading(true)
        setError(null)
        setResponse(null)
        try {
            const res = await fetch(`${API_BASE}/api/v1/agent/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message.trim(),
                    vertical,
                    patient_id: 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
                    patient_phone: '+15551234567',
                    patient_name: 'Demo Patient',
                }),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.detail || `HTTP ${res.status}`)
            }
            setResponse(await res.json())
        } catch (e: any) {
            setError(e.message)
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

    return (
        <div className="min-h-[calc(100vh-64px)] bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6 mx-4 mb-4">
            {/* ── Header ── */}
            <div className="border-b border-gray-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Healthcare AI Receptionist</h1>
                    <p className="text-sm text-gray-500">Real workflows. Real APIs. End-to-end automation.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* API Health dots */}
                    {apiHealth && (
                        <div className="flex items-center gap-1.5 text-xs">
                            {[
                                { key: 'nexhealth_configured', label: 'NexHealth' },
                                { key: 'videosdk_configured', label: 'VideoSDK' },
                                { key: 'twilio_configured', label: 'Twilio' },
                                { key: 'openai_configured', label: 'OpenAI' },
                            ].map(({ key, label }) => (
                                <span key={key} className={`px-2 py-0.5 rounded-full ${apiHealth[key] ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/40 text-gray-500'}`}>
                                    {apiHealth[key] ? '●' : '○'} {label}
                                </span>
                            ))}
                            {apiHealth.mock_mode && <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">⚠ Mock</span>}
                        </div>
                    )}
                    {/* Nav links */}
                    <div className="flex gap-2">
                        <Link href="/dashboard/healthcare/register" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-violet-300 text-xs font-medium text-gray-600 hover:text-violet-700 transition-colors">
                            + Register Patient
                        </Link>
                        <Link href="/dashboard/healthcare/appointments" className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-violet-300 text-xs font-medium text-gray-600 hover:text-violet-700 transition-colors">
                            View Schedule
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* ── Left: Vertical + Scenarios ── */}
                <div className="xl:col-span-2 space-y-5">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Vertical</p>
                        {Object.entries(VERTICAL_CONFIG).map(([key, cfg]: [string, any]) => (
                            <button
                                key={key}
                                onClick={() => { setVertical(key); setResponse(null); setError(null); setMessage('') }}
                                className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-semibold text-base ${vertical === key
                                    ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-lg scale-[1.02]`
                                    : 'border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 bg-white shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {cfg.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Scenarios</p>
                        {config.scenarios.map((scenario: string, i: number) => (
                            <button
                                key={i}
                                onClick={() => handleScenario(scenario)}
                                className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all leading-relaxed ${message === scenario
                                    ? `${config.border} ${config.badge}`
                                    : 'border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 bg-white shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {scenario.slice(0, 85)}...
                            </button>
                        ))}
                    </div>

                    {/* Quick links to related pages */}
                    <div className="border border-gray-200 shadow-sm rounded-2xl bg-white p-6 space-y-3">
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</p>
                        <Link href="/dashboard/healthcare/book" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                            <span className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl">📅</span>
                            Book Appointment
                        </Link>
                        <Link href="/dashboard/healthcare/register" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                            <span className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🧑‍⚕️</span>
                            Register New Patient
                        </Link>
                        <Link href="/dashboard/healthcare/appointments" className="flex items-center gap-3 text-base font-bold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition-colors py-2 px-3 -mx-3">
                            <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">📋</span>
                            Manage Appointments
                        </Link>
                    </div>

                    {/* Timeline Trace - Prominently displayed here when available! */}
                    {response?.actions && (
                        <div className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-4">
                            <AgentTimeline actions={response.actions} />
                        </div>
                    )}
                </div>

                {/* ── Right: Chat + Response ── */}
                <div className="xl:col-span-3 space-y-5">
                    {activeVideoUrl ? (
                        <div className="rounded-2xl border border-indigo-500/50 bg-gray-900 overflow-hidden shadow-2xl flex flex-col h-[600px]">
                            <div className="bg-white border border-gray-200 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Live Telehealth Session
                                </span>
                                <button
                                    onClick={() => setActiveVideoUrl(null)}
                                    className="text-xs font-semibold px-3 py-1 bg-gray-700 hover:bg-red-600 text-white rounded transition-colors"
                                >
                                    End Call
                                </button>
                            </div>
                            <iframe
                                src={activeVideoUrl}
                                allow="camera; microphone; fullscreen; speaker; display-capture"
                                className="w-full flex-1 border-none"
                                title="VideoSDK Room"
                            />
                        </div>
                    ) : (
                        <>
                            <div className={`rounded-xl border ${config.border} bg-gray-50/80 p-4 space-y-3`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge} border`}>
                                        {config.label}
                                    </div>
                                </div>
                                <textarea
                                    ref={textareaRef}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit() }}
                                    placeholder="Describe what the patient is experiencing... (⌘+Enter to submit)"
                                    rows={4}
                                    className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!message.trim() || loading}
                                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${loading || !message.trim()
                                        ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                        : `bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 shadow-lg`
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Agent running...
                                        </span>
                                    ) : 'Run Agent →'}
                                </button>
                            </div>

                            {error && (
                                <div className="rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-3 text-sm text-red-300">
                                    <span className="font-semibold">Error: </span>{error}
                                </div>
                            )}

                            {response && (
                                <AppointmentResultCard
                                    response={response}
                                    vertical={vertical}
                                    onJoinVideo={setActiveVideoUrl}
                                />
                            )}

                            {!loading && !response && !error && (
                                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                                        <p className="text-4xl">🏥</p>
                                    </div>
                                    <p className="text-gray-900 font-bold text-xl">AI-Powered Triage</p>
                                    <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">Select a scenario or describe the patient's situation. The agent will triage, find a provider, book, and send confirmation.</p>
                                    <div className="flex gap-4 justify-center pt-4">
                                        <Link href="/dashboard/healthcare/book" className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-violet-300 text-sm font-bold text-gray-700 hover:text-violet-700 transition-colors shadow-sm">
                                            Browse Doctors
                                        </Link>
                                        <Link href="/dashboard/healthcare/register" className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-violet-300 text-sm font-bold text-gray-700 hover:text-violet-700 transition-colors shadow-sm">
                                            Register Patient
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
