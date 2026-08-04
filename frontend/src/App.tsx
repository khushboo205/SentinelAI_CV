import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LiveMonitoringView } from './components/LiveMonitoringView';
import { VideoEnhancementView } from './components/VideoEnhancementView';
import { InvestigationView } from './components/InvestigationView';
import { ReportView } from './components/ReportView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { SettingsView } from './components/SettingsView';

import { 
  NavTab, 
  ThemeMode, 
  CameraFeed, 
  AIAlertItem, 
  DetectedFace, 
  DetectedVehicle, 
  OcrResult, 
  CaseNote, 
  CaseReportData, 
  ChatMessage,
  KpiMetric 
} from './types';

import { 
  INITIAL_CAMERAS, 
  KPI_METRICS, 
  AI_ALERTS_LIST, 
  DETECTED_FACES, 
  DETECTED_VEHICLES, 
  OCR_RESULTS, 
  CASE_NOTES, 
  INITIAL_CASE_REPORT, 
  INITIAL_CHAT_MESSAGES 
} from './mockData';

export default function App() {
  // Theme State (Default light or dark based on user preference)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('sentinel_theme');
    return (saved as ThemeMode) || 'light';
  });

  // Navigation & UI Layout State
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  // Platform Datasets
  const [cameras, setCameras] = useState<CameraFeed[]>(INITIAL_CAMERAS);
  const [metrics, setMetrics] = useState<KpiMetric[]>(KPI_METRICS);
  const [alerts, setAlerts] = useState<AIAlertItem[]>(AI_ALERTS_LIST);
  const [faces, setFaces] = useState<DetectedFace[]>(DETECTED_FACES);
  const [vehicles, setVehicles] = useState<DetectedVehicle[]>(DETECTED_VEHICLES);
  const [ocrResults, setOcrResults] = useState<OcrResult[]>(OCR_RESULTS);
  const [notes, setNotes] = useState<CaseNote[]>(CASE_NOTES);
  const [reportData, setReportData] = useState<CaseReportData>(INITIAL_CASE_REPORT);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // Sync theme changes with DOM root class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sentinel_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Add Case Note Handler
  const handleAddNote = (text: string, tag: string) => {
    const newNote: CaseNote = {
      id: `NOTE-${Date.now()}`,
      author: 'Senior Det. Sarah Vance',
      timestamp: 'Just now',
      text: text,
      tags: [tag, '#Investigation'],
      pinned: false
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  // AI Chat Assistant Message Handler
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated Intelligent AI Response
    setTimeout(() => {
      let aiText = "I have cross-referenced your query across our 128 active feeds and national forensic database. Multi-agent computer vision synthesis confirms match confidence for POI #812 Marcus Vance at North Entrance Gate 1.";
      let suggestions = ["View in Investigation panel", "Enhance frame on CAM-101", "Generate PDF Summary Report"];

      if (text.toLowerCase().includes('bmw') || text.toLowerCase().includes('plate') || text.toLowerCase().includes('tx-7918')) {
        aiText = "Vehicle LPR match: Dark Blue BMW 5-Series (License TX-7918) was tracked passing Parking Structure West exit at 14:15:40. Flagged in Stolen Vehicle Database.";
        suggestions = ["Track vehicle trajectory on CAM-102", "Add plate evidence to Case #8942"];
      } else if (text.toLowerCase().includes('enhance') || text.toLowerCase().includes('superres')) {
        aiText = "Executing SuperRes 4x-CCTV neural model on selected frame. Facial features and license text de-blurred with 94.8% biometric match.";
        suggestions = ["Open Video AI Enhancement Workspace"];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: suggestions
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    }, 700);
  };

  // Handle uploading media for AI analysis endpoint
  const handleAnalyzeMedia = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('media', file);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        // Append analysis findings to chat
        const summaryText = `AI Analysis Completed for ${file.name}:\n\n` +
          `Quality: Blur=${data.analysis.qualityAgent.blurLevel}, Noise=${data.analysis.qualityAgent.noise}\n` +
          `Incident Summary: ${data.analysis.evidenceAgent.incidentSummary}`;
        
        handleSendMessage(summaryText);
      }
    } catch (e) {
      console.warn("Backend analysis endpoint notice:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans antialiased flex flex-col selection:bg-blue-500/30">
      
      {/* Background Subtle Ambient Gradient Lights */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Floating Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        unreadAlertsCount={alerts.filter(a => a.status === 'unresolved').length}
        alerts={alerts}
      />

      <div className="flex-1 flex relative z-10 px-4 md:px-6">
        
        {/* Floating Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Viewport */}
        <main
          className={`flex-1 transition-all duration-300 pt-4 ${
            sidebarCollapsed ? 'pl-24' : 'pl-72'
          }`}
        >
          {activeTab === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              alerts={alerts}
              cameras={cameras}
              onTabChange={setActiveTab}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
          )}

          {activeTab === 'live_monitoring' && (
            <LiveMonitoringView
              cameras={cameras}
              onTabChange={setActiveTab}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
          )}

          {activeTab === 'video_enhancement' && (
            <VideoEnhancementView
              onTabChange={setActiveTab}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
              onAnalyzeMedia={handleAnalyzeMedia}
            />
          )}

          {activeTab === 'investigation' && (
            <InvestigationView
              faces={faces}
              vehicles={vehicles}
              ocrResults={ocrResults}
              notes={notes}
              onAddNote={handleAddNote}
              onTabChange={setActiveTab}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportView reportData={reportData} />
          )}

          {activeTab === 'ai_assistant' && (
            <div className="max-w-4xl mx-auto py-4">
              <div className="floating-card p-6 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                  Sentinel AI Assistant Console
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  Full-screen interactive conversational forensic assistant initialized.
                </p>
                <AIAssistantDrawer
                  isOpen={true}
                  onClose={() => setActiveTab('dashboard')}
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  onTabChange={setActiveTab}
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>

      </div>

      {/* Floating AI Assistant Drawer (when opened via Navbar or shortcut) */}
      {activeTab !== 'ai_assistant' && (
        <AIAssistantDrawer
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          onTabChange={setActiveTab}
        />
      )}

    </div>
  );
}
