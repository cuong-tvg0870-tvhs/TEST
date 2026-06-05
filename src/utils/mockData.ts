import { MetricData, ChartDataItem, Transaction, Task, TrafficSource } from '../types';

export const mockMetrics: Record<'today' | 'week' | 'month', MetricData[]> = {
  today: [
    {
      id: 'revenue',
      label: 'Doanh thu hôm nay',
      value: '$4,280',
      change: '+12.4%',
      isPositive: true,
      timeframe: 'so với hôm qua',
      icon: 'DollarSign',
      sparkline: [
        { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 180 }, { x: 4, y: 140 },
        { x: 5, y: 210 }, { x: 6, y: 250 }, { x: 7, y: 320 }, { x: 8, y: 428 }
      ],
      color: '#4f46e5' // Indigo
    },
    {
      id: 'users',
      label: 'Người dùng trực tuyến',
      value: '1,420',
      change: '+8.2%',
      isPositive: true,
      timeframe: 'so với giờ trước',
      icon: 'Users',
      sparkline: [
        { x: 1, y: 80 }, { x: 2, y: 95 }, { x: 3, y: 110 }, { x: 4, y: 105 },
        { x: 5, y: 120 }, { x: 6, y: 135 }, { x: 7, y: 140 }, { x: 8, y: 142 }
      ],
      color: '#10b981' // Emerald
    },
    {
      id: 'orders',
      label: 'Đơn hàng mới',
      value: '312',
      change: '+15.1%',
      isPositive: true,
      timeframe: 'so với ngày trước',
      icon: 'ShoppingCart',
      sparkline: [
        { x: 1, y: 15 }, { x: 2, y: 22 }, { x: 3, y: 18 }, { x: 4, y: 25 },
        { x: 5, y: 21 }, { x: 6, y: 30 }, { x: 7, y: 29 }, { x: 8, y: 31 }
      ],
      color: '#3b82f6' // Blue
    },
    {
      id: 'conversion',
      label: 'Tỉ lệ chuyển đổi',
      value: '3.12%',
      change: '-0.4%',
      isPositive: false,
      timeframe: 'so với tuần trước',
      icon: 'Percent',
      sparkline: [
        { x: 1, y: 3.5 }, { x: 2, y: 3.4 }, { x: 3, y: 3.3 }, { x: 4, y: 3.2 },
        { x: 5, y: 3.3 }, { x: 6, y: 3.1 }, { x: 7, y: 3.15 }, { x: 8, y: 3.12 }
      ],
      color: '#f59e0b' // Amber
    }
  ],
  week: [
    {
      id: 'revenue',
      label: 'Doanh thu tuần này',
      value: '$28,450',
      change: '+8.7%',
      isPositive: true,
      timeframe: 'so với tuần trước',
      icon: 'DollarSign',
      sparkline: [
        { x: 1, y: 2100 }, { x: 2, y: 2300 }, { x: 3, y: 2450 }, { x: 4, y: 2200 },
        { x: 5, y: 2600 }, { x: 6, y: 2750 }, { x: 7, y: 2845 }
      ],
      color: '#4f46e5'
    },
    {
      id: 'users',
      label: 'Khách hàng mới',
      value: '8,430',
      change: '+14.3%',
      isPositive: true,
      timeframe: 'so với tuần trước',
      icon: 'Users',
      sparkline: [
        { x: 1, y: 650 }, { x: 2, y: 690 }, { x: 3, y: 720 }, { x: 4, y: 710 },
        { x: 5, y: 780 }, { x: 6, y: 810 }, { x: 7, y: 843 }
      ],
      color: '#10b981'
    },
    {
      id: 'orders',
      label: 'Đơn hàng đã ký',
      value: '2,140',
      change: '+6.2%',
      isPositive: true,
      timeframe: 'so với tuần trước',
      icon: 'ShoppingCart',
      sparkline: [
        { x: 1, y: 180 }, { x: 2, y: 195 }, { x: 3, y: 200 }, { x: 4, y: 185 },
        { x: 5, y: 210 }, { x: 6, y: 212 }, { x: 7, y: 214 }
      ],
      color: '#3b82f6'
    },
    {
      id: 'conversion',
      label: 'Tỷ lệ chuyển đổi',
      value: '2.84%',
      change: '+1.2%',
      isPositive: true,
      timeframe: 'so với tuần trước',
      icon: 'Percent',
      sparkline: [
        { x: 1, y: 2.5 }, { x: 2, y: 2.6 }, { x: 3, y: 2.7 }, { x: 4, y: 2.65 },
        { x: 5, y: 2.75 }, { x: 6, y: 2.8 }, { x: 7, y: 2.84 }
      ],
      color: '#f59e0b'
    }
  ],
  month: [
    {
      id: 'revenue',
      label: 'Doanh thu tháng này',
      value: '$112,400',
      change: '+15.3%',
      isPositive: true,
      timeframe: 'so với tháng trước',
      icon: 'DollarSign',
      sparkline: [
        { x: 1, y: 85 }, { x: 2, y: 92 }, { x: 3, y: 95 }, { x: 4, y: 91 },
        { x: 5, y: 104 }, { x: 6, y: 112 }
      ],
      color: '#4f46e5'
    },
    {
      id: 'users',
      label: 'Tổng người dùng',
      value: '34,260',
      change: '+18.9%',
      isPositive: true,
      timeframe: 'so với tháng trước',
      icon: 'Users',
      sparkline: [
        { x: 1, y: 25 }, { x: 2, y: 27 }, { x: 3, y: 29 }, { x: 4, y: 31 },
        { x: 5, y: 32 }, { x: 6, y: 34 }
      ],
      color: '#10b981'
    },
    {
      id: 'orders',
      label: 'Tổng sản lượng đơn',
      value: '8,920',
      change: '+11.2%',
      isPositive: true,
      timeframe: 'so với tháng trước',
      icon: 'ShoppingCart',
      sparkline: [
        { x: 1, y: 7.2 }, { x: 2, y: 7.8 }, { x: 3, y: 8.1 }, { x: 4, y: 7.9 },
        { x: 5, y: 8.5 }, { x: 6, y: 8.9 }
      ],
      color: '#3b82f6'
    },
    {
      id: 'conversion',
      label: 'Chỉ số tương tác',
      value: '4.25%',
      change: '+0.8%',
      isPositive: true,
      timeframe: 'so với tháng trước',
      icon: 'Percent',
      sparkline: [
        { x: 1, y: 3.8 }, { x: 2, y: 4.0 }, { x: 3, y: 4.1 }, { x: 4, y: 3.9 },
        { x: 5, y: 4.2 }, { x: 6, y: 4.25 }
      ],
      color: '#f59e0b'
    }
  ]
};

