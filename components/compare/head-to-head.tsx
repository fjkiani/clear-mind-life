"use client"
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, AlertCircle, RefreshCw, Zap } from 'lucide-react'

type Competitor = {
  id: string
  name: string
  category: string
  theirApproach: string
  ourAdvantage: string
  verdict: string
}

const competitors: Competitor[] = [
  {
    id: 'phreesia',
    name: 'Phreesia & Kiosk Systems',
    category: 'The Receptionist Node',
    theirApproach: 'Physical hardware lock-in and patient-facing questionnaires that dump unstructured PDFs into the EHR.',
    ourAdvantage: 'Zero hardware. The AI validates eligibility pre-arrival via X12 EDIs and guides patients through SMS.',
    verdict: 'Bypass the hardware fees and orchestrate HL7 data directly into the EHR.'
  },
  {
    id: 'scribeamerica',
    name: 'ScribeAmerica & Legacy Dictation',
    category: 'The Encounter Node',
    theirApproach: 'Legacy dictation software and heavy outsourced services that still demand tedious chart review and manual CPT coding.',
    ourAdvantage: 'Ambient, autonomous encounter agents that instantly generate structured SOAP notes and predictive ICD/CPT coding.',
    verdict: 'Deploy an intelligent layer to return 2+ hours of clinical time daily.'
  },
  {
    id: 'athena',
    name: 'Athena Collector & Rules',
    category: 'The Billing Node',
    theirApproach: 'Static rules engines that flag errors after they occur, requiring your staff to comb through tedious exception queues.',
    ourAdvantage: 'Predictive denial prevention. Real-time AI scrubbing catches NCCI and LCD rule violations before the claim is submitted.',
    verdict: 'Augment your existing pipeline with autonomous intelligence that stops denials at the source.'
  },
  {
    id: 'waystar',
    name: 'Waystar & Clearinghouses',
    category: 'The Billing Node',
    theirApproach: 'Acts simply as a dumb pipe. Receives claims and passes them through, leaving the heavy lifting of scrubbing to your staff.',
    ourAdvantage: 'Functions as a cognitive middle-layer. Not just a pipe, but an intelligent agent that actively repairs claims in flight.',
    verdict: 'Orchestrate clearinghouse traffic autonomously to safeguard revenue.'
  }
]

export default function HeadToHead() {
  return (
    <div className="mt-24 pt-16 border-t border-gray-200">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">The Old Guard is Obsolete.</h2>
        <p className="text-gray-600 font-medium text-lg leading-relaxed">
          It's not just about slightly better software; it's a fundamental architectural shift. See how an autonomous
          cognitive engine compares head-to-head with legacy solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competitors.map((comp) => (
          <div key={comp.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-100 transition-colors"></div>

            <div className="relative z-10 flex-grow">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">{comp.category}</span>
              <h3 className="text-xl font-black text-gray-900 mb-6">{comp.name}</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <AlertCircle className="w-3.5 h-3.5" /> Their Core Issue
                  </h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{comp.theirApproach}</p>
                </div>

                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> The Clear Mind Shift
                  </h4>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{comp.ourAdvantage}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-gray-100">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1"><RefreshCw className="w-3 h-3" /> The Verdict</h4>
                <p className="text-sm font-bold text-gray-900 leading-tight">{comp.verdict}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
