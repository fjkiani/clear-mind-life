import * as React from "react"
import { Target } from "lucide-react"

interface TakeawayProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    color?: "emerald" | "blue" | "indigo" | "violet" | "rose" | "amber" | "teal";
}

export function ExecutiveTakeaway({ children, color = "emerald", className, ...props }: TakeawayProps) {
    const colorStyles = {
        emerald: "bg-emerald-50 border-emerald-100",
        blue: "bg-blue-50 border-blue-100",
        indigo: "bg-indigo-50 border-indigo-100",
        violet: "bg-violet-50 border-violet-100",
        rose: "bg-rose-50 border-rose-100",
        amber: "bg-amber-50 border-amber-100",
        teal: "bg-teal-50 border-teal-100",
    };

    const textColors = {
        emerald: "text-emerald-900",
        blue: "text-blue-900",
        indigo: "text-indigo-900",
        violet: "text-violet-900",
        rose: "text-rose-900",
        amber: "text-amber-900",
        teal: "text-teal-900",
    };

    const iconColors = {
        emerald: "text-emerald-500",
        blue: "text-blue-500",
        indigo: "text-indigo-500",
        violet: "text-violet-500",
        rose: "text-rose-500",
        amber: "text-amber-500",
        teal: "text-teal-500",
    };

    const decors = {
        emerald: "bg-emerald-100/50 border-emerald-200",
        blue: "bg-blue-100/50 border-blue-200",
        indigo: "bg-indigo-100/50 border-indigo-200",
        violet: "bg-violet-100/50 border-violet-200",
        rose: "bg-rose-100/50 border-rose-200",
        amber: "bg-amber-100/50 border-amber-200",
        teal: "bg-teal-100/50 border-teal-200",
    };

    return (
        <div className={`p-6 md:p-8 rounded-2xl border relative overflow-hidden ${colorStyles[color]} ${className || ""}`} {...props}>
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full border-b border-l ${decors[color]}`}></div>
            <h4 className={`font-bold mb-3 flex items-center gap-2 relative z-10 text-xl ${textColors[color]}`}>
                <Target className={`w-6 h-6 ${iconColors[color]}`} />
                The Key Takeaway for Executives
            </h4>
            <div className={`font-medium relative z-10 text-lg md:text-xl leading-relaxed ${textColors[color]}`}>
                {children}
            </div>
        </div>
    );
}
