"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Mic, Edit3, ShieldAlert, CheckCircle2, Search, Zap, Activity, RefreshCw } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend-healthtech.onrender.com'

type TranscriptLine = {
  speaker: 'Doctor' | 'Patient'
  text: string
  time: number
  highlight?: boolean
  isKeyword?: boolean
}

interface SOAPNote {
  subjective: string
  objective: string
  assessment: string
  plan: string
  icd10_codes: string[]
  cpt_codes: string[]
  safety_flags: string[]
}

const FULL_CONVERSATION: TranscriptLine[] = [
  { speaker: 'Doctor', text: "Hi Sarah, it's Dr. Chen. How are you feeling today?", time: 0 },
  { speaker: 'Patient', text: "Not great, honestly. My lower back has been killing me.", time: 2000 },
  { speaker: 'Doctor', text: "I'm sorry to hear that. How long has the pain been going on?", time: 4000 },
  { speaker: 'Patient', text: "About two weeks. It's mostly a dull ache, but if I bend over it shoots down my left leg.", time: 6000, highlight: true },
  { speaker: 'Doctor', text: "Shooting down the leg. Does the pain reach past your knee?", time: 9000 },
  { speaker: 'Patient', text: "Yes, all the way to my calf sometimes. And yesterday I had some numbness in my foot.", time: 11000, highlight: true },
  { speaker: 'Doctor', text: "Any weakness in the leg? Or loss of bowel or bladder control?", time: 14000 },
  { speaker: 'Patient', text: "No weakness, and no issues like that.", time: 17000 },
  { speaker: 'Doctor', text: "Okay. And just to check, have you had any chest pain or difficulty breathing?", time: 19000 },
  { speaker: 'Patient', text: "Actually, yes. Last night I had sudden chest pain that wouldn't go away.", time: 22000, isKeyword: true },
  { speaker: 'Doctor', text: "Sarah, are you having any chest pain right now?", time: 25000 },
  { speaker: 'Patient', text: "A little bit, yeah. It feels tight.", time: 27000 },
  { speaker: 'Doctor', text: "Alright, because of the chest pain, I want you to go to the emergency room immediately to get an EKG.", time: 30000 },
]

