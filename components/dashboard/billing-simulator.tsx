"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, AlertTriangle, CheckCircle2, BrainCircuit, Play, Plus, Trash2 } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend-healthtech.onrender.com'

type ClaimStatus = 'pending' | 'scanning' | 'flagged' | 'cleared'

type Claim = {
  id: string
  patient: string
  payer: string
  amount: number
  status: ClaimStatus
  codes: string[]
  issue?: string
  fix?: string
  confidence?: number
}

const DEFAULT_CLAIMS: Claim[] = [
  { id: 'CLM-9011', patient: 'Michael R.', payer: 'Aetna', amount: 350.00, status: 'pending', codes: ['99214', 'M54.50'] },
  { id: 'CLM-9012', patient: 'Sarah J.', payer: 'BCBS', amount: 125.00, status: 'pending', codes: ['99213', 'R07.9'] },
  { id: 'CLM-9013', patient: 'David W.', payer: 'UHC', amount: 850.00, status: 'pending', codes: ['99215', 'G2211', 'M54.32'] },
]

export default function BillingSimulator() {
  const [pipelineActive, setPipelineActive] = useState(false)
  const [claims, setClaims] = useState<Claim[]>(DEFAULT_CLAIMS)
  const [activeLogs, setActiveLogs] = useState<string[]>([])
  const [scanComplete, setScanComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // New claim form
  const [showAddForm, setShowAddForm] = useState(false)
  const [newClaim, setNewClaim] = useState({ patient: '', payer: 'BCBS', amount: '', codes: '' })

  const addLog = (msg: string) => setActiveLogs(prev => [...prev, msg])

  const runPipeline = async () => {
    setPipelineActive(true)
    setScanComplete(false)
    setActiveLogs([])
    setError(null)

    // Reset to scanning
    setClaims(prev => prev.map(c => ({ ...c, status: 'scanning' as ClaimStatus, issue: undefined, fix: undefined, confidence: undefined })))

    addLog('> Establishing 277CA Secure Connection...')
    await sleep(500)
    addLog('> Loading Payer Rulesets (UHC, BCBS, Aetna, Cigna)')
    await sleep(700)
    addLog(`$ BATCH_01: Processing ${claims.length} Claims...`)
    await sleep(800)

    try {
      const res = await fetch(`${API_BASE}/api/v1/billing/scrub-claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claims: claims.map(c => ({
            id: c.id,
            patient: c.patient,
            payer: c.payer,
            amount: c.amount,
            codes: c.codes,
          })),
        }),
      })

      if (!res.ok) throw new Error('Billing scrub failed')
      const data = await res.json()

      // Animate results one by one
      for (const result of data.results) {
        await sleep(800)
        if (result.status === 'cleared') {
          addLog(`  ✓ [${result.id}] ${result.payer} ruleset passed. No NCCI edits triggered.`)
        } else {
          addLog(`  ! [${result.id}] ${result.payer} Violation: ${result.issue}`)
        }
        setClaims(prev =>
          prev.map(c =>
            c.id === result.id
              ? {
                  ...c,
                  status: result.status as ClaimStatus,
                  issue: result.issue,
                  fix: result.fix,
                  confidence: result.confidence,
                }
              : c
          )
        )
      }

      await sleep(400)
      addLog(`$ BATCH_01: Scan Complete. ${data.flagged_count} Anomal${data.flagged_count === 1 ? 'y' : 'ies'} Detected.`)
      setScanComplete(true)
    } catch (err: any) {
      addLog(`$ ERROR: ${err.message}`)
      setError(err.message)
    } finally {
      setPipelineActive(false)
    }
  }

  const addClaim = () => {
    if (!newClaim.patient || !newClaim.amount || !newClaim.codes) return
    const id = `CLM-${Math.floor(9000 + Math.random() * 1000)}`
    setClaims(prev => [...prev, {
      id,
      patient: newClaim.patient,
      payer: newClaim.payer,
      amount: parseFloat(newClaim.amount),
      status: 'pending',
      codes: newClaim.codes.split(',').map(c => c.trim()).filter(Boolean),
    }])
    setNewClaim({ patient: '', payer: 'BCBS', amount: '', codes: '' })
    setShowAddForm(false)
    setScanComplete(false)
  }

  const removeClaim = (id: string) => setClaims(prev => prev.filter(c => c.id !== id))

  const reset = () => {
    setClaims(DEFAULT_CLAIMS)
    setActiveLogs([])
    setScanComplete(false)
    setPipelineActive(false)
    setError(null)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-violet-600" />
            AI Billing Compliance Engine
          </h2>
          <p className="text-gray-500 mt-1">NCCI Edit Validation + Payer-Specific LCD Policy Enforcement</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 rounded bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">NCCI Edits</span>
          <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">277CA</span>
          <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">LCD Rules</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Left: Claims Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Claims Queue ({claims.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(v => !v)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Claim
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {/* Add Claim Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-violet-50 border border-violet-200 rounded-xl p-4 space-y-3 overflow-hidden"
              >
                <p className="text-xs font-bold text-violet-700 uppercase tracking-wider">New Claim</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Patient name"
                    value={newClaim.patient}
                    onChange={e => setNewClaim(p => ({ ...p, patient: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                  <select
                    value={newClaim.payer}
                    onChange={e => setNewClaim(p => ({ ...p, payer: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  >
                    {['BCBS', 'Aetna', 'UHC', 'Cigna', 'Humana'].map(p => <option key={p}>{p}</option>)}
                  </select>
                  <input
                    placeholder="Amount ($)"
                    type="number"
                    value={newClaim.amount}
                    onChange={e => setNewClaim(p => ({ ...p, amount: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                  <input
                    placeholder="CPT/ICD codes (comma-sep)"
                    value={newClaim.codes}
                    onChange={e => setNewClaim(p => ({ ...p, codes: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={addClaim}
                  className="w-full py-2 bg-violet-600 text-white rounded-lg text-sm font-bold hover:bg-violet-700 transition-colors"
                >
                  Add to Queue
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Claims List */}
          <div className="space-y-3">
            {claims.map(claim => (
              <motion.div
                key={claim.id}
                layout
                className={`bg-white rounded-xl border p-4 shadow-sm transition-colors ${
                  claim.status === 'flagged' ? 'border-red-200 bg-red-50/30' :
                  claim.status === 'cleared' ? 'border-emerald-200 bg-emerald-50/30' :
                  claim.status === 'scanning' ? 'border-violet-200 bg-violet-50/30' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-gray-500">{claim.id}</span>
                      <StatusBadge status={claim.status} />
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{claim.patient}</p>
                    <p className="text-xs text-gray-500">{claim.payer} · ${claim.amount.toFixed(2)}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {claim.codes.map(code => (
                        <span key={code} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono font-bold">{code}</span>
                      ))}
                    </div>
                  </div>
                  {claim.status === 'pending' && (
                    <button onClick={() => removeClaim(claim.id)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Flagged detail */}
                {claim.status === 'flagged' && claim.issue && (
                  <div className="mt-3 pt-3 border-t border-red-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 font-medium">{claim.issue}</p>
                    </div>
                    {claim.fix && (
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-500 text-xs font-bold shrink-0">FIX:</span>
                        <p className="text-xs text-emerald-700">{claim.fix}</p>
                      </div>
                    )}
                    {claim.confidence && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-violet-500 h-1.5 rounded-full"
                            style={{ width: `${claim.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-violet-700">{claim.confidence}% confidence</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Run Button */}
          <button
            onClick={runPipeline}
            disabled={pipelineActive || claims.length === 0}
            className="w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            {pipelineActive ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Scanning Claims...</>
            ) : (
              <><Play className="w-4 h-4" /> Run Compliance Pipeline</>
            )}
          </button>

          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-violet-50 border border-violet-200 rounded-xl"
            >
              <p className="font-bold text-violet-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-600" />
                Scan Complete
              </p>
              <p className="text-xs text-violet-700 mt-1">
                {claims.filter(c => c.status === 'cleared').length} cleared ·{' '}
                {claims.filter(c => c.status === 'flagged').length} flagged for review
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: EDI Terminal */}
        <div className="bg-gray-950 rounded-2xl border border-gray-800 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-gray-400 text-xs font-mono">ncci_compliance.log</span>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto min-h-[300px] space-y-1">
            {activeLogs.length === 0 && (
              <p className="text-gray-600 text-xs">Awaiting pipeline execution...</p>
            )}
            {activeLogs.map((log, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={`leading-relaxed text-xs ${
                  log.startsWith('  !') ? 'text-red-400' :
                  log.startsWith('  ✓') ? 'text-emerald-400' :
                  log.startsWith('$') ? 'text-violet-400' :
                  log.startsWith('$ ERROR') ? 'text-red-400' :
                  'text-gray-400'
                }`}
              >
                {log}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  const config = {
    pending: 'bg-gray-100 text-gray-600',
    scanning: 'bg-violet-100 text-violet-700 animate-pulse',
    flagged: 'bg-red-100 text-red-700',
    cleared: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config[status]}`}>
      {status}
    </span>
  )
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
