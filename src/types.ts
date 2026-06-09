/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Supporting languages
export type Language = 'en' | 'bn';

// Editable main text fields of the website
export interface SiteContent {
  logoText: { en: string; bn: string };
  logoImageUrl?: string; // custom visual logo upload representation
  heroBadge: { en: string; bn: string };
  heroTitle: { en: string; bn: string };
  heroSubtitle: { en: string; bn: string };
  ctaDonateText: { en: string; bn: string };
  ctaLearnText: { en: string; bn: string };
  
  // Quote
  quoteText: { en: string; bn: string };
  quoteSource: { en: string; bn: string };
  
  // Who we are
  aboutBadge: { en: string; bn: string };
  aboutTitle: { en: string; bn: string };
  aboutWhoWeAre: { en: string; bn: string };
  aboutWhatWeDo: { en: string; bn: string };
  aboutMission: { en: string; bn: string };
  aboutVision: { en: string; bn: string };
  
  // Primary contacts
  contactPhone: string;
  contactEmail: string;
  contactAddress: { en: string; bn: string };
  contactFacebookUrl: string;
}

// Service / Activity items
export interface ServiceItem {
  id: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  iconName: string; // lucide icon name representation
  imageUrl?: string; // optional uploaded custom photo representing this initiative
  beneficiaries: { en: string; bn: string }; // e.g. "500+ Families"
  costText?: { en: string; bn: string }; // e.g. "Funded by Donations"
  isActive: boolean;
}

// Gallery items
export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: { en: string; bn: string };
  date: string; // e.g. "2026-05-12"
  category: { en: string; bn: string };
}

// Feedback / Testimonial
export interface TestimonialItem {
  id: string;
  name: { en: string; bn: string };
  role: { en: string; bn: string }; // e.g. "Volunteer", "Donor", "Beneficiary"
  comment: { en: string; bn: string };
  rating: number; // 1-5 stars
}

// Admin Users
export interface UserAccount {
  id: string;
  username: string;
  passcode: string; // The passcode they log in with
  role: 'Super Admin' | 'Moderator' | 'Editor';
  createdDate: string;
  lastActive: string;
}

// Traffic Logs
export interface TrafficEvent {
  id: string;
  timestamp: string; // ISO string
  page: string; // 'home' | 'admin' | 'contact'
  action: 'visit' | 'view_service' | 'submit_contact' | 'toggle_language' | 'login_attempt';
  details?: string;
  language: Language;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  location: string; // Bangladeshi division/city
  ipAddress?: string;
}

// Contact form input
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
