import { LayoutDashboard, Users, Target, MessageSquare, CheckSquare, Settings, LogOut, Package, ShoppingBag, Briefcase, Calendar as CalendarIcon, Contact, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export type NavItem = 'dashboard' | 'customers' | 'leads' | 'interactions' | 'tasks' | 'products' | 'orders' | 'deals' | 'calendar' | 'contacts' | 'settings';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  onLogout: () => void;
  userEmail?: string | null;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, userEmail }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'leads', label: 'Leads', icon: Target },
    { id: 'deals', label: 'Deals', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'contacts', label: 'Contacts', icon: Contact },
    { id: 'interactions', label: 'Interactions', icon: MessageSquare },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-30 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 font-serif">Smart CRM</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavItem)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl transition-all duration-200",
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 scale-[1.02]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col">
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] shadow-sm">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-gray-500">
                <UserCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate">
                {userEmail?.split('@')[0] || 'Member'}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">Pro Account</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl transition-all",
              activeTab === 'settings' 
                ? "bg-gray-100 text-gray-900 border border-gray-200 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Settings className={cn("w-5 h-5", activeTab === 'settings' ? "text-blue-600" : "text-gray-400")} />
            Settings
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
