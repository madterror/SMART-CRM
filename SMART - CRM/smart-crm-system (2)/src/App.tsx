/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Search, Bell, User, HelpCircle } from 'lucide-react';
import { cn } from './lib/utils';
import Sidebar, { NavItem } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';
import LeadManagement from './components/LeadManagement';
import { TaskManagement, InteractionTracking } from './components/Tracking';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import DealManagement from './components/DealManagement';
import CalendarComponent from './components/CalendarComponent';
import ContactSection from './components/ContactSection';
import LoginPage from './components/LoginPage';
import SettingsSection from './components/SettingsSection';
import NotificationDropdown from './components/NotificationDropdown';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  // Check local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('smartcrm_user');
    if (savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogin = (userEmail: string) => {
    setIsAuthenticated(true);
    setCurrentUser(userEmail);
    localStorage.setItem('smartcrm_user', userEmail);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('smartcrm_user');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'leads':
        return <LeadManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'deals':
        return <DealManagement />;
      case 'calendar':
        return <CalendarComponent />;
      case 'contacts':
        return <ContactSection />;
      case 'tasks':
        return <TaskManagement />;
      case 'interactions':
        return <InteractionTracking />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} userEmail={currentUser} />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="relative w-96 flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm rounded-lg"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all relative",
                  showNotifications && "bg-blue-50 text-blue-600"
                )}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div 
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-3 pl-2 group cursor-pointer hover:opacity-80 transition-opacity"
              title="Open Account Settings"
            >
              <div className="text-right flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-none">
                  {currentUser?.split('@')[0] || 'Alex Rivera'}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-1">Sales Lead</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
                <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                   <User className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 pb-16 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
