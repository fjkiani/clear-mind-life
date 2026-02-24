'use client'

import { useState } from 'react'

export default function InsuranceAuthPage() {
    const [isRunning, setIsRunning] = useState(false)
    const [progress, setProgress] = useState(0)
    const [mockData, setMockData] = useState([
        { id: 'PAT-8X9L2', payer: 'Blue Cross Shield', type: 'Prior Auth (MRI)', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
        { id: 'PAT-4M1K9', payer: 'Medicare Part B', type: 'Eligibility', status: 'Active', statusColor: 'bg-green-100 text-green-800' },
        { id: 'PAT-7Y2P4', payer: 'Aetna PPO', type: 'Eligibility', status: 'Denied', statusColor: 'bg-red-100 text-red-800' }
    ])

    const handleRunVerification = () => {
        setIsRunning(true)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setIsRunning(false)
                    // Update mock data to simulate completion
                    setMockData([
                        { id: 'PAT-8X9L2', payer: 'Blue Cross Shield', type: 'Prior Auth (MRI)', status: 'Approved', statusColor: 'bg-green-100 text-green-800' },
                        { id: 'PAT-4M1K9', payer: 'Medicare Part B', type: 'Eligibility', status: 'Active', statusColor: 'bg-green-100 text-green-800' },
                        { id: 'PAT-7Y2P4', payer: 'Aetna PPO', type: 'Eligibility', status: 'Denied', statusColor: 'bg-red-100 text-red-800' },
                        { id: 'PAT-9K3L1', payer: 'UnitedHealthcare', type: 'Eligibility', status: 'Active', statusColor: 'bg-green-100 text-green-800' }
                    ])
                    return 100
                }
                return p + 20
            })
        }, 300)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6 lg:p-10">
            <div className="max-w-5xl w-full mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="bg-violet-100 text-violet-600 p-2 rounded-xl">💳</span>
                            Insurance & Authorization
                        </h1>
                        <p className="mt-2 text-lg text-gray-600 font-medium">
                            Automated FHIR Coverage Verification & Prior Auth Orchestration
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold shadow-sm flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${isRunning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                            {isRunning ? 'Agent Processing...' : 'Agent Active'}
                        </span>
                        <button
                            onClick={handleRunVerification}
                            disabled={isRunning}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
                        >
                            {isRunning ? `Verifying (${progress}%)...` : 'Run Verification Batch'}
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isRunning && <div className="absolute inset-0 bg-blue-50/50 animate-pulse"></div>}
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Eligibility Checks</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Real-time FHIR queries to determine active coverage, deductibles, and co-pays instantly.
                            </p>
                            <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isRunning ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                                &gt; {isRunning ? 'QUERYING_PAYERS...' : 'FHIR_COVERAGE_READY'}
                            </div>
                        </div>
                    </div>

                    {/* Status Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {isRunning && progress > 40 && <div className="absolute inset-0 bg-rose-50/50 animate-pulse"></div>}
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-2xl mb-4">🔐</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Prior Authorization</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Automated detection of CPT codes requiring auth, triggering dynamic submission workflows.
                            </p>
                            <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md inline-block ${isRunning && progress > 40 ? 'bg-yellow-50 text-yellow-600' : 'bg-rose-50 text-rose-600'}`}>
                                &gt; {isRunning && progress > 40 ? 'SUBMITTING_AUTH...' : 'CPT_RULES_SYNCED'}
                            </div>
                        </div>
                    </div>

                    {/* Status Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-4">💰</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Claims & Billing</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Coordination of benefits processing and out-of-pocket estimations for patient transparency.
                        </p>
                        <div className="text-xs font-mono font-bold text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-md">
                            &gt; ESTIMATOR_ONLINE
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table Placeholder */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Verifications {isRunning && <span className="inline-block ml-3 w-4 h-4 rounded-full border-2 border-violet-600 border-t-transparent animate-spin"></span>}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold rounded-tl-xl">Patient ID</th>
                                    <th className="px-6 py-4 font-bold">Payer</th>
                                    <th className="px-6 py-4 font-bold">Request Type</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold rounded-tr-xl text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockData.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-gray-900">{row.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{row.payer}</td>
                                        <td className="px-6 py-4">{row.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.statusColor}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-violet-600 hover:text-violet-800 font-bold transition-colors">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

