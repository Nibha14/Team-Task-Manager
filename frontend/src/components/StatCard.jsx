const StatCard = ({ icon: Icon, label, value, tone = 'blue' }) => {
  const tones = {
    blue: {
      icon: 'from-violet-100 to-violet-50 text-violet-700 ring-violet-200 dark:from-violet-500/25 dark:to-violet-500/5 dark:text-violet-200 dark:ring-violet-400/20',
    },
    green: {
      icon: 'from-emerald-100 to-emerald-50 text-emerald-700 ring-emerald-200 dark:from-emerald-500/25 dark:to-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-400/20',
    },
    orange: {
      icon: 'from-amber-100 to-amber-50 text-amber-700 ring-amber-200 dark:from-amber-500/25 dark:to-amber-500/5 dark:text-amber-200 dark:ring-amber-400/20',
    },
    red: {
      icon: 'from-rose-100 to-rose-50 text-rose-700 ring-rose-200 dark:from-rose-500/25 dark:to-rose-500/5 dark:text-rose-200 dark:ring-rose-400/20',
    },
  };

  return (
    <div className="panel card-hover relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/20" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ${tones[tone].icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;