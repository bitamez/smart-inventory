import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const title = path.substring(1).charAt(0).toUpperCase() + path.substring(2);
    return title.replace('-', ' ');
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopNav title={getPageTitle()} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
        <footer className="py-6 text-center text-sm text-textMuted border-t border-border mt-auto">
          &copy; 2025 Inventory & Sales Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
