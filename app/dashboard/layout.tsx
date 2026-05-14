'use client'

import Sidebar from '@/components/dashboard/ui/sidebar'
import Header from '@/components/dashboard/ui/header'
import DemoBanner from '@/components/dashboard/DemoBanner'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden bg-white dark:bg-slate-900">
            {/* Demo mode banner — shown to unauthenticated/demo users */}
            <DemoBanner />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-slate-900">
                    {/* Site header */}
                    <Header />

                    <main className="grow [&>*:first-child]:scroll-mt-16">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
