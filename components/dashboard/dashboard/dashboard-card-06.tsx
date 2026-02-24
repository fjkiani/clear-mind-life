'use client'

import { useEffect } from 'react'
import { Chart } from 'chart.js/auto'
import { tailwindConfig } from '@/components/dashboard/utils/utils'

export default function DashboardCard06() {
  const chartData = {
    labels: ['Topics', 'Prerequisites', 'Learning Paths'],
    datasets: [
      {
        data: [342, 789, 156],
        backgroundColor: [
          tailwindConfig.theme.colors.indigo[500],
          tailwindConfig.theme.colors.blue[400],
          tailwindConfig.theme.colors.indigo[800],
        ],
      }
    ],
  }

  useEffect(() => {
    const ctx = document.getElementById('content-chart') as HTMLCanvasElement
    if (!ctx) return

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
        cutout: '60%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ${context.parsed}`
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Content Growth</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">New Content Added This Month</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">1,287</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+32%</div>
        </div>
      </div>
      <div className="grow">
        <canvas id="content-chart" height="280"></canvas>
      </div>
    </div>
  )
}
