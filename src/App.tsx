import { useState } from 'react';
import {
  Sparkles,
  Bell,
  Layers,
  Settings2,
  Calendar,
  Layers3,
  CircleAlert,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  FileText,
  Activity,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data & Types
import { mockMetrics, mockChartData, mockTransactions, mockTrafficSources, mockTasks, smartInsights } from './utils/mockData';
import { MetricData } from './types';

// Components
import MetricCard from './components/MetricCard';
import MainChart from './components/MainChart';
import RecentSales from './components/RecentSales';
import DistributionChart from './components/DistributionChart';
import TaskTracker from './components/TaskTracker';

export default function App() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [selectedMetricId, setSelectedMetricId] = useState<string>('revenue');

  // Fetch metrics based on timeframe
  const currentMetrics = mockMetrics[timeframe];
  const currentChartData = mockChartData[timeframe];

  // Retrieve details of the selected metric
  const selectedMetric = currentMetrics.find((m) => m.id === selectedMetricId) || currentMetrics[0];

  // Translate metric key for Recharts
  const getChartMetricKey = (id: string): 'Revenue' | 'Users' | 'Orders' => {
    switch (id) {
      case 'users':
        return 'Users';
      case 'orders':
        return 'Orders';
      default:
        return 'Revenue';
    }
  };

  const activeMetricKey = getChartMetricKey(selectedMetricId);
  const activeMetricColor = selectedMetric.color;

  // Notification Toast state (simple dynamic toggle)
  const [showNotificationToast, setShowNotificationToast] = useState(true);

  // Active user meta from context
  const userEmail = 'dqcuong19@gmail.com';
  const shortenedEmailName = userEmail.split('@')[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-800 font-sans antialiased pb-12 selection:bg-neutral-900 selection:text-white">
      {/* Dynamic Header Toast Announcement */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-indigo-900 text-indigo-100"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 text-xs font-semibold flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Hệ thống báo cáo cập nhật tự động thành công phát triển cho ngày 05/06/2026.
              </span>
              <button
                id="close-toast-btn"
                onClick={() => setShowNotificationToast(false)}
                className="hover:text-white underline cursor-pointer text-[10px]"
              >
                Đóng thông báo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 space-y-6">
        
        {/* Navigation Bar / Dashboard Branding */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-950 text-white rounded-xl shadow-md shadow-neutral-950/10">
              <Layers3 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display tracking-tight text-neutral-900">Alpha Analytics</h1>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold px-2 py-0.5 rounded-full">Pro v3.2</span>
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Báo cáo số liệu tổng hợp • Xin chào, <span className="text-indigo-600 font-bold">{shortenedEmailName}</span> ({userEmail})
              </p>
            </div>
          </div>

          {/* Quick controls & Date display */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs bg-neutral-50 px-3 py-2 border border-neutral-200 rounded-xl font-medium text-neutral-600">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span>05 tháng 06, 2026 (GMT)</span>
            </div>

            <div className="h-5 w-6 hidden md:block border-l border-neutral-200" />

            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs">
              {(['today', 'week', 'month'] as const).map((period) => (
                <button
                  key={period}
                  id={`period-btn-${period}`}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all capitalize ${
                    timeframe === period
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {period === 'today' ? 'Hôm nay' : period === 'week' ? 'Tuần này' : 'Tháng này'}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* METRIC KPI BLOCK */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-neutral-400" />
              Chỉ Số Hiệu Suất Cốt Lõi
            </h2>
            <p className="text-xs text-neutral-400 italic">
              * Bấm chọn thẻ để chuyển đổi đồ thị chi tiết bên dưới.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentMetrics.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                isSelected={selectedMetricId === metric.id}
                onClick={() => setSelectedMetricId(metric.id)}
              />
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION - CHARTS & SMART INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualizer Area (Recharts) */}
          <div className="lg:col-span-2">
            <MainChart
              data={currentChartData}
              activeMetric={activeMetricKey}
              activeMetricColor={activeMetricColor}
            />
          </div>

          {/* Smart Insights Panel */}
          <div id="smart-insights-panel" className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                  Insight thông minh
                </span>
                <span className="text-3xs text-neutral-400 font-mono">CẬP NHẬT LIVE</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-neutral-900 font-display flex items-center gap-1.5">
                  {smartInsights[timeframe].title}
                </h4>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed bg-amber-50/20 p-3 rounded-xl border border-amber-100/30">
                  {smartInsights[timeframe].description}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wide flex items-center gap-1.5">
                  <CircleAlert className="w-4 h-4 text-indigo-500" />
                  Đề xuất tối ưu hóa hành động
                </h5>
                <p className="text-xs text-neutral-500 leading-relaxed pl-5">
                  {smartInsights[timeframe].recommendation}
                </p>
              </div>
            </div>

            {/* Quick status progress and diagnostic */}
            <div className="border-t border-neutral-100 pt-4 mt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-600">Độ tin cậy thuật toán</span>
                <span className="font-mono font-bold text-emerald-500">98.4%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-emerald-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '98.4%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - TABLES & WORKFLOW PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Recent Transactions */}
          <div className="lg:col-span-1">
            <RecentSales transactions={mockTransactions} />
          </div>

          {/* Card 2: Device and channel analytics */}
          <div>
            <DistributionChart sources={mockTrafficSources} />
          </div>

          {/* Card 3: Task project tracker milestones */}
          <div>
            <TaskTracker initialTasks={mockTasks} />
          </div>

        </div>

      </div>
    </div>
  );
}
