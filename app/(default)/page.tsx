import Link from 'next/link'
import { siteConfig } from '@/config/site'
import PlatformTabs from '@/components/ui/platform-tabs'
import CareContinuum from '@/components/ui/care-continuum'

export const metadata = {
  title: 'Clear Mind Life — End-to-End Healthcare AI & Benchmarking Platform',
  description: 'Clear Mind Life consolidates AI patient reception, clinical triage, and real-time Model Context Protocol (MCP) benchmarking into one unified command center.',
}

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-inter">

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 text-center lg:pt-40">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Clear Mind Life Engine Active
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Stop Patching Together<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
              Fragmented Healthcare Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Staff burnout, denied claims, and disconnected patient data are stalling care. Clear Mind Life is the unified AI engine that orchestrates the entire patient journey autonomously—backed by live performance benchmarks you can trust.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-base font-semibold transition-all shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5"
            >
              Launch Portal →
            </Link>
            <Link
              href="/dashboard/security/benchmark"
              className="px-8 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-base font-semibold transition-all hover:bg-gray-50"
            >
              View Benchmarks
            </Link>
          </div>
        </div>
      </section>

      {/* ── API Ecosystem Cloud ── */}
      <section className="py-12 border-y border-gray-100 bg-gray-50 overflow-hidden" id="integrations">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">Integrated Infrastructure</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-bold text-gray-800">NexHealth</span>
            <span className="text-2xl font-bold text-gray-800">Twilio</span>
            <span className="text-2xl font-bold text-gray-800">SendGrid</span>
            <span className="text-2xl font-bold text-gray-800">Stripe</span>
            <span className="text-2xl font-bold text-gray-800">Cohere R+</span>
            <span className="text-2xl font-bold text-gray-800">OpenAI</span>
          </div>
        </div>
      </section>

      {/* ── Care Continuum Timeline ── */}
      <CareContinuum />

      {/* ── Pillar 1: Full End-to-End Platform ── */}
      <section id="end-to-end" className="py-24 px-4 md:px-8">
        <div className="w-full max-w-[96%] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solve Healthcare's Costliest Bottlenecks</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Siloed systems lead to missed follow-ups and lost revenue. Our unified agents handle the busywork, orchestrating the patient lifecycle from intake to discharge seamlessly.</p>
          </div>

          <div className="mt-8">
            <PlatformTabs />
          </div>
        </div>
      </section>

      {/* ── Pillar 2: Benchmarks & Monitoring ── */}
      <section id="benchmarks" className="py-24 px-6 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust, But Verify. Watch the Benchmarks.</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">You can't hand off patient workflows to AI without proof. We provide live, real-time benchmarks behind every agent action to guarantee safety and eliminate hallucinations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Framework */}
            <div className="rounded-2xl border border-gray-800 bg-gray-800/50 p-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-5">⚖️</div>
              <h3 className="text-2xl font-bold mb-3">Proof Over Promises</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We don't guess if our agents work. We prove it dynamically. Integrate any Model Context Protocol (MCP) server and watch the engine generate an instant testing harness, ensuring 99.9% pass rates before touching a real patient record.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 font-bold">✓</span> Evaluates Pass@1 Success Rates
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 font-bold">✓</span> Zero-Tolerance Triage Enforcement
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 font-bold">✓</span> Scalable to Infinite Tool Dependencies
                </li>
              </ul>
              <Link
                href="/dashboard/security/benchmark"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                View Live Monitoring →
              </Link>
            </div>

            {/* The Identity Engine */}
            <div className="rounded-2xl border border-gray-800 bg-gray-800/50 p-8">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-5">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">Red-Team Validation</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our identity hubs are continuously tested against simulated multi-vector access attacks ensuring your integrations don't leak permissions or PHI.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-rose-400 font-bold">✓</span> MFA Fatigue Defense Benchmarking
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-rose-400 font-bold">✓</span> Role Escalation (Mass Assignment) Blocking
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-rose-400 font-bold">✓</span> Strict HIPAA Compliance Validation Check
                </li>
              </ul>
              <Link
                href="/dashboard/security"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold transition-colors"
              >
                Enter Identity Hub →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Orchestrate?</h2>
          <p className="text-lg text-gray-600 mb-8">Interact with the End-to-End healthcare system or view the global monitoring metrics today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/healthcare"
              className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all shadow-lg hover:-translate-y-0.5"
            >
              🧠 Launch Platform
            </Link>
            <Link
              href="/dashboard/security/benchmark"
              className="px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-base transition-all hover:bg-gray-50"
            >
              ⚖️ View Benchmarks
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
