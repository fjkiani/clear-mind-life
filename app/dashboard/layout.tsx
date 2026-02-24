'use client'

import Sidebar from '@/components/dashboard/ui/sidebar'
import Header from '@/components/dashboard/ui/header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-[100dvh] overflow-hidden bg-white dark:bg-slate-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-slate-900">
                {/*  Site header */}
                <Header />

                <main className="grow [&>*:first-child]:scroll-mt-16">
                    {children}
                </main>
            </div>
        </div>
    )
}
