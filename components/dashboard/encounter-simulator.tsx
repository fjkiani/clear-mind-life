"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Mic, Edit3, ShieldAlert, CheckCircle2, Search, Zap, Activity } from 'lucide-react'

type TranscriptLine = { speaker: 'Doctor' | 'Patient'; text: string; time: number; highlight?: boolean; isKeyword?: boolean }

export default function EncounterSimulator() {
    const [callActive, setCallActive] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [transcript, setTranscript] = useState<TranscriptLine[]>([])
    const [soapStatus, setSoapStatus] = useState<'idle' | 'generating' | 'ready'>('idle')
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [safetyTriggered, setSafetyTriggered] = useState(false)
    const transcriptEndRef = useRef<HTMLDivElement>(null)

    const fullConversation: TranscriptLine[] = [
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

    useEffect(() => {
        if (transcriptEndRef.current) {
            transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [transcript])

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (callActive && currentLineIndex < fullConversation.length) {
            const line = fullConversation[currentLineIndex]

            // Trigger safety alert on specific keyword
            if (line.isKeyword) {
                setSafetyTriggered(true)
            }

            timeout = setTimeout(() => {
                setTranscript(prev => [...prev, line])
                setCurrentLineIndex(prev => prev + 1)
            }, currentLineIndex === 0 ? 500 : 2500) // Simulated pacing
        } else if (callActive && currentLineIndex >= fullConversation.length) {
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
        setSafetyTriggered(false)
    }

    const endCall = () => {
        setCallActive(false)
        setCallEnded(true)
        setSoapStatus('generating')

        // Simulate AI Generation time
        setTimeout(() => {
            setSoapStatus('ready')
        }, 2500)
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Mic className="w-6 h-6 text-violet-600" />
                        Autonomous Encounter Engine
                    </h2>
                    <p className="text-gray-500 mt-1">Live Telehealth Transcription & One-Tap SOAP Generation</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">AssemblyAI</span>
                    <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">Cohere Command R+</span>
                </div>
            </div>

            {/* Safety Alert Banner */}
            <AnimatePresence>
                {safetyTriggered && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-rose-600 rounded-xl p-4 shadow-lg shadow-rose-600/20 flex items-center justify-between border border-rose-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-7 h-7 text-rose-600" />
                            </div>
                            <div>
                                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Safety Protocol Triggered</h4>
                                <p className="text-rose-100 font-medium">Critical phrase detected: <span className="text-white font-bold bg-rose-700/50 px-2 py-0.5 rounded">sudden chest pain</span>. Recommended action: Immediate ER escalation.</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-white text-rose-600 hover:bg-rose-50 rounded-lg font-bold text-sm transition-colors uppercase tracking-wider shadow-sm">
                            Acknowledge
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid lg:grid-cols-12 gap-6">

                {/* Left Column: Video & Telemetry (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Simulated Video SDK */}
                    <div className="bg-gray-900 rounded-3xl overflow-hidden aspect-video relative shadow-xl border border-gray-800">
                        {!callActive && !callEnded ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                                    <Video className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">Patient Waiting in Lobby</h3>
                                <p className="text-gray-400 mb-8">Sarah Johnson • 2:30 PM Appt</p>
                                <button
                                    onClick={startCall}
                                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Video className="w-5 h-5" />
                                    Admit & Start Call
                                </button>
                            </div>
                        ) : callActive ? (
                            <div className="absolute inset-0 bg-gray-800 relative">
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                                    {/* Simulated video noise/texture */}
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
                                        <rect width="100%" height="100%" filter="url(#noise)" />
                                    </svg>
                                </div>
                                {/* Patient PIP */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center overflow-hidden">
                                        <span className="text-4xl text-gray-500 font-bold">SJ</span>
                                    </div>
                                </div>
                                {/* Provider PIP (small corner) */}
                                <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-700 border-2 border-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl text-gray-500 font-bold">Dr. C</span>
                                </div>
                                {/* Controls */}
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <button onClick={endCall} className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-lg uppercase tracking-wider">End Call</button>
                                </div>
                                <div className="absolute top-4 left-4 flex gap-2 items-center px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full border border-red-400">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                    <span className="text-white text-xs font-bold">REC</span>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 border-t-4 border-emerald-500">
                                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-white font-bold text-lg">Call Ended</h3>
                                <p className="text-gray-400 text-sm mt-1">Duration: 12m 45s</p>
                                <button onClick={startCall} className="mt-6 text-sm text-gray-500 hover:text-white transition-colors">Restart Simulation</button>
                            </div>
                        )}
                    </div>

                    {/* Live Transcript Panel */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
                        <div className="bg-gray-50 border-b border-gray-200 p-4 rounded-t-3xl flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                <Mic className="w-4 h-4 text-violet-600" />
                                Live Transcript
                            </h3>
                            {callActive && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 bg-violet-100 px-2.5 py-1 rounded-full animate-pulse">
                                    <Activity className="w-3 h-3" /> Listening
                                </span>
                            )}
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto bg-[#fafafa]">
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {transcript.map((line, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={i}
                                            className={`flex flex-col ${line.speaker === 'Doctor' ? 'items-end' : 'items-start'}`}
                                        >
                                            <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${line.speaker === 'Doctor' ? 'text-blue-500' : 'text-gray-400'}`}>
                                                {line.speaker}
                                            </span>
                                            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${line.speaker === 'Doctor'
                                                ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                                                : line.isKeyword
                                                    ? 'bg-rose-100 text-rose-900 border border-rose-200 rounded-tl-sm font-medium shadow-sm'
                                                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm'
                                                }`}>
                                                {line.highlight ? (
                                                    <span className="relative">
                                                        {line.text}
                                                        <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-violet-400/30 rounded"></span>
                                                    </span>
                                                ) : (
                                                    line.text
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div ref={transcriptEndRef} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI SOAP Note & Coding (7 cols) */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex-grow flex flex-col relative">

                        <div className="bg-gray-900 px-6 py-5 flex justify-between items-center">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-emerald-400" />
                                Auto-Generated Narrative
                            </h3>
                            {soapStatus === 'idle' && (
                                <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-mono rounded border border-gray-700">AWAITING_ENCOUNTER</span>
                            )}
                            {soapStatus === 'generating' && (
                                <span className="px-3 py-1 bg-violet-900/50 text-violet-300 border border-violet-500/30 text-xs font-mono rounded flex items-center gap-2">
                                    <Activity className="w-3 h-3 animate-spin" /> SYNTHESIZING_FHIR_NOTE
                                </span>
                            )}
                            {soapStatus === 'ready' && (
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded flex items-center gap-1.5 uppercase tracking-wider">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Signature
                                </span>
                            )}
                        </div>

                        <div className="p-8 flex-grow bg-gray-50 flex flex-col">
                            {soapStatus === 'idle' ? (
                                <div className="flex-grow flex flex-col items-center justify-center text-gray-400 space-y-4 opacity-50">
                                    <Edit3 className="w-16 h-16" />
                                    <p className="max-w-xs text-center text-sm font-medium">The Analyzer Agent builds the structured note automatically as the visit progresses.</p>
                                </div>
                            ) : soapStatus === 'generating' ? (
                                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                                    <div className="w-16 h-16 border-4 border-gray-200 border-t-violet-600 rounded-full animate-spin"></div>
                                    <div className="text-center">
                                        <p className="text-gray-900 font-bold mb-1">Mapping Clinical Ontology...</p>
                                        <p className="text-gray-500 text-xs font-mono">Extracting Symptoms → SNOMED CT → ICD-10</p>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    {/* Editor Draft Area */}
                                    <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Subjective</h4>
                                            <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                                Patient is a 45-year-old female presenting with lower back pain of two weeks duration. Pain is described as a dull ache that transitions to a sharp, shooting pain down the left leg (radiating to the calf) upon bending. Patient also reports an incident of sudden, tight chest pain occurring last night and persisting mildly today. Denies leg weakness or bowel/bladder incontinence.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Objective</h4>
                                            <p className="text-sm text-gray-800 leading-relaxed font-medium italic">
                                                Pending in-person evaluation. Patient triaged to ER for cardiac workup due to active chest pain.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Assessment & Plan</h4>
                                            <ul className="text-sm text-gray-800 space-y-2 font-medium list-disc pl-4">
                                                <li><span className="font-bold">Chest Pain (Unspecified):</span> Immediate referral to Emergency Department for EKG and cardiac enzyme evaluation due to acute onset of tight chest pain.</li>
                                                <li><span className="font-bold">Sciatica (Left side):</span> Likely lumbar radiculopathy. Pain management and further imaging deferred pending cardiac clearance.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Coding Intelligence Panel */}
                                    <div className="bg-slate-50 border-t border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                <Search className="w-4 h-4 text-violet-600" />
                                                AI Suggested Codes
                                            </h4>
                                            <span className="text-xs text-gray-500 font-medium">Confidence: High</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="bg-white border text-left border-gray-200 rounded-xl p-3 shadow-sm hover:border-violet-300 transition-colors w-full sm:w-auto">
                                                <span className="block text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">ICD-10-CM</span>
                                                <span className="block font-mono font-black text-gray-900">R07.9</span>
                                                <span className="block text-xs text-gray-600 mt-0.5 truncate max-w-[150px]">Chest pain, unspecified</span>
                                            </div>
                                            <div className="bg-white border text-left border-gray-200 rounded-xl p-3 shadow-sm hover:border-violet-300 transition-colors w-full sm:w-auto">
                                                <span className="block text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">ICD-10-CM</span>
                                                <span className="block font-mono font-black text-gray-900">M54.32</span>
                                                <span className="block text-xs text-gray-600 mt-0.5 truncate max-w-[150px]">Sciatica, left side</span>
                                            </div>
                                            <div className="bg-white border text-left border-gray-200 rounded-xl p-3 shadow-sm hover:border-violet-300 transition-colors w-full sm:w-auto">
                                                <span className="block text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">CPT</span>
                                                <span className="block font-mono font-black text-gray-900">99213</span>
                                                <span className="block text-xs text-gray-600 mt-0.5 truncate max-w-[150px]">Office visit, mid-level</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="bg-white p-4 border-t border-gray-200 flex justify-end gap-3">
                                        <button className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                            Edit Note
                                        </button>
                                        <button className="px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-md shadow-emerald-600/20 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Approve & Sign to EHR
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
