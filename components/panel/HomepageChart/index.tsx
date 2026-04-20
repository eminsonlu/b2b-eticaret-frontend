'use client';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  PolarAreaController,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { FiDownload, FiMaximize2, FiRefreshCw } from 'react-icons/fi';
import { DateTime } from 'luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  PolarAreaController
);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea';
type DataType = 'orderSales' | 'cartSales';
type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom';

interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
  extraData?: any[];
}

interface PriceDetails {
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  currency: string;
  growth?: number;
}

interface ChartOptions {
  stacked?: boolean;
  horizontal?: boolean;
  fill?: boolean;
  showLegend?: boolean;
  animationDuration?: number;
  tension?: number;
}

interface Props {
  title: string;
  description?: string;
  data: ChartData;
  type: ChartType;
  dataType: DataType;
  permission?: string;
  pricePermission?: string;
  timeRange?: TimeRange;
  options?: ChartOptions;
}

const HomepageChart: React.FC<Props> = ({
  title,
  description,
  data,
  type,
  dataType,
  permission,
  pricePermission,
  timeRange = 'week',
  options = {},
}) => {
  const { user } = useAuthStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartType, setChartType] = useState<ChartType>(type);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullscreen]);

  if (permission && !user?.role?.[permission]?.includes('READ')) {
    return null;
  }

  const calculateGrowth = (values: number[]): number => {
    if (values.length < 2) return 0;

    const oldValue = values[0];
    const newValue = values[values.length - 1];

    if (oldValue === 0) {
      return newValue > 0 ? 100 : 0;
    }

    const growth = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    return isFinite(growth) ? growth : 0;
  };

  const showValues =
    !pricePermission || user?.role?.[pricePermission]?.includes('READ');

  // Ensure data.values is an array before processing
  const safeDataValues = Array.isArray(data.values) ? data.values : [];
  
  const priceDetails: PriceDetails = {
    totalAmount: safeDataValues.reduce((sum, val) => sum + (val || 0), 0),
    averageAmount:
      safeDataValues.length > 0
        ? safeDataValues.reduce((sum, val) => sum + (val || 0), 0) / safeDataValues.length
        : 0,
    maxAmount: safeDataValues.length > 0 ? Math.max(...safeDataValues.filter(v => v != null)) : 0,
    minAmount:
      safeDataValues.length > 0
        ? Math.min(...safeDataValues.filter((v) => v != null && v > 0))
        : 0,
    currency: '₺',
    growth: calculateGrowth(safeDataValues),
  };

  const defaultColors = [
    '#fbab7e', // primary
    '#4dabf7', // blue
    '#40c057', // green
    '#fa5252', // red
    '#15aabf', // cyan
    '#fab005', // yellow
    '#4c6ef5', // indigo
    '#cc5de8', // purple
    '#ff922b', // orange
    '#20c997', // teal
  ];

  // Ensure data is valid and arrays are properly initialized
  // Clean data to prevent Chart.js bezier curve errors
  const cleanValue = (v: any): number | null => {
    if (v === null || v === undefined) return null;
    if (typeof v === 'number' && isFinite(v)) return v;
    if (typeof v === 'string') {
      const num = parseFloat(v);
      return isFinite(num) ? num : null;
    }
    // If it's an object or other type, return null
    return null;
  };

  const safeLabels = Array.isArray(data.labels) ? data.labels : [];
  const safeValues = Array.isArray(data.values) 
    ? data.values.map(cleanValue)
    : [];
  const safeExtraData = Array.isArray(data.extraData) 
    ? data.extraData.map(cleanValue)
    : [];

  // For line charts, check if we have valid data points
  // Chart.js bezier curves require all points to be properly initialized
  const hasValidLineData = chartType === 'line' && 
    safeValues.length > 0 && 
    safeValues.every(v => v === null || (typeof v === 'number' && isFinite(v)));

  const chartData = {
    labels: safeLabels,
    datasets: [
      {
        label: title,
        data: showValues ? safeValues : safeValues.map(() => null),
        backgroundColor: data.colors || defaultColors,
        borderColor:
          chartType === 'line' ? data.colors?.[0] || '#fbab7e' : undefined,
        borderWidth: 1,
        // Disable tension (bezier curves) to prevent control point errors
        // Use 0 for straight lines or remove tension property entirely
        tension: 0, // Changed from options.tension to prevent bezier curve issues
        fill: options.fill,
        borderRadius: 4,
        hoverOffset: 10,
        pointRadius: chartType === 'line' ? 3 : undefined,
        pointHoverRadius: chartType === 'line' ? 5 : undefined,
        spanGaps: true,
      },
    ],
  };

  if (safeExtraData.length > 0 && showValues) {
    chartData.datasets.push({
      label: `${title} (Önceki Dönem)`,
      data: safeExtraData,
      backgroundColor: ['rgba(200, 200, 200, 0.5)'],
      borderColor: chartType === 'line' ? 'rgba(200, 200, 200, 1)' : undefined,
      borderWidth: 1,
      // Disable tension to prevent control point errors
      tension: 0,
      fill: options.fill,
      borderRadius: 4,
      hoverOffset: 10,
      pointRadius: chartType === 'line' ? 3 : undefined,
      pointHoverRadius: chartType === 'line' ? 5 : undefined,
      spanGaps: true,
    });
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: options.horizontal ? 'y' : ('x' as const),
    animation: {
      duration: options.animationDuration || 800,
    },
    scales: {
      x: {
        stacked: options.stacked,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        stacked: options.stacked,
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          font: {
            size: 10,
          },
          callback: function (value: any) {
            if (!showValues && dataType === 'orderSales') {
              return '***';
            }
            return (
              Number(value).toLocaleString('tr-TR') +
              (dataType === 'orderSales' ? '₺' : '')
            );
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        display:
          options.showLegend !== undefined
            ? options.showLegend
            : chartType === 'pie' ||
              chartType === 'doughnut' ||
              chartType === 'polarArea',
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 15,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            return context[0].label;
          },
          label: function (context: any) {
            if (!showValues && dataType === 'orderSales') {
              return 'Fiyat gösterimi için yetkiniz yok';
            }

            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }

            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString('tr-TR');
              if (dataType === 'orderSales') {
                label += '₺';
              }
            } else if (context.parsed !== null) {
              label += context.parsed.toLocaleString('tr-TR');
              if (dataType === 'orderSales') {
                label += '₺';
              }
            }

            return label;
          },
          footer: function (context: any) {
            if (
              chartType === 'pie' ||
              chartType === 'doughnut' ||
              chartType === 'polarArea'
            ) {
              const dataset = context[0].dataset;
              const total = dataset.data.reduce(
                (sum: number, value: number) => sum + value,
                0
              );
              const value = dataset.data[context[0].dataIndex];
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}% of total`;
            }
            return '';
          },
        },
      },
    },
  };

  const handleDownload = () => {
    const canvas = document.getElementById(
      `chart-${title.replace(/\s+/g, '-')}`
    ) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${title}-${DateTime.now().toFormat('yyyy-MM-dd')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSwitchChartType = () => {
    const types: ChartType[] = ['bar', 'line', 'pie', 'doughnut', 'polarArea'];
    const currentIndex = types.indexOf(chartType);
    const nextIndex = (currentIndex + 1) % types.length;
    setChartType(types[nextIndex]);
  };

  const getTimePeriodText = () => {
    switch (timeRange) {
      case 'day':
        return 'Bugün';
      case 'week':
        return 'Son 7 Gün';
      case 'month':
        return 'Son 30 Gün';
      case 'year':
        return 'Bu Yıl';
      default:
        return '';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col' : ''
      }`}
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          <div className="text-xs text-gray-400 mt-1">
            {getTimePeriodText()}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSwitchChartType}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            title="Grafik Tipini Değiştir"
          >
            {chartType === 'bar'
              ? 'Bar'
              : chartType === 'line'
              ? 'Line'
              : chartType === 'pie'
              ? 'Pie'
              : chartType === 'doughnut'
              ? 'Doughnut'
              : 'Polar'}
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            title="Yenile"
          >
            <FiRefreshCw
              className={`${isLoading ? 'animate-spin' : ''}`}
              size={16}
            />
          </button>
          <button
            onClick={handleDownload}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            title="İndir"
          >
            <FiDownload size={16} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            title={isFullscreen ? 'Küçült' : 'Büyüt'}
          >
            <FiMaximize2 size={16} />
          </button>
        </div>
      </div>

      {showValues && dataType === 'orderSales' && (
        <div className="grid grid-cols-4 gap-2 p-4 border-b border-gray-100">
          <div className="text-center">
            <div className="text-sm text-gray-500">Toplam</div>
            <div className="font-bold text-lg">
              {priceDetails.totalAmount.toLocaleString('tr-TR')}
              {priceDetails.currency}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Ortalama</div>
            <div className="font-bold text-lg">
              {priceDetails.averageAmount.toLocaleString('tr-TR', {
                maximumFractionDigits: 2,
              })}
              {priceDetails.currency}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">En Yüksek</div>
            <div className="font-bold text-lg">
              {priceDetails.maxAmount.toLocaleString('tr-TR')}
              {priceDetails.currency}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Büyüme</div>
            <div
              className={`font-bold text-lg ${
                priceDetails.growth !== undefined && priceDetails.growth >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {priceDetails.growth !== undefined && priceDetails.growth >= 0
                ? '+'
                : ''}
              {priceDetails.growth?.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      <div className={`p-4 ${isFullscreen ? 'flex-1' : 'h-60'}`}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          </div>
        ) : (
          <>
            {chartType === 'bar' && (
              <Bar
                id={`chart-${title.replace(/\s+/g, '-')}`}
                data={chartData}
                options={chartOptions as any}
              />
            )}
            {chartType === 'line' && (
              <Line
                id={`chart-${title.replace(/\s+/g, '-')}`}
                data={chartData}
                options={chartOptions as any}
              />
            )}
            {chartType === 'pie' && (
              <Pie
                id={`chart-${title.replace(/\s+/g, '-')}`}
                data={chartData}
                options={chartOptions as any}
              />
            )}
            {chartType === 'doughnut' && (
              <Doughnut
                id={`chart-${title.replace(/\s+/g, '-')}`}
                data={chartData}
                options={chartOptions as any}
              />
            )}
            {chartType === 'polarArea' && (
              <PolarArea
                id={`chart-${title.replace(/\s+/g, '-')}`}
                data={chartData}
                options={chartOptions as any}
              />
            )}
          </>
        )}
      </div>

      {!showValues && dataType === 'orderSales' && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-sm text-gray-500 rounded-b-lg">
          Fiyat detaylarını görebilmek için &ldquo;orderSalesPrice&ldquo;
          yetkisine sahip olmanız gerekmektedir.
        </div>
      )}
    </div>
  );
};

export default HomepageChart;
