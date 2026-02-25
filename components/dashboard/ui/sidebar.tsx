'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppProvider } from '@/app/app-provider'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Transition } from '@headlessui/react'
import { getBreakpoint } from '../utils/utils'
import SidebarLinkGroup from './sidebar-link-group'
import SidebarLink from './sidebar-link'
import Logo from './logo'

export default function Sidebar({
  variant = 'default',
}: {
  variant?: 'default' | 'v2'
}) {
  const sidebar = useRef<HTMLDivElement>(null)
  const { sidebarOpen, setSidebarOpen } = useAppProvider()
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true)
  const segments = useSelectedLayoutSegments()
  const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())
  const expandOnly = !sidebarExpanded && (breakpoint === 'lg' || breakpoint === 'xl')

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    const handleBreakpoint = () => setBreakpoint(getBreakpoint())
    window.addEventListener('resize', handleBreakpoint)
    return () => window.removeEventListener('resize', handleBreakpoint)
  }, [breakpoint])

  return (
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        as="div"
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${variant === 'v2' ? 'border-r border-gray-200' : 'border-r border-gray-100 shadow-sm'}`}
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* ── Overview ── */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3 mb-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Overview</span>
            </h3>
            <ul>
              {/* Dashboard */}
              <li className="mb-1">
                <SidebarLink href="/dashboard">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('dashboard') && !segments.includes('healthcare') && !segments.includes('security') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    <span className="text-base font-semibold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-gray-700">
                      Overview
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* ── Reception AI ── */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3 mb-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Reception AI</span>
            </h3>
            <ul className="space-y-1">
              <li>
                <SidebarLink href="/dashboard/healthcare">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('healthcare') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z" />
                      <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                    </svg>
                    <span className={`text-base font-semibold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('healthcare') ? 'text-violet-600' : 'text-gray-700'}`}>
                      AI Triage
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/checkin">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('checkin') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Receptionist Engine
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/healthcare/book">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-gray-600">
                      Book Appointment
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/healthcare/register">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-gray-600">
                      Register Patient
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/healthcare/appointments">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-gray-600">
                      Manage Schedule
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/encounter/sj-8921-a">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('encounter') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Encounter Engine
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/healthcare/insurance">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('insurance') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Insurance & Auth
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/healthcare/records">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('records') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Patient Records (FHIR)
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/billing">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('billing') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Billing Engine
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/security/benchmark">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('benchmark') ? 'text-violet-600 font-bold' : 'text-gray-600'}`}>
                      Live Benchmarks
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* ── Identity Intelligence ── */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3 mb-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Identity Intelligence</span>
            </h3>
            <ul className="space-y-1">
              <li>
                <SidebarLink href="/dashboard/security">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('security') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M6.753 2.659a1 1 0 0 0-1.506-1.317L2.451 4.537l-.744-.744A1 1 0 1 0 .293 5.207l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM6.753 10.659a1 1 0 1 0-1.506-1.317l-2.796 3.195-.744-.744a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.46-.049l3.5-4ZM8 4.5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 11.5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" />
                    </svg>
                    <span className={`text-base font-semibold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('security') ? 'text-violet-600' : 'text-gray-700'}`}>
                      Identity Hub
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/security/threats">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('threats') ? 'text-violet-500' : 'text-gray-600'}`}>
                      Threat Scanner
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/security/benchmark">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('benchmark') ? 'text-violet-500' : 'text-gray-600'}`}>
                      Benchmark
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
          {/* ── Agent Governance ── */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3 mb-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Agent Governance</span>
            </h3>
            <ul className="space-y-1">
              <li>
                <SidebarLink href="/dashboard/governance">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('governance') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 0L1 3v5c0 4.4 3 8.5 7 9.5 4-1 7-5.1 7-9.5V3L8 0zm0 7h2v4H6V7h2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <span className={`text-base font-semibold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('governance') ? 'text-violet-600' : 'text-gray-700'}`}>
                      Certification Center
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/dashboard/governance?domain=governance_traps">
                  <div className="flex items-center pl-6">
                    <span className="text-gray-300 mr-3 text-xs">→</span>
                    <span className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('traps') ? 'text-violet-500' : 'text-gray-600'}`}>
                      4 Pillar Traps
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
          {/* ── MCP Network ── */}

          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3 mb-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">MCP Network</span>
            </h3>
            <ul className="space-y-1">
              <li>
                <SidebarLink href="/dashboard/mcp">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('mcp') ? 'text-blue-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M7.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 12.7c-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-3 3c-.4.4-1 .4-1.4 0zM1.3 12.7c-.4-.4-.4-1 0-1.4l5-5c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-5 5c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span className={`text-base font-semibold ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('mcp') ? 'text-blue-600' : 'text-gray-700'}`}>
                      Protocol Hub
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto border-t border-gray-100">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shrink-0"></div>
              <span className="text-xs text-gray-400 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Clear Mind Life v1.0 · Port 8001 ●
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}