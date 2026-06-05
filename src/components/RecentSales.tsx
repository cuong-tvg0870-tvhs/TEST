import { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, RefreshCw, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../types';

interface RecentSalesProps {
  transactions: Transaction[];
}

export default function RecentSales({ transactions }: RecentSalesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Thành công' | 'Chờ xử lý' | 'Đã hủy'>('All');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Thành công':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Thành công
          </span>
        );
      case 'Chờ xử lý':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Chờ xử lý
          </span>
        );
      case 'Đã hủy':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div id="recent-sales-panel" className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 font-display">Giao dịch gần đây</h3>
          <p className="text-xs text-neutral-500 mt-1">Lịch sử thanh toán & hoá đơn phát sinh trực tuyến</p>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-1.5 self-start">
          {(['All', 'Thành công', 'Chờ xử lý', 'Đã hủy'] as const).map((filter) => (
            <button
              key={filter}
              id={`tx-filter-${filter}`}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === filter
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {filter === 'All' ? 'Tất cả' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          id="tx-search-input"
          type="text"
          placeholder="Tìm tên khách hàng, email hoặc ID giao dịch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-neutral-800 rounded-xl transition-all outline-none"
        />
      </div>

      {/* Table & List display */}
      <div className="overflow-x-auto flex-1 h-[280px] min-h-[220px] overflow-y-auto pr-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider pb-3">
              <th className="font-semibold py-3 pl-1">Khách hàng</th>
              <th className="font-semibold py-3 hidden md:table-cell">Danh mục</th>
              <th className="font-semibold py-3 text-right">Giá trị</th>
              <th className="font-semibold py-3 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            <AnimatePresence initial={false}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    id={`tx-row-${tx.id}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="group hover:bg-neutral-50/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="py-2.5 pl-1 flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200">
                        <img
                          src={tx.avatar}
                          alt={tx.customerName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800 group-hover:text-black transition-colors">
                          {tx.customerName}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{tx.customerEmail}</div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 text-xs text-neutral-500 hidden md:table-cell">
                      <div>
                        <span className="font-medium text-neutral-600">{tx.category}</span>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{tx.date}</div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-2.5 text-right font-bold text-xs font-mono text-neutral-900">
                      ${tx.amount.toLocaleString()}
                    </td>

                    {/* Status badge */}
                    <td className="py-2.5 text-right">
                      {getStatusBadge(tx.status)}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <p className="text-sm text-neutral-400">Không tìm thấy giao dịch nào phù hợp.</p>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
