import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import clsx from 'clsx';

const mockProducts = [
  { id: 1, sku: 'CEM-50', name: 'Cement 50kg', category: 'Construction', price: '1,200.00 Birr', stock: 3, min: 10, status: 'Low Stock' },
  { id: 2, sku: 'STL-12', name: 'Steel Rebar 12mm', category: 'Construction', price: '850.00 Birr', stock: 120, min: 15, status: 'In Stock' },
  { id: 3, sku: 'NAL-02', name: 'Nails 2 inch', category: 'Hardware', price: '150.00 Birr', stock: 8, min: 20, status: 'Low Stock' },
  { id: 4, sku: 'PNT-20', name: 'Paint 20L', category: 'Finishing', price: '3,500.00 Birr', stock: 25, min: 10, status: 'In Stock' },
  { id: 5, sku: 'PVC-04', name: 'PVC Pipe 4 inch', category: 'Plumbing', price: '400.00 Birr', stock: 6, min: 15, status: 'Low Stock' },
  { id: 6, sku: 'WD-2x4', name: 'Wood 2x4 (per meter)', category: 'Carpentry', price: '250.00 Birr', stock: 400, min: 50, status: 'In Stock' },
  { id: 7, sku: 'GLS-05', name: 'Window Glass 5mm', category: 'Finishing', price: '1,800.00 Birr', stock: 45, min: 20, status: 'In Stock' },
];

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Products</h1>
          <p className="text-sm text-textMuted mt-1">Manage your inventory and product catalog</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
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
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name & SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Unit Price</th>
                <th className="px-6 py-4 font-medium text-center">Stock Level</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-textMain">{product.name}</p>
                      <p className="text-xs text-textMuted mt-0.5">{product.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-textMuted">{product.category}</td>
                  <td className="px-6 py-4 text-textMain font-medium text-right">{product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "font-medium",
                      product.stock <= product.min ? "text-danger" : "text-textMain"
                    )}>
                      {product.stock}
                    </span>
                    <span className="text-textMuted text-xs ml-1">/ {product.min}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-medium rounded border",
                      product.stock <= product.min 
                        ? "text-danger border-danger/20 bg-danger/10" 
                        : "text-secondary border-secondary/20 bg-secondary/10"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-textMuted hover:text-primary hover:bg-primary/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-textMuted hover:text-danger hover:bg-danger/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-textMuted">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border mt-auto flex items-center justify-between text-sm text-textMuted bg-background/50">
          <p>Showing 1 to {filteredProducts.length} of {mockProducts.length} entries</p>
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

export default ProductsList;
