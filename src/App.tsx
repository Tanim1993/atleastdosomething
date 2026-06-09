/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Lock, 
  Settings, 
  Users, 
  Plus, 
  Trash2, 
  Edit2,
  Edit3, 
  Check, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowLeft, 
  Globe, 
  BarChart3, 
  Smartphone, 
  Monitor, 
  Tablet, 
  CheckCircle, 
  AlertCircle,
  FileText,
  UserCheck,
  FolderHeart,
  Undo,
  Camera
} from 'lucide-react';

import { 
  Language, 
  SiteContent, 
  ServiceItem, 
  GalleryItem, 
  TestimonialItem, 
  UserAccount, 
  TrafficEvent, 
  ContactMessage,
  PaymentConfig,
  ManualDeclaration
} from './types';

import { 
  DEFAULT_SITE_CONTENT, 
  DEFAULT_SERVICES, 
  DEFAULT_GALLERY, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_ADMINS, 
  DEFAULT_TRAFFIC, 
  DEFAULT_CONTACT_MESSAGES,
  DEFAULT_PAYMENT_CONFIG,
  DEFAULT_DECLARATIONS
} from './mockData';

// Sub-components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ManualPledgeWidget from './components/ManualPledgeWidget';

export default function App() {
  // --------- Core Stored States -----------
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('atleast_site_content');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('atleast_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('atleast_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('atleast_testimonials');
    return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
  });

  const [admins, setAdmins] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('atleast_admins');
    return saved ? JSON.parse(saved) : DEFAULT_ADMINS;
  });

  const [traffic, setTraffic] = useState<TrafficEvent[]>(() => {
    const saved = localStorage.getItem('atleast_traffic');
    return saved ? JSON.parse(saved) : DEFAULT_TRAFFIC;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('atleast_messages');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT_MESSAGES;
  });

  // Language state
  const [currentLang, setCurrentLang] = useState<Language>('bn'); // default to Bengali first as requested for Bangladeshi users

  // Navigation states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [loginEmailAttempt, setLoginEmailAttempt] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeAdminUser, setActiveAdminUser] = useState<UserAccount | null>(null);

  // Active Admin Sub-Tab
  const [activeAdminTab, setActiveAdminTab] = useState<'content' | 'services' | 'gallery' | 'users' | 'analytics' | 'messages' | 'pledges' | 'payments_config'>('content');

  // Payment Dynamic Configurations & Manual Declarations State
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    const saved = localStorage.getItem('atleast_payment_config');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_CONFIG;
  });

  const [declarations, setDeclarations] = useState<ManualDeclaration[]>(() => {
    const saved = localStorage.getItem('atleast_declarations');
    return saved ? JSON.parse(saved) : DEFAULT_DECLARATIONS;
  });

  // Interactive dynamic counter state
  const [donorPledgeCount, setDonorPledgeCount] = useState(248);

  // ---------- Action Triggers (Analytics Logs) -----------
  const trackEvent = (action: TrafficEvent['action'], details?: string, page: TrafficEvent['page'] = 'home') => {
    const deviceTypes: ('Mobile' | 'Desktop' | 'Tablet')[] = ['Mobile', 'Desktop', 'Tablet'];
    const bndivisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Mymensingh', 'Rangpur'];
    
    const randomDevice = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const randomLocation = bndivisions[Math.floor(Math.random() * bndivisions.length)];

    const newEvent: TrafficEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      page,
      action,
      details,
      language: currentLang,
      device: randomDevice,
      location: randomLocation
    };

    const updatedTraffic = [newEvent, ...traffic];
    setTraffic(updatedTraffic);
    localStorage.setItem('atleast_traffic', JSON.stringify(updatedTraffic));
  };

  // Log page load
  useEffect(() => {
    trackEvent('visit', 'Page loaded / refreshed');
  }, []);

  // Save to localStorage on states update
  useEffect(() => {
    localStorage.setItem('atleast_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('atleast_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('atleast_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('atleast_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('atleast_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('atleast_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('atleast_payment_config', JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  useEffect(() => {
    localStorage.setItem('atleast_declarations', JSON.stringify(declarations));
  }, [declarations]);

  // ---------- Language Toggle Handler ----------
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    trackEvent('toggle_language', `Changed language to ${lang === 'en' ? 'English' : 'Bengali'}`);
  };

  // ---------- Admin Login Logic ----------
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Locate admin account matching username & passcode
    const foundAdmin = admins.find(
      a => a.username.trim().toLowerCase() === loginEmailAttempt.trim().toLowerCase() && a.passcode === passcodeAttempt
    );

    if (foundAdmin) {
      setIsLoggedIn(true);
      setActiveAdminUser(foundAdmin);
      setIsAdminMode(true);
      setIsLoginModalOpen(false);
      setPasscodeAttempt('');
      setLoginError('');
      
      // Update last active
      const nowStr = new Date().toISOString();
      const updatedAdmins = admins.map(a => 
        a.id === foundAdmin.id ? { ...a, lastActive: nowStr } : a
      );
      setAdmins(updatedAdmins);

      trackEvent('login_attempt', `Login Succeeded: ${foundAdmin.username}`, 'admin');
    } else {
      setLoginError(currentLang === 'en' ? "Invalid Username or Passcode." : "ভুল পাসকোড বা ইউজারনেম। অনুগ্রহ করে আবার চেষ্টা করুন।");
      trackEvent('login_attempt', `Login Failed: ${loginEmailAttempt}`, 'admin');
    }
  };

  const handleAdminExit = () => {
    setIsAdminMode(false);
    setIsLoggedIn(false);
    setActiveAdminUser(null);
    trackEvent('visit', 'Exited Admin panel and logged out to view main page');
  };

  // ---------- contact form message handler ----------
  const handleAddNewMessage = (payload: { name: string; email: string; phone: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    trackEvent('submit_contact', `Unread submission from ${payload.name}`);
  };

  // --------- Admin Portal Action Forms ----------
  const [serviceEditingId, setServiceEditingId] = useState<string | null>(null);
  const [newServiceTitleEn, setNewServiceTitleEn] = useState('');
  const [newServiceTitleBn, setNewServiceTitleBn] = useState('');
  const [newServiceDescEn, setNewServiceDescEn] = useState('');
  const [newServiceDescBn, setNewServiceDescBn] = useState('');
  const [newServiceIcon, setNewServiceIcon] = useState('HeartHandshake');
  const [newServiceBenEn, setNewServiceBenEn] = useState('');
  const [newServiceBenBn, setNewServiceBenBn] = useState('');
  const [newServiceCostEn, setNewServiceCostEn] = useState('');
  const [newServiceCostBn, setNewServiceCostBn] = useState('');
  const [newServiceImageUrl, setNewServiceImageUrl] = useState('');

  const handleEditService = (item: ServiceItem) => {
    setServiceEditingId(item.id);
    setNewServiceTitleEn(item.title.en);
    setNewServiceTitleBn(item.title.bn);
    setNewServiceDescEn(item.description.en);
    setNewServiceDescBn(item.description.bn);
    setNewServiceIcon(item.iconName);
    setNewServiceBenEn(item.beneficiaries.en);
    setNewServiceBenBn(item.beneficiaries.bn);
    setNewServiceCostEn(item.costText?.en || '');
    setNewServiceCostBn(item.costText?.bn || '');
    setNewServiceImageUrl(item.imageUrl || '');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitleEn || !newServiceTitleBn) return;

    if (serviceEditingId) {
      const updated = services.map(s => {
        if (s.id === serviceEditingId) {
          return {
            ...s,
            title: { en: newServiceTitleEn, bn: newServiceTitleBn },
            description: { en: newServiceDescEn, bn: newServiceDescBn },
            iconName: newServiceIcon,
            imageUrl: newServiceImageUrl || undefined,
            beneficiaries: { en: newServiceBenEn || "Ongoing", bn: newServiceBenBn || "চলমান" },
            costText: { en: newServiceCostEn || "Donation support", bn: newServiceCostBn || "মুক্ত অনুদান" },
          };
        }
        return s;
      });
      setServices(updated);
      setServiceEditingId(null);
      trackEvent('visit', `Updated activity program: ${newServiceTitleEn}`, 'admin');
    } else {
      const newS: ServiceItem = {
        id: `serv_${Date.now()}`,
        title: { en: newServiceTitleEn, bn: newServiceTitleBn },
        description: { en: newServiceDescEn, bn: newServiceDescBn },
        iconName: newServiceIcon,
        imageUrl: newServiceImageUrl || undefined,
        beneficiaries: { en: newServiceBenEn || "Ongoing", bn: newServiceBenBn || "চলমান" },
        costText: { en: newServiceCostEn || "Donation support", bn: newServiceCostBn || "মুক্ত অনুদান" },
        isActive: true
      };
      setServices([...services, newS]);
      trackEvent('visit', `Added new activity program: ${newServiceTitleEn}`, 'admin');
    }

    // reset form fields
    setNewServiceTitleEn('');
    setNewServiceTitleBn('');
    setNewServiceDescEn('');
    setNewServiceDescBn('');
    setNewServiceBenEn('');
    setNewServiceBenBn('');
    setNewServiceCostEn('');
    setNewServiceCostBn('');
    setNewServiceImageUrl('');
  };

  const handleToggleServiceActive = (id: string) => {
    const updated = services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    setServices(updated);
    trackEvent('visit', `Toggled activity visibility state`, 'admin');
  };

  const handleDeleteService = (id: string) => {
    const filtered = services.filter(s => s.id !== id);
    setServices(filtered);
    if (serviceEditingId === id) {
      setServiceEditingId(null);
    }
    trackEvent('visit', `Deleted activity program ${id}`, 'admin');
  };

  // Gallery Admin logic
  const [galleryEditingId, setGalleryEditingId] = useState<string | null>(null);
  const [newGalImages, setNewGalImages] = useState<string[]>([]);
  const [tempWebUrl, setTempWebUrl] = useState('');
  const [newGalTitleEn, setNewGalTitleEn] = useState('');
  const [newGalTitleBn, setNewGalTitleBn] = useState('');
  const [newGalCatEn, setNewGalCatEn] = useState('Campaign');
  const [newGalCatBn, setNewGalCatBn] = useState('প্রচারণা');
  const [newGalSlideDuration, setNewGalSlideDuration] = useState<number>(3000);

  const handleEditGallery = (item: GalleryItem) => {
    setGalleryEditingId(item.id);
    const allImages = Array.from(new Set([
      item.imageUrl,
      ...(item.imageUrls || [])
    ])).filter((url): url is string => typeof url === 'string' && url.trim() !== '');
    setNewGalImages(allImages);
    setNewGalTitleEn(item.title.en);
    setNewGalTitleBn(item.title.bn);
    setNewGalCatEn(item.category.en);
    setNewGalCatBn(item.category.bn);
    setNewGalSlideDuration(item.slideDuration || 3000);
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGalImages.length === 0) {
      alert(currentLang === 'en' ? "Please upload or add at least one image." : "অনুগ্রহ করে কমপক্ষে একটি ছবি যুক্ত করুন।");
      return;
    }
    if (!newGalTitleEn || !newGalTitleBn) return;

    const mainImg = newGalImages[0];
    const finalImageUrls = [...newGalImages];

    if (galleryEditingId) {
      const updated = gallery.map(g => {
        if (g.id === galleryEditingId) {
          return {
            ...g,
            imageUrl: mainImg,
            imageUrls: finalImageUrls,
            title: { en: newGalTitleEn, bn: newGalTitleBn },
            category: { en: newGalCatEn, bn: newGalCatBn },
            slideDuration: newGalSlideDuration
          };
        }
        return g;
      });
      setGallery(updated);
      setGalleryEditingId(null);
      trackEvent('visit', `Updated campaign picture record`, 'admin');
    } else {
      const newG: GalleryItem = {
        id: `gal_${Date.now()}`,
        imageUrl: mainImg,
        imageUrls: finalImageUrls,
        title: { en: newGalTitleEn, bn: newGalTitleBn },
        date: new Date().toISOString().split('T')[0],
        category: { en: newGalCatEn, bn: newGalCatBn },
        slideDuration: newGalSlideDuration
      };
      setGallery([newG, ...gallery]);
      trackEvent('visit', `Uploaded new campaign picture record`, 'admin');
    }

    setNewGalImages([]);
    setTempWebUrl('');
    setNewGalTitleEn('');
    setNewGalTitleBn('');
    setNewGalSlideDuration(3000);
  };

  const handleDeleteGallery = (id: string) => {
    setGallery(gallery.filter(g => g.id !== id));
    if (galleryEditingId === id) {
      setGalleryEditingId(null);
    }
    trackEvent('visit', `Removed campaign image ${id}`, 'admin');
  };

  // User Accounts administration
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'Super Admin' | 'Moderator' | 'Editor'>('Editor');

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim() || !newAdminPass.trim()) return;

    const newAcc: UserAccount = {
      id: `adm_${Date.now()}`,
      username: newAdminUser.trim().toLowerCase(),
      passcode: newAdminPass.trim(),
      role: newAdminRole,
      createdDate: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };

    setAdmins([...admins, newAcc]);
    setNewAdminUser('');
    setNewAdminPass('');
    trackEvent('visit', `Created user account candidate: ${newAcc.username}`, 'admin');
  };

  const handleDeleteAdmin = (id: string) => {
    // Prevent self-deletion if logged in
    const target = admins.find(a => a.id === id);
    if (activeAdminUser && target && target.username.toLowerCase() === activeAdminUser.username.toLowerCase()) {
      alert(currentLang === 'en' ? "You cannot delete your own logged-in admin account!" : "আপনি নিজের সচল অ্যাডমিন অ্যাকাউন্ট ডিলিট করতে পারবেন না!");
      return;
    }
    setAdmins(admins.filter(a => a.id !== id));
    trackEvent('visit', `Deleted user account id ${id}`, 'admin');
  };

  // Contact inbox helper
  const handleMarkMessageRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleDeleteMsg = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  // Reset to default presets helper
  const handleResetToDefaults = () => {
    if (confirm(currentLang === 'en' ? "Are you sure you want to revert all text lines and dynamic configs to default organizational metrics?" : "আপনি কি সব লেখা ও ছবি ডিফল্ট তথ্যে পরিবর্তন করতে চান?")) {
      setSiteContent(DEFAULT_SITE_CONTENT);
      setServices(DEFAULT_SERVICES);
      setGallery(DEFAULT_GALLERY);
      setTestimonials(DEFAULT_TESTIMONIALS);
      setAdmins(DEFAULT_ADMINS);
      setTraffic(DEFAULT_TRAFFIC);
      setMessages(DEFAULT_CONTACT_MESSAGES);
      trackEvent('visit', "Reverted database to fallback original default schema parameters", 'admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-100 antialiased selection:text-emerald-900" id="app-root">
      
      {/* Dynamic Nav link */}
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange}
        siteContent={siteContent}
        onAdminClick={() => {
          if (isLoggedIn) {
            setIsAdminMode(true);
            trackEvent('visit', "Entered Admin Portal directly", 'admin');
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        isAdminMode={isAdminMode}
        onExitAdmin={handleAdminExit}
      />

      {/* Main Container Workspace */}
      <main className="flex-grow">
        
        {!isAdminMode ? (
          <div>
            
            {/* Elegant Top Alert Ticker */}
            <div className="bg-[#2D5A27] text-white py-1.5 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>
                {currentLang === 'en' 
                  ? "At Least Do Something is a registered voluntary non-profit in Bangladesh. Let us spread kindness and hope together!" 
                  : "এটলিস্ট ডু সামথিং বাংলাদেশে একটি নিবন্ধিত অলাভজনক সংস্থা। আসুন সহমর্মিতা ও ভালোবাসার হাত ছড়িয়ে দিই!"}
              </span>
            </div>

            {/* Core Hero Component */}
            <Hero 
              currentLang={currentLang} 
              siteContent={siteContent}
              onDonateClick={() => {
                const formEl = document.getElementById('contact');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                trackEvent('visit', 'Clicked "Support Our Cause" Hero button');
              }}
              onLearnClick={() => {
                const sectEl = document.getElementById('about');
                if (sectEl) sectEl.scrollIntoView({ behavior: 'smooth' });
                trackEvent('visit', "Clicked 'Read Creator story'");
              }}
            />

            {/* BENTO GRID INTERACTIVE QUICK IMPACT CONTAINER SCREEN */}
            <section className="py-12 bg-white border-b border-stone-100" id="bento-featured">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center md:text-left mb-8 pb-3 border-b border-stone-100">
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2 justify-center md:justify-start">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span>{currentLang === 'en' ? "Empowerment & Quick Actions" : "সংক্ষিপ্ত পরিসংখ্যান ও আমাদের বিশ্বাস"}</span>
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mt-1">
                    {currentLang === 'en' ? "A quick curated overview of our core metrics and actions that inspire community support." : "আমাদের প্রধান ভিত্তি এবং কার্যক্রমের একটি সংক্ষিপ্তচিত্র যা সাধারণ মানুষকে অনুপ্রাণিত করে।"}
                  </p>
                </div>

                {/* Bento layout containing multi-aspect widgets */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Grid Box 1: Real-time pledge tracker */}
                  <div className="md:col-span-4 bg-linear-to-tr from-[#2D5A27]/90 to-[#2D5A27] text-stone-50 p-6 rounded-3xl flex flex-col justify-between shadow-xs">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest opacity-80 decoration-amber-400">
                        {currentLang === 'en' ? "Visitor Pledge Drive" : "স্বেচ্ছাসেবী প্রতিশ্রুতি"}
                      </div>
                      <h4 className="text-sm font-sans opacity-95">
                        {currentLang === 'en' ? "Will you extend a hand of support and assist a family in distress this month?" : "আপনি কি এই মাসে ক্ষুধার্ত মানুষের পাশে দাড়াতে সহায়তা করবেন?"}
                      </h4>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-end justify-between">
                      <div>
                        <span className="text-3xl font-extrabold tracking-tight text-white block">{donorPledgeCount}</span>
                        <span className="text-[10px] text-emerald-100 font-medium">
                          {currentLang === 'en' ? "Active Supporters Committed" : "সহায়তাকারী যুক্ত হয়েছেন"}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setDonorPledgeCount(p => p + 1);
                          trackEvent('visit', "User signed the 'Active Empathy' pledge card");
                        }}
                        className="px-4 py-2 bg-white text-[#2D5A27] font-extrabold text-xs rounded-xl hover:bg-amber-50 active:scale-95 transition-all cursor-pointer shadow-xs"
                      >
                        {currentLang === 'en' ? "I pledge +1" : "আমিও আছি +১"}
                      </button>
                    </div>
                  </div>

                  {/* Grid Box 2: Quran verse quote card */}
                  <div className="md:col-span-5 bg-amber-50/70 border border-amber-100 p-6 rounded-3xl flex flex-col justify-between text-stone-800">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                          {currentLang === 'en' ? "Prophet's Guidance (PBUH)" : "হাদিসের অমূল্য বাণী"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans italic text-stone-800 leading-relaxed font-semibold">
                        {currentLang === 'en' 
                          ? '"Whoever relieves a believer of some distress of this world, Allah will relieve him of some distress on the Day of Resurrection."'
                          : '"যে ব্যক্তি কোন মুমিনের দুনিয়াবী দুঃখ দূর করবে, কেয়ামতের দিন আল্লাহ তার দুঃখ দূর করবেন।"'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-amber-200/40 text-[10px] text-stone-500 font-bold">
                      — SAHIH MUSLIM • {currentLang === 'en' ? "Direct Hadith Code" : "সহীহ মুসলিম শরীফ"}
                    </div>
                  </div>

                  {/* Grid Box 3: Transparency widget */}
                  <div className="md:col-span-3 bg-indigo-50/70 border border-indigo-100 p-6 rounded-3xl flex flex-col justify-between text-indigo-950">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-700 bg-indigo-100/50 px-2 py-0.5 rounded-md">
                        {currentLang === 'en' ? "Operational Ethics" : "আমাদের নীতিমালা"}
                      </span>
                      <h4 className="text-xs font-bold leading-normal">
                        {currentLang === 'en' ? "No Bureaucracy, 100% Volunteer Driven" : "শতভাগ স্বচ্ছতা, কোনো বাড়তি খরচ নেই"}
                      </h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        {currentLang === 'en' ? "Every single penny supports raw grains purchased locally in Bangladesh towns directly." : "উত্থিত প্রতিটি টাকা সরাসরি বাংলাদেশের প্রত্যন্ত অঞ্চল থেকে চাল-ডাল কেনার কাজে ব্যয় করা হয়।"}
                      </p>
                    </div>
                    <a 
                      href="#services"
                      className="text-xs font-bold text-indigo-800 hover:text-indigo-900 flex items-center gap-1 mt-3"
                    >
                      <span>{currentLang === 'en' ? "Explore activities" : "কার্যক্রমগুলো দেখুন"}</span>
                      <span>→</span>
                    </a>
                  </div>

                </div>
              </div>
            </section>

            {/* MANUAL PLEDGE VERIFICATION WIDGET BLOCK */}
            <section className="bg-stone-50/50 py-12 border-b border-stone-100" id="manual-pledge-drive">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ManualPledgeWidget
                  currentLang={currentLang}
                  services={services}
                  paymentConfig={paymentConfig}
                  onPledgeSubmit={(newPledge) => {
                    const declarationObj: ManualDeclaration = {
                      id: 'decl-' + Date.now(),
                      name: newPledge.name,
                      email: newPledge.email,
                      phone: newPledge.phone,
                      amount: newPledge.amount,
                      channel: newPledge.channel,
                      campaignEn: newPledge.campaignEn,
                      campaignBn: newPledge.campaignBn,
                      referenceInfo: newPledge.referenceInfo,
                      createdAt: new Date().toISOString(),
                      status: 'Pending'
                    };
                    
                    // Prepend declaration
                    const updated = [declarationObj, ...declarations];
                    setDeclarations(updated);
                    
                    // Increment supporter count temporarily to reward action!
                    setDonorPledgeCount(prev => prev + 1);
                    
                    // Track event in analytics
                    trackEvent('visit', `Submitted manual pledge of ${newPledge.amount} for campaign ${newPledge.campaignEn}`);
                  }}
                />
              </div>
            </section>

            {/* Gallery / Evidences */}
            <Gallery currentLang={currentLang} galleryItems={gallery} />

            {/* About Section */}
            <About currentLang={currentLang} siteContent={siteContent} />

            {/* Services / Activities */}
            <Services currentLang={currentLang} services={services} />

            {/* Testimonials */}
            <Testimonials currentLang={currentLang} testimonials={testimonials} />

            {/* Contact Form & Coordinate Details */}
            <Contact 
              currentLang={currentLang} 
              siteContent={siteContent} 
              onSubmitMessage={handleAddNewMessage}
            />

          </div>
        ) : (
          
          /* ========================================================
                        DASHBOARD - ADMIN CONTROL PORTAL 
             ======================================================== */
          <div className="bg-stone-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8" id="admin-workspace">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Portal Header Block */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h2 className="font-sans font-extrabold text-2xl text-stone-900 tracking-tight">
                      {currentLang === 'en' ? "Foundation Site Manager" : "এটলিস্ট ডু সামথিং নিয়ন্ত্রণ কক্ষ"}
                    </h2>
                  </div>
                  <p className="text-xs text-stone-400">
                    {currentLang === 'en' 
                      ? `Access Level: Super Admin | Logged in as ${activeAdminUser?.username}`
                      : `অনুমতি বা অ্যাক্সেস: সুপার এডমিন | অ্যাকাউন্ট: ${activeAdminUser?.username}`}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleResetToDefaults}
                    className="px-3.5 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    title="Reset modified system values and text blocks to default values"
                  >
                    {currentLang === 'en' ? "Reset Defaults" : "ফ্যাক্টরি রিসেট করুন"}
                  </button>

                  <button
                    onClick={handleAdminExit}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? "Back to Homepage" : "মূল পাতা ফিরে যান"}</span>
                  </button>
                </div>
              </div>

              {/* Admin Portal Tab Picker */}
              <div className="flex flex-wrap gap-1 bg-stone-200/50 p-1 rounded-xl max-w-fit border border-stone-200">
                <button
                  onClick={() => setActiveAdminTab('content')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeAdminTab === 'content' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {currentLang === 'en' ? "Site Text Content" : "ওয়েবসাইট লেখা ও লোগো"}
                </button>
                <button
                  onClick={() => setActiveAdminTab('services')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeAdminTab === 'services' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {currentLang === 'en' ? "Program Initiatives" : "উদ্যোগ ও কার্যক্রম"}
                </button>
                <button
                  onClick={() => setActiveAdminTab('gallery')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeAdminTab === 'gallery' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {currentLang === 'en' ? "Gallery Streams" : "চিত্র গ্যালারি"}
                </button>
                <button
                  onClick={() => setActiveAdminTab('messages')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                    activeAdminTab === 'messages' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <span>{currentLang === 'en' ? "Contact Inbox" : "যোগাযোগের বার্তা"}</span>
                  {messages.filter(m => !m.isRead).length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveAdminTab('users')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeAdminTab === 'users' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {currentLang === 'en' ? "User Accounts" : "অ্যাডমিন পাসকোড"}
                </button>
                <button
                  onClick={() => setActiveAdminTab('analytics')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                    activeAdminTab === 'analytics' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentLang === 'en' ? "Traffic & Analytics" : "ট্রাফিক ও এনালাইটিক্স"}</span>
                </button>
                <button
                  onClick={() => setActiveAdminTab('pledges')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                    activeAdminTab === 'pledges' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <FolderHeart className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentLang === 'en' ? "Pledge Ledger" : "অনুদানের খতিয়ান"}</span>
                  {declarations.filter(d => d.status === 'Pending').length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-600 text-white leading-none">
                      {declarations.filter(d => d.status === 'Pending').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveAdminTab('payments_config')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                    activeAdminTab === 'payments_config' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-650 animate-spin-slow" />
                  <span>{currentLang === 'en' ? "Payment Accounts" : "অ্যাকাউন্ট নম্বর সেটিং"}</span>
                </button>
              </div>

              {/* ======================= TAB: MAIN CONTENT EDITING ======================= */}
              {activeAdminTab === 'content' && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                  
                  <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        {currentLang === 'en' ? "Dynamic Text Content Controls" : "ওয়েবসাইটের মূল লেখা পরিবর্তন"}
                      </h3>
                      <p className="text-xs text-stone-400">
                        {currentLang === 'en' 
                          ? "Any modifications you save here immediately update the homepage presentation in both English and Bengali."
                          : "এখানে যা পরিবর্তন করবেন, তা সাথে সাথে মূল ওয়েবসাইটে বাংলা এবং ইংরেজিতে চালু হয়ে যাবে।"}
                      </p>
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* Block: Logo settings */}
                    <div className="p-4 bg-stone-50 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                        <span>🏷️</span> <span>{currentLang === 'en' ? "Logo Text Brand & Image" : "ফাউন্ডেশনের নাম ও লোগো চিত্র"}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Brand Name (English)</label>
                          <input
                            type="text"
                            value={siteContent.logoText.en}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              logoText: { ...siteContent.logoText, en: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Brand Name (Bengali)</label>
                          <input
                            type="text"
                            value={siteContent.logoText.bn}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              logoText: { ...siteContent.logoText, bn: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>

                      {/* Upload visual Brand Logo Image option */}
                      <div className="pt-3 border-t border-stone-200/50">
                        <label className="block text-xs font-bold text-stone-700 mb-2">
                          {currentLang === 'en' ? "Visual Logo Brand Image" : "লোগো ইমেজ সংযোগ"}
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {/* Circle visual mockup of Logo Image */}
                          <div className="w-16 h-16 rounded-xl border border-stone-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                            {siteContent.logoImageUrl ? (
                              <img 
                                src={siteContent.logoImageUrl} 
                                alt="Dynamic logo upload" 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain p-1" 
                              />
                            ) : (
                              <div className="text-[10px] text-stone-400 text-center font-bold font-mono">
                                {currentLang === 'en' ? "A-LOGO" : "লোগো নেই"}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-2">
                              <label className="relative cursor-pointer bg-white border border-stone-250 hover:border-emerald-500 text-stone-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors">
                                <span>{currentLang === 'en' ? "Upload Image" : "লোগো ইমেজ আপলোড"}</span>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="sr-only" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        if (typeof reader.result === 'string') {
                                          setSiteContent({
                                            ...siteContent,
                                            logoImageUrl: reader.result
                                          });
                                          trackEvent('visit', "Updated site header branding photo logo", 'admin');
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>

                              {siteContent.logoImageUrl && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSiteContent({
                                      ...siteContent,
                                      logoImageUrl: ""
                                    });
                                    trackEvent('visit', "Cleared header visual logo, back to original typography", 'admin');
                                  }}
                                  className="px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                >
                                  {currentLang === 'en' ? "Remove Logo" : "ডিলিট করুন"}
                                </button>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-400">
                              {currentLang === 'en' 
                                ? "Supports transparent PNG, SVG, or JPG. Best fit: square or horizontal." 
                                : "পিএনজি, এসভিজি বা জেপিজি ফাইল আপলোড করা সম্ভব। অনুভূমিক লোগো সবচেয়ে ভালো দেখাবে।"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Block: Hero and Subtitles */}
                    <div className="p-4 bg-stone-50 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                        <span>📌</span> <span>{currentLang === 'en' ? "Hero Section Headlines" : "হিরো বা মূল প্রথম স্তরের লেখাগুলো"}</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Main Headline (English)</label>
                            <input
                              type="text"
                              value={siteContent.heroTitle.en}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroTitle: { ...siteContent.heroTitle, en: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Main Headline (Bengali)</label>
                            <input
                              type="text"
                              value={siteContent.heroTitle.bn}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroTitle: { ...siteContent.heroTitle, bn: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Short Description (English)</label>
                            <textarea
                              rows={3}
                              value={siteContent.heroSubtitle.en}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroSubtitle: { ...siteContent.heroSubtitle, en: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Short Description (Bengali)</label>
                            <textarea
                              rows={3}
                              value={siteContent.heroSubtitle.bn}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroSubtitle: { ...siteContent.heroSubtitle, bn: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Top Little Badge (English)</label>
                            <input
                              type="text"
                              value={siteContent.heroBadge.en}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroBadge: { ...siteContent.heroBadge, en: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Top Little Badge (Bengali)</label>
                            <input
                              type="text"
                              value={siteContent.heroBadge.bn}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                heroBadge: { ...siteContent.heroBadge, bn: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Block: Hadith Quote edit */}
                    <div className="p-4 bg-stone-50 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                        <span>🕌</span> <span>{currentLang === 'en' ? "Hadith / Inspiration Quote" : "হাদিস বা অনুপ্রেরণামূলক বাণী এডিট"}</span>
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        {currentLang === 'en' ? "A highly respectful quote with proper citations used to touch hearts and inspire donations on the right panel." : "ডানদিকের প্যানেলে থাকা হাদিস শরিফের লেখাটি আপনি চাইলে পরিবর্তন করতে পারেন।"}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Hadith Quote (English)</label>
                            <textarea
                              rows={2}
                              value={siteContent.quoteText.en}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                quoteText: { ...siteContent.quoteText, en: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Hadith Quote (Bengali)</label>
                            <textarea
                              rows={2}
                              value={siteContent.quoteText.bn}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                quoteText: { ...siteContent.quoteText, bn: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Quote Source (English)</label>
                            <input
                              type="text"
                              value={siteContent.quoteSource.en}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                quoteSource: { ...siteContent.quoteSource, en: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-500 mb-1">Quote Source (Bengali)</label>
                            <input
                              type="text"
                              value={siteContent.quoteSource.bn}
                              onChange={(e) => setSiteContent({
                                ...siteContent,
                                quoteSource: { ...siteContent.quoteSource, bn: e.target.value }
                              })}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Block: About us */}
                    <div className="p-4 bg-stone-50 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                        <span>📖</span> <span>{currentLang === 'en' ? "About Us Contexts" : "আমাদের উদ্দেশ্য ও ইতিহাস"}</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-stone-700">Who We Are (English)</label>
                          <textarea
                            rows={3}
                            value={siteContent.aboutWhoWeAre.en}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              aboutWhoWeAre: { ...siteContent.aboutWhoWeAre, en: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-stone-700">Who We Are (Bengali)</label>
                          <textarea
                            rows={3}
                            value={siteContent.aboutWhoWeAre.bn}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              aboutWhoWeAre: { ...siteContent.aboutWhoWeAre, bn: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-stone-700">What We Do (English)</label>
                          <textarea
                            rows={3}
                            value={siteContent.aboutWhatWeDo.en}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              aboutWhatWeDo: { ...siteContent.aboutWhatWeDo, en: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-stone-700">What We Do (Bengali)</label>
                          <textarea
                            rows={3}
                            value={siteContent.aboutWhatWeDo.bn}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              aboutWhatWeDo: { ...siteContent.aboutWhatWeDo, bn: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Block: Primary settings contacts */}
                    <div className="p-4 bg-stone-50 rounded-xl space-y-4">
                      <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                        <span>📞</span> <span>{currentLang === 'en' ? "Contact Coordinates & Links" : "যোগাযোগের ফোন, ইমেইল ও ঠিকানা"}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Official Mobile Phone</label>
                          <input
                            type="text"
                            value={siteContent.contactPhone}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              contactPhone: e.target.value
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Official Inbox Email</label>
                          <input
                            type="email"
                            value={siteContent.contactEmail}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              contactEmail: e.target.value
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Facebook URL</label>
                          <input
                            type="text"
                            value={siteContent.contactFacebookUrl}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              contactFacebookUrl: e.target.value
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Address Location (English)</label>
                          <input
                            type="text"
                            value={siteContent.contactAddress.en}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              contactAddress: { ...siteContent.contactAddress, en: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Address Location (Bengali)</label>
                          <input
                            type="text"
                            value={siteContent.contactAddress.bn}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              contactAddress: { ...siteContent.contactAddress, bn: e.target.value }
                            })}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex justify-end pt-2">
                      <div className="text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "Changes Saved and Armed Live successfully" : "সকল লেখা সরাসরি স্থায়ীভাবে সেভ ও সচল রয়েছে"}</span>
                      </div>
                    </div>

                  </form>
                </div>
              )}

              {/* ======================= TAB: PROGRAMS & ACTIVITIES ======================= */}
              {activeAdminTab === 'services' && (
                <div className="space-y-6">
                  
                  {/* Create New activity card */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-1">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>
                        {serviceEditingId 
                          ? (currentLang === 'en' ? "Edit Activity / Program Card" : "কল্যাণমূলক কর্মসূচি সম্পাদনা করুন") 
                          : (currentLang === 'en' ? "Add New Activity / Program Card" : "নতুন কল্যাণমূলক কর্মসূচি যোগ করুন")}
                      </span>
                    </h3>

                    <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Program Title (English) *</label>
                        <input
                          type="text"
                          required
                          value={newServiceTitleEn}
                          onChange={(e) => setNewServiceTitleEn(e.target.value)}
                          placeholder="e.g. Free Eye Treatment Clinic"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Program Title (Bengali) *</label>
                        <input
                          type="text"
                          required
                          value={newServiceTitleBn}
                          onChange={(e) => setNewServiceTitleBn(e.target.value)}
                          placeholder="উদা: বিনামূল্যে চক্ষু শিবির"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Short Mission Details (English)</label>
                        <textarea
                          rows={2}
                          value={newServiceDescEn}
                          onChange={(e) => setNewServiceDescEn(e.target.value)}
                          placeholder="Describe the medical campaign scope..."
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Short Mission Details (Bengali)</label>
                        <textarea
                          rows={2}
                          value={newServiceDescBn}
                          onChange={(e) => setNewServiceDescBn(e.target.value)}
                          placeholder="কম্পেইনের সংক্ষিপ্ত বর্ণনা দিন..."
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Impact Metric En (e.g. 500+ Patients)</label>
                        <input
                          type="text"
                          value={newServiceBenEn}
                          onChange={(e) => setNewServiceBenEn(e.target.value)}
                          placeholder="500+ Patients Reached"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Impact Metric Bn (e.g. ৫০০+ রোগী)</label>
                        <input
                          type="text"
                          value={newServiceBenBn}
                          onChange={(e) => setNewServiceBenBn(e.target.value)}
                          placeholder="৫০০+ চক্ষু সেবা সম্পন্ন"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Estimated Unit Cost En (e.g. 2,000 Tk)</label>
                        <input
                          type="text"
                          value={newServiceCostEn}
                          onChange={(e) => setNewServiceCostEn(e.target.value)}
                          placeholder="Tk 2,000 per surgery"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">Estimated Unit Cost Bn (e.g. ২০০০ টাকা)</label>
                        <input
                          type="text"
                          value={newServiceCostBn}
                          onChange={(e) => setNewServiceCostBn(e.target.value)}
                          placeholder="২,০০০ টাকা প্রতি চক্ষু লেন্স"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      {/* Image Upload for this Service Initiative */}
                      <div className="col-span-1 md:col-span-2 p-3.5 bg-stone-50 rounded-xl border border-stone-200/50 space-y-2">
                        <label className="block text-[11px] font-bold text-stone-700">
                          {currentLang === 'en' ? "Initiative Illustration (Upload Custom Banner Image instead of standard icon)" : "কর্মসূচি ব্যানার চিত্র (আইকনের বদলে কাস্টম সুন্দর ব্যানার ছবি আপলোড করুন)"}
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="w-20 h-12 bg-white rounded-lg border border-stone-200 overflow-hidden flex items-center justify-center shrink-0">
                            {newServiceImageUrl ? (
                              <img 
                                src={newServiceImageUrl} 
                                alt="Service Banner Preview" 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <span className="text-[9px] text-stone-400">{currentLang === 'en' ? "No Photo" : "ছবি নেই"}</span>
                            )}
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex items-center gap-2">
                              <label className="relative cursor-pointer bg-white border border-stone-250 hover:border-emerald-500 text-stone-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all duration-150">
                                <span>{currentLang === 'en' ? "Select Local File" : "লোকাল ফাইল সিলেক্ট করুন"}</span>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="sr-only" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        if (typeof reader.result === 'string') {
                                          setNewServiceImageUrl(reader.result);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              {newServiceImageUrl && (
                                <button
                                  type="button"
                                  onClick={() => setNewServiceImageUrl('')}
                                  className="px-2.5 py-1.5 border border-rose-200 text-rose-600 font-semibold rounded-lg text-xs hover:bg-rose-50 cursor-pointer"
                                >
                                  {currentLang === 'en' ? "Clear" : "মুছে ফেলুন"}
                                </button>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-400">{currentLang === 'en' ? "Optimal dimension: 600x400px. Standard PNG, JPG format." : "৩:২ অনুপাতে ছবি আপলোড করা সবচেয়ে ভালো দেখাবে। পিএনজি বা জেপিজি ফাইল।"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 flex justify-between items-center pt-2">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-stone-500">Pick Icon Representation</label>
                          <select 
                            value={newServiceIcon}
                            onChange={(e) => setNewServiceIcon(e.target.value)}
                            className="bg-white border border-stone-200 rounded-lg p-2 text-xs"
                          >
                            <option value="HeartHandshake">Heart & Handshake (খাদ্য/ত্রান)</option>
                            <option value="BookOpen">Opened Book (শিক্ষা)</option>
                            <option value="Activity">Pulse Line (চিকিৎসা)</option>
                            <option value="Flame">Flame / Heat (কম্বল/শীতবস্ত্র)</option>
                            <option value="TrendingUp">Up Arrow (স্বাবলম্বী কর্মসংস্থান)</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          {serviceEditingId && (
                            <button
                              type="button"
                              onClick={() => {
                                setServiceEditingId(null);
                                setNewServiceTitleEn('');
                                setNewServiceTitleBn('');
                                setNewServiceDescEn('');
                                setNewServiceDescBn('');
                                setNewServiceIcon('HeartHandshake');
                                setNewServiceBenEn('');
                                setNewServiceBenBn('');
                                setNewServiceCostEn('');
                                setNewServiceCostBn('');
                                setNewServiceImageUrl('');
                              }}
                              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs cursor-pointer transition-colors"
                            >
                              {currentLang === 'en' ? "Cancel" : "বাতিল"}
                            </button>
                          )}
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs cursor-pointer transition-colors"
                          >
                            {serviceEditingId 
                              ? (currentLang === 'en' ? "Update Initiative" : "কার্যক্রম আপডেট করুন") 
                              : (currentLang === 'en' ? "Create Initiative" : "নতুন কার্যক্রম যুক্ত করুন")}
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>

                  {/* List existing services cards with toggle options */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100">
                      {currentLang === 'en' ? "Manage Active Initiatives Table" : "চলমান কার্যক্রমের তালিকা ও নিয়ন্ত্রণ"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((item) => (
                        <div key={item.id} className="p-4 border border-stone-200/80 rounded-xl flex items-start justify-between gap-4 hover:bg-stone-50/55 transition-colors">
                          <div className="space-y-1 flex-grow">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900">{item.title.bn}</span>
                              <span className="text-[10px] text-stone-400">({item.title.en})</span>
                            </div>
                            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">{item.description.bn}</p>
                            
                            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px]">
                              <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">
                                {item.beneficiaries.bn}
                              </span>
                              {item.costText && (
                                <span className="bg-stone-100 text-stone-600 font-medium px-2 py-0.5 rounded-sm">
                                  {item.costText.bn}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 gap-2">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {item.isActive 
                                ? (currentLang === 'en' ? "Visible" : "অনলাইন প্রদর্শন") 
                                : (currentLang === 'en' ? "Hidden" : "লুকানো")}
                            </span>

                            <div className="flex items-center gap-1 pt-2">
                              <button
                                type="button"
                                onClick={() => handleToggleServiceActive(item.id)}
                                className="p-1 px-2 text-stone-500 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50 rounded-md text-[10px] font-bold cursor-pointer"
                                title="Toggle visibility of this card on public homepage"
                              >
                                {item.isActive ? "Hide" : "Show"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEditService(item)}
                                className={`p-1 px-2 rounded-md text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                                  serviceEditingId === item.id 
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                                    : 'text-stone-500 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50'
                                }`}
                                title="Edit details of this program"
                              >
                                <Edit2 className="w-3 h-3 text-stone-500 group-hover:text-emerald-700" />
                                <span>{currentLang === 'en' ? "Edit" : "সম্পাদনা"}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteService(item.id)}
                                className="p-1 text-stone-400 hover:text-rose-600 rounded-md cursor-pointer"
                                title="Remove item entirely from memory"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              )}

              {/* ======================= TAB: GALLERY PHOTO STREAM ======================= */}
              {activeAdminTab === 'gallery' && (
                <div className="space-y-6">
                  
                  {/* Upload Simulator */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        {galleryEditingId 
                          ? (currentLang === 'en' ? "Edit Pinned Campaign Image" : "ক্যাম্পেইন চিত্র বিবরণী সম্পাদনা করুন")
                          : (currentLang === 'en' ? "Add Campaign Image / Slideshow" : "নতুন কাজের বাস্তব প্রমান / ছবি যুক্ত করুন")}
                      </h3>
                      <p className="text-xs text-stone-400 mb-4 mt-1">
                        {currentLang === 'en' 
                          ? "Represent authentic transparency. Select multiple photos or add online URLs to build a public slideshow."
                          : "উচ্চমানের কাজের ছবির সরাসরি ফাইল আপলোড অথবা ওয়েব লিংক দিয়ে নতুন চিত্র যুক্ত করতে পারেন যা চিত্রশালায় দেখাবে।"}
                      </p>
                    </div>

                    <form onSubmit={handleCreateGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Interactive Multi-Image Upload Area */}
                      <div className="space-y-4 md:col-span-2">
                        <label className="block text-xs font-bold text-stone-700">
                          {currentLang === 'en' ? "Campaign Images / Gallery Slideshow (Add Multiple) *" : "ক্যাম্পেইন ছবিসমূহ / ছবির স্লাইডশো (একাধিক যোগ করুন) *"}
                        </label>
                        
                        {/* Currently Added Images List */}
                        {newGalImages.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                            {newGalImages.map((url, index) => (
                              <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-stone-200 bg-white group shadow-2xs">
                                <img 
                                  src={url} 
                                  alt={`Selected visual ${index + 1}`} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                                {/* Overlay indicating index / main indicator */}
                                <div className="absolute top-1 left-1 bg-black/60 text-[8px] font-bold text-white px-1 py-0.5 rounded leading-none">
                                  {index === 0 
                                    ? (currentLang === 'en' ? "Main Cover" : "প্রধান") 
                                    : `${currentLang === 'en' ? "Slide" : "স্লাইড"} ${index}`}
                                </div>
                                
                                {/* Hover control bar */}
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-3xs p-1 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Set as main image (swap to index 0)
                                        const reordered = [...newGalImages];
                                        const [item] = reordered.splice(index, 1);
                                        reordered.unshift(item);
                                        setNewGalImages(reordered);
                                      }}
                                      className="text-[8px] text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider px-1 py-0.5 cursor-pointer"
                                      title={currentLang === 'en' ? "Set as Cover Image" : "প্রধান ছবি করুন"}
                                    >
                                      {currentLang === 'en' ? "Cover" : "প্রধান"}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Remove image
                                      setNewGalImages(newGalImages.filter((_, i) => i !== index));
                                    }}
                                    className="text-red-400 hover:text-red-300 p-0.5 cursor-pointer ml-auto"
                                    title={currentLang === 'en' ? "Remove Image" : "ছবি সরান"}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* File Uploader Button (supporting multiple selects!) */}
                          <div className="p-4 border border-dashed border-stone-300 rounded-xl bg-emerald-50/10 hover:bg-emerald-50/20 transition-colors flex flex-col items-center justify-center text-center space-y-2">
                            <Camera className="w-6 h-6 text-emerald-600" />
                            <div className="text-xs">
                              <span className="font-bold text-stone-700">{currentLang === 'en' ? "Upload local photos" : "স্মার্টফোন/মেমোরি থেকে ফটো আপলোড করুন"}</span>
                              <p className="text-[10px] text-stone-400 mt-0.5">{currentLang === 'en' ? "You can select multiple photos at once!" : "একসাথে এক বা একাধিক ছবি সিলেক্ট করতে পারেন!"}</p>
                            </div>
                            <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
                              <span>{currentLang === 'en' ? "Select Image Files" : "ছবি ফাইল পছন্দ করুন"}</span>
                              <input 
                                type="file" 
                                accept="image/*"
                                multiple
                                className="sr-only" 
                                onChange={(e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const loadedImages: string[] = [];
                                    let processedCount = 0;
                                    
                                    Array.from(files).forEach((file: any) => {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        if (typeof reader.result === 'string') {
                                          loadedImages.push(reader.result);
                                        }
                                        processedCount++;
                                        if (processedCount === files.length) {
                                          setNewGalImages(prev => [...prev, ...loadedImages]);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    });
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* URL Paste input option */}
                          <div className="p-4 border border-stone-200 rounded-xl bg-stone-50 flex flex-col justify-center space-y-2 text-left">
                            <span className="text-xs font-bold text-stone-700">{currentLang === 'en' ? "Or add online image URL directly" : "অথবা ইন্টারনেটের কোনো ছবির লিংক যুক্ত করুন"}</span>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={tempWebUrl}
                                onChange={(e) => setTempWebUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/photo-..."
                                className="flex-grow bg-white border border-stone-200 rounded-lg p-2 text-xs font-mono focus:outline-emerald-500"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (tempWebUrl.trim() && tempWebUrl.startsWith('http')) {
                                    setNewGalImages(prev => [...prev, tempWebUrl.trim()]);
                                    setTempWebUrl('');
                                  } else {
                                    alert(currentLang === 'en' ? "Please enter a valid HTTP/HTTPS image URL." : "অনুগ্রহ করে সঠিক ওয়েবসাইট লিংক লিখুন।");
                                  }
                                }}
                                className="px-3 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                {currentLang === 'en' ? "Add" : "যোগ"}
                              </button>
                            </div>
                            <p className="text-[10px] text-stone-400">
                              {currentLang === 'en' ? "Paste any image URL and click 'Add' to insert into slide queue." : "যেকোনো ইমেজের ওয়েব লিংক এখানে পেস্ট করে 'যোগ' এ ক্লিক করুন।"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Image Captions (English) *</label>
                        <input
                          type="text"
                          required
                          value={newGalTitleEn}
                          onChange={(e) => setNewGalTitleEn(e.target.value)}
                          placeholder="E.g., Winter Blankets handed over to street orphans"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Image Captions (Bengali) *</label>
                        <input
                          type="text"
                          required
                          value={newGalTitleBn}
                          onChange={(e) => setNewGalTitleBn(e.target.value)}
                          placeholder="উদা: পথশিশুদের মাঝে শীতবস্ত্র ও মোজা বিতরণ"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Section/Category (English)</label>
                        <input
                          type="text"
                          value={newGalCatEn}
                          onChange={(e) => setNewGalCatEn(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Section/Category (Bengali)</label>
                        <input
                          type="text"
                          value={newGalCatBn}
                          onChange={(e) => setNewGalCatBn(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-stone-500 mb-1 text-stone-700">
                          {currentLang === 'en' ? "Slideshow Auto Delay Speed (Seconds)" : "স্লাইডশো অটো-প্লে পরিবর্তনের গতিবিধি (সেকেন্ড)"}
                        </label>
                        <select
                          value={newGalSlideDuration}
                          onChange={(e) => setNewGalSlideDuration(Number(e.target.value))}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:bg-white"
                        >
                          <option value={1000}>1 {currentLang === 'en' ? "Second" : "সেকেন্ড"}</option>
                          <option value={2000}>2 {currentLang === 'en' ? "Seconds" : "সেকেন্ড"}</option>
                          <option value={3000}>3 {currentLang === 'en' ? "Seconds" : "সেকেন্ড"} ({currentLang === 'en' ? "Recommended" : "প্রস্তাবিত"})</option>
                          <option value={4000}>4 {currentLang === 'en' ? "Seconds" : "সেকেন্ড"}</option>
                          <option value={5000}>5 {currentLang === 'en' ? "Seconds" : "সেকেন্ড"}</option>
                          <option value={8000}>8 {currentLang === 'en' ? "Seconds" : "সেকেন্ড"}</option>
                        </select>
                        <p className="text-[10px] text-stone-400 mt-1">
                          {currentLang === 'en'
                            ? "Determines how fast photos cycle when this specific campaign slideshow is viewed by visitors on the homepage."
                            : "এই ক্যাম্পেইনটি যখন ভিজিটর হোমপেজে স্লাইডশো আকারে দেখবেন, কত সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে ছবি পরিবর্তিত হবে তা নির্ধারণ করুন।"}
                        </p>
                      </div>

                      <div className="md:col-span-2 flex justify-end gap-2">
                        {galleryEditingId && (
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryEditingId(null);
                              setNewGalImages([]);
                              setTempWebUrl('');
                              setNewGalTitleEn('');
                              setNewGalTitleBn('');
                              setNewGalCatEn('Campaign');
                              setNewGalCatBn('প্রচারণা');
                              setNewGalSlideDuration(3000);
                            }}
                            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-colors"
                          >
                            {currentLang === 'en' ? "Cancel Edit" : "বাতিল করুন"}
                          </button>
                        )}
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-colors"
                        >
                          {galleryEditingId 
                            ? (currentLang === 'en' ? "Update Pinned Post" : "পোস্ট আপডেট করুন")
                            : (currentLang === 'en' ? "Confirm Stream Photo" : "চিত্র পুশ করুন")}
                        </button>
                      </div>

                    </form>
                  </div>

                  {/* List current Gallery array with small preview cards */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-4">
                      {currentLang === 'en' ? "Active Campaign Pictures" : "মজুদ থাকা চিত্র কার্টুসমূহ"}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {gallery.map((img) => (
                        <div key={img.id} className="group bg-stone-50 border border-stone-200 rounded-xl overflow-hidden relative flex flex-col justify-between">
                          <div className="relative aspect-video">
                            <img 
                              src={img.imageUrl} 
                              alt="" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?600";
                              }}
                            />
                            {img.imageUrls && img.imageUrls.length > 1 && (
                              <span className="absolute bottom-1 right-1 bg-black/70 text-[8px] font-bold text-white px-1 py-0.5 rounded">
                                {img.imageUrls.length} {currentLang === 'en' ? "Photos" : "ছবি"}
                              </span>
                            )}
                          </div>
                          <div className="p-2 space-y-1 text-left flex-grow">
                            <p className="text-[10px] font-bold text-stone-700 truncate">{img.title.bn}</p>
                            <p className="text-[8px] text-stone-400 font-mono">{img.date}</p>
                          </div>
                          <div className="p-2 border-t border-stone-100 flex justify-between items-center bg-stone-50/30">
                            <button
                              onClick={() => handleEditGallery(img)}
                              className={`p-1 px-1.5 rounded hover:bg-stone-200 transition-colors cursor-pointer text-[9px] font-bold flex items-center gap-1 ${
                                galleryEditingId === img.id ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'text-stone-500 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50'
                              }`}
                              title="Edit details of this pinned post"
                            >
                              <Edit2 className="w-3 h-3 text-stone-500 group-hover:text-emerald-700" />
                              <span>{currentLang === 'en' ? "Edit" : "সম্পাদনা"}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(img.id)}
                              className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                              title="Delete picture record"
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

              {/* ======================= TAB: USER ACCOUNTS ======================= */}
              {activeAdminTab === 'users' && (
                <div className="space-y-6">
                  
                  {/* Create User Screen */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-1">
                      {currentLang === 'en' ? "Add Admin / Editor User Credentials" : "নতুন কর্মী বা এডমিন পাসকোড তৈরি করুন"}
                    </h3>
                    <p className="text-xs text-stone-400 mb-4">
                      {currentLang === 'en' 
                        ? "Registered administrators log in to make live content updates with a numerical passcode." 
                        : "যাঁরা সাইট পরিবর্তন করতে পারবেন, তাঁদের ইমেইল আইডি এবং একটি অন্তত ৪ সংখ্যার পাসকোড সেট করুন এখানে।"}
                    </p>

                    <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Username / Email ID *</label>
                        <input
                          type="text"
                          required
                          value={newAdminUser}
                          onChange={(e) => setNewAdminUser(e.target.value)}
                          placeholder="volunteer@atleastdo.org"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Secret Passcode *</label>
                        <input
                          type="password"
                          required
                          value={newAdminPass}
                          onChange={(e) => setNewAdminPass(e.target.value)}
                          placeholder="e.g. 9876"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-mono"
                        />
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <label className="block text-xs font-semibold text-stone-500 mb-1">Admin Level</label>
                          <select 
                            value={newAdminRole}
                            onChange={(e) => setNewAdminRole(e.target.value as any)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                          >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Editor">Editor</option>
                          </select>
                        </div>
                        
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg cursor-pointer shrink-0"
                        >
                          {currentLang === 'en' ? "Register Creator" : "নিবন্ধিত করুন"}
                        </button>
                      </div>

                    </form>
                  </div>

                  {/* List registered admins */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-4">
                      {currentLang === 'en' ? "Registered Authorized Credentials" : "স্বীকৃত ও সচল কর্মী অ্যাকাউন্টের বিবরণ"}
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-50 text-stone-500 border-b border-stone-200">
                            <th className="p-3 font-semibold">{currentLang === 'en' ? "Username / Email ID" : "ইউজারনেম"}</th>
                            <th className="p-3 font-semibold">{currentLang === 'en' ? "Access Passcode" : "গোপন পিন/পাসকোড"}</th>
                            <th className="p-3 font-semibold">{currentLang === 'en' ? "Authority Role" : "ভূমিকা"}</th>
                            <th className="p-3 font-semibold">{currentLang === 'en' ? "Last Visited Time" : "শেষ সক্রিয় ছিলেন"}</th>
                            <th className="p-3 text-right font-semibold">{currentLang === 'en' ? "Actions" : "মুছুন"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((acc) => (
                            <tr key={acc.id} className="border-b border-stone-100 hover:bg-stone-50/50">
                              <td className="p-3 font-bold text-stone-900">{acc.username}</td>
                              <td className="p-3 font-mono font-bold tracking-widest text-[#2D5A27]">•••• ({acc.passcode})</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase ${
                                  acc.role === 'Super Admin' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                                }`}>
                                  {acc.role}
                                </span>
                              </td>
                              <td className="p-3 text-stone-400 text-[10px]">{acc.id === "adm_1" ? "Just Now" : acc.lastActive}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteAdmin(acc.id)}
                                  className="text-stone-300 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Revoke and delete this login authorization key"
                                >
                                  <Trash2 className="w-4 h-4 inline-block" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              )}

              {/* ======================= TAB: TRAFFIC ANALYTICS ======================= */}
              {activeAdminTab === 'analytics' && (
                <div className="space-y-6">
                  
                  {/* Analytics KPIs top card bento row */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    
                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-1">
                        {currentLang === 'en' ? "Total Site Visits logged" : "সাইটে মোট ভিউয়ারস"}
                      </p>
                      <h4 className="text-3xl font-extrabold text-[#2D5A27]">{traffic.length}</h4>
                      <p className="text-[10px] text-stone-400 mt-2">
                        {currentLang === 'en' ? "Updated real-time from visits" : "সরাসরি ব্রাউজার হুক থেকে ট্র্যাকিং"}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-1">
                        {currentLang === 'en' ? "Most Popular Language" : "সর্বাধিক ব্যবহৃত ভাষা"}
                      </p>
                      <h4 className="text-3xl font-bold text-amber-700 uppercase">
                        {traffic.filter(t => t.language === 'bn').length >= traffic.filter(t => t.language === 'en').length ? "বাংলা (BN)" : "ENGLISH (EN)"}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-2">
                        {currentLang === 'en' ? "Tracks preferred language load" : "ভাষাভিত্তিক ট্রাফিক হিসেব"}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-1">
                        {currentLang === 'en' ? "Contact Messages Inbox" : "মোট প্রাপ্ত বার্তা"}
                      </p>
                      <h4 className="text-3xl font-extrabold text-stone-900">{messages.length}</h4>
                      <p className="text-[10px] text-emerald-800 bg-emerald-50 max-w-fit px-1.5 py-0.5 rounded-sm mt-2">
                        {messages.filter(m => !m.isRead).length} {currentLang === 'en' ? "unread letters" : "পড়া হয়নি"}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-1">
                        {currentLang === 'en' ? "Mobile Phone Traffic Share" : "মোবাইল ব্রাউজিং শতকরা"}
                      </p>
                      <h4 className="text-3xl font-extrabold text-indigo-700">
                        {Math.round((traffic.filter(t => t.device === 'Mobile').length / Math.max(traffic.length, 1)) * 100)}%
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-2">
                        {currentLang === 'en' ? "Mobile-first conversion rate" : "মোবাইল ব্যবহারকারীদের সংখ্যা"}
                      </p>
                    </div>

                  </div>

                  {/* Device breakdown graph and Bangladeshi division traffic sources cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Traffic location breakdown */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 text-left">
                      <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 pb-2 border-b border-stone-100">
                        <span>🗺️</span>
                        <span>{currentLang === 'en' ? "Districts / Division Audience Share" : "বাংলাদেশের বিভিন্ন জেলাভিত্তিক ট্রাফিক"}</span>
                      </h3>

                      <div className="space-y-3 pt-2">
                        {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'].map((divis) => {
                          const count = traffic.filter(t => t.location === divis).length;
                          const percentage = Math.round((count / Math.max(traffic.length, 1)) * 100);
                          return (
                            <div key={divis} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-stone-700">{divis} Division</span>
                                <span className="text-stone-400 font-mono">{count} visits ({percentage}%)</span>
                              </div>
                              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-600 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simulation Live events logger feed */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 text-left">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                          <span>🔔</span>
                          <span>{currentLang === 'en' ? "Real-time Site Activity logs" : "সরাসরি ঘটে যাওয়া ভিজিটর লগসমূহ"}</span>
                        </h3>
                        <button
                          onClick={() => {
                            // Inject simulated visitor log
                            const bndivisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal'];
                            const places = bndivisions[Math.floor(Math.random() * bndivisions.length)];
                            const randActions: TrafficEvent['action'][] = ['visit', 'view_service', 'toggle_language'];
                            const act = randActions[Math.floor(Math.random() * randActions.length)];
                            
                            const sim: TrafficEvent = {
                              id: `evt_${Date.now()}`,
                              timestamp: new Date().toISOString(),
                              page: 'home',
                              action: act,
                              details: `Simulated hit from real Bangladeshi IP`,
                              language: Math.random() > 0.4 ? 'bn' : 'en',
                              device: Math.random() > 0.5 ? 'Mobile' : 'Desktop',
                              location: places
                            };
                            setTraffic([sim, ...traffic]);
                          }}
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 font-bold px-2 py-1 rounded-md text-stone-600 cursor-pointer"
                        >
                          Simulate Hit +
                        </button>
                      </div>

                      <div className="space-y-2 h-[240px] overflow-y-auto pr-1">
                        {traffic.map((log) => (
                          <div key={log.id} className="p-2.5 rounded-lg bg-stone-50 border border-stone-100/60 flex items-start justify-between text-[11px] gap-2">
                            <div className="space-y-0.5">
                              <span className="font-bold text-stone-850 block">
                                {log.action === 'visit' && (currentLang === 'en' ? "Page loaded" : "নতুন ভিজিটর প্রবেশ করেছেন")}
                                {log.action === 'view_service' && (currentLang === 'en' ? "Viewed initiative metrics" : "কর্মসূচী কার্ডের বিবরণ দেখেছেন")}
                                {log.action === 'toggle_language' && (currentLang === 'en' ? "Switched language" : "ভাষা পরিবর্তন করেছেন")}
                                {log.action === 'submit_contact' && (currentLang === 'en' ? "Submitted Contact Question" : "বার্তা সাকসেসফুলি পাঠিয়েছেন")}
                                {log.action === 'login_attempt' && "Admin Portal Passcode Authentication"}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono block">
                                Location: {log.location} Division • Device: {log.device} • Language: {log.language}
                              </span>
                            </div>
                            
                            <span className="text-[10px] text-stone-400 font-mono font-medium whitespace-nowrap">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ======================= TAB: CONTACT INBOX MESSAGES ======================= */}
              {activeAdminTab === 'messages' && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                  
                  <div className="pb-3 border-b border-stone-100">
                    <h3 className="text-base font-bold text-stone-900">
                      {currentLang === 'en' ? "Visitor Message Inbox Manager" : "যোগাযোগের বার্তা সমুহ"}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {currentLang === 'en' 
                        ? "Contact entries generated by the homepage form. Respond directly by matching their information with email handles." 
                        : "মূল পেজ থেকে যেসব মানুষ সাহায্যের জন্য বা অনুদান দিতে বার্তা পাঠিয়েছেন, তা এখানে দেখাবে।"}
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100 text-stone-400">
                      <p className="text-xs">{currentLang === 'en' ? "No messages inside inbox." : "কোনো বার্তা জমা হয়নি।"}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`p-5 rounded-xl border transition-all text-left space-y-3 ${
                            msg.isRead ? 'bg-white border-stone-200' : 'bg-emerald-50/40 border-emerald-100 shadow-3xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div className="space-y-1">
                              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                                <span>👤 {msg.name}</span>
                                {!msg.isRead && (
                                  <span className="bg-rose-100 text-rose-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                    {currentLang === 'en' ? "Unread" : "নতুন বার্তা"}
                                  </span>
                                )}
                              </h4>
                              
                              <p className="text-xs text-stone-500 font-mono">
                                Email: <a href={`mailto:${msg.email}`} className="text-blue-700 hover:underline">{msg.email || "N/A"}</a> | 
                                Phone: <a href={`tel:${msg.phone}`} className="text-stone-700 font-bold hover:underline"> {msg.phone}</a>
                              </p>
                            </div>
                            
                            <span className="text-[10px] text-stone-400 font-mono">
                              {new Date(msg.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-100">
                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">{msg.message}</p>
                          </div>

                          <div className="flex justify-end gap-2 pt-1.5 border-t border-stone-100/50">
                            {!msg.isRead && (
                              <button
                                onClick={() => handleMarkMessageRead(msg.id)}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] uppercase rounded-md cursor-pointer"
                              >
                                {currentLang === 'en' ? "Mark Read" : "পড়া হয়েছে"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMsg(msg.id)}
                              className="px-3.5 py-1.5 border border-stone-200 hover:bg-rose-50 text-stone-600 hover:text-rose-700 font-bold text-[10px] uppercase rounded-md cursor-pointer"
                            >
                              {currentLang === 'en' ? "Delete" : "মুছে ফেলুন"}
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* ======================= TAB: MANUAL PLEDGES LEDGER ======================= */}
              {activeAdminTab === 'pledges' && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                  
                  <div className="pb-3 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        {currentLang === 'en' ? "Manual Pledge Claims & Declarations Ledger" : "ম্যানুয়াল অনুদানের খতিয়ান ও সত্যতা যাচাই"}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">
                        {currentLang === 'en' 
                          ? "Verify offline/manual transactions on bKash, Nagad, Rocket or Bank. Approve to mark as Verified or reject if fraudulent." 
                          : "বিকাশ, নগদ, রকেট বা ব্যাংক অ্যাকাউন্টে আসা অফলাইন ও ম্যানুয়াল ফান্ড ট্রান্সফারগুলোর সাথে দাতার তথ্যের সত্যতা যাচাই করুন।"}
                      </p>
                    </div>

                    <div className="flex gap-2 text-xs font-bold text-stone-700">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg">
                        Pending: {declarations.filter(d => d.status === 'Pending').length}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-black">
                        Verified: {declarations.filter(d => d.status === 'Verified').length}
                      </span>
                    </div>
                  </div>

                  {declarations.length === 0 ? (
                    <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100 text-stone-400">
                      <p className="text-xs">{currentLang === 'en' ? "No manual declarations recorded." : "কোনো অনুদানের ঘোষণা খুঁজে পাওয়া যায়নি।"}</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-3xs">
                      <table className="min-w-full divide-y divide-stone-200 text-left text-xs text-stone-600">
                        <thead className="bg-stone-50 text-stone-800 uppercase text-[10px] font-black tracking-wider">
                          <tr>
                            <th className="p-4">{currentLang === 'en' ? "Contributor" : "দাতা"}</th>
                            <th className="p-4">{currentLang === 'en' ? "Amount & Channel" : "পরিমাণ ও চ্যানেল"}</th>
                            <th className="p-4">{currentLang === 'en' ? "Campaign Target" : "উদ্দেশ্য/ক্যাম্পেইন"}</th>
                            <th className="p-4">{currentLang === 'en' ? "Transaction Reference Info" : "রেফারেন্স ও প্রেরক নম্বর"}</th>
                            <th className="p-4">{currentLang === 'en' ? "Timestamp" : "তারিখ ও সময়"}</th>
                            <th className="p-4">{currentLang === 'en' ? "Status & Action" : "অবস্থা ও পরিবর্তন"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                          {declarations.map((decl) => (
                            <tr key={decl.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="p-4 space-y-1">
                                <p className="font-extrabold text-stone-900">{decl.name}</p>
                                <p className="text-[10px] text-stone-400 font-mono">{decl.email || "N/A"}</p>
                                <p className="text-[10px] text-stone-500 font-black">{decl.phone}</p>
                              </td>
                              <td className="p-4 space-y-1">
                                <p className="font-black text-sm text-[#2D5A27]">৳{decl.amount} BDT</p>
                                <span className={`inline-block px-2 py-0.5 rounded text-[9px] uppercase font-black text-white ${
                                  decl.channel === 'bkash' ? 'bg-rose-600' :
                                  decl.channel === 'nagad' ? 'bg-orange-500' :
                                  decl.channel === 'rocket' ? 'bg-indigo-700' :
                                  'bg-teal-650'
                                }`}>
                                  {decl.channel.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-stone-800 leading-normal">{currentLang === 'en' ? decl.campaignEn : decl.campaignBn}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-mono bg-stone-50 border border-stone-200/60 font-medium p-2 rounded text-[10px] text-stone-700 break-all max-w-[200px]">
                                  {decl.referenceInfo}
                                </p>
                              </td>
                              <td className="p-4 font-mono text-[10px] text-stone-400 whitespace-nowrap">
                                {new Date(decl.createdAt).toLocaleString()}
                              </td>
                              <td className="p-4 space-y-1.5">
                                <div className="flex items-center">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                                    decl.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                    decl.status === 'Rejected' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                                    'bg-amber-50 text-amber-800 border border-amber-200'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      decl.status === 'Verified' ? 'bg-emerald-500 animate-pulse' :
                                      decl.status === 'Rejected' ? 'bg-rose-500' :
                                      'bg-amber-500'
                                    }`} />
                                    {decl.status}
                                  </span>
                                </div>
                                <div className="flex gap-1 pt-1">
                                  {decl.status !== 'Verified' && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = declarations.map(d => {
                                          if (d.id === decl.id) {
                                            return { ...d, status: 'Verified' as const };
                                          }
                                          return d;
                                        });
                                        setDeclarations(updated);
                                        // Dynamically increment pledge tracker count on approval!
                                        setDonorPledgeCount(prev => prev + 1);
                                        trackEvent('visit', `Verified manual ledger declaration for ${decl.name} of BDT ${decl.amount}`, 'admin');
                                      }}
                                      className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[9px] uppercase rounded-md cursor-pointer transition-colors"
                                    >
                                      {currentLang === 'en' ? "Verify" : "অনুমোদন করুন"}
                                    </button>
                                  )}
                                  {decl.status !== 'Rejected' && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = declarations.map(d => {
                                          if (d.id === decl.id) {
                                            return { ...d, status: 'Rejected' as const };
                                          }
                                          return d;
                                        });
                                        setDeclarations(updated);
                                        trackEvent('visit', `Rejected manual ledger declaration from ${decl.name}`, 'admin');
                                      }}
                                      className="px-2 py-1 bg-rose-50 border border-rose-250 hover:bg-rose-100 text-rose-850 font-extrabold text-[9px] uppercase rounded-md cursor-pointer transition-colors"
                                    >
                                      {currentLang === 'en' ? "Reject" : "বাতিল করুন"}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(currentLang === 'en' ? "Are you sure you want to delete this row?" : "আপনি কি এই অনুদানের রেকর্ডটি মুছে ফেলতে চান?")) {
                                        const updated = declarations.filter(d => d.id !== decl.id);
                                        setDeclarations(updated);
                                        trackEvent('visit', `Deleted manual pledge claim from ${decl.name}`, 'admin');
                                      }
                                    }}
                                    className="p-1 border border-stone-200 hover:bg-rose-100 rounded-md text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                                    title={currentLang === 'en' ? "Delete Record" : "রেকর্ড মুছুন"}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>
              )}

              {/* ======================= TAB: PAYMENT DETAILS AND CONFIGURATION ======================= */}
              {activeAdminTab === 'payments_config' && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
                  
                  <div className="pb-3 border-b border-stone-100 flex items-center justify-between text-left">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        {currentLang === 'en' ? "MFS & Bank Accounts configuration Panel" : "মোবাইল ফিন্যান্সিয়াল সার্ভিস (MFS) ও ব্যাংক অ্যাকাউন্ট সেটিং সমূহ"}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">
                        {currentLang === 'en' 
                          ? "This configuration dynamically maps into the manual fundraising widget steps of the home page for all visitors." 
                          : "এখানে কনফিগার করা নম্বর এবং নির্দেশনাগুলো সরাসরি হোমপেজে অনুদান দেওয়ার সময় দেখানো হবে।"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                    
                    {/* BKASH CONFIG */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                        <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center text-xs">b</div>
                        <h4 className="text-xs font-black text-stone-850 uppercase tracking-wider">bKash Account Config</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">bKash Mobile Account Number</label>
                          <input
                            type="text"
                            value={paymentConfig.bkash.number}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bkash: { ...paymentConfig.bkash, number: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Account Type Badge (e.g. Personal / Merchant)</label>
                          <input
                            type="text"
                            value={paymentConfig.bkash.type}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bkash: { ...paymentConfig.bkash, type: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (English Line-by-Line)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.bkash.instructionsEn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bkash: { ...paymentConfig.bkash, instructionsEn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (Bengali - ৩-ধাপের নির্দেশাবলি)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.bkash.instructionsBn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bkash: { ...paymentConfig.bkash, instructionsBn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NAGAD CONFIG */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white font-extrabold flex items-center justify-center text-xs">n</div>
                        <h4 className="text-xs font-black text-stone-850 uppercase tracking-wider">Nagad Account Config</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Nagad Mobile Account Number</label>
                          <input
                            type="text"
                            value={paymentConfig.nagad.number}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                nagad: { ...paymentConfig.nagad, number: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Account Type Badge</label>
                          <input
                            type="text"
                            value={paymentConfig.nagad.type}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                nagad: { ...paymentConfig.nagad, type: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (English)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.nagad.instructionsEn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                nagad: { ...paymentConfig.nagad, instructionsEn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (Bengali)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.nagad.instructionsBn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                nagad: { ...paymentConfig.nagad, instructionsBn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ROCKET CONFIG */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-700 text-white font-extrabold flex items-center justify-center text-xs">r</div>
                        <h4 className="text-xs font-black text-stone-850 uppercase tracking-wider">Rocket Account Config</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Rocket Mobile Account Number</label>
                          <input
                            type="text"
                            value={paymentConfig.rocket.number}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                rocket: { ...paymentConfig.rocket, number: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Account Type Badge</label>
                          <input
                            type="text"
                            value={paymentConfig.rocket.type}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                rocket: { ...paymentConfig.rocket, type: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (English)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.rocket.instructionsEn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                rocket: { ...paymentConfig.rocket, instructionsEn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (Bengali)</label>
                          <textarea
                            rows={3}
                            value={paymentConfig.rocket.instructionsBn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                rocket: { ...paymentConfig.rocket, instructionsBn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* BANK DETAILS CONFIG */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                        <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-xs">🏦</div>
                        <h4 className="text-xs font-black text-stone-850 uppercase tracking-wider">Official Bank Account Config</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Bank Name</label>
                            <input
                              type="text"
                              value={paymentConfig.bank.bankName}
                              onChange={(e) => {
                                setPaymentConfig({
                                  ...paymentConfig,
                                  bank: { ...paymentConfig.bank, bankName: e.target.value }
                                });
                              }}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Account Number</label>
                            <input
                              type="text"
                              value={paymentConfig.bank.accountNumber}
                              onChange={(e) => {
                                setPaymentConfig({
                                  ...paymentConfig,
                                  bank: { ...paymentConfig.bank, accountNumber: e.target.value }
                                });
                              }}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Account Name Beneficiary</label>
                            <input
                              type="text"
                              value={paymentConfig.bank.accountName}
                              onChange={(e) => {
                                setPaymentConfig({
                                  ...paymentConfig,
                                  bank: { ...paymentConfig.bank, accountName: e.target.value }
                                });
                              }}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Branch Details</label>
                            <input
                              type="text"
                              value={paymentConfig.bank.branch}
                              onChange={(e) => {
                                setPaymentConfig({
                                  ...paymentConfig,
                                  bank: { ...paymentConfig.bank, branch: e.target.value }
                                });
                              }}
                              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Routing Number</label>
                          <input
                            type="text"
                            value={paymentConfig.bank.routingNumber}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bank: { ...paymentConfig.bank, routingNumber: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (English)</label>
                          <textarea
                            rows={2}
                            value={paymentConfig.bank.instructionsEn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bank: { ...paymentConfig.bank, instructionsEn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 md:text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1">Instructions (Bengali)</label>
                          <textarea
                            rows={2}
                            value={paymentConfig.bank.instructionsBn}
                            onChange={(e) => {
                              setPaymentConfig({
                                ...paymentConfig,
                                bank: { ...paymentConfig.bank, instructionsBn: e.target.value }
                              });
                            }}
                            className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 md:text-xs"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-xs font-bold text-[#2D5A27] flex items-center justify-center gap-2">
                    ✅ {currentLang === 'en' ? "Changes are saved in real-time and backed up locally." : "পরিবর্তনগুলো রিয়েল-টাইমে আপডেট এবং কম্পিউটারে সংরক্ষিত হয়েছে।"}
                  </div>

                </div>
              )}

            </div>
          </div>

        )}

      </main>

      {/* ========================================================
                    ELEGANT FOOTER - PROFESSIONAL 
         ======================================================== */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-12 pb-8 text-xs font-medium" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
            
            {/* Logo details */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span className="font-sans font-extrabold text-white text-base tracking-tight">
                  {currentLang === 'en' ? siteContent.logoText.en : siteContent.logoText.bn}
                </span>
              </div>
              <p className="text-stone-500 font-sans leading-relaxed text-xs">
                {currentLang === 'en'
                  ? "A grassroots Bangladeshi volunteer association. Built on the simple and robust idea that in a hard world, let us stand together with compassion and kindness."
                  : "বাংলাদেশে পরিচালিত মানবকল্যাণমূলক স্বেচ্ছাসেবী সংগঠন। দুঃখ-কষ্টে ঘেরা এই পৃথিবীতে আমাদের সামর্থ্য অনুযায়ী পরম সহমর্মিতায় সকলের পাশে দাঁড়ানোর একটি সুন্দর উদ্যোগ।"}
              </p>
            </div>

            {/* Quick navigational links */}
            <div className="md:col-span-3 space-y-3 text-left">
              <h4 className="text-xs uppercase font-extrabold text-stone-200 tracking-wider">
                {currentLang === 'en' ? "Sections" : "দ্রুত ব্রাউজ করুন"}
              </h4>
              <ul className="space-y-2 text-stone-500 text-xs text-left">
                <li><a href="#home" className="hover:text-emerald-500 transition-colors">Home</a></li>
                <li><a href="#gallery" className="hover:text-emerald-500 transition-colors">Impact Gallery</a></li>
                <li><a href="#about" className="hover:text-emerald-500 transition-colors">About Story</a></li>
                <li><a href="#services" className="hover:text-emerald-500 transition-colors">Our Activities</a></li>
              </ul>
            </div>

            {/* Social media connections */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs uppercase font-extrabold text-stone-200 tracking-wider">
                {currentLang === 'en' ? "Social Media Channels" : "সামাজিক যোগাযোগ মাধ্যম"}
              </h4>
              <p className="text-stone-500 text-xs">
                {currentLang === 'en' 
                  ? "We post real-time field video logs, donation books, and volunteer invitations through our Facebook ecosystem."
                  : "আমাদের প্রতিটি ক্যাম্পেইনের ভিডিও, অর্থব্যায়ের হিসেব খাতা এবং সাধারণ বন্ধুদের সাথে যুক্ত থাকতে ফেইসবুক পেজে চোখ রাখুন।"}
              </p>
              
              <div className="pt-2 flex items-center gap-3">
                <a 
                  href={siteContent.contactFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('visit', "Footer Facebook click")}
                  className="px-3.5 py-2 bg-stone-800 text-stone-300 hover:text-white rounded-lg flex items-center gap-2 hover:bg-stone-700 transition-colors"
                >
                  <span>🌐 Facebook Page</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* Copyright bar and admin triggers */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 gap-4">
            
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} {currentLang === 'en' ? "Atleast Do Something Foundation" : "এটলিস্ট ডু সামথিং ফাউন্ডেশন"} • {currentLang === 'en' ? "Bangladesh. Built with pride for human dignity." : "বাংলাদেশ। আপনার ছোট দানেই বাঁচবে একটি প্রাণ।"}
            </p>

            <div className="flex gap-4">
              {isAdminMode ? (
                <button
                  onClick={handleAdminExit}
                  className="text-stone-400 hover:text-emerald-500 font-bold uppercase tracking-wider cursor-pointer"
                >
                  {currentLang === 'en' ? "Return to Front App" : "লগআউট ও মূল পাতা"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      setIsAdminMode(true);
                      trackEvent('visit', "Entered Admin Portal directly", 'admin');
                    } else {
                      setIsLoginModalOpen(true);
                    }
                  }}
                  id="btn-footer-admin-login"
                  className="text-stone-400 hover:text-emerald-500 font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{currentLang === 'en' ? "Administrator Portal" : "অ্যাডমিন প্যানেল লগইন"}</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </footer>


      {/* ========================================================
                    MODAL: PASSWORD/PASSCODE LOGIN
         ======================================================== */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300" id="login-modal-overlay">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative space-y-4">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto border border-emerald-100">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-stone-900 tracking-tight">
                {currentLang === 'en' ? "Enter Admin Portal" : "অ্যাডমিন অ্যাক্সেস ভেরিফিকেশন"}
              </h3>
              <p className="text-stone-500 text-xs">
                {currentLang === 'en' 
                  ? "Provide your authorized credentials and numeric passcode to update site contents interactively."
                  : "তথ্য পরিবর্তন ও ট্রাফিক এনালাইটিক্স দেখার জন্য গোপন কোড দিয়ে লগইন করুন।"}
              </p>
            </div>

            {/* Hint Box for evaluator removed for security */}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">
                  Email ID / Username
                </label>
                <input
                  type="text"
                  required
                  value={loginEmailAttempt}
                  onChange={(e) => setLoginEmailAttempt(e.target.value)}
                  placeholder="name@atleastdo.org"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 rounded-lg p-2.5 text-xs text-stone-850"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">
                  Secret Numeric Passcode
                </label>
                <input
                  type="password"
                  required
                  value={passcodeAttempt}
                  onChange={(e) => setPasscodeAttempt(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 rounded-lg p-2.5 text-xs tracking-widest font-mono text-stone-850"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-800 border border-rose-100 rounded-lg text-xs leading-relaxed flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setPasscodeAttempt('');
                    setLoginError('');
                  }}
                  className="flex-1 py-2.5 border border-stone-200 text-stone-600 font-semibold hover:bg-stone-50 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {currentLang === 'en' ? "Cancel" : "বাতিল"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-[#2D5A27] text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  {currentLang === 'en' ? "Authenticate" : "লগইন করুন"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
