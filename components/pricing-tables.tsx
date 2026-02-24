"use client";

import { useState } from "react";
import PageIllustration from "@/components/page-illustration";

export default function PricingTables() {
  const [annual, setAnnual] = useState<boolean>(true);

  return (
    <section className="relative">
      <PageIllustration />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl">
              Simple, transparent pricing
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg text-gray-700">
                Deploy the complete end-to-end healthcare AI platform. Choose between the standard suite or unlock real-time performance benchmarking.
              </p>
            </div>
          </div>

          {/* Pricing tables */}
          <div>
            {/* Pricing toggle */}
            <div className="m-auto mb-16 flex max-w-xs justify-center">
              <div className="relative mx-6 flex w-full rounded-lg bg-gray-200 p-1">
                <span
                  className="pointer-events-none absolute inset-0 m-1"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute inset-0 w-1/2 transform rounded bg-white shadow transition ${annual ? "translate-x-0" : "translate-x-full"}`}
                  ></span>
                </span>
                <button
                  className={`relative flex-1 p-1 text-sm font-medium transition ${annual ? "" : "text-gray-900"}`}
                  onClick={() => setAnnual(true)}
                  aria-pressed={annual}
                >
                  Bill Yearly
                  <span className="text-emerald-500">-20%</span>
                </button>
                <button
                  className={`relative flex-1 p-1 text-sm font-medium transition ${annual ? "text-gray-500" : ""}`}
                  onClick={() => setAnnual(false)}
                  aria-pressed={annual}
                >
                  Bill Monthly
                </button>
              </div>
            </div>

            <div className="mx-auto grid max-w-sm items-start gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl lg:gap-12">
              {/* Pricing table 1: Standard */}
              <div className="relative flex h-full flex-col rounded-2xl bg-white/70 p-8 shadow-lg shadow-black/[0.03] backdrop-blur-sm border border-gray-100">
                <div className="mb-6">
                  <div className="mb-2 text-lg font-bold text-gray-900">
                    Standard
                  </div>
                  <div className="mb-4 flex items-baseline border-b border-dashed border-gray-200 pb-4">
                    <span className="text-3xl font-bold">$</span>
                    <span className="text-5xl font-bold tabular-nums">
                      {annual ? 99 : 124}
                    </span>
                    <span className="pl-1 text-sm text-gray-500">/month</span>
                  </div>
                  <div className="grow text-sm text-gray-700 leading-relaxed text-balance">
                    The complete healthcare and identity intelligence suite to orchestrate your patient journey.
                  </div>
                </div>
                <ul className="grow space-y-4 text-sm text-gray-600 mb-8">
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-blue-600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span className="font-medium text-gray-900">Healthcare Agentic UI</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-blue-600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Patient Registration & Scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-blue-600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>FHIR / X12 / HL7 Integrations</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-blue-600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span className="font-medium text-gray-900">Identity Intelligence Suite</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-blue-600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Up to 10k monthly patients</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <a
                    className="btn w-full rounded-xl bg-gray-900 py-3 text-white shadow-sm hover:bg-gray-800 transition-colors"
                    href="#0"
                  >
                    Start Free Trial
                  </a>
                </div>
              </div>

              {/* Pricing table 2: Advanced */}
              <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-tr from-blue-900 to-blue-800 p-8 shadow-2xl relative overflow-hidden text-white/90 ring-1 ring-blue-500/50">
                {/* Popular marker */}
                <div className="absolute top-0 right-0 py-1.5 px-4 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-bl-xl shadow-sm">
                  Recommended
                </div>

                <div className="mb-6 relative z-10">
                  <div className="mb-2 text-lg font-bold text-white">
                    Advanced
                  </div>
                  <div className="mb-4 flex items-baseline border-b border-dashed border-blue-400/30 pb-4">
                    <span className="text-3xl font-bold text-white">$</span>
                    <span className="text-5xl font-bold tabular-nums text-white">
                      {annual ? 299 : 349}
                    </span>
                    <span className="pl-1 text-sm text-blue-200">/month</span>
                  </div>
                  <div className="grow text-sm text-blue-100 leading-relaxed text-balance">
                    For enterprise operations requiring verifiable proof of agentic safety and live tool testing.
                  </div>
                </div>
                <ul className="grow space-y-4 text-sm text-blue-100 mb-8 relative z-10">
                  <li className="flex items-center font-bold text-white mb-2">
                    Everything in Standard, plus:
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-teal-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span className="font-medium text-white">Live Benchmark Framework</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-teal-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>MCP Server Testing Harnesses</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-teal-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Synthetic Patient Data Gen</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-teal-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>99.9% Agent Reliability SLA</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-4 w-4 shrink-0 fill-current text-teal-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Unlimited monthly patients</span>
                  </li>
                </ul>
                <div className="mt-auto relative z-10">
                  <a
                    className="btn w-full rounded-xl bg-white text-blue-900 py-3 shadow-sm hover:bg-gray-50 transition-colors font-bold"
                    href="#0"
                  >
                    Upgrade to Advanced
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
