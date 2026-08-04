import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  Download, 
  FileText, 
  RefreshCw, 
  Layers, 
  Eye, 
  Split, 
  ShieldCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import { NavTab } from '../types';

interface VideoEnhancementViewProps {
  onTabChange: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
  onAnalyzeMedia?: (file: File) => void;
}

export const VideoEnhancementView: React.FC<VideoEnhancementViewProps> = ({
  onTabChange,
  onOpenAiAssistant,
  onAnalyzeMedia
}) => {
  const [activeModel, setActiveModel] = useState<string>('SuperRes 4x-CCTV');
  const [sharpness, setSharpness] = useState<number>(75);
  const [denoise, setDenoise] = useState<number>(60);
  const [lowLight, setLowLight] = useState<number>(85);
  const [upscaleScale, setUpscaleScale] = useState<'2x' | '4x' | '8x'>('4x');
  const [sliderPos, setSliderPos] = useState<number>(50); // Split slider position
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(100);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [customFileUrl, setCustomFileUrl] = useState<string | null>(null);

  const models = [
    { id: 'SuperRes 4x-CCTV', label: 'SuperRes 4x-CCTV', desc: 'Deep Convolutional Upscaling for CCTV' },
    { id: 'DeBlur-GAN v3', label: 'DeBlur-GAN v3', desc: 'Restores Fast Motion & Lens Blur' },
    { id: 'NightVision-Pro', label: 'NightVision-Pro', desc: 'Zero-DCE Low-Light Illumination' },
    { id: 'FaceID-Restore', label: 'FaceID-Restore', desc: 'Generative Facial Feature Reconstruction' },
    { id: 'License Plate Unblur', label: 'License Plate Unblur', desc: 'Dedicated LPR Character Reconstruction' }
  ];

  const handleRunEnhancement = () => {
    setIsProcessing(true);
    setProgressStep(15);

    const interval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFileUrl(url);
      setIsCustomUpload(true);
      if (onAnalyzeMedia) {
        onAnalyzeMedia(file);
      }
      handleRunEnhancement();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              AI Video & Frame Super-Resolution Studio
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Enhance low-resolution CCTV footage using neural generative models (DeBlur-GAN, Real-ESRGAN, Zero-DCE)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="px-4 py-2 rounded-xl gradient-bg-soft text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold shadow-sm transition hover:bg-blue-500/20 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-500" />
            <span>Upload Surveillance File</span>
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => onTabChange('investigation')}
            className="px-4 py-2 rounded-xl gradient-bg-accent text-white text-xs font-bold shadow-md transition hover:opacity-95 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open in Forensic Workspace</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: AI Model Pills + Interactive Split Slider + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Split-Screen Comparison View */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* AI Model Selector Pills */}
          <div className="floating-card p-3 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModel(m.id);
                  handleRunEnhancement();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                  activeModel === m.id
                    ? 'gradient-bg-accent text-white border-blue-500 shadow-md glow-blue scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-200'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${activeModel === m.id ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Split-Screen / Slider Visual Preview */}
          <div className="floating-card rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-950 relative aspect-[16/9]">
            
            {/* Original Low-Res / Blurry Image (Left side) */}
            <img
              src={customFileUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=40'}
              alt="Original CCTV Source"
              className="absolute inset-0 w-full h-full object-cover filter blur-[3px] brightness-[0.7] contrast-[0.9]"
            />

            {/* AI Enhanced Crystal Clear Image (Right side clipped by slider) */}
            <div
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={customFileUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=95'}
                alt="AI Enhanced CCTV"
                className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.15]"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-lg border border-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-white" />
                <span>AI SUPER-RESOLUTION (4K RESTORED)</span>
              </div>
            </div>

            {/* Original Badge (Left) */}
            <div className="absolute top-4 left-4 bg-slate-900/80 text-slate-300 font-bold text-[10px] px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
              ORIGINAL RAW CCTV (480p Low-Light)
            </div>

            {/* Split Slider Handle Bar */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center pointer-events-none"
            >
              <div className="w-8 h-8 rounded-full bg-white text-blue-600 shadow-2xl flex items-center justify-center -ml-3.5 border-2 border-blue-500">
                <Split className="w-4 h-4" />
              </div>
            </div>

            {/* Transparent HTML Input Range Overlay for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />

            {/* Processing Overlay Loading Animation */}
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-4 text-white p-6">
                <div className="w-16 h-16 rounded-2xl gradient-bg-accent flex items-center justify-center animate-spin glow-purple">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold">Executing {activeModel}...</h3>
                  <p className="text-xs text-slate-400">Tensor batching on 8x NVIDIA H100 cores</p>
                </div>
                <div className="w-64 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div style={{ width: `${progressStep}%` }} className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300"></div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400">{progressStep}% Completed</span>
              </div>
            )}

          </div>

          {/* Bottom Interactive Bar: Slider Position Label & Export */}
          <div className="floating-card p-4 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-slate-500">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>Drag slider left/right to compare Original vs Enhanced</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRunEnhancement}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Re-Process Frame</span>
              </button>

              <button className="px-4 py-1.5 rounded-xl gradient-bg-accent text-white font-bold shadow-md transition hover:opacity-95 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Export Enhanced HD Video (MP4)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Fine-Tuning Enhancement Sliders */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-500" />
              <span>Model Parameters</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Fine-tune generative restoration strength</p>
          </div>

          {/* Upscale Resolution Multiplier */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
              <span>Super-Resolution Scale</span>
              <span className="text-blue-500 font-mono">{upscaleScale}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['2x', '4x', '8x'] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => { setUpscaleScale(scale); handleRunEnhancement(); }}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    upscaleScale === scale
                      ? 'gradient-bg-accent text-white border-blue-500 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {scale} Upscale
                </button>
              ))}
            </div>
          </div>

          {/* Sharpness Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Edge Sharpness Gain</span>
              <span className="text-blue-500 font-mono">{sharpness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sharpness}
              onChange={(e) => setSharpness(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Denoise Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Sensor Denoise Multiplier</span>
              <span className="text-purple-500 font-mono">{denoise}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={denoise}
              onChange={(e) => setDenoise(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Low Light Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Zero-DCE Low-Light Gain</span>
              <span className="text-amber-500 font-mono">{lowLight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={lowLight}
              onChange={(e) => setLowLight(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Forensic Watermark Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Court-Admissible Verification</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Enhancements logged with cryptographic SHA-256 metadata to maintain chain of custody.
            </p>
          </div>

          <button
            onClick={onOpenAiAssistant}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Ask AI Assistant for Enhancement Recommendation</span>
          </button>

        </div>

      </div>

    </div>
  );
};
