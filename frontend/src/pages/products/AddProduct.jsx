import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import { validateProductForm } from '../../utils/validation';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [form, setForm] = useState({
    sku: '', product_name: '', category: '', unit_price: '',
    stock_quantity: '', minimum_stock: '', unit_of_measure: 'pcs', description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProductForm(form);
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);
    setLoading(true);
    setApiError('');
    try {
      await productService.create(form);
      navigate('/products');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/products')} className="p-2 hover:bg-surfaceHighlight rounded-lg transition-colors text-textMuted hover:text-textMain">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-textMain">Add New Product</h1>
          <p className="text-sm text-textMuted mt-1">Fill in the details to add a new product to inventory</p>
        </div>
      </div>

      {apiError && (
        <div className="flex items-start space-x-3 p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { name: 'sku', label: 'SKU / Product Code', placeholder: 'e.g. CEM-50KG', type: 'text' },
            { name: 'product_name', label: 'Product Name', placeholder: 'e.g. Cement 50kg Bag', type: 'text' },
            { name: 'category', label: 'Category', placeholder: 'e.g. Building Materials', type: 'text' },
            { name: 'unit_price', label: 'Unit Price (Birr)', placeholder: '0.00', type: 'number' },
            { name: 'stock_quantity', label: 'Initial Stock Quantity', placeholder: '0', type: 'number' },
            { name: 'minimum_stock', label: 'Minimum Stock Level', placeholder: '10', type: 'number' },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-textMain mb-2">{label}</label>
              <input
                name={name} type={type} placeholder={placeholder}
                value={form[name]} onChange={handleChange}
                className={`w-full bg-background border rounded-xl py-2.5 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors ${errors[name] ? 'border-danger' : 'border-border'}`}
              />
              {errors[name] && <p className="text-danger text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-textMain mb-2">Unit of Measure</label>
            <select name="unit_of_measure" value={form.unit_of_measure} onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors">
              {['pcs', 'kg', 'g', 'L', 'mL', 'bag', 'box', 'roll', 'sheet', 'meter'].map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textMain mb-2">Description</label>
          <textarea name="description" rows={3} placeholder="Optional product description..."
            value={form.description} onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors resize-none" />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button type="button" onClick={() => navigate('/products')} className="px-5 py-2.5 text-sm font-medium text-textMuted hover:text-textMain border border-border hover:bg-surfaceHighlight rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
