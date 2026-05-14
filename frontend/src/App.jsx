import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsList from './pages/products/ProductsList';
import SalesPage from './pages/sales/SalesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="stock" element={<div className="text-white">Stock Page Placeholder</div>} />
          <Route path="approvals" element={<div className="text-white">Approvals Page Placeholder</div>} />
          <Route path="reports" element={<div className="text-white">Reports Page Placeholder</div>} />
          <Route path="users" element={<div className="text-white">Users Page Placeholder</div>} />
          <Route path="roles" element={<div className="text-white">Roles Page Placeholder</div>} />
          <Route path="settings" element={<div className="text-white">Settings Page Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
