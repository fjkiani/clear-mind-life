"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Zap, Phone, ArrowRight, CheckCircle, Terminal, MessageSquare, Play, Activity, ShieldCheck, Clock, Users } from 'lucide-react'
import Link from 'next/link'

const INTEGRATIONS = [
  {
    id: 'assemblyai',
    name: 'AssemblyAI',
    tagline: 'Real-Time Ambient Clinical Intelligence',
    color: 'violet',
    icon: Mic,
    logoText: 'AssemblyAI',
    category: 'Speech AI',
    website: 'https://assemblyai.com',
    elevator: `Every provider loses 2+ hours a day documenting what they just said. We eliminated that entirely. The Encounter Agent connects to AssemblyAI's real-time streaming WebSocket API during telehealth sessions — transcribing speech in under 300ms, mapping clinical keywords to ICD-10 codes, and constructing a SOAP note before the physician even hangs up.`,
    howWeUseIt: [
      { label: 'Real-Time Streaming (WebSocket)', desc: 'We open an AssemblyAI WebSocket session at visit start and stream PCM audio chunks. Partial transcripts fire in <300ms.' },
      { label: 'Speaker Diarization', desc: 'AssemblyAI labels "Patient" vs "Provider" segments. Our NLP pipeline processes each speaker separately to extract clinical context.' },
      { label: 'LeMUR Summarization', desc: 'After session end, we pass the full transcript to LeMUR with a clinical SOAP prompt. Output is structured JSON mapped to FHIR Observation resources.' },
      { label: 'PII Redaction', desc: 'AssemblyAI PII redaction fires before any text touches our FHIR pipeline — zero PHI leaks into the LLM layer.' },
    ],
    security: {
      title: "Zero-Retention Ambient Intelligence",
      description: "Why AssemblyAI is a critical moat for our clinical documentation pipeline:",
      points: [
        { label: 'BAA Executed & HIPAA Compliant', desc: 'We operate under a strict Business Associate Agreement (BAA) with AssemblyAI, ensuring all PHI is handled securely.' },
        { label: 'Zero-Data Retention Policy', desc: 'Audio streams are completely ephemeral. Data is never stored on AssemblyAI servers and is permanently wiped immediately after transcription.' },
        { label: 'On-Device PII Redaction', desc: 'AssemblyAI\'s advanced redaction removes names, SSNs, and phone numbers before the transcript ever hits our LLM layer.' },
        { label: 'SOC 2 Type II Certified', desc: 'Enterprise-grade security controls validate continuous protection of the audio pipeline against unauthorized access.' }
      ]
    },
    apiFlow: [
      { step: '1', label: 'WebSocket Open', code: `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000` },
      { step: '2', label: 'Send audio chunks', code: `socket.send(JSON.stringify({ audio_data: base64_chunk }))` },
      { step: '3', label: 'Receive partial transcripts', code: `{ "message_type": "PartialTranscript", "text": "The pain radiates down..." }` },
      { step: '4', label: 'LeMUR SOAP generation', code: `POST /lemur/v3/apply-task\n{ "prompt": "Generate a clinical SOAP note...", "transcript_ids": [...] }` },
    ],
    scenario: {
      label: 'Live Telehealth Session',
      steps: [
        { speaker: 'Provider', text: 'Where exactly is the pain located?', type: 'provider' },
        { speaker: 'Patient', text: 'My lower back, it radiates down my left leg when I bend.', type: 'patient' },
        { speaker: 'Provider', text: 'Is it sharp or dull? Does it get worse at night?', type: 'provider' },
        { speaker: 'Patient', text: 'Very sharp. Yes, especially at night when lying flat.', type: 'patient' },
        { speaker: 'AI', text: 'SOAP Generated — ICD-10: M54.41 (Lumbago with sciatica, left side). CPT: 99213. SOAP ready to approve.', type: 'ai' },
      ],
    },
    stats: [{ v: '< 300ms', l: 'Transcription latency' }, { v: '93.3%', l: 'Clinical code accuracy' }, { v: '2h+', l: 'Returned to providers daily' }],
  },
  {
    id: 'nexhealth',
    name: 'NexHealth',
    tagline: 'The Patient Intelligence Layer',
    color: 'sky',
    icon: Users,
    logoText: 'NexHealth',
    category: 'Patient Ops',
    website: 'https://nexhealth.com',
    elevator: `The moment a patient books an appointment, a race begins: verify insurance, confirm demographics, send intake forms, collect payment. Most practices lose this race. By wiring the NexHealth API to our Receptionist Agent, we win it automatically — hours before the patient arrives.`,
    howWeUseIt: [
      { label: 'Appointment Webhooks', desc: 'NexHealth fires a webhook the moment an appointment is created. Our agent immediately kicks off an insurance eligibility check via the X12 270 EDI pipeline.' },
      { label: 'Patient Record Sync', desc: 'We pull the patient\'s demographics, insurance info, and appointment history via the NexHealth REST API and store them as FHIR Patient and Coverage resources.' },
      { label: 'Digital Intake Forms', desc: 'We use the NexHealth Forms API to push AI-generated intake questionnaires directly to the patient\'s phone — pre-filled with existing demographics, requiring only signature.' },
      { label: 'Payment Collection', desc: 'After insurance is verified, we calculate the exact copay via X12 271 and push a Stripe payment link into the NexHealth message thread — cash collected before the visit.' },
    ],
    security: {
      title: "Federated Patient Data Isolation",
      description: "Why NexHealth forms the defensible perimeter of our patient intake pipeline:",
      points: [
        { label: 'Strict BAA & HIPAA Enforcement', desc: 'All data transferred between NexHealth and our platform is universally encrypted and BAA-protected.' },
        { label: 'Direct EHR Token Authentication', desc: 'NexHealth acts as a secure identity proxy. Our agents never hold master credentials to the underlying EHR — relying instead on short-lived OAuth tokens.' },
        { label: 'End-to-End Encryption (E2EE)', desc: 'Patient demographics and intake forms are encrypted at rest (AES-256) and in transit (TLS 1.3).' },
        { label: 'Automated Audit Logging', desc: 'Every demographic pull and appointment webhook is immutably logged for HIPAA compliance and security monitoring.' }
      ]
    },
    apiFlow: [
      { step: '1', label: 'Appointment created webhook', code: `POST /webhooks\n{ "event": "appointment.created", "patient_id": "pt_abc", "appointment_id": "ap_xyz" }` },
      { step: '2', label: 'Pull patient demographics', code: `GET /patients/{patient_id}\n→ { "first_name": "Sarah", "insurance": { "member_id": "A12B34", "plan": "BCBS" } }` },
      { step: '3', label: 'Push intake form', code: `POST /forms\n{ "patient_id": "pt_abc", "form_template_id": "intake_v2", "delivery": "sms" }` },
      { step: '4', label: 'Confirm + collect copay', code: `POST /messages\n{ "patient_id": "pt_abc", "message": "Your copay is $25. Pay here: stripe.link/..." }` },
    ],
    scenario: {
      label: 'Appointment Booking Flow',
      steps: [
        { speaker: 'NexHealth', text: 'Webhook received: Sarah Johnson booked for 9:00 AM tomorrow.', type: 'provider' },
        { speaker: 'Agent', text: 'Running X12 270 eligibility check against BlueCross...', type: 'ai' },
        { speaker: 'Clearinghouse', text: 'X12 271 response: Active Coverage. Copay: $25.00. Deductible: Met.', type: 'provider' },
        { speaker: 'Agent', text: 'Sending SMS intake form to Sarah\'s phone + payment link...', type: 'ai' },
        { speaker: 'Patient', text: 'Sarah completed intake form and paid $25.00 via Stripe. ✓', type: 'patient' },
      ],
    },
    stats: [{ v: 'Zero', l: 'Front-desk calls needed' }, { v: '> 95%', l: 'Intake completion rate' }, { v: '$25', l: 'Avg copay auto-collected' }],
  },
  {
    id: 'twilio',
    name: 'Twilio',
    tagline: 'The Voice of the Revenue Engine',
    color: 'rose',
    icon: Phone,
    logoText: 'Twilio',
    category: 'Communications',
    website: 'https://twilio.com',
    elevator: `Denied claims don't have to sit in a queue for 90 days. Our Billing Agent uses Twilio Programmable Voice to automatically call payers, navigate IVR trees, and document denial reasons — then uses Twilio SMS to keep patients updated on their balance and payment status in real-time. No human billers on hold.`,
    howWeUseIt: [
      { label: 'Programmable Voice (Payer Calls)', desc: 'When a claim is flagged for denial risk, the agent initiates a Twilio outbound call to the payer\'s provider services line. TwiML scripts navigate IVR trees and capture denial codes via DTMF and speech detection.' },
      { label: 'SMS Patient Notifications', desc: 'After each claim milestone (submitted, approved, underpaid), we send a Twilio SMS to the patient with their balance, EOB summary, and a secure payment link — no confusing paper bills.' },
      { label: 'WhatsApp EOB Delivery', desc: 'For international or preferred patients, we deliver the Explanation of Benefits as a WhatsApp message via the Twilio Business API — same data, frictionless UX.' },
      { label: 'Real-Time Webhook Receipts', desc: 'Every call outcome (IVR navigation result, denial code captured) fires a webhook back to our FastAPI backend, triggering the next step in the appeals workflow automatically.' },
    ],
    security: {
      title: "Encrypted & Context-Aware Communications",
      description: "How our Twilio integration protects the final mile of revenue cycle communication:",
      points: [
        { label: 'Twilio Edition for Healthcare', desc: 'We use the HIPAA-eligible Twilio tier with an executed BAA, ensuring all Voice and SMS payloads restrict PHI leakage.' },
        { label: 'Secure Media & Call Recording Controls', desc: 'Payer calls are scrubbed of sensitive identifiers. We dynamically pause recording on Twilio Voice during any sensitive identifier transmission.' },
        { label: 'SMS Link Tokenization', desc: 'Explanation of Benefits (EOB) are never sent as raw text format. SMS messages contain secure, time-expiring signed URLs.' },
        { label: 'Identity Verification Gates', desc: 'Patients must pass a birthdate and ZIP code validation gate upon clicking an SMS link before Twilio routes them to the payment portal.' }
      ]
    },
    apiFlow: [
      { step: '1', label: 'Initiate payer call', code: `POST /2010-04-01/Accounts/{AccountSid}/Calls\n{ "To": "+18005551234", "From": "+1555PRACTICE", "Url": "twiml/navigate_ivr.xml" }` },
      { step: '2', label: 'TwiML IVR navigation', code: `<Gather input="dtmf" numDigits="1">\n  <Say>Press 1 for claims status</Say>\n</Gather>` },
      { step: '3', label: 'Capture denial result', code: `POST /webhooks/call-complete\n{ "denial_code": "CO-4", "reason": "Service not covered", "claim_id": "837-C42X" }` },
      { step: '4', label: 'SMS patient update', code: `POST /Messages\n{ "To": "+15551234567", "Body": "Claim approved! Your balance: $0. Explanation: stripe.link/eob" }` },
    ],
    scenario: {
      label: 'Denial Recovery Workflow',
      steps: [
        { speaker: 'Agent', text: 'Claim #837-C42X at risk — UHC modifier rule violation detected pre-submission. Auto-fixing...', type: 'ai' },
        { speaker: 'Agent', text: 'Fixed: Added modifier -25. Resubmitting clean claim now.', type: 'ai' },
        { speaker: 'Payer', text: 'Claim received. Expected adjudication: 7 days.', type: 'provider' },
        { speaker: 'Agent', text: 'Day 8: Claim approved. Sending patient SMS via Twilio...', type: 'ai' },
        { speaker: 'Patient', text: 'SMS received: "Your claim was approved. Balance: $0. Click to view your EOB."', type: 'patient' },
      ],
    },
    stats: [{ v: '< 2 min', l: 'Avg IVR call time' }, { v: '90 days', l: 'AR cycle eliminated' }, { v: '100%', l: 'Patient comms automated' }],
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; dot: string; tab: string; tabActive: string; codeBg: string }> = {
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    dot: 'bg-violet-500',
    tab: 'text-gray-500 hover:text-violet-600',
    tabActive: 'text-violet-700 border-b-2 border-violet-500',
    codeBg: 'bg-violet-950',
  },
  sky: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
    tab: 'text-gray-500 hover:text-sky-600',
    tabActive: 'text-sky-700 border-b-2 border-sky-500',
    codeBg: 'bg-sky-950',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    tab: 'text-gray-500 hover:text-rose-600',
    tabActive: 'text-rose-700 border-b-2 border-rose-500',
    codeBg: 'bg-rose-950',
  },
}

