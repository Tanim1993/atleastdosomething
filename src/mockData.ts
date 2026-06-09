/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteContent, ServiceItem, GalleryItem, TestimonialItem, UserAccount, TrafficEvent, ContactMessage } from './types';

// Default main text content (Polite, trustworthy, and culturally respectful)
export const DEFAULT_SITE_CONTENT: SiteContent = {
  logoText: {
    en: "Atleast Do Something",
    bn: "এটলিস্ট ডু সামথিং"
  },
  logoImageUrl: "",
  heroBadge: {
    en: "Voluntary Non-Profit Charitable Organization in Bangladesh",
    bn: "বাংলাদেশে একটি স্বেচ্ছাসেবী ও অলাভজনক দাতব্য সংস্থা"
  },
  heroTitle: {
    en: "Choose Compassion. Let us Atleast Do Something.",
    bn: "সহমর্মিতার আলো ছড়াই। আসুন অন্তত কিছু একটা করি।"
  },
  heroSubtitle: {
    en: "In a world facing countless hardships, we believe even small, direct contributions—whether school supplies, a packet of rice, medical support, or financial help—can rewrite a family's future and spark hope in their hearts.",
    bn: "অসংখ্য কষ্টে জর্জরিত আমাদের এই সমাজে আমরা বিশ্বাস করি যে, সামান্যতম সরাসরি সাহায্য—হোক তা বিদ্যালয়ের উপকরন, এক প্যাকেট চাল, চিকিৎসাসেবা কিংবা আর্থিক সহযোগিতা—একটি পরিবারের ভবিষ্যৎ বদলে দিতে পারে এবং তাদের হৃদয়ে নতুন আশার সঞ্চার করতে পারে।"
  },
  ctaDonateText: {
    en: "Support Our Cause",
    bn: "আমাদের পাশে দাঁড়ান"
  },
  ctaLearnText: {
    en: "Read Creator's Story",
    bn: "আমাদের গল্প পড়ুন"
  },
  quoteText: {
    en: '"Whoever relieves a believer of some distress of this world, Allah will relieve him of some distress on the Day of Resurrection."',
    bn: '"যে ব্যক্তি দুনিয়াতে কোনো মুমিনের একটি কষ্ট দূর করে দেবে, আল্লাহ তাআলা কিয়ামতের দিন তার কষ্টসমূহ থেকে একটি কষ্ট দূর করে দেবেন।"'
  },
  quoteSource: {
    en: "Prophet Muhammad (PBUH) — Sahih Muslim",
    bn: "মহানবী হযরত মুহাম্মদ (সাঃ) — সহীহ মুসলিম"
  },
  aboutBadge: {
    en: "About Our Foundation",
    bn: "ফাউন্ডেশন সম্পর্কে আমাদের কথা"
  },
  aboutTitle: {
    en: "Who We Are & What Drives Us",
    bn: "আমরা কে এবং কেন আমরা কাজ করি"
  },
  aboutWhoWeAre: {
    en: "Atleast Do Something Foundation is a voluntary, non-profit charitable organization in Bangladesh, built dynamically around a simple, powerful idea: in a world facing countless hardships, let us spread hope and stand together with compassion. Founded by compassionate youths, we gather contributions to support those in dire need—bypassing heavy bureaucracy to provide immediate, transparent impact.",
    bn: "এটলিস্ট ডু সামথিং ফাউন্ডেশন হল বাংলাদেশের একটি স্বেচ্ছাসেবী, অলাভজনক দাতব্য সংস্থা, যা একটি সাধারণ অথচ শক্তিশালী ধারণাকে কেন্দ্র করে গড়ে উঠেছে: অসংখ্য কষ্টে ঘেরা এই পৃথিবীতে আসুন আমরা সহমর্মিতার আলো ছড়াই ও মানুষের পাশে দাঁড়াই। হৃদয়বান একদল তরুণের উদ্যোগে প্রতিষ্ঠিত এই সংস্থাটি আমলাতান্ত্রিক জটিলতামুক্ত থেকে অতি দ্রুত অতি স্বচ্ছ উপায়ে দুর্দশাগ্রস্ত মানুষের নিকট সরাসরি সাহায্য পৌঁছে দিতে সাহায্য করে থাকে।"
  },
  aboutWhatWeDo: {
    en: "We actively spot families, children, and fragile communities experiencing extreme distress across Bangladesh. By supplying nourishing items, sponsoring basic healthcare, supporting general educational resources, and funding self-sustainable micro-enterprises, we ensure every penny converts directly into tangible hope.",
    bn: "আমরা বাংলাদেশের প্রত্যন্ত অঞ্চলের চরম দুর্দশাগ্রস্ত পরিবার, শিশু এবং প্রান্তিক জনগোষ্ঠীকে চিহ্নিত করে সাহায্য করি। পুষ্টিকর খাদ্য বিতরণ, মৌলিক চিকিৎসাসেবা প্রদান, শিক্ষার উপকরণ সরবরাহ এবং ক্ষুদ্র আত্মনির্ভরশীল প্রকল্প স্থাপন করার মাধ্যমে আমরা নিশ্চিত করি যে প্রতিটি দান সরাসরি মানুষের কল্যাণে ব্যবহৃত হচ্ছে।"
  },
  aboutMission: {
    en: "To alleviate human suffering by promoting active kindness; inspiring individuals to actively contribute their talents, money, or time, transforming distress into self-reliance and dignity.",
    bn: "সরাসরি ও সক্রিয় মানবিক পদক্ষেপের মাধ্যমে মানুষের কষ্ট লাঘব করা এবং সমাজের প্রতিটি মানুষকে তাদের যোগ্যতা, অর্থ বা সময় অনুযায়ী পরোপকারে এগিয়ে আসতে অনুপ্রাণিত করা, যাতে দুর্দশা লাঘব হয়ে আত্মনির্ভরশীলতা ও মর্যাদা ফিরে আসে।"
  },
  aboutVision: {
    en: "A Bangladesh free from extreme distress and hopelessness, where no family faces starvation or preventable suffering in silence, because neighbors care enough to 'atleast do something.'",
    bn: "এমন একটি বাংলাদেশ বিনির্মাণ করা যেখানে চরম হাহাকার এবং হতাশা থাকবে না, কোনো অসহায় মানুষ নিরবে ক্ষুধার্ত বা বিনা চিকিৎসায় কষ্ট পাবে না, কারণ প্রতিটি মানুষ তার প্রতিবেশীর সংকটে অন্তত কিছু করার তাগিদ অনুভব করবে।"
  },
  contactPhone: "+880 1712-345678",
  contactEmail: "info@atleastdosomething.org",
  contactAddress: {
    en: "House 24, Road 12, Dhanmondi, Dhaka 1209, Bangladesh",
    bn: "বাসা ২৪, রোড ১২, ধানমন্ডি, ঢাকা ১২০৯, বাংলাদেশ"
  },
  contactFacebookUrl: "https://facebook.com/atleastdosomething"
};

