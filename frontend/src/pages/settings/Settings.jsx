import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Percent, Bell, Moon, Globe } from 'lucide-react';

const Settings = () => {
  const [vatRate, setVatRate] = useState('15');
  const [approvalThreshold, setApprovalThreshold] = useState('50000');
  const [currency, setCurrency] = useState('Birr (ETB)');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-textMain">System Settings</h1>
        <p className="text-sm text-textMuted mt-1">Configure global system preferences and policies</p>
      </div>

      {/* Tax & Finance */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Percent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-textMain">Tax & Finance</h3>
            <p className="text-xs text-textMuted">Control tax rates and approval thresholds</p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-textMain block mb-2">VAT Percentage (%)</label>
            <div className="relative w-64">
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                className="w-full bg-background border border-border rounded-lg py-2.5 px-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted text-sm">%</span>
            </div>
            <p className="text-xs text-textMuted mt-1.5">Current rate applied to all taxable sales</p>
          </div>
          <div>
            <label className="text-sm font-medium text-textMain block mb-2">Manager Approval Threshold (Birr)</label>
            <div className="relative w-64">
              <input
                type="number"
                value={approvalThreshold}
                onChange={(e) => setApprovalThreshold(e.target.value)}
                className="w-full bg-background border border-border rounded-lg py-2.5 px-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <p className="text-xs text-textMuted mt-1.5">Sales above this amount require Manager approval</p>
          </div>
          <div>
            <label className="text-sm font-medium text-textMain block mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-64 bg-background border border-border rounded-lg py-2.5 px-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
            >
              <option>Birr (ETB)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-textMain">Notifications</h3>
            <p className="text-xs text-textMuted">Manage system alerts and reminders</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'Low Stock Alerts', desc: 'Notify when product stock falls below minimum level' },
            { label: 'Pending Approval Alerts', desc: 'Notify managers of transactions awaiting approval' },
            { label: 'Daily Sales Summary', desc: 'Send a daily sales summary report via email' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm font-medium text-textMain">{item.label}</p>
                <p className="text-xs text-textMuted mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-border'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
