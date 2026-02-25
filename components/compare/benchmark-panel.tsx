"use client"
import { Zap, Clock, UserCheck } from 'lucide-react'

export type BenchmarkData = {
    legacyTime: string
    clearMindTime: string
    humanImpactTitle: string
    humanImpactDesc: string
}

export default function BenchmarkPanel({ data }: { data: BenchmarkData }) {
    return (
        <div className="flex flex-col h-full justify-center">

            <div className="flex items-center gap-12 mb-8">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2"><Clock className="w-3.5 h-3.5" /> Legacy Time</span>
                    <span className="text-2xl font-black text-gray-900">{data.legacyTime}</span>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 mb-2"><Zap className="w-3.5 h-3.5" /> Agent Time</span>
                    <span className="text-2xl font-black text-emerald-600">{data.clearMindTime}</span>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                    <span className="block text-sm font-bold text-gray-900 mb-1">{data.humanImpactTitle}</span>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{data.humanImpactDesc}</p>
                </div>
            </div>
        </div>
    )
}
