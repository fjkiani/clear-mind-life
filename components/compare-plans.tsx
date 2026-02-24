import Tooltip from "@/components/tooltip";

export default function ComparePlans() {
  const checkIcon = (
    <svg
      className="mr-3 shrink-0 fill-emerald-500"
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={9}
    >
      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z"></path>
    </svg>
  );

  const minusIcon = (
    <svg
      className="mr-3 shrink-0 fill-gray-300 dark:fill-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={2}
    >
      <path d="M0 0h12v2H0z"></path>
    </svg>
  );

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-3xl font-bold md:text-4xl">Compare plans in detail</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">See exactly what you get when you upgrade.</p>
          </div>

          <div className="mx-auto grid max-w-sm max-md:gap-6 md:-mx-6 md:max-w-none md:grid-cols-3">
            {/* Column with labels */}
            <section className="md:contents [&>div:first-child]:rounded-t-2xl [&>div:first-child]:pt-5 md:[&>div:last-child>div]:border-none [&>div:last-child]:rounded-b-2xl">
              {/* Empty cell */}
              <div />
              {/* # Platform Features */}
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-1" aria-hidden="true">
                <div className="mb-2 mt-5 font-bold">Platform Features</div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-2" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="pf1" content="The core visual interface for intelligent care routing.">
                    Healthcare Agentic UI
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-3" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="pf2" content="Automated workflows for onboarding and intelligent scheduling blocks.">
                    Patient Reg & Scheduling
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-4" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="pf3" content="Bi-directional intelligence sync with Cerner, Epic, and legacy systems.">
                    FHIR/X12/HL7 Integrations
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-5" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="pf4" content="Secure data vaulting and consent management protocols.">
                    Identity Intelligence Suite
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-6" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="pf5" content="Total concurrent patients handled by the orchestration engine.">
                    Monthly Patient Limit
                  </Tooltip>
                </div>
              </div>

              {/* # Advanced & Testing */}
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-7" aria-hidden="true">
                <div className="mb-2 mt-5 font-bold">Advanced & Testing</div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-8" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="at1" content="Monitor true reliability vs theoretical baselines across all clinical tasks.">
                    Live Benchmark Framework
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-9" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="at2" content="Isolate and shadow-test Model Context Protocol servers before prod.">
                    MCP Testing Harnesses
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-10" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="at3" content="Simulate complex edge-cases and rare conditions without exposing true PHI.">
                    Synthetic Patient Data Gen
                  </Tooltip>
                </div>
              </div>

              {/* # Support & Reliability */}
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-11" aria-hidden="true">
                <div className="mb-2 mt-5 font-bold">Support & Reliability</div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-12" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="sr1" content="Enterprise SLA ensuring continuous autonomous performance.">
                    99.9% Agent Reliability SLA
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 max-md:hidden md:order-[13]" aria-hidden="true">
                <div className="border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  <Tooltip id="sr2" content="Priority clinical integration support from the architecture team.">
                    Dedicated Support
                  </Tooltip>
                </div>
              </div>
            </section>
            {/* End: Column with labels */}

            {/* Standard Tier table */}
            <section className="md:contents [&>div:first-child]:rounded-t-2xl [&>div:first-child]:pt-5 md:[&>div:last-child>div]:border-none [&>div:last-child]:rounded-b-2xl">
              <div className="relative flex flex-col justify-end px-6">
                <div className="grow">
                  <div className="mb-5 font-medium">Standard</div>
                  <div>
                    <a className="btn-sm w-full rounded-lg bg-gray-800 py-1.5 text-white shadow hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:dark:bg-white" href="#0">
                      Start free trial
                    </a>
                  </div>
                </div>
              </div>
              {/* # Platform Features */}
              <div className="flex flex-col justify-end px-6 md:order-1">
                <div className="mb-2 mt-5 font-bold md:sr-only">Platform Features</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-2">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {checkIcon} <span className="md:sr-only">Healthcare Agentic UI</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-3">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {checkIcon} <span className="md:sr-only">Patient Reg & Scheduling</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-4">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {checkIcon} <span className="md:sr-only">FHIR/X12/HL7 Integrations</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-5">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {checkIcon} <span className="md:sr-only">Identity Intelligence Suite</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-6">
                <div className="h-full border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  10,000 / mo <span className="md:sr-only">Monthly Patient Limit</span>
                </div>
              </div>

              {/* # Advanced & Testing */}
              <div className="flex flex-col justify-end px-6 md:order-7">
                <div className="mb-2 mt-5 font-bold md:sr-only">Advanced & Testing</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-8">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {minusIcon} <span className="md:sr-only">Live Benchmark Framework</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-9">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {minusIcon} <span className="md:sr-only">MCP Testing Harnesses</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-10">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {minusIcon} <span className="md:sr-only">Synthetic Patient Data Gen</span>
                </div>
              </div>

              {/* # Support & Reliability */}
              <div className="flex flex-col justify-end px-6 md:order-11">
                <div className="mb-2 mt-5 font-bold md:sr-only">Support & Reliability</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-12">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {minusIcon} <span className="md:sr-only">99.9% Agent Reliability SLA</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-[13]">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-800">
                  {minusIcon} <span className="md:sr-only">Dedicated Support</span>
                </div>
              </div>
            </section>
            {/* End: Standard Tier table */}

            {/* Advanced Tier table */}
            <section className="md:contents [&>div:first-child]:rounded-t-2xl [&>div:first-child]:pt-5 md:[&>div:last-child>div]:border-none [&>div:last-child]:rounded-b-2xl [&>div]:bg-gray-50 dark:[&>div]:bg-gray-800/50">
              <div className="relative flex flex-col justify-end px-6">
                <div className="grow">
                  <div className="mb-5 font-medium text-blue-600 dark:text-blue-500">Advanced</div>
                  <div>
                    <a className="btn-sm w-full rounded-lg bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] py-1.5 text-white shadow hover:bg-[length:100%_150%]" href="#0">
                      Start free trial
                    </a>
                  </div>
                </div>
              </div>
              {/* # Platform Features */}
              <div className="flex flex-col justify-end px-6 md:order-1">
                <div className="mb-2 mt-5 font-bold md:sr-only">Platform Features</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-2">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Healthcare Agentic UI</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-3">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Patient Reg & Scheduling</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-4">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">FHIR/X12/HL7 Integrations</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-5">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Identity Intelligence Suite</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-6">
                <div className="h-full border-b border-gray-200 py-4 text-sm dark:border-gray-700 font-medium">
                  Unlimited <span className="md:sr-only">Monthly Patient Limit</span>
                </div>
              </div>

              {/* # Advanced & Testing */}
              <div className="flex flex-col justify-end px-6 md:order-7">
                <div className="mb-2 mt-5 font-bold md:sr-only">Advanced & Testing</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-8">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Live Benchmark Framework</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-9">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">MCP Testing Harnesses</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-10">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Synthetic Patient Data Gen</span>
                </div>
              </div>

              {/* # Support & Reliability */}
              <div className="flex flex-col justify-end px-6 md:order-11">
                <div className="mb-2 mt-5 font-bold md:sr-only">Support & Reliability</div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-12">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">99.9% Agent Reliability SLA</span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:order-[13]">
                <div className="flex h-full items-center border-b border-gray-200 py-4 text-sm dark:border-gray-700">
                  {checkIcon} <span className="md:sr-only">Dedicated Support</span>
                </div>
              </div>
            </section>
            {/* End: Advanced Tier table */}
          </div>
        </div>
      </div>
    </section>
  );
}
