'use client';

import VideoConsultation from "../../../../components/dashboard/telehealth/VideoConsultation";

export default function TelehealthVideoPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-80px)] w-full relative bg-gray-50 p-4 lg:p-6">
            <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Ribbon */}
                <div className="h-16 shrink-0 border-b border-gray-100 flex items-center justify-between px-6 bg-gradient-to-r from-violet-50/50 to-fuchsia-50/50">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl shadow-sm border border-violet-200 shrink-0">
                            📹
                        </span>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">Clear Mind Life Video SDK Interface</h1>
                            <p className="text-xs text-gray-500 font-medium">Encrypted Telehealth Session Module</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-bold shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Secure Connection
                        </div>
                    </div>
                </div>

                {/* Embedded Telehealth Platform Natively */}
                <div className="flex-1 w-full relative bg-gray-50/50 pt-8 flex justify-center">
                    <VideoConsultation />
                </div>
            </div>
        </div>
    );
}
