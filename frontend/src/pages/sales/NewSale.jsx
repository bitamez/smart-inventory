import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import { salesService } from '../../services/salesService';
import { calculateVAT } from '../../utils/calculateVAT';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { formatCurrency } from '../../utils/formatCurrency';

const NewSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [vatPct] = useState(15);
  const [items, setItems] = useState([{ product_id: '', product_name: '', unit_price: 0, quantity: 1 }]);

  useEffect(() => {
    productService.getAll().then(setProducts).catch(() => {});
  }, []);

  const addItem = () => setItems([...items, { product_id: '', product_name: '', unit_price: 0, quantity: 1 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    if (field === 'product_id') {
      const prod = products.find(p => p.id === value);
      if (prod) { updated[i].unit_price = prod.unit_price; updated[i].product_name = prod.product_name; }
    }
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.unit_price) * Number(item.quantity)), 0);
  const { discountAmount, discountedAmount } = calculateDiscount(subtotal, discountPct);
  const { vatAmount, total } = calculateVAT(discountedAmount, vatPct);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) return setApiError('Customer name is required');
    if (items.some(i => !i.product_id)) return setApiError('Please select a product for all items');
    setLoading(true); setApiError('');
    try {
      await salesService.create({ customer_name: customerName, discount_percentage: discountPct, vat_percentage: vatPct, items });
      navigate('/sales');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to process sale. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/sales')} className="p-2 hover:bg-surfaceHighlight rounded-lg transition-colors text-textMuted hover:text-textMain">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-textMain">New Sale Transaction</h1>
          <p className="text-sm text-textMuted mt-1">Create a new sales invoice</p>
        </div>
      </div>

      {apiError && (
        <div className="flex items-start space-x-3 p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /><p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-base font-semibold text-textMain mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textMain mb-2">Customer Name *</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full name or company"
                  className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-2">Discount (%)</label>
                <input type="number" min="0" max="100" value={discountPct} onChange={e => setDiscountPct(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-textMain">Sale Items</h3>
              <button type="button" onClick={addItem} className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
                <Plus className="w-4 h-4" /><span>Add Item</span>
              </button>
            </div>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <select value={item.product_id} onChange={e => updateItem(i, 'product_id', e.target.value)}
                      className="w-full bg-background border border-border rounded-xl py-2.5 px-3 text-sm text-textMain focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select Product</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.product_name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input type="number" min="0" value={item.unit_price} onChange={e => updateItem(i, 'unit_price', e.target.value)}
                      placeholder="Price" className="w-full bg-background border border-border rounded-xl py-2.5 px-3 text-sm text-textMain focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" min="1" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)}
                      placeholder="Qty" className="w-full bg-background border border-border rounded-xl py-2.5 px-3 text-sm text-textMain focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(i)} className="text-textMuted hover:text-danger transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-surface border border-border rounded-2xl p-6 h-fit sticky top-24 space-y-4">
          <h3 className="text-base font-semibold text-textMain mb-2">Invoice Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-textMuted"><span>Subtotal</span><span className="text-textMain">{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-textMuted"><span>Discount ({discountPct}%)</span><span className="text-danger">-{formatCurrency(discountAmount)}</span></div>
            <div className="flex justify-between text-textMuted"><span>VAT ({vatPct}%)</span><span className="text-textMain">+{formatCurrency(vatAmount)}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-textMain text-base">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full mt-4 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
            <span>{loading ? 'Processing...' : 'Complete Sale'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSale;
