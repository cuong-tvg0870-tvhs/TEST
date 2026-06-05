import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { ChartDataItem } from '../types';

interface MainChartProps {
  data: ChartDataItem[];
  activeMetric: 'Revenue' | 'Users' | 'Orders';
  activeMetricColor: string;
}

type ChartType = 'area' | 'line' | 'bar';

const metricLabels: Record<string, { label: string; unit: string }> = {
  Revenue: { label: 'Doanh thu ($)', unit: '$' },
  Users: { label: 'Người dùng', unit: '' },
  Orders: { label: 'Đơn hàng', unit: '' },
};

export default function MainChart({ data, activeMetric, activeMetricColor }: MainChartProps) {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [secondaryMetric, setSecondaryMetric] = useState<'Expenses' | 'none'>('Expenses');

  const { label, unit } = metricLabels[activeMetric];

  // Helper custom tooltip
  const CustomTooltip = ({ active, payload, label: xLabel }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-neutral-800 text-white p-3.5 rounded-xl shadow-2xl space-y-1.5 backdrop-blur-md">
          <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">{xLabel}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-3 justify-between">
                <span className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: entry.color || entry.stroke }}
                  />
                  <span className="text-neutral-300 font-medium">
                    {entry.name === 'Revenue' ? 'Doanh thu' : entry.name === 'Users' ? 'Người dùng' : entry.name === 'Orders' ? 'Đơn hàng' : 'Chi phí'}
                  </span>
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {entry.name === 'Revenue' || entry.name === 'Expenses' ? `${unit}${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="main-analytics-chart" className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
            Xu hướng phân tích hệ thống
            <span className="text-xs font-normal py-0.5 px-2 bg-neutral-100 text-neutral-600 rounded-md">
              Mục tiêu chính: {metricLabels[activeMetric].label}
            </span>
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Trực quan hoá dữ liệu hoạt động, hành vi khách hàng và ngân sách chi phí phát sinh.
          </p>
        </div>

        {/* Chart Configuration controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Secondary Metric toggle */}
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setSecondaryMetric('none')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                secondaryMetric === 'none'
                  ? 'bg-white text-neutral-800 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Đơn mục
            </button>
            <button
              id="chart-toggle-expenses"
              onClick={() => setSecondaryMetric('Expenses')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                secondaryMetric === 'Expenses'
                  ? 'bg-white text-neutral-800 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              + So sánh chi phí
            </button>
          </div>

          {/* Chart visual style toggle */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-lg text-xs">
            {(['area', 'line', 'bar'] as ChartType[]).map((type) => (
              <button
                key={type}
                id={`chart-type-btn-${type}`}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 rounded-md font-medium transition-all capitalize ${
                  chartType === type
                    ? 'bg-white text-neutral-800 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {type === 'area' ? 'Vùng' : type === 'line' ? 'Đường' : 'Cột'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render selected Recharts Type */}
      <div className="h-[340px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetricColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={activeMetricColor} stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
                className="font-mono"
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-10}
                tickFormatter={(value) =>
                  activeMetric === 'Revenue' ? `$${value}` : value.toLocaleString()
                }
                className="font-mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                name={activeMetric}
                stroke={activeMetricColor}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMetric)"
                animationDuration={500}
              />
              {secondaryMetric === 'Expenses' && (
                <Area
                  type="monotone"
                  dataKey="Expenses"
                  name="Expenses"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  animationDuration={500}
                />
              )}
            </AreaChart>
          ) : chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
                className="font-mono"
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-10}
                tickFormatter={(value) =>
                  activeMetric === 'Revenue' ? `$${value}` : value.toLocaleString()
                }
                className="font-mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={activeMetric}
                name={activeMetric}
                stroke={activeMetricColor}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: activeMetricColor }}
                animationDuration={500}
              />
              {secondaryMetric === 'Expenses' && (
                <Line
                  type="monotone"
                  dataKey="Expenses"
                  name="Expenses"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  animationDuration={500}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
                className="font-mono"
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-10}
                tickFormatter={(value) =>
                  activeMetric === 'Revenue' ? `$${value}` : value.toLocaleString()
                }
                className="font-mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={activeMetric}
                name={activeMetric}
                fill={activeMetricColor}
                radius={[4, 4, 0, 0]}
                animationDuration={500}
              />
              {secondaryMetric === 'Expenses' && (
                <Bar
                  dataKey="Expenses"
                  name="Expenses"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                  animationDuration={500}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Interactive explanations responsive layout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md" style={{ backgroundColor: activeMetricColor }} />
            <span className="font-semibold text-neutral-700">Doanh số chỉ số: {label}</span>
          </div>
          {secondaryMetric === 'Expenses' && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500" />
              <span className="font-semibold text-neutral-700">Chi phí vận hành ($)</span>
            </div>
          )}
        </div>
        <p className="text-[11px] text-neutral-400 italic">
          * Đồ thị được cập nhật tự động mượt mà khi đổi nhóm dữ liệu hoặc khoảng thời gian.
        </p>
      </div>
    </div>
  );
}
