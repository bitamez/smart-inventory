import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

const TopNav = ({ title }) => {
  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-surfaceHighlight text-textMuted hover:text-textMain transition-colors lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-textMain">{title}</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-background border border-border rounded-full py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors w-64"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-surfaceHighlight text-textMuted hover:text-textMain transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full border-2 border-surface"></span>
          </button>
          
          <div className="flex items-center space-x-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-surfaceHighlight transition-colors">
            <div className="w-9 h-9 rounded-full bg-surfaceHighlight border border-border flex items-center justify-center text-textMain">
              <User className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-textMain leading-none">Abebe Ketema</p>
              <p className="text-xs text-textMuted mt-1">Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
