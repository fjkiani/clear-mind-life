'use client'

import { useState } from 'react'

const STEPS = [
    {
        id: 'triage',
        title: 'AI Triage',
        description: 'Safety-critical routing driven by autonomous agents. Classifies Chief Complaints to route patients to the correct clinical pathway with 100% adherence to safety protocols.',
        icon: '🚨'
    },
    {
        id: 'book',
        title: 'Book Appointment',
        description: 'Real-time synchronization with EHRs like NexHealth. The agent checks provider availability and slots the patient without human intervention.',
        icon: '📅'
    },
    {
        id: 'register',
        title: 'Register Patient',
        description: 'Ingests demographic data via SMS or voice, automatically generating a compliant FHIR Patient resource and syncing it to the core database.',
        icon: '📝'
    },
    {
        id: 'schedule',
        title: 'Manage Schedule',
        description: 'Dynamic load balancing across provider calendars. Handles cancellations, waitlists, and rebooking scenarios instantaneously.',
        icon: '⚙️'
    },
    {
        id: 'telehealth',
        title: 'Telehealth Video',
        description: 'Instant instantiation of VideoSDK rooms. Zero-friction patient joins via encrypted magic links, complete with auto-transcription.',
        icon: '📹'
    },
    {
        id: 'insurance',
        title: 'Insurance & Auth',
        description: 'API-driven eligibility checks. Verifies active coverage, co-pays, and prior authorization requirements before the visit occurs.',
        icon: '🛡️'
    },
    {
        id: 'records',
        title: 'Patient Records (FHIR)',
        description: 'The session is auto-transcribed and mapped into structured HL7 FHIR bundles (Encounter, Observation, Condition) ready for the clinical chart.',
        icon: '🗂️'
    },
    {
        id: 'coordination',
        title: 'Care Coordination',
        description: 'Post-visit Twilio SMS dispatch. Automated follow-ups, medication reminders, and continuous engagement protocols.',
        icon: '💬'
    }
]

// Mock UIs for the landing page that represent the real demo components
function ClinicalTriageDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Input Parameter</p>
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm">
                    "I have been experiencing a severe, crushing chest pain that radiates to my left arm for the past 2 hours. I am also sweating heavily."
                </div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-6xl">🚨</span>
                </div>
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2 relative z-10">Output Analysis</p>
                <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center bg-white/60 p-2 rounded">
                        <span className="text-sm font-medium text-gray-600">Classification</span>
                        <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">EMERGENT</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/60 p-2 rounded">
                        <span className="text-sm font-medium text-gray-600">Action Path</span>
                        <span className="text-sm font-bold text-gray-900">Redirect to Emergency Room (911)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AppointmentBookingDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Provider ID</p>
                    <p className="font-mono text-sm text-gray-900">dr_smith_psych</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Slot Available</p>
                    <p className="font-mono text-sm text-green-600">Today @ 2:30 PM</p>
                </div>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3">
                <span className="text-2xl mt-1">✓</span>
                <div>
                    <h4 className="font-bold text-green-900">NexHealth Sync Complete</h4>
                    <p className="text-sm text-green-700 mt-1">Appointment written to EHR. Bi-directional sync confirmed.</p>
                </div>
            </div>
        </div>
    )
}

function PatientRegistrationDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg font-mono text-xs text-blue-300 overflow-x-auto">
                <pre>{`{
  "resourceType": "Patient",
  "identifier": [{
    "use": "usual",
    "type": {
      "coding": [{"system": "http://terminology.hl7.org/CodeSystem/v2-0203", "code": "MR"}]
    },
    "value": "MRN-99824"
  }],
  "name": [{
    "use": "official",
    "family": "Doe",
    "given": ["John", "A"]
  }],
  "telecom": [{
    "system": "phone",
    "value": "+15550198472",
    "use": "mobile"
  }]
}`}</pre>
            </div>
            <p className="text-xs text-gray-500 text-center uppercase tracking-widest">FHIR R4 Compliant Payload</p>
        </div>
    )
}

function TelehealthVideoDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-950 aspect-video rounded-xl border-2 border-indigo-500/30 relative flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')] bg-cover bg-center"></div>
                <div className="relative text-center space-y-4 p-6 backdrop-blur-sm bg-indigo-950/40 rounded-2xl border border-indigo-500/20">
                    <div className="flex justify-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                            🎤
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                            📹
                        </div>
                    </div>
                    <div>
                        <p className="text-white font-semibold">VideoSDK Room Active</p>
                        <p className="text-indigo-200 text-sm">Transcribing session in real-time...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ScheduleManagementDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Waitlist Triggered</p>
                <p className="text-sm text-gray-800 font-medium">Cancellation detected for Dr. Smith at 2:00 PM.</p>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm opacity-50">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-gray-500 line-through">Sarah Jenkins - 2:00 PM</span>
                    <span className="text-xs text-gray-400 ml-auto">Cancelled</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                    <span className="text-sm font-bold text-blue-900">Mark Thompson - 2:00 PM</span>
                    <span className="text-xs font-bold text-blue-600 ml-auto bg-blue-100 px-2 py-1 rounded-md">Auto-Rebooked</span>
                </div>
            </div>
        </div>
    )
}

function InsuranceAuthDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <span className="text-xs font-mono text-gray-400">POST /api/v1/x12/270</span>
                    <span className="text-xs font-mono text-emerald-400 animate-pulse">Awaiting Payload...</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Payer:</span>
                        <span className="text-white">Aetna Choice POS II</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Procedure:</span>
                        <span className="text-blue-300">MRI Brain (70551)</span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">APPROVED - AUTH# 8912X</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PatientRecordsDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl">🗂️</div>
                <div>
                    <h4 className="font-bold text-gray-900">FHIR R4 Bundle Synthesized</h4>
                    <p className="text-xs text-gray-500">Cross-referencing 3 distinct EHR nodes...</p>
                </div>
            </div>
            <div className="grid gap-2">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">💊 Lisinopril 10mg</span>
                    <span className="text-xs font-mono text-gray-400">Epic</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">⚠️ Penicillin (Severe)</span>
                    <span className="text-xs font-mono text-gray-400">Cerner</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">🔬 A1C 7.2%</span>
                    <span className="text-xs font-mono text-gray-400">Quest</span>
                </div>
            </div>
        </div>
    )
}

function CareCoordinationDemo() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden max-w-sm mx-auto">
                <div className="bg-gray-100 p-3 text-center border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-900">Twilio SMS Dispatch</p>
                </div>
                <div className="p-4 bg-gray-50 space-y-4">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-sm text-sm shadow-sm ml-8">
                        Hi John, this is Dr. Smith's AI assistant. Your lab results came back normal. Please remember to take your new medication tonight. Reply YES to confirm.
                    </div>
                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-sm text-sm shadow-sm mr-12 w-fit">
                        YES
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Engagement Confirmed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SharedDemoFallback({ title, icon }: { title: string, icon: string }) {
    return (
        <div className="h-48 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center gap-3 animate-in fade-in zoom-in-95 duration-500">
            <span className="text-4xl">{icon}</span>
            <p className="text-gray-500 font-medium">{title} Executing</p>
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    )
}

export default function CareContinuum() {
    const [activeStep, setActiveStep] = useState(STEPS[0].id)

    // Helper to find index to draw connector line
    const activeIndex = STEPS.findIndex(s => s.id === activeStep)

    const renderActiveDemo = () => {
        switch (activeStep) {
            case 'triage': return <ClinicalTriageDemo />
            case 'book': return <AppointmentBookingDemo />
            case 'register': return <PatientRegistrationDemo />
            case 'schedule': return <ScheduleManagementDemo />
            case 'telehealth': return <TelehealthVideoDemo />
            case 'insurance': return <InsuranceAuthDemo />
            case 'records': return <PatientRecordsDemo />
            case 'coordination': return <CareCoordinationDemo />
            default: return <SharedDemoFallback title={STEPS[activeIndex].title} icon={STEPS[activeIndex].icon} />
        }
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute -left-[20%] -top-[20%] w-[50%] h-[50%] blur-[120px] rounded-full bg-blue-50/50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3">The Care Continuum</h2>
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Eliminate Administrative Chaos & Staff Burnout</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Clear Mind Life doesn't just return text. It executes the entire patient journey, eliminating the manual friction that burns out your staff and frustrates your patients.
                        Watch how our autonomous agents untangle legacy systems to orchestrate care instantly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Timeline */}
                    <div className="lg:col-span-5 relative">
                        {/* Vertical line connecting steps */}
                        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gray-100"></div>
                        <div
                            className="absolute left-[27px] top-6 w-0.5 bg-blue-500 transition-all duration-500 ease-out"
                            style={{ height: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
                        ></div>

                        <div className="space-y-2 relative">
                            {STEPS.map((step, index) => {
                                const isActive = activeStep === step.id
                                const isPast = index <= activeIndex

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setActiveStep(step.id)}
                                        className={`w-full text-left relative flex items-start gap-6 p-4 rounded-2xl transition-all duration-300 group ${isActive
                                            ? 'bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-900/5 z-10 scale-[1.02]'
                                            : 'hover:bg-gray-50/80 z-0'
                                            }`}
                                    >
                                        <div className={`relative shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : isPast
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-50 text-gray-400 border border-gray-100 group-hover:border-gray-300'
                                            }`}>
                                            {step.icon}
                                        </div>
                                        <div className="pt-3">
                                            <h4 className={`text-lg font-bold transition-colors ${isActive ? 'text-gray-900' : isPast ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-900'
                                                }`}>
                                                {step.title}
                                            </h4>
                                            {isActive && (
                                                <div className="overflow-hidden mt-2 animate-in slide-in-from-top-2 duration-300">
                                                    <p className="text-sm text-gray-600 leading-relaxed pr-4">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Canvas (Mobile sits below, Desktop sits to the right and is sticky) */}
                    <div className="lg:col-span-7 lg:sticky lg:top-32">
                        <div className="bg-white border border-gray-200 rounded-[2rem] p-6 shadow-2xl shadow-gray-900/5 min-h-[500px] flex flex-col relative overflow-hidden">
                            {/* Decorative browser header */}
                            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-100">
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <div className="ml-4 px-3 py-1 bg-gray-50 rounded-md text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest border border-gray-100">
                                    Agent Live Execution Sandbox
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full relative z-10">
                                {renderActiveDemo()}
                            </div>

                            {/* Background mesh correlation with active step */}
                            <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] blur-[100px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
                                style={{
                                    backgroundColor:
                                        activeStep === 'triage' ? 'rgba(239, 68, 68, 0.1)' : // red
                                            activeStep === 'book' ? 'rgba(34, 197, 94, 0.1)' : // green
                                                activeStep === 'telehealth' ? 'rgba(99, 102, 241, 0.1)' : // indigo
                                                    'rgba(59, 130, 246, 0.1)' // default blue
                                }}
                            ></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
