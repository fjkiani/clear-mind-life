"use client";
/**
 * VideoSDKPlayer - Core video player component using VideoSDK
 *
 * Bugs fixed:
 * 1. ParticipantView now uses actual participant IDs from useMeeting(), not the name prop
 * 2. recordingId stale closure fixed — onRecordingStopped receives recId directly from SDK
 * 3. Mock mode check moved BEFORE MeetingProvider instantiation
 * 4. API_BASE reads from env var
 */
import { useState, useRef } from 'react'
import { VideoControls } from './VideoControls'
import { VideoParticipant } from './VideoParticipant'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

// Lazy-load VideoSDK to avoid SSR issues
let MeetingProvider, useMeeting, useParticipant
try {
  const videosdk = require('@videosdk.live/react-sdk')
  MeetingProvider = videosdk.MeetingProvider
  useMeeting = videosdk.useMeeting
  useParticipant = videosdk.useParticipant
} catch (e) {
  console.warn('VideoSDK SDK not installed. Install with: npm install @videosdk.live/react-sdk')
}

// ── Mock Mode ─────────────────────────────────────────────────────────────────

function MockVideoPlayer({ participantName, onRecordingStopped, onJoin, onLeave, className }) {
  const [joined, setJoined] = useState(false)
  const [recordingId, setRecordingId] = useState(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

  if (!joined) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <button
          onClick={() => { setJoined(true); if (onJoin) onJoin(); }}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-sm"
        >
          Join Mock Consultation
        </button>
      </div>
    )
  }

  return (
    <div className={`video-consultation space-y-4 ${className}`}>
      <VideoControls
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isRecording={!!recordingId}
        onToggleMic={() => setIsMicOn(v => !v)}
        onToggleCamera={() => setIsCameraOn(v => !v)}
        onStartRecording={() => setRecordingId('mock_rec_' + Date.now())}
        onStopRecording={() => {
          const recId = recordingId
          setRecordingId(null)
          if (onRecordingStopped) onRecordingStopped('https://videosdk.live/mock_recording.mp4', recId)
        }}
        onLeave={() => {
          const recId = recordingId
          setJoined(false)
          setRecordingId(null)
          // Auto-trigger transcript analysis when ending the mock call
          if (onRecordingStopped) onRecordingStopped('https://videosdk.live/mock_recording.mp4', recId || 'mock_rec_auto')
          if (onLeave) onLeave()
        }}
      />
      <div
        className="relative bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border border-gray-800"
        style={{ minHeight: '400px' }}
      >
        {isCameraOn ? (
          <div className="absolute inset-0 bg-violet-900/40 flex items-center justify-center">
            <div className="text-center animate-pulse">
              <div className="text-4xl mb-2 flex justify-center">
                {participantName?.includes('Provider') || participantName?.includes('Dr') ? '🩺' : '👤'}
              </div>
              <span className="text-white text-lg font-medium tracking-wide">Mock Stream Active</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3 text-5xl text-gray-400 font-bold border border-gray-700">
              {(participantName || 'P').charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-400 font-medium">Camera Disabled</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-md flex items-center gap-2 backdrop-blur-sm shadow-sm border border-white/10">
          <span className="text-white text-sm font-medium">{participantName} (Demo)</span>
          {!isMicOn && <span className="text-red-400 text-xs" title="Microphone off">🔇</span>}
        </div>
      </div>
    </div>
  )
}

// ── Real VideoSDK Player ──────────────────────────────────────────────────────

function VideoPlayerContent({ participantName, onRecordingStopped, onJoin, onLeave }) {
  const [joined, setJoined] = useState(false)
  const [recordingId, setRecordingId] = useState(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  // Use ref to avoid stale closure on recordingId in callbacks
  const recordingIdRef = useRef(null)

  const { join, leave, toggleMic, toggleWebcam, startRecording, stopRecording, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined(true)
      if (onJoin) onJoin()
    },
    onMeetingLeft: () => {
      setJoined(false)
      recordingIdRef.current = null
      setRecordingId(null)
      if (onLeave) onLeave()
    },
    onRecordingStarted: (recId) => {
      recordingIdRef.current = recId
      setRecordingId(recId)
    },
    // FIX: SDK passes recId directly — no stale closure
    onRecordingStopped: (recId) => {
      const finalRecId = recId || recordingIdRef.current
      recordingIdRef.current = null
      setRecordingId(null)
      if (onRecordingStopped && finalRecId) {
        onRecordingStopped(null, finalRecId)
      }
    },
  })

  if (!joined) {
    return (
      <div className="text-center py-8">
        <button
          onClick={join}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Join Consultation
        </button>
      </div>
    )
  }

  // FIX: Get actual participant IDs from useMeeting(), not from the name prop
  const participantIds = participants ? [...participants.keys()] : []

  return (
    <div className="space-y-4">
      <VideoControls
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isRecording={!!recordingId}
        onToggleMic={() => { toggleMic(); setIsMicOn(v => !v) }}
        onToggleCamera={() => { toggleWebcam(); setIsCameraOn(v => !v) }}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onLeave={leave}
      />
      <div className="grid gap-4">
        {participantIds.length > 0 ? (
          participantIds.map(pid => (
            <ParticipantTile key={pid} participantId={pid} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p className="text-4xl mb-2">👥</p>
            <p>Waiting for participants...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// FIX: ParticipantTile uses actual participantId from meeting, not name
function ParticipantTile({ participantId }) {
  const { webcamStream, micStream, webcamOn, micOn, displayName } = useParticipant(participantId)
  return (
    <VideoParticipant
      participantId={participantId}
      name={displayName || participantId}
      stream={webcamStream}
      isMicOn={micOn}
      isCameraOn={webcamOn}
    />
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function VideoSDKPlayer({
  roomId,
  token,
  participantName = 'Participant',
  onRecordingStopped,
  onJoin,
  onLeave,
  className = '',
}) {
  // FIX: Mock mode check BEFORE any MeetingProvider instantiation
  if (token === 'demo_mock_token_123') {
    return (
      <MockVideoPlayer
        participantName={participantName}
        onRecordingStopped={onRecordingStopped}
        onJoin={onJoin}
        onLeave={onLeave}
        className={className}
      />
    )
  }

  // SDK not installed fallback
  if (!MeetingProvider || !useMeeting || !useParticipant) {
    return (
      <div className={`p-4 bg-yellow-50 border border-yellow-200 rounded-lg ${className}`}>
        <p className="text-yellow-800 font-semibold mb-2">VideoSDK SDK Required</p>
        <p className="text-yellow-700 text-sm mb-4">
          Install the VideoSDK React SDK to enable video consultations:
        </p>
        <code className="block bg-yellow-100 p-2 rounded text-sm">
          npm install @videosdk.live/react-sdk
        </code>
      </div>
    )
  }

  // Real VideoSDK
  return (
    <div className={`video-consultation ${className}`}>
      <MeetingProvider
        config={{
          meetingId: roomId,
          micEnabled: true,
          webcamEnabled: true,
          name: participantName,
        }}
        token={token}
      >
        <VideoPlayerContent
          participantName={participantName}
          onRecordingStopped={onRecordingStopped}
          onJoin={onJoin}
          onLeave={onLeave}
        />
      </MeetingProvider>
    </div>
  )
}
