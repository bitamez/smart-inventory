import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import companyLogo from '../../assets/company-logo.jpg';

const Invoice = () => {
  const navigate = useNavigate();
  // In a real app, fetch sale by ID. Using mock data for now.
  const sale = {
    invoice_number: 'INV-2025-0007',
    created_at: 'May 26, 2025',
    customer_name: 'Almaz Construction PLC',
    status: 'completed',
    items: [
      { product_name: 'Cement 50kg', quantity: 50, unit_price: 650, subtotal: 32500 },
      { product_name: 'Steel Rebar 12mm', quantity: 10, unit_price: 1200, subtotal: 12000 },
    ],
    subtotal: 44500,
    discount_percentage: 5,
    discount_amount: 2225,
    vat_percentage: 15,
    vat_amount: 6341.25,
    total_amount: 48616.25,
    created_by_name: 'Abebe Ketema',
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/sales')} className="p-2 hover:bg-surfaceHighlight rounded-lg transition-colors text-textMuted hover:text-textMain">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-textMain">Invoice</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => window.print()} className="flex items-center space-x-2 px-4 py-2 border border-border hover:bg-surfaceHighlight rounded-lg text-sm text-textMuted hover:text-textMain transition-colors">
            <Printer className="w-4 h-4" /><span>Print</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm text-white font-medium transition-colors">
            <Download className="w-4 h-4" /><span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Invoice Header */}
        <div className="p-8 flex items-start justify-between border-b border-border">
          <div className="flex items-center space-x-4">
            <img src={companyLogo} alt="Logo" className="w-14 h-14 rounded-xl object-contain" />
            <div>
              <h2 className="text-xl font-bold text-textMain">Inventory & Sales Co.</h2>
              <p className="text-sm text-textMuted">Addis Ababa, Ethiopia</p>
              <p className="text-sm text-textMuted">inventory@company.com</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-textMain">INVOICE</h3>
            <p className="text-primary font-semibold mt-1">{sale.invoice_number}</p>
            <p className="text-sm text-textMuted mt-1">{sale.created_at}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              {sale.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Bill To */}
        <div className="p-8 border-b border-border">
          <p className="text-xs font-semibold uppercase text-textMuted tracking-widest mb-2">Bill To</p>
          <p className="text-base font-semibold text-textMain">{sale.customer_name}</p>
          <p className="text-sm text-textMuted mt-1">Processed by: {sale.created_by_name}</p>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-8 py-4 text-left font-medium text-textMuted">Product</th>
                <th className="px-6 py-4 text-center font-medium text-textMuted">Qty</th>
                <th className="px-6 py-4 text-right font-medium text-textMuted">Unit Price</th>
                <th className="px-8 py-4 text-right font-medium text-textMuted">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sale.items.map((item, i) => (
                <tr key={i}>
                  <td className="px-8 py-4 text-textMain font-medium">{item.product_name}</td>
                  <td className="px-6 py-4 text-center text-textMuted">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-textMuted">{formatCurrency(item.unit_price)}</td>
                  <td className="px-8 py-4 text-right text-textMain font-semibold">{formatCurrency(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="p-8 flex justify-end border-t border-border">
          <div className="w-72 space-y-3 text-sm">
            <div className="flex justify-between text-textMuted"><span>Subtotal</span><span>{formatCurrency(sale.subtotal)}</span></div>
            <div className="flex justify-between text-textMuted"><span>Discount ({sale.discount_percentage}%)</span><span className="text-danger">-{formatCurrency(sale.discount_amount)}</span></div>
            <div className="flex justify-between text-textMuted"><span>VAT ({sale.vat_percentage}%)</span><span>+{formatCurrency(sale.vat_amount)}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-textMain text-base">
              <span>Total Amount</span><span>{formatCurrency(sale.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
