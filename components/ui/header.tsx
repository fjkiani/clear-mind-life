import Link from "next/link";
import Logo from "./logo";
import Dropdown from "@/components/dropdown";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8">
              <li className="px-3 py-1">
                <Link
                  href="/platform"
                  className="flex items-center font-semibold text-gray-900 transition hover:text-blue-600"
                >
                  Platform
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/doctrine"
                  className="flex items-center text-gray-700 transition hover:text-gray-900"
                >
                  Doctrine
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/train"
                  className="flex items-center text-gray-700 transition hover:text-gray-900"
                >
                  Train
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/pricing"
                  className="flex items-center text-gray-700 transition hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/compare"
                  className="flex items-center text-indigo-600 font-bold transition hover:text-indigo-800"
                >
                  Moat
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/customers"
                  className="flex items-center text-gray-700 transition hover:text-gray-900"
                >
                  Customers
                </Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="More">
                <li>
                  <Link
                    href="/blog"
                    className="flex rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="flex rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apps"
                    className="flex rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Apps
                  </Link>
                </li>
              </Dropdown>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/dashboard"
                className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
              >
                View Demo
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                Sign Up
              </Link>
            </li>
          </ul>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
