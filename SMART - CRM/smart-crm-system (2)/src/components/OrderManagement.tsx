import { useState } from 'react';
import { ShoppingBag, Search, Filter, MoreHorizontal, User, Calendar, CreditCard } from 'lucide-react';
import { DUMMY_ORDERS, DUMMY_CUSTOMERS } from '../constants';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import ComingSoonModal from './ComingSoonModal';

export default function OrderManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getCustomerName = (id: string) => DUMMY_CUSTOMERS.find(c => c.id === id)?.name || 'Guest User';
// ... helper ...
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Orders</h2>
          <p className="text-sm text-gray-500">Track customer purchases and transaction history.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Export Report
          </button>
        </div>
      </div>

      <ComingSoonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Reporting Engine" 
        type="feature"
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Order ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Payment</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DUMMY_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-blue-600 font-mono">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                         {getCustomerName(order.customerId).charAt(0)}
                       </div>
                       <span className="text-sm font-medium text-gray-900">{getCustomerName(order.customerId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">${order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", getStatusStyle(order.status))}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className={cn("w-3.5 h-3.5", order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500')} />
                      <span className={cn("text-xs font-medium", order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600')}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
