import Logo from "@/components/ui/logo";
import { ShieldCheck, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="absolute z-30 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="mr-4 shrink-0">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex grow">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/3"
          aria-hidden="true"
        >
          <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 opacity-70 blur-[160px] will-change-[filter]"></div>
        </div>

        {/* Left: Auth form */}
        <div className="w-full">
          <div className="flex h-full flex-col justify-center before:min-h-[4rem] before:flex-1 after:flex-1 md:before:min-h-[5rem]">
            <div className="px-4 sm:px-6">
              <div className="mx-auto w-full max-w-sm">
                <div className="py-16 md:py-20">{children}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clear Mind Life branded panel */}
        <div className="relative my-6 mr-6 hidden w-[572px] shrink-0 overflow-hidden rounded-2xl lg:block bg-gray-900">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col h-full p-12 justify-between">
            {/* Top: ROI stats */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-8 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Platform Metrics
              </div>

              <h2 className="text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                Stop the Revenue Bleed.<br />
                <span className="text-emerald-400">Start Recovering Today.</span>
              </h2>
              <p className="text-gray-400 font-medium mb-10 leading-relaxed">
                The average 5-provider mental health practice recovers $450K in previously lost revenue within the first year.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Denial Rate</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">20% → <span className="text-emerald-400">&lt;5%</span></div>
                  <div className="text-xs text-gray-500 font-medium">First-pass approval rate</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time Saved</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1"><span className="text-sky-400">2h+</span>/day</div>
                  <div className="text-xs text-gray-500 font-medium">Per provider, on charting</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cost to Collect</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">$22 → <span className="text-violet-400">$4.50</span></div>
                  <div className="text-xs text-gray-500 font-medium">Per claim processed</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ROI</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1"><span className="text-rose-400">9:1</span></div>
                  <div className="text-xs text-gray-500 font-medium">Return on investment</div>
                </div>
              </div>
            </div>

            {/* Bottom: Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 font-medium leading-relaxed mb-4 text-sm">
                &ldquo;We went from spending 3 hours a day on prior authorizations to under 20 minutes. The claims scrubber caught $47K in errors in the first month alone. This is the infrastructure we&apos;ve needed for years.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-black text-sm">
                  SC
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Dr. Sarah Chen</div>
                  <div className="text-gray-500 text-xs font-medium">Clinical Director, NYC Mental Health Practice · 5 Providers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
