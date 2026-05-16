import Link from "next/link";
import PageIllustration from "@/components/page-illustration";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Who We Serve — Clear Mind Life",
  description: "Clear Mind Life is built for mental health and behavioral health practices that are tired of losing revenue to preventable claim denials.",
};

export default function Customers() {
  return (
    <section className="relative min-h-screen bg-gray-50 pb-24 pt-32 md:pt-40 font-inter">
      <PageIllustration />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Who We Serve
          </div>
          <h1 className="mb-6 text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
            Built for practices that bill insurance
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            We focus on mental health and behavioral health practices — the specialty with the highest denial rates, the most complex coding rules, and the least administrative support.
          </p>
        </div>

        {/* Personas */}
        <div className="space-y-16">

          {/* Persona 1: Clinical Directors */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">⚕️</div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">For</div>
                    <h2 className="text-xl font-black text-gray-900">Clinical Directors & Physicians</h2>
                  </div>
                </div>
                <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <p className="text-sm text-rose-800 font-medium">
                    <span className="font-bold">The problem:</span> Providers spend 2 hours charting for every hour of patient care. That's not sustainable — and it's not necessary.
                  </p>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  Our Encounter Agent transcribes sessions in real time, generates the SOAP note automatically, and suggests ICD-10 codes from the clinical content. The provider reviews and approves in 3 minutes — not 45.
                </p>
                <ul className="space-y-2">
                  {[
                    'SOAP notes generated during the session, not after',
                    'ICD-10 codes pulled from clinical content, not guessed',
                    'One-click approval — no re-keying into the EHR',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 md:p-10 bg-slate-50">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What changes on day one</div>
                <div className="space-y-4">
                  {[
                    { before: '45 min', after: '3 min', label: 'Post-session charting time' },
                    { before: 'Manual', after: 'Automatic', label: 'ICD-10 code selection' },
                    { before: '3 days', after: 'Same day', label: 'Claim submission after visit' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="text-sm text-gray-500 font-medium">{m.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400 line-through font-mono">{m.before}</span>
                        <span className="text-sm text-emerald-600 font-black font-mono">{m.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Persona 2: Operations Managers */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 bg-slate-50 md:order-2 border-b md:border-b-0 md:border-l border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What changes on day one</div>
                <div className="space-y-4">
                  {[
                    { before: '20%', after: '<5%', label: 'Claim denial rate' },
                    { before: '$22', after: '$4.50', label: 'Cost to collect per claim' },
                    { before: '90 days', after: '< 14 days', label: 'Average AR cycle' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="text-sm text-gray-500 font-medium">{m.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400 line-through font-mono">{m.before}</span>
                        <span className="text-sm text-emerald-600 font-black font-mono">{m.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 md:p-10 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">📊</div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">For</div>
                    <h2 className="text-xl font-black text-gray-900">Operations & Revenue Cycle Managers</h2>
                  </div>
                </div>
                <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <p className="text-sm text-rose-800 font-medium">
                    <span className="font-bold">The problem:</span> You're managing a denial rate that shouldn't exist. Most of those denials are for fixable reasons — wrong modifier, bundling conflict, missing auth.
                  </p>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  Our Billing Agent scrubs every claim against 2.38 million NCCI edit pairs before submission. Modifier conflicts are caught and fixed automatically. The claim that goes out is clean.
                </p>
                <ul className="space-y-2">
                  {[
                    'Pre-submission scrubbing against all NCCI PTP edits',
                    'Modifier conflicts auto-corrected before the 837 is generated',
                    'Denial risk score on every claim before it leaves',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Persona 3: Medical Billers */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl">🧾</div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">For</div>
                    <h2 className="text-xl font-black text-gray-900">Medical Billers & Coding Staff</h2>
                  </div>
                </div>
                <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <p className="text-sm text-rose-800 font-medium">
                    <span className="font-bold">The problem:</span> Your team spends most of their time on routine claims that follow predictable rules — leaving little capacity for the complex cases that actually need their expertise.
                  </p>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  The AI handles routine claim submission. Your billers review flagged cases, configure payer-specific rules, and handle the complex denials that require real judgment. They do more of the work that matters.
                </p>
                <ul className="space-y-2">
                  {[
                    'Routine claims handled automatically — billers review exceptions',
                    'Payer-specific rules configured by your team, not us',
                    'Complex cases escalated with full context attached',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 md:p-10 bg-slate-50">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What your team focuses on instead</div>
                <div className="space-y-4">
                  {[
                    { icon: '🔍', title: 'Complex denial appeals', desc: 'Cases that need clinical context and payer negotiation — not routine modifier fixes.' },
                    { icon: '⚙️', title: 'Rule configuration', desc: 'Setting payer-specific coding preferences that the AI enforces on every claim.' },
                    { icon: '📈', title: 'Exception review', desc: 'Claims the AI flagged as high-risk — reviewed before submission, not after denial.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">See it with your practice's numbers</h2>
          <p className="text-gray-500 font-medium mb-8 max-w-xl mx-auto">The dashboard is live with Dr. Sarah Chen's NYC mental health practice data. No signup required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors shadow-sm">
              Open Live Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-colors shadow-sm">
              View Pricing
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
