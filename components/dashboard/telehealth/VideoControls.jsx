"use client";
/** VideoControls - Modular control buttons for video consultation */

export function VideoControls({
  isMicOn,
  isCameraOn,
  isRecording,
  onToggleMic,
  onToggleCamera,
  onStartRecording,
  onStopRecording,
  onLeave,
  className = ''
}) {
  return (
    <div className={`flex items-center gap-3 flex-wrap bg-gray-900/50 p-3 rounded-2xl backdrop-blur-sm ${className}`}>
      <button
        onClick={onToggleMic}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${isMicOn ? 'bg-white text-gray-900 shadow-sm hover:bg-gray-50' : 'bg-red-500/20 text-red-100 hover:bg-red-500/30'}`}
      >
        <span className="text-lg">{isMicOn ? '🎤' : '🔇'}</span>
        <span>{isMicOn ? 'Mic On' : 'Mic Off'}</span>
      </button>

      <button
        onClick={onToggleCamera}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${isCameraOn ? 'bg-white text-gray-900 shadow-sm hover:bg-gray-50' : 'bg-red-500/20 text-red-100 hover:bg-red-500/30'}`}
      >
        <span className="text-lg">{isCameraOn ? '📹' : '📷'}</span>
        <span>{isCameraOn ? 'Cam On' : 'Cam Off'}</span>
      </button>

      {isRecording ? (
        <button
          onClick={onStopRecording}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-red-500 text-white shadow-sm hover:bg-red-600 transition-all animate-pulse"
        >
          <span className="w-3 h-3 rounded-sm bg-white"></span>
          <span>Stop Session Recording</span>
        </button>
      ) : (
        <button
          onClick={onStartRecording}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-violet-600 text-white shadow-sm hover:bg-violet-700 transition-all"
        >
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span>Start Secure Recording</span>
        </button>
      )}

      <div className="w-px h-8 bg-white/20 mx-1"></div>

      <button
        onClick={onLeave}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-all ml-auto"
      >
        <span>🚪</span>
        <span>End Call</span>
      </button>
    </div>
  );
}
