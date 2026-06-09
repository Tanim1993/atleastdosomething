/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartHandshake, BookOpen, Activity, Flame, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { Language, ServiceItem } from '../types';

interface ServicesProps {
  currentLang: Language;
  services: ServiceItem[];
}

export default function Services({ currentLang, services }: ServicesProps) {
  
  // Icon resolver ensuring visual consistency and safe rendering
  const renderIcon = (name: string) => {
    const cls = "w-6 h-6";
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className={`${cls} text-emerald-600`} />;
      case 'BookOpen':
        return <BookOpen className={`${cls} text-emerald-600`} />;
      case 'Activity':
        return <Activity className={`${cls} text-rose-600 animate-pulse`} />;
      case 'Flame':
        return <Flame className={`${cls} text-amber-600`} />;
      case 'TrendingUp':
        return <TrendingUp className={`${cls} text-emerald-600`} />;
      default:
        return <HeartHandshake className={`${cls} text-emerald-600`} />;
    }
  };

  const activeServices = services.filter(s => s.isActive);

  return (
    <section className="py-16 sm:py-24 bg-stone-50/50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === 'en' ? "Empowering Initiatives" : "আমাদের জনকল্যাণমূলক কাজসমূহ"}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {currentLang === 'en' ? "What We At Least Do" : "অনুদান ও মানুষের পাশে দাঁড়ানোর উদ্যোগ"}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            {currentLang === 'en' 
              ? "Through continuous physical campaigns, we coordinate grassroots relief across towns and secluded villages."
              : "প্রত্যন্ত গ্রামে এবং শহরের বস্তিতে আমাদের স্বেচ্ছাসেবীরা প্রত্যক্ষভাবে এসকল কাজ পরিচালনা করে থাকেন।"}
          </p>
          <div className="w-16 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Services Grid Layout */}
        {activeServices.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-stone-200">
            <AlertCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 text-sm">
              {currentLang === 'en' ? "No activities currently displayed." : "কোনো কার্যক্রম এই মুহূর্তে তালিকাভুক্ত নেই।"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeServices.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl border border-stone-200/60 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {service.imageUrl && (
                  <div className="h-44 w-full overflow-hidden border-b border-stone-100 bg-stone-50">
                    <img 
                      src={service.imageUrl} 
                      alt={currentLang === 'en' ? service.title.en : service.title.bn} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                )}
                
                <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Icon & Active Tag */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                        {renderIcon(service.iconName)}
                      </div>
                      
                      <span className="text-[10px] uppercase tracking-wide font-black bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                        {currentLang === 'en' ? "Active Program" : "চলমান কর্মসূচি"}
                      </span>
                    </div>

                    {/* Title & Copy */}
                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-lg text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {currentLang === 'en' ? service.title.en : service.title.bn}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        {currentLang === 'en' ? service.description.en : service.description.bn}
                      </p>
                    </div>
                  </div>

                  {/* Beneficiary Badge & Program Metrics Footer inside the Card */}
                  <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-400 font-medium">
                        {currentLang === 'en' ? "Impact Reached:" : "মোট উপকৃত:"}
                      </span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm">
                        {currentLang === 'en' ? service.beneficiaries.en : service.beneficiaries.bn}
                      </span>
                    </div>
                    
                    {service.costText && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-400 font-medium">
                          {currentLang === 'en' ? "Estimated Unit:" : "আনুমানিক উৎস/ব্যয়:"}
                        </span>
                        <span className="font-semibold text-stone-600 font-mono text-[11px]">
                          {currentLang === 'en' ? service.costText.en : service.costText.bn}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
