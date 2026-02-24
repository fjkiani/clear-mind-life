'use client'

import { useState } from 'react'
import IdentityAgentHub from '@/components/dashboard/identity/IdentityAgentHub'
import AgentHubPage from '@/app/dashboard/healthcare/page'

export default function PlatformTabs() {
    const [activeTab, setActiveTab] = useState<'healthcare' | 'identity'>('healthcare')

    return (
        <div className="w-full">
            {/* Tab navigation */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center p-1 bg-gray-100 rounded-2xl border border-gray-200">
                    <button
                        onClick={() => setActiveTab('healthcare')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'healthcare'
                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        🩺 Healthcare Orchestration
                    </button>
                    <button
                        onClick={() => setActiveTab('identity')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'identity'
                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        🛡️ Zero-Trust Identity
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative border border-gray-200 rounded-3xl bg-white shadow-2xl shadow-gray-900/5 overflow-hidden">
                {/* Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-gradient-to-br from-violet-300 to-blue-300 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col">
                    {/* Top narrative row */}
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-white/50 backdrop-blur-sm">

                        {activeTab === 'healthcare' && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 max-w-5xl mx-auto text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Orchestrating the Complex</h3>
                                <div className="grid md:grid-cols-3 gap-6 text-left">
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm mb-3 border border-violet-200">1</div>
                                        <strong className="text-gray-900 block mb-1">Patient Intake</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">NLP maps demographics directly to FHIR standard formats.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm mb-3 border border-violet-200">2</div>
                                        <strong className="text-gray-900 block mb-1">Clinical Triage</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">Safety-critical reasoning pathways determine urgency and routing.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm mb-3 border border-violet-200">3</div>
                                        <strong className="text-gray-900 block mb-1">Execution Pipeline</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">NexHealth for bookings, Twilio for SMS, and VideoSDK for telehealth.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'identity' && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 max-w-5xl mx-auto text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Securing the Perimeter</h3>
                                <div className="grid md:grid-cols-3 gap-6 text-left">
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-3 border border-blue-200">1</div>
                                        <strong className="text-gray-900 block mb-1">MFA Defense</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">Dynamic risk scoring detects token replay attacks and MFA fatigue vectors.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-3 border border-blue-200">2</div>
                                        <strong className="text-gray-900 block mb-1">Continuous RBAC</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">Role escalations are caught and neutralized before mass assignments execute.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-3 border border-blue-200">3</div>
                                        <strong className="text-gray-900 block mb-1">Compliance Engine</strong>
                                        <p className="text-gray-600 text-sm leading-relaxed">On-demand SOC2 and HIPAA audit trails generated via natural language.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Bottom interactive row */}
                    <div className="bg-gray-50 relative h-[800px] overflow-hidden">
                        <div className="absolute inset-0 bg-white overflow-hidden shadow-inner">
                            {activeTab === 'healthcare' ? (
                                <div className="h-full w-full overflow-auto bg-gray-50">
                                    <AgentHubPage />
                                </div>
                            ) : (
                                <IdentityAgentHub />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
