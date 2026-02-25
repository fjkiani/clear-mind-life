"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, RefreshCw, AlertTriangle, CheckCircle2, DollarSign, BrainCircuit, Play } from 'lucide-react'

type Claim = {
    id: string
    patient: string
    payer: string
    amount: number
    status: 'pending' | 'scanning' | 'flagged' | 'cleared'
    codes: string[]
    issue?: string
    fix?: string
    confidence?: number
}

export default function BillingSimulator() {
    const [pipelineActive, setPipelineActive] = useState(false)

    const [claims, setClaims] = useState<Claim[]>([
        { id: 'CLM-9011', patient: 'Michael R.', payer: 'Aetna', amount: 350.00, status: 'pending', codes: ['99214', 'M54.50'] },
        { id: 'CLM-9012', patient: 'Sarah J.', payer: 'BCBS', amount: 125.00, status: 'pending', codes: ['99213', 'R07.9'] },
        { id: 'CLM-9013', patient: 'David W.', payer: 'UHC', amount: 850.00, status: 'pending', codes: ['99215', 'G2211', 'M54.32'] },
    ])

    const [activeLogs, setActiveLogs] = useState<string[]>([])
    const [scanComplete, setScanComplete] = useState(false)

    const runPipeline = () => {
        setPipelineActive(true)
        setScanComplete(false)
        setActiveLogs([])

        // Reset claims to scanning
        setClaims(prev => prev.map(c => ({ ...c, status: 'scanning' })))

        const steps = [
            { log: "> Establishing 277CA Secure Connection...", delay: 500 },
            { log: "> Loading Payer Rulesets (UHC, BCBS, Aetna)", delay: 1200 },
            { log: "$ BATCH_01: Processing 3 Claims...", delay: 2000 },
        ]

        let currentDelay = 0
        steps.forEach(({ log, delay }) => {
            currentDelay += delay
            setTimeout(() => setActiveLogs(prev => [...prev, log]), currentDelay)
        })

        // Simulate Claim 1 (Clear)
        setTimeout(() => {
            setActiveLogs(prev => [...prev, "  ✓ [CLM-9011] Aetna ruleset passed. No NCCI edits triggered."])
            setClaims(prev => prev.map(c => c.id === 'CLM-9011' ? { ...c, status: 'cleared' } : c))
        }, currentDelay + 1500)

        // Simulate Claim 2 (Clear)
        setTimeout(() => {
            setActiveLogs(prev => [...prev, "  ✓ [CLM-9012] BCBS ruleset passed. Diagnosis aligns with CPT."])
            setClaims(prev => prev.map(c => c.id === 'CLM-9012' ? { ...c, status: 'cleared' } : c))
        }, currentDelay + 2500)

        // Simulate Claim 3 (Flagged)
        setTimeout(() => {
            setActiveLogs(prev => [...prev, "  ! [CLM-9013] UHC LCD Violation Detected: G2211 invalid with modifier 25 modifier absent."])
            setClaims(prev => prev.map(c => c.id === 'CLM-9013' ? {
                ...c,
                status: 'flagged',
                issue: 'UHC LCD Policy prohibits G2211 without Modifier 25 on primary E/M.',
                fix: 'Append Modifier 25 to 99215.',
                confidence: 98.4
            } : c))
        }, currentDelay + 4000)

        setTimeout(() => {
            setActiveLogs(prev => [...prev, "$ BATCH_01: Scan Complete. 1 Anomaly Detected."])
            setScanComplete(true)
        }, currentDelay + 5000)
    }

    const applyFix = (id: string) => {
        setClaims(prev => prev.map(c => {
            if (c.id === id) {
                return { ...c, status: 'cleared', codes: ['99215-25', 'G2211', 'M54.32'], issue: undefined, fix: undefined }
            }
            return c
        }))
        setActiveLogs(prev => [...prev, `> [${id}] Auto-Correction Applied via AI Agent.`])
    }

    const reset = () => {
        setPipelineActive(false)
        setScanComplete(false)
        setActiveLogs([])
        setClaims([
            { id: 'CLM-9011', patient: 'Michael R.', payer: 'Aetna', amount: 350.00, status: 'pending', codes: ['99214', 'M54.50'] },
            { id: 'CLM-9012', patient: 'Sarah J.', payer: 'BCBS', amount: 125.00, status: 'pending', codes: ['99213', 'R07.9'] },
            { id: 'CLM-9013', patient: 'David W.', payer: 'UHC', amount: 850.00, status: 'pending', codes: ['99215', 'G2211', 'M54.32'] },
        ])
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <BrainCircuit className="w-6 h-6 text-violet-600" />
                        Autonomous Billing Engine
                    </h2>
                    <p className="text-gray-500 mt-1">Predictive Denial Scoring & Automated 837 Claim Scrubbing</p>
                </div>
                <div className="flex gap-2">
                    {!pipelineActive ? (
                        <button
                            onClick={runPipeline}
                            className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <Play className="w-4 h-4" />
                            Run AI Claim Scrubber
                        </button>
                    ) : (
                        <button
                            onClick={reset}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reset Queue
                        </button>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Left Column: Command Center UI (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Queue Value</span>
                            <span className="text-2xl font-black text-gray-900 flex items-center">
                                $1,325<span className="text-sm font-medium text-gray-400 ml-1">.00</span>
                            </span>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Pass Rate</span>
                            <span className="text-2xl font-black text-emerald-600">
                                {scanComplete ? '66%' : '--'}
                            </span>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Risk Prevented</span>
                            <span className="text-2xl font-black text-violet-600">
                                {scanComplete ? '$850' : '--'}
                            </span>
                        </div>
                    </div>

                    {/* Claims Queue */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-grow">
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Outbound 837 Batch</h3>
                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">{claims.length} Claims</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            <AnimatePresence mode="popLayout">
                                {claims.map((claim) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={claim.id}
                                        className={`p-6 transition-colors ${claim.status === 'flagged' ? 'bg-rose-50/50' : 'bg-white'}`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${claim.status === 'pending' ? 'bg-gray-100 text-gray-500' :
                                                        claim.status === 'scanning' ? 'bg-violet-100 text-violet-600' :
                                                            claim.status === 'flagged' ? 'bg-rose-100 text-rose-600' :
                                                                'bg-emerald-100 text-emerald-600'
                                                    }`}>
                                                    {claim.status === 'pending' && <FileDown className="w-5 h-5" />}
                                                    {claim.status === 'scanning' && <RefreshCw className="w-5 h-5 animate-spin" />}
                                                    {claim.status === 'flagged' && <AlertTriangle className="w-5 h-5" />}
                                                    {claim.status === 'cleared' && <CheckCircle2 className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-900">{claim.id}</span>
                                                        <span className="text-gray-400 text-sm px-2 py-0.5 rounded border border-gray-200">{claim.payer}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-0.5">{claim.patient}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-black text-lg text-gray-900">${claim.amount.toFixed(2)}</span>
                                                <div className="flex gap-1 justify-end mt-1">
                                                    {claim.codes.map(c => (
                                                        <span key={c} className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Predictive AI Intervention UI */}
                                        {claim.status === 'flagged' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-4 bg-white border border-rose-200 rounded-xl p-4 shadow-sm"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1"><BrainCircuit className="w-5 h-5 text-rose-500" /></div>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider">Predictive Denial Alert</h4>
                                                            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                                                                {claim.confidence}% Confidence
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-rose-800 mb-3">{claim.issue}</p>

                                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                                                            <div>
                                                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Recommended Action</span>
                                                                <p className="text-sm font-medium text-gray-900">{claim.fix}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => applyFix(claim.id)}
                                                                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                                                            >
                                                                Tap to Apply Fix
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Column: Rule Engine Logging (4 cols) */}
                <div className="lg:col-span-4 flex flex-col">
                    <div className="bg-[#0D1117] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col h-[500px] font-mono text-sm relative">
                        <div className="bg-[#161B22] border-b border-gray-800 flex items-center px-4 py-3 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                            </div>
                            <span className="ml-3 text-gray-400 text-xs">zeta-engine@billing: ~/rules/lcd-stream</span>
                        </div>

                        <div className="p-4 flex-grow overflow-y-auto">
                            {activeLogs.length === 0 ? (
                                <div className="text-gray-600 flex items-center h-full justify-center opacity-50 text-center">
                                    <p>Waiting for batch... <br /> Press <span className="bg-gray-800 px-1 rounded text-gray-400">Run AI Claim Scrubber</span></p>
                                </div>
                            ) : (
                                <div className="space-y-2 pb-8">
                                    <AnimatePresence>
                                        {activeLogs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`${log.includes('!') ? 'text-rose-400' :
                                                        log.includes('✓') ? 'text-emerald-400' :
                                                            log.includes('$') ? 'text-violet-400 font-bold' :
                                                                'text-gray-400'
                                                    }`}
                                            >
                                                {log}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {pipelineActive && !scanComplete && (
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

                    {/* Context Widget */}
                    <div className="mt-4 bg-violet-50 border border-violet-100 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-violet-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" /> ROI Calculator
                        </h4>
                        <p className="text-xs text-violet-600 leading-relaxed font-medium">
                            This single intervention on CLM-9013 recovered $850.00 that would have otherwise taken 45 days in A/R and 3 hours of manual staff rework.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
