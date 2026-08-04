import { CameraFeed, KpiMetric, AIAlertItem, DetectedFace, DetectedVehicle, OcrResult, CaseNote, CaseReportData, ChatMessage } from './types';

export const INITIAL_CAMERAS: CameraFeed[] = [
  {
    id: 'CAM-101',
    name: 'North Entrance Gate 1',
    location: 'Building A - North Perimeter',
    area: 'Outer Perimeter',
    status: 'alert',
    fps: 60,
    resolution: '3840x2160 (4K)',
    bitrate: '8.4 Mbps',
    threatLevel: 'high',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Person Identified', 'Unidentified Bag', 'Motion Anomaly'],
    aiBoundingBoxes: [
      { id: 'b1', label: 'Suspect #812 (94.8%)', confidence: 0.948, box: { x: 28, y: 22, w: 24, h: 58 }, color: '#FF5E5E' },
      { id: 'b2', label: 'Object: Backpack (89%)', confidence: 0.89, box: { x: 55, y: 62, w: 14, h: 22 }, color: '#FFB547' }
    ]
  },
  {
    id: 'CAM-102',
    name: 'Parking Structure West',
    location: 'Level 2 - Ramp Exit B',
    area: 'Parking Complex',
    status: 'online',
    fps: 30,
    resolution: '1920x1080 (HD)',
    bitrate: '4.2 Mbps',
    threatLevel: 'medium',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521782020-18925f46c0b6?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Vehicle: Blue Sedan', 'LPR: TX-7918'],
    aiBoundingBoxes: [
      { id: 'b3', label: 'LPR: TX-7918 (98.2%)', confidence: 0.982, box: { x: 38, y: 45, w: 32, h: 36 }, color: '#4F7CFF' }
    ]
  },
  {
    id: 'CAM-103',
    name: 'Lobby Central Atrium',
    location: 'Main Building - Floor 1',
    area: 'Interior Public',
    status: 'online',
    fps: 60,
    resolution: '3840x2160 (4K)',
    bitrate: '9.1 Mbps',
    threatLevel: 'none',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Pedestrian Traffic', 'Crowd Density: Normal'],
    aiBoundingBoxes: [
      { id: 'b4', label: 'Visitor #402 (91%)', confidence: 0.91, box: { x: 18, y: 30, w: 16, h: 48 }, color: '#34C759' }
    ]
  },
  {
    id: 'CAM-104',
    name: 'Server Room Vault',
    location: 'Basement Level - Zone 0',
    area: 'High Security',
    status: 'online',
    fps: 60,
    resolution: '3840x2160 (4K)',
    bitrate: '12.0 Mbps',
    threatLevel: 'none',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Thermal Normal', 'Authorized Badge Entry'],
    aiBoundingBoxes: [
      { id: 'b5', label: 'Badge ID: #9041-A', confidence: 0.99, box: { x: 42, y: 25, w: 20, h: 55 }, color: '#7C5CFF' }
    ]
  },
  {
    id: 'CAM-105',
    name: 'Loading Dock Alley',
    location: 'South Cargo Gate',
    area: 'Logistics',
    status: 'alert',
    fps: 30,
    resolution: '2560x1440 (2K)',
    bitrate: '5.8 Mbps',
    threatLevel: 'high',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Loitering Alert', 'Low-Light Intrusion'],
    aiBoundingBoxes: [
      { id: 'b6', label: 'Intruder Alert (87%)', confidence: 0.87, box: { x: 62, y: 38, w: 22, h: 52 }, color: '#FF5E5E' }
    ]
  },
  {
    id: 'CAM-106',
    name: 'East Executive Walkway',
    location: 'Building B - Outer Plaza',
    area: 'Perimeter',
    status: 'online',
    fps: 60,
    resolution: '1920x1080 (HD)',
    bitrate: '4.0 Mbps',
    threatLevel: 'none',
    recordingActive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    activeDetections: ['Perimeter Clear'],
    aiBoundingBoxes: []
  }
];

