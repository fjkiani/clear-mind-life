"use client";
/**VideoSDKPlayer - Core video player component using VideoSDK*/
import { useState, useEffect } from 'react'
import { VideoControls } from './VideoControls'
import { VideoParticipant } from './VideoParticipant'

// Note: Install @videosdk.live/react-sdk first: npm install @videosdk.live/react-sdk
let MeetingProvider, useMeeting, useParticipant
try {
  const videosdk = require('@videosdk.live/react-sdk')
  MeetingProvider = videosdk.MeetingProvider
  useMeeting = videosdk.useMeeting
  useParticipant = videosdk.useParticipant
} catch (e) {
  console.warn('VideoSDK SDK not installed. Install with: npm install @videosdk.live/react-sdk')
}

export function VideoSDKPlayer({
  roomId,
  token,
  participantName = 'Participant',
  onRecordingStopped,
  onJoin,
  onLeave,
  className = ''
}) {
  const [joined, setJoined] = useState(false)
  const [recordingId, setRecordingId] = useState(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

  // If VideoSDK SDK not available, show fallback
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

  const VideoPlayerContent = () => {
    const { join, leave, toggleMic, toggleWebcam, startRecording, stopRecording } = useMeeting({
      onMeetingJoined: () => {
        setJoined(true)
        if (onJoin) onJoin()
      },
      onMeetingLeft: () => {
        setJoined(false)
        setRecordingId(null)
        if (onLeave) onLeave()
      },
      onRecordingStarted: (recId) => {
        setRecordingId(recId)
      },
      onRecordingStopped: (recordingUrl) => {
        const currentRecordingId = recordingId
        setRecordingId(null)
        if (onRecordingStopped && currentRecordingId) {
          // Pass recording URL and ID for transcription
          onRecordingStopped(recordingUrl, currentRecordingId)
        }
      }
    })

    const handleToggleMic = () => {
      toggleMic()
      setIsMicOn(!isMicOn)
    }

    const handleToggleCamera = () => {
      toggleWebcam()
      setIsCameraOn(!isCameraOn)
    }

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

    return (
      <div className="space-y-4">
        <VideoControls
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          isRecording={!!recordingId}
          onToggleMic={handleToggleMic}
          onToggleCamera={handleToggleCamera}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onLeave={leave}
        />
        <ParticipantView name={participantName} />
      </div>
    )
  }

  const ParticipantView = ({ name }) => {
    const { webcamStream, micStream, webcamOn, micOn } = useParticipant(name)

    return (
      <VideoParticipant
        participantId={name}
        name={name}
        stream={webcamStream}
        isMicOn={micOn}
        isCameraOn={webcamOn}
      />
    )
  }

  // MOCK MODE FALLBACK
  if (token === "demo_mock_token_123") {
    if (!joined) {
      return (
        <div className={`text-center py-8 ${className}`}>
          <button
            onClick={() => {
              setJoined(true);
              if (onJoin) onJoin();
            }}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-sm"
          >
            Join Mock Consultation
          </button>
        </div>
      );
    }

    return (
      <div className={`video-consultation space-y-4 ${className}`}>
        <VideoControls
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          isRecording={!!recordingId}
          onToggleMic={() => setIsMicOn(!isMicOn)}
          onToggleCamera={() => setIsCameraOn(!isCameraOn)}
          onStartRecording={() => setRecordingId("mock_rec_123")}
          onStopRecording={() => {
            setRecordingId(null);
            if (onRecordingStopped) onRecordingStopped("https://videosdk.live/mock_recording.mp4", "mock_rec_123");
          }}
          onLeave={() => {
            setJoined(false);
            // AUTO-TRIGGER transcript analysis when ending the mock call
            if (onRecordingStopped) onRecordingStopped("https://videosdk.live/mock_recording.mp4", "mock_rec_123");
            if (onLeave) onLeave();
          }}
        />
        <div className="relative bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border border-gray-800" style={{ minHeight: '400px' }}>
          {isCameraOn ? (
            <div className="absolute inset-0 bg-violet-900/40 flex items-center justify-center">
              <div className="text-center animate-pulse">
                <div className="text-4xl mb-2 flex justify-center">{participantName.includes("Smith") ? "🩺" : "👤"}</div>
                <span className="text-white text-lg font-medium tracking-wide">Mock Stream Active</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3 text-5xl text-gray-400 font-bold border border-gray-700">
                {participantName.charAt(0).toUpperCase()}
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
    );
  }

  // REAL VIDEOSDK PLAYER
  return (
    <div className={`video-consultation ${className}`}>
      <MeetingProvider
        config={{
          meetingId: roomId,
          micEnabled: true,
          webcamEnabled: true,
          name: participantName
        }}
        token={token}
      >
        <VideoPlayerContent />
      </MeetingProvider>
    </div>
  )
}

