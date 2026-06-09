/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Tag, Camera, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Language, GalleryItem } from '../types';

interface GalleryProps {
  currentLang: Language;
  galleryItems: GalleryItem[];
}

export default function Gallery({ currentLang, galleryItems }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category.en.toLowerCase())))];

  const getFilteredItems = () => {
    if (selectedCategory === 'all') return galleryItems;
    return galleryItems.filter(item => item.category.en.toLowerCase() === selectedCategory);
  };

  const formatCategoryName = (cat: string) => {
    if (cat === 'all') {
      return currentLang === 'en' ? "All Campaign photos" : "সব ছবি";
    }
    // find a matching record to get translated display name
    const item = galleryItems.find(i => i.category.en.toLowerCase() === cat);
    if (!item) return cat;
    return currentLang === 'en' ? item.category.en : item.category.bn;
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === 'en' ? "Direct Impact Evidence" : "কাজের বাস্তব চিত্র ও আপডেট"}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {currentLang === 'en' ? "Transparency In Action" : "মাঠপর্যায়ের চিত্রশালা"}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            {currentLang === 'en' 
              ? "Every smile, pack of rice, and medicine box we distribute is logged to assure absolute trust and accountability."
              : "প্রতিটি ক্যাম্পেইন এবং কার্যক্রম আমরা সরাসরি আপনাদের মাঝে প্রকাশ করি যাতে কাজের স্বচ্ছতা বজায় থাকে।"}
          </p>
          <div className="w-16 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                selectedCategory === cat
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {formatCategoryName(cat)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredItems().map((item) => (
            <div 
              key={item.id} 
              className="bg-stone-50 border border-stone-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={currentLang === 'en' ? item.title.en : item.title.bn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback in case image source is broken
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                
                {/* Floating category tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-100">
                  {currentLang === 'en' ? item.category.en : item.category.bn}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                <h4 className="font-sans font-semibold text-xs sm:text-sm text-stone-800 line-clamp-2">
                  {currentLang === 'en' ? item.title.en : item.title.bn}
                </h4>
                
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-stone-300" />
                    <span>{item.date}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <span>{currentLang === 'en' ? "Verified" : "যাচাইকৃত"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small footer note about Facebook Page posts linking */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-400 inline-flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-stone-300" />
            <span>
              {currentLang === 'en' 
                ? "Looking for daily stories? We actively update live distribution logs on our Facebook group too."
                : "প্রতিদিনের কাজের সরাসরি কাহিনী জানতে আমাদের ফেসবুক গ্রুপ ভিজিট করতে পারেন।"}
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
