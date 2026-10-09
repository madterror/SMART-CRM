import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Rocket, Zap, Bell, CheckCircle2 } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: 'feature' | 'action' | 'success';
}

export default function ComingSoonModal({ isOpen, onClose, title, description, type = 'feature' }: ComingSoonModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'feature': return <Sparkles className="w-8 h-8 text-blue-600" />;
      case 'action': return <Rocket className="w-8 h-8 text-indigo-600" />;
      case 'success': return <CheckCircle2 className="w-8 h-8 text-emerald-600" />;
      default: return <Zap className="w-8 h-8 text-amber-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'feature': return 'bg-blue-50';
      case 'action': return 'bg-indigo-50';
      case 'success': return 'bg-emerald-50';
      default: return 'bg-amber-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8", getBgColor())}>
              {getIcon()}
            </div>

            <h3 className="text-2xl font-bold text-center text-gray-900 mb-3 font-serif">{title}</h3>
            <p className="text-sm text-gray-500 text-center mb-10 leading-relaxed italic">
              {description || "We're currently refining this module for our upcoming release. You'll receive a notification as soon as it's live!"}
            </p>

            <div className="space-y-3">
               <button 
                onClick={onClose}
                className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                Notify Me
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-white border border-gray-200 text-gray-500 font-bold py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-xs uppercase tracking-widest"
              >
                Dismiss
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2">
               <Bell className="w-3 h-3 text-blue-500" />
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">v2.0 Beta Access Available</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Utility to merge classes safely
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
