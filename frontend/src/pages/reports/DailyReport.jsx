import React from 'react';
import { Download, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';

const mockDaily = [
  { sale_date: 'May 20', total_sales: 3, total_revenue: 45000, total_vat: 6750 },
  { sale_date: 'May 21', total_sales: 5, total_revenue: 78000, total_vat: 11700 },
  { sale_date: 'May 22', total_sales: 2, total_revenue: 31000, total_vat: 4650 },
  { sale_date: 'May 23', total_sales: 7, total_revenue: 125000, total_vat: 18750 },
  { sale_date: 'May 24', total_sales: 4, total_revenue: 67000, total_vat: 10050 },
  { sale_date: 'May 25', total_sales: 6, total_revenue: 98000, total_vat: 14700 },
  { sale_date: 'May 26', total_sales: 9, total_revenue: 156000, total_vat: 23400 },
];

const DailyReport = () => {
  const totalRevenue = mockDaily.reduce((s, d) => s + d.total_revenue, 0);
  const totalSales = mockDaily.reduce((s, d) => s + d.total_sales, 0);
  const totalVat = mockDaily.reduce((s, d) => s + d.total_vat, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Daily Sales Report</h1>
          <p className="text-sm text-textMuted mt-1">Last 7 days transaction summary</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /><span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-secondary' },
          { label: 'Total Sales', value: `${totalSales} transactions`, color: 'text-primary' },
          { label: 'Total VAT Collected', value: formatCurrency(totalVat), color: 'text-warning' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-textMuted mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold text-textMain mb-6">Revenue Trend (Last 7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDaily} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2D3A" />
              <XAxis dataKey="sale_date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={v => `${v / 1000}K`} />
              <Tooltip contentStyle={{ backgroundColor: '#151720', borderColor: '#2A2D3A', color: '#F3F4F6' }} />
              <Area type="monotone" dataKey="total_revenue" name="Revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-center">Transactions</th>
                <th className="px-6 py-4 font-medium text-right">Revenue</th>
                <th className="px-6 py-4 font-medium text-right">VAT Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockDaily.map((row, i) => (
                <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-textMain">{row.sale_date}</td>
                  <td className="px-6 py-4 text-center text-textMuted">{row.total_sales}</td>
                  <td className="px-6 py-4 text-right text-secondary font-semibold">{formatCurrency(row.total_revenue)}</td>
                  <td className="px-6 py-4 text-right text-textMuted">{formatCurrency(row.total_vat)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
