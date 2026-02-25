import Link from "next/link";
import PageIllustration from "@/components/page-illustration";
import { CheckCircle2, Shield, Activity, ArrowRight, BrainCircuit, Users, Stethoscope, Building2, Lock, Receipt } from "lucide-react";

export const metadata = {
  title: "Who We Serve - Clear Mind Life",
  description: "How Clear Mind Life eradicates administrative bottlenecks for Clinical Directors, Operations Managers, Medical Billers, and CISOs.",
};

export default function Customers() {
  return (
    <section className="relative min-h-screen bg-gray-50 pb-24 pt-32 md:pt-40 font-inter">
      <PageIllustration />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Built for Healthcare Ecosystems
          </div>
          <h1 className="mb-6 border-y text-5xl md:text-6xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] py-6 leading-tight">
            Who We Serve
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            Clear Mind Life is not a generic chatbot. It is a highly specialized, locally-deployed orchestration engine built to eradicate three massive bottlenecks plaguing modern healthcare.
          </p>
        </div>

        <div className="space-y-32">

          {/* Persona 1: Clinical Directors */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Status Quo */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shadow-inner border border-blue-200">⚕️</div>
                <h2 className="text-3xl font-bold text-gray-900">Clinical Directors & Physicians</h2>
              </div>
              <h3 className="text-xl font-bold text-rose-600 mb-4 border-l-4 border-rose-500 pl-4 py-1">The $83B Burnout Crisis</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Legacy EHRs have turned highly trained physicians into overpaid data entry clerks. Doctors spend <strong>2 hours on charting for every 1 hour of patient care</strong>, leading to massive burnout, rushed clinical notes, and severe compliance risks.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Current point-solutions are static "scribes" that just dump transcripts into a text box, requiring the doctor to manually extract ICD-10 codes, prescriptions, and follow-ups.
              </p>
            </div>

            {/* The Architecture */}
            <div className="relative flex h-full flex-col rounded-3xl bg-white p-8 md:p-10 shadow-xl shadow-black/[0.03] border border-gray-200">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl rounded-tr-3xl shadow-sm">
                The Solution
              </div>
              <div className="mb-6">
                <div className="text-xl font-bold text-gray-900 mb-2">The Post-Visit Analyzer</div>
                <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-6">Zero-Click FHIR Charting</div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our architecture listens to the telehealth session via WebRTC and dynamically builds structured clinical documents. It doesn't just transcribe; it comprehends.
                </p>
              </div>
              <ul className="space-y-4 text-gray-700 mb-10 pb-6 border-b border-gray-100 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Extracts the Chief Complaint and History of Present Illness (HPI).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Cross-references transcripts to validate precise ICD-10 nomenclature.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Natively maps extracted entities to FHIR R4 standard resources.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-900">Doctors go home on time.</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link
                  className="btn w-full rounded-xl bg-gray-900 py-4 text-white hover:bg-gray-800 transition-colors font-semibold"
                  href="/dashboard/healthcare/telehealth"
                >
                  Launch Telehealth Analyzer
                </Link>
              </div>
            </div>
          </div>

          {/* Persona 2: Operations Managers */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Architecture (Left for alternating layout on desktop) */}
            <div className="order-2 md:order-1 relative flex h-full flex-col rounded-3xl bg-gradient-to-tr from-blue-900 to-blue-800 p-8 md:p-10 shadow-2xl overflow-hidden text-white/90 ring-1 ring-blue-500/50">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl rounded-tr-3xl shadow-sm">
                The Solution
              </div>
              <div className="mb-6 relative z-10">
                <div className="text-xl font-bold text-white mb-2">The Healthcare Receptionist</div>
                <div className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-6">Autonomous Orchestration</div>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Our Receptionist agent intercepts scheduling requests natively, executing complex verification API calls before a human ever touches the record.
                </p>
              </div>
              <ul className="space-y-4 text-blue-50 mb-10 pb-6 border-b border-blue-700/50 relative z-10 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-white">Executes live X12 270/271 EDI inquiries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Determines active medical coverage and specific co-pays instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Pre-fills the complex HL7 prior authorization pipelines autonomously.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-teal-300">Balances the provider schedule with zero human touch.</span>
                </li>
              </ul>
              <div className="mt-auto relative z-10">
                <Link
                  className="btn w-full rounded-xl bg-white text-blue-900 py-4 hover:bg-gray-50 transition-colors font-bold shadow-lg"
                  href="/dashboard/healthcare"
                >
                  View Healthcare Dashboard
                </Link>
              </div>
            </div>

            {/* The Status Quo */}
            <div className="order-1 md:order-2 md:pl-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-2xl shadow-inner border border-violet-200">🏢</div>
                <h2 className="text-3xl font-bold text-gray-900">Operations Leads</h2>
              </div>
              <h3 className="text-xl font-bold text-rose-600 mb-4 border-l-4 border-rose-500 pl-4 py-1">The $20B Claims Denial Pipeline</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Healthcare practices lose thousands of dollars monthly due to simple front-desk typos, unverified benefits, and chaotic scheduling conflicts. A single misspelled insurance ID means a denied claim.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Legacy patient portals are rigid forms. When a patient gets confused by a prior authorization requirement, they abandon the portal and call the front desk, forcing staff to spend hours on hold with payers.
              </p>
            </div>
          </div>

          {/* Persona 3: Security & CISOs */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Status Quo */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-inner border border-rose-200">🛡️</div>
                <h2 className="text-3xl font-bold text-gray-900">Healthcare CISOs</h2>
              </div>
              <h3 className="text-xl font-bold text-rose-600 mb-4 border-l-4 border-rose-500 pl-4 py-1">Ransomware & AI Hallucination Risks</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Healthcare networks are the #1 target for ransomware. Legacy static passwords fail instantly against modern credential stuffing and MFA (Multi-Factor Authentication) fatigue "prompt bombing" attacks.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Furthermore, deploying generic LLMs into clinical workflows risks massive HIPAA violations if Patient Health Information (PHI) is accidentally leaked to public models like OpenAI without strict guardrails.
              </p>
            </div>

            {/* The Architecture */}
            <div className="relative flex h-full flex-col rounded-3xl bg-gray-900 p-8 md:p-10 shadow-2xl border border-gray-800 text-gray-300 ring-1 ring-white/10">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-gray-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl rounded-tr-3xl shadow-sm border-l border-b border-gray-700">
                The Security Stack
              </div>
              <div className="mb-6">
                <div className="text-xl font-bold text-white mb-2">Clear Mind Life Identity</div>
                <div className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-6">Dynamic Zero-Trust Isolation</div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Our network does not rely on static passwords. We deploy a continuous, multi-vector validation engine that treats every API call as inherently hostile until proven otherwise.
                </p>
              </div>
              <ul className="space-y-4 text-gray-300 mb-10 pb-6 border-b border-gray-800 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Analyzes real-time behavioral baselines (device fingerprinting, IP entropy).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Automatically neutralizes MFA fatigue and prompt bombing attacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-white font-medium">Blocks mass-assignment and complex RBAC escalation vectors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="font-bold text-rose-400">Enforces strict, local PHI-scrubbing before LLM routing.</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link
                  className="btn w-full rounded-xl bg-white text-gray-900 hover:bg-gray-100 py-4 font-bold shadow-sm transition-colors"
                  href="/dashboard/security"
                >
                  View Universal Benchmark Matrix
                </Link>
              </div>
            </div>
          </div>

          {/* Persona 4: Medical Billers (Human Empowerment) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Architecture (Left) */}
            <div className="order-2 md:order-1 relative flex h-full flex-col rounded-3xl bg-indigo-50 p-8 md:p-10 shadow-xl border border-indigo-100">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl rounded-tr-3xl shadow-sm">
                The Solution
              </div>
              <div className="mb-6 relative z-10">
                <div className="text-xl font-bold text-indigo-900 mb-2">The AI Workbench & Bounty Hub</div>
                <div className="text-sm font-black text-indigo-500 uppercase tracking-wider mb-6">10x Biller Output</div>
                <p className="text-indigo-900/80 mb-8 leading-relaxed font-medium">
                  We don't replace billers; we arm them with guided intelligence. The engine drafts the 837, flags the missing modifiers, and presents a one-click fix.
                </p>
              </div>
              <ul className="space-y-4 text-indigo-900 mb-10 pb-6 border-b border-indigo-200 relative z-10 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-indigo-950">Review and approve AI-staged claims 5x faster.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Predictive denial scoring catches the typo before the clearinghouse does.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-bold text-indigo-700">Access the Learning Hub to upskill on complex payer policies.</span>
                </li>
              </ul>
              <div className="mt-auto relative z-10 flex gap-4">
                <Link
                  className="flex-1 text-center btn rounded-xl bg-indigo-600 text-white py-4 hover:bg-indigo-700 transition-colors font-bold shadow-md"
                  href="/train"
                >
                  The Training Hub
                </Link>
              </div>
            </div>

            {/* The Status Quo */}
            <div className="order-1 md:order-2 md:pl-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shadow-inner border border-indigo-200">
                  <Users className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Medical Billers & Analysts</h2>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-4 border-l-4 border-indigo-500 pl-4 py-1">The High-Volume Trap</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Billers are expected to memorize thousands of payer-specific rules and constantly cross-reference LCD/NCD policies across multiple browser tabs. It is an impossible retention task.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Instead of forcing skilled human billers to do repetitive copy-pasting, we elevate them to <strong>Reviewers and Protocol Engineers</strong>. By giving them the Clear Mind engine, they can clear backlogs autonomously or even participate in our remote bounty network.
              </p>
            </div>
          </div>

        </div>

        {/* Action Bottom */}
        <div className="mt-32 text-center bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Eradicate Administrative Bloat?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Stop patching broken workflows with static software. Deploy the architecture designed to actively execute the healthcare continuum.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg">
              Request a Custom Architectural Demo
            </Link>
            <Link href="/signin" className="px-8 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
              Enter the Command Center
            </Link>
          </div>
        </div>

      </div>
    </section >
  );
}
