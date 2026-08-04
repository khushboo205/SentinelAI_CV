import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Sparkles, 
  FolderSearch, 
  FileText, 
  Bot, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Activity,
  Cpu
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard Overview',
      shortLabel: 'Overview',
      icon: LayoutDashboard,
      badge: 'Live'
    },
    {
      id: 'live_monitoring' as NavTab,
      label: 'Live CCTV Feeds',
      shortLabel: 'Monitoring',
      icon: Video,
      badge: '4K'
    },
    {
      id: 'video_enhancement' as NavTab,
      label: 'Video AI Enhancement',
      shortLabel: 'Enhance',
      icon: Sparkles,
      badge: 'SuperRes'
    },
    {
      id: 'investigation' as NavTab,
      label: 'Forensic Workspace',
      shortLabel: 'Investigate',
      icon: FolderSearch,
      badge: 'AI Search'
    },
    {
      id: 'reports' as NavTab,
      label: 'Case Reports & PDF',
      shortLabel: 'Reports',
      icon: FileText
    },
    {
      id: 'ai_assistant' as NavTab,
      label: 'Sentinel AI Assistant',
      shortLabel: 'Assistant',
      icon: Bot,
      badge: 'v4.2'
    },
    {
      id: 'settings' as NavTab,
      label: 'Camera Settings & AI',
      shortLabel: 'Settings',
      icon: Settings
    }
  ];

  return (
    <aside
      className={`fixed left-4 top-24 bottom-6 z-30 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="glass-panel rounded-3xl h-full p-3.5 flex flex-col justify-between shadow-lg relative border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        
        {/* Top: Nav Items */}
        <div className="space-y-1.5">
          {/* Collapse Toggle Button */}
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            {!collapsed && (
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Core OS Modules
              </span>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 ml-auto transition"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 group text-xs font-semibold relative ${
                  isActive
                    ? 'gradient-bg-accent text-white shadow-lg glow-blue scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50/80 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500'
                  }`}
                />

                {!collapsed && (
                  <div className="flex-1 text-left flex items-center justify-between min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom System Status Widget */}
        {!collapsed ? (
          <div className="mt-4 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>NVIDIA H100 GPU</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                Optimal
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full w-[84%]"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
              <span>Memory: 67.2 / 80 GB</span>
              <span className="font-semibold text-purple-400">84% Load</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500" title="GPU Engine Operational">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
