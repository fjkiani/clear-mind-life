"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertOctagon, FileSearch, ArrowRightCircle, Phone, FileDigit, ChevronRight, Loader2 } from 'lucide-react'

export default function LegacyRcmSimulator() {
    const [tab, setTab] = useState<'835' | 'rules' | 'ehr'>('835')
    const [actionStep, setActionStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleAppeal = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setActionStep(1)
            setTimeout(() => setActionStep(2), 2000)
        }, 1000)
    }

    const reset = () => {
        setTab('835')
        setActionStep(0)
        setLoading(false)
    }

    return (
        <div className="font-sans flex flex-col h-full relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-gray-900 font-bold text-lg">Rcm Denial Queue</h3>
                    <p className="text-gray-500 text-sm">Claim #9822-X (UHC Medicare)</p>
                </div>
                <div className="flex items-center gap-1.5 text-rose-500 text-sm font-bold bg-rose-50 px-3 py-1 rounded-full">
                    <AlertOctagon className="w-4 h-4" /> CO-16
                </div>
            </div>

            {actionStep === 0 ? (
                <div className="flex-grow flex flex-col">

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setTab('835')}
                            className={`text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${tab === '835' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            835 ERA
                        </button>
                        <button
                            onClick={() => setTab('rules')}
                            className={`text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${tab === 'rules' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            LCD Rules
                        </button>
                        <button
                            onClick={() => setTab('ehr')}
                            className={`text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${tab === 'ehr' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            EHR Notes
                        </button>
                    </div>

                    <div className="flex-grow min-h-[160px]">
                        <AnimatePresence mode="wait">
                            {tab === '835' && (
                                <motion.div key="835" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-xs text-gray-500 leading-relaxed">
                                    <p>TRN*1*9822X*1000000001</p>
                                    <p className="text-rose-500 font-bold">SVC*HC:99214*150.00*0.00</p>
                                    <p className="text-rose-500 font-bold">CAS*CO*16*150.00</p>
                                    <p>AMT*B6*0.00</p>
                                    <p>LQ*HE*N56</p>
                                    <p className="mt-4 font-sans text-sm text-gray-900 font-medium">Claim/service lacks information or has submission/billing error(s).</p>
                                </motion.div>
                            )}

                            {tab === 'rules' && (
                                <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-gray-600 leading-relaxed">
                                    <p className="mb-3">When billing CPT 99214 along with a minor surgical procedure (e.g. 20610 - Joint Injection) on the same date of service, the E&M service must be significant and separately identifiable.</p>
                                    <p className="font-bold text-gray-900">Requirement: Modifier -25 must be appended to CPT 99214 to prevent denial under NCCI edits.</p>
                                </motion.div>
                            )}

                            {tab === 'ehr' && (
                                <motion.div key="ehr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-gray-600">
                                    <p className="font-mono text-xs text-gray-400 mb-1">20610</p>
                                    <p className="font-medium text-gray-900 mb-4">Arthrocentesis, aspiration and/or injection, major joint</p>

                                    <p className="font-mono text-xs text-gray-400 mb-1">99214</p>
                                    <p className="font-medium text-gray-900 mb-6">Office/outpatient visit est.</p>

                                    <p className="text-xs font-bold text-gray-900 uppercase tracking-widest border-l-2 border-rose-500 pl-3">Biller missed appending Mod -25.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleAppeal}
                        className="mt-8 group flex items-center gap-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Re-file with Modifier 25"}
                        {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            ) : (
                <div className="flex-grow flex flex-col justify-center">
                    {actionStep === 1 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Loader2 className="w-6 h-6 text-gray-400 animate-spin mb-4" />
                            <h4 className="font-bold text-gray-900 text-lg mb-2">Re-processing Claim...</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">This manual investigation took 15 minutes of staff time.</p>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h4 className="font-bold text-rose-500 text-lg mb-2">Cash Flow Delayed: 45 Days</h4>
                            <p className="text-sm text-gray-600 leading-relaxed mb-8">
                                Because this wasn't caught upfront, the practice must wait another 30-45 days for the payer to re-adjudicate.
                            </p>
                            <button
                                onClick={reset}
                                className="text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                            >
                                Reset
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

        </div>
    )
}
