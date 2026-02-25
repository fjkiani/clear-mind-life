import EligibilityChecker from "@/components/dashboard/eligibility-checker"

export const metadata = {
    title: "Receptionist Agent - Clear Mind Life",
    description: "Autonomous Patient Intake and X12 Eligibility Validation",
}

export default function CheckinPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col pt-8">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Patient Intake Pipeline</h1>
                    <p className="text-gray-500 font-medium">Verify insurance eligibility in real-time, collect copays, and clear patients for clinical encounters.</p>
                </div>

                {/* The Glass Box Component */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-8">
                    <EligibilityChecker />
                </div>

                {/* Informational Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Denial Prevention</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            60% of claims are denied due to lack of coverage. The Availity X12 270/271 sequence eliminates this risk before the provider ever sees the patient.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Cash Flow Secured</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            By detecting exact copays and deductibles instantly, front-desk staff collect patient responsibility upfront—boosting collection rates to 85%+.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Prior-Auth Auto-Detection</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            If an X12 271 response indicates an upcoming procedure requires authorization (X12 278), the platform automatically queues the request.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
