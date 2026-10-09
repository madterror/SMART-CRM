import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock, Calendar as CalendarIcon, MoreVertical } from 'lucide-react';
import { DUMMY_EVENTS, DUMMY_CUSTOMERS } from '../constants';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '../lib/utils';

export default function CalendarComponent() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 4, 1)); // May 2024 for dummy data sync

  const getCustomerName = (id?: string) => id ? DUMMY_CUSTOMERS.find(c => c.id === id)?.name : null;

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Meeting': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Call': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Deadline': return 'bg-red-100 text-red-700 border-red-200';
      case 'Event': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          <p className="text-sm text-gray-500">Manage meetings, calls, and project deadlines.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-50 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {day}
              </div>
            ))}
            
            {/* Empty boxes for start offset - simplified for now */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-white h-32 p-2 opacity-50" />
            ))}

            {days.map((day) => {
              const dayEvents = DUMMY_EVENTS.filter(event => isSameDay(new Date(event.start), day));
              return (
                <div key={day.toString()} className="bg-white h-32 p-2 group hover:bg-blue-50/20 transition-colors">
                  <span className={cn(
                    "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1",
                    isSameDay(day, new Date()) ? "bg-blue-600 text-white" : "text-gray-500"
                  )}>
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className={cn("text-[10px] p-1.5 rounded border border-transparent truncate font-medium", getEventColor(event.type))}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Events</h3>
            <div className="space-y-6">
              {DUMMY_EVENTS.map((event) => (
                <div key={event.id} className="flex gap-4 group">
                  <div className={cn("w-1 h-12 rounded-full", getEventColor(event.type).split(' ')[1].replace('text-', 'bg-'))} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{event.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <div className="flex items-center gap-1 text-[10px] text-gray-400">
                         <Clock className="w-3 h-3" />
                         {format(new Date(event.start), 'h:mm a')}
                       </div>
                       {event.customerId && (
                         <div className="flex items-center gap-1 text-[10px] text-blue-600 font-medium">
                            <span className="w-1 h-1 rounded-full bg-blue-600" />
                            {getCustomerName(event.customerId)}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
