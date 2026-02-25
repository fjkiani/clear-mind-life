import EncounterSimulator from "@/components/dashboard/encounter-simulator"

export const metadata = {
    title: "Encounter Agent - Clear Mind Life",
    description: "Autonomous Telehealth Transcription and Medical Coding",
}

export default function EncounterPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col pt-8">

                {/* Page Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Live Clinical Encounter</h1>
                        <p className="text-gray-500 font-medium">Auto-generating SOAP notes and structured FHIR data from patient conversations.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold shadow-sm">
                            Patient ID: SJ-8921-A
                        </span>
                        <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Coverage Validated
                        </span>
                    </div>
                </div>

                {/* The Glass Box Component */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden mb-8">
                    <EncounterSimulator />
                </div>

                {/* Informational Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Pajama Time Eradicated</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Providers save 2-3 hours daily by never typing a note again. The Encounter Agent structures the raw audio into compliant SOAP narrative instantly.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Safety Auto-Escalation</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Models constantly scan for "Red Flag" keywords (e.g., "chest pain", "suicide"). Upon detection, the protocol interrupts non-clinical staff to dispatch emergency services.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Pre-Claim Coding</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            The Agent maps the generated clinical narrative directly to SNOMED-CT and ICD-10 sets, dropping ready-to-bill codes into the charge capture queue.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
