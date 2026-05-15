"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ShieldCheck, CreditCard, FileText, CheckCircle2 } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend-healthtech.onrender.com'

type LogEntry = { text: string; class: string }

interface EligibilityResult {
  patient_name: string
  payer_name: string
  coverage_status: string
  copay: string | null
  deductible_met: boolean
  deductible_remaining: string | null
  out_of_pocket_max: string | null
  prior_auth_required: boolean
  x12_270_snippet: string
  x12_271_snippet: string
  fhir_coverage_id: string
  demo_mode: boolean
}

const PAYER_OPTIONS = ['BCBS', 'Aetna', 'UHC', 'Cigna', 'Humana', 'Medicare', 'Medicaid']

export default function EligibilityChecker() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [patientName, setPatientName] = useState('Sarah Johnson')
  const [payer, setPayer] = useState('BCBS')
  const [memberId, setMemberId] = useState('')
  const [dob, setDob] = useState('')

  const addLog = (text: string, cls: string) =>
    setLogs(prev => [...prev, { text, class: cls }])

  const startSimulation = async () => {
    if (!patientName.trim()) return
    setStep(1)
    setLogs([])
    setResult(null)
    setError(null)

    // Animate the X12 handshake sequence
    const sequence: LogEntry[] = [
      { text: '$ INITIATING X12_270_ELIGIBILITY_REQUEST', class: 'text-violet-400' },
      { text: '> Assembling FHIR Patient Resource...', class: 'text-gray-400' },
      { text: '> Encrypting payload via AES-256 TLS 1.3', class: 'text-gray-400' },
      { text: `> Transmitting to ${payer} Clearinghouse`, class: 'text-gray-400' },
    ]

    let delay = 0
    for (const entry of sequence) {
      delay += 600
      setTimeout(() => addLog(entry.text, entry.class), delay)
    }

    // Hit the real API
    setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/eligibility/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patient_name: patientName,
            payer_name: payer,
            member_id: memberId || undefined,
            date_of_birth: dob || undefined,
          }),
        })

        if (!res.ok) throw new Error('Eligibility check failed')
        const data: EligibilityResult = await res.json()

        // Show X12 snippets from the real response
        const x12Lines = data.x12_270_snippet.split('\n').slice(0, 6)
        for (let i = 0; i < x12Lines.length; i++) {
          setTimeout(
            () => addLog(x12Lines[i], 'text-gray-500 font-mono text-xs'),
            i * 200
          )
        }

        setTimeout(() => addLog('... AWAITING 271 RESPONSE ...', 'text-amber-400'), x12Lines.length * 200 + 400)

        setTimeout(() => {
          addLog('$ RECEIVED X12_271_ELIGIBILITY_RESPONSE', 'text-emerald-400')
          addLog('> Parsing EDI segments to FHIR Coverage...', 'text-gray-400')
          addLog(`$ COVERAGE_STATUS = ${data.coverage_status}`, 'text-emerald-400 font-bold')
          if (data.copay) addLog(`$ COPAY_DETECTED = ${data.copay}`, 'text-emerald-400 font-bold')
          addLog(`$ DEDUCTIBLE_MET = ${data.deductible_met ? 'TRUE' : 'FALSE'}`, 'text-emerald-400 font-bold')
          if (data.prior_auth_required) addLog('! PRIOR_AUTH_REQUIRED = TRUE', 'text-amber-400 font-bold')
          setResult(data)
          setStep(2)
        }, x12Lines.length * 200 + 1800)
      } catch (err: any) {
        addLog(`$ ERROR: ${err.message}`, 'text-red-400')
        setError(err.message)
        setStep(0)
      }
    }, delay + 400)
  }

  const reset = () => {
    setStep(0)
    setLogs([])
    setResult(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-violet-600" />
            Autonomous Receptionist Engine
          </h2>
          <p className="text-gray-500 mt-1">Live X12 270/271 Eligibility Validation via Clearinghouse</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">Availity EDI</span>
          <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">FHIR R4</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Left: Patient Intake Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {patientName ? patientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'PT'}
            </div>
            <div>
              <p className="font-bold text-gray-900">{patientName || 'New Patient'}</p>
              <p className="text-xs text-gray-500">Insurance Eligibility Check</p>
            </div>
          </div>

          <div className="p-6 flex-grow flex flex-col justify-center">
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Patient Name *</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                    placeholder="First Last"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Payer / Insurance</label>
                  <select
                    value={payer}
                    onChange={e => setPayer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white"
                  >
                    {PAYER_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Member ID</label>
                    <input
                      type="text"
                      value={memberId}
                      onChange={e => setMemberId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={startSimulation}
                  disabled={!patientName.trim()}
                  className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Run AI Eligibility Check
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="text-center py-8">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                  <Activity className="absolute inset-0 m-auto w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Agent Handshake Active</h3>
                <p className="text-gray-500 text-sm mt-1">Querying {payer} clearinghouse...</p>
              </div>
            )}

            {step === 2 && result && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900">Coverage Verified</p>
                      <p className="text-sm text-emerald-700">{result.payer_name} — {result.coverage_status}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Copay</p>
                      <p className="text-xl font-black text-gray-900">{result.copay || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Deductible Met</p>
                      <p className="text-xl font-black text-gray-900">{result.deductible_met ? 'Yes ✓' : 'No'}</p>
                    </div>
                    {result.deductible_remaining && (
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Deductible Remaining</p>
                        <p className="text-lg font-black text-gray-900">{result.deductible_remaining}</p>
                      </div>
                    )}
                    {result.out_of_pocket_max && (
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">OOP Max</p>
                        <p className="text-lg font-black text-gray-900">{result.out_of_pocket_max}</p>
                      </div>
                    )}
                  </div>

                  {result.prior_auth_required && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-semibold flex items-center gap-2">
                      ⚠️ Prior Authorization Required
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <CreditCard className="w-3 h-3" />
                    <span>FHIR ID: {result.fhir_coverage_id}</span>
                    {result.demo_mode && <span className="ml-auto text-violet-400 font-medium">Demo Mode</span>}
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Check Another Patient
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right: EDI Terminal */}
        <div className="bg-gray-950 rounded-2xl border border-gray-800 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-gray-400 text-xs font-mono">clearinghouse_edi.log</span>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto min-h-[300px] space-y-1">
            {logs.length === 0 && (
              <p className="text-gray-600 text-xs">Awaiting eligibility request...</p>
            )}
            {logs.map((log, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={`leading-relaxed ${log.class}`}
              >
                {log.text}
              </motion.p>
            ))}
            {step === 2 && result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-gray-800"
              >
                <p className="text-gray-500 text-xs mb-2">— X12 271 Response Snippet —</p>
                {result.x12_271_snippet.split('\n').slice(0, 8).map((line, i) => (
                  <p key={i} className="text-gray-500 font-mono text-xs leading-relaxed">{line}</p>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