export const KPI_METRICS: KpiMetric[] = [
  {
    id: 'kpi-1',
    title: 'Active Camera Feeds',
    value: '124 / 128',
    change: '+4 online',
    isPositive: true,
    subtitle: '96.8% Operational Uptime',
    icon: 'Camera',
    badgeText: 'Live Sync',
    badgeType: 'success'
  },
  {
    id: 'kpi-2',
    title: 'AI Alerts (24h)',
    value: '18 Active',
    change: '3 High Priority',
    isPositive: false,
    subtitle: 'Real-time Computer Vision',
    icon: 'ShieldAlert',
    badgeText: 'Action Required',
    badgeType: 'danger'
  },
  {
    id: 'kpi-3',
    title: 'Active Investigations',
    value: '12 Cases',
    change: '4 Reports Ready',
    isPositive: true,
    subtitle: 'Forensic Evidence Linked',
    icon: 'FolderSearch',
    badgeText: 'Active',
    badgeType: 'purple'
  },
  {
    id: 'kpi-4',
    title: 'Storage Array Usage',
    value: '78.4 TB',
    change: 'of 100 TB',
    isPositive: true,
    subtitle: 'NVMe RAID 10 Array',
    icon: 'HardDrive',
    badgeText: 'Healthy',
    badgeType: 'primary'
  },
  {
    id: 'kpi-5',
    title: 'GPU Utilization',
    value: '84.2%',
    change: '8 x H100 SXM',
    isPositive: true,
    subtitle: 'Batch Inference Active',
    icon: 'Cpu',
    badgeText: 'Inference Boost',
    badgeType: 'purple'
  },
  {
    id: 'kpi-6',
    title: 'Processing Queue',
    value: '3 Videos',
    change: 'Avg 42s / job',
    isPositive: true,
    subtitle: 'SuperRes & Face Restoration',
    icon: 'Layers',
    badgeText: 'Optimized',
    badgeType: 'primary'
  },
  {
    id: 'kpi-7',
    title: 'AI Models Operational',
    value: '9 Active',
    change: '100% Online',
    isPositive: true,
    subtitle: 'Real-ESRGAN, YOLOv11, ByteTrack',
    icon: 'Sparkles',
    badgeText: 'v4.2 Loaded',
    badgeType: 'success'
  },
  {
    id: 'kpi-8',
    title: 'Identified Suspect Matches',
    value: '98.4%',
    change: '+1.2% precision',
    isPositive: true,
    subtitle: 'National Forensic Database',
    icon: 'UserCheck',
    badgeText: 'Verified',
    badgeType: 'success'
  }
];

export const AI_ALERTS_LIST: AIAlertItem[] = [
  {
    id: 'ALT-901',
    timestamp: '14:28:12 Today',
    cameraName: 'North Entrance Gate 1',
    location: 'Building A Perimeter',
    severity: 'high',
    category: 'Facial Recognition Match',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    description: 'Person matching POI #812 ("Marcus Vance") detected at perimeter gate with 94.8% confidence.',
    status: 'unresolved'
  },
  {
    id: 'ALT-902',
    timestamp: '14:15:40 Today',
    cameraName: 'Loading Dock Alley',
    location: 'South Cargo Gate',
    severity: 'high',
    category: 'Loitering & Unattended Object',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
    description: 'Unattended tactical backpack remaining motionless for over 12 minutes in low-light area.',
    status: 'investigating'
  },
  {
    id: 'ALT-903',
    timestamp: '13:50:02 Today',
    cameraName: 'Parking Structure West',
    location: 'Level 2 Exit',
    severity: 'medium',
    category: 'License Plate (LPR) Match',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521782020-18925f46c0b6?auto=format&fit=crop&w=300&q=80',
    description: 'Vehicle plate TX-7918 flagged in Stolen Vehicle Database passed exit ramp.',
    status: 'unresolved'
  },
  {
    id: 'ALT-904',
    timestamp: '12:04:19 Today',
    cameraName: 'East Executive Walkway',
    location: 'Outer Plaza',
    severity: 'low',
    category: 'Crowd Anomaly',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
    description: 'Unusual gathering speed detected near east perimeter wall.',
    status: 'resolved'
  }
];

export const DETECTED_FACES: DetectedFace[] = [
  {
    id: 'FACE-01',
    timestamp: '14:28:12',
    camera: 'CAM-101 (North Entrance)',
    matchScore: 94.8,
    personName: 'Marcus Vance (POI #812)',
    databaseId: 'DB-CRIM-9021',
    status: 'Flagged',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    age: '34-38',
    gender: 'Male',
    expression: 'Neutral / Focused'
  },
  {
    id: 'FACE-02',
    timestamp: '14:10:05',
    camera: 'CAM-103 (Lobby Atrium)',
    matchScore: 89.2,
    personName: 'Elena Rostova',
    databaseId: 'DB-EMP-4012',
    status: 'Verified',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    age: '28-32',
    gender: 'Female',
    expression: 'Smiling'
  },
  {
    id: 'FACE-03',
    timestamp: '13:42:19',
    camera: 'CAM-105 (Loading Dock)',
    matchScore: 78.4,
    personName: 'Unidentified Subject B',
    databaseId: 'DB-UNK-0092',
    status: 'Unknown',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    age: '40-45',
    gender: 'Male',
    expression: 'Obscured (Cap / Mask)'
  }
];

