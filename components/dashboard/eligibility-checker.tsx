"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ShieldCheck, CreditCard, ChevronRight, FileText, CheckCircle2 } from 'lucide-react'

export default function EligibilityChecker() {
    const [step, setStep] = useState<0 | 1 | 2>(0)

    type LogEntry = { text: string; delay: number; class: string }
    const [logs, setLogs] = useState<LogEntry[]>([])

    const startSimulation = () => {
        setStep(1)
        setLogs([])

        const sequence = [
            { text: "$ INITIATING X12_270_ELIGIBILITY_REQUEST", delay: 100, class: "text-violet-400" },
            { text: "> Assembling FHIR Patient Resource...", delay: 400, class: "text-gray-400" },
            { text: "> Encrypting payload via AES-256 TLS 1.3", delay: 800, class: "text-gray-400" },
            { text: "> Transmitting to Availity Clearinghouse", delay: 1200, class: "text-gray-400" },
            { text: "ISA*00*          *00*          *ZZ*AV09311993     *ZZ*PAYERID        *260224*1435*^*00501*000000001*0*P*:", delay: 1500, class: "text-gray-500 font-mono text-xs" },
            { text: "GS*HS*AV09311993*PAYERID*20260224*1435*1*X*005010X279A1", delay: 1700, class: "text-gray-500 font-mono text-xs" },
            { text: "ST*270*0001*005010X279A1", delay: 1900, class: "text-gray-500 font-mono text-xs" },
            { text: "... AWAITING 271 RESPONSE ...", delay: 2800, class: "text-amber-400 animate-pulse" },
            { text: "$ RECEIVED X12_271_ELIGIBILITY_RESPONSE", delay: 4000, class: "text-emerald-400" },
            { text: "> Parsing EDI segments to FHIR Coverage...", delay: 4200, class: "text-gray-400" },
            { text: "EB*1*IND*30**25.00", delay: 4500, class: "text-emerald-500/70 font-mono text-xs" },
            { text: "$ COVERAGE_STATUS = ACTIVE", delay: 4800, class: "text-emerald-400 font-bold" },
            { text: "$ COPAY_DETECTED = $25.00", delay: 5100, class: "text-emerald-400 font-bold" },
            { text: "$ DEDUCTIBLE_MET = TRUE", delay: 5400, class: "text-emerald-400 font-bold" },
        ]

        let currentDelay = 0
        sequence.forEach((item) => {
            currentDelay += item.delay
            setTimeout(() => {
                setLogs(prev => [...prev, item])
            }, currentDelay)
        })

        setTimeout(() => setStep(2), currentDelay + 800)
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-violet-600" />
                        Autonomous Receptionist Engine
                    </h2>
                    <p className="text-gray-500 mt-1">Live X12 270/271 Eligibility Validation via Clearinghouse</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">Availity EDI</span>
                    <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">FHIR R4</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Left Column: Patient Intake UI */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">SJ</div>
                        <div>
                            <p className="font-bold text-gray-900">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">Scheduled: Today @ 2:30 PM (Follow-up)</p>
                        </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-center">
                        {step === 0 && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-violet-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Check-In Required</h3>
                                <p className="text-gray-500 text-sm mb-6">Patient has arrived. System requires insurance eligibility validation before rendering services.</p>
                                <button
                                    onClick={startSimulation}
                                    className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Run AI Eligibility Check
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="text-center py-8">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                                    <Activity className="absolute inset-0 m-auto w-8 h-8 text-violet-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Agent Handshake Active</h3>
                                <p className="text-gray-500 text-sm">Orchestrating EDI exchange with payer...</p>
                            </div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full border-b border-l border-emerald-500/20"></div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        <h3 className="font-bold text-emerald-900 text-lg">Clear to Proceed</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                                            <span className="text-sm text-emerald-800">Coverage Status</span>
                                            <span className="text-sm font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200">ACTIVE</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                                            <span className="text-sm text-emerald-800">Payer</span>
                                            <span className="text-sm font-bold text-emerald-900">BlueCross BlueShield</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                                            <span className="text-sm text-emerald-800">Prior Auth Required?</span>
                                            <span className="text-sm font-bold text-emerald-900">NO</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-xl p-5 text-white flex items-center justify-between shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-800 rounded-lg">
                                            <CreditCard className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Patient Owes Today</p>
                                            <p className="text-2xl font-black">$25.00 <span className="text-sm text-gray-500 font-medium">(Copay)</span></p>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors">
                                        Collect Payment
                                    </button>
                                </div>

                                <button
                                    onClick={() => setStep(0)}
                                    className="w-full text-center text-sm text-gray-500 hover:text-gray-900 font-medium pt-2 transition-colors"
                                >
                                    Reset Simulation
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Column: Terminal Logging */}
                <div className="bg-[#0D1117] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col font-mono text-sm relative">
                    <div className="bg-[#161B22] border-b border-gray-800 flex items-center px-4 py-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="ml-3 text-gray-400 text-xs">zeta-engine@receptionist: ~/x12/stream</span>
                    </div>

                    <div className="p-5 flex-grow overflow-y-auto max-h-[400px]">
                        {step === 0 ? (
                            <div className="text-gray-600 flex items-center h-full justify-center opacity-50">
                                <p>Waiting for workflow trigger...</p>
                            </div>
                        ) : (
                            <div className="space-y-2 pb-4">
                                <AnimatePresence>
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={log.class}
                                        >
                                            {log.text}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {step === 1 && (
                                    <motion.div
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="w-2 h-4 bg-gray-400 mt-2"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0D1117] to-transparent pointer-events-none"></div>
                </div>

            </div>
        </div>
    )
}
