"use client";
/** VideoConsultation - Complete telehealth session with embedded player and auto-transcription */
import { useState } from 'react';
import { VideoRoom } from './VideoRoom';
import { TokenGenerator } from './TokenGenerator';
import { AIConsultationReport } from './AIConsultationReport';

const API_BASE = 'http://localhost:8001';

export default function VideoConsultation() {
  // Room creation state
  const [formData, setFormData] = useState({ patientId: '', providerId: '', appointmentId: '' });
  const [roomData, setRoomData] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState(null);

  // Token state
  const [patientToken, setPatientToken] = useState(null);
  const [providerToken, setProviderToken] = useState(null);

  // Recording state
  const [recordingId, setRecordingId] = useState(null);

  // Transcription state
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState(null);

  // Create video room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setRoomLoading(true);
    setRoomError(null);
    setRoomData(null);
    setPatientToken(null);
    setProviderToken(null);
    setTranscriptionData(null); // Clear transcription data on new room creation

    try {
      const response = await fetch(`${API_BASE}/api/v1/demo/healthcare/create-video-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create video room');
      }

      const data = await response.json();
      setRoomData(data);
    } catch (err) {
      setRoomError(err.message);
    } finally {
      setRoomLoading(false);
    }
  };

  // Handle recording stopped - auto-transcribe
  const handleRecordingStopped = async (recordingUrl, stoppedRecordingId) => {
    if (!roomData || !stoppedRecordingId) return;

    setIsTranscribing(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/api/v1/video/transcribe-recording`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          room_id: roomData.room_id,
          recording_id: stoppedRecordingId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe recording');
      }

      const data = await response.json();
      // Assuming the API returns a 'success' field and 'ai_analysis'
      if (data.success) {
        setTranscriptionData(data);
      } else {
        console.error("Transcription failed:", data.message);
      }
    } catch (err) {
      console.error('Transcription error:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto h-[calc(100vh-160px)] overflow-y-auto pr-4 pb-12 custom-scrollbar">
      {/* Guided Context Setup */}
      {!roomData && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl shadow-md">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold text-indigo-900">Clear Mind Life Telehealth Co-Pilot Deployment</h2>
              <p className="text-sm text-indigo-700 font-medium">Pre-Session Context & Agentic Operations Pipeline</p>
            </div>
          </div>
          <div className="text-indigo-900 text-sm leading-relaxed space-y-3 mb-6">
            <p>
              This consultation was auto-scheduled by the <strong>Clear Mind Life AI Triage Agent</strong> following an urgent
              symptom report (Headache & Visual Aura). NexHealth integration has verified the patient's identity and
              insurance eligibility.
            </p>
            <p>
              Upon initiating the secure video session below, the <strong>Clear Mind Life LLM Co-Pilot</strong> will activate in the background.
              It will transcribe the clinical encounter in real-time, synthesize a SOAP note, extract ICD-10 billing codes,
              and draft follow-up care instructions—bridging the entire flow from initial AI chat to post-visit resolution.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="text-green-500">✓</span> AI Triage Context Linked
            </span>
            <span className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="text-green-500">✓</span> NexHealth Verification: Active
            </span>
            <span className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="text-green-500">✓</span> Auto-Transcription Armed
            </span>
          </div>
        </div>
      )}

      {/* Room Creation Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleCreateRoom} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Patient ID *</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white transition-colors"
                placeholder="MRN-12345"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Provider ID *</label>
              <input
                type="text"
                value={formData.providerId}
                onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white transition-colors"
                placeholder="dr_smith"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Appointment ID (optional)</label>
              <input
                type="text"
                value={formData.appointmentId}
                onChange={(e) => setFormData({ ...formData, appointmentId: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white transition-colors"
                placeholder="appt_xxx"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={roomLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {roomLoading ? 'Provisioning Secure Room...' : 'Create Telehealth Video Room'}
          </button>
        </form>
      </div>

      {/* Error Display */}
      {roomError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="text-red-700 font-bold flex items-center gap-3">
            <span className="text-xl">⚠️</span> {roomError}
          </div>
        </div>
      )}

      {/* Video Consultation Session */}
      {roomData && roomData.success && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="text-green-800">
              <p className="font-bold flex items-center gap-2 mb-1">
                <span className="text-xl">✅</span> Secure Room Initialized
              </p>
              <p className="text-sm font-medium opacity-80">Room ID: {roomData.room_id}</p>
            </div>
            <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient View */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-violet-500 pl-3">Patient Module</h3>
                {!patientToken && (
                  <TokenGenerator
                    roomId={roomData.room_id}
                    participantName="Patient"
                    role="participant"
                    onTokenGenerated={(token) => setPatientToken(token)}
                    label="Join Patient"
                  />
                )}
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {patientToken ? (
                  <VideoRoom
                    roomId={roomData.room_id}
                    token={patientToken}
                    participantName="Patient"
                    onRecordingStopped={handleRecordingStopped}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center text-gray-500 font-medium">
                    <p className="text-4xl mb-3">👤</p>
                    <p>Awaiting Patient Connection</p>
                  </div>
                )}
              </div>

              {/* Patient Context Dashboard */}
              <div className="mt-4 pt-4 border-t border-gray-100 hidden sm:block">
                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2"><span>📱</span> Patient Intake Summary</h4>
                <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 border border-gray-100">
                  <p className="font-semibold text-violet-700 mb-1">Chief Complaint via AI Triage:</p>
                  <p className="opacity-90 leading-relaxed text-xs">"I've had a severe migraine for 2 days and my vision is getting blurry."</p>
                  <div className="mt-2 flex gap-2 w-full flex-wrap">
                    <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-[10px] font-bold tracking-wide uppercase border border-red-100">Triage: Urgent</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold tracking-wide uppercase border border-blue-100">Temp: 98.6°F</span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-[10px] font-bold tracking-wide uppercase border border-amber-100">Aura Present</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider View */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">Provider Module</h3>
                {!providerToken && (
                  <TokenGenerator
                    roomId={roomData.room_id}
                    participantName="Dr. Provider"
                    role="moderator"
                    onTokenGenerated={(token) => setProviderToken(token)}
                    label="Join Provider"
                  />
                )}
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {providerToken ? (
                  <VideoRoom
                    roomId={roomData.room_id}
                    token={providerToken}
                    participantName="Dr. Provider"
                    onRecordingStopped={handleRecordingStopped}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center text-gray-500 font-medium">
                    <p className="text-4xl mb-3">🩺</p>
                    <p>Awaiting Provider Connection</p>
                  </div>
                )}
              </div>

              {/* Provider Context Dashboard */}
              <div className="mt-4 pt-4 border-t border-gray-100 hidden sm:block">
                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2"><span>⚡</span> Agentic Co-Pilot Ops</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1 text-xs uppercase tracking-wide">
                      <span>📅</span> NexHealth Sync
                    </div>
                    <p className="text-emerald-700/80 text-[11px] leading-tight">Ready to auto-schedule follow-up based on AI transcript intent.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm">
                    <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1 text-xs uppercase tracking-wide">
                      <span>💳</span> ICD-10 Billing
                    </div>
                    <p className="text-blue-700/80 text-[11px] leading-tight">Awaiting session completion for automated medical coding extraction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Consultation Report */}
          {(transcriptionData || isTranscribing) && (
            <div className="mt-8">
              <AIConsultationReport
                analysis={transcriptionData?.ai_analysis}
                loading={isTranscribing}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
