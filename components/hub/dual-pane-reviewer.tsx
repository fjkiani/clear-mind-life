'use client'
import { useState } from 'react'
import { Check, X, FileText, Cpu, AlertCircle, ArrowRight } from 'lucide-react'

interface DualPaneReviewerProps {
    sourceText: string
    stagedData: {
        codes: { type: string, code: string, desc: string }[]
        confidence: number
    }
}

export default function DualPaneReviewer({ sourceText, stagedData }: DualPaneReviewerProps) {
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    if (approved) return (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Claim Approved & Submitted</h3>
            <p className="text-emerald-700 font-medium">Staging pushed to clearinghouse. +15 XP earned.</p>
            <button
                onClick={() => setApproved(false)}
                className="mt-6 text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
            >
                Next Claim →
            </button>
        </div>
    )

    if (rejected) return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Claim Flagged for Protocol Engineering</h3>
            <p className="text-amber-700 font-medium">Routed to Level 3 Queue for ruleset update.</p>
            <button
                onClick={() => setRejected(false)}
                className="mt-6 text-sm font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4"
            >
                Next Claim →
            </button>
        </div>
    )

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col h-[600px]">

            {/* Header Bar */}
            <div className="flex bg-slate-50 border-b border-slate-200 p-4">
                <div className="flex-1 flex items-center font-bold text-slate-700">
                    <FileText className="w-5 h-5 text-indigo-500 mr-2" />
                    Source: Clinical Note (EHR)
                </div>
                <div className="w-12 flex justify-center items-center">
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1 flex items-center font-bold text-slate-700 pl-4 border-l border-slate-200">
                    <Cpu className="w-5 h-5 text-emerald-500 mr-2" />
                    AI Staging: 837 Claim
                </div>
            </div>

            {/* Split Panes */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left Pane: Source */}
                <div className="flex-1 p-6 overflow-y-auto bg-white">
                    <div className="prose prose-sm prose-slate max-w-none">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-2">Encounter Transcript snippet</h4>
                        <div className="whitespace-pre-wrap text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                            {sourceText}
                        </div>
                    </div>
                </div>

                {/* Right Pane: AI Output */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50 shadow-inner">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Proposed Codes</h4>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Conf: {stagedData.confidence}%
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        {stagedData.codes.map((c, i) => (
                            <div key={i} className="flex justify-between bg-white border border-slate-200 p-3 rounded-lg shadow-sm hover:border-indigo-300 transition-colors cursor-pointer">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{c.type}</div>
                                    <div className="text-sm font-medium text-slate-700">{c.desc}</div>
                                </div>
                                <div className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded h-fit">
                                    {c.code}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="border-t border-slate-200 p-4 bg-white flex justify-end gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] relative z-10">
                <button
                    onClick={() => setRejected(true)}
                    className="flex items-center px-6 py-3 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <X className="w-5 h-5 mr-2" />
                    Reject & Flag
                </button>
                <button
                    onClick={() => setApproved(true)}
                    className="flex items-center px-8 py-3 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                    <Check className="w-5 h-5 mr-2" />
                    Approve Staging
                </button>
            </div>

        </div>
    )
}
