import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Video, 
  Activity, 
  Search, 
  FileText, 
  ShieldAlert,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Crosshair,
  Wand2,
  ListOrdered
} from 'lucide-react';
import { cn } from '../utils';
import type { AgentAnalysis } from '../types';

interface DashboardProps {
  onAnalyze: (file: File) => Promise<void>;
  isAnalyzing: boolean;
  analysis: AgentAnalysis | null;
  progressStep: number;
  uploadedMediaUrl: string | null;
}

const AGENT_STEPS = [
  { id: 1, name: "Frame Selection Agent", icon: Video, description: "Extracting keyframes & dropping duplicates" },
  { id: 2, name: "Quality Analysis Agent", icon: Activity, description: "Assessing blur, noise, and lighting" },
  { id: 3, name: "Enhancement Agent", icon: Wand2, description: "Applying targeted AI restoration" },
  { id: 4, name: "Detection Agent", icon: Crosshair, description: "Identifying suspects and objects" },
  { id: 5, name: "Tracking & Evidence Agent", icon: FileText, description: "Generating cohesive timelines and reports" }
];

export function Dashboard({ onAnalyze, isAnalyzing, analysis, progressStep, uploadedMediaUrl }: DashboardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'detections' | 'timeline' | 'report'>('overview');

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onAnalyze(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAnalyze(file);
  };

  return (
    <div className="flex flex-col gap-6 h-full w-full max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Header */}
      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              SentinelAI <span className="text-indigo-400 font-medium">Forensics</span>
            </h1>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 mt-1">
              Intelligent Multi-Agent Forensic Investigation Platform
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> SYSTEM OPERATIONAL
            </span>
            <span className="text-[10px] text-slate-500 italic mt-1">Multi-Agent Pipeline v2.4.0</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {!analysis && !isAnalyzing ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-md p-12 text-center hover:bg-white/10 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <div className="bg-indigo-500/20 p-5 rounded-full mb-6 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Upload className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">Upload Surveillance Footage</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Drag and drop low-quality CCTV video or images here. SentinelAI will orchestrate multiple specialized agents to recover, enhance, and document critical evidence.
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
            accept="video/*,image/*" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
          >
            Select Media File
          </button>
        </motion.div>
      ) : isAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-8 text-slate-100 flex items-center gap-3">
             <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
             Agent Stack Processing...
          </h2>
          <div className="w-full space-y-4">
            {AGENT_STEPS.map((step, index) => {
              const isActive = progressStep === step.id;
              const isCompleted = progressStep > step.id;
              const isPending = progressStep < step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500",
                    isActive ? "bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] scale-[1.02]" : 
                    isCompleted ? "bg-white/5 border-emerald-500/30 backdrop-blur-md" : 
                    "bg-white/5 border-white/5 backdrop-blur-md opacity-40"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl flex-shrink-0",
                    isActive ? "bg-indigo-500 text-white animate-pulse" :
                    isCompleted ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-white/10 text-slate-400"
                  )}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={cn(
                      "font-bold",
                      isActive ? "text-indigo-300" :
                      isCompleted ? "text-slate-200" :
                      "text-slate-400"
                    )}>{step.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                  </div>
                  <div>
                    {isActive ? (
                      <span className="text-[10px] px-2 py-1 bg-indigo-500 text-white rounded font-bold uppercase">Active</span>
                    ) : isCompleted ? (
                      <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded font-bold uppercase border border-emerald-500/30">Done</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : analysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
          
          {/* Left Column: Media & Quick Stats */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
              <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Video className="w-4 h-4 text-indigo-400" />
                  Source Media
                </h3>
              </div>
              <div className="aspect-video bg-[#050508] relative flex items-center justify-center overflow-hidden">
                {uploadedMediaUrl ? (
                  <img src={uploadedMediaUrl} alt="Analyzed Media" className="w-full h-full object-contain opacity-80 mix-blend-screen" />
                ) : (
                  <div className="text-slate-600 flex flex-col items-center">
                    <Video className="w-8 h-8 mb-2" />
                    <span className="text-sm">Media Preview</span>
                  </div>
                )}
                {/* Simulated tracking overlay */}
                <div className="absolute inset-0 pointer-events-none p-4">
                   <div className="w-32 h-48 border-2 border-emerald-400/80 absolute top-1/4 left-1/3 rounded-lg shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      <div className="absolute top-0 right-0 -mr-2 -mt-2 px-1.5 py-0.5 bg-emerald-500 text-[8px] font-bold text-slate-950 rounded-sm">TARGET</div>
                   </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/5">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-indigo-400" />
                  Models Applied
                </span>
                <span className="text-[10px] px-2 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-md font-bold">
                  {analysis.enhancementAgent.length} ACTIVE
                </span>
              </div>
            </div>

            {/* Quality Summary */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Initial Quality Assessment
              </h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {analysis.qualityAgent.summary}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Blur</div>
                  <div className={cn("text-sm font-bold", analysis.qualityAgent.blurLevel === 'High' ? 'text-rose-400' : 'text-emerald-400')}>
                    {analysis.qualityAgent.blurLevel}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Light</div>
                  <div className={cn("text-sm font-bold", analysis.qualityAgent.lighting === 'Poor' ? 'text-amber-400' : 'text-emerald-400')}>
                    {analysis.qualityAgent.lighting}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Noise</div>
                  <div className={cn("text-sm font-bold", analysis.qualityAgent.noise === 'High' ? 'text-rose-400' : 'text-emerald-400')}>
                    {analysis.qualityAgent.noise}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Analysis */}
          <div className="lg:col-span-2 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex border-b border-white/10 bg-black/20 p-3 gap-2 overflow-x-auto hide-scrollbar">
              <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Wand2} label="Enhancements" />
              <TabButton active={activeTab === 'detections'} onClick={() => setActiveTab('detections')} icon={Crosshair} label="Detections" />
              <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={ListOrdered} label="Timeline" />
              <TabButton active={activeTab === 'report'} onClick={() => setActiveTab('report')} icon={FileText} label="Final Report" />
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-indigo-400" /> Applied Enhancements
                    </h3>
                    <div className="grid gap-4">
                      {analysis.enhancementAgent.map((enhancement, i) => (
                        <div key={i} className="flex gap-4 items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl shrink-0 border border-indigo-500/30">
                            <Wand2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-200">{enhancement.technique}</h4>
                            <p className="text-xs text-slate-400 mt-1">{enhancement.reason}</p>
                          </div>
                          <div className="text-right shrink-0 border-l border-white/10 pl-4">
                            <div className="text-lg font-bold text-emerald-400">
                              {(enhancement.confidenceScore * 100).toFixed(0)}%
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'detections' && (
                  <motion.div key="detections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-indigo-400" /> Objects & Subjects Detected
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.detectionAgent.map((det, i) => (
                        <div key={i} className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                              <span className="font-bold text-slate-200">{det.object}</span>
                            </div>
                            <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{det.timestamp}</span>
                          </div>
                          <div className="mt-auto">
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                              <span>Confidence</span>
                              <span className="text-emerald-400">{(det.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${det.confidence * 100}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'timeline' && (
                  <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                       <ListOrdered className="w-4 h-4 text-indigo-400" /> Tracking Timeline
                    </h3>
                    <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-white/10 ml-2">
                      {analysis.trackingAgent.map((track, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[32px] top-1.5 w-3 h-3 bg-indigo-500 rounded-full border-[3px] border-[#0a0a0f] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                          <div className="bg-white/5 p-4 rounded-xl border border-white/10 ml-4 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-indigo-300">{track.subject}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-400 bg-black/30 px-2 py-1 rounded border border-white/5">{track.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">{track.movement}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'report' && (
                  <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-400" /> Investigation Summary
                      </h3>
                      <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-lg transition-colors border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        Export PDF
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Incident Overview</h4>
                         <div className="bg-white/5 p-5 rounded-xl border border-white/10 border-l-2 border-l-indigo-500">
                           <p className="text-slate-200 leading-relaxed m-0 text-sm">
                             {analysis.evidenceAgent.incidentSummary}
                           </p>
                         </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Key Findings</h4>
                        <ul className="space-y-3">
                          {analysis.evidenceAgent.keyFindings.map((finding, i) => (
                            <li key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              <span className="text-slate-300 text-sm mt-0.5">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Area Risk Heatmap</h4>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex items-center justify-between">
                           <span className="text-slate-300 text-sm">Highest activity density detected in:</span>
                           <span className="px-4 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(244,63,94,0.15)]">
                             {analysis.evidenceAgent.riskHeatmapArea}
                           </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: React.ElementType, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0",
        active 
          ? "bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/30" 
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
