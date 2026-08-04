import React, { useState } from 'react';
import { 
  Video, 
  Grid, 
  Square, 
  Maximize2, 
  Camera as CameraIcon, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Sparkles,
  Eye,
  Activity,
  AlertTriangle,
  ZoomIn
} from 'lucide-react';
import { CameraFeed, NavTab } from '../types';

interface LiveMonitoringViewProps {
  cameras: CameraFeed[];
  onTabChange: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
}

export const LiveMonitoringView: React.FC<LiveMonitoringViewProps> = ({
  cameras,
  onTabChange,
  onOpenAiAssistant
}) => {
  const [layout, setLayout] = useState<'4-grid' | '6-grid' | 'single'>('4-grid');
  const [selectedCamId, setSelectedCamId] = useState<string>(cameras[0].id);
  const [showAiBoxes, setShowAiBoxes] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timelineVal, setTimelineVal] = useState<number>(100); // 100% = Live
  const [muted, setMuted] = useState<boolean>(true);
  const [snapshotTaken, setSnapshotTaken] = useState<string | null>(null);

  const activeCam = cameras.find((c) => c.id === selectedCamId) || cameras[0];

  const handleSnapshot = () => {
    setSnapshotTaken(`Snapshot created for ${activeCam.name} at 14:28:12 (Forensic Hash: #90412)`);
    setTimeout(() => setSnapshotTaken(null), 4000);
  };

  const displayedCameras = layout === 'single'
    ? [activeCam]
    : layout === '4-grid'
    ? cameras.slice(0, 4)
    : cameras.slice(0, 6);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Controls Header */}
      <div className="floating-card p-5 border border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Live CCTV Security Monitor</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                128 Feeds Synchronized
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active multi-stream computer vision tracking with bounding box AI overlays
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* AI Bounding Box Toggle */}
          <button
            onClick={() => setShowAiBoxes(!showAiBoxes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
              showAiBoxes
                ? 'gradient-bg-soft text-blue-600 dark:text-blue-400 border-blue-500/40 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${showAiBoxes ? 'text-purple-500' : ''}`} />
            <span>AI Bounding Box Overlay ({showAiBoxes ? 'ON' : 'OFF'})</span>
          </button>

          {/* Grid Layout Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLayout('single')}
              className={`p-1.5 rounded-lg transition ${
                layout === 'single' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'
              }`}
              title="Single Focus View"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('4-grid')}
              className={`p-1.5 rounded-lg transition ${
                layout === '4-grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'
              }`}
              title="4-Camera Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('6-grid')}
              className={`p-1.5 rounded-lg transition ${
                layout === '6-grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'
              }`}
              title="6-Camera Grid"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onTabChange('video_enhancement')}
            className="px-3.5 py-1.5 rounded-xl gradient-bg-accent text-white text-xs font-bold shadow-md transition hover:opacity-95 active:scale-95"
          >
            Enhance Frame with AI →
          </button>

        </div>
      </div>

      {/* Snapshot Toast Notification */}
      {snapshotTaken && (
        <div className="floating-card p-3 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{snapshotTaken}</span>
          </div>
          <button 
            onClick={() => onTabChange('investigation')} 
            className="px-2.5 py-1 rounded bg-white text-emerald-700 font-extrabold text-[10px] hover:bg-emerald-50"
          >
            Open in Evidence Panel
          </button>
        </div>
      )}

      {/* Camera Stream Grid & Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Camera Video Display Grid */}
        <div className={`lg:col-span-3 grid gap-4 ${
          layout === 'single'
            ? 'grid-cols-1'
            : layout === '4-grid'
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {displayedCameras.map((cam) => {
            const isFocused = cam.id === activeCam.id;

            return (
              <div
                key={cam.id}
                onClick={() => setSelectedCamId(cam.id)}
                className={`floating-card rounded-2xl overflow-hidden relative bg-slate-950 border transition-all duration-300 group cursor-pointer ${
                  isFocused 
                    ? 'ring-2 ring-blue-500/80 border-blue-500/50 shadow-xl' 
                    : 'border-slate-800 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Video Feed Simulation */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={cam.thumbnailUrl}
                    alt={cam.name}
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                  />

                  {/* Laser Scanning Line Animation */}
                  <div className="animate-scan opacity-40 pointer-events-none"></div>

                  {/* AI Bounding Box Overlays */}
                  {showAiBoxes && cam.aiBoundingBoxes && cam.aiBoundingBoxes.map((bbox) => (
                    <div
                      key={bbox.id}
                      style={{
                        left: `${bbox.box.x}%`,
                        top: `${bbox.box.y}%`,
                        width: `${bbox.box.w}%`,
                        height: `${bbox.box.h}%`,
                        borderColor: bbox.color
                      }}
                      className="absolute border-2 rounded-lg pointer-events-none shadow-lg animate-pulse-slow flex flex-col justify-between p-1 bg-blue-500/5"
                    >
                      <div
                        style={{ backgroundColor: bbox.color }}
                        className="text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow self-start truncate max-w-full"
                      >
                        {bbox.label}
                      </div>

                      <div className="text-[8px] font-mono text-white/80 self-end bg-slate-900/80 px-1 rounded">
                        CONF: {Math.round(bbox.confidence * 100)}%
                      </div>
                    </div>
                  ))}

                  {/* Top Bar Overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        REC
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-200 border border-white/20">
                        {cam.resolution}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-extrabold border ${
                      cam.status === 'alert'
                        ? 'bg-red-500/80 text-white border-red-400 animate-bounce'
                        : 'bg-emerald-500/80 text-white border-emerald-400'
                    }`}>
                      {cam.status === 'alert' ? 'AI THREAT ALERT' : 'STREAM ONLINE'}
                    </span>
                  </div>

                  {/* Bottom Bar Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white pointer-events-none flex items-end justify-between">
                    <div>
                      <div className="text-xs font-extrabold">{cam.name}</div>
                      <div className="text-[10px] text-slate-300">{cam.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-emerald-400">{cam.fps} FPS</div>
                      <div className="text-[9px] text-slate-400 font-mono">{cam.bitrate}</div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Sidebar: Active Camera Controls & Alert Log Ticker */}
        <div className="space-y-4">
          
          {/* Active Camera Inspection Controls */}
          <div className="floating-card p-5 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {activeCam.name}
              </h3>
              <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                {activeCam.id}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Location:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{activeCam.area}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Resolution:</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{activeCam.resolution}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Active Detections:</span>
                <span className="font-semibold text-purple-500">{activeCam.activeDetections.length} Identified</span>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleSnapshot}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <CameraIcon className="w-3.5 h-3.5 text-blue-500" />
                <span>Take Snapshot</span>
              </button>

              <button
                onClick={() => setMuted(!muted)}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {muted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{muted ? 'Audio Off' : 'Audio On'}</span>
              </button>
            </div>

            <button
              onClick={() => onTabChange('video_enhancement')}
              className="w-full py-2.5 rounded-xl gradient-bg-accent text-white font-bold text-xs shadow-md transition hover:opacity-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Send Frame to AI Enhancer</span>
            </button>
          </div>

          {/* Real-time AI Event Ticker */}
          <div className="floating-card p-5 border border-slate-200/80 dark:border-slate-800/80">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-500 animate-pulse" />
              <span>Live Computer Vision Feed</span>
            </h4>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs">
                <div className="flex items-center justify-between font-bold text-red-600 dark:text-red-400">
                  <span>POI #812 Matched</span>
                  <span className="text-[10px]">14:28:12</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Facial score: 94.8% on CAM-101 North Gate.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                <div className="flex items-center justify-between font-bold text-blue-600 dark:text-blue-400">
                  <span>LPR Plate Identified</span>
                  <span className="text-[10px]">14:15:40</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  TX-7918 Dark Blue Sedan on CAM-102.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-600 dark:text-amber-400">
                  <span>Unattended Bag</span>
                  <span className="text-[10px]">14:12:00</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Motionless for &gt;10 min on CAM-105 Loading Dock.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Timeline Scrubbing Bar */}
      <div className="floating-card p-4 border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-xl gradient-bg-accent text-white flex items-center justify-center shadow transition active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                {timelineVal === 100 ? '● LIVE SYNCHRONIZED' : 'REPLAY MODE: 14:18:02'}
              </span>
              <p className="text-[11px] text-slate-400">Scrub timeline to inspect past frames</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimelineVal(100)}
              className="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition border border-red-500/20"
            >
              Return to Live (100%)
            </button>
          </div>
        </div>

        {/* Timeline Slider Range */}
        <div className="relative flex items-center mt-2">
          <input
            type="range"
            min="0"
            max="100"
            value={timelineVal}
            onChange={(e) => setTimelineVal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>12:00:00 (2h ago)</span>
          <span>13:00:00</span>
          <span>14:00:00</span>
          <span className="font-bold text-red-500">14:28:12 (LIVE)</span>
        </div>
      </div>

    </div>
  );
};
