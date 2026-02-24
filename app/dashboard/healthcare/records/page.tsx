'use client'

import { useState } from 'react'

export default function PatientRecordsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [hasResults, setHasResults] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setIsSearching(true)
        setHasResults(false)

        setTimeout(() => {
            setIsSearching(false)
            setHasResults(true)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6 lg:p-10">
            <div className="max-w-5xl w-full mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="bg-violet-100 text-violet-600 p-2 rounded-xl">🏥</span>
                            Patient Records (FHIR)
                        </h1>
                        <p className="mt-2 text-lg text-gray-600 font-medium">
                            Synthesized Clinical Histories & R4 Interoperability
                        </p>
                    </div>
                </div>

                {/* Master Patient Index Search */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Master Patient Index (Name, DOB, or MRN)..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className={`px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center justify-center ${isSearching ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
                        >
                            {isSearching ? (
                                <><span className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-transparent animate-spin mr-2"></span> Synthesizing...</>
                            ) : (
                                'Query FHIR Network'
                            )}
                        </button>
                    </form>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isSearching && <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-500 animate-pulse"></div>}
                        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-2xl mb-4">⚕️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Longitudinal Context</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Aggregated view of diagnoses, allergies, and lab results across participating EHRs.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isSearching ? 'bg-teal-100 text-teal-700' : 'bg-teal-50 text-teal-600'}`}>
                            &gt; {isSearching ? 'QUERYING_ENDPOINTS...' : 'PATIENT_HISTORY_AI'}
                        </div>
                    </div>

                    {/* Status Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isSearching && <div className="absolute inset-x-0 bottom-0 h-1 bg-fuchsia-500 animate-pulse delay-75"></div>}
                        <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-xl flex items-center justify-center text-2xl mb-4">💊</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Medication Matrix</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Automated contraindication checks and adherence tracking mapped to ICD-10 codes.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isSearching ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-fuchsia-50 text-fuchsia-600'}`}>
                            &gt; {isSearching ? 'CHECKING_PBM...' : 'RX_VERIFIED'}
                        </div>
                    </div>

                    {/* Status Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isSearching && <div className="absolute inset-x-0 bottom-0 h-1 bg-sky-500 animate-pulse delay-150"></div>}
                        <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center text-2xl mb-4">📋</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Consent Directives</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Centralized HIPAA forms, release of information limits, and advance directives.
                        </p>
                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isSearching ? 'bg-sky-100 text-sky-700' : 'bg-sky-50 text-sky-600'}`}>
                            &gt; {isSearching ? 'VALIDATING_CONSENT...' : 'HIPAA_LOCKED'}
                        </div>
                    </div>
                </div>

                {/* Patient Summary & Documents */}
                {hasResults ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">JD</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{searchQuery || 'John Doe'}</h2>
                                    <p className="text-gray-500 font-medium">DOB: 05/14/1982 (43yo) • ID: PAT-8X9L2</p>
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-bold border border-green-200 text-sm inline-flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Identity Verified Match
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Active Conditions</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-gray-800 font-medium"><span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></span> Type 2 Diabetes (E11.9)</li>
                                    <li className="flex items-start gap-2 text-gray-800 font-medium"><span className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 shrink-0"></span> Hypertension (I10)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Current Meds</h4>
                                <ul className="space-y-2 text-gray-800 font-medium">
                                    <li className="flex items-center gap-2">💊 Metformin 500mg</li>
                                    <li className="flex items-center gap-2">💊 Lisinopril 10mg</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Allergies</h4>
                                <ul className="space-y-2 text-red-600 font-bold">
                                    <li className="flex items-center gap-2">⚠️ Penicillin (Severe)</li>
                                    <li className="flex items-center gap-2">⚠️ Latex (Mild)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Encounters</h4>
                                <ul className="space-y-2 text-sm text-gray-800 font-medium">
                                    <li><strong>Oct 12:</strong> Cardiology Follow-up</li>
                                    <li><strong>Sep 05:</strong> Telehealth Triage</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Synthesized Documents (FHIR)</h3>
                            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
                                <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">📄</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Continuity of Care Document (CCD)</p>
                                            <p className="text-xs text-gray-500 font-medium">Generated via Epic CareEverywhere • Today</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-bold text-violet-600 hover:text-violet-800">View R4 JSON</button>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">🔬</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Comprehensive Metabolic Panel</p>
                                            <p className="text-xs text-gray-500 font-medium">Quest Diagnostics • Oct 10, 2025</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-bold text-violet-600 hover:text-violet-800">View Results</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 text-gray-400">
                            🔍
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Patient Selected</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Query the network using an MRN or Patient Name to retrieve securely exchanged FHIR R4 documents and clinical histories.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
