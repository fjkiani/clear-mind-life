'use client'

import EditMenu from '@/components/dashboard/edit-menu'
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js'
import { useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { tailwindConfig, hexToRGB } from '@/components/dashboard/utils/utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip)

export default function DashboardCard03() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const darkMode = theme === 'dark'

  useEffect(() => {
    const ctx = canvas.current
    if (!ctx) return

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: [75, 85, 90, 84],
          fill: true,
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
            gradient.addColorStop(0, `rgba(${hexToRGB(tailwindConfig.theme.colors.emerald[500])}, 0.2)`);
            gradient.addColorStop(1, `rgba(${hexToRGB(tailwindConfig.theme.colors.emerald[500])}, 0)`);
            return gradient;
          },
          borderColor: tailwindConfig.theme.colors.emerald[500],
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig.theme.colors.emerald[500],
          pointHoverBackgroundColor: tailwindConfig.theme.colors.emerald[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        }]
      },
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            border: {
              display: false,
            },
            ticks: {
              callback: (value) => value + '%',
              color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
            },
            grid: {
              color: darkMode ? 'rgba(55, 65, 81, 0.1)' : 'rgba(229, 231, 235, 0.5)',
            },
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => context.parsed.y + '%',
            },
            backgroundColor: darkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
            titleColor: darkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
            bodyColor: darkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
            borderWidth: 1,
            borderColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
      },
    })

    return () => chart.destroy()
  }, [darkMode])

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Course Completion</h2>
          <EditMenu align="right" />
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Average Completion Rate</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">84%</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+5%</div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} height="280"></canvas>
      </div>
    </div>
  )
}

