import PageIllustration from "@/components/page-illustration";
import Search from "./search";

export default function Hero() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Support Center
            </div>
            <h1 className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl py-4">
              How can we help?
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Questions about your revenue cycle, NCCI edits, payer integrations, or HIPAA compliance? Our team and documentation have you covered.
              </p>
            </div>
          </div>
          <Search />

          {/* Quick links */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Getting Started", icon: "🚀", href: "/documentation" },
              { label: "Billing & Claims", icon: "💳", href: "/documentation/billing" },
              { label: "Security & HIPAA", icon: "🛡️", href: "/documentation/security" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all text-center group"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
