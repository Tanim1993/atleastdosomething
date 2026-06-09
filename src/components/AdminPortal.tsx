/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, Settings, FileText, Image, LayoutGrid, Users, BarChart3, 
  Plus, Trash2, Edit2, LogOut, CheckCircle2, AlertCircle, Save, 
  HelpCircle, Eye, EyeOff, UserPlus, Send, RefreshCw, Smartphone, 
  Monitor, Tablet, Compass, Mail, Clock
} from 'lucide-react';
import { 
  SiteContent, ServiceItem, GalleryItem, TestimonialItem, 
  UserAccount, TrafficEvent, ContactMessage, Language 
} from '../types';

interface AdminPortalProps {
  currentLang: Language;
  siteContent: SiteContent;
  onUpdateSiteContent: (c: SiteContent) => void;
  services: ServiceItem[];
  onUpdateServices: (s: ServiceItem[]) => void;
  gallery: GalleryItem[];
  onUpdateGallery: (g: GalleryItem[]) => void;
  admins: UserAccount[];
  onUpdateAdmins: (a: UserAccount[]) => void;
  trafficLogs: TrafficEvent[];
  onUpdateTrafficLogs: (t: TrafficEvent[]) => void;
  contactMessages: ContactMessage[];
  onUpdateMessages: (m: ContactMessage[]) => void;
  onLogout: () => void;
}

