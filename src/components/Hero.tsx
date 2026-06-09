/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ArrowRight, MessageSquare, Handshake, Quote } from 'lucide-react';
import { Language, SiteContent } from '../types';

interface HeroProps {
  currentLang: Language;
  siteContent: SiteContent;
  onDonateClick: () => void;
  onLearnClick: () => void;
}

export default function Hero({ currentLang, siteContent, onDonateClick, onLearnClick }: HeroProps) {
  return (
    <header className="relative bg-radial from-stone-50 via-emerald-50/20 to-white pt-10 pb-16 lg:py-24 overflow-hidden" id="home">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-12 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Soft badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100/60 text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {currentLang === 'en' ? siteContent.heroBadge.en : siteContent.heroBadge.bn}
            </div>

            {/* Main title */}
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight">
              {currentLang === 'en' ? siteContent.heroTitle.en : siteContent.heroTitle.bn}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {currentLang === 'en' ? siteContent.heroSubtitle.en : siteContent.heroSubtitle.bn}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                id="btn-hero-donate"
                onClick={onDonateClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-all shadow-sm hover:shadow-md cursor-pointer translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>{currentLang === 'en' ? siteContent.ctaDonateText.en : siteContent.ctaDonateText.bn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-hero-learn"
                onClick={onLearnClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold rounded-lg text-sm cursor-pointer transition-colors shadow-2xs"
              >
                <span>{currentLang === 'en' ? siteContent.ctaLearnText.en : siteContent.ctaLearnText.bn}</span>
              </button>
            </div>

            {/* Quick stats list */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-sans font-bold text-2xl text-emerald-800">১০০%</p>
                <p className="text-stone-500 text-xs font-medium">
                  {currentLang === 'en' ? "Direct Reach" : "সরাসরি পৌঁছায়"}
                </p>
              </div>
              <div className="text-center lg:text-left border-x border-stone-100 px-4">
                <p className="font-sans font-bold text-2xl text-amber-600">১,২০০+</p>
                <p className="text-stone-500 text-xs font-medium">
                  {currentLang === 'en' ? "Treatments Done" : "চিকিৎসা সেবা"}
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-sans font-bold text-2xl text-emerald-800">১২+</p>
                <p className="text-stone-500 text-xs font-medium">
                  {currentLang === 'en' ? "Districts Reached" : "জেলায় সেবা"}
                </p>
              </div>
            </div>

          </div>

          {/* Quote Card (Prophet Muhammad PBUH) & Interactive visual container */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Islamic Quote Container styled with supreme elegance, warmth, and respect */}
            <div className="bg-amber-50/60 rounded-2xl p-6 sm:p-8 border border-amber-100/80 shadow-xs relative">
              <div className="absolute top-4 right-4 text-amber-200">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>
              
              <div className="space-y-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
                  {currentLang === 'en' ? "Inspiring Quote" : "অনুপ্রেরণাদায়ক বাণী"}
                </span>
                
                <p className="text-stone-800 font-sans italic text-base sm:text-lg leading-relaxed relative z-10 font-medium">
                  {currentLang === 'en' ? siteContent.quoteText.en : siteContent.quoteText.bn}
                </p>
                
                <div className="border-t border-amber-200/50 pt-3">
                  <p className="text-stone-500 font-sans text-xs sm:text-sm font-semibold">
                    — {currentLang === 'en' ? siteContent.quoteSource.en : siteContent.quoteSource.bn}
                  </p>
                </div>
              </div>
            </div>

            {/* Tiny interactive pledge banner */}
            <div className="bg-emerald-800 text-emerald-50 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-700 text-white shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-white">
                  {currentLang === 'en' ? "Embrace Compassion" : "সহমর্মিতার আলো"}
                </p>
                <p className="text-xs text-emerald-200">
                  {currentLang === 'en' 
                    ? "Spread hands of empathy, hope, and direct support."
                    : "আসুন সহমর্মিতার হাত বাড়িয়ে দিই এবং মানুষের মুখে হাসি ফুটাই।"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
