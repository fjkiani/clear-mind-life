'use client'

import { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { tailwindConfig } from '@/components/dashboard/utils/utils'

interface EngagementData {
  weeklyData: { day: string; hours: number }[]
  lastUpdated: string
  averageHours: number
  percentageChange: number
}

const mockEngagementData: EngagementData = {
  weeklyData: [
    { day: 'Mon', hours: 2.1 },
    { day: 'Tue', hours: 3.4 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.2 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 1.2 },
    { day: 'Sun', hours: 0.8 },
  ],
  lastUpdated: new Date().toLocaleTimeString(),
  averageHours: 2.3,
  percentageChange: 14.5
}

export default function DashboardCard05() {
  const [engagementData, setEngagementData] = useState<EngagementData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let chart: Chart | null = null

    const initializeChart = (data: EngagementData) => {
      const ctx = document.getElementById('engagement-chart') as HTMLCanvasElement
      if (!ctx) return

      const chartData = {
        labels: data.weeklyData.map(d => d.day),
        datasets: [
          {
            label: 'Average Hours',
            data: data.weeklyData.map(d => d.hours),
            backgroundColor: tailwindConfig.theme.colors.indigo[500],
            borderColor: tailwindConfig.theme.colors.indigo[500],
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }
        ],
      }

      chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          // ... existing options ...
        }
      })
    }

    // Real-time data fetching
    const fetchData = async () => {
      try {
        const data = await Promise.resolve(mockEngagementData);
        setEngagementData(data)
        setIsLoading(false)

        if (chart) {
          chart.destroy()
        }
        initializeChart(data)
      } catch (error) {
        console.error('Error fetching engagement data:', error)
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Set up real-time updates every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)

    return () => {
      clearInterval(intervalId)
      if (chart) {
        chart.destroy()
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Learning Engagement</h2>
          <span className="text-xs text-gray-400">
            Last updated: {engagementData?.lastUpdated}
          </span>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Average Daily Learning Time
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {engagementData?.averageHours.toFixed(1)} hrs
          </div>
          <div className={`text-sm font-medium px-1.5 rounded-full 
            ${(engagementData?.percentageChange ?? 0) >= 0
              ? 'text-green-700 bg-green-500/20'
              : 'text-red-700 bg-red-500/20'
            }`}>
            {(engagementData?.percentageChange ?? 0) >= 0 ? '+' : ''}
            {engagementData?.percentageChange}%
          </div>
        </div>
      </div>
      <div className="grow">
        <canvas id="engagement-chart" height="280"></canvas>
      </div>
    </div>
  )
}
