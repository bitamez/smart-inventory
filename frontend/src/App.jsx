import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsList from './pages/products/ProductsList';
import SalesPage from './pages/sales/SalesPage';
import StockManagement from './pages/stock/StockManagement';
import ApprovalPage from './pages/approvals/ApprovalPage';
import ReportsPage from './pages/reports/ReportsPage';
import UserManagement from './pages/users/UserManagement';
import Roles from './pages/roles/Roles';
import Settings from './pages/settings/Settings';

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
          <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<Roles />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
