import { CheckCircle2, Circle, Clock, AlertCircle, MessageSquare, Phone, Mail, Plus, Users } from 'lucide-react';
import { DUMMY_TASKS, DUMMY_CUSTOMERS, DUMMY_INTERACTIONS } from '../constants';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export function TaskManagement() {
  const getCustomerName = (id: string) => DUMMY_CUSTOMERS.find(c => c.id === id)?.name || 'Unknown';

  const priorityColors = {
    High: 'text-red-600 bg-red-50',
    Medium: 'text-amber-600 bg-amber-50',
    Low: 'text-emerald-600 bg-emerald-50',
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks & Follow-ups</h2>
          <p className="text-sm text-gray-500">Never miss a critical client engagement.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      <div className="grid gap-4">
        {DUMMY_TASKS.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-start gap-4">
              <button className="mt-1 text-gray-300 hover:text-blue-500 transition-colors">
                {task.status === 'Completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <div>
                <h4 className={cn("font-semibold text-gray-900", task.status === 'Completed' && "line-through text-gray-400")}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                   <span className="text-xs text-blue-600 font-medium">{getCustomerName(task.customerId)}</span>
                   <span className="text-gray-300 text-xs">•</span>
                   <div className="flex items-center gap-1 text-xs text-gray-500">
                     <Clock className="w-3 h-3" />
                     {format(new Date(task.dueDate), 'MMM dd, h:mm a')}
                   </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", priorityColors[task.priority])}>
                 {task.priority} Priority
               </span>
               <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                 <AlertCircle className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteractionTracking() {
  const getCustomerName = (id: string) => DUMMY_CUSTOMERS.find(c => c.id === id)?.name || 'Unknown';
  
  const typeIcons = {
    Call: Phone,
    Email: Mail,
    Meeting: Users,
    Note: MessageSquare,
  };

  const typeColors = {
    Call: 'bg-blue-100 text-blue-600',
    Email: 'bg-emerald-100 text-emerald-600',
    Meeting: 'bg-amber-100 text-amber-600',
    Note: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-gray-900">Interaction History</h2>
        <p className="text-sm text-gray-500">Activity log across all customers and leads.</p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
        {DUMMY_INTERACTIONS.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((interaction) => {
          const Icon = typeIcons[interaction.type];
          return (
            <div key={interaction.id} className="relative pl-12">
              <div className={cn("absolute left-0 w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10", typeColors[interaction.type])}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{getCustomerName(interaction.customerId)}</h4>
                    <span className="text-xs text-gray-400 font-mono italic">{format(new Date(interaction.date), 'MMMM dd, yyyy • h:mm a')}</span>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", typeColors[interaction.type])}>
                    {interaction.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">
                  {interaction.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

