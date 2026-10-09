import { useState } from 'react';
import { DollarSign, Search, Plus, Calendar, TrendingUp, MoreVertical, Briefcase } from 'lucide-react';
import { DUMMY_DEALS, DUMMY_CUSTOMERS } from '../constants';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import ComingSoonModal from './ComingSoonModal';

export default function DealManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCustomerName = (id: string) => DUMMY_CUSTOMERS.find(c => c.id === id)?.name || 'Unknown';

  const filteredDeals = DUMMY_DEALS.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCustomerName(deal.customerId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Proposal': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Negotiation': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Closed Won': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Closed Lost': return 'bg-red-50 text-red-700 border-red-100';
      case 'Pitch': return 'bg-gray-50 text-gray-700 border-gray-100';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Deals Pipeline</h2>
          <p className="text-sm text-gray-500">Manage high-value sales opportunities and revenue forecasts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create Deal
        </button>
      </div>

      <ComingSoonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Deal Pipeline" 
        type="action"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Pipeline Value</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">$72,000</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Weighted Forecast</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">$41,250</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Open Deals</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Avg. Deal Size</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">$6,000</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search deals or customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Deal Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Stage</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Probability</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Exp. Close</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{deal.name}</div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400">{getCustomerName(deal.customerId)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">${deal.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", getStageColor(deal.stage))}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                       <span className="text-sm font-medium text-gray-700">{deal.probability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(deal.expectedCloseDate), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-400">
                      <MoreVertical className="w-5 h-5" />
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
