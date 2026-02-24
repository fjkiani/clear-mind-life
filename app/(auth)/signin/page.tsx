import Link from "next/link";

export const metadata = {
  title: "Launch Command Center - Clear Mind Life",
  description: "Access the Clear Mind Life platform",
};

export default function SignIn() {
  return (
    <>
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 text-3xl mb-6 shadow-xl">
          🚀
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-500 pb-2">Initialize Session</h1>
        <p className="text-gray-500 mt-2">
          Demo environment active. Authentication protocols bypassed for Alpha.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/dashboard/healthcare"
          className="group relative flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl shadow-inner">
              🧠
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Healthcare AI Orchestration</h3>
              <p className="text-sm text-gray-500">Launch the clinical receptionist and triage engine</p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-blue-500 transition-colors relative z-10">
            →
          </div>
        </Link>

        <Link
          href="/dashboard/security/benchmark"
          className="group relative flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-lg hover:shadow-gray-900/10 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-xl shadow-inner border border-gray-200">
              ⚖️
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Universal Benchmark Matrix</h3>
              <p className="text-sm text-gray-500">View real-time agent evaluations and threat scans</p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-gray-900 transition-colors relative z-10">
            →
          </div>
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>Clear Mind Life Agent Engine v2.0</p>
      </div>
    </>
  );
}
