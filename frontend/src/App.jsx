import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsList from './pages/products/ProductsList';
import SalesPage from './pages/sales/SalesPage';
import StockManagement from './pages/stock/StockManagement';
import ApprovalPage from './pages/approvals/ApprovalPage';
import ReportsPage from './pages/reports/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="approvals" element={<ApprovalPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<div className="text-white">Users Page Placeholder</div>} />
          <Route path="roles" element={<div className="text-white">Roles Page Placeholder</div>} />
          <Route path="settings" element={<div className="text-white">Settings Page Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
