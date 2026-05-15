import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import ProductsList from '../pages/products/ProductsList'
import AddProduct from '../pages/products/AddProduct'
import EditProduct from '../pages/products/EditProduct'
import ProductDetails from '../pages/products/ProductDetails'
import SalesPage from '../pages/sales/SalesPage'
import NewSale from '../pages/sales/NewSale'
import Invoice from '../pages/sales/Invoice'
import SalesHistory from '../pages/sales/SalesHistory'
import StockManagement from '../pages/stock/StockManagement'
import StockHistory from '../pages/stock/StockHistory'
import ApprovalPage from '../pages/approvals/ApprovalPage'
import DailyReport from '../pages/reports/DailyReport'
import MonthlyReport from '../pages/reports/MonthlyReport'
import StockReport from '../pages/reports/StockReport'
import UserManagement from '../pages/users/UserManagement'
import Settings from '../pages/settings/Settings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsList />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/products/add"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/sales/new"
        element={
          <ProtectedRoute>
            <NewSale />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/sales/invoice/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/sales/history"
        element={
          <ProtectedRoute>
            <SalesHistory />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/stock"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <StockManagement />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/stock/history"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <StockHistory />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/approvals"
        element={
          <ProtectedRoute allowedRoles={['Manager']}>
            <ApprovalPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/reports/daily"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <DailyReport />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/reports/monthly"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <MonthlyReport />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/reports/stock"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
            <StockReport />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <Settings />
          </ProtectedRoute>
        }
      />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes
