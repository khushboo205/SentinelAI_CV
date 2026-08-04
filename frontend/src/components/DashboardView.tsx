import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Video, 
  Activity, 
  ArrowRight, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  Eye, 
  SlidersHorizontal,
  Flame,
  Zap
} from 'lucide-react';
import { KpiMetric, AIAlertItem, CameraFeed, NavTab } from '../types';
import { KpiCard } from './KpiCard';

interface DashboardViewProps {
  metrics: KpiMetric[];
  alerts: AIAlertItem[];
  cameras: CameraFeed[];
  onTabChange: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  alerts,
  cameras,
  onTabChange,
  onOpenAiAssistant
}) => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'faces' | 'vehicles' | 'anomalies'>('all');

  // Chart data simulation points
  const chartPoints = [
    { time: '00:00', total: 42, faces: 18, vehicles: 20, anomalies: 4 },
    { time: '04:00', total: 28, faces: 10, vehicles: 15, anomalies: 3 },
    { time: '08:00', total: 115, faces: 65, vehicles: 45, anomalies: 5 },
    { time: '12:00', total: 184, faces: 95, vehicles: 72, anomalies: 17 },
    { time: '16:00', total: 210, faces: 110, vehicles: 86, anomalies: 14 },
    { time: '20:00', total: 145, faces: 72, vehicles: 61, anomalies: 12 },
    { time: 'Now', total: 168, faces: 88, vehicles: 68, anomalies: 12 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl relative overflow-hidden shadow-xl border border-blue-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Sentinel Computer Vision Engine v4.2 Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              AI CCTV Forensic Monitoring & Investigation
            </h1>
            <p className="text-sm text-blue-100 font-medium leading-relaxed">
              Real-time multi-camera batch inference operational. 128 streams monitored, super-resolution ready, 3 high-priority forensic alerts pending review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onTabChange('live_monitoring')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-lg transition flex items-center gap-2 active:scale-95"
            >
              <Video className="w-4 h-4 text-blue-600" />
              <span>Launch Live Monitor Grid</span>
            </button>
            
            <button
              onClick={() => onTabChange('video_enhancement')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold transition flex items-center gap-2 backdrop-blur-md active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>AI Video Enhancer</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span>Platform Metrics & System Telemetry</span>
          </h2>
          <span className="text-xs font-medium text-slate-400">Refreshed: Just now (100ms sync)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} onClick={() => onTabChange('live_monitoring')} />
          ))}
        </div>
      </div>

      {/* Main Grid: AI Detections Analytics + Real-time Alert Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Analytics Chart */}
        <div className="lg:col-span-2 floating-card p-6 border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-500 animate-pulse" />
                <span>Computer Vision Object Detections</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time object classification across all active CCTV feeds</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Category Filter Pills */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
                {(['all', 'faces', 'vehicles', 'anomalies'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition ${
                      selectedFilter === filter
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold">
                {(['24h', '7d', '30d'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-1 rounded-lg uppercase transition ${
                      timeframe === tf
                        ? 'gradient-bg-accent text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SVG Custom Bar & Trend Chart */}
          <div className="mt-6">
            <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
              {chartPoints.map((pt, idx) => {
                const val = selectedFilter === 'all' 
                  ? pt.total 
                  : selectedFilter === 'faces' 
                  ? pt.faces 
                  : selectedFilter === 'vehicles' 
                  ? pt.vehicles 
                  : pt.anomalies;

                const maxVal = 220;
                const heightPct = Math.round((val / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xl whitespace-nowrap mb-1">
                      {val} Detections ({pt.time})
                    </div>
                    
                    {/* Bar */}
                    <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800/60 rounded-xl h-full flex items-end p-1 relative overflow-hidden">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full rounded-lg gradient-bg-accent group-hover:brightness-125 transition-all duration-500 relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-t-lg"></div>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-slate-400 mt-1">{pt.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Facial Recognition (88/hr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">License Plate LPR (68/hr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Anomalous Behavior (12/hr)</span>
                </div>
              </div>

              <button 
                onClick={() => onTabChange('investigation')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Deep Search Detections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live AI Alert Feed */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Priority Alerts
                </h3>
              </div>
              <span className="text-[11px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                {alerts.length} Flagged
              </span>
            </div>

            {/* Alert List */}
            <div className="mt-4 space-y-3">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => onTabChange('live_monitoring')}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200/60 dark:border-slate-700/50 group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={alt.thumbnailUrl}
                      alt="Alert"
                      className="w-14 h-14 rounded-xl object-cover border border-slate-300 dark:border-slate-700 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">
                          {alt.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">{alt.timestamp}</span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {alt.description}
                      </p>

                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-slate-400 truncate max-w-[130px]">{alt.cameraName}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-0.5">
                          Inspect Feed <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onOpenAiAssistant}
              className="w-full py-2.5 rounded-xl gradient-bg-soft text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-500/20 border border-blue-500/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Ask AI Assistant to Analyze Alerts</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section: Active CCTV Camera Grid Quick Status & Threat Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active Feeds Snippet */}
        <div className="md:col-span-2 floating-card p-6 border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-500" />
              <span>Active CCTV Security Streams</span>
            </h3>
            <button
              onClick={() => onTabChange('live_monitoring')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All 128 Cameras</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {cameras.slice(0, 3).map((cam) => (
              <div
                key={cam.id}
                onClick={() => onTabChange('live_monitoring')}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 relative group cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img src={cam.thumbnailUrl} alt={cam.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-bold border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{cam.resolution}</span>
                  </div>

                  {cam.status === 'alert' && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold animate-bounce shadow-lg">
                      AI ALERT
                    </div>
                  )}

                  <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent text-white">
                    <div className="text-xs font-bold truncate">{cam.name}</div>
                    <div className="text-[10px] text-slate-300 flex items-center justify-between mt-0.5">
                      <span>{cam.area}</span>
                      <span className="text-emerald-400 font-semibold">{cam.fps} FPS</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Level Distribution Widget */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Flame className="w-5 h-5 text-amber-500" />
            <span>Threat Heatmap Breakdown</span>
          </h3>

          <div className="space-y-4 mt-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-500">North Perimeter (High Risk)</span>
                <span className="text-slate-900 dark:text-slate-100">82% Threat Index</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-full rounded-full w-[82%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-500">Parking Complex (Medium)</span>
                <span className="text-slate-900 dark:text-slate-100">54% Threat Index</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-full rounded-full w-[54%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-500">Interior Atrium (Clear)</span>
                <span className="text-slate-900 dark:text-slate-100">12% Threat Index</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-full rounded-full w-[12%]"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Automated patrol AI dispatch is active for North Sector.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
