import Link from "next/link";
import Logo from "./logo";
import { Activity, ShieldCheck } from "lucide-react";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-3">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              &copy; Clear Mind Life. com - All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/customers"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/apps"
                >
                  Integrations & Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/documentation"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/signin"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block: Security & Compliance */}
          <div className="space-y-4 sm:col-span-12 md:col-span-6 lg:col-span-5 flex flex-col items-start lg:items-end w-full">
            <h3 className="text-sm font-medium">Trust & Security</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 flex-1 justify-center whitespace-nowrap shadow-sm hover:shadow transition-shadow">
                <ShieldCheck className="w-5 h-5 text-gray-700 shrink-0" />
                <span className="text-xs font-bold text-gray-700 tracking-wide">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 flex-1 justify-center whitespace-nowrap shadow-sm hover:shadow transition-shadow">
                <Activity className="w-5 h-5 text-gray-700 shrink-0" />
                <span className="text-xs font-bold text-gray-700 tracking-wide">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full -z-10" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[220px] font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['CLEAR_MIND'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['CLEAR_MIND'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px] will-change-[filter]"></div>
        </div>
      </div>
    </footer>
  );
}
