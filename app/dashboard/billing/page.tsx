import BillingSimulator from "@/components/dashboard/billing-simulator"

export const metadata = {
    title: "Billing Agent - Clear Mind Life",
    description: "Autonomous Predictive Denial Scoring and Claims Scrubbing",
}

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col pt-8">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Revenue Command Center</h1>
                    <p className="text-gray-500 font-medium">Predict, catch, and repair 837 claim anomalies before submittal to the clearinghouse.</p>
                </div>

                {/* The Glass Box Component */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-8">
                    <BillingSimulator />
                </div>

                {/* Informational Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Continuous Learning</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            The Agent ingests millions of 835 Remittance lines daily, learning the idiosyncratic denial patterns of specific payers in real-time.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Automated Appeals</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            When a denial does occur, the Agent instantly drafts a clinically rigorous, compliant appeal letter citing specific payer guidelines and medical necessity.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Zero-Touch Submission</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Once claims achieve a 98%+ confidence score, they are batched and fired directly to Availity via AES-256 encrypted API, requiring zero human intervention.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
