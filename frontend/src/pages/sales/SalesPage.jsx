import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Eye, Download } from 'lucide-react';
import clsx from 'clsx';

const mockSales = [
  { id: 1, invoice: 'INV-2025-0008', customer: 'Mesfin Tadesse', date: 'May 26, 2025', items: 3, total: '12,500.00 Birr', status: 'Completed' },
  { id: 2, invoice: 'INV-2025-0007', customer: 'Betelhem Assefa', date: 'May 26, 2025', items: 12, total: '67,800.00 Birr', status: 'Pending Approval' },
  { id: 3, invoice: 'INV-2025-0006', customer: 'Addis Construction', date: 'May 25, 2025', items: 5, total: '32,400.00 Birr', status: 'Completed' },
  { id: 4, invoice: 'INV-2025-0005', customer: 'Getu Abebe', date: 'May 25, 2025', items: 2, total: '15,200.00 Birr', status: 'Completed' },
  { id: 5, invoice: 'INV-2025-0004', customer: 'Hirut Mekonnen', date: 'May 24, 2025', items: 8, total: '78,900.00 Birr', status: 'Pending Approval' },
  { id: 6, invoice: 'INV-2025-0003', customer: 'Dawit Alemu', date: 'May 23, 2025', items: 1, total: '4,500.00 Birr', status: 'Rejected' },
  { id: 7, invoice: 'INV-2025-0002', customer: 'Selamawit Yilma', date: 'May 22, 2025', items: 4, total: '18,300.00 Birr', status: 'Completed' },
];

const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = mockSales.filter(sale => 
    sale.invoice.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Sales Transactions</h1>
          <p className="text-sm text-textMuted mt-1">Manage and track your sales invoices</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>New Sale</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search by invoice or customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg text-sm text-textMain hover:bg-surfaceHighlight transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg text-sm text-textMain hover:bg-surfaceHighlight transition-colors w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice Number</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-center">Items</th>
                <th className="px-6 py-4 font-medium text-right">Total Amount</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-textMain">{sale.invoice}</td>
                  <td className="px-6 py-4 text-textMain">{sale.customer}</td>
                  <td className="px-6 py-4 text-textMuted">{sale.date}</td>
                  <td className="px-6 py-4 text-center text-textMuted">{sale.items}</td>
                  <td className="px-6 py-4 text-textMain font-medium text-right">{sale.total}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-medium rounded-full border",
                      sale.status === 'Completed' && "text-secondary border-secondary/20 bg-secondary/10",
                      sale.status === 'Pending Approval' && "text-warning border-warning/20 bg-warning/10",
                      sale.status === 'Rejected' && "text-danger border-danger/20 bg-danger/10"
                    )}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-textMuted hover:text-primary hover:bg-primary/10 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded transition-colors" title="More Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-textMuted">
                    No sales records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border mt-auto flex items-center justify-between text-sm text-textMuted bg-background/50">
          <p>Showing 1 to {filteredSales.length} of {mockSales.length} entries</p>
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

export default SalesPage;
