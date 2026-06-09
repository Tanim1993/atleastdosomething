/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Globe, Lock, Menu, X, Settings2 } from 'lucide-react';
import { Language, SiteContent } from '../types';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  siteContent: SiteContent;
  onAdminClick: () => void;
  isAdminMode: boolean;
  onExitAdmin: () => void;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  siteContent,
  onAdminClick,
  isAdminMode,
  onExitAdmin
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: { en: "Home", bn: "হোম" }, href: "#home" },
    { name: { en: "About", bn: "আমাদের সম্পর্কে" }, href: "#about" },
    { name: { en: "Services", bn: "কার্যক্রম" }, href: "#services" },
    { name: { en: "Gallery", bn: "চিত্রশালা" }, href: "#gallery" },
    { name: { en: "Community", bn: "মন্তব্য" }, href: "#community" },
    { name: { en: "Contact", bn: "যোগাযোগ" }, href: "#contact" }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-xs" id="site-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Name */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-2 group">
              {siteContent.logoImageUrl ? (
                <img 
                  src={siteContent.logoImageUrl} 
                  alt="Organization Logo" 
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto max-w-[120px] object-contain rounded-md" 
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
                  A
                </div>
              )}
              <span className="font-sans font-bold text-lg text-stone-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                {currentLang === 'en' ? siteContent.logoText.en : siteContent.logoText.bn}
              </span>
            </a>
          </div>

          {/* Desktop Nav Items */}
          {!isAdminMode ? (
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-stone-600 hover:text-emerald-700 font-medium text-sm transition-colors py-2 px-1"
                >
                  {link.name[currentLang]}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2 bg-emerald-50 text-emerald-800 font-semibold text-xs px-3 py-1.5 rounded-full border border-emerald-100">
              <Settings2 className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? "Admin Portal Active" : "অ্যাডমিন প্রবেশদ্বার সক্রিয়"}</span>
            </div>
          )}

          {/* Action Buttons: Language toggle & Admin portal */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Pill Switcher */}
            <div className="flex items-center p-0.5 bg-stone-100 rounded-lg">
              <button
                id="lang-btn-en"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currentLang === 'en'
                    ? 'bg-white text-stone-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                English
              </button>
              <button
                id="lang-btn-bn"
                onClick={() => onLanguageChange('bn')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currentLang === 'bn'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-stone-500 hover:text-emerald-700'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Admin trigger */}
            {isAdminMode ? (
              <button
                id="btn-nav-exit-admin"
                onClick={onExitAdmin}
                className="inline-flex items-center gap-1 px-4 py-2 border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              >
                {currentLang === 'en' ? "View Website" : "ওয়েবসাইট দেখুন"}
              </button>
            ) : (
              <button
                id="btn-nav-admin"
                onClick={onAdminClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer rounded-lg text-xs font-medium transition-colors"
                title={currentLang === 'en' ? "Access Admin Portal" : "অ্যাডমিন পোর্টাল"}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? "Admin" : "অ্যাডমিন"}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Direct Language toggle on mobile */}
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'bn' : 'en')}
              className="p-2 text-stone-600 hover:bg-stone-50 hover:text-emerald-600 rounded-lg transition-colors flex items-center"
              title="Change Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:bg-stone-50 hover:text-emerald-600 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg absolute w-full left-0 transition-all duration-200 ease-in-out">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {!isAdminMode ? (
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-600 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  {link.name[currentLang]}
                </a>
              ))
            ) : (
              <div className="mx-3 my-2 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-semibold flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                <span>{currentLang === 'en' ? "Admin Portal Active" : "অ্যাডমিন প্রবেশদ্বার সক্রিয়"}</span>
              </div>
            )}

            <div className="border-t border-stone-100 pt-4 pb-2 px-3 flex flex-col space-y-3">
              {/* Language Selector pills in Mobile Menu */}
              <div className="flex items-center space-x-2">
                <span className="text-stone-500 text-xs font-medium">Language:</span>
                <button
                  onClick={() => {
                    onLanguageChange('en');
                    handleLinkClick();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                    currentLang === 'en' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('bn');
                    handleLinkClick();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                    currentLang === 'bn' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  বাংলা
                </button>
              </div>

              {/* Admin Button in Mobile Menu */}
              {isAdminMode ? (
                <button
                  onClick={() => {
                    onExitAdmin();
                    handleLinkClick();
                  }}
                  className="w-full text-center py-2.5 border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition-colors"
                >
                  {currentLang === 'en' ? "View Main Website" : "ওয়েবসাইট দেখুন"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    onAdminClick();
                    handleLinkClick();
                  }}
                  className="w-full text-center py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>{currentLang === 'en' ? "Admin Portal" : "অ্যাডমিন পোর্টাল"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