// Initial services / activities
export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "serv_1",
    title: {
      en: "Emergency Food Package",
      bn: "জরুরী খাদ্য সামগ্রী বিতরণ"
    },
    description: {
      en: "Distribution of highly nourishing food packages (rice, lentils, cooking oil, potatoes, salt) to ultra-poor and flood-affected families across rural Bangladesh.",
      bn: "বাংলাদেশের প্রত্যন্ত অঞ্চলে চরম দরিদ্র ও বন্যাদুর্গত পরিবারগুলোর মাঝে উচ্চ পুষ্টিমানসম্পন্ন জরুরি খাদ্য সামগ্রী (চাল, ডাল, তেল, আলু, লবণ) বিতরণ কার্যক্রম।"
    },
    iconName: "HeartHandshake",
    beneficiaries: {
      en: "4,500+ Families",
      bn: "৪,৫০০+ পরিবার"
    },
    costText: {
      en: "Tk 1,200 per parcel",
      bn: "১,২০০ টাকা প্রতি প্যাকেট"
    },
    isActive: true
  },
  {
    id: "serv_2",
    title: {
      en: "Underprivileged Education",
      bn: "সুবিধাবঞ্চিত শিশুদের শিক্ষা সহায়তা"
    },
    description: {
      en: "Providing school supplies, notebooks, backpacks, registration fees, and primary learning sessions to children who would otherwise be forced into child labor.",
      bn: "সুবিধাবঞ্চিত শিশু যারা ঝরে পড়ার ঝুঁকিতে রয়েছে, তাদের বিনামূল্যে স্কুল ব্যাগ, খাতা-কলম এবং রেজিস্ট্রেশন ফি প্রদানের মাধ্যমে প্রাতিষ্ঠানিক শিক্ষায় ধরে রাখা।"
    },
    iconName: "BookOpen",
    beneficiaries: {
      en: "320+ Students",
      bn: "৩২০+ শিক্ষার্থী"
    },
    costText: {
      en: "Tk 800 per student/month",
      bn: "৮০০ টাকা প্রতি শিক্ষার্থী/মাস"
    },
    isActive: true
  },
  {
    id: "serv_3",
    title: {
      en: "Essential Medical Aid",
      bn: "মৌলিক চিকিৎসা ও ওষুধ বিতরণ"
    },
    description: {
      en: "Sponsoring doctor consultations, vital medical tests, primary life-saving surgeries, and expensive lifetime medications for marginalized elderly patients.",
      bn: "হতদরিদ্র ও প্রান্তিক বৃদ্ধ রোগীদের বিনামূল্যে চিকিৎসকের পরামর্শ, জরুরি পরীক্ষা-নিরীক্ষা, প্রয়োজনীয় অস্ত্রোপচার এবং জীবন রক্ষাকারী ঔষুধের ব্যবস্থা করা।"
    },
    iconName: "Activity",
    beneficiaries: {
      en: "1,200+ Underprivileged Patients",
      bn: "১,২০০+ অসহায় রোগী"
    },
    costText: {
      en: "Tk 1,500 per patient treatment",
      bn: "১,৫০০ টাকা প্রতি রোগীর খরচ"
    },
    isActive: true
  },
  {
    id: "serv_4",
    title: {
      en: "Winter Warmth Initiative",
      bn: "শীতবস্ত্র ও কম্বল বিতরণ"
    },
    description: {
      en: "Protecting the street children and cold-strained northern districts villagers from freezing winter temperatures with thick wool blankets and warm hoodies.",
      bn: "উত্তরাঞ্চলের তীব্র শীতে কষ্ট পাওয়া দরিদ্র মানুষ এবং সড়ক-স্টেশনে রাত কাটানো সুবিধাবঞ্চিত শিশুদের মাঝে উন্নতমানের কম্বল ও শীতের পোশাক বিতরণ।"
    },
    iconName: "Flame",
    beneficiaries: {
      en: "2,000+ Individuals",
      bn: "২,০০০+ অসহায় মানুষ"
    },
    costText: {
      en: "Tk 450 per blanket",
      bn: "৪৫০ টাকা প্রতি কম্বল"
    },
    isActive: true
  },
  {
    id: "serv_5",
    title: {
      en: "Self-Sustainability Projects",
      bn: "স্বাবলম্বীকরণ প্রকল্প (কর্মসংস্থান)"
    },
    description: {
      en: "Providing high-quality manual sewing machines, groceries for retail push-carts, and initial poultry feeds to enable widows to earn and sustain independently.",
      bn: "দরিদ্র ও বিধবা নারীদের সেলাই মেশিন দান, চায়ের দোকান বা ভ্যান স্লাইডিং সেটআপ এবং হাঁস-মুরগি পালনের উপকরণ প্রদানের মাধ্যমে স্থায়ী কর্মসংস্থান তৈরি।"
    },
    iconName: "TrendingUp",
    beneficiaries: {
      en: "45 Families Empowered",
      bn: "৪৫টি পরিবার স্বাবলম্বী"
    },
    costText: {
      en: "Tk 15,000 per project",
      bn: "১৫,০০০ টাকা প্রতি প্রজেক্ট"
    },
    isActive: true
  }
];

