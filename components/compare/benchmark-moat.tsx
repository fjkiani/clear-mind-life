"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Activity, Terminal, AlertTriangle, ArrowRight, RefreshCw, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

const mockLogs = [
    { id: 1, trace: "ba6299bd", agent: "Receptionist", task: "Extract Copay from X12 271", status: "PASS", ms: 124 },
    { id: 2, trace: "c1bedfad", agent: "Encounter", task: "Detect 'suicidal ideation' in transcript", status: "PASS", ms: 89 },
    { id: 3, trace: "d044bed4", agent: "Billing", task: "Crosswalk J-code to expected NDC", status: "FAIL", ms: 412, issue: "Insufficient context in SOAP note" },
    { id: 4, trace: "8efc9825", agent: "Billing (Retrain)", task: "Crosswalk J-code to expected NDC", status: "PASS", ms: 156 },
    { id: 5, trace: "44b613a2", agent: "Receptionist", task: "Process Availity 278 Prior-Auth Rules", status: "PASS", ms: 210 },
]

export default function BenchmarkMoat() {
    const [visibleLogs, setVisibleLogs] = useState<typeof mockLogs>([])
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        // Auto-run simulation on mount
        runSimulation()
    }, [])

    const runSimulation = async () => {
        if (isRunning) return
        setIsRunning(true)
        setVisibleLogs([])

        for (let i = 0; i < mockLogs.length; i++) {
            await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
            setVisibleLogs(prev => [...prev, mockLogs[i]])

            // Extra delay for the FAIL -> RETRAIN sequence
            if (mockLogs[i].status === "FAIL") {
                await new Promise(r => setTimeout(r, 1200))
            }
        }
        setIsRunning(false)
    }

    return (
        <div className="mt-24 pt-24 border-t border-gray-200 pb-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-50/50 skew-y-3 transform -z-10 origin-top-right"></div>

            <div className="max-w-[1600px] mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-16">

                {/* Left: Narrative */}
                <div className="w-full lg:w-5/12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
                        <Activity className="w-4 h-4" />
                        Our Unfair Advantage
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-loose lg:leading-tight">
                        We don't trust AI.<br />
                        <span className="text-emerald-500">We interrogate it.</span>
                    </h2>

                    <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                        The "AI wrapper" era is dead. What sets Clear Mind Life apart isn't just prompts—it's our rigorous <strong className="text-gray-900">Continuous AI Capability Benchmarking</strong> engine.
                    </p>

                    <ul className="space-y-6 mb-10">
                        {[
                            { title: "Adversarial Edge-Case Testing", desc: "Agents are bombarded with thousands of chaotic FHIR payloads to ensure clinical safety." },
                            { title: "The Feedback Loop", desc: "When an agent fails to code a complex claim, the Moat catches it, retrains the weights, and deploys the fix." },
                            { title: "Transparent Capability Matrix", desc: "You aren't trusting a black box. You're verifying a tracked, mathematical capability matrix." }
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 shadow-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="text-base font-black text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed mt-1">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/platform" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-md">
                            Explore the Platform <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button onClick={runSimulation} disabled={isRunning} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-bold transition-colors border border-gray-200 shadow-sm disabled:opacity-50">
                            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin text-emerald-500' : ''}`} /> Rerun Moat Protocol
                        </button>
                    </div>
                </div>

                {/* Right: Simulated Dashboard */}
                <div className="w-full lg:w-7/12 relative mt-12 lg:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-3xl transform rotate-1 scale-105 blur-xl -z-10"></div>

                    <div className="bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm relative z-20">
                        {/* Header */}
                        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-4 h-4 text-emerald-500" />
                                <span className="text-gray-300 font-bold uppercase tracking-widest text-xs">LBX Universe Benchmark Runner</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-sm"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm"></div>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 h-[480px] overflow-y-auto scroll-smooth flex flex-col">
                            <div className="text-gray-500 mb-6 pb-4 border-b border-gray-800/80 flex flex-col gap-1.5 font-medium tracking-wide">
                                <span className="text-emerald-500/70">[SYSTEM] Initializing Test Suite: ClearMind_Revenue_Agents_v2.4</span>
                                <span>[SYSTEM] Connecting to LBX Mothership... Connected.</span>
                                <span>[SYSTEM] Executing 5 capability validation traces.</span>
                            </div>

                            <div className="space-y-4 flex-grow">
                                <AnimatePresence>
                                    {visibleLogs.map((log) => (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`p-4 rounded-xl border ${log.status === 'PASS' ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' : 'bg-rose-950/30 border-rose-900/50 text-rose-400'} shadow-sm backdrop-blur-sm`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {log.status === 'PASS' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                    <span className="font-bold tracking-widest uppercase text-xs opacity-90">[{log.status}] trace:{log.trace}</span>
                                                </div>
                                                <span className="text-xs font-bold opacity-60 bg-black/20 px-2 py-0.5 rounded">{log.ms}ms</span>
                                            </div>
                                            <div className="flex flex-col gap-1 text-[13px] leading-relaxed">
                                                <span className="text-gray-100"><span className="text-gray-500 w-12 inline-block">Agent:</span> {log.agent}</span>
                                                <span className="text-gray-100"><span className="text-gray-500 w-12 inline-block">Task:</span> {log.task}</span>
                                                {log.issue && (
                                                    <motion.span
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="text-white mt-2 text-xs bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-inner"
                                                    >
                                                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                                        <span className="font-medium">Exception: {log.issue}</span>
                                                    </motion.span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isRunning && visibleLogs.length < mockLogs.length && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="flex items-center gap-2 text-emerald-500/50 pt-2 px-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-ping"></span>
                                            Executing trace parameters...
                                        </motion.div>
                                    )}

                                    {!isRunning && visibleLogs.length === mockLogs.length && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-8 pt-6 border-t border-gray-800 text-emerald-400 font-bold bg-emerald-950/10 -mx-6 -mb-6 p-6"
                                        >
                                            [SYSTEM] Suite complete. All critical revenue capabilities verified.
                                            <br />
                                            [SYSTEM] <span className="text-white">Agents cleared for production environment.</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Decorative floating badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        className="absolute -bottom-8 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-30"
                    >
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">System Status</p>
                            <p className="text-sm font-black text-gray-900 tracking-tight">100% Validated</p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
