export interface MetricData {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  icon: string;
  sparkline: { x: number; y: number }[];
  color: string;
}

export interface ChartDataItem {
  name: string;
  Revenue: number;
  Users: number;
  Orders: number;
  Expenses: number;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  avatar: string;
  amount: number;
  status: 'Thành công' | 'Chờ xử lý' | 'Đã hủy';
  date: string;
  category: string;
}

export interface Task {
  id: string;
  title: string;
  progress: number;
  assignee: string;
  priority: 'Cao' | 'Trung bình' | 'Thấp';
  status: 'Hoàn thành' | 'Đang làm' | 'Tạm dừng';
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
  percentage: string;
}