// Initial Gallery Items
export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    title: {
      en: "Smiles at Dhanmondi Lake Children Gathering",
      bn: "ধানমন্ডি লেকে সুবিধাবঞ্চিত শিশুদের মিলনমেলা"
    },
    date: "2026-05-10",
    category: { en: "Education Aid", bn: "শিক্ষা সহায়তা" }
  },
  {
    id: "gal_2",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
    title: {
      en: "Food Distribution in Northern Flood Areas",
      bn: "উত্তরাঞ্চলের বন্যাদুর্গত এলাকায় খাদ্য বিতরণ"
    },
    date: "2026-04-20",
    category: { en: "Disaster Relief", bn: "উদ্যোগ ও দুর্যোগ ত্রাণ" }
  },
  {
    id: "gal_3",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
    title: {
      en: "Providing Sewing Machines to Struggling Mothers",
      bn: "অসহায় মায়েদের সেলাই মেশিন বিতরণ"
    },
    date: "2026-03-15",
    category: { en: "Sustainability", bn: "স্বাবলম্বী প্রকল্প" }
  },
  {
    id: "gal_4",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    title: {
      en: "Special Medical Camp at Keraniganj Outskirts",
      bn: "কেরানীগঞ্জের প্রান্তিকে আয়োজিত বিশেষ মেডিকেল ক্যাম্প"
    },
    date: "2026-02-28",
    category: { en: "Medical Aid", bn: "বিনামূল্যে চিকিৎসা" }
  }
];

