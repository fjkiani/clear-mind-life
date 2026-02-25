import { Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface AITrustScoreCardProps {
    score: number
    trend: 'up' | 'down' | 'flat'
    claimsProcessed: number
}

export default function AITrustScoreCard({ score, trend, claimsProcessed }: AITrustScoreCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Execution Trust Score</h3>
                    <p className="text-xs text-slate-400">First-Pass Accuracy Rate</p>
                </div>
            </div>

            <div className="flex items-end gap-4">
                <div className="text-5xl font-black text-slate-900">{score}%</div>
                {trend === 'up' && (
                    <div className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md mb-1">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +2.4% this week
                    </div>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center text-xs font-medium text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                    {claimsProcessed.toLocaleString()} Claims Staged
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    View Discrepancies →
                </button>
            </div>
        </div>
    )
}
