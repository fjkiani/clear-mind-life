"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Check, FileWarning, Search, ChevronRight } from 'lucide-react'

export default function LegacyScribeSimulator() {
    const [step, setStep] = useState(0)
    const [notes, setNotes] = useState(
        "Pt reports back pain. Says it started last week. Onset was sudden. Pain radiates sometimes. Vitals stable. Plan is physical therapy and advil."
    )
    const [cpt, setCpt] = useState("99212 (Basic Level 2)")

    const handleFixNote = () => {
        setNotes("Pt presents with acute right-sided sciatica. Onset 7 days ago post-lifting. Radiates below knee. Provoked by flexion. Neuro exam: +SLR right at 45 deg, diminished Achilles reflex right. Plan: Ordered L-spine MRI, prescribed PT and Meloxicam 15mg.")
        setStep(1)
    }

    const handleFixCode = () => {
        setCpt("99214 (Level 4 - MDM Moderate)")
        setStep(2)
    }

    const reset = () => {
        setStep(0)
        setNotes("Pt reports back pain. Says it started last week. Onset was sudden. Pain radiates sometimes. Vitals stable. Plan is physical therapy and advil.")
        setCpt("99212 (Basic Level 2)")
    }

    return (
        <div className="font-sans flex flex-col h-full relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-gray-900 font-bold text-lg">Scribe Review Queue</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> 14 Charts Pending
                    </p>
                </div>
            </div>

            <div className="flex-grow flex flex-col gap-8">

                {/* The Bad Note */}
                <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HPI & Plan</h4>
                        {step > 0 ? (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1"><Check className="w-3 h-3" /> Corrected</span>
                        ) : (
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1"><FileWarning className="w-3 h-3" /> Scribe Draft</span>
                        )}
                    </div>

                    <p className={`text-sm leading-relaxed ${step === 0 ? 'text-gray-500 italic' : 'text-gray-900 font-medium'}`}>
                        "{notes}"
                    </p>

                    {step === 0 && (
                        <button
                            onClick={handleFixNote}
                            className="mt-4 group flex items-center gap-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            Rewrite Note Manually <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>

                {/* The Missed Code */}
                <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suggested E&M</h4>
                        {step === 2 ? (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1"><Check className="w-3 h-3" /> Recovered Revenue</span>
                        ) : (
                            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1"><Search className="w-3 h-3" /> Under-Coded</span>
                        )}
                    </div>

                    <p className={`text-xl font-black tracking-tight ${step === 2 ? 'text-emerald-600' : 'text-rose-500 line-through decoration-rose-500/50'}`}>
                        {cpt}
                    </p>

                    {step === 0 && <p className="text-xs text-gray-400 mt-2">Fix note first to evaluate MDM level...</p>}

                    {step === 1 && (
                        <AnimatePresence>
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-3">
                                <p className="text-sm text-gray-600 font-medium mb-3">Scribe selected Level 2. Documenting the Rx and MRI pushes this to Level 4.</p>
                                <button
                                    onClick={handleFixCode}
                                    className="group flex items-center gap-3 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                                >
                                    Manually Upcode (Recover $85) <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                {/* Done State */}
                <AnimatePresence>
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 border-t border-gray-100 pt-6">
                            <h4 className="text-gray-900 font-bold mb-1">Chart 1 of 14 Closed.</h4>
                            <p className="text-gray-500 text-sm mb-4">Time wasted fixing scribe errors: 12 minutes.</p>
                            <button
                                onClick={reset}
                                className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
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