export default function AdminPortal({
  currentLang,
  siteContent,
  onUpdateSiteContent,
  services,
  onUpdateServices,
  gallery,
  onUpdateGallery,
  admins,
  onUpdateAdmins,
  trafficLogs,
  onUpdateTrafficLogs,
  contactMessages,
  onUpdateMessages,
  onLogout
}: AdminPortalProps) {
  // Navigation tabs
  type TabType = 'general' | 'services' | 'gallery' | 'users' | 'analytics' | 'messages';
  const [activeTab, setActiveTab] = useState<TabType>('general');

  // Success message feedback
  const [successToast, setSuccessToast] = useState('');
  const triggerSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // State for General Settings form
  const [editContent, setEditContent] = useState<SiteContent>({ ...siteContent });

  // State to manage Services CRUD
  const [serviceEditingId, setServiceEditingId] = useState<string | null>(null);
  const [svcForm, setSvcForm] = useState<{
    titleEn: string; titleBn: string;
    descEn: string; descBn: string;
    icon: string;
    benefEn: string; benefBn: string;
    costEn: string; costBn: string;
    isActive: boolean;
  }>({
    titleEn: '', titleBn: '',
    descEn: '', descBn: '',
    icon: 'HeartHandshake',
    benefEn: '', benefBn: '',
    costEn: '', costBn: '',
    isActive: true
  });

  // State to manage Gallery items
  const [galForm, setGalForm] = useState({
    imageUrl: '',
    titleEn: '', titleBn: '',
    categoryEn: '', categoryBn: '',
    date: new Date().toISOString().substring(0, 10)
  });

  // State to manage Admin creation
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    passcode: '',
    role: 'Moderator' as 'Super Admin' | 'Moderator' | 'Editor'
  });
  const [showPasscodes, setShowPasscodes] = useState<{ [id: string]: boolean }>({});

  // Traffic Simulation generator
  const simulateTraffic = () => {
    const locations = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Barisal', 'Khulna', 'Mymensingh', 'Rangpur'];
    const devices = ['Mobile', 'Desktop', 'Tablet'] as const;
    const actions = ['visit', 'view_service', 'submit_contact', 'toggle_language'] as const;
    const languages = ['en', 'bn'] as const;

    const numToSimulate = 5 + Math.floor(Math.random() * 5);
    const newLogs: TrafficEvent[] = [];

    for (let i = 0; i < numToSimulate; i++) {
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const dev = devices[Math.floor(Math.random() * devices.length)];
      const act = actions[Math.floor(Math.random() * actions.length)];
      const lang = languages[Math.floor(Math.random() * languages.length)];

      newLogs.push({
        id: `sim_log_${Date.now()}_${i}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
        page: 'home',
        action: act,
        language: lang,
        device: dev,
        location: loc,
        details: act === 'view_service' ? `serv_${1 + Math.floor(Math.random() * 4)}` : undefined
      });
    }

    onUpdateTrafficLogs([...trafficLogs, ...newLogs]);
    triggerSuccess(`Successfully simulated ${numToSimulate} new visitors! Check out the updated charts.`);
  };

  // 1. Handlers for General Settings
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteContent(editContent);
    triggerSuccess("Site-wide text content & values saved successfully!");
  };

  // 2. Handlers for Services CRUD
  const handleEditService = (svc: ServiceItem) => {
    setServiceEditingId(svc.id);
    setSvcForm({
      titleEn: svc.title.en,
      titleBn: svc.title.bn,
      descEn: svc.description.en,
      descBn: svc.description.bn,
      icon: svc.iconName,
      benefEn: svc.beneficiaries.en,
      benefBn: svc.beneficiaries.bn,
      costEn: svc.costText?.en || '',
      costBn: svc.costText?.bn || '',
      isActive: svc.isActive
    });
  };

  const handleCreateOrUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcForm.titleEn || !svcForm.titleBn || !svcForm.descEn) {
      alert("Please fill in the required Service fields in both tongues.");
      return;
    }

    if (serviceEditingId) {
      // update
      const updated = services.map(s => {
        if (s.id === serviceEditingId) {
          return {
            ...s,
            title: { en: svcForm.titleEn, bn: svcForm.titleBn },
            description: { en: svcForm.descEn, bn: svcForm.descBn },
            iconName: svcForm.icon,
            beneficiaries: { en: svcForm.benefEn || 'Family', bn: svcForm.benefBn || 'পরিবার' },
            costText: svcForm.costEn ? { en: svcForm.costEn, bn: svcForm.costBn } : undefined,
            isActive: svcForm.isActive
          };
        }
        return s;
      });
      onUpdateServices(updated);
      setServiceEditingId(null);
      triggerSuccess("Service program updated successfully!");
    } else {
      // create
      const newSvc: ServiceItem = {
        id: `serv_${Date.now()}`,
        title: { en: svcForm.titleEn, bn: svcForm.titleBn },
        description: { en: svcForm.descEn, bn: svcForm.descBn },
        iconName: svcForm.icon,
        beneficiaries: { en: svcForm.benefEn || 'General', bn: svcForm.benefBn || 'সাধারণ' },
        costText: svcForm.costEn ? { en: svcForm.costEn, bn: svcForm.costBn } : undefined,
        isActive: svcForm.isActive
      };
      onUpdateServices([...services, newSvc]);
      triggerSuccess("New Initiative catalog card created!");
    }

    // clear form
    setSvcForm({
      titleEn: '', titleBn: '',
      descEn: '', descBn: '',
      icon: 'HeartHandshake',
      benefEn: '', benefBn: '',
      costEn: '', costBn: '',
      isActive: true
    });
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to remove this Activity? It will disappear from the homepage grid.")) {
      onUpdateServices(services.filter(s => s.id !== id));
      triggerSuccess("Activity card deleted.");
    }
  };

  // 3. Handlers for Gallery CRUD
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galForm.imageUrl || !galForm.titleEn || !galForm.titleBn) {
      alert("Please insert a valid photo URL, plus English/Bengali titles.");
      return;
    }

    const newItem: GalleryItem = {
      id: `gal_${Date.now()}`,
      imageUrl: galForm.imageUrl,
      title: { en: galForm.titleEn, bn: galForm.titleBn },
      date: galForm.date || new Date().toISOString().substring(0, 10),
      category: { 
        en: galForm.categoryEn || 'Campaign', 
        bn: galForm.categoryBn || 'প্রচারণা' 
      }
    };

    onUpdateGallery([newItem, ...gallery]);
    setGalForm({
      imageUrl: '',
      titleEn: '', titleBn: '',
      categoryEn: '', categoryBn: '',
      date: new Date().toISOString().substring(0, 10)
    });
    triggerSuccess("Campaign Photo pinned to site gallery!");
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm("Delete this campaign photograph layout?")) {
      onUpdateGallery(gallery.filter(g => g.id !== id));
      triggerSuccess("Gallery image deleted.");
    }
  };

  // 4. Handlers for Administrators list
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.passcode) {
      alert("Provide a valid Username (Email) and a numeric passcode.");
      return;
    }

    const newAcc: UserAccount = {
      id: `adm_${Date.now()}`,
      username: newAdmin.username.trim(),
      passcode: newAdmin.passcode.trim(),
      role: newAdmin.role,
      createdDate: new Date().toISOString().substring(0, 10),
      lastActive: "Never"
    };

    onUpdateAdmins([...admins, newAcc]);
    setNewAdmin({ username: '', passcode: '', role: 'Moderator' });
    triggerSuccess("New Admin credentials issued!");
  };

  const handleDeleteAdmin = (id: string) => {
    const target = admins.find(a => a.id === id);
    if (target?.username === 'khaledtanim@gmail.com') {
      alert("Access Denied: The primary Super Admin account cannot be removed.");
      return;
    }
    if (confirm(`Revoke security credentials for ${target?.username}?`)) {
      onUpdateAdmins(admins.filter(a => a.id !== id));
      triggerSuccess("Admin account revoked.");
    }
  };

  const toggleShowPasscode = (id: string) => {
    setShowPasscodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 5. Analytics calculations for Custom High-Contrast SVG visualizations
  const totalPageviews = trafficLogs.length;
  const webVisits = trafficLogs.filter(t => t.action === 'visit').length;
  const serviceViews = trafficLogs.filter(t => t.action === 'view_service').length;
  const contactsSubmitted = trafficLogs.filter(t => t.action === 'submit_contact').length;
  const langSwitches = trafficLogs.filter(t => t.action === 'toggle_language').length;

  const mobileCount = trafficLogs.filter(t => t.device === 'Mobile').length;
  const desktopCount = trafficLogs.filter(t => t.device === 'Desktop').length;
  const tabletCount = trafficLogs.filter(t => t.device === 'Tablet').length;

  // Compute geodistribution ratios
  const locationCounts: { [key: string]: number } = {};
  trafficLogs.forEach(log => {
    locationCounts[log.location] = (locationCounts[log.location] || 0) + 1;
  });
  const geoSorted = Object.entries(locationCounts).sort((a, b) => b[1] - a[1]);

  // Compute page views over time of day (simply grouping into shifts)
  const computeTimeShift = (iso: string) => {
    try {
      const hour = new Date(iso).getUTCHours() + 6; // convert to BD Time GMT+6
      const adjustedHour = hour % 24;
      if (adjustedHour >= 6 && adjustedHour < 12) return 'Morning (6am-12pm)';
      if (adjustedHour >= 12 && adjustedHour < 17) return 'Afternoon (12pm-5pm)';
      if (adjustedHour >= 17 && adjustedHour < 21) return 'Evening (5pm-9pm)';
      return 'Night (9pm-6am)';
    } catch {
      return 'Morning (6am-12pm)';
    }
  };

  const shiftCounts: { [key: string]: number } = {
    'Morning (6am-12pm)': 0,
    'Afternoon (12pm-5pm)': 0,
    'Evening (5pm-9pm)': 0,
    'Night (9pm-6am)': 0
  };
  trafficLogs.forEach(log => {
    const shift = computeTimeShift(log.timestamp);
    if (shift in shiftCounts) {
      shiftCounts[shift] += 1;
    }
  });

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800" id="admin-panel-container">
      
      {/* Admin Title bar Header */}
      <header className="bg-stone-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-sans font-extrabold text-sm sm:text-base leading-none">
                Atleast Do Something Foundation
              </h1>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Administration Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 hover:text-rose-400 border border-stone-700 hover:border-rose-500/10 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-2">
            <nav className="bg-white rounded-2xl p-4 border border-stone-200/60 shadow-2xs space-y-1">
              
              <p className="text-[10px] uppercase font-bold text-stone-400 px-3 py-1 tracking-wider">
                Manage Content
              </p>
              
              {/* Tab button layout */}
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>General Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Initiative Offerings</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Campaign Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>Contact Inbox</span>
                </div>
                {contactMessages.filter(m => !m.isRead).length > 0 && (
                  <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                    {contactMessages.filter(m => !m.isRead).length}
                  </span>
                )}
              </button>

              <div className="h-px bg-stone-100 my-4" />
              
              <p className="text-[10px] uppercase font-bold text-stone-400 px-3 py-1 tracking-wider">
                Security & Stats
              </p>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Admin Accounts</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Logs</span>
              </button>

            </nav>

            {/* Quick Helper card */}
            <div className="bg-stone-900/10 rounded-2xl p-4 border border-stone-200">
              <h4 className="text-xs font-bold text-stone-700 mb-1">Passcode Safe</h4>
              <p className="text-[10px] text-stone-500 leading-relaxed">
                Changes made in this admin panel reside in live app state memory backed up by client localStorage. Reloading won't break your edits.
              </p>
            </div>
          </aside>

          {/* Main workspace container */}
          <main className="lg:col-span-3 space-y-6">

            {/* Float notification banner */}
            {successToast && (
              <div className="bg-emerald-800 text-white px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-md border border-emerald-700 animate-slide-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold">{successToast}</span>
              </div>
            )}

            {/* ----------------- TAB: GENERAL SETTINGS ----------------- */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveGeneral} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-lg space-y-8" id="form-general-settings">
                
                <div className="flex md:items-center justify-between flex-col md:flex-row gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-sans font-bold text-xl text-stone-900">General settings & Copywriting</h3>
                    <p className="text-xs text-stone-500">Edit primary texts and titles shown on the Home, About, and Contact layouts.</p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>

                {/* Section: Branding name */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Logo & App Branding Title</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Branding Name (English)</label>
                      <input
                        type="text"
                        value={editContent.logoText.en}
                        onChange={(e) => setEditContent({ ...editContent, logoText: { ...editContent.logoText, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-xs text-stone-800 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Branding Name (বাংলা)</label>
                      <input
                        type="text"
                        value={editContent.logoText.bn}
                        onChange={(e) => setEditContent({ ...editContent, logoText: { ...editContent.logoText, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-xs text-stone-800 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Hero Banner Copy */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Hero Banner Configuration</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Hero Badge (English)</label>
                      <input
                        type="text"
                        value={editContent.heroBadge.en}
                        onChange={(e) => setEditContent({ ...editContent, heroBadge: { ...editContent.heroBadge, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Hero Badge (বাংলা)</label>
                      <input
                        type="text"
                        value={editContent.heroBadge.bn}
                        onChange={(e) => setEditContent({ ...editContent, heroBadge: { ...editContent.heroBadge, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Main Title (English)</label>
                      <textarea
                        rows={2}
                        value={editContent.heroTitle.en}
                        onChange={(e) => setEditContent({ ...editContent, heroTitle: { ...editContent.heroTitle, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Main Title (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={editContent.heroTitle.bn}
                        onChange={(e) => setEditContent({ ...editContent, heroTitle: { ...editContent.heroTitle, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Hero Body Copy (English)</label>
                      <textarea
                        rows={4}
                        value={editContent.heroSubtitle.en}
                        onChange={(e) => setEditContent({ ...editContent, heroSubtitle: { ...editContent.heroSubtitle, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Hero Body Copy (বাংলা)</label>
                      <textarea
                        rows={4}
                        value={editContent.heroSubtitle.bn}
                        onChange={(e) => setEditContent({ ...editContent, heroSubtitle: { ...editContent.heroSubtitle, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Islamic Quote (Muhammad PBUH) */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Islamic Quote (Hadeeth)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Quote Text (English)</label>
                      <textarea
                        rows={3}
                        value={editContent.quoteText.en}
                        onChange={(e) => setEditContent({ ...editContent, quoteText: { ...editContent.quoteText, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Quote Text (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={editContent.quoteText.bn}
                        onChange={(e) => setEditContent({ ...editContent, quoteText: { ...editContent.quoteText, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Quote Source Citation (English)</label>
                      <input
                        type="text"
                        value={editContent.quoteSource.en}
                        onChange={(e) => setEditContent({ ...editContent, quoteSource: { ...editContent.quoteSource, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Quote Source Citation (বাংলা)</label>
                      <input
                        type="text"
                        value={editContent.quoteSource.bn}
                        onChange={(e) => setEditContent({ ...editContent, quoteSource: { ...editContent.quoteSource, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Who We Are / What We Do / Mission & Vision */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">About Section (Mission & Philosophy)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Who We Are (English)</label>
                      <textarea
                        rows={3}
                        value={editContent.aboutWhoWeAre.en}
                        onChange={(e) => setEditContent({ ...editContent, aboutWhoWeAre: { ...editContent.aboutWhoWeAre, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Who We Are (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={editContent.aboutWhoWeAre.bn}
                        onChange={(e) => setEditContent({ ...editContent, aboutWhoWeAre: { ...editContent.aboutWhoWeAre, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">What We Do (English)</label>
                      <textarea
                        rows={3}
                        value={editContent.aboutWhatWeDo.en}
                        onChange={(e) => setEditContent({ ...editContent, aboutWhatWeDo: { ...editContent.aboutWhatWeDo, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">What We Do (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={editContent.aboutWhatWeDo.bn}
                        onChange={(e) => setEditContent({ ...editContent, aboutWhatWeDo: { ...editContent.aboutWhatWeDo, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Mission Statement (English)</label>
                      <textarea
                        rows={2}
                        value={editContent.aboutMission.en}
                        onChange={(e) => setEditContent({ ...editContent, aboutMission: { ...editContent.aboutMission, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Mission Statement (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={editContent.aboutMission.bn}
                        onChange={(e) => setEditContent({ ...editContent, aboutMission: { ...editContent.aboutMission, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Vision Statement (English)</label>
                      <textarea
                        rows={2}
                        value={editContent.aboutVision.en}
                        onChange={(e) => setEditContent({ ...editContent, aboutVision: { ...editContent.aboutVision, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Vision Statement (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={editContent.aboutVision.bn}
                        onChange={(e) => setEditContent({ ...editContent, aboutVision: { ...editContent.aboutVision, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Core Contact details */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Contact Details (Coordinates)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Phone Support</label>
                      <input
                        type="tel"
                        value={editContent.contactPhone}
                        onChange={(e) => setEditContent({ ...editContent, contactPhone: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Support Email</label>
                      <input
                        type="email"
                        value={editContent.contactEmail}
                        onChange={(e) => setEditContent({ ...editContent, contactEmail: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Head Office Address (English)</label>
                      <input
                        type="text"
                        value={editContent.contactAddress.en}
                        onChange={(e) => setEditContent({ ...editContent, contactAddress: { ...editContent.contactAddress, en: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Head Office Address (বাংলা)</label>
                      <input
                        type="text"
                        value={editContent.contactAddress.bn}
                        onChange={(e) => setEditContent({ ...editContent, contactAddress: { ...editContent.contactAddress, bn: e.target.value } })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5">Facebook Page URL</label>
                    <input
                      type="url"
                      value={editContent.contactFacebookUrl}
                      onChange={(e) => setEditContent({ ...editContent, contactFacebookUrl: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:bg-white font-mono"
                    />
                  </div>
                </div>

              </form>
            )}

            {/* ----------------- TAB: SERVICES (CRUD) ----------------- */}
            {activeTab === 'services' && (
              <div className="space-y-6" id="panel-services-crud">
                
                {/* Create/Edit Form block */}
                <form onSubmit={handleCreateOrUpdateService} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-lg space-y-4">
                  <h3 className="font-sans font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-1.5">
                    <span>{serviceEditingId ? "Edit Existing Initiative Item" : "Create New Volunteer Initiative Card"}</span>
                  </h3>

                  {/* Dual titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={svcForm.titleEn}
                        onChange={(e) => setSvcForm({ ...svcForm, titleEn: e.target.value })}
                        placeholder="e.g. Flood Water Relief Camp"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Title (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={svcForm.titleBn}
                        onChange={(e) => setSvcForm({ ...svcForm, titleBn: e.target.value })}
                        placeholder="উদা: বিশুদ্ধ সুপেয় পানি বিতরণ"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  {/* Dual Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Description (English) *</label>
                      <textarea
                        rows={2}
                        required
                        value={svcForm.descEn}
                        onChange={(e) => setSvcForm({ ...svcForm, descEn: e.target.value })}
                        placeholder="Write dynamic impact goals..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Description (বাংলা) *</label>
                      <textarea
                        rows={2}
                        required
                        value={svcForm.descBn}
                        onChange={(e) => setSvcForm({ ...svcForm, descBn: e.target.value })}
                        placeholder="অংশগ্রহণ ও কার্যক্রম বিবরণ লিখুন..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* Icon and beneficiaries and costs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Visual Icon Name</label>
                      <select
                        value={svcForm.icon}
                        onChange={(e) => setSvcForm({ ...svcForm, icon: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800"
                      >
                        <option value="HeartHandshake">Heart/Handshake (সহায়তা)</option>
                        <option value="BookOpen">Book Open (শিক্ষা)</option>
                        <option value="Activity">Pulse Activity (চিকিৎসা)</option>
                        <option value="Flame">Flame/Coal (শীতবস্ত্র উষ্ণতা)</option>
                        <option value="TrendingUp">Trending Up (আত্মনির্ভরশীল)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Beneficiaries Count (English)</label>
                      <input
                        type="text"
                        value={svcForm.benefEn}
                        onChange={(e) => setSvcForm({ ...svcForm, benefEn: e.target.value })}
                        placeholder="e.g. 150 Families"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Beneficiaries Count (বাংলা)</label>
                      <input
                        type="text"
                        value={svcForm.benefBn}
                        onChange={(e) => setSvcForm({ ...svcForm, benefBn: e.target.value })}
                        placeholder="উদা: ১৫০টি পরিবার"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  {/* Costs display fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Unit Cost counter (English)</label>
                      <input
                        type="text"
                        value={svcForm.costEn}
                        onChange={(e) => setSvcForm({ ...svcForm, costEn: e.target.value })}
                        placeholder="e.g. Tk 500 per kid"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Unit Cost counter (বাংলা)</label>
                      <input
                        type="text"
                        value={svcForm.costBn}
                        onChange={(e) => setSvcForm({ ...svcForm, costBn: e.target.value })}
                        placeholder="উদা: ৫০০ টাকা প্রতি শিশু"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="svcToggleActive"
                      checked={svcForm.isActive}
                      onChange={(e) => setSvcForm({ ...svcForm, isActive: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded-sm"
                    />
                    <label htmlFor="svcToggleActive" className="text-xs font-bold text-stone-700">
                      Display on official homepage active grid?
                    </label>
                  </div>

                  {/* Form actions */}
                  <div className="flex items-center gap-2 justify-end pt-3 border-t border-stone-100">
                    {serviceEditingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setServiceEditingId(null);
                          setSvcForm({
                            titleEn: '', titleBn: '', descEn: '', descBn: '', icon: 'HeartHandshake', benefEn: '', benefBn: '', costEn: '', costBn: '', isActive: true
                          });
                        }}
                        className="px-4 py-2 border border-stone-200 hover:bg-stone-50 rounded-lg text-xs font-semibold text-stone-600"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      {serviceEditingId ? "Save Initiative Program" : "Add Initiative Program"}
                    </button>
                  </div>
                </form>

                {/* List container */}
                <div className="p-6 bg-white rounded-2xl border border-stone-200/60 shadow-md">
                  <h3 className="font-sans font-bold text-sm text-stone-900 mb-4 uppercase tracking-wider text-stone-400">
                    Currently Configured Activities ({services.length})
                  </h3>

                  <div className="space-y-3">
                    {services.map((svc) => (
                      <div 
                        key={svc.id} 
                        className={`p-4 border rounded-xl flex items-center justify-between gap-4 transition-all ${
                          svc.isActive ? 'bg-stone-50/50 border-stone-150' : 'bg-stone-100/50 border-stone-200 opacity-60'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-extrabold text-xs text-stone-900">{svc.title.en}</span>
                            <span className="text-[10px] text-stone-400">({svc.title.bn})</span>
                            {!svc.isActive && (
                              <span className="bg-stone-200 text-stone-600 px-1.5 py-0.5 text-[9px] font-bold rounded-sm">
                                Hidden
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-1 max-w-lg">{svc.description.en}</p>
                          <div className="flex gap-4 text-[10px] font-mono text-stone-400 pt-1">
                            <span>Beneficiaries: {svc.beneficiaries.en}</span>
                            {svc.costText && <span>Cost: {svc.costText.en}</span>}
                          </div>
                        </div>

                        {/* Action triggers */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleEditService(svc)}
                            className="p-1 px-2.5 bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold border border-stone-200 rounded-lg text-[10px] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService(svc.id)}
                            className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 hover:border-rose-100 rounded-lg transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* ----------------- TAB: GALLERY (CRUD) ----------------- */}
            {activeTab === 'gallery' && (
              <div className="space-y-6" id="panel-gallery-crud">
                
                {/* Form to submit image logs */}
                <form onSubmit={handleAddGalleryItem} className="bg-white rounded-2xl p-6 border border-stone-200/60 shadow-lg space-y-4">
                  <h3 className="font-sans font-bold text-base text-stone-900 border-b border-stone-100 pb-3">
                    Add Campaign Photograph Link
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Image URL address *</label>
                    <input
                      type="url"
                      required
                      value={galForm.imageUrl}
                      onChange={(e) => setGalForm({ ...galForm, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 font-mono"
                    />
                    <p className="text-[10px] text-stone-400 pt-1">Use fully hosted image links from Unsplash, Imgur, or Facebook CDN.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Caption / Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={galForm.titleEn}
                        onChange={(e) => setGalForm({ ...galForm, titleEn: e.target.value })}
                        placeholder="e.g. Distribution of 250 thick blankets"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Caption / Title (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={galForm.titleBn}
                        onChange={(e) => setGalForm({ ...galForm, titleBn: e.target.value })}
                        placeholder="উদা: শীতবস্ত্র বিতরণ - পঞ্চগড়"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Category (English) *</label>
                      <input
                        type="text"
                        required
                        value={galForm.categoryEn}
                        onChange={(e) => setGalForm({ ...galForm, categoryEn: e.target.value })}
                        placeholder="e.g. Disaster Relief"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Category (বাংলা) *</label>
                      <input
                        type="text"
                        required
                        value={galForm.categoryBn}
                        onChange={(e) => setGalForm({ ...galForm, categoryBn: e.target.value })}
                        placeholder="উদা: দুর্যোগ ত্রাণ"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Campaign Date</label>
                      <input
                        type="date"
                        value={galForm.date}
                        onChange={(e) => setGalForm({ ...galForm, date: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Publish to Campaign Gallery
                    </button>
                  </div>
                </form>

                {/* Grid preview catalog */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-md">
                  <h3 className="font-sans font-bold text-sm text-stone-900 mb-4 uppercase tracking-wider text-stone-400">
                    Live Pinned Photograph Catalog ({gallery.length})
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative border border-stone-100 rounded-xl overflow-hidden bg-stone-50 flex flex-col justify-between">
                        <div className="aspect-video w-full relative">
                          <img 
                            src={g.imageUrl} 
                            alt={g.title.en} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={() => handleDeleteGallery(g.id)}
                            className="absolute top-2 right-2 p-1.5 bg-white/95 rounded-lg text-stone-400 hover:text-rose-600 transition-colors shadow-xs hover:shadow-md border border-stone-100"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-2.5 bg-white">
                          <p className="text-[10px] font-bold text-stone-800 truncate">{g.title.en}</p>
                          <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block mt-1">
                            {g.category.en}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* ----------------- TAB: CONTACT INBOX MESSAGES ----------------- */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-lg space-y-6" id="panel-inbox">
                <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-sans font-bold text-xl text-stone-900">Direct Contact Messages</h3>
                    <p className="text-xs text-stone-500">View and manage messages submitted via the homepage Contact Form.</p>
                  </div>
                  <button
                    onClick={() => {
                      const marked = contactMessages.map(m => ({ ...m, isRead: true }));
                      onUpdateMessages(marked);
                      triggerSuccess("Marked all received letters as read.");
                    }}
                    className="text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Mark All Read
                  </button>
                </div>

                <div className="space-y-4">
                  {contactMessages.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <Mail className="w-12 h-12 stroke-1 mx-auto mb-3 text-stone-300" />
                      <p className="text-xs">Your Inbox is completely clean. No messages received yet.</p>
                    </div>
                  ) : (
                    contactMessages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                          msg.isRead ? 'bg-stone-50/50 border-stone-150' : 'bg-orange-50/30 border-orange-200 shadow-3xs'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex md:items-center justify-between flex-col md:flex-row gap-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-sans font-extrabold text-sm text-stone-900">{msg.name}</h4>
                              {!msg.isRead && (
                                <span className="bg-orange-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  New Message
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3 text-stone-300" />
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed border-l-2 border-stone-200 pl-3 italic">
                            &ldquo;{msg.message}&rdquo;
                          </p>

                          {/* Contact metadata */}
                          <div className="flex flex-wrap gap-4 pt-1.5 text-[11px] font-mono text-stone-500">
                            <span>Phone: <a href={`tel:${msg.phone}`} className="text-emerald-800 hover:underline">{msg.phone}</a></span>
                            {msg.email && (
                              <span>Email: <a href={`mailto:${msg.email}`} className="text-emerald-800 hover:underline">{msg.email}</a></span>
                            )}
                          </div>
                        </div>

                        {/* Message actions footer */}
                        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-stone-100/60">
                          {!msg.isRead && (
                            <button
                              onClick={() => {
                                const updated = contactMessages.map(m => m.id === msg.id ? { ...m, isRead: true } : m);
                                onUpdateMessages(updated);
                                triggerSuccess("Message marked as read.");
                              }}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md text-[10px] font-bold"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm("Permanently archive and delete this message?")) {
                                onUpdateMessages(contactMessages.filter(m => m.id !== msg.id));
                                triggerSuccess("Message post deleted.");
                              }
                            }}
                            className="p-1 px-2 hover:bg-rose-50 hover:text-rose-600 border border-stone-200 hover:border-rose-100 rounded-md text-[10px] text-stone-400 font-medium ml-1 flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* ----------------- TAB: ADMIN USER ACCOUNTS ----------------- */}
            {activeTab === 'users' && (
              <div className="space-y-6" id="panel-admin-logins">
                
                {/* Create Credentials Form */}
                <form onSubmit={handleCreateAdmin} className="bg-white rounded-2xl p-6 border border-stone-200/60 shadow-lg space-y-4">
                  <h3 className="font-sans font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-emerald-600" />
                    <span>Issue new admin credentials / security passcode</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Username / Email *</label>
                      <input
                        type="email"
                        required
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                        placeholder="e.g. adeel@gmail.com"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Numeric Passcode *</label>
                      <input
                        type="text"
                        required
                        value={newAdmin.passcode}
                        onChange={(e) => setNewAdmin({ ...newAdmin, passcode: e.target.value })}
                        placeholder="e.g. 7890"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Authority Clearance</label>
                      <select
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-800"
                      >
                        <option value="Super Admin">Super Admin (full control)</option>
                        <option value="Moderator">Moderator (view/add)</option>
                        <option value="Editor">Editor (only changes text)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Authorize Account
                    </button>
                  </div>
                </form>

                {/* Current Active Accounts */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-md">
                  <h3 className="font-sans font-bold text-sm text-stone-900 mb-4 uppercase tracking-wider text-stone-400">
                    Authorized Team Accounts ({admins.length})
                  </h3>

                  <div className="space-y-3">
                    {admins.map((adm) => (
                      <div key={adm.id} className="p-4 border border-stone-150 bg-stone-50/50 rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-extrabold text-xs text-stone-900">{adm.username}</span>
                            <span className="bg-stone-200 text-stone-700 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-md">
                              {adm.role}
                            </span>
                          </div>
                          <div className="flex gap-4 text-[10px] font-mono text-stone-400">
                            <span>Created: {adm.createdDate}</span>
                            <span>Last Active: {adm.lastActive ? new Date(adm.lastActive).toLocaleString() : "Never"}</span>
                          </div>
                        </div>

                        {/* Display & Show Passcode box */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="bg-stone-50 border border-stone-200 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold text-stone-700 flex items-center gap-1.5">
                            <Lock className="w-3 h-3 text-stone-400" />
                            <span>{showPasscodes[adm.id] ? adm.passcode : '••••'}</span>
                            <button
                              type="button"
                              onClick={() => toggleShowPasscode(adm.id)}
                              className="text-stone-400 hover:text-stone-700 p-0.5"
                            >
                              {showPasscodes[adm.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteAdmin(adm.id)}
                            disabled={adm.username === 'khaledtanim@gmail.com'}
                            className={`p-1.5 rounded-lg border ${
                              adm.username === 'khaledtanim@gmail.com'
                                ? 'opacity-30 border-stone-200 text-stone-300'
                                : 'text-stone-400 hover:text-rose-600 hover:bg-rose-50 border-stone-200 hover:border-rose-100'
                            }`}
                            title="Revoke Credentials"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* ----------------- TAB: ANALYTICS (REAL METRICS & LOGS) ----------------- */}
            {activeTab === 'analytics' && (
              <div className="space-y-6" id="panel-analytics">
                
                {/* Interactive Simulator Banner */}
                <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
                  <div className="space-y-2 relative z-10 text-center sm:text-left">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                      Live Sandbox
                    </span>
                    <h3 className="font-sans font-bold text-base sm:text-lg">Want to test live visitor tracking?</h3>
                    <p className="text-xs text-stone-400 max-w-md">
                      AI Studio has preloaded default traffic logs of Bangladeshi visitors. Click the simulator trigger to see how charts and analytics respond globally in real-time.
                    </p>
                  </div>
                  <button
                    onClick={simulateTraffic}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    <span>Simulate Live Traffic</span>
                  </button>
                </div>

                {/* Scorecard grids */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-stone-400">Total Page Hits</p>
                    <p className="font-sans text-2xl font-black text-stone-900 pt-1">{totalPageviews}</p>
                    <span className="text-[9px] text-emerald-600 font-semibold">100% accurate tracking</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-stone-400">Direct Land Visits</p>
                    <p className="font-sans text-2xl font-black text-emerald-800 pt-1">{webVisits}</p>
                    <span className="text-[9px] text-stone-500">Landing views</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-stone-400">Services Explored</p>
                    <p className="font-sans text-2xl font-black text-stone-900 pt-1">{serviceViews}</p>
                    <span className="text-[9px] text-stone-500">Service clicks</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-stone-400">Inbound Leads</p>
                    <p className="font-sans text-2xl font-black text-amber-600 pt-1">{contactsSubmitted}</p>
                    <span className="text-[9px] text-amber-700 font-bold">Contact letters</span>
                  </div>

                </div>

                {/* Visual Chart 1: SVG Traffic bar metrics & Device breakdowns side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Device distribution Chart (SVG native) */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
                    <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider mb-6">Device Distribution (Visits)</h4>
                    
                    <div className="flex items-center justify-around gap-6 py-2">
                      
                      {/* Simple clean visual SVG donut representation */}
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Base track */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f5f5f4" strokeWidth="3.5" />
                          
                          {/* Segment calculations */}
                          {(() => {
                            const total = Math.max(mobileCount + desktopCount + tabletCount, 1);
                            const pM = (mobileCount / total) * 100;
                            const pD = (desktopCount / total) * 100;
                            const pT = (tabletCount / total) * 100;

                            const offM = 0;
                            const offD = pM;
                            const offT = pM + pD;

                            return (
                              <>
                                {/* Mobile Segment - Emerald-600 */}
                                <circle 
                                  cx="18" cy="18" r="15.915" fill="none" stroke="#059669" strokeWidth="3.8" 
                                  strokeDasharray={`${pM} ${100 - pM}`} strokeDashoffset={100 - offM} 
                                />
                                {/* Desktop Segment - Gray-800 */}
                                <circle 
                                  cx="18" cy="18" r="15.915" fill="none" stroke="#1c1917" strokeWidth="3.8" 
                                  strokeDasharray={`${pD} ${100 - pD}`} strokeDashoffset={100 - offD} 
                                />
                                {/* Tablet Segment - Amber-500 */}
                                <circle 
                                  cx="18" cy="18" r="15.915" fill="none" stroke="#d97706" strokeWidth="3.8" 
                                  strokeDasharray={`${pT} ${100 - pT}`} strokeDashoffset={100 - offT} 
                                />
                              </>
                            );
                          })()}
                        </svg>
                        
                        <div className="absolute text-center">
                          <p className="text-xs font-semibold text-stone-400 leading-none">Total</p>
                          <p className="text-sm font-black text-stone-800 font-sans">{mobileCount + desktopCount + tabletCount}</p>
                        </div>
                      </div>

                      {/* Legends */}
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-emerald-600" />
                          <div>
                            <span className="font-semibold text-stone-800">Mobile ({mobileCount})</span>
                            <p className="text-[10px] text-stone-400">
                              {((mobileCount / Math.max(totalPageviews, 1)) * 100).toFixed(0)}% visits
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-stone-900" />
                          <div>
                            <span className="font-semibold text-stone-800">Desktop ({desktopCount})</span>
                            <p className="text-[10px] text-stone-400">
                              {((desktopCount / Math.max(totalPageviews, 1)) * 105).toFixed(0)}% visits
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm bg-amber-600" />
                          <div>
                            <span className="font-semibold text-stone-800">Tablet ({tabletCount})</span>
                            <p className="text-[10px] text-stone-400">
                              {((tabletCount / Math.max(totalPageviews, 1)) * 100).toFixed(0)}% visits
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Geolocation Traffic (Bangladeshi divisions) */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
                    <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider mb-4">BD Divisional Traffic</h4>
                    
                    <div className="space-y-3 pt-2">
                      {geoSorted.slice(0, 4).map(([location, count]) => {
                        const pct = ((count / Math.max(totalPageviews, 1)) * 100);
                        return (
                          <div key={location} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-stone-800">
                              <span>{location} Division</span>
                              <span>{count} hits ({pct.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${pct}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Log list table */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
                  <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider mb-4">Historical Activity Audit Trails</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="bg-stone-50 border-b border-stone-100 text-stone-400 font-semibold p-2">
                          <th className="py-2 px-3">Timestamp</th>
                          <th className="py-2 px-3">Division</th>
                          <th className="py-2 px-3">Action Type</th>
                          <th className="py-2 px-3">Device / Lang</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                        {trafficLogs.slice().reverse().slice(0, 10).map((log) => (
                          <tr key={log.id} className="hover:bg-stone-50/50">
                            <td className="py-2.5 px-3 font-mono text-stone-400 text-[10px]">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="font-semibold text-stone-800">{log.location}</span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] uppercase tracking-wide ${
                                log.action === 'submit_contact' ? 'bg-amber-100 text-amber-800' :
                                log.action === 'view_service' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-700'
                              }`}>
                                {log.action}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[10px] text-stone-400">
                              {log.device} • {log.language.toUpperCase()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}