export const DETECTED_VEHICLES: DetectedVehicle[] = [
  {
    id: 'VEH-01',
    timestamp: '14:15:40',
    camera: 'CAM-102 (Parking Structure West)',
    licensePlate: 'TX-7918',
    vehicleMake: 'BMW 5 Series (Dark Blue)',
    color: 'Midnight Blue',
    confidence: 98.2,
    status: 'Stolen Alert',
    speed: '34 km/h',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'VEH-02',
    timestamp: '13:58:11',
    camera: 'CAM-105 (Loading Dock)',
    licensePlate: 'NY-4029',
    vehicleMake: 'Ford Transit Van (White)',
    color: 'White',
    confidence: 96.5,
    status: 'Registered',
    speed: '12 km/h',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=300&q=80'
  }
];

export const OCR_RESULTS: OcrResult[] = [
  {
    id: 'OCR-01',
    timestamp: '14:28:10',
    text: 'METRO LOGISTICS INC - CONTAINER #8904',
    category: 'Logistics Decal',
    confidence: 97.4,
    location: 'North Entrance Gate 1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'OCR-02',
    timestamp: '14:15:38',
    text: 'LICENSE PLATE: TX-7918 (STATE: TEXAS)',
    category: 'License Plate OCR',
    confidence: 99.1,
    location: 'Parking Structure West',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521782020-18925f46c0b6?auto=format&fit=crop&w=250&q=80'
  }
];

export const CASE_NOTES: CaseNote[] = [
  {
    id: 'NOTE-1',
    author: 'Det. Sarah Vance',
    timestamp: '14:35 Today',
    text: 'Cross-referenced suspect POI #812 timeline with CAM-101 and CAM-105. High likelihood of coordinated entry via the North Gate.',
    tags: ['#SuspectAlpha', '#HighPriority', '#CCTV-Match'],
    pinned: true
  },
  {
    id: 'NOTE-2',
    author: 'Forensic Analyst Tech #402',
    timestamp: '13:10 Today',
    text: 'Ran Real-ESRGAN v3 super-resolution on license plate frame 14:15:38. Plate TX-7918 verified with 99.1% OCR confidence.',
    tags: ['#Enhancement', '#LPR-Result'],
    pinned: false
  }
];

export const INITIAL_CASE_REPORT: CaseReportData = {
  caseId: 'CASE-2026-8942',
  title: 'Perimeter Security Breach & Vehicle Identification Incident',
  location: 'Metropolitan District #4 - North Complex',
  incidentDate: 'July 28, 2026',
  leadInvestigator: 'Senior Detective Sarah Vance (ID: #4092)',
  status: 'Active Investigation',
  riskScore: '92/100 (Critical)',
  incidentSummary: 'At 14:28:12, SentinelAI automated computer vision detected a person matching POI #812 ("Marcus Vance") attempting unauthorized entry at North Gate 1. Contemporaneous tracking revealed a linked dark blue BMW sedan (TX-7918) exiting Parking Structure West. Super-resolution enhancement verified facial biometric match at 94.8% confidence.',
  keyFindings: [
    'Facial biometric match confirmed POI #812 in 4K multi-camera feed.',
    'License Plate Recognition (LPR) identified stolen vehicle TX-7918 exiting lower ramp.',
    'AI Frame Interpolation & Low-Light Denoising restored clear 1080p footage from degraded CCTV source.',
    'Unattended tactical backpack tagged and secured by rapid response unit.'
  ],
  evidenceItemsCount: 8,
  digitalSignature: 'SIG-RSA4096-SENTINEL-90812-VERIFIED',
  sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello Detective Vance. SentinelAI Assistant is online and synchronized with 128 active CCTV streams. How can I assist your investigation today?',
    timestamp: '14:30',
    suggestedActions: [
      'Summarize evidence for Case #8942',
      'Enhance license plate on CAM-102',
      'Show suspect timeline across all feeds'
    ]
  }
];
