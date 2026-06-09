/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Eye, Users, HeartHandshake } from 'lucide-react';
import { Language, SiteContent } from '../types';

interface AboutProps {
  currentLang: Language;
  siteContent: SiteContent;
}

export default function About({ currentLang, siteContent }: AboutProps) {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === 'en' ? siteContent.aboutBadge.en : siteContent.aboutBadge.bn}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {currentLang === 'en' ? siteContent.aboutTitle.en : siteContent.aboutTitle.bn}
          </h2>
          <div className="w-16 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Top Split: Who We Are & What We Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* Who We Are Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/50 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-xl text-stone-900">
                {currentLang === 'en' ? "Who We Are" : "আমরা কে"}
              </h3>
            </div>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {currentLang === 'en' ? siteContent.aboutWhoWeAre.en : siteContent.aboutWhoWeAre.bn}
            </p>
          </div>

          {/* What We Do Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/50 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-xl text-stone-900">
                {currentLang === 'en' ? "What We Do" : "আমরা কী করি"}
              </h3>
            </div>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {currentLang === 'en' ? siteContent.aboutWhatWeDo.en : siteContent.aboutWhatWeDo.bn}
            </p>
          </div>

        </div>

        {/* Bottom Split: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission */}
          <div className="flex gap-4 p-5 rounded-xl border border-stone-100 bg-linear-to-b from-stone-50/50 to-white">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0 border border-amber-100/60">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-lg text-stone-900">
                {currentLang === 'en' ? "Our Mission" : "আমাদের লক্ষ্য"}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {currentLang === 'en' ? siteContent.aboutMission.en : siteContent.aboutMission.bn}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex gap-4 p-5 rounded-xl border border-stone-100 bg-linear-to-b from-stone-50/50 to-white">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100/60">
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-lg text-stone-900">
                {currentLang === 'en' ? "Our Vision" : "আমাদের স্বপ্ন"}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {currentLang === 'en' ? siteContent.aboutVision.en : siteContent.aboutVision.bn}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
