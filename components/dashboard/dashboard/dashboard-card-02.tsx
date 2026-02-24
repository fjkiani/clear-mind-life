'use client'

import { useEffect } from 'react'
import { Chart } from 'chart.js/auto'

export default function DashboardCard02() {
  useEffect(() => {
    const ctx = document.getElementById('learning-paths-chart') as HTMLCanvasElement
    if (!ctx) return

    // Plugin to completely remove any text above bars
    Chart.register({
      id: 'removeAllLabels',
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.clearRect(0, 0, chart.width, 20); // Clear the top area where labels appear
        ctx.restore();
      }
    });

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['24 Oct', '30 Oct', '5 Nov'],
        datasets: [{
          data: [245, 378, 486],
          backgroundColor: 'rgb(16, 185, 129)',
          borderWidth: 0,
          borderRadius: {
            topLeft: 2,
            topRight: 2,
          },
          barThickness: 40,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: 'rgb(255, 255, 255)',
            bodyColor: 'rgb(255, 255, 255)',
            padding: 8,
            callbacks: {
              title: () => '',
              label: (context) => `${context.parsed.y} paths`
            }
          }
        },
        scales: {
          y: {
            min: 0,
            max: 600,
            border: {
              display: false
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              padding: 10,
              callback: (value) => value.toString(),
              stepSize: 200,
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              padding: 10
            }
          }
        }
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-slate-900 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">Learning Paths</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">PATHS GENERATED THIS WEEK</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-100 mr-2">486</div>
          <div className="text-sm font-semibold text-emerald-500 px-1.5 bg-emerald-500/20 rounded-full">+24%</div>
        </div>
      </div>
      <div className="grow">
        <canvas id="learning-paths-chart" height="280"></canvas>
      </div>
    </div>
  )
}
