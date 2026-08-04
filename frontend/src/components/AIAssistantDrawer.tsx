import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  CornerDownLeft, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { ChatMessage, NavTab } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onTabChange: (tab: NavTab) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onTabChange
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleSuggestedPrompt = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] md:w-[460px] z-50 p-4 animate-in slide-in-from-right duration-300 pointer-events-auto">
      <div className="floating-card h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gradient-bg-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-bg-accent text-white flex items-center justify-center shadow-md glow-purple">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Sentinel AI Assistant</h3>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  v4.2 LLM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Context-aware multi-camera analytics</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl gradient-bg-accent text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-2xl p-3.5 shadow-md font-medium'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-2xl p-3.5 border border-slate-200/60 dark:border-slate-700/60 font-normal'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* AI Suggested Actions */}
                {msg.suggestedActions && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Suggested Actions:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (act.includes('Case')) onTabChange('investigation');
                            else if (act.includes('CAM')) onTabChange('live_monitoring');
                            else onTabChange('video_enhancement');
                          }}
                          className="text-left text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 group"
                        >
                          <ArrowRight className="w-3 h-3 text-purple-500 group-hover:translate-x-0.5 transition-transform" />
                          <span>{act}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[9px] text-slate-400 block text-right font-mono mt-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Queries</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              'Summarize POI #812 sightings',
              'Find stolen BMW plate TX-7918',
              'Enhance low-light frame on CAM-105'
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Input Field */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`p-2.5 rounded-xl border transition ${
              isListening
                ? 'bg-red-500 text-white border-red-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Voice Command Mode"
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sentinel AI assistant..."
            className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl gradient-bg-accent text-white shadow-md hover:opacity-95 disabled:opacity-40 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
