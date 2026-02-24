'use client'

import { useEffect } from 'react'
import { Chart, BubbleDataPoint } from 'chart.js/auto'

// Import utilities
import { tailwindConfig } from '@/components/dashboard/utils/utils'

export default function DashboardCard04() {
  const chartData = {
    datasets: [
      {
        data: [
          { x: 25, y: 30, r: 15, label: 'Python' },
          { x: 40, y: 60, r: 20, label: 'Machine Learning' },
          { x: 60, y: 40, r: 25, label: 'Data Science' },
          { x: 70, y: 70, r: 12, label: 'React' },
          { x: 20, y: 50, r: 18, label: 'JavaScript' },
          { x: 80, y: 20, r: 15, label: 'Cloud Computing' },
          { x: 45, y: 80, r: 20, label: 'AI' },
          { x: 30, y: 70, r: 14, label: 'DevOps' },
        ],
        backgroundColor: [
          tailwindConfig.theme.colors.indigo[500] + '80',
          tailwindConfig.theme.colors.sky[500] + '80',
          tailwindConfig.theme.colors.rose[500] + '80',
          tailwindConfig.theme.colors.emerald[500] + '80',
          tailwindConfig.theme.colors.violet[500] + '80',
          tailwindConfig.theme.colors.amber[500] + '80',
          tailwindConfig.theme.colors.blue[500] + '80',
          tailwindConfig.theme.colors.pink[500] + '80',
        ],
        borderColor: 'transparent',
      },
    ],
  }

  useEffect(() => {
    const ctx = document.getElementById('bubble-chart') as HTMLCanvasElement
    if (!ctx) return

    // Register the plugin for labels
    Chart.register({
      id: 'bubbleLabels',
      afterDatasetsDraw(chart) {
        const { ctx } = chart
        chart.data.datasets[0].data.forEach((data: any, i) => {
          const meta = chart.getDatasetMeta(0)
          const element = meta.data[i]
          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = '12px Inter'
          ctx.fillStyle = tailwindConfig.theme.colors.gray[600]
          ctx.fillText(data.label, element.x, element.y)
          ctx.restore()
        })
      }
    })

    const chart = new Chart(ctx, {
      type: 'bubble',
      data: chartData,
      options: {
        layout: {
          padding: {
            top: 25,
            bottom: 25,
            left: 25,
            right: 25,
          },
        },
        scales: {
          x: {
            display: false,
            min: 0,
            max: 100,
          },
          y: {
            display: false,
            min: 0,
            max: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `${context.raw.label}: ${context.raw.r} courses`
              },
            },
          },
        },
        interaction: {
          intersect: true,
          mode: 'nearest',
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    })

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Skills Coverage</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Unique Skills Tracked</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">1,892</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+23</div>
        </div>
      </div>
      <div className="grow">
        <canvas id="bubble-chart" height="280"></canvas>
      </div>
    </div>
  )
}