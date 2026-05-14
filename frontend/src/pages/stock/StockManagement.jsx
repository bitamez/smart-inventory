import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import clsx from 'clsx';

const mockTransactions = [
  { id: 1, product: 'Cement 50kg', sku: 'CEM-50', type: 'stock_in', quantity: 150, user: 'Abebe Ketema', date: 'May 26, 2025', note: 'Restock from supplier' },
  { id: 2, product: 'Steel Rebar 12mm', sku: 'STL-12', type: 'stock_out', quantity: 20, user: 'System', date: 'May 26, 2025', note: 'Sale Transaction (INV-2025-0008)' },
  { id: 3, product: 'Paint 20L', sku: 'PNT-20', type: 'adjustment', quantity: -2, user: 'Mesfin Tadesse', date: 'May 25, 2025', note: 'Damaged goods removed' },
  { id: 4, product: 'PVC Pipe 4 inch', sku: 'PVC-04', type: 'stock_out', quantity: 50, user: 'System', date: 'May 25, 2025', note: 'Sale Transaction (INV-2025-0006)' },
  { id: 5, product: 'Nails 2 inch', sku: 'NAL-02', type: 'stock_in', quantity: 500, user: 'Abebe Ketema', date: 'May 24, 2025', note: 'New shipment arrived' },
];

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(t => 
    t.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Stock Transactions</h1>
          <p className="text-sm text-textMuted mt-1">Track inbound and outbound inventory movements</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>Record Stock</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search by product or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg text-sm text-textMain hover:bg-surfaceHighlight transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            <span>Filter Type</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product & SKU</th>
                <th className="px-6 py-4 font-medium text-center">Type</th>
                <th className="px-6 py-4 font-medium text-center">Quantity</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Performed By</th>
                <th className="px-6 py-4 font-medium">Reference Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-textMain">{tx.product}</p>
                      <p className="text-xs text-textMuted mt-0.5">{tx.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-medium rounded border inline-flex items-center space-x-1",
                      tx.type === 'stock_in' && "text-secondary border-secondary/20 bg-secondary/10",
                      tx.type === 'stock_out' && "text-primary border-primary/20 bg-primary/10",
                      tx.type === 'adjustment' && "text-warning border-warning/20 bg-warning/10"
                    )}>
                      {tx.type === 'stock_in' && <ArrowDownCircle className="w-3 h-3" />}
                      {tx.type === 'stock_out' && <ArrowUpCircle className="w-3 h-3" />}
                      <span className="capitalize">{tx.type.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "font-semibold",
                      tx.type === 'stock_in' ? "text-secondary" : tx.type === 'stock_out' ? "text-primary" : "text-warning"
                    )}>
                      {tx.type === 'stock_in' ? '+' : ''}{tx.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-textMuted">{tx.date}</td>
                  <td className="px-6 py-4 text-textMain">{tx.user}</td>
                  <td className="px-6 py-4 text-textMuted">{tx.note}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-textMuted">
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border mt-auto flex items-center justify-between text-sm text-textMuted bg-background/50">
          <p>Showing 1 to {filteredTransactions.length} of {mockTransactions.length} entries</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-border rounded hover:bg-surfaceHighlight disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-primary bg-primary/10 text-primary rounded">1</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-surfaceHighlight disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
