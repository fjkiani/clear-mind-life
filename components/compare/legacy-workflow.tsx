"use client"
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, CornerDownRight } from 'lucide-react'

export type WorkflowStep = {
    title: string
    desc: string
    time: string
    pain: string
}

export default function LegacyWorkflow({ steps }: { steps: WorkflowStep[] }) {
    return (
        <div className="space-y-0">
            {steps.map((step, i) => (
                <div key={i} className="flex flex-col">
                    <div className="bg-gray-950/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-5 shadow-black/20 shadow-lg relative z-10">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 text-sm font-bold shrink-0">
                                0{i + 1}
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                                    <h4 className="text-base font-bold text-gray-200">{step.title}</h4>
                                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-400 bg-gray-900 px-2 py-1 rounded border border-gray-800 w-fit">
                                        <Clock className="w-3.5 h-3.5" /> {step.time}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium mb-4">{step.desc}</p>
                                <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 flex items-start gap-2.5">
                                    <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                    <span className="text-xs text-orange-200/70 font-medium leading-relaxed">{step.pain}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {i < steps.length - 1 && (
                        <div className="flex justify-center -my-2 relative z-0">
                            <div className="w-0.5 h-10 bg-gray-800"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
