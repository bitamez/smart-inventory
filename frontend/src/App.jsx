import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/auth/Login';
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
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="stock" element={<StockManagement />} />
            <Route path="approvals" element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <ApprovalPage />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="roles" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Roles />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Settings />
              </ProtectedRoute>
            } />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
