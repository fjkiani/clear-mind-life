import { AlertTriangle, Info } from 'lucide-react'

interface GlassBoxAlertProps {
    title: string
    reason: string
    actionText?: string
    severity?: 'info' | 'warning' | 'critical'
}

export default function GlassBoxAlert({ title, reason, actionText = 'Review Flag', severity = 'warning' }: GlassBoxAlertProps) {
    const config = {
        info: { icon: Info, colors: 'bg-blue-50 border-blue-200 text-blue-800', iconColor: 'text-blue-500' },
        warning: { icon: AlertTriangle, colors: 'bg-amber-50 border-amber-200 text-amber-900', iconColor: 'text-amber-500' },
        critical: { icon: AlertTriangle, colors: 'bg-red-50 border-red-200 text-red-900', iconColor: 'text-red-500' }
    }

    const { icon: Icon, colors, iconColor } = config[severity]

    return (
        <div className={`rounded-xl border p-4 ${colors}`}>
            <div className="flex gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                <div className="flex-1">
                    <h4 className="text-sm font-bold mb-1">{title}</h4>
                    <p className="text-sm opacity-90 leading-relaxed mb-3 font-mono text-xs">{reason}</p>
                    <button className="text-sm flex items-center font-bold hover:opacity-80 transition-opacity">
                        {actionText} →
                    </button>
                </div>
            </div>
        </div>
    )
}
