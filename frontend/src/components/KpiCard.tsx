import React from 'react';
import { 
  Camera, 
  ShieldAlert, 
  FolderSearch, 
  HardDrive, 
  Cpu, 
  Layers, 
  Sparkles, 
  UserCheck, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { KpiMetric } from '../types';

interface KpiCardProps {
  metric: KpiMetric;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, onClick }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Camera': return Camera;
      case 'ShieldAlert': return ShieldAlert;
      case 'FolderSearch': return FolderSearch;
      case 'HardDrive': return HardDrive;
      case 'Cpu': return Cpu;
      case 'Layers': return Layers;
      case 'Sparkles': return Sparkles;
      case 'UserCheck': return UserCheck;
      default: return Camera;
    }
  };

  const IconComponent = getIcon(metric.icon);

  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'danger': return 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse';
      case 'warning': return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'purple': return 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30';
      default: return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div
      onClick={onClick}
      className="floating-card p-5 cursor-pointer relative overflow-hidden group border border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Background Accent Gradient Glow on Hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:gradient-bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
          <IconComponent className="w-6 h-6 stroke-[2]" />
        </div>

        {metric.badgeText && (
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${getBadgeStyle(metric.badgeType)}`}>
            {metric.badgeText}
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
          {metric.title}
        </h3>
        
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {metric.value}
          </span>

          <span className={`text-xs font-bold flex items-center gap-0.5 ${
            metric.isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
          }`}>
            {metric.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {metric.change}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium mt-1">
          {metric.subtitle}
        </p>
      </div>
    </div>
  );
};
