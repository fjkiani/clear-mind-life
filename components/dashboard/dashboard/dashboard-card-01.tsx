'use client'

import { useEffect } from 'react'
import { Chart } from 'chart.js/auto'
import { tailwindConfig } from '@/components/dashboard/utils/utils'

export default function DashboardCard01() {
  const chartData = {
    labels: [
      '24 Oct', '27 Oct', '30 Oct', '2 Nov', '5 Nov'
    ],
    datasets: [
      // Current Period
      {
        label: 'Current Period',
        data: [
          1247, 1512, 1842, 2156, 2534
        ],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        borderColor: 'rgba(99, 102, 241)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'rgba(99, 102, 241)',
        clip: 20,
      },
      // Previous Period
      {
        label: 'Previous Period',
        data: [
          1102, 1298, 1489, 1752, 2014
        ],
        borderColor: 'rgba(99, 102, 241, 0.25)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'rgba(99, 102, 241, 0.25)',
        clip: 20,
      },
    ],
  }

  useEffect(() => {
    const ctx = document.getElementById('active-learners-chart') as HTMLCanvasElement
    if (!ctx) return

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
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
            grid: {
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => value.toLocaleString(),
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              },
              label: (context) => {
                const label = context.dataset.label || '';
                return `${label}: ${(context.parsed.y as number).toLocaleString()} users`;
              },
            },
            mode: 'nearest',
            intersect: false,
            caretSize: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            bodyColor: '#fff',
            padding: {
              x: 8,
              y: 6,
            },
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
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Active Learners</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Weekly Active Users</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">1,247</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+12%</div>
        </div>
      </div>
      <div className="grow">
        <canvas id="active-learners-chart" height="280"></canvas>
      </div>
    </div>
  )
}
