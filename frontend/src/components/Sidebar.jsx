import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  ArrowRightLeft, 
  CheckSquare, 
  FileText, 
  Users, 
  Shield, 
  Settings, 
  LogOut,
  Box
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: ShoppingCart, label: 'Sales', path: '/sales' },
    { icon: ArrowRightLeft, label: 'Stock Transactions', path: '/stock' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals', badge: 2 },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Shield, label: 'Roles', path: '/roles' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0 text-textMuted">
      <div className="p-6 flex items-center space-x-3 text-textMain border-b border-border">
        <Box className="w-8 h-8 text-primary" />
        <div>
          <h1 className="font-bold text-sm tracking-wide leading-tight">Inventory & Sales</h1>
          <p className="text-[10px] text-textMuted">Management System</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col space-y-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
              isActive 
                ? "bg-surfaceHighlight text-textMain" 
                : "hover:bg-surfaceHighlight hover:text-textMain"
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-surfaceHighlight text-xs py-0.5 px-2 rounded-full border border-border">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button className="flex items-center space-x-3 px-3 py-2.5 w-full text-sm font-medium rounded-lg hover:bg-surfaceHighlight hover:text-danger transition-colors duration-200">
          <LogOut className="w-5 h-5 opacity-70" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
