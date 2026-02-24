'use client'

import { useState } from 'react'
import { GENDER_OPTIONS, BLOOD_TYPES, ID_TYPES, PRIMARY_CONCERNS } from '@/config/healthcare'
import { useRouter } from 'next/navigation'

type Step = 'personal' | 'medical' | 'confirm' | 'success'

const STEPS: { key: Step; label: string }[] = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'medical', label: 'Medical History' },
    { key: 'confirm', label: 'Confirm' },
]

const INPUT_CLS = 'w-full bg-white border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors shadow-sm'
const LABEL_CLS = 'block text-sm font-bold text-gray-700 mb-1.5'

export default function PatientRegistrationPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>('personal')
    const [submitting, setSubmitting] = useState(false)

    const [form, setForm] = useState({
        // Personal
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        emergencyName: '',
        emergencyPhone: '',
        // Medical
        bloodType: '',
        primaryConcern: '',
        allergies: '',
        currentMedications: '',
        medicalHistory: '',
        idType: '',
        idNote: '',
        insurance: '',
        consentTreatment: false,
        consentPrivacy: false,
    })

    const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

    const handleSubmit = async () => {
        setSubmitting(true)
        // Simulate a slight delay to show loading state
        await new Promise(r => setTimeout(r, 1200))
        setSubmitting(false)
        setStep('success')
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-violet-100 rounded-full animate-ping"></div>
                        <div className="relative w-24 h-24 bg-violet-50 border-2 border-violet-200 rounded-full flex items-center justify-center">
                            <span className="text-4xl">🎉</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">You're Registered!</h1>
                        <p className="text-gray-600 text-base">Welcome to Clear Mind Life Health, {form.firstName}. Your patient profile has been created.</p>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 text-left space-y-4">
                        <div className="flex justify-between text-base">
                            <span className="text-gray-500 font-medium">Patient ID</span>
                            <span className="text-gray-900 font-mono font-bold">PAT-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between text-base">
                            <span className="text-gray-500 font-medium">Name</span>
                            <span className="text-gray-900 font-bold">{form.firstName} {form.lastName}</span>
                        </div>
                        <div className="flex justify-between text-base">
                            <span className="text-gray-500 font-medium">Primary Concern</span>
                            <span className="text-gray-900 font-bold">{form.primaryConcern || 'General'}</span>
                        </div>
                        <div className="flex justify-between text-base">
                            <span className="text-gray-500 font-medium">SMS Notifications</span>
                            <span className="text-green-600 font-bold">📱 Active</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/dashboard/healthcare/book')}
                            className="flex-[2] py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base transition-colors shadow-md"
                        >
                            Book Appointment
                        </button>
                        <button
                            onClick={() => router.push('/dashboard/healthcare')}
                            className="flex-1 py-3.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-base transition-colors"
                        >
                            Go to Triage
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Patient Registration</h1>
                    <p className="text-gray-500 text-base mt-1">Create your secure health profile to get started</p>
                </div>

                {/* Step Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {STEPS.map((s, i) => {
                        const currentIdx = STEPS.findIndex(x => x.key === step)
                        const done = i < currentIdx
                        const active = i === currentIdx
                        return (
                            <div key={s.key} className="flex items-center gap-2">
                                <div className={`flex items-center gap-2 ${done ? 'text-green-600' : active ? 'text-violet-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center border ${done ? 'bg-green-100 border-green-300' : active ? 'bg-violet-100 border-violet-300' : 'bg-gray-100 border-gray-300'
                                        }`}>
                                        {done ? '✓' : i + 1}
                                    </div>
                                    <span className="text-sm font-bold hidden sm:block">{s.label}</span>
                                </div>
                                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-300 mx-2 hidden sm:block" style={{ width: '40px' }}></div>}
                            </div>
                        )
                    })}
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">

                    {/* ── Step 1: Personal Info ── */}
                    {step === 'personal' && (
                        <>
                            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Personal Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>First Name <span className="text-red-400">*</span></label>
                                    <input className={INPUT_CLS} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Last Name <span className="text-red-400">*</span></label>
                                    <input className={INPUT_CLS} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Doe" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Email <span className="text-red-400">*</span></label>
                                    <input type="email" className={INPUT_CLS} value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Phone <span className="text-red-400">*</span></label>
                                    <input type="tel" className={INPUT_CLS} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Date of Birth <span className="text-red-400">*</span></label>
                                    <input type="date" className={INPUT_CLS} value={form.dob} onChange={e => set('dob', e.target.value)} />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Gender</label>
                                    <select className={INPUT_CLS} value={form.gender} onChange={e => set('gender', e.target.value)}>
                                        <option value="">Select gender</option>
                                        {GENDER_OPTIONS.map(g => <option key={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={LABEL_CLS}>Address</label>
                                <input className={INPUT_CLS} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Main St, City, State 12345" />
                            </div>
                            <div className="border-t border-gray-100 pt-5">
                                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Emergency Contact</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL_CLS}>Name</label>
                                        <input className={INPUT_CLS} value={form.emergencyName} onChange={e => set('emergencyName', e.target.value)} placeholder="Emergency Contact" />
                                    </div>
                                    <div>
                                        <label className={LABEL_CLS}>Phone</label>
                                        <input type="tel" className={INPUT_CLS} value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value)} placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => form.firstName && form.lastName && form.email ? setStep('medical') : null}
                                disabled={!form.firstName || !form.lastName || !form.email}
                                className={`w-full py-3.5 rounded-xl font-bold text-base transition-all mt-4 ${form.firstName && form.lastName && form.email
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90 shadow-md'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continue to Medical Info →
                            </button>
                        </>
                    )}

                    {/* ── Step 2: Medical Info ── */}
                    {step === 'medical' && (
                        <>
                            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Medical History</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Blood Type</label>
                                    <select className={INPUT_CLS} value={form.bloodType} onChange={e => set('bloodType', e.target.value)}>
                                        <option value="">Select blood type</option>
                                        {BLOOD_TYPES.map(b => <option key={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Primary Concern <span className="text-red-400">*</span></label>
                                    <select className={INPUT_CLS} value={form.primaryConcern} onChange={e => set('primaryConcern', e.target.value)}>
                                        <option value="">Select concern</option>
                                        {PRIMARY_CONCERNS.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={LABEL_CLS}>Known Allergies</label>
                                <input className={INPUT_CLS} value={form.allergies} onChange={e => set('allergies', e.target.value)} placeholder="Penicillin, Shellfish, Latex..." />
                            </div>
                            <div>
                                <label className={LABEL_CLS}>Current Medications</label>
                                <input className={INPUT_CLS} value={form.currentMedications} onChange={e => set('currentMedications', e.target.value)} placeholder="Metformin 500mg, Lisinopril 10mg..." />
                            </div>
                            <div>
                                <label className={LABEL_CLS}>Medical History</label>
                                <textarea
                                    className={INPUT_CLS + ' resize-none'}
                                    rows={3}
                                    value={form.medicalHistory}
                                    onChange={e => set('medicalHistory', e.target.value)}
                                    placeholder="Previous surgeries, chronic conditions, family history..."
                                />
                            </div>
                            <div className="border-t border-gray-100 pt-5">
                                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Identification & Insurance</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL_CLS}>ID Type</label>
                                        <select className={INPUT_CLS} value={form.idType} onChange={e => set('idType', e.target.value)}>
                                            <option value="">Select type</option>
                                            {ID_TYPES.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={LABEL_CLS}>Insurance Provider</label>
                                        <input className={INPUT_CLS} value={form.insurance} onChange={e => set('insurance', e.target.value)} placeholder="Blue Cross, Aetna, Medicare..." />
                                    </div>
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="border-t border-gray-100 pt-5 space-y-4">
                                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Consent & Privacy</p>
                                {[
                                    { key: 'consentTreatment', label: 'I consent to receive medical treatment' },
                                    { key: 'consentPrivacy', label: 'I acknowledge the HIPAA Privacy Policy' },
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => set(key, !(form as any)[key])}
                                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${(form as any)[key] ? 'bg-violet-600 border-violet-600' : 'border-gray-300 hover:border-violet-500 bg-white'
                                                }`}
                                        >
                                            {(form as any)[key] && <span className="text-white text-sm font-bold">✓</span>}
                                        </div>
                                        <span className="text-base font-medium text-gray-700">{label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setStep('personal')}
                                    className="flex-1 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => form.primaryConcern && form.consentTreatment && form.consentPrivacy ? setStep('confirm') : null}
                                    disabled={!form.primaryConcern || !form.consentTreatment || !form.consentPrivacy}
                                    className={`flex-[2] py-3.5 rounded-xl font-bold text-base transition-all ${form.primaryConcern && form.consentTreatment && form.consentPrivacy
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90 shadow-md'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Review & Submit →
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Step 3: Confirm ── */}
                    {step === 'confirm' && (
                        <>
                            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Review Your Information</h2>
                            <div className="grid grid-cols-2 gap-4 text-base">
                                {[
                                    { label: 'Full Name', value: `${form.firstName} ${form.lastName}` },
                                    { label: 'Email', value: form.email },
                                    { label: 'Phone', value: form.phone },
                                    { label: 'Date of Birth', value: form.dob },
                                    { label: 'Gender', value: form.gender || 'Not specified' },
                                    { label: 'Blood Type', value: form.bloodType || 'Not specified' },
                                    { label: 'Primary Concern', value: form.primaryConcern || 'General' },
                                    { label: 'Insurance', value: form.insurance || 'Not specified' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                                        <p className="text-gray-900 font-bold truncate">{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={() => setStep('medical')}
                                    className="flex-1 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                                >
                                    ← Edit
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className={`flex-[2] py-3.5 rounded-xl font-bold text-base transition-all ${submitting
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90 shadow-md'
                                        }`}
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </span>
                                    ) : 'Create Patient Profile'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
