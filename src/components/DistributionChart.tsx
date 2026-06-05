import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrafficSource } from '../types';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';

interface DistributionChartProps {
  sources: TrafficSource[];
}

export default function DistributionChart({ sources }: DistributionChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Custom tooltip for Pie Chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-neutral-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xl">
          {payload[0].name}: <span className="font-mono text-emerald-400">{payload[0].value}%</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="distribution-chart-panel" className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">Nguồn lưu lượng</h3>
            <p className="text-xs text-neutral-500 mt-1">Phân bổ kênh chuyển đổi dữ liệu khách hàng</p>
          </div>
          <button className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <Info className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Chart Arena */}
        <div className="h-[180px] w-full relative flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={sources}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {sources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={index === activeIndex ? 3 : 1}
                    className="transition-all duration-300 outline-none"
                    style={{
                      filter: index === activeIndex ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))' : 'none',
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Central Statistics overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {activeIndex !== null ? (
              <>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {sources[activeIndex].name.split(' ')[0]}
                </span>
                <span className="text-2xl font-bold text-neutral-900 font-display">
                  {sources[activeIndex].percentage}
                </span>
              </>
            ) : (
              <>
                <span className="text-2xs font-semibold text-neutral-400 uppercase tracking-widest leading-none">TỔNG</span>
                <span className="text-3xl font-extrabold text-neutral-900 font-display tracking-tight leading-normal">100%</span>
                <span className="text-3xs text-emerald-500 font-bold flex items-center gap-0.5 mt-[-2px] leading-none">
                  <TrendingUp className="w-2.5 h-2.5" /> +14%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legend list display */}
      <div className="space-y-2 mt-2">
        {sources.map((item, index) => (
          <div
            key={item.name}
            id={`source-item-${index}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between p-2 rounded-xl transition-all ${
              activeIndex === index ? 'bg-neutral-50 shadow-xs' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full block" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold text-neutral-600">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-neutral-900">{item.percentage}</span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline-block">({item.value}k view)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