// Testimonials / Feedback
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test_1",
    name: { en: "Shafieur Rahman", bn: "শাফিউর রহমান" },
    role: { en: "Active Volunteer & Student", bn: "সক্রিয় স্বেচ্ছাসেবক ও শিক্ষার্থী" },
    comment: {
      en: "Being part of Atleast Do Something is eye-opening. We do not wait for giant budgets or corporate stamps; we see a problem, we chip in whatever pocket-money we have, and we change lives immediately.",
      bn: "এই ফাউন্ডেশনের সাথে থাকা আমার চোখ খুলে দিয়েছে। আমরা বিশাল বাজেট বা প্রাতিষ্ঠানিক আনুষ্ঠানিকতার জন্য বসে থাকি না; একটা সংকট দেখি, যেটুকু সামর্থ্য আছে পকেট-মানি থেকে বাঁচিয়ে তা দিয়েই মানুষের হাসি ফুটাই।"
    },
    rating: 5
  },
  {
    id: "test_2",
    name: { en: "Nusrat Jahan Chowdhury", bn: "নুসরাত জাহান চৌধুরী" },
    role: { en: "Donor", bn: "সহযোগী ও প্রবাসী দাতা" },
    comment: {
      en: "I appreciate their absolute transparency. After donating to the Winter Initiative, I received photos of the exact families holding the blankets. Their commitment to 'active compassion' is truly motivating.",
      bn: "আমি তাদের সম্পূর্ণ স্বচ্ছতার আন্তরিক প্রশংসা করি। শীতবস্ত্র কার্যক্রমে অনুদান দেওয়ার পর যারাই কম্বল পেয়েছে তাদের ছবিসহ প্রমাণ দেওয়া হয়েছে। সরাসরি প্রতিটি কার্যক্রমে তাদের এই সহমর্মিতার হাত বাড়ানোর চেষ্টা সত‍্যিই দারুণ অনুপ্রাণিত করে।"
    },
    rating: 5
  },
  {
    id: "test_3",
    name: { en: "Motiur Rahman", bn: "মতিউর রহমান" },
    role: { en: "Recipient (Dhanmondi Slum)", bn: "উপকারভোগী (ধানমন্ডি বস্তি এলাকা)" },
    comment: {
      en: "When my grocery rickshaw cart collapsed, I lost my livelihood. Atleast Do Something purchased basic wooden beams and new wheels, getting my small store back on its feet within four days.",
      bn: "আমার দোকানটি যখন ভেঙে যায়, তখন সব বন্ধ হয়ে গেছিল। তারা চারদিনের মধ্যে কাঠ এবং নতুন চাকার ব্যবস্থা করে আমার জীবিকার দোকানটি পুনরায় দাঁড় করিয়ে দেয়। আল্লাহর রহমত ওনাদের উপর বর্ষিত হোক।"
    },
    rating: 5
  }
];

