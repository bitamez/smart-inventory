import React, { useState } from 'react';
import { CheckCircle, XCircle, Search, Clock, FileText } from 'lucide-react';
import clsx from 'clsx';

const mockApprovals = [
  { id: 1, invoice: 'INV-2025-0007', requestedBy: 'Abebe Ketema', role: 'Sales Officer', amount: '67,800.00 Birr', date: 'May 26, 2025', status: 'pending', reason: 'Large transaction value' },
  { id: 2, invoice: 'INV-2025-0004', requestedBy: 'Hirut Mekonnen', role: 'Sales Officer', amount: '78,900.00 Birr', date: 'May 24, 2025', status: 'pending', reason: 'High discount applied (15%)' },
  { id: 3, invoice: 'INV-2025-0001', requestedBy: 'Dawit Alemu', role: 'Sales Officer', amount: '125,000.00 Birr', date: 'May 20, 2025', status: 'approved', reason: 'Large transaction value' },
  { id: 4, invoice: 'INV-2024-0998', requestedBy: 'Selamawit Yilma', role: 'Sales Officer', amount: '55,400.00 Birr', date: 'May 18, 2025', status: 'rejected', reason: 'Credit limit exceeded' },
];

const ApprovalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

  const filteredApprovals = mockApprovals.filter(a => {
    const matchesSearch = a.invoice.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Transaction Approvals</h1>
          <p className="text-sm text-textMuted mt-1">Review and manage pending high-value transactions</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search by invoice or requester..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex bg-background rounded-lg border border-border overflow-hidden">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button 
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                "px-4 py-2 text-sm font-medium transition-colors capitalize",
                filter === status 
                  ? "bg-surfaceHighlight text-textMain" 
                  : "text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals List */}
      <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto">
        {filteredApprovals.map((approval) => (
          <div key={approval.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center hover:border-surfaceHighlight transition-colors">
            
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-textMuted shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-textMain">{approval.invoice}</h3>
                  <span className={clsx(
                    "px-2.5 py-0.5 text-xs font-medium rounded-full border",
                    approval.status === 'pending' && "text-warning border-warning/20 bg-warning/10",
                    approval.status === 'approved' && "text-secondary border-secondary/20 bg-secondary/10",
                    approval.status === 'rejected' && "text-danger border-danger/20 bg-danger/10"
                  )}>
                    {approval.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-textMuted">
                  <span className="flex items-center gap-1.5">
                    <span className="text-textMain font-medium">{approval.requestedBy}</span> ({approval.role})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {approval.date}
                  </span>
                </div>
                <p className="text-sm mt-3 text-textMuted">Reason: <span className="text-textMain">{approval.reason}</span></p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
              <div className="text-right">
                <p className="text-xs text-textMuted mb-1">Total Amount</p>
                <p className="text-xl font-bold text-textMain">{approval.amount}</p>
              </div>
              
              {approval.status === 'pending' && (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 rounded-lg transition-colors font-medium text-sm">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 rounded-lg transition-colors font-medium text-sm">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
        
        {filteredApprovals.length === 0 && (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full">
            <CheckCircle className="w-12 h-12 text-textMuted mb-4" />
            <h3 className="text-lg font-medium text-textMain mb-1">No pending approvals</h3>
            <p className="text-textMuted">You're all caught up! There are no transactions requiring your attention right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalPage;
