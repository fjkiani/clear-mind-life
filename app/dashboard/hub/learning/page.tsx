import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, GraduationCap, ArrowRight } from 'lucide-react'
import DualPaneReviewer from '@/components/hub/dual-pane-reviewer'

export const metadata: Metadata = {
    title: 'The Academy - Clear Mind Life',
    description: 'Train to become a Level 1 Reviewer.',
}

const mockAcademyTask = {
    sourceText: `CHIEF COMPLAINT: Patient presents with persistent ear pain, left side, duration 3 days. Also reports mild fever (100.2F).

EXAM: Left tympanic membrane is bulging and significantly erythematous. Right TM is clear. Nasal mucosa is slightly congested. Pharynx is clear.

ASSESSMENT: Acute suppurative otitis media without spontaneous rupture of ear drum, left ear.

PLAN: 
- Prescribed Amoxicillin 500mg PO TID for 10 days.
- Advised on Tylenol for pain/fever.
- Return if symptoms worsen after 48 hours.`,
    stagedData: {
        confidence: 98,
        codes: [
            { type: 'Diagnosis (ICD-10)', code: 'H66.002', desc: 'Acute suppurative otitis media without spontaneous rupture of ear drum, left ear' },
            { type: 'Service (CPT)', code: '99213', desc: 'Office or other outpatient visit for the evaluation and management of an established patient (Low Complexity)' }
        ]
    }
}

export default function HubLearningPage() {
    return (
        <div className="flex flex-col min-h-screen font-inter bg-slate-50">
            <main className="flex-grow pt-24 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <Link href="/dashboard/hub" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-4 tracking-widest uppercase">
                                <BookOpen className="w-4 h-4" />
                                The Academy
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                                Level 1: Staging Review
                            </h1>
                            <p className="text-lg text-slate-600 font-medium max-w-2xl">
                                You are no longer doing data entry. Your job is to supervise the AI. Review the source EHR note on the left and compare it against the AI's staged 837 codes on the right.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Training Module 1</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Verify that the AI correctly extracted the ICD-10 diagnosis for the left ear, and assigned an appropriate E/M level (99213) based on the visit's low complexity.
                                </p>
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                                    <h4 className="text-sm font-bold text-emerald-800 mb-1">Your Objective</h4>
                                    <p className="text-xs text-emerald-700 font-medium">If accurate, click "Approve Staging" to clear the claim. If you spot a hallucination, hit "Reject & Flag".</p>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Ascension Status</h4>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold">Training Progress</span>
                                    <span className="text-indigo-400 font-bold">0 / 5</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                                <p className="text-xs text-slate-400">Complete 5 training validations to unlock the Live Queue and move towards Level 2 Pilot status.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <DualPaneReviewer
                                sourceText={mockAcademyTask.sourceText}
                                stagedData={mockAcademyTask.stagedData}
                            />
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}
