'use client'

import { useState } from 'react'
import { DEMO_APPOINTMENTS } from '@/config/healthcare'
import Link from 'next/link'

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
    confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700 border border-green-300', dot: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border border-yellow-300', dot: 'bg-yellow-500' },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-700 border border-blue-300', dot: 'bg-blue-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border border-red-300', dot: 'bg-red-500' },
}

const TYPE_CONFIG: Record<string, { label: string; icon: string }> = {
    telehealth: { label: 'Telehealth', icon: '📹' },
    'in-person': { label: 'In-Person', icon: '🏥' },
}

export default function AppointmentsAdminPage() {
    const [appointments, setAppointments] = useState(DEMO_APPOINTMENTS)
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const [search, setSearch] = useState('')
    const [confirmModal, setConfirmModal] = useState<{ id: string; action: string } | null>(null)

    const filtered = appointments.filter(apt => {
        const matchStatus = filterStatus === 'all' || apt.status === filterStatus
        const matchSearch = !search ||
            apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
            apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
            apt.id.toLowerCase().includes(search.toLowerCase())
        return matchStatus && matchSearch
    })

    const updateStatus = (id: string, newStatus: string) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
        setConfirmModal(null)
    }

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        confirmed: appointments.filter(a => a.status === 'confirmed').length,
        completed: appointments.filter(a => a.status === 'completed').length,
        cancelled: appointments.filter(a => a.status === 'cancelled').length,
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Appointment Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Review, confirm, and manage all patient appointments</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/healthcare/book"
                        className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                    >
                        + New Appointment
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total', value: stats.total, color: 'text-gray-700', bg: 'bg-white border border-gray-200' },
                    { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50 border border-yellow-200' },
                    { label: 'Confirmed', value: stats.confirmed, color: 'text-green-600', bg: 'bg-green-50 border border-green-200' },
                    { label: 'Cancelled', value: stats.cancelled, color: 'text-red-600', bg: 'bg-red-50 border border-red-200' },
                ].map(stat => (
                    <div key={stat.label} className={`${stat.bg} rounded-xl p-4`}>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search patient, doctor, appointment ID..."
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors shadow-sm"
                />
                <div className="flex gap-2">
                    {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-colors ${filterStatus === s
                                ? 'bg-violet-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 text-left bg-gray-50">
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Patient</th>
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Doctor</th>
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Type</th>
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-gray-500 text-base">
                                        No appointments found
                                    </td>
                                </tr>
                            ) : filtered.map(apt => {
                                const status = STATUS_CONFIG[apt.status]
                                const type = TYPE_CONFIG[apt.type]
                                return (
                                    <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-5">
                                            <div>
                                                <p className="text-base font-bold text-gray-900">{apt.patientName}</p>
                                                <p className="text-sm font-medium text-gray-500">{apt.patientPhone}</p>
                                                <p className="text-xs text-gray-400 font-mono mt-0.5">{apt.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5">
                                            <div>
                                                <p className="text-base font-bold text-gray-800">{apt.doctor}</p>
                                                <p className="text-sm font-medium text-gray-500">{apt.specialty}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5">
                                            <p className="text-base font-bold text-gray-800">{apt.date}</p>
                                            <p className="text-sm text-gray-500">{apt.time}</p>
                                        </td>
                                        <td className="px-5 py-5">
                                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                                                <span>{type.icon}</span> {type.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-5">
                                            <span className={`text-sm font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm ${status.color}`}>
                                                <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-5">
                                            <div className="flex gap-2">
                                                {apt.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => setConfirmModal({ id: apt.id, action: 'confirmed' })}
                                                            className="px-3 py-1.5 rounded-lg text-sm font-bold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors shadow-sm"
                                                        >
                                                            ✓ Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmModal({ id: apt.id, action: 'cancelled' })}
                                                            className="px-3 py-1.5 rounded-lg text-sm font-bold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors shadow-sm"
                                                        >
                                                            ✗ Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {apt.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => setConfirmModal({ id: apt.id, action: 'cancelled' })}
                                                        className="px-3 py-1.5 rounded-lg text-sm font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-200 hover:border-red-200 transition-colors shadow-sm"
                                                    >
                                                        ✗ Cancel
                                                    </button>
                                                )}
                                                {(apt.status === 'completed' || apt.status === 'cancelled') && (
                                                    <span className="text-xs text-gray-600">—</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirm Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {confirmModal.action === 'confirmed' ? '✅ Confirm Appointment' : '❌ Cancel Appointment'}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            {confirmModal.action === 'confirmed'
                                ? 'This will confirm the appointment and notify the patient via SMS.'
                                : 'This will cancel the appointment. The patient will be notified.'
                            }
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => updateStatus(confirmModal.id, confirmModal.action)}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${confirmModal.action === 'confirmed'
                                    ? 'bg-green-600 hover:bg-green-500 text-white'
                                    : 'bg-red-600 hover:bg-red-500 text-white'
                                    }`}
                            >
                                {confirmModal.action === 'confirmed' ? 'Confirm' : 'Cancel Appointment'}
                            </button>
                            <button
                                onClick={() => setConfirmModal(null)}
                                className="flex-1 py-2 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
