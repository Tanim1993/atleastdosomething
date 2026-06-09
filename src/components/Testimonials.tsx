/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Quote, MessageSquare, Award } from 'lucide-react';
import { Language, TestimonialItem } from '../types';

interface TestimonialsProps {
  currentLang: Language;
  testimonials: TestimonialItem[];
}

export default function Testimonials({ currentLang, testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 sm:py-24 bg-stone-50/40 border-y border-stone-100" id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === 'en' ? "Voices of Trust" : "দাতাগণ ও স্বেচ্ছাসেবকদের মতামত"}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {currentLang === 'en' ? "What Our Community Says" : "আমাদের কাজ সম্পর্কে তাঁদের কথা"}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            {currentLang === 'en' 
              ? "Kindness is infectious. Read direct notes from our proud volunteers, sponsors, and brave local families."
              : "একটু সহমর্মিতা সমাজকে বদলে দিতে পারে। আমাদের দাতা, স্বেচ্ছাসেবী ও স্থানীয় সুবিধাভোগীদের কিছু সরাসরি মতামত নীচে তুলে ধরা হলো।"}
          </p>
          <div className="w-16 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Testimonials Bento/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/50 shadow-2xs hover:shadow-sm transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Star Rating & Quote Decal */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-0.5" id={`rating-${test.id}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < test.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                      }`} 
                    />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-stone-100 shrink-0 transform scale-x-[-1]" />
              </div>

              {/* Comment Copy */}
              <p className="text-stone-600 text-sm italic leading-relaxed mb-6 font-sans">
                &ldquo;{currentLang === 'en' ? test.comment.en : test.comment.bn}&rdquo;
              </p>

              {/* Author / Citizen Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                  {test.name.en.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-stone-900">
                    {currentLang === 'en' ? test.name.en : test.name.bn}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                    <Award className="w-3 w-3 text-emerald-600 shrink-0" />
                    <span>{currentLang === 'en' ? test.role.en : test.role.bn}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
