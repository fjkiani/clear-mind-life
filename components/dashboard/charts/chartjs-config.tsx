// Import Chart.js
import { Chart, Tooltip } from 'chart.js'
import { tailwindConfig, hexToRGB } from '@/components/dashboard/utils/utils'

// Register only what we need
Chart.register(Tooltip)

// Add this plugin to clear any remaining labels
Chart.register({
  id: 'removeLabels',
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.clearRect(0, 0, chart.width, 20); // Clear the top area where labels might appear
    ctx.restore();
  }
});

// Define Chart.js default settings
Object.assign(Chart.defaults, {
  font: {
    family: '"Inter", sans-serif',
    style: 'normal',
    weight: 400,
  },
  datasets: {
    bar: {
      label: null,
      backgroundColor: 'rgb(16, 185, 129)',
      borderWidth: 0,
      borderRadius: {
        topLeft: 2,
        topRight: 2,
      },
    },
    line: {
      label: null,
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      borderWidth: 1,
      displayColors: false,
      mode: 'nearest',
      intersect: false,
      position: 'nearest',
      caretSize: 0,
      caretPadding: 20,
      cornerRadius: 8,
      padding: 8,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
    }
  }
});

interface ChartArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface ColorStop {
  stop: number;
  color: string;
}

// Function that generates a gradient for line charts
export const chartAreaGradient = (
  ctx: CanvasRenderingContext2D | null,
  chartArea: ChartArea | null,
  colorStops: ColorStop[] | null
): CanvasGradient | string | null => {
  if (!ctx || !chartArea || !colorStops || colorStops.length === 0) {
    return 'transparent';
  }
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color);
  });
  return gradient;
};

export const chartColors = {
  textColor: {
    light: tailwindConfig.theme.colors.gray[400],
    dark: tailwindConfig.theme.colors.gray[500]
  },
  gridColor: {
    light: tailwindConfig.theme.colors.gray[100],
    dark: `rgba(${hexToRGB(tailwindConfig.theme.colors.gray[700])}, 0.6)`
  },
  backdropColor: {
    light: tailwindConfig.theme.colors.white,
    dark: tailwindConfig.theme.colors.gray[800]
  },
  tooltipTitleColor: {
    light: tailwindConfig.theme.colors.gray[800],
    dark: tailwindConfig.theme.colors.gray[100]
  },
  tooltipBodyColor: {
    light: tailwindConfig.theme.colors.gray[500],
    dark: tailwindConfig.theme.colors.gray[400]
  },
  tooltipBgColor: {
    light: tailwindConfig.theme.colors.white,
    dark: tailwindConfig.theme.colors.gray[700]
  },
  tooltipBorderColor: {
    light: tailwindConfig.theme.colors.gray[200],
    dark: tailwindConfig.theme.colors.gray[600]
  },
}