export default function EncounterSimulator() {
  const [callActive, setCallActive] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const [soapStatus, setSoapStatus] = useState<'idle' | 'generating' | 'ready'>('idle')
  const [soapNote, setSoapNote] = useState<SOAPNote | null>(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [safetyTriggered, setSafetyTriggered] = useState(false)
  const [soapError, setSoapError] = useState<string | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (callActive && currentLineIndex < FULL_CONVERSATION.length) {
      const line = FULL_CONVERSATION[currentLineIndex]
      if (line.isKeyword) setSafetyTriggered(true)
      timeout = setTimeout(() => {
        setTranscript(prev => [...prev, line])
        setCurrentLineIndex(prev => prev + 1)
      }, currentLineIndex === 0 ? 500 : 2500)
    } else if (callActive && currentLineIndex >= FULL_CONVERSATION.length) {
      endCall()
    }
    return () => clearTimeout(timeout)
  }, [callActive, currentLineIndex])

  const startCall = () => {
    setCallActive(true)
    setCallEnded(false)
    setTranscript([])
    setCurrentLineIndex(0)
    setSoapStatus('idle')
    setSoapNote(null)
    setSafetyTriggered(false)
    setSoapError(null)
  }

  const endCall = async () => {
    setCallActive(false)
    setCallEnded(true)
    setSoapStatus('generating')
    setSoapError(null)

    try {
      const res = await fetch(`${API_BASE}/api/v1/encounter/generate-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: FULL_CONVERSATION.map(l => ({ speaker: l.speaker, text: l.text })),
          patient_name: 'Sarah Johnson',
          provider_name: 'Dr. Mei-Ling Chen',
        }),
      })

      if (!res.ok) throw new Error('SOAP generation failed')
      const data = await res.json()
      setSoapNote(data.soap_note)
      setSoapStatus('ready')
    } catch (err: any) {
      setSoapError(err.message)
      // Fallback to hardcoded SOAP note
      setSoapNote({
        subjective: "Patient reports 2-week history of lower back pain with left-sided radiation to calf and foot numbness. Denies bowel/bladder dysfunction. Discloses acute chest tightness onset last evening.",
        objective: "Telehealth encounter. Neurological and cardiac exams deferred pending ED evaluation.",
        assessment: "1. Lumbar radiculopathy, left L4-L5 distribution. 2. Acute chest pain — cardiac etiology must be excluded.",
        plan: "1. STAT ED referral for EKG and troponin. 2. Lumbar MRI pending cardiac clearance. 3. Follow-up in 48 hours.",
        icd10_codes: ["M54.42", "G57.20", "R07.9"],
        cpt_codes: ["99214"],
        safety_flags: ["Chest pain disclosed during encounter — emergency escalation triggered."],
      })
      setSoapStatus('ready')
    }
  }

  return (
    <div className="w-full p-6">
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left: Live Transcript */}
        <div className="flex flex-col gap-4">
          {/* Call Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${callActive ? 'bg-red-500 animate-pulse' : callEnded ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-bold text-gray-700">
                {callActive ? 'Live Encounter' : callEnded ? 'Encounter Complete' : 'Ready'}
              </span>
            </div>
            <div className="flex gap-2">
              {!callActive && !callEnded && (
                <button
                  onClick={startCall}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" /> Start Encounter
                </button>
              )}
              {callActive && (
                <button
                  onClick={endCall}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-sm"
                >
                  End Call
                </button>
              )}
              {callEnded && (
                <button
                  onClick={startCall}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Replay
                </button>
              )}
            </div>
          </div>

          {/* Safety Alert */}
          <AnimatePresence>
            {safetyTriggered && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
              >
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-800 text-sm">Safety Escalation Triggered</p>
                  <p className="text-xs text-red-700 mt-0.5">
                    Keyword detected: <strong>"chest pain"</strong> — Emergency protocol activated. Notifying on-call staff.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transcript Feed */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4 min-h-[320px] max-h-[400px] overflow-y-auto space-y-3">
            {transcript.length === 0 && (
              <p className="text-gray-600 text-xs font-mono">Awaiting encounter start...</p>
            )}
            {transcript.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: line.speaker === 'Doctor' ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 ${line.speaker === 'Patient' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  line.speaker === 'Doctor' ? 'bg-violet-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {line.speaker === 'Doctor' ? 'Dr' : 'Pt'}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  line.isKeyword
                    ? 'bg-red-900/60 text-red-200 border border-red-700'
                    : line.highlight
                    ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                    : line.speaker === 'Doctor'
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="text-[10px] font-bold opacity-60 mb-0.5">{line.speaker}</p>
                  <p>{line.text}</p>
                  {line.isKeyword && (
                    <p className="text-[10px] text-red-400 font-bold mt-1 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> SAFETY FLAG DETECTED
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={transcriptEndRef} />
          </div>

          {/* Progress */}
          {callActive && (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <motion.div
                  className="bg-violet-500 h-1.5 rounded-full"
                  animate={{ width: `${(currentLineIndex / FULL_CONVERSATION.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xs text-gray-500 font-mono">{currentLineIndex}/{FULL_CONVERSATION.length}</span>
            </div>
          )}
        </div>

        {/* Right: SOAP Note */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-violet-600" />
            <h3 className="font-bold text-gray-900">AI-Generated SOAP Note</h3>
            {soapStatus === 'ready' && (
              <span className="ml-auto px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">
                ✓ Ready to Sign
              </span>
            )}
          </div>

          {soapStatus === 'idle' && (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center text-gray-400 min-h-[320px] flex flex-col items-center justify-center">
              <Edit3 className="w-10 h-10 mb-3 opacity-30" />
              <p className="font-medium">SOAP note will auto-generate when the encounter ends</p>
              <p className="text-xs mt-1">Powered by OpenAI GPT-4o-mini</p>
            </div>
          )}

          {soapStatus === 'generating' && (
            <div className="bg-violet-50 rounded-2xl border border-violet-100 p-8 text-center min-h-[320px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
              <p className="font-bold text-violet-900">Generating SOAP Note...</p>
              <p className="text-sm text-violet-600 mt-1">AI is analyzing the encounter transcript</p>
            </div>
          )}

          {soapStatus === 'ready' && soapNote && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Safety flags */}
              {soapNote.safety_flags?.length > 0 && (
                <div className="bg-red-50 border-b border-red-100 p-4">
                  {soapNote.safety_flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 font-semibold">{flag}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-5 space-y-4">
                {[
                  { label: 'S — Subjective', value: soapNote.subjective, color: 'border-blue-400' },
                  { label: 'O — Objective', value: soapNote.objective, color: 'border-gray-400' },
                  { label: 'A — Assessment', value: soapNote.assessment, color: 'border-amber-400' },
                  { label: 'P — Plan', value: soapNote.plan, color: 'border-emerald-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`border-l-4 ${color} pl-4`}>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{value}</p>
                  </div>
                ))}

                {/* Codes */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {soapNote.icd10_codes?.map(code => (
                      <span key={code} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-mono font-bold">
                        ICD-10: {code}
                      </span>
                    ))}
                    {soapNote.cpt_codes?.map(code => (
                      <span key={code} className="px-2 py-1 bg-violet-50 text-violet-700 border border-violet-100 rounded text-xs font-mono font-bold">
                        CPT: {code}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sign button */}
                <button className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Approve & Sign Note
                </button>

                {soapError && (
                  <p className="text-xs text-amber-600 text-center">
                    Note: Using fallback data (API unavailable)
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
