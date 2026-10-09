import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication delay
    setTimeout(() => {
      if (email && password) {
        onLogin(email);
      } else {
        setError('Please enter both email and password.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - Dynamic Branding (Recipe 11 inspired) */}
      <div className="hidden lg:flex bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-2xl shadow-lg">
              S
            </div>
            <span className="font-bold text-2xl tracking-tight">Smart CRM</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold font-serif leading-[1.1] mb-6">
              The future of <br />
              <span className="text-blue-200">client success.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-md font-light leading-relaxed">
              Experience the world's most intuitive CRM. Built for high-performance teams who value clarity and precision in every interaction.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-blue-500/30 rounded flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-100" />
            </div>
            <h4 className="font-bold text-lg">Enterprise Security</h4>
            <p className="text-sm text-blue-100/70">Bank-grade encryption for all your customer data and communications.</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-blue-500/30 rounded flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-100" />
            </div>
            <h4 className="font-bold text-lg">Real-time Insights</h4>
            <p className="text-sm text-blue-100/70">Instant lead scoring and predictive analytics at your fingertips.</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="email"
                  required
                  placeholder="alex@smartcrm.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end pl-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98]",
                isLoading && "opacity-80 cursor-not-allowed shadow-none"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">Don't have an account?</p>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Apply for membership</button>
          </div>
        </motion.div>
      </div>

      {/* Floating accent for mobile */}
      <div className="lg:hidden fixed top-8 left-8 flex items-center gap-2 z-50">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
          S
        </div>
      </div>
    </div>
  );
}
