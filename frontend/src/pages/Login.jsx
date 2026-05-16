import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, Shield, Zap, BarChart3, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { apiError } from '../utils/format';

const Login = () => {
  const { user, login, loading } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login(values);
      navigate('/');
    } catch (error) {
      toast.error(apiError(error));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050810]" style={{ fontFamily: "'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#080e1a] to-[#030608]" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-400/5 blur-[100px] translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/4 blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'linear-gradient(rgba(100,220,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(100,220,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">TeamTask</p>
              <p className="text-slate-500 text-xs">Workspace OS</p>
            </div>
          </div>
        </div>

        {/* Center hero */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">Live workspace</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Command your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
              team's flow
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light">
            Real-time project intelligence, task tracking, and team analytics — all in one obsidian-dark workspace.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { icon: Shield, text: 'Role-based access' },
              { icon: BarChart3, text: 'Live analytics' },
              { icon: Users, text: 'Team visibility' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom stat cards */}
        <motion.div
          className="relative z-10 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {[
            { label: 'Tasks tracked', value: '12,400+' },
            { label: 'Team members', value: '340+' },
            { label: 'Projects closed', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-slate-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#07090f] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none" />

        <motion.div
          className="w-full max-w-sm relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-white font-bold">TeamTask</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">Sign in</h2>
          <p className="text-slate-500 text-sm mb-10">Welcome back. Let's get things done.</p>

          <form onSubmit={submit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Email</label>
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === 'email' ? 'border-cyan-500/60 shadow-[0_0_0_3px_rgba(6,182,212,0.08)]' : 'border-white/[0.08]'} bg-white/[0.04]`}>
                <input
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-3.5 text-white text-sm placeholder:text-slate-600 outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot?</button>
              </div>
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === 'password' ? 'border-cyan-500/60 shadow-[0_0_0_3px_rgba(6,182,212,0.08)]' : 'border-white/[0.08]'} bg-white/[0.04]`}>
                <input
                  type="password"
                  required
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-4 py-3.5 text-white text-sm placeholder:text-slate-600 outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#050810] font-bold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#050810]/30 border-t-[#050810] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-sm text-slate-500">
            New here?{' '}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Create an account
            </Link>
          </p>

          
          
        </motion.div>
      </div>
    </div>
  );
};

export const AuthShell = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#050810] p-6" style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(100,220,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,220,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
    </div>
    <motion.div
      className="w-full max-w-md relative z-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
        <span className="text-white font-bold text-sm">TeamTask</span>
      </div>
      <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
      <p className="text-slate-500 text-sm mb-10">{subtitle}</p>
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  </div>
);

export const FloatingInput = ({ label, type = 'text', value, onChange, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">{label}</span>
    {children || (
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] focus-within:border-cyan-500/60 focus-within:shadow-[0_0_0_3px_rgba(6,182,212,0.08)] transition-all duration-200">
        <input
          className="w-full bg-transparent px-4 py-3.5 text-white text-sm placeholder:text-slate-600 outline-none rounded-xl"
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )}
  </label>
);

export default Login;