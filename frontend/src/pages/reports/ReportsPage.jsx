import React from 'react';
import { BarChart3, TrendingUp, PackageSearch, Download, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlySales = [
  { name: 'Jan', sales: 400000 },
  { name: 'Feb', sales: 300000 },
  { name: 'Mar', sales: 550000 },
  { name: 'Apr', sales: 450000 },
  { name: 'May', sales: 1250000 },
];

const topProducts = [
  { name: 'Cement 50kg', value: 850000 },
  { name: 'Steel Rebar', value: 650000 },
  { name: 'Paint 20L', value: 320000 },
  { name: 'Window Glass', value: 250000 },
];

const ReportCard = ({ title, icon: Icon, description }) => (
  <div className="bg-surface border border-border rounded-2xl p-6 hover:border-surfaceHighlight transition-colors cursor-pointer group flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-textMain group-hover:text-primary transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <button className="text-textMuted hover:text-textMain p-2 hover:bg-surfaceHighlight rounded-lg transition-colors">
        <Download className="w-5 h-5" />
      </button>
    </div>
    <h3 className="text-lg font-semibold text-textMain mb-2">{title}</h3>
    <p className="text-sm text-textMuted mb-6 flex-1">{description}</p>
    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center">
      Generate Report &rarr;
    </button>
  </div>
);

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Analytics & Reports</h1>
          <p className="text-sm text-textMuted mt-1">Monitor system performance and download statistical reports</p>
        </div>
        <div className="flex items-center bg-surface border border-border rounded-lg p-1 text-sm">
          <button className="px-3 py-1.5 bg-surfaceHighlight text-textMain rounded-md font-medium">This Month</button>
          <button className="px-3 py-1.5 text-textMuted hover:text-textMain rounded-md">Last 3 Months</button>
          <button className="px-3 py-1.5 text-textMuted hover:text-textMain rounded-md">This Year</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard 
          title="Daily Sales Report" 
          description="Detailed breakdown of all completed sales transactions grouped by day."
          icon={Calendar} 
        />
        <ReportCard 
          title="Monthly Revenue Summary" 
          description="Aggregated total sales, discounts, and VAT collected on a monthly basis."
          icon={TrendingUp} 
        />
        <ReportCard 
          title="Current Stock Status" 
          description="Real-time snapshot of current inventory levels, highlighting low-stock items."
          icon={PackageSearch} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-textMain mb-6">Revenue Growth (2025)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2D3A" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(val) => `${val/1000}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151720', borderColor: '#2A2D3A', color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-textMain mb-6">Top Performing Products</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#2A2D3A" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(val) => `${val/1000}K`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#F3F4F6', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151720', borderColor: '#2A2D3A', color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                  cursor={{ fill: '#1E212B' }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