function ScenarioDemo({ scenario, color }: { scenario: any, color: string }) {
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const c = colorMap[color]

  const runDemo = async () => {
    setStep(-1)
    setRunning(true)
    for (let i = 0; i < scenario.steps.length; i++) {
      await new Promise(r => setTimeout(r, 900))
      setStep(i)
    }
    setRunning(false)
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${running ? c.dot + ' animate-pulse' : 'bg-gray-600'}`}></span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{scenario.label}</span>
        </div>
        <button
          onClick={runDemo}
          disabled={running}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${running ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : `${c.bg} ${c.text} hover:opacity-90`}`}
        >
          <Play className="w-3 h-3" />
          {running ? 'Running...' : 'Run Demo'}
        </button>
      </div>
      <div className="p-5 space-y-3 min-h-[220px]">
        {scenario.steps.map((s: any, i: number) => (
          <AnimatePresence key={i}>
            {step >= i && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 items-start text-sm ${s.type === 'ai' ? 'justify-start' : s.type === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                {s.type !== 'patient' && (
                  <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-md border ${s.type === 'ai' ? c.badge : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                    {s.speaker}
                  </span>
                )}
                <p className={`leading-relaxed font-medium max-w-sm ${s.type === 'ai' ? c.text : s.type === 'patient' ? 'text-gray-300' : 'text-gray-400'}`}>
                  {s.text}
                </p>
                {s.type === 'patient' && (
                  <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-900/50 text-emerald-400 border border-emerald-800">
                    {s.speaker}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {step === -1 && !running && (
          <p className="text-gray-600 text-sm font-medium italic text-center pt-8">Press "Run Demo" to simulate the live flow ↑</p>
        )}
      </div>
    </div>
  )
}

function ApiFlow({ flow, color }: { flow: any[], color: string }) {
  const c = colorMap[color]
  return (
    <div className="space-y-3">
      {flow.map((f, i) => (
        <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-800 bg-gray-950">
            <span className={`w-5 h-5 rounded-full ${c.bg} ${c.text} ${c.border} border flex items-center justify-center text-[10px] font-black shrink-0`}>{f.step}</span>
            <span className="text-xs font-bold text-gray-400">{f.label}</span>
          </div>
          <pre className={`px-4 py-3 text-xs font-mono text-emerald-400 overflow-x-auto`}>{f.code}</pre>
        </div>
      ))}
    </div>
  )
}

function IntegrationCard({ integration }: { integration: typeof INTEGRATIONS[0] }) {
  const [tab, setTab] = useState<'overview' | 'security' | 'api' | 'demo'>('overview')
  const Icon = integration.icon
  const c = colorMap[integration.color]

  return (
    <div className={`rounded-3xl border bg-white overflow-hidden shadow-xl ${c.border}`}>
      {/* Header */}
      <div className={`p-8 pb-0 ${c.bg}`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center shadow-sm`}>
              <Icon className={`w-7 h-7 ${c.text}`} />
            </div>
            <div>
              <div className={`text-xs font-black uppercase tracking-widest ${c.text} mb-1`}>{integration.category}</div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{integration.name}</h2>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${c.badge}`}>{integration.tagline}</span>
        </div>

        {/* Stats Strip */}
        <div className="flex gap-8 pb-6 border-b border-gray-200">
          {integration.stats.map((s, i) => (
            <div key={i}>
              <div className={`text-2xl font-black ${c.text}`}>{s.v}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tab Nav */}
        <div className="flex gap-8 pt-4 overflow-x-auto no-scrollbar">
          {(['overview', 'security', 'api', 'demo'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`pb-4 text-sm font-bold capitalize transition-all whitespace-nowrap ${tab === t ? c.tabActive : c.tab}`}>
              {t === 'overview' ? 'How We Use It' : t === 'security' ? 'Compliance Moat' : t === 'api' ? 'API Flow' : 'Live Demo'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-8">
              <p className="text-gray-700 leading-relaxed font-medium text-lg">{integration.elevator}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {integration.howWeUseIt.map((h, i) => (
                  <div key={i} className={`rounded-xl p-5 border ${c.border} ${c.bg}`}>
                    <div className={`flex items-center gap-2 mb-2 ${c.text} font-black text-sm`}>
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      {h.label}
                    </div>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {tab === 'security' && (
            <motion.div key="security" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{integration.security.title}</h3>
                <p className="text-gray-600 font-medium">{integration.security.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {integration.security.points.map((p, i) => (
                  <div key={i} className={`rounded-xl p-5 border ${c.border} bg-white shadow-sm`}>
                    <div className={`flex items-center gap-2 mb-2 text-gray-900 font-black text-sm`}>
                      <ShieldCheck className={`w-4 h-4 shrink-0 ${c.text}`} />
                      {p.label}
                    </div>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {tab === 'api' && (
            <motion.div key="api" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <p className="text-gray-500 font-medium text-sm mb-6">The exact API calls our agent makes, in order.</p>
              <ApiFlow flow={integration.apiFlow} color={integration.color} />
            </motion.div>
          )}
          {tab === 'demo' && (
            <motion.div key="demo" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <p className="text-gray-500 font-medium text-sm mb-6">Simulate the real event loop our agents run in production.</p>
              <ScenarioDemo scenario={integration.scenario} color={integration.color} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold mb-8 shadow-sm">
            <Zap className="w-4 h-4" />
            3 APIs. 1 Revenue Engine. Zero Hardware.
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            See How We Built It
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Clear Mind Life is not a monolith. It's an orchestration layer built on three world-class APIs — each doing exactly what it was built for, wired together by autonomous agents.
          </p>
        </div>
      </section>

      {/* Integration Cards */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {INTEGRATIONS.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 tracking-tight">How They Work Together</h2>
          <p className="text-gray-400 font-medium mb-16 text-lg max-w-2xl mx-auto">
            Each API handles one layer of the revenue cycle. Our orchestration layer connects them into a single, autonomous pipeline.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { label: 'NexHealth', sub: 'Patient books → Agent fires', color: 'bg-sky-500' },
              { label: '→', sub: '', color: '' },
              { label: 'AssemblyAI', sub: 'Visit → SOAP in real-time', color: 'bg-violet-500' },
              { label: '→', sub: '', color: '' },
              { label: 'Twilio', sub: 'Claim settled → Patient notified', color: 'bg-rose-500' },
            ].map((item, i) =>
              item.label === '→'
                ? <ArrowRight key={i} className="w-6 h-6 text-gray-600 shrink-0" />
                : (
                  <div key={i} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex-1 text-left">
                    <div className={`w-3 h-3 rounded-full ${item.color} mb-3`}></div>
                    <div className="font-black text-white text-lg">{item.label}</div>
                    <div className="text-gray-400 text-sm font-medium mt-1">{item.sub}</div>
                  </div>
                )
            )}
          </div>

          <div className="mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-50 transition-all shadow-lg text-lg"
            >
              Enter the Command Center <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
