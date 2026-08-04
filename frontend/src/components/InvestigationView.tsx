import React, { useState } from 'react';
import { 
  FolderSearch, 
  UserCheck, 
  Car, 
  FileText, 
  Plus, 
  Pin, 
  Tag, 
  Bookmark, 
  Sparkles, 
  Clock, 
  Search, 
  CheckCircle2, 
  ShieldAlert, 
  Filter, 
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';
import { DetectedFace, DetectedVehicle, OcrResult, CaseNote, NavTab } from '../types';

interface InvestigationViewProps {
  faces: DetectedFace[];
  vehicles: DetectedVehicle[];
  ocrResults: OcrResult[];
  notes: CaseNote[];
  onAddNote: (noteText: string, tag: string) => void;
  onTabChange: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
}

export const InvestigationView: React.FC<InvestigationViewProps> = ({
  faces,
  vehicles,
  ocrResults,
  notes,
  onAddNote,
  onTabChange,
  onOpenAiAssistant
}) => {
  const [activeCategory, setActiveCategory] = useState<'faces' | 'vehicles' | 'ocr' | 'notes'>('faces');
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [newNoteTag, setNewNoteTag] = useState<string>('#SuspectAlpha');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText, newNoteTag);
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderSearch className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Forensic Investigation Suite</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                Case #CASE-2026-8942
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-camera suspect tracking, biometric facial matching, LPR plate analytics, and court notes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('reports')}
            className="px-4 py-2 rounded-xl gradient-bg-accent text-white text-xs font-bold shadow-md transition hover:opacity-95 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate PDF Case Report</span>
          </button>
        </div>
      </div>

      {/* Main Investigation Split: Evidence Viewer + Evidence Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Evidence Viewer & Multi-Camera Suspect Sightings Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Frame Inspection Box */}
          <div className="floating-card p-5 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Primary Evidence Frame (CAM-101 North Gate - 14:28:12)
                </h3>
              </div>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                POI #812 Matched (94.8%)
              </span>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
                alt="Evidence frame"
                className="w-full h-full object-cover"
              />

              {/* Bounding box mock overlay */}
              <div className="absolute top-[20%] left-[28%] w-[25%] h-[60%] border-2 border-red-500 rounded-xl bg-red-500/10 p-2 flex flex-col justify-between animate-pulse">
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow self-start">
                  Suspect Marcus Vance (94.8%)
                </span>
                <span className="text-[9px] font-mono text-white bg-slate-900/80 px-1.5 py-0.5 rounded self-end">
                  Biometric ID Verified
                </span>
              </div>
            </div>

            {/* Frame Metadata Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Identified Subject:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">Marcus Vance (#812)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Facial Confidence:</span>
                <span className="font-bold text-emerald-500">94.8% Match</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Source Stream:</span>
                <span className="font-bold text-blue-500">CAM-101 (North Gate)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Timestamp:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">14:28:12</span>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Camera Suspect Timeline */}
          <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-5 h-5 text-purple-500" />
              <span>Multi-Camera Sightings Timeline (Suspect POI #812)</span>
            </h3>

            <div className="relative mt-6 pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              
              {/* Event 1 */}
              <div className="relative group">
                <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-500/20"></span>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      <span>CAM-101 (North Entrance Gate)</span>
                      <span className="text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.2 rounded font-bold">
                        Facial Match 94.8%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Subject approached Gate 1 carrying dark tactical backpack, paused at perimeter scanner.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-500">14:28:12</span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative group">
                <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></span>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      <span>CAM-102 (Parking Structure West)</span>
                      <span className="text-[10px] text-blue-500 bg-blue-500/10 px-1.5 py-0.2 rounded font-bold">
                        LPR Plate TX-7918
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Dark Blue BMW 5-Series departed Level 2 exit ramp at high speed (34 km/h).
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-500">14:15:40</span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative group">
                <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></span>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      <span>CAM-105 (Loading Dock Alley)</span>
                      <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded font-bold">
                        Unattended Object Tagged
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Backpack left near south cargo container, low-light illumination active.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-500">14:12:00</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right 1 Col: Filterable Evidence Panel (Faces, Vehicles, OCR, Notes) */}
        <div className="floating-card p-6 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div>
            
            {/* Category Navigation Pills */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold mb-4 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveCategory('faces')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1 ${
                  activeCategory === 'faces' ? 'gradient-bg-accent text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Faces ({faces.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('vehicles')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1 ${
                  activeCategory === 'vehicles' ? 'gradient-bg-accent text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Plates ({vehicles.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('ocr')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1 ${
                  activeCategory === 'ocr' ? 'gradient-bg-accent text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>OCR</span>
              </button>

              <button
                onClick={() => setActiveCategory('notes')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1 ${
                  activeCategory === 'notes' ? 'gradient-bg-accent text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Notes ({notes.length})</span>
              </button>
            </div>

            {/* Render Category Content */}
            {activeCategory === 'faces' && (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {faces.map((f) => (
                  <div key={f.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex gap-3 items-center">
                    <img src={f.thumbnailUrl} alt="Face" className="w-12 h-12 rounded-xl object-cover border border-slate-300 dark:border-slate-700" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">{f.personName}</span>
                        <span className="text-[10px] font-bold text-emerald-500">{f.matchScore}% Match</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{f.camera}</div>
                      <div className="flex items-center gap-2 text-[9px] font-medium text-slate-400 mt-1">
                        <span>Age: {f.age}</span>
                        <span>Gender: {f.gender}</span>
                        <span className="font-bold text-purple-400">{f.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'vehicles' && (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {vehicles.map((v) => (
                  <div key={v.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex gap-3 items-center">
                    <img src={v.thumbnailUrl} alt="Vehicle" className="w-12 h-12 rounded-xl object-cover border border-slate-300 dark:border-slate-700" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">{v.licensePlate}</span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.2 rounded">{v.status}</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-0.5">{v.vehicleMake}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{v.camera} ({v.speed})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'ocr' && (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {ocrResults.map((o) => (
                  <div key={o.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-1">
                    <div className="text-xs font-mono font-bold text-purple-500">{o.text}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{o.category}</span>
                      <span className="font-bold text-emerald-500">{o.confidence}% OCR Conf</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'notes' && (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {notes.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.author}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{n.text}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {n.tags.map((t) => (
                        <span key={t} className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Add New Case Note Form */}
          <form onSubmit={handleCreateNote} className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add investigator note..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="submit"
                className="p-2 rounded-xl gradient-bg-accent text-white shadow-sm hover:opacity-95"
                title="Add Note"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
