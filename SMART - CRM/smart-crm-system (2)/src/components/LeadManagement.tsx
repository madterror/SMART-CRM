import { useEffect, useState } from 'react';
import { Target, User, DollarSign, Clock, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { DUMMY_CUSTOMERS } from '../constants';
import { LeadStatus, Lead } from '../types';
import { cn } from '../lib/utils';
import AddLeadModal from './AddLeadModal';
import { ApiService } from '../services/api';

const STAGES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

const STAGE_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-50 text-blue-700 border-blue-100',
  'Contacted': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Qualified': 'bg-amber-50 text-amber-700 border-amber-100',
  'Converted': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Lost': 'bg-gray-50 text-gray-700 border-gray-100',
};

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<LeadStatus>('New');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await ApiService.getLeads();
        setLeads(data);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const getCustomer = (id: string) => DUMMY_CUSTOMERS.find(c => c.id === id);
  const getCustomerName = (id: string) => getCustomer(id)?.name || 'Unknown';
  const getCustomerAvatar = (id: string) => getCustomer(id)?.avatarUrl;

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const openModal = (stage: LeadStatus) => {
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const totalValue = leads.reduce((acc, lead) => acc + lead.value, 0);

  if (loading) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Leads API...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddLead}
        initialStatus={selectedStage}
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Lead Board</h2>
          <p className="text-sm text-gray-500">Track and move your sales opportunities through the funnel.</p>
        </div>
        <div className="flex gap-2">
            <span className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                Total Value: ${totalValue.toLocaleString()}
            </span>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 no-scrollbar">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(lead => lead.status === stage);
          
          return (
            <div key={stage} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 tracking-tight">{stage}</h3>
                  <span className="bg-white border border-gray-200 text-gray-500 text-[10px] py-0.5 px-2 rounded-full font-bold">
                    {stageLeads.length}
                  </span>
                </div>
              </div>

              <div className="space-y-4 bg-gray-100/40 p-4 rounded-2xl min-h-[600px] border border-gray-200/50">
                {stageLeads.map((lead) => {
                  const avatar = getCustomerAvatar(lead.customerId);
                  const name = getCustomerName(lead.customerId);
                  
                  return (
                    <div key={lead.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing group ring-1 ring-black/5">
                      <div className="flex justify-between items-start mb-4">
                          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border", STAGE_COLORS[lead.status])}>
                              {lead.status}
                          </span>
                          <div className="flex items-center text-gray-900 font-bold text-sm">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                              {lead.value.toLocaleString()}
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-6">
                        {avatar ? (
                          <img 
                            src={avatar} 
                            alt={name} 
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-50 bg-gray-100"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            {name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{name}</h4>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lead.id}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2 text-gray-400 font-medium lowercase">
                              <User className="w-3 h-3" />
                              {lead.assignedTo.split(' ')[0]}
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 font-medium">
                              <Clock className="w-3 h-3" />
                              now
                            </div>
                          </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                          <div className="flex -space-x-2">
                             {[1, 2].map(i => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                 {String.fromCharCode(64 + i)}
                               </div>
                             ))}
                          </div>
                          <button className="text-gray-300 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 p-1.5 rounded-lg">
                              <ArrowRight className="w-4 h-4" />
                          </button>
                      </div>
                    </div>
                  );
                })}
                
                <button 
                  onClick={() => openModal(stage)}
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 hover:bg-white/80 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Lead
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


