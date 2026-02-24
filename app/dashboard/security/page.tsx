import IdentityAgentHub from '@/components/dashboard/identity/IdentityAgentHub'

export const metadata = {
    title: 'Identity Agent Hub | Clear Mind Life',
    description: 'Natural language MFA, RBAC, and Compliance enforcement powered by Clear Mind Life Identity Engine',
}

export default function SecurityPage() {
    return (
        <div className="flex flex-col h-[calc(100dvh-64px)] overflow-hidden bg-gray-950">
            <IdentityAgentHub />
        </div>
    )
}