export const mockChartData: Record<'today' | 'week' | 'month', ChartDataItem[]> = {
  today: [
    { name: '00:00', Revenue: 210, Users: 120, Orders: 15, Expenses: 90 },
    { name: '03:00', Revenue: 340, Users: 150, Orders: 22, Expenses: 140 },
    { name: '06:00', Revenue: 512, Users: 180, Orders: 29, Expenses: 190 },
    { name: '09:00', Revenue: 820, Users: 240, Orders: 42, Expenses: 320 },
    { name: '12:00', Revenue: 1100, Users: 310, Orders: 55, Expenses: 410 },
    { name: '15:00', Revenue: 950, Users: 280, Orders: 48, Expenses: 350 },
    { name: '18:00', Revenue: 1350, Users: 350, Orders: 68, Expenses: 480 },
    { name: '21:00', Revenue: 990, Users: 290, Orders: 50, Expenses: 380 }
  ],
  week: [
    { name: 'Thứ 2', Revenue: 3200, Users: 950, Orders: 245, Expenses: 1400 },
    { name: 'Thứ 3', Revenue: 4100, Users: 1100, Orders: 310, Expenses: 1750 },
    { name: 'Thứ 4', Revenue: 3800, Users: 1050, Orders: 290, Expenses: 1600 },
    { name: 'Thứ 5', Revenue: 5200, Users: 1350, Orders: 412, Expenses: 2200 },
    { name: 'Thứ 6', Revenue: 4800, Users: 1210, Orders: 380, Expenses: 1900 },
    { name: 'Thứ 7', Revenue: 6100, Users: 1500, Orders: 490, Expenses: 2600 },
    { name: 'Chủ nhật', Revenue: 6900, Users: 1580, Orders: 520, Expenses: 2900 }
  ],
  month: [
    { name: 'Tháng 1', Revenue: 18000, Users: 4500, Orders: 1250, Expenses: 8200 },
    { name: 'Tháng 2', Revenue: 22000, Users: 5200, Orders: 1530, Expenses: 10100 },
    { name: 'Tháng 3', Revenue: 25000, Users: 5800, Orders: 1810, Expenses: 11400 },
    { name: 'Tháng 4', Revenue: 23000, Users: 5400, Orders: 1650, Expenses: 10800 },
    { name: 'Tháng 5', Revenue: 29000, Users: 6900, Orders: 2110, Expenses: 13100 },
    { name: 'Tháng 6', Revenue: 34000, Users: 7800, Orders: 2540, Expenses: 15200 },
    { name: 'Tháng 7', Revenue: 38000, Users: 8600, Orders: 2890, Expenses: 17100 },
    { name: 'Tháng 8', Revenue: 42000, Users: 9400, Orders: 3200, Expenses: 19200 },
    { name: 'Tháng 9', Revenue: 39000, Users: 8900, Orders: 3010, Expenses: 18000 },
    { name: 'Tháng 10', Revenue: 45000, Users: 10200, Orders: 3500, Expenses: 21000 },
    { name: 'Tháng 11', Revenue: 49000, Users: 11100, Orders: 3800, Expenses: 23200 },
    { name: 'Tháng 12', Revenue: 55000, Users: 12500, Orders: 4210, Expenses: 25900 }
  ]
};

