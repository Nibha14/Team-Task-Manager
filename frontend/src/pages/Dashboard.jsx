import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock, FolderOpen, LayoutGrid, TimerOff, TrendingUp, Activity, Zap, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import Spinner from '../components/Spinner';
import Badge from '../components/Badge';
import api from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { formatDate, statusLabels } from '../utils/format';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const chartDefaults = {
  plugins: { legend: { display: false }, tooltip: {
    backgroundColor: '#0d1117',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    titleColor: '#dbe0e8',
    bodyColor: '#94a3b8',
    padding: 12,
    cornerRadius: 10,
  }},
};

const Dashboard = () => {
  const { data, loading } = useFetch(() => api.get('/dashboard'), []);

  if (loading) return <Spinner label="Loading dashboard" />;

  const completion = data.stats.totalTasks
    ? Math.round((data.stats.completedTasks / data.stats.totalTasks) * 100)
    : 0;

  const statusColors = ['#22d3ee', '#38bdf8', '#0e7490', '#164e63'];
  const priorityColors = ['#f43f5e', '#22d3ee', '#10b981'];

  const statusData = {
    labels: data.charts.byStatus.map((i) => statusLabels[i.status]),
    datasets: [{
      data: data.charts.byStatus.map((i) => i._count.status),
      backgroundColor: statusColors,
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  const priorityData = {
    labels: data.charts.byPriority.map((i) => i.priority),
    datasets: [{
      label: 'Tasks',
      data: data.charts.byPriority.map((i) => i._count.priority),
      backgroundColor: priorityColors,
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const stats = [
    { icon: FolderOpen, label: 'Projects', value: data.stats.totalProjects, accent: 'cyan' },
    { icon: LayoutGrid, label: 'Total Tasks', value: data.stats.totalTasks, accent: 'slate' },
    { icon: CheckCircle2, label: 'Completed', value: data.stats.completedTasks, accent: 'emerald' },
    { icon: Clock, label: 'Pending', value: data.stats.pendingTasks, accent: 'amber' },
    { icon: TimerOff, label: 'Overdue', value: data.stats.overdueTasks, accent: 'rose' },
  ];

  const accentMap = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400', glow: 'shadow-cyan-500/20', bar: 'from-cyan-400 to-cyan-600' },
    slate: { bg: 'bg-slate-400/10', border: 'border-slate-400/20', icon: 'text-slate-300', glow: 'shadow-slate-400/10', bar: 'from-slate-400 to-slate-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400', glow: 'shadow-emerald-500/20', bar: 'from-emerald-400 to-teal-500' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', glow: 'shadow-amber-500/20', bar: 'from-amber-400 to-orange-500' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: 'text-rose-400', glow: 'shadow-rose-500/20', bar: 'from-rose-400 to-red-500' },
  };

  return (
    <motion.div
      className="space-y-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
            Live overview
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="mt-1 text-slate-500 text-sm">Real-time team performance and task intelligence.</p>
        </div>

        {/* Productivity chip */}
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5 self-start sm:self-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
            <TrendingUp className="w-4 h-4 text-[#050810]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Completion rate</p>
            <p className="text-xl font-black text-white">{completion}%</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ icon: Icon, label, value, accent }, i) => {
          const a = accentMap[accent];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center shadow-lg ${a.glow}`}>
                  <Icon className={`w-4.5 h-4.5 ${a.icon}`} size={18} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-500 transition-colors" />
              </div>
              <p className="text-3xl font-black text-white mb-1">{value}</p>
              <p className="text-slate-500 text-xs font-medium">{label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Status donut */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-lg">Task breakdown</h2>
              <p className="text-slate-500 text-sm">Status distribution across all work</p>
            </div>
            <div className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold">{completion}% done</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="w-48 mx-auto lg:mx-0">
              <Doughnut
                data={statusData}
                options={{ ...chartDefaults, cutout: '75%' }}
              />
            </div>
            <div className="space-y-4">
              {data.charts.byStatus.map((item, i) => {
                const pct = data.stats.totalTasks
                  ? Math.round((item._count.status / data.stats.totalTasks) * 100)
                  : 0;
                return (
                  <div key={item.status}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[i] }} />
                        <span className="text-slate-300 text-sm font-medium">{statusLabels[item.status]}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">{item._count.status} tasks</span>
                        <span className="text-white text-sm font-bold w-10 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: statusColors[i] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Priority bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-6"
        >
          <h2 className="text-white font-bold text-lg mb-1">Priority mix</h2>
          <p className="text-slate-500 text-sm mb-6">How work is weighted today</p>
          <Bar
            data={priorityData}
            options={{
              ...chartDefaults,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { precision: 0, color: '#475569', font: { size: 11 } },
                  grid: { color: 'rgba(255,255,255,0.04)' },
                  border: { display: false },
                },
                x: {
                  ticks: { color: '#475569', font: { size: 12, weight: '600' } },
                  grid: { display: false },
                  border: { display: false },
                },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-lg">Recent activity</h2>
              <p className="text-slate-500 text-sm">Latest task updates across projects</p>
            </div>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="space-y-3">
            {data.recentActivities.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-200 group cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400/70 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{item.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">
                    {item.project} · {item.assignee}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusPill status={item.status} />
                  <p className="text-slate-600 text-xs hidden sm:block">{formatDate(item.createdAt)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Overdue alert */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-rose-500/15 to-red-900/10 border border-rose-500/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl translate-x-8 -translate-y-8" />
            <AlertTriangle className="w-7 h-7 text-rose-400 mb-6" />
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-2">Overdue alert</p>
            <p className="text-5xl font-black text-white mb-2">{data.stats.overdueTasks}</p>
            <p className="text-rose-400/70 text-sm">
              {data.stats.overdueTasks === 0
                ? "All clear — nothing overdue."
                : "Tasks need immediate attention."}
            </p>
          </motion.div>

          {/* Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-6"
          >
            <h2 className="text-white font-bold mb-4">Upcoming deadlines</h2>
            <div className="space-y-3">
              {data.recentActivities.slice(0, 3).map((item, i) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ backgroundColor: ['#22d3ee', '#38bdf8', '#0891b2'][i] }}
                  />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-sm font-semibold truncate">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{item.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    Completed: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    Overdue: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
    InProgress: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
    Pending: 'bg-slate-400/10 text-slate-400 border-slate-400/20',
  };
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${map[status] || map.Pending}`}>
      {statusLabels[status] || status}
    </span>
  );
};

export default Dashboard;