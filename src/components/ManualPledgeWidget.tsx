import React, { useState } from 'react';
import { Check, Clipboard, CheckCircle, Wallet, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, ServiceItem, PaymentConfig, ManualDeclaration } from '../types';

interface ManualPledgeWidgetProps {
  currentLang: Language;
  services: ServiceItem[];
  paymentConfig: PaymentConfig;
  onPledgeSubmit: (declaration: {
    name: string;
    email: string;
    phone: string;
    amount: number;
    channel: 'bkash' | 'nagad' | 'rocket' | 'bank';
    campaignEn: string;
    campaignBn: string;
    referenceInfo: string;
  }) => void;
}

export default function ManualPledgeWidget({
  currentLang,
  services,
  paymentConfig,
  onPledgeSubmit,
}: ManualPledgeWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // State for step 1
  const [selectedPreset, setSelectedPreset] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'direct');

  // State for step 2
  const [activeChannel, setActiveChannel] = useState<'bkash' | 'nagad' | 'rocket' | 'bank'>('nagad');
  const [copied, setCopied] = useState(false);

  // State for step 3
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [referenceInfo, setReferenceInfo] = useState('');
  const [formError, setFormError] = useState('');

  // Derived values
  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedPreset;
  const activeService = services.find(s => s.id === selectedServiceId);
  const campaignNameEn = activeService ? activeService.title.en : 'Direct Financial Aid / Envelopes of Hope';
  const campaignNameBn = activeService ? activeService.title.bn : 'সরাসরি আর্থিক সাহায্য তহবিল';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError(currentLang === 'en' ? "Full name is required." : "পূর্ণ নাম আবশ্যক।");
      return;
    }
    if (!contactNo.trim()) {
      setFormError(currentLang === 'en' ? "WhatsApp or Contact number is required." : "যোগাযোগের নম্বর/হোয়াটসঅ্যাপ নম্বর আবশ্যক।");
      return;
    }
    if (!referenceInfo.trim()) {
      setFormError(currentLang === 'en' ? "Transaction reference or sent-from details is required." : "লেনদেনের রেফারেন্স/পাঠানো নম্বর প্রদান করা আবশ্যক।");
      return;
    }

    // Submit declaration
    onPledgeSubmit({
      name: fullName,
      email: email.trim(),
      phone: contactNo,
      amount: activeAmount,
      channel: activeChannel,
      campaignEn: campaignNameEn,
      campaignBn: campaignNameBn,
      referenceInfo: referenceInfo,
    });

    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedPreset(2000);
    setCustomAmount('');
    setFullName('');
    setEmail('');
    setContactNo('');
    setReferenceInfo('');
    setFormError('');
  };

  // Channel Account and instructions mapping
  const getChannelDetails = () => {
    switch (activeChannel) {
      case 'bkash':
        return {
          title: 'BKASH PERSONAL NO',
          number: paymentConfig?.bkash?.number || '+8801711002233',
          type: paymentConfig?.bkash?.type || 'Personal (Send Money)',
          instructions: currentLang === 'en' ? paymentConfig?.bkash?.instructionsEn : paymentConfig?.bkash?.instructionsBn,
        };
      case 'rocket':
        return {
          title: 'ROCKET PERSONAL NO',
          number: paymentConfig?.rocket?.number || '+8801911445566',
          type: paymentConfig?.rocket?.type || 'Personal (Send Money)',
          instructions: currentLang === 'en' ? paymentConfig?.rocket?.instructionsEn : paymentConfig?.rocket?.instructionsBn,
        };
      case 'bank':
        return {
          title: `${paymentConfig?.bank?.bankName || 'City Bank PLC'} DETAILS`,
          number: paymentConfig?.bank?.accountNumber || '1102938475001',
          type: `${paymentConfig?.bank?.accountName || 'Atleast Do Something Foundation'} (${paymentConfig?.bank?.branch || 'Banani Branch'})`,
          instructions: currentLang === 'en' ? paymentConfig?.bank?.instructionsEn : paymentConfig?.bank?.instructionsBn,
          extra: `Routing No: ${paymentConfig?.bank?.routingNumber || '220271484'}`
        };
      case 'nagad':
      default:
        return {
          title: 'NAGAD PERSONAL NO',
          number: paymentConfig?.nagad?.number || '+8801711223344',
          type: paymentConfig?.nagad?.type || 'Personal (Send Money)',
          instructions: currentLang === 'en' ? paymentConfig?.nagad?.instructionsEn : paymentConfig?.nagad?.instructionsBn,
        };
    }
  };

  const channelDetails = getChannelDetails();

  return (
    <div id="quick-donation-widget" className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
      
      {/* Header section identical to mock-up */}
      <div className="space-y-2 border-b border-stone-100 pb-5">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-full border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {currentLang === 'en' 
              ? "Manual Pledge Verification (Path A - 100% Secure & Legal)" 
              : "ম্যানুয়াল অনুদান যাচাইকরণ (শতভাগ সুরক্ষিত ও বৈধ্য পথ)"}
          </span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-[#2D5A27] tracking-tight">
          {currentLang === 'en' ? "Join Hands. Alleviate Distress." : "দরিদ্র ও নিপীড়িতদের সহায়তায় এগিয়ে আসুন"}
        </h2>
        
        <p className="text-xs text-stone-500 leading-relaxed max-w-3xl">
          {currentLang === 'en' 
            ? "Because official payment gateways require commercial trade licenses, we receive manual declarations (Path A) to keep fundraising 100% community-driven, fee-free, and legally compliant."
            : "যেহেতু প্রাতিষ্ঠানিক পেমেন্ট গেটওয়েতে বাণিজ্যিক ট্রেড লাইসেন্স ও কোম্পানির কাগজের প্রয়োজন পড়ে, তাই আমরা সম্পূর্ণ ফ্রিতে ও বৈধ্যভাবে কার্যক্রম চালু রাখতে ব্যক্তিক সাবমিশন (পথ-ক) গ্রহণ করছি।"}
        </p>
      </div>

      {step < 4 && (
        /* Stepper steps tracker directly mapping visual mockup */
        <div className="grid grid-cols-3 gap-2 pb-2 text-left text-xs text-stone-400 border-b border-stone-100">
          <div className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${step >= 1 ? 'border-emerald-600 text-stone-900 font-extrabold' : 'border-transparent'}`}>
            <span className={`w-5 h-5 text-[10px] rounded-full flex items-center justify-center font-black ${step > 1 ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
              {step > 1 ? <Check className="w-3 h-3" /> : "1"}
            </span>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider">{currentLang === 'en' ? "1. Select Amount" : "১. পরিমাণ"}</p>
              <p className="text-[9px] text-stone-400 font-normal">{currentLang === 'en' ? "Choose pledge sum" : "অনুদান নির্বাচন"}</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${step >= 2 ? 'border-emerald-600 text-stone-900 font-extrabold' : 'border-transparent'}`}>
            <span className={`w-5 h-5 text-[10px] rounded-full flex items-center justify-center font-black ${step > 2 ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
              {step > 2 ? <Check className="w-3 h-3" /> : "2"}
            </span>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider">{currentLang === 'en' ? "2. Transfer Funds" : "২. অর্থ পাঠানো"}</p>
              <p className="text-[9px] text-stone-400 font-normal">{currentLang === 'en' ? "Send from your app" : "মোবাইল ফান্ডস"}</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${step >= 3 ? 'border-emerald-600 text-stone-900 font-extrabold' : 'border-transparent'}`}>
            <span className={`w-5 h-5 text-[10px] rounded-full flex items-center justify-center font-black ${step > 3 ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
              3
            </span>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider">{currentLang === 'en' ? "3. Claim Reference" : "৩. প্রমাণ সাবমিট"}</p>
              <p className="text-[9px] text-stone-400 font-normal">{currentLang === 'en' ? "Input transaction" : "তথ্য সংযুক্তিকরণ"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= STEP 1 ======================= */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              {currentLang === 'en' ? "Sponsor Amount (Bangladeshi Taka - ৳)" : "সহায়তার পরিমাণ (বাংলাদেশি টাকা - ৳)"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 border text-center font-black text-sm rounded-xl cursor-pointer transition-all ${
                    selectedPreset === amt && !customAmount
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  ৳{amt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <input
              type="number"
              placeholder={currentLang === 'en' ? "Or raw custom ৳ e.g. 10000" : "অথবা কাস্টম পরিমাণ ৳ লিখুন যেমনঃ ১০০০"}
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedPreset(0);
              }}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 capitalize"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              {currentLang === 'en' ? "Sponsor Campaign / Humanitarian Drive" : "অনুদানের উদ্দেশ্য / ক্যাম্পেইন নির্বাচন করুন"}
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="direct">
                {currentLang === 'en' ? "Direct Financial Aid / Envelopes of Hope" : "সরাসরি আর্থিক সাহায্য তহবিল ও খাম বিতরণ"}
              </option>
              {services.filter(s => s.isActive).map(s => (
                <option key={s.id} value={s.id}>
                  {currentLang === 'en' ? s.title.en : s.title.bn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={() => {
                if (activeAmount <= 0) {
                  alert(currentLang === 'en' ? "Please select or input an amount." : "অনুগ্রহ করে টাকার পরিমাণ নির্ধারণ করুন।");
                  return;
                }
                setStep(2);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#2D5A27] hover:bg-[#254c1f] text-white font-extrabold text-xs sm:text-sm tracking-wide rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{currentLang === 'en' ? "Continue to Transfer Funds" : "তথ্য পেয়ে টাকা পাঠিয়ে দিন"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================= STEP 2 ======================= */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              {currentLang === 'en' ? "Choose Your Desired Wallet/Transfer Channel" : "আপনার পছন্দের পেমেন্ট চ্যানেল সিলেক্ট করুন"}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => { setActiveChannel('bkash'); }}
                className={`py-3 px-2 border text-center font-black text-xs rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeChannel === 'bkash'
                    ? 'border-rose-500 bg-rose-50/40 text-rose-800 ring-2 ring-rose-500/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-500'
                }`}
              >
                <div className="w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">b</div>
                <span>BKASH (MFS)</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveChannel('nagad'); }}
                className={`py-3 px-2 border text-center font-black text-xs rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeChannel === 'nagad'
                    ? 'border-orange-500 bg-orange-50/40 text-orange-850 ring-2 ring-orange-500/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-500'
                }`}
              >
                <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-black">n</div>
                <span>NAGAD (MFS)</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveChannel('rocket'); }}
                className={`py-3 px-2 border text-center font-black text-xs rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeChannel === 'rocket'
                    ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-500/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-500'
                }`}
              >
                <div className="w-5 h-5 bg-indigo-700 text-white rounded-full flex items-center justify-center text-[10px] font-black">r</div>
                <span>ROCKET (MFS)</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveChannel('bank'); }}
                className={`py-3 px-2 border text-center font-black text-xs rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeChannel === 'bank'
                    ? 'border-teal-600 bg-teal-50/40 text-teal-900 ring-2 ring-teal-500/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-500'
                }`}
              >
                <div className="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">🏦</div>
                <span>BANK ACC.</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {currentLang === 'en' ? "Fee-Free Path A" : "কোনো অতিরিক্ত চার্জ নেই"}
              </span>
              <span className="text-xs text-stone-400 font-semibold">{currentLang === 'en' ? "Send Manually to Official Account" : "অফিসিয়াল অ্যাকাউন্টে ম্যানুয়ালি পাঠান"}</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs">
              <div className="truncate">
                <span className="block text-[9px] text-stone-400 font-extrabold tracking-wider">{channelDetails.title}</span>
                <span className="block text-sm md:text-base font-mono font-black text-stone-800 tracking-tight">{channelDetails.number}</span>
                <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">{channelDetails.type}</span>
                {activeChannel === 'bank' && channelDetails.extra && (
                  <span className="block text-[10px] text-stone-500 font-bold font-mono mt-0.5">{channelDetails.extra}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(channelDetails.number)}
                className={`flex-shrink-0 p-2.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  copied 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-stone-50 hover:bg-emerald-500 hover:text-white border-stone-200'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Clipboard className="w-4 h-4" />}
                <span>{copied ? (currentLang === 'en' ? "Copied" : "কপি হয়েছে") : (currentLang === 'en' ? "Copy" : "কপি")}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
              <p className="font-extrabold text-stone-800 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>{currentLang === 'en' ? "Easy Instructions:" : "সহজ ৩-ধাপের নির্দেশাবলি:"}</span>
              </p>
              
              {/* Detailed custom step layout */}
              <div className="space-y-1.5 pl-1.5">
                {channelDetails.instructions?.split('\n').map((line, idx) => (
                  <p key={idx} className="font-medium text-stone-700 flex items-start gap-1">
                    <span className="text-emerald-700 font-black flex-shrink-0">•</span>
                    <span>{line}</span>
                  </p>
                )) || (
                  <>
                    <p>1. Open your payment app or dial channel code.</p>
                    <p>2. Send exactly ৳{activeAmount} to our official gateway number.</p>
                    <p>3. Copy the transaction code (TxID) or note down sender cell number to verify.</p>
                  </>
                )}
                <p className="font-bold text-[#2D5A27] pt-1">
                  {currentLang === 'en' 
                    ? `※ Please transfer exactly ৳${activeAmount} BDT to ensure immediate ledger matching.` 
                    : `※ তাৎক্ষণিক লেজার ভেরিফিকেশনের জন্য ঠিক ৳${activeAmount} টাকা ট্রান্সফার সম্পন্ন করুন।`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentLang === 'en' ? "Go Back" : "পূর্বের ধাপ"}</span>
            </button>
            
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-[#2D5A27] hover:bg-[#254c1f] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{currentLang === 'en' ? "Continue to Verification Form" : "প্রামাণিকরণ ফর্মে চলে যান"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================= STEP 3 ======================= */}
      {step === 3 && (
        <form onSubmit={validateStep3} className="space-y-4 animate-fade-in">
          
          {/* Submission declaration banner */}
          <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 text-xs leading-relaxed text-amber-900 flex items-start gap-3">
            <span className="text-base">🤝</span>
            <div>
              <p className="font-extrabold">
                {currentLang === 'en' ? "Manual Ledger Submission Request" : "ম্যানুয়াল লেজার প্রুফ ঘোষণাপত্র"}
              </p>
              <p className="mt-1 font-semibold opacity-90">
                {currentLang === 'en' 
                  ? `You are declaring a manual transfer of ৳${activeAmount} BDT via ${activeChannel.toUpperCase()} to the campaign: "${campaignNameEn}".`
                  : `আপনি "${campaignNameBn}" উদ্যোগে ${activeChannel.toUpperCase()} দিয়ে ৳${activeAmount} টাকা অর্থ প্রদানের ম্যানুয়াল ঘোষণা রেডি করছেন।`}
              </p>
            </div>
          </div>

          {formError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-bold leading-normal">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-1">
                {currentLang === 'en' ? "Your Full Name *" : "আপনার পূর্ণ নাম *"}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tanvir Chowdhury"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-1">
                {currentLang === 'en' ? "Your Email Address (Optional)" : "আপনার ইমেইল ঠিকানা (ঐচ্ছিক)"}
              </label>
              <input
                type="email"
                placeholder="e.g. tanvir@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-1">
                {currentLang === 'en' ? "WhatsApp / Contact No *" : "হোয়াটসঅ্যাপ / যোগাযোগের মোবাইল নম্বর *"}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +88017XXXXXXXX"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-1">
                {currentLang === 'en' ? "Reference Code / Sent-From Number / TxID *" : "রেফারেন্স নম্বর / যে মোবাইল নম্বর থেকে পাঠিয়েছেন / ট্রানজেকশন আইডি (TxID) *"}
              </label>
              <input
                type="text"
                required
                placeholder={currentLang === 'en' ? "e.g. Sent from 01712-XXXXXX, TxID: BK7169A" : "উদাঃ ০১৭১২-XXXXXX থেকে পাঠানো হয়েছে, নগদ আইডিঃ NG57D331"}
                value={referenceInfo}
                onChange={(e) => setReferenceInfo(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs md:text-sm font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                {currentLang === 'en'
                  ? "Please insert some evidence (e.g. the phone number you used to send, or the transaction code) so admins can verify the entry immediately."
                  : "অনুগ্রহ করে আপনার পাঠানো বিকাশ/নগদ নম্বর এবং অ্যাপের ফিরতি মেসেজের ট্রানজেকশন কোডটি দিন যেন ভেরিফিকেশন প্যানেল থেকে অ্যাডমিন দ্রুত মেলাতে পারেন।"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentLang === 'en' ? "Go Back" : "পূর্বের ধাপ"}</span>
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{currentLang === 'en' ? "Submit Secure Declaration" : "সুরক্ষিত উপায়ে তথ্য সাবমিট করুন"}</span>
              <span>৳</span>
            </button>
          </div>
        </form>
      )}

      {/* ======================= SUCCESS SCREEN ======================= */}
      {step === 4 && (
        <div className="py-6 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#2D5A27]">
            <CheckCircle className="w-10 h-10 animate-bounce" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-stone-900">
              {currentLang === 'en' ? "Pledge Declared Successfully!" : "আপনার অনুদানের ঘোষণাটি সফলভাবে জমা হয়েছে!"}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              {currentLang === 'en'
                ? "May your kindness be accepted! Your manual transfer proof has been written to the ledger database (Status: Pending Verification). Admins will confirm details with banks shortly."
                : "আপনার মহৎ উদ্যোগ সফল হোক! আপনার পাঠানো প্রমাণটি আমাদের ম্যানুয়াল খতিয়ানে জমা হয়েছে (স্টেটাসঃ অমীমাংসিত)। আমাদের নিরীক্ষক দল দ্রুতই মেলাবেন ও রশিদ চূড়ান্ত করবেন।"}
            </p>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100/40 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs text-[#2D5A27] font-semibold space-y-1.5">
            <p className="font-extrabold text-center uppercase tracking-wider border-b border-emerald-250 pb-1.5 mb-1.5 text-stone-800">
              {currentLang === 'en' ? "Receipt Summary" : "দাখিলি রশিদ বিবরণী"}
            </p>
            <div className="flex justify-between font-mono">
              <span className="text-stone-500">{currentLang === 'en' ? "Pledger:" : "দাতাঃ"}</span>
              <span className="text-stone-850 font-bold">{fullName}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-stone-500">{currentLang === 'en' ? "Amount:" : "পরিমাণঃ"}</span>
              <span className="text-stone-850 font-bold">৳{activeAmount} BDT</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-stone-500">{currentLang === 'en' ? "Channel:" : "চ্যানেলঃ"}</span>
              <span className="text-stone-850 font-bold">{activeChannel.toUpperCase()}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-stone-500">{currentLang === 'en' ? "Verified Link:" : "লিংকড ক্যাম্পেইনঃ"}</span>
              <span className="text-stone-850 font-bold truncate max-w-[150px]">{currentLang === 'en' ? campaignNameEn : campaignNameBn}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-stone-150 hover:bg-stone-200 text-stone-700 font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
          >
            {currentLang === 'en' ? "Make Another Pledge" : "আরেকটি প্রতিশ্রুতি দিন"}
          </button>
        </div>
      )}

    </div>
  );
}
