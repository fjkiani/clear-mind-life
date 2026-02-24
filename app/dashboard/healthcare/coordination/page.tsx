'use client'

import { useState, useEffect } from 'react'

export default function CareCoordinationPage() {
    const [events, setEvents] = useState<any[]>([])
    const [isListening, setIsListening] = useState(false)

    const handleStartCoordination = () => {
        setIsListening(true)
        setEvents([])

        const mockStream = [
            { id: 1, type: 'discharge', title: 'Hospital Discharge Detected', patient: 'PAT-8X9L2', detail: 'Transferred from ER to Home. Monitoring triggered.', time: 'Just now', icon: '🏥', color: 'emerald' },
            { id: 2, type: 'task', title: 'Follow-up Scheduled', patient: 'PAT-8X9L2', detail: 'Cardiology follow-up booked automatically for Friday at 9:00 AM.', time: '1 min ago', icon: '📅', color: 'blue' },
            { id: 3, type: 'comms', title: 'Discharge Summary Sent', patient: 'PAT-8X9L2', detail: 'HIPAA-compliant document sent via secure email portal.', time: '2 mins ago', icon: '🔒', color: 'indigo' },
            { id: 4, type: 'referral', title: 'Referral Loop Closed', patient: 'PAT-4M1K9', detail: 'Specialist note received and parsed. Added to longitudinal record.', time: '15 mins ago', icon: '✅', color: 'orange' }
        ]

        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex < mockStream.length) {
                setEvents(prev => [mockStream[currentIndex], ...prev])
                currentIndex++
            } else {
                clearInterval(interval)
                setIsListening(false)
            }
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6 lg:p-10">
            <div className="max-w-5xl w-full mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="bg-violet-100 text-violet-600 p-2 rounded-xl">🤝</span>
                            Care Coordination
                        </h1>
                        <p className="mt-2 text-lg text-gray-600 font-medium">
                            Multi-Channel Hospital-to-Home Orchestration & Follow-ups
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleStartCoordination}
                            disabled={isListening}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 ${isListening ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
                        >
                            {isListening ? (
                                <><span className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-transparent animate-spin"></span> Syncing HL7 Feed...</>
                            ) : (
                                'Initiate HL7 Sync'
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isListening && <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 animate-pulse"></div>}
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4">🏥</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Hospital Discharge</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Automated tracking of recent discharges and triggering of 7-day follow-up protocols.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isListening ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-50 text-emerald-600'}`}>
                            &gt; ADT_FEED_ACTIVE
                        </div>
                    </div>

                    {/* Status Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {events.length > 2 && <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 animate-pulse"></div>}
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4">📱</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Channel Comms</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            HIPAA-compliant SMS and Secure Email bridging between clinical staff and patients.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${events.length > 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-50 text-indigo-600'}`}>
                            &gt; TWILIO_SECURE_SYNC
                        </div>
                    </div>

                    {/* Status Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {events.length > 3 && <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-500 animate-pulse"></div>}
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-4">⚕️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Referral Management</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Closing the loop on specialist referrals and ensuring diagnostic results are received.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${events.length > 3 ? 'bg-orange-100 text-orange-700' : 'bg-orange-50 text-orange-600'}`}>
                            &gt; EHR_LOOP_CLOSED
                        </div>
                    </div>
                </div>

                {/* Workflow Visualization */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm min-h-[400px]">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                        Real-time Care Pathways
                        {isListening && <span className="text-sm font-medium text-emerald-600 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2"></span> Syncing</span>}
                    </h2>

                    {events.length === 0 ? (
                        <div className="h-[300px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 text-gray-400">
                                🔄
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Coordination Workflows</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Click "Initiate HL7 Sync" to simulate incoming discharge feeds and witness the agentic orchestration.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {events.map((event, i) => (
                                <div key={event.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 bg-${event.color}-100 text-${event.color}-600`}>
                                        {event.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-gray-900">{event.title}</h4>
                                            <span className="text-xs font-semibold text-gray-500">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono font-bold text-gray-700">{event.patient}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{event.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
