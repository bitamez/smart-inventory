import React from 'react';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const mockMonthly = [
  { month: 'Jan 2025', total_sales: 42, total_revenue: 680000, total_vat: 102000 },
  { month: 'Feb 2025', total_sales: 38, total_revenue: 540000, total_vat: 81000 },
  { month: 'Mar 2025', total_sales: 61, total_revenue: 920000, total_vat: 138000 },
  { month: 'Apr 2025', total_sales: 55, total_revenue: 810000, total_vat: 121500 },
  { month: 'May 2025', total_sales: 74, total_revenue: 1250000, total_vat: 187500 },
];

const MonthlyReport = () => {
  const totalRevenue = mockMonthly.reduce((s, m) => s + m.total_revenue, 0);
  const totalSales = mockMonthly.reduce((s, m) => s + m.total_sales, 0);
  const avgMonthly = totalRevenue / mockMonthly.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Monthly Revenue Summary</h1>
          <p className="text-sm text-textMuted mt-1">Year-to-date aggregated revenue and sales statistics</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /><span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'YTD Total Revenue', value: formatCurrency(totalRevenue), color: 'text-secondary' },
          { label: 'YTD Total Sales', value: `${totalSales} transactions`, color: 'text-primary' },
          { label: 'Avg Monthly Revenue', value: formatCurrency(avgMonthly), color: 'text-warning' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-textMuted mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold text-textMain mb-6">Monthly Revenue (2025)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMonthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2D3A" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={v => `${v / 1000}K`} />
              <Tooltip contentStyle={{ backgroundColor: '#151720', borderColor: '#2A2D3A', color: '#F3F4F6' }} formatter={v => formatCurrency(v)} />
              <Bar dataKey="total_revenue" name="Revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium text-center">Transactions</th>
                <th className="px-6 py-4 font-medium text-right">Total Revenue</th>
                <th className="px-6 py-4 font-medium text-right">VAT Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockMonthly.map((row, i) => (
                <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-textMain">{row.month}</td>
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

export default MonthlyReport;
