import React from 'react';
import { DollarSign, Users, ShoppingCart, Percent, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { MetricData } from '../types';

// Map icon string name to the actual Lucide Icon Component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Users,
  ShoppingCart,
  Percent,
};

interface MetricCardProps {
  key?: any;
  metric: MetricData;
  isSelected: boolean;
  onClick: () => void;
}

export default function MetricCard({ metric, isSelected, onClick }: MetricCardProps) {
  const IconComponent = iconMap[metric.icon] || DollarSign;

  // Calculate SVG Path for Sparkline
  const width = 120;
  const height = 40;
  const points = metric.sparkline;
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  // Scale calculations
  const scaleX = (x: number) => ((x - minX) / (maxX - minX || 1)) * (width - 4) + 2;
  const scaleY = (y: number) => height - (((y - minY) / (maxY - minY || 1)) * (height - 8) + 4);

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`)
    .join(' ');

  const areaD = `${pathD} L ${scaleX(points[points.length - 1].x).toFixed(1)} ${height} L ${scaleX(points[0].x).toFixed(1)} ${height} Z`;

  return (
    <motion.div
      id={`metric-card-${metric.id}`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden ${
        isSelected
          ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl shadow-neutral-950/20'
          : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50'
      }`}
    >
      {/* Background visual detail for dark mode selection */}
      {isSelected && (
        <span className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {metric.label}
          </p>
          <h3 className="text-3xl font-bold tracking-tight font-display mt-1">
            {metric.value}
          </h3>
        </div>
        <div
          className={`p-2.5 rounded-xl ${
            isSelected
              ? 'bg-white/10 text-white'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            {metric.isPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-500" />
            )}
            <span
              className={`text-xs font-bold font-mono ${
                metric.isPositive
                  ? 'text-emerald-500'
                  : 'text-rose-500'
              }`}
            >
              {metric.change}
            </span>
          </div>
          <span className={`text-[11px] block ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
            {metric.timeframe}
          </span>
        </div>

        {/* Beautiful high performance SVG Sparkline with stroke and area gradient */}
        <div className="w-[120px] h-[40px] pointer-events-none relative">
          <svg width={width} height={height} className="overflow-visible">
            <defs>
              <linearGradient id={`grad-${metric.id}`} x1="0" y1="y1" x2="0" y2="1">
                <stop offset="0%" stopColor={metric.color} stopOpacity={isSelected ? 0.4 : 0.25} />
                <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path d={areaD} fill={`url(#grad-${metric.id})`} />
            {/* Sparkline stroke */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={isSelected ? '#ffffff' : metric.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
