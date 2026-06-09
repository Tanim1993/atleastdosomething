/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Send, SendHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, SiteContent } from '../types';

interface ContactProps {
  currentLang: Language;
  siteContent: SiteContent;
  onSubmitMessage: (msg: { name: string; email: string; phone: string; message: string }) => void;
}

export default function Contact({ currentLang, siteContent, onSubmitMessage }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!name.trim()) {
      setErrorMsg(currentLang === 'en' ? "Please leave your name." : "দয়া করে আপনার নাম লিখুন।");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setErrorMsg(currentLang === 'en' ? "Please provide either a phone number or email." : "দয়া করে অন্তত একটি ফোন নাম্বার অথবা ইমেইল দিন।");
      return;
    }
    if (!message.trim()) {
      setErrorMsg(currentLang === 'en' ? "Please write your query first." : "দয়া করে বার্তাটি লিখুন।");
      return;
    }

    // Fire callback
    onSubmitMessage({
      name,
      email,
      phone,
      message
    });

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSuccess(true);

    // Timeout toast
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === 'en' ? "Direct Channel" : "যোগাযোগ করুন"}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {currentLang === 'en' ? "Get In Touch Instantly" : "যেকোনো জিজ্ঞাসায় আমরা পাশে আছি"}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            {currentLang === 'en' 
              ? "Want to sponsor a program, volunteer, or request support? Send us a message or phone us directly."
              : "আপনার কোনো পরামর্শ থাকলে, স্বেচ্ছাসেবক হতে চাইলে কিংবা সহায়তার প্রয়োজন হলে আমাদের লিখুন অথবা ফোন করুন।"}
          </p>
          <div className="w-16 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Info Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-sans font-bold text-xl text-stone-900 pb-2 border-b border-stone-100">
              {currentLang === 'en' ? "Our Contact Information" : "অফিস ও যোগাযোগের তথ্য"}
            </h3>

            {/* Coordinates Card stack */}
            <div className="space-y-4">
              
              {/* Phone item */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100/50 hover:bg-stone-50/80 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100/40">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                    {currentLang === 'en' ? "Call Us Directly" : "সরাসরি ফোন করুন"}
                  </p>
                  <a href={`tel:${siteContent.contactPhone}`} className="text-stone-800 font-sans font-bold text-sm sm:text-base hover:text-emerald-700 transition-colors">
                    {siteContent.contactPhone}
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100/50 hover:bg-stone-50/80 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100/40">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                    {currentLang === 'en' ? "Email Address" : "ইমেইল করুন"}
                  </p>
                  <a href={`mailto:${siteContent.contactEmail}`} className="text-stone-800 font-sans font-medium text-sm sm:text-base hover:text-emerald-700 transition-colors break-all">
                    {siteContent.contactEmail}
                  </a>
                </div>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100/50 hover:bg-stone-50/80 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                    {currentLang === 'en' ? "Our Location" : "কার্যালয়ের ঠিকানা"}
                  </p>
                  <p className="text-stone-800 font-sans font-medium text-xs sm:text-sm leading-relaxed">
                    {currentLang === 'en' ? siteContent.contactAddress.en : siteContent.contactAddress.bn}
                  </p>
                </div>
              </div>

              {/* Facebook item */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100/50 hover:bg-stone-50/80 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100/40">
                  <Facebook className="w-5 h-5 fill-blue-600 text-blue-600" />
                </div>
                <div className="space-y-0.5 flex-grow">
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                    {currentLang === 'en' ? "Official Facebook Page" : "ফেসবুক পেজ লিংক"}
                  </p>
                  <a 
                    href={siteContent.contactFacebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-800 font-sans font-medium hover:text-blue-700 transition-colors flex items-center gap-1 group text-xs sm:text-sm"
                  >
                    <span>facebook.com/atleastdosomething</span>
                    <span className="inline-block transform group-hover:translate-x-0.5 transition-transform">↗</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right panel: Polite Form */}
          <div className="lg:col-span-7 bg-stone-50/60 border border-stone-200/50 rounded-2xl p-6 sm:p-8">
            <h3 className="font-sans font-bold text-xl text-stone-900 mb-6">
              {currentLang === 'en' ? "Send a Message Directly" : "সরাসরি বার্তা পাঠান"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row: Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  {currentLang === 'en' ? "Your Full Name" : "আপনার সম্পূর্ণ নাম"} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentLang === 'en' ? "e.g., Tanvir Ahmed" : "উদা: তানভীর আহমেদ"}
                  className="w-full bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden rounded-lg px-4 py-2.5 text-sm text-stone-800 transition-colors"
                />
              </div>

              {/* Row: Email & Phone split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                    {currentLang === 'en' ? "Email Address" : "ইমেইল এড্রেস"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden rounded-lg px-4 py-2.5 text-sm text-stone-800 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                    {currentLang === 'en' ? "Phone Number" : "ফোন নাম্বার"} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden rounded-lg px-4 py-2.5 text-sm text-stone-800 transition-colors"
                  />
                </div>
              </div>

              {/* Row: Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  {currentLang === 'en' ? "Message / Query" : "আপনার বার্তা বা জিজ্ঞাসা"} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={currentLang === 'en' ? "Describe how we can collaborate, or if you require any support..." : "অনুগ্রহ করে আপনার বার্তাটি এখানে লিখুন..."}
                  className="w-full bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden rounded-lg px-4 py-2.5 text-sm text-stone-800 transition-colors resize-none"
                />
              </div>

              {/* Status boxes */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-800 border border-rose-100 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    {currentLang === 'en' 
                      ? "Success! Jazakallah Khair. We have received your query." 
                      : "সফলভাবে পাঠানো হয়েছে! জাজাকাল্লাহ খায়ের। আমরা শীঘ্রই যোগাযোগ করব।"}
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                id="btn-contact-submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
              >
                <span>{currentLang === 'en' ? "Send Message" : "বার্তা পাঠান"}</span>
                <SendHorizontal className="w-4 h-4" />
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
