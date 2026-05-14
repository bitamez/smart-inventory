import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import clsx from 'clsx';

const mockRoles = [
  { id: 1, name: 'Admin', description: 'Full system access. Can manage users, roles, settings, and all data.', users: 1, color: 'primary' },
  { id: 2, name: 'Manager', description: 'Approves large sales transactions, views full reports, and manages staff.', users: 1, color: 'warning' },
  { id: 3, name: 'Sales Officer', description: 'Processes daily sales transactions and manages own sale records.', users: 3, color: 'secondary' },
];

const colorMap = {
  primary: 'bg-primary/10 border-primary/20 text-primary',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
};

const Roles = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">Roles & Permissions</h1>
          <p className="text-sm text-textMuted mt-1">Define and manage access levels for system users</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRoles.map((role) => (
          <div key={role.id} className="bg-surface border border-border rounded-2xl p-6 hover:border-surfaceHighlight transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center border", colorMap[role.color])}>
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-textMuted hover:text-primary hover:bg-primary/10 rounded transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-textMuted hover:text-danger hover:bg-danger/10 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-textMain mb-2">{role.name}</h3>
            <p className="text-sm text-textMuted flex-1 mb-6">{role.description}</p>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-textMuted">Assigned Users</span>
              <span className={clsx("text-sm font-semibold px-2.5 py-1 rounded border", colorMap[role.color])}>
                {role.users} {role.users === 1 ? 'User' : 'Users'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-textMain">Permission Matrix</h3>
          <p className="text-sm text-textMuted mt-1">Overview of what each role can access</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Permission</th>
                <th className="px-6 py-4 font-medium text-center">Admin</th>
                <th className="px-6 py-4 font-medium text-center">Manager</th>
                <th className="px-6 py-4 font-medium text-center">Sales Officer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                { perm: 'View Dashboard', admin: true, manager: true, sales: true },
                { perm: 'Manage Products', admin: true, manager: true, sales: false },
                { perm: 'Process Sales', admin: true, manager: true, sales: true },
                { perm: 'Approve Transactions', admin: true, manager: true, sales: false },
                { perm: 'View Reports', admin: true, manager: true, sales: false },
                { perm: 'Manage Users', admin: true, manager: false, sales: false },
                { perm: 'System Settings', admin: true, manager: false, sales: false },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4 text-textMain font-medium">{row.perm}</td>
                  {[row.admin, row.manager, row.sales].map((has, j) => (
                    <td key={j} className="px-6 py-4 text-center">
                      <span className={clsx(
                        "inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mx-auto",
                        has ? "bg-secondary/10 text-secondary border border-secondary/20" : "bg-danger/10 text-danger border border-danger/20"
                      )}>
                        {has ? '✓' : '✗'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roles;
