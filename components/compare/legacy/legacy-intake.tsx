"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Clock, CheckCircle2, FileX, ChevronRight, Loader2 } from 'lucide-react'

export default function LegacyIntakeSimulator() {
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (step > 0 && step < 4) {
            interval = setInterval(() => setTimer(t => t + 1), 1000)
        }
        return () => clearInterval(interval)
    }, [step])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const handleAction = (nextStep: number, delay = 1500) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(nextStep)
        }, delay)
    }

    return (
        <div className="font-sans flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-gray-900 font-bold text-lg">Manual Verification</h3>
                    <p className="text-gray-500 text-sm">Patient: John Doe (Aetna)</p>
                </div>
                <div className="flex items-center gap-2 text-rose-500 font-mono text-sm font-bold bg-rose-50 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {formatTime(timer)}
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-start gap-4 mb-8">
                                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-1" strokeWidth={2.5} />
                                <div>
                                    <h4 className="text-gray-900 font-bold text-lg mb-1">Unverified Arrival in 15m</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Staff must manually log into payer portals to verify active coverage, otherwise the practice risks a claim denial.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAction(1, 600)}
                                className="group flex items-center gap-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Acknowledge & Start <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h4 className="font-bold text-gray-900 mb-6">Select Payer Portal</h4>
                            <div className="space-y-4">
                                {['Availity (Status: Down)', 'NaviNet (Password Expired)', 'Aetna Provider Portal'].map((portal, i) => (
                                    <button
                                        key={portal}
                                        onClick={() => {
                                            if (i === 2) handleAction(2, 2000)
                                        }}
                                        className="w-full text-left flex items-center justify-between group"
                                        disabled={i !== 2}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                                            <span className={`text-sm font-bold ${i === 2 ? 'text-gray-900 group-hover:text-indigo-600' : 'text-gray-400 line-through decoration-gray-300'}`}>
                                                {portal}
                                            </span>
                                        </div>
                                        {i === 2 && loading && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-start gap-4 mb-8">
                                <FileX className="w-6 h-6 text-rose-500 shrink-0 mt-1" strokeWidth={2.5} />
                                <div>
                                    <h4 className="text-gray-900 font-bold text-lg mb-1">Portal Verification Failed</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">"Patient ID Not Found". The patient filled out their middle initial, but the payer requires exact first and last name matching.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAction(3, 4000)}
                                className="group flex items-center gap-3 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Listening to Hold Music...</>
                                ) : (
                                    <>Call Aetna Provider Rep <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-start gap-4 mb-8">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" strokeWidth={2.5} />
                                <div>
                                    <h4 className="text-gray-900 font-bold text-lg mb-1">Finally Verified (Copay $40)</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">The front desk spent 14 minutes doing data entry instead of greeting patients and managing the facility.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setStep(0); setTimer(0) }}
                                className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                            >
                                Reset
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
