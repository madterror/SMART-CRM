import React, { useState } from 'react';
import { Save, User, Bell, Shield, Monitor, Mail, Lock, Upload, Trash2, Check, Moon, Sun, Smartphone } from 'lucide-react';

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification settings state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dealUpdates, setDealUpdates] = useState(true);
  const [leadAssignments, setLeadAssignments] = useState(true);

  // Appearance settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-serif">Account Settings</h2>
        <p className="text-sm text-gray-500">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-xl">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200/80">
                  {/* Blank Avatar Container */}
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner shrink-0 relative group">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        className="w-full h-full object-cover rounded-xl" 
                        alt="Profile avatar"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100/70 text-gray-400">
                        <User className="w-9 h-9 stroke-[1.25]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">Account Avatar</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 uppercase tracking-wider">
                        {avatarUrl ? 'Custom' : 'Blank'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {avatarUrl ? 'Custom picture uploaded.' : 'Blank profile placeholder active.'}
                    </p>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-3 py-2 rounded-lg border border-blue-200 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarUpload} 
                        />
                      </label>
                      {avatarUrl && (
                        <button 
                          onClick={handleRemoveAvatar}
                          className="text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-2 rounded-lg border border-red-200 shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Set Blank
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" defaultValue="Alex Rivera" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Title</label>
                    <input type="text" defaultValue="Senior Sales Manager" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" defaultValue="alex@smartcrm.com" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biography</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700 resize-none" defaultValue="Managing high-value accounts and driving revenue growth..." />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Notification Preferences</h4>
                  <p className="text-xs text-gray-500">Choose which updates and alerts you wish to receive.</p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive summary reports and critical alerts in your email.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={emailAlerts} 
                      onChange={(e) => setEmailAlerts(e.target.checked)} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Deal Stage Updates</p>
                      <p className="text-xs text-gray-500">Notify immediately when deals change stage or are marked won.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={dealUpdates} 
                      onChange={(e) => setDealUpdates(e.target.checked)} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Lead Assignments</p>
                      <p className="text-xs text-gray-500">Alerts when new customer inquiries or leads are assigned to you.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={leadAssignments} 
                      onChange={(e) => setLeadAssignments(e.target.checked)} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                  <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-gray-700" />
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-amber-900 uppercase tracking-tight">Two-Factor Authentication</h5>
                    <p className="text-xs text-amber-700 mt-1">Recommended for high-security accounts like yours.</p>
                    <button className="mt-3 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors">Enable 2FA →</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Theme Preferences</h4>
                  <p className="text-xs text-gray-500">Select how the CRM interface looks for your workspace.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                      theme === 'light' 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold ring-2 ring-blue-500/20' 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Sun className="w-6 h-6 text-amber-500" />
                    <span className="text-xs">Light</span>
                  </button>

                  <button 
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                      theme === 'dark' 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold ring-2 ring-blue-500/20' 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Moon className="w-6 h-6 text-indigo-500" />
                    <span className="text-xs">Dark</span>
                  </button>

                  <button 
                    onClick={() => setTheme('system')}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                      theme === 'system' 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold ring-2 ring-blue-500/20' 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-gray-500" />
                    <span className="text-xs">System</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
              {saveSuccess ? (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-2 rounded-xl">
                  <Check className="w-4 h-4" />
                  Settings saved successfully!
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all text-xs uppercase tracking-widest"
                >
                  Reset
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200 flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