// Admin Users (Passcode login)
// Preloaded account using khaledtanim@gmail.com
export const DEFAULT_ADMINS: UserAccount[] = [
  {
    id: "adm_1",
    username: "khaledtanim@gmail.com",
    passcode: "1250", // Admin's passcode as requested
    role: "Super Admin",
    createdDate: "2026-01-01",
    lastActive: "2026-06-09T05:39:19Z"
  },
  {
    id: "adm_2",
    username: "volunteer@atleastdosomething.org",
    passcode: "2026",
    role: "Moderator",
    createdDate: "2026-03-30",
    lastActive: "2026-06-08T18:14:22Z"
  }
];

// Synthetic initial Traffic Logs representing healthy site traffic in Bangladesh
export const DEFAULT_TRAFFIC: TrafficEvent[] = [
  { id: "log_1", timestamp: "2026-06-09T01:00:00Z", page: "home", action: "visit", language: "bn", device: "Mobile", location: "Dhaka" },
  { id: "log_2", timestamp: "2026-06-09T01:15:00Z", page: "home", action: "view_service", details: "serv_1", language: "bn", device: "Mobile", location: "Dhaka" },
  { id: "log_3", timestamp: "2026-06-09T02:05:00Z", page: "home", action: "visit", language: "en", device: "Desktop", location: "Chittagong" },
  { id: "log_4", timestamp: "2026-06-09T02:10:00Z", page: "home", action: "toggle_language", details: "Changed to bn", language: "bn", device: "Desktop", location: "Chittagong" },
  { id: "log_5", timestamp: "2026-06-09T03:00:00Z", page: "home", action: "visit", language: "bn", device: "Mobile", location: "Sylhet" },
  { id: "log_6", timestamp: "2026-06-09T03:22:00Z", page: "home", action: "submit_contact", details: "Message from S. Alam", language: "bn", device: "Mobile", location: "Sylhet" },
  { id: "log_7", timestamp: "2026-06-09T03:40:00Z", page: "home", action: "visit", language: "en", device: "Tablet", location: "Rajshahi" },
  { id: "log_8", timestamp: "2026-06-09T04:15:00Z", page: "home", action: "view_service", details: "serv_2", language: "en", device: "Tablet", location: "Rajshahi" },
  { id: "log_9", timestamp: "2026-06-09T04:30:00Z", page: "home", action: "visit", language: "bn", device: "Mobile", location: "Dhaka" },
  { id: "log_10", timestamp: "2026-06-09T04:45:00Z", page: "home", action: "visit", language: "bn", device: "Mobile", location: "Barisal" },
  { id: "log_11", timestamp: "2026-06-09T05:00:00Z", page: "home", action: "view_service", details: "serv_5", language: "bn", device: "Mobile", location: "Barisal" },
  { id: "log_12", timestamp: "2026-06-09T05:22:00Z", page: "home", action: "visit", language: "bn", device: "Mobile", location: "Dhaka" },
];

export const DEFAULT_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg_1",
    name: "Tanzir Ahmed Chowdhury",
    email: "tanzir@gmail.com",
    phone: "01819-223344",
    message: "I am a local university student and want to join your Dhanmondi collection group on Friday. How do I proceed? Atleast Do Something is inspiring!",
    createdAt: "2026-06-08T15:20:00Z",
    isRead: false
  },
  {
    id: "msg_2",
    name: "Dr. Anika Rahman",
    email: "anika.m@squarehospitals.com",
    phone: "01711-556677",
    message: "I can volunteer my Friday mornings to consultations at your next rural medical camp. Please contact me if you have any events planned near Dhaka outskirts or Savar.",
    createdAt: "2026-06-07T08:14:10Z",
    isRead: true
  }
];
