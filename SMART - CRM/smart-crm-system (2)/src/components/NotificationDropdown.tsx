import { motion, AnimatePresence } from 'motion/react';
import { Bell, MessageSquare, Target, ShoppingBag, Clock, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Lead Assigned',
    description: 'TechFlow Inc. has been assigned to you by Sarah.',
    time: '2m ago',
    icon: Target,
    color: 'blue',
    unread: true
  },
  {
    id: 2,
    title: 'Order Completed',
    description: 'Order #3492 for Creative Studio was successfully delivered.',
    time: '1h ago',
    icon: ShoppingBag,
    color: 'emerald',
    unread: true
  },
  {
    id: 3,
    title: 'Unread Message',
    description: 'James Moore sent you a message about the quarterly forecast.',
    time: '3h ago',
    icon: MessageSquare,
    color: 'indigo',
    unread: false
  },
  {
    id: 4,
    title: 'Upcoming Meeting',
    description: 'Project review with Logistics Plus starts in 15 minutes.',
    time: '12h ago',
    icon: Clock,
    color: 'amber',
    unread: false
  }
];

export default function NotificationDropdown({ isOpen, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-16 right-8 w-96 bg-white rounded-3xl border border-gray-100 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">You have 2 unread messages</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {NOTIFICATIONS.map((note) => (
                <div 
                  key={note.id} 
                  className={cn(
                    "p-5 hover:bg-gray-50 transition-colors cursor-pointer group flex gap-4 relative",
                    note.unread && "bg-blue-50/30"
                  )}
                >
                  {note.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                  )}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0",
                    `bg-${note.color}-50 text-${note.color}-600`
                  )}>
                    <note.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {note.title}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {note.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {note.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full p-4 text-center text-xs font-bold text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-all border-t border-gray-50 bg-gray-50/50">
              Mark all as read
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
