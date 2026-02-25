import { Clock, DollarSign, FileText, ChevronRight } from 'lucide-react'

export interface BountyOffer {
    id: string
    payer: string
    specialty: string
    batchSize: number
    payoutAmount: number
    timeLimitHours: number
    complexity: 'low' | 'medium' | 'high'
    description: string
}

interface BountyCardProps {
    bounty: BountyOffer
}

export default function BountyCard({ bounty }: BountyCardProps) {
    const complexityColors = {
        low: 'bg-emerald-100 text-emerald-700',
        medium: 'bg-amber-100 text-amber-700',
        high: 'bg-red-100 text-red-700',
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg hover:border-indigo-500/50 transition-all group flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider">
                        {bounty.payer}
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${complexityColors[bounty.complexity]}`}>
                        {bounty.complexity} Rsk
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{bounty.specialty} Overflow</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-2">
                    {bounty.description}
                </p>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center text-slate-300 text-sm font-medium">
                    <FileText className="w-4 h-4 mr-2 text-indigo-400" />
                    {bounty.batchSize} Claims
                </div>
                <div className="flex items-center text-slate-300 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-2 text-amber-400" />
                    {bounty.timeLimitHours}h Limit
                </div>
            </div>

            <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center transition-colors">
                <DollarSign className="w-4 h-4 mr-1 opacity-70" />
                Claim {bounty.payoutAmount.toLocaleString()} Bounty
                <ChevronRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    )
}
