import { ShieldCheck, Plane, CircuitBoard } from 'lucide-react'

export type AccessLevel = 'reviewer' | 'pilot' | 'engineer'

interface LevelBadgeProps {
    level: AccessLevel
    showLabel?: boolean
    className?: string
}

const levelConfig = {
    reviewer: {
        label: 'Level 1: Reviewer',
        icon: ShieldCheck,
        colors: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
        description: '100% Staging Approval',
    },
    pilot: {
        label: 'Level 2: Pilot',
        icon: Plane,
        colors: 'bg-blue-500/10 text-blue-600 border-blue-200',
        description: 'Protocol Exception Handler',
    },
    engineer: {
        label: 'Level 3: Protocol Engineer',
        icon: CircuitBoard,
        colors: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
        description: 'Autonomous Flow Commander',
    },
}

export default function LevelBadge({ level, showLabel = true, className = '' }: LevelBadgeProps) {
    const config = levelConfig[level]
    const Icon = config.icon

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.colors} ${className}`}
            title={config.description}
        >
            <Icon className="w-4 h-4" />
            {showLabel && <span className="text-xs font-bold uppercase tracking-wider">{config.label}</span>}
        </div>
    )
}
