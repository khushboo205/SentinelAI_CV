export type NavTab = 
  | 'dashboard' 
  | 'live_monitoring' 
  | 'video_enhancement' 
  | 'investigation' 
  | 'reports' 
  | 'ai_assistant'
  | 'settings';

export type ThemeMode = 'light' | 'dark';

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  area: string;
  status: 'online' | 'alert' | 'offline';
  fps: number;
  resolution: string;
  bitrate: string;
  threatLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  thumbnailUrl: string;
  activeDetections: string[];
  recordingActive: boolean;
  aiBoundingBoxes?: Array<{
    id: string;
    label: string;
    confidence: number;
    box: { x: number; y: number; w: number; h: number };
    color: string;
  }>;
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle: string;
  icon: string;
  badgeText?: string;
  badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'purple';
}

export interface AIAlertItem {
  id: string;
  timestamp: string;
  cameraName: string;
  location: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  thumbnailUrl: string;
  description: string;
  status: 'unresolved' | 'investigating' | 'resolved';
}

export interface DetectedFace {
  id: string;
  timestamp: string;
  camera: string;
  matchScore: number;
  personName: string;
  databaseId: string;
  status: 'Flagged' | 'Verified' | 'Unknown';
  thumbnailUrl: string;
  age: string;
  gender: string;
  expression: string;
}

export interface DetectedVehicle {
  id: string;
  timestamp: string;
  camera: string;
  licensePlate: string;
  vehicleMake: string;
  color: string;
  confidence: number;
  status: 'Stolen Alert' | 'Registered' | 'Unregistered';
  speed: string;
  thumbnailUrl: string;
}

export interface OcrResult {
  id: string;
  timestamp: string;
  text: string;
  category: string;
  confidence: number;
  location: string;
  thumbnailUrl: string;
}

export interface CaseNote {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  tags: string[];
  pinned: boolean;
}

export interface CaseReportData {
  caseId: string;
  title: string;
  location: string;
  incidentDate: string;
  leadInvestigator: string;
  status: 'Active Investigation' | 'Closed' | 'Pending Review';
  riskScore: string;
  incidentSummary: string;
  keyFindings: string[];
  evidenceItemsCount: number;
  digitalSignature: string;
  sha256Hash: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  metadata?: {
    modelUsed?: string;
    confidenceScore?: number;
    caseId?: string;
  };
}

export type AgentAnalysis = {
  qualityAgent: {
    blurLevel: string;
    lighting: string;
    noise: string;
    summary: string;
  };
  enhancementAgent: Array<{
    technique: string;
    reason: string;
    confidenceScore: number;
  }>;
  detectionAgent: Array<{
    object: string;
    confidence: number;
    timestamp: string;
  }>;
  trackingAgent: Array<{
    subject: string;
    movement: string;
    timestamp: string;
  }>;
  evidenceAgent: {
    incidentSummary: string;
    keyFindings: string[];
    riskHeatmapArea: string;
  };
};
