import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, MoreVertical, Shield } from 'lucide-react';
import clsx from 'clsx';

const mockUsers = [
  { id: 1, name: 'Abebe Ketema', email: 'abebe@company.com', role: 'Manager', status: 'Active', joined: 'Jan 12, 2025' },
  { id: 2, name: 'Mesfin Tadesse', email: 'mesfin@company.com', role: 'Sales Officer', status: 'Active', joined: 'Feb 5, 2025' },
  { id: 3, name: 'Hirut Mekonnen', email: 'hirut@company.com', role: 'Sales Officer', status: 'Active', joined: 'Mar 1, 2025' },
  { id: 4, name: 'Dawit Alemu', email: 'dawit@company.com', role: 'Sales Officer', status: 'Inactive', joined: 'Apr 18, 2025' },
  { id: 5, name: 'Selamawit Yilma', email: 'selamawit@company.com', role: 'Admin', status: 'Active', joined: 'Jan 1, 2025' },
];

const roleColors = {
  Admin: 'text-primary border-primary/20 bg-primary/10',
  Manager: 'text-warning border-warning/20 bg-warning/10',
  'Sales Officer': 'text-secondary border-secondary/20 bg-secondary/10',
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain">User Management</h1>
          <p className="text-sm text-textMuted mt-1">Manage system users and their access levels</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-textMuted bg-surfaceHighlight/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Full Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium text-center">Role</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surfaceHighlight/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-surfaceHighlight border border-border flex items-center justify-center text-textMain font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-textMain">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-textMuted">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx("px-2.5 py-1 text-xs font-medium rounded border", roleColors[user.role])}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-medium rounded border",
                      user.status === 'Active'
                        ? "text-secondary border-secondary/20 bg-secondary/10"
                        : "text-danger border-danger/20 bg-danger/10"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-textMuted">{user.joined}</td>
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
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-textMuted">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border mt-auto flex items-center justify-between text-sm text-textMuted bg-background/50">
          <p>Showing {filteredUsers.length} of {mockUsers.length} users</p>
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

export default UserManagement;
