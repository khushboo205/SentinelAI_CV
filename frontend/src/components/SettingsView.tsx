import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Sliders, 
  Save, 
  CheckCircle2, 
  Bell, 
  Video, 
  Database,
  Lock,
  Key
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [retentionDays, setRetentionDays] = useState(90);
  const [autoSuperRes, setAutoSuperRes] = useState(true);
  const [gpuBatchSize, setGpuBatchSize] = useState(32);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Platform & AI Model Settings
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure computer vision thresholds, GPU batching, storage retention, and API keys
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl gradient-bg-accent text-white font-bold text-xs shadow-md transition hover:opacity-95 flex items-center gap-2"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Successfully!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* AI Model Parameters */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-5">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span>Inference & Detection Engine</span>
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Biometric Match Threshold</span>
              <span className="text-blue-500 font-mono">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">NVIDIA Tensor Batch Size</span>
              <span className="text-purple-500 font-mono">{gpuBatchSize} frames/sec</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="8"
              value={gpuBatchSize}
              onChange={(e) => setGpuBatchSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Auto-Enhance Alert Clips</div>
              <div className="text-[11px] text-slate-400">Trigger Real-ESRGAN on high priority alerts</div>
            </div>
            <input
              type="checkbox"
              checked={autoSuperRes}
              onChange={(e) => setAutoSuperRes(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Storage & Data Retention */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-5">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <HardDrive className="w-4 h-4 text-emerald-500" />
            <span>Forensic Video Retention</span>
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Continuous Recording Storage</span>
              <span className="text-emerald-500 font-mono">{retentionDays} Days</span>
            </div>
            <input
              type="range"
              min="30"
              max="365"
              step="30"
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 space-y-1">
            <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>AES-256 Encrypted Cloud Backup</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evidence artifacts mirrored to immutable cold storage cluster.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
