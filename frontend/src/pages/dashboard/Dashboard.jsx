import React from 'react';
import { DollarSign, TrendingUp, PackageSearch, AlertCircle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

const salesData = [
  { name: 'May 1', sales: 60000 },
  { name: 'May 6', sales: 150000 },
  { name: 'May 11', sales: 100000 },
  { name: 'May 16', sales: 300000 },
  { name: 'May 21', sales: 200000 },
  { name: 'May 26', sales: 350000 },
  { name: 'May 31', sales: 250000 },
];

const recentSales = [
  { invoice: 'INV-2025-0008', customer: 'Mesfin Tadesse', date: 'May 26, 2025', amount: '12,500.00 Birr', status: 'Completed' },
  { invoice: 'INV-2025-0007', customer: 'Betelhem Assefa', date: 'May 26, 2025', amount: '67,800.00 Birr', status: 'Pending Approval' },
  { invoice: 'INV-2025-0006', customer: 'Addis Construction', date: 'May 25, 2025', amount: '32,400.00 Birr', status: 'Completed' },
  { invoice: 'INV-2025-0005', customer: 'Getu Abebe', date: 'May 25, 2025', amount: '15,200.00 Birr', status: 'Completed' },
  { invoice: 'INV-2025-0004', customer: 'Hirut Mekonnen', date: 'May 24, 2025', amount: '78,900.00 Birr', status: 'Pending Approval' },
];

const lowStock = [
  { product: 'Cement 50kg', sku: 'CEM-50', stock: 3, min: 10, status: 'Low' },
  { product: 'Steel Rebar 12mm', sku: 'STL-12', stock: 5, min: 15, status: 'Low' },
  { product: 'Nails 2 inch', sku: 'NAL-02', stock: 8, min: 20, status: 'Low' },
  { product: 'Paint 20L', sku: 'PNT-20', stock: 4, min: 10, status: 'Low' },
  { product: 'PVC Pipe 4 inch', sku: 'PVC-04', stock: 6, min: 15, status: 'Low' },
];

const recentApprovals = [
  { invoice: 'INV-2025-0007', requestedBy: 'Abebe Ketema', amount: '67,800.00 Birr', date: 'May 26, 2025' },
  { invoice: 'INV-2025-0004', requestedBy: 'Abebe Ketema', amount: '78,900.00 Birr', date: 'May 24, 2025' },
];

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, highlightClass }) => (
  <div className="bg-surface p-6 rounded-2xl border border-border flex items-center justify-between hover:border-surfaceHighlight transition-colors">
    <div>
      <p className="text-textMuted text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-textMain">{value}</h3>
      <p className={clsx("text-xs mt-2", highlightClass)}>{subtext}</p>
    </div>
    <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", colorClass)}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales (Today)" 
          value="45,250 Birr" 
          subtext="+12.5% from yesterday"
          icon={DollarSign}
          colorClass="bg-blue-500/10 text-blue-500"
          highlightClass="text-secondary"
        />
        <StatCard 
          title="Total Sales (This Month)" 
          value="1,250,000 Birr" 
          subtext="+18.7% from last month"
          icon={TrendingUp}
          colorClass="bg-secondary/10 text-secondary"
          highlightClass="text-secondary"
        />
        <StatCard 
          title="Low Stock Items" 
          value="8 Items" 
          subtext="Need attention"
          icon={PackageSearch}
          colorClass="bg-warning/10 text-warning"
          highlightClass="text-warning"
        />
        <StatCard 
          title="Pending Approvals" 
          value="2 Transactions" 
          subtext="Requires your action"
          icon={AlertCircle}
          colorClass="bg-primary/10 text-primary"
          highlightClass="text-danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales Table */}
        <div className="bg-surface border border-border rounded-2xl lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold text-textMain">Recent Sales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-textMuted bg-surfaceHighlight/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Invoice #</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Total Amount</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentSales.map((sale, i) => (
                  <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                    <td className="px-6 py-4 text-textMain">{sale.invoice}</td>
                    <td className="px-6 py-4 text-textMain">{sale.customer}</td>
                    <td className="px-6 py-4 text-textMuted">{sale.date}</td>
                    <td className="px-6 py-4 text-textMain font-medium text-right">{sale.amount}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={clsx(
                        "px-2.5 py-1 text-xs font-medium rounded-full border",
                        sale.status === 'Completed' ? "text-secondary border-secondary/20 bg-secondary/10" : "text-warning border-warning/20 bg-warning/10"
                      )}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border mt-auto">
            <button className="text-sm text-textMuted hover:text-primary transition-colors flex items-center space-x-1">
              <span>View all sales</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold text-textMain">Low Stock Alert</h3>
            <button className="text-xs text-textMuted hover:text-textMain">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-textMuted bg-surfaceHighlight/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">SKU</th>
                  <th className="px-6 py-4 font-medium text-center">Stock</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {lowStock.map((item, i) => (
                  <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                    <td className="px-6 py-4 text-textMain">{item.product}</td>
                    <td className="px-6 py-4 text-textMuted">{item.sku}</td>
                    <td className="px-6 py-4 text-textMain font-medium text-center">
                      <span className="text-danger">{item.stock}</span> <span className="text-textMuted text-xs">/ {item.min}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 text-xs font-medium rounded border text-danger border-danger/20 bg-danger/10">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview Chart */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-textMain mb-6 flex items-center space-x-2">
            <span>Sales Overview</span>
            <span className="text-sm font-normal text-textMuted">(This Month)</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F3F4F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F3F4F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2D3A" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(val) => `${val/1000}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151720', borderColor: '#2A2D3A', color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#F3F4F6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Approvals */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold text-textMain">Recent Approvals</h3>
            <button className="text-xs text-textMuted hover:text-textMain">View all</button>
          </div>
          <div className="overflow-x-auto flex-1 p-4">
            <div className="space-y-4">
              {recentApprovals.map((approval, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 hover:border-surfaceHighlight transition-colors">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-sm font-medium text-textMain">{approval.invoice}</span>
                      <span className="text-xs text-textMuted">{approval.date}</span>
                    </div>
                    <p className="text-xs text-textMuted">Requested by: <span className="text-textMain">{approval.requestedBy}</span></p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-semibold text-textMain">{approval.amount}</span>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-secondary hover:bg-secondary/10 rounded-full transition-colors border border-secondary/30 bg-secondary/5">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="p-1.5 text-danger hover:bg-danger/10 rounded-full transition-colors border border-danger/30 bg-danger/5">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
