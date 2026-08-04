import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Sparkles, 
  Plus, 
  ChevronDown, 
  Building2, 
  ShieldCheck, 
  SlidersHorizontal,
  X,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ThemeMode, NavTab, AIAlertItem } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
  unreadAlertsCount: number;
  alerts: AIAlertItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activeTab,
  onTabChange,
  onOpenAiAssistant,
  unreadAlertsCount,
  alerts
}) => {
  const [workspace, setWorkspace] = useState('Metropolitan District #4 - Sector B');
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const workspaces = [
    'Metropolitan District #4 - Sector B',
    'International Airport Terminal 2',
    'Central Financial District Vaults',
    'East Transit Hub Monitoring'
  ];

  return (
    <header className="sticky top-0 z-40 px-4 md:px-6 pt-3 pb-3">
      <div className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm transition-all duration-300">
        
        {/* Left: Brand & Workspace Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-xl gradient-bg-accent flex items-center justify-center text-white shadow-md glow-blue">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight gradient-text-primary">SentinelAI</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium -mt-0.5">Forensic CCTV OS</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block mx-1"></div>

          {/* Workspace Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/50 transition"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span className="max-w-[180px] truncate">{workspace}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute left-0 mt-2 w-64 floating-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Security Zone
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws}
                    onClick={() => {
                      setWorkspace(ws);
                      setShowWorkspaceMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-800/60 transition ${
                      workspace === ws ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{ws}</span>
                    {workspace === ws && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle: Floating Interactive Global Search */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras, POI suspects, plates, alerts (Ctrl + K)..."
              className="w-full pl-10 pr-12 py-2 text-xs rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
            />
            <div className="absolute right-3 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* AI Assistant Quick Trigger Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl gradient-bg-soft hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-semibold shadow-sm transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Quick Action (+ Investigation) */}
          <button
            onClick={() => onTabChange('investigation')}
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl gradient-bg-accent hover:opacity-95 text-white text-xs font-semibold shadow-sm transition active:scale-95 glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>New Investigation</span>
          </button>

          {/* Theme Switcher Toggle Key */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 transition active:scale-90"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Notifications Flyout */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 transition relative"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 floating-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Computer Vision Alerts</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {alerts.length} New
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {alerts.map((alt) => (
                    <div 
                      key={alt.id} 
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer flex gap-3 items-start"
                      onClick={() => {
                        onTabChange('live_monitoring');
                        setShowNotifications(false);
                      }}
                    >
                      <img 
                        src={alt.thumbnailUrl} 
                        alt="Alert thumb" 
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {alt.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {alt.description}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] font-medium text-slate-400">{alt.cameraName}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            alt.severity === 'high' 
                              ? 'bg-red-500/10 text-red-500' 
                              : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {alt.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 px-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button 
                    onClick={() => {
                      onTabChange('live_monitoring');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View All Active Stream Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Det. Sarah Vance"
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-blue-500/40"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
                Det. S. Vance
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 floating-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Senior Det. Sarah Vance</div>
                  <div className="text-[11px] text-slate-400">Chief Forensics Lead (Level 5)</div>
                </div>
                <button 
                  onClick={() => { onTabChange('settings'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Platform Settings</span>
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                  <div className="px-3 py-1.5 text-[10px] text-emerald-500 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Biometric Key Authenticated
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
