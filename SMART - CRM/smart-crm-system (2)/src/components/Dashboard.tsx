import { useEffect, useState } from 'react';
import { Users, Target, ArrowUpRight, TrendingUp, DollarSign, MessageCircle, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';
import { cn } from '../lib/utils';
import { ApiService } from '../services/api';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981', '#f43f5e'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 p-3 shadow-xl rounded-lg ring-1 ring-black/5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 py-0.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-sm font-bold text-gray-900">
              {entry.name}: <span className="text-blue-600">${entry.value.toLocaleString()}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await ApiService.getDashboardStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Optimizing API Request...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat: any) => {
          const Icon = stat.icon === 'Users' ? Users : 
                       stat.icon === 'Target' ? Target :
                       stat.icon === 'TrendingUp' ? TrendingUp : DollarSign;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 text-gray-900 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <DollarSign className="w-32 h-32 text-blue-600" />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Performance</h3>
              <p className="text-sm text-gray-400">Monthly actual vs projected revenue trajectory.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-200" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Forecast</span>
              </div>
            </div>
          </div>
          
          <div className="h-[320px] -ml-4 relative z-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Actual"
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  name="Forecast"
                  stroke="#e0e7ff" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Distribution Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900">Industry Exposure</h3>
            <p className="text-sm text-gray-400">Customer base by segment.</p>
          </div>
          <div className="h-[260px] relative w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={data.industry}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {data.industry.map((entry: any, index: number) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900">100%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calculated</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {data.industry.map((item: any, idx: number) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-xs font-bold text-gray-600">{item.name}</span>
                <span className="text-xs font-bold text-gray-400 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: Leads and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
        {/* Lead Stages Vertical Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Conversion Funnel</h3>
              <p className="text-sm text-gray-400">Lead progression through sales stages.</p>
            </div>
            <Target className="w-8 h-8 text-indigo-100" />
          </div>
          <div className="h-[280px] sm:h-[320px] -ml-4 w-[calc(100%+16px)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.leadStages} layout="vertical" margin={{ left: -10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="stage" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#4b5563' }}
                  width={90}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                          {payload[0].value} Leads
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={24}>
                  {data.leadStages.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-400">Latest updates across your accounts.</p>
            </div>
            <Clock className="w-8 h-8 text-amber-100" />
          </div>
          <div className="space-y-6">
            {[
              { type: 'note', user: 'Alex', action: 'added a note to', target: 'TechFlow Inc.', time: '12m ago', icon: MessageCircle, color: 'blue' },
              { type: 'lead', user: 'Sarah', action: 'moved lead status for', target: 'Green Energy', time: '1h ago', icon: Target, color: 'indigo' },
              { type: 'task', user: 'System', action: 'completed task for', target: 'Creative Studio', time: '3h ago', icon: CheckCircle2, color: 'emerald' },
              { type: 'deal', user: 'Alex', action: 'won the deal with', target: 'Logistics Plus', time: '5h ago', icon: DollarSign, color: 'amber' },
            ].map((activity: any, idx: number) => (
              <div key={idx} className="flex gap-4 group">
                <div className={cn("w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white", `text-${activity.color}-600`)}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 line-clamp-1">
                      <span className="font-bold text-gray-900">{activity.user}</span> {activity.action} <span className="font-bold text-blue-600 cursor-pointer hover:underline">{activity.target}</span>
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex-shrink-0">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold text-xs rounded-xl transition-all border border-gray-100 group">
             View All Activity
             <ArrowUpRight className="w-3 h-3 inline-block ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

