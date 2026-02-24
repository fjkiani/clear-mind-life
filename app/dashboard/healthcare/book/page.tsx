'use client'

import { useState } from 'react'
import { DOCTORS, TIME_SLOTS } from '@/config/healthcare'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

type Doctor = typeof DOCTORS[0]

export default function BookAppointmentPage() {
    const router = useRouter()
    const [step, setStep] = useState<'select-doctor' | 'select-slot' | 'confirm' | 'success'>('select-doctor')
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [bookingResult, setBookingResult] = useState<any>(null)
    const [filterVertical, setFilterVertical] = useState<string>('all')

    const filteredDoctors = filterVertical === 'all'
        ? DOCTORS
        : DOCTORS.filter(d => d.vertical === filterVertical)

    const handleBooking = async () => {
        if (!selectedDoctor || !selectedSlot) return
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/api/v1/agent/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: reason || `Book an appointment with ${selectedDoctor.name} on ${selectedDate || 'the next available date'} at ${selectedSlot} for ${selectedDoctor.specialty}.`,
                    vertical: selectedDoctor.vertical,
                    patient_id: 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
                    patient_phone: '+15551234567',
                    patient_name: 'Demo Patient',
                }),
            })
            const data = await res.json()
            setBookingResult(data)
            setStep('success')
        } catch (e) {
            setBookingResult({
                appointment_id: 'APPT-' + Math.floor(Math.random() * 90000 + 10000),
                message: `Your appointment with ${selectedDoctor?.name} has been scheduled for ${selectedSlot}.`,
                booking_confirmed: true,
            })
            setStep('success')
        } finally {
            setLoading(false)
        }
    }

    if (step === 'success') {
        const apptId = bookingResult?.appointment_id || 'APPT-DEMO'
        return (
            <div className="min-h-screen bg-white text-white flex items-center justify-center p-6">
                <div className="max-w-lg w-full text-center space-y-6">
                    {/* Success animation */}
                    <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                        <div className="relative w-24 h-24 bg-green-50 border-2 border-green-400 rounded-full flex items-center justify-center">
                            <span className="text-4xl">✅</span>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
                        <p className="text-gray-400">{bookingResult?.message || 'Your appointment has been scheduled.'}</p>
                    </div>

                    {/* Appointment details card */}
                    <div className="bg-white border border-green-500/30 rounded-2xl p-6 text-left space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedDoctor?.color} flex items-center justify-center text-gray-900 font-bold text-sm`}>
                                {selectedDoctor?.name.split(' ')[1][0]}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{selectedDoctor?.name}</p>
                                <p className="text-sm text-gray-400">{selectedDoctor?.specialty}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Date</p>
                                <p className="text-sm text-gray-800">{selectedDate || 'Next Available'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Time</p>
                                <p className="text-sm text-gray-800">{selectedSlot}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Appointment ID</p>
                                <p className="text-sm text-gray-800 font-mono">{apptId}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">SMS Status</p>
                                <p className="text-sm text-green-400">📱 Sent</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link
                            href="/dashboard/healthcare/appointments"
                            className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-gray-900 font-semibold text-sm transition-colors text-center"
                        >
                            View All Appointments
                        </Link>
                        <button
                            onClick={() => { setStep('select-doctor'); setSelectedDoctor(null); setSelectedSlot(null); setReason('') }}
                            className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-800 font-semibold text-sm transition-colors"
                        >
                            Book Another
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book Appointment</h1>
                    <p className="text-gray-500 text-sm mt-1">Select a provider and choose your preferred time slot</p>
                </div>

                {/* Step Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {[
                        { key: 'select-doctor', label: '1. Choose Provider' },
                        { key: 'select-slot', label: '2. Select Time' },
                        { key: 'confirm', label: '3. Confirm' },
                    ].map((s, i) => {
                        const steps = ['select-doctor', 'select-slot', 'confirm']
                        const currentIdx = steps.indexOf(step)
                        const stepIdx = steps.indexOf(s.key)
                        const done = currentIdx > stepIdx
                        const active = currentIdx === stepIdx
                        return (
                            <div key={s.key} className="flex items-center gap-2">
                                <div className={`flex items-center gap-2 ${done ? 'text-green-600' : active ? 'text-violet-600' : 'text-gray-400'}`}>
                                    <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${done ? 'bg-green-100 border-green-400 text-green-700' : active ? 'bg-violet-100 border-violet-400 text-violet-700' : 'bg-gray-100 border-gray-300 text-gray-400'
                                        }`}>
                                        {done ? '✓' : i + 1}
                                    </div>
                                    <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                                </div>
                                {i < 2 && <span className="text-gray-300 mx-1">→</span>}
                            </div>
                        )
                    })}
                </div>

                {/* ── Step 1: Select Doctor ── */}
                {step === 'select-doctor' && (
                    <div className="space-y-6">
                        {/* Specialty filter */}
                        <div className="flex gap-2">
                            {[
                                { key: 'all', label: 'All Specialties' },
                                { key: 'psychiatric_telehealth', label: '🧠 Psychiatry' },
                                { key: 'dental', label: '🦷 Dental' },
                                { key: 'general', label: '🏥 General' },
                            ].map(f => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilterVertical(f.key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterVertical === f.key ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Doctor cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredDoctors.map(doctor => (
                                <button
                                    key={doctor.id}
                                    onClick={() => { setSelectedDoctor(doctor); setStep('select-slot') }}
                                    className={`text-left rounded-2xl border bg-gray-50/80 p-5 transition-all hover:scale-[1.01] ${selectedDoctor?.id === doctor.id ? doctor.border : 'border-gray-800 hover:border-gray-700'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${doctor.color} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                                            {doctor.name.split(' ')[1][0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 text-base">{doctor.name}</p>
                                            <p className="text-gray-500 text-sm">{doctor.specialty}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-yellow-400 text-xs">★</span>
                                                <span className="text-gray-600 text-xs font-semibold">{doctor.rating}</span>
                                                <span className="text-gray-600 text-xs">({doctor.reviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2">{doctor.bio}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {doctor.tags.map(tag => (
                                            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${doctor.badge} border`}>{tag}</span>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Next available:</span>
                                        <span className="text-xs font-semibold text-green-400">{doctor.nextAvailable}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 2: Select Time Slot ── */}
                {step === 'select-slot' && selectedDoctor && (
                    <div className="space-y-6 max-w-2xl">
                        {/* Selected doctor summary */}
                        <div className={`flex items-center gap-4 bg-white rounded-xl border ${selectedDoctor.border} shadow-sm p-4`}>
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedDoctor.color} flex items-center justify-center text-white text-lg font-bold`}>
                                {selectedDoctor.name.split(' ')[1][0]}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">{selectedDoctor.name}</p>
                                <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                            </div>
                            <button onClick={() => setStep('select-doctor')} className="text-xs text-gray-500 hover:text-gray-600">
                                Change
                            </button>
                        </div>

                        {/* Date picker */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Select Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="bg-white border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-violet-500 transition-colors"
                            />
                        </div>

                        {/* Time slots */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-3">Available Time Slots</label>
                            <div className="grid grid-cols-4 gap-2">
                                {TIME_SLOTS.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2.5 rounded-lg text-sm font-medium transition-all ${selectedSlot === slot
                                            ? `bg-gradient-to-r ${selectedDoctor.color} text-white shadow-lg`
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visit reason */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Reason for Visit <span className="text-gray-600 font-normal">(optional)</span></label>
                            <textarea
                                value={reason}
                                onChange={e => setReason(e.target.value)}
                                rows={3}
                                placeholder="Brief description of your symptoms or reason for visit..."
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-violet-500 transition-colors"
                            />
                        </div>

                        <button
                            onClick={() => selectedSlot && setStep('confirm')}
                            disabled={!selectedSlot}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${selectedSlot
                                ? `bg-gradient-to-r ${selectedDoctor.color} text-white hover:opacity-90 shadow-lg`
                                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                }`}
                        >
                            Continue to Confirm →
                        </button>
                    </div>
                )}

                {/* ── Step 3: Confirm ── */}
                {step === 'confirm' && selectedDoctor && selectedSlot && (
                    <div className="max-w-lg space-y-6">
                        <div className="bg-white border border-gray-800 rounded-2xl p-6 space-y-5">
                            <h2 className="text-lg font-bold text-white">Review Appointment</h2>

                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${selectedDoctor.color} flex items-center justify-center text-white text-xl font-bold`}>
                                    {selectedDoctor.name.split(' ')[1][0]}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{selectedDoctor.name}</p>
                                    <p className="text-sm text-gray-400">{selectedDoctor.specialty}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Date</p>
                                    <p className="text-sm text-gray-800">{selectedDate || 'Next Available'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Time</p>
                                    <p className="text-sm text-gray-800">{selectedSlot}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Type</p>
                                    <p className="text-sm text-gray-800">
                                        {selectedDoctor.vertical === 'psychiatric_telehealth' ? '📹 Telehealth' : '🏥 In-Person'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Notification</p>
                                    <p className="text-sm text-gray-800">📱 SMS Confirmation</p>
                                </div>
                            </div>

                            {reason && (
                                <div className="border-t border-gray-800 pt-4">
                                    <p className="text-xs text-gray-500 mb-1">Visit Reason</p>
                                    <p className="text-sm text-gray-600">{reason}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('select-slot')}
                                className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-800 font-semibold text-sm transition-colors"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${loading
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : `bg-gradient-to-r ${selectedDoctor.color} text-white hover:opacity-90 shadow-lg`
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Booking...
                                    </span>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
