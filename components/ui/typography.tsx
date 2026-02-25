import * as React from "react"

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export function Lead({ children, className, ...props }: TextProps) {
    return (
        <p className={`text-xl md:text-2xl text-slate-600 font-medium leading-relaxed ${className || ""}`} {...props}>
            {children}
        </p>
    )
}

export function Body({ children, className, ...props }: TextProps) {
    return (
        <p className={`text-lg text-slate-600 leading-relaxed font-medium ${className || ""}`} {...props}>
            {children}
        </p>
    )
}

export function Highlight({
    children,
    color = "indigo",
    className
}: {
    children: React.ReactNode;
    color?: "indigo" | "emerald" | "rose" | "blue" | "violet" | "teal";
    className?: string;
}) {
    const colorClasses = {
        indigo: "decoration-indigo-500 text-slate-900",
        emerald: "decoration-emerald-500 text-slate-900",
        rose: "decoration-rose-500 text-slate-900",
        blue: "decoration-blue-500 text-slate-900",
        violet: "decoration-violet-500 text-slate-900",
        teal: "decoration-teal-500 text-slate-900",
    };

    return (
        <span className={`underline decoration-2 underline-offset-4 font-bold ${colorClasses[color]} ${className || ""}`}>
            {children}
        </span>
    )
}
