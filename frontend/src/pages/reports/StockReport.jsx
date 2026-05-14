import React, { useState } from 'react';
import { Download, Search, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import clsx from 'clsx';

const mockStock = [
  { product_name: 'PVC Pipe 4 inch', sku: 'PVC-04', stock_quantity: 3, minimum_stock: 20, unit_price: 450, category: 'Plumbing' },
  { product_name: 'Window Glass 4mm', sku: 'WDG-04', stock_quantity: 5, minimum_stock: 15, unit_price: 890, category: 'Glass' },
  { product_name: 'Paint 20L White', sku: 'PNT-20', stock_quantity: 8, minimum_stock: 10, unit_price: 1200, category: 'Paint' },
  { product_name: 'Cement 50kg', sku: 'CEM-50', stock_quantity: 150, minimum_stock: 50, unit_price: 650, category: 'Building' },
  { product_name: 'Steel Rebar 12mm', sku: 'STL-12', stock_quantity: 90, minimum_stock: 30, unit_price: 1200, category: 'Steel' },
  { product_name: 'Nails 2 inch', sku: 'NAL-02', stock_quantity: 1200, minimum_stock: 200, unit_price: 45, category: 'Hardware' },
  { product_name: 'Ceramic Tiles 30x30', sku: 'TLE-30', stock_quantity: 12, minimum_stock: 25, unit_price: 320, category: 'Tiles' },
];

const StockReport = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockStock.filter(p => {
    const matchSearch = p.product_name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'low' && p.stock_quantity <= p.minimum_stock) || (filter === 'ok' && p.stock_quantity > p.minimum_stock);
    return matchSearch && matchFilter;
  });

  const totalValue = mockStock.reduce((s, p) => s + p.stock_quantity * p.unit_price, 0);
  const lowStockCount = mockStock.filter(p => p.stock_quantity <= p.minimum_stock).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Stock Level Report</h1>
          <p className="text-sm text-textMuted mt-1">Current inventory status and valuation</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /><span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: mockStock.length, color: 'text-primary' },
          { label: 'Low Stock Items', value: `${lowStockCount} items`, color: 'text-warning' },
          { label: 'Total Stock Value', value: formatCurrency(totalValue), color: 'text-secondary' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-sm text-textMuted mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input type="text" placeholder="Search by product or SKU..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex bg-background rounded-lg border border-border overflow-hidden text-sm">
          {[['all', 'All'], ['low', '⚠ Low Stock'], ['ok', '✓ OK']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={clsx('px-4 py-2 font-medium transition-colors', filter === val ? 'bg-surfaceHighlight text-textMain' : 'text-textMuted hover:text-textMain')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product / SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-center">Current Stock</th>
                <th className="px-6 py-4 font-medium text-center">Min. Level</th>
                <th className="px-6 py-4 font-medium text-right">Unit Price</th>
                <th className="px-6 py-4 font-medium text-right">Stock Value</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((p, i) => {
                const isLow = p.stock_quantity <= p.minimum_stock;
                return (
                  <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-textMain">{p.product_name}</p>
                      <p className="text-xs text-textMuted">{p.sku}</p>
                    </td>
                    <td className="px-6 py-4 text-textMuted">{p.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={clsx('font-bold text-base', isLow ? 'text-danger' : 'text-secondary')}>{p.stock_quantity}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-textMuted">{p.minimum_stock}</td>
                    <td className="px-6 py-4 text-right text-textMuted">{formatCurrency(p.unit_price)}</td>
                    <td className="px-6 py-4 text-right font-semibold text-textMain">{formatCurrency(p.stock_quantity * p.unit_price)}</td>
                    <td className="px-6 py-4 text-center">
                      {isLow ? (
                        <span className="flex items-center justify-center space-x-1 text-warning text-xs font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /><span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="text-secondary text-xs font-medium">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="px-6 py-12 text-center text-textMuted">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockReport;
