interface XPBarProps {
    currentXP: number
    nextLevelXP: number
    label?: string
}

export default function XPBar({ currentXP, nextLevelXP, label = 'Ascension Progress' }: XPBarProps) {
    const percentage = Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100))

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-medium text-slate-700">
                    {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} <span className="text-slate-400">XP</span>
                </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