export const mockTransactions: Transaction[] = [
  {
    id: 'TX1002',
    customerName: 'Nguyễn Văn Minh',
    customerEmail: 'minh.nv@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=60',
    amount: 1250,
    status: 'Thành công',
    date: '05/06/2026 10:24',
    category: 'Gói Premium'
  },
  {
    id: 'TX1003',
    customerName: 'Trần Thị Thuỷ',
    customerEmail: 'thuytran@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=60',
    amount: 320,
    status: 'Thành công',
    date: '05/06/2026 09:12',
    category: 'Nâng cấp bộ nhớ'
  },
  {
    id: 'TX1004',
    customerName: 'Lê Hoàng Hải',
    customerEmail: 'haile99@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=60',
    amount: 450,
    status: 'Chờ xử lý',
    date: '05/06/2026 08:45',
    category: 'Tư vấn Doanh nghiệp'
  },
  {
    id: 'TX1005',
    customerName: 'Phạm Minh Anh',
    customerEmail: 'minhanh.ph@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&fit=crop&q=60',
    amount: 1500,
    status: 'Thành công',
    date: '04/06/2026 18:30',
    category: 'Hợp đồng năm SaaS'
  },
  {
    id: 'TX1006',
    customerName: 'Vũ Đức Thành',
    customerEmail: 'vuthanh.dev@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=60',
    amount: 75,
    status: 'Đã hủy',
    date: '04/06/2026 15:10',
    category: 'Tài liệu API'
  }
];

export const mockTrafficSources: TrafficSource[] = [
  { name: 'Tìm kiếm tự nhiên', value: 45, color: '#4f46e5', percentage: '45%' }, // Indigo
  { name: 'Quảng cáo trả phí', value: 25, color: '#10b981', percentage: '25%' }, // Emerald
  { name: 'Mạng xã hội', value: 18, color: '#3b82f6', percentage: '18%' }, // Blue
  { name: 'Trực tiếp / Khác', value: 12, color: '#f59e0b', percentage: '12%' }  // Amber
];

export const mockTasks: Task[] = [
  { id: 'T-101', title: 'Tối ưu hoá hiệu suất bộ nhớ cache Redis', progress: 85, assignee: 'Minh Vũ', priority: 'Cao', status: 'Đang làm' },
  { id: 'T-102', title: 'Thiết kế UI cho trang xuất báo cáo PDF', progress: 100, assignee: 'Hương Lê', priority: 'Trung bình', status: 'Hoàn thành' },
  { id: 'T-103', title: 'Tích hợp cổng thanh toán mới (Apple Pay)', progress: 40, assignee: 'Cường Đỗ', priority: 'Cao', status: 'Đang làm' },
  { id: 'T-104', title: 'Cập nhật tài liệu API v2.4 cho bên thứ ba', progress: 10, assignee: 'Thảo Lâm', priority: 'Thấp', status: 'Tạm dừng' }
];

export const smartInsights = {
  today: {
    title: 'Xu thế tích cực hôm nay',
    description: 'Doanh thu hôm nay đạt bước tăng trưởng mạnh (+12.4%) nhờ doanh số kích hoạt từ Gói Premium tăng cao trong khoảng 15h00 - 18h00. Tỷ lệ chuyển đổi giữ vững ổn định mức 3.12%.',
    recommendation: 'Không cần can thiệp hệ thống quảng cáo hiện tại. Nên lên lịch bảo trì cơ sở dữ liệu sau 22:00 để duy trì chất lượng đường truyền nhanh.'
  },
  week: {
    title: 'Báo cáo hiệu suất Tuần',
    description: 'Báo cáo hàng tuần cho thấy doanh số tích lũy tăng trưởng xuất sắc (+8.7%). Phân mục Tìm Kiếm Tự Nhiên giữ vị thế dẫn đầu nguồn truy cập với lượng mua hàng áp đảo.',
    recommendation: 'Chiến dịch chạy quảng cáo giảm giá cuối tuần đã phát huy tác dụng. Bạn nên tối ưu thêm từ khóa tìm kiếm (SEO) để giảm bớt chi phí trả phí.'
  },
  month: {
    title: 'Phân tích tổng thể Tháng',
    description: 'Doanh thu tháng này đạt con số kỷ lục $112.400 (+15.3%). Tệp người dùng cốt lõi tăng 18.9% khẳng định tính hữu ích của các tính năng mới công bố.',
    recommendation: 'Nhân rộng các hội thảo trực tuyến (webinar) đào tạo khách hàng hiện có để gia tăng tỷ lệ tái ký và nâng cấp tài khoản.'
  }
};
