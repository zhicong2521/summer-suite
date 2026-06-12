import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Home, 
  TrendingUp, 
  Smartphone, 
  CheckCircle2,
  Car,
  Wifi,
  Trash2,
  ChevronRight,
  Info,
  Gift,
  FileSignature,
  Waves,
  Users,
  Dumbbell,
  Coffee,
  X,
  Calculator,
  Calendar,
  Sparkles,
  DollarSign,
  Download,
  Award
} from 'lucide-react';
import IncentivesSection from './components/IncentivesSection';
import MortgageCalculator from './components/MortgageCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'typeC' | 'typeB' | 'typeA' | 'masterPlan'>('typeC');
  const [locationView, setLocationView] = useState<'map' | 'walk'>('map');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(-1);
  const [selectedPlanImg, setSelectedPlanImg] = useState<{title: string, src: string} | null>(null);
  const [galleryViewMode, setGalleryViewMode] = useState<'grid' | 'slider'>('grid');
  
  // Registration and Booking State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('typeC');
  const [bookingMessage, setBookingMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [savedAppointments, setSavedAppointments] = useState<any[]>(() => {
    try {
      const data = localStorage.getItem('summer_suites_appointments');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Translation Switch Engine
  const [isZh, setIsZh] = useState(false);
  const t = (enValue: string, zhValue: string) => isZh ? zhValue : enValue;

  const facilityImages = [
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c4f3496783b1af58ce15b.png",
      title: t("Luxury Exterior Profile", "大楼璀璨尊贵外观"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14adacee7c3e558c74.png",
      title: t("Infinity Pool View", "高空无边际泳池"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14e650055aa2dd6d28.png",
      title: t("Lobby & Water Features", "奢华大堂与叠水景致"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14c53e51acc0a88fbe.png",
      title: t("Rooftop Sky Terrace", "云顶星空露天廊台"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14c53e51acc0a88fc3.png",
      title: t("Co-Working & Multi-Purpose Zone", "智联共享多功能会所"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14e650055aa2dd6d23.png",
      title: t("The Sunset Club Deck", "日落观景会合露台"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d328a3c98ce5631d577.png",
      title: t("Wellness & Spa Oasis", "尊贵御养水疗绿洲"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d4816651db7bff730b6.png",
      title: t("Double-Story Fitness Gym", "双层高空全景健身房"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d408a3c98ce5631d653.png",
      title: t("Bento Garden Lounges", "禅意松风静心庭园"),
      desc: ""
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d4396783b1af56d630e.png",
      title: t("The Royal BBQ Pavilion", "皇家尊享户外欢聚亭"),
      desc: ""
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone) return;

    const newAppointment = {
      id: Date.now().toString(),
      name: bookingName,
      email: bookingEmail,
      phone: bookingPhone,
      layout: selectedLayout,
      message: bookingMessage,
      timestamp: new Date().toLocaleDateString('en-SG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newAppointment, ...savedAppointments];
    setSavedAppointments(updated);
    localStorage.setItem('summer_suites_appointments', JSON.stringify(updated));

    setIsSubmitted(true);
    // Reset form after timer or leave as success screen
  };

  const clearAppointments = () => {
    setSavedAppointments([]);
    localStorage.removeItem('summer_suites_appointments');
  };

  const openGalleryImg = (index: number) => {
    setSelectedGalleryIndex(index);
    setSelectedGalleryImg(facilityImages[index].src);
  };

  const navigateGallery = (direction: 'next' | 'prev') => {
    if (selectedGalleryIndex === -1) return;
    let newIndex = selectedGalleryIndex;
    if (direction === 'next') {
      newIndex = (selectedGalleryIndex + 1) % facilityImages.length;
    } else {
      newIndex = (selectedGalleryIndex - 1 + facilityImages.length) % facilityImages.length;
    }
    setSelectedGalleryIndex(newIndex);
    setSelectedGalleryImg(facilityImages[newIndex].src);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-slate-300 selection:bg-[#d4af37] selection:text-black">
      
      {/* Top Bar Call-To-Action / Status Indicator */}
      <div className="bg-gradient-to-r from-[#8a6829] via-[#b58b38] to-[#d4af37] text-black text-center py-2 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>{t("RTS Link Cross-Border Special Pricing Phase Active • Exquisite Freehold Residence", "RTS 接驳通道跨境特惠定价阶段开启 • 尊贵永久地契奢配官邸")}</span>
        <span className="hidden md:inline border-l border-black/30 pl-2 ml-2">{t("Book a Private Gallery Tour today", "立即预约尊享私人沙龙展厅品鉴")}</span>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#cca766]/20 z-40 transition-all duration-300 top-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Replaced with Royal Emblem styling */}
            <a href="#" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-9 h-11 flex items-center justify-center">
                <div className="absolute inset-0 border-t-2 border-b-2 border-l-2 border-[#d4af37] transform -skew-x-[20deg] w-6 left-0 transition-transform group-hover:scale-105"></div>
                <div className="absolute inset-0 border-t-2 border-b-2 border-r-2 border-[#cca766] transform -skew-x-[20deg] w-6 right-0 translate-y-1 translate-x-2 transition-transform group-hover:scale-95"></div>
                <span className="relative z-10 text-2xl font-black text-[#e8c87b] italic tracking-tighter">S</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[1.25rem] font-bold tracking-[0.25em] text-[#d4af37] leading-none uppercase">Summer</span>
                <span className="text-[1.1rem] font-light tracking-[0.3em] text-[#e8c87b] leading-none uppercase mt-0.5">Suites</span>
              </div>
            </a>

            {/* Nav Links */}
            <div className="hidden lg:flex space-x-8">
              <a href="#location" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">{t("Location", "黄金地段")}</a>
              <a href="#facilities" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">{t("Facilities", "会所配套")}</a>
              <a href="#comparison" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">{t("Price Analysis", "价格对比")}</a>
              <a href="#smart" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">{t("Smart Living", "智慧生活")}</a>
              <a href="#layouts" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">{t("Layouts", "户型规划")}</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsZh(!isZh)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#cca766]/40 hover:border-[#d4af37] hover:text-[#d4af37] text-[11px] font-mono font-bold tracking-widest text-slate-300 transition-all uppercase cursor-pointer"
                id="language-switch-btn"
              >
                <span>🌐 {isZh ? 'English' : '中文'}</span>
              </button>
              <a 
                href="#register-drawer" 
                className="bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#e8c87b] hover:from-[#d4af37] hover:to-[#fcf0b1] text-black px-6 py-3 rounded-none font-bold text-xs uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] tracking-widest hover:scale-[1.03]"
              >
                {t("Register Interest", "立即预约登记")}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 lg:pt-60 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Elegant gradient overlay to safeguard content contrast on the left, while leaving the building render on the right beautifully clear and uninhibited */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent sm:from-black sm:via-black/70 sm:to-black/30 z-10"></div>
          {/* Subtle elegant lines reflecting the premium blueprint brochure cover */}
          <div className="absolute inset-0 opacity-15 z-15 style-lines" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0L1000 1000M500 0L0 800M1000 200L200 1000\' stroke=\'%23d4af37\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")' }}></div>
          <img 
            src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be00fb1ed4cacb3b44.webp" 
            alt="Summer Suites Luxury Tower Residency Exterior Rendering" 
            className="w-full h-full object-cover object-[70%_center] sm:object-right-top opacity-75 sm:opacity-90 transition-all duration-[10000ms] scale-100 hover:scale-105"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#111] backdrop-blur-md border border-[#cca766]/50 text-[#d4af37] font-semibold text-xs mb-8 shadow-[0_0_15px_rgba(212,175,55,0.15)] uppercase tracking-widest animate-bounce">
              <Award className="w-4 h-4 text-[#e8c87b]" />
              <span>{t("Est. Completion June 2029 • Freehold Strategic Masterpiece", "预计2029年6月竣工 • 永久地契传世杰作")}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tight">
              {t("A Living Solution,", "这不仅是一个空间，")}<br/>
              <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#fcf0b1] drop-shadow-lg">
                {t("Not Just A Space.", "而是一套生活方案。")}
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl font-light">
              {t("Elevate your investment strategy in Johor Bahru’s core. Strategically designed for daily Singapore commuters & high-yield investors seeking seamless integration with CIQ & next-gen RTS link.", "震撼升级您在柔佛新山核心区的投资蓝图。专为往返新加坡的通勤白领与追求资产升值的高净值投资者量身打造，无缝对接CIQ关口与下一代RTS轻轨。")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mb-12 bg-black/60 p-6 border border-[#cca766]/10 backdrop-blur-sm">
              <div className="border-r border-[#cca766]/20 pr-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">{t("RTS Link Connectivity", "RTS 跨国轻轨对接")}</span>
                <span className="text-white font-bold text-lg">{t("850m Dedicated Covered Walkway", "850米专属全天候防雨走廊")}</span>
              </div>
              <div className="border-r border-[#cca766]/20 px-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">{t("Starting Price Tier", "轻奢尊享置业底部")}</span>
                <span className="text-[#d4af37] font-extrabold text-lg">{t("From RM 613,000+ Only", "仅从 RM 613,000+ 起")}</span>
              </div>
              <div className="px-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">{t("Exclusive Value Advantage", "极致性价比红利")}</span>
                <span className="text-white font-bold text-lg">{t("Lowest PSF in Premium JB Ring", "新山黄金环线每尺均价最惠")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#layouts" className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#e8c87b] hover:from-[#d4af37] hover:to-[#fcf0b1] text-black px-8 py-4 rounded-none font-bold text-sm tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.30)] uppercase">
                {t("Explore Studio Layouts", "品鉴精装豪华户型")} <ChevronRight className="w-5 h-5 text-black" />
              </a>
              <a href="#comparison" className="flex items-center justify-center gap-2 bg-[#0a0a0a]/90 hover:bg-[#111] backdrop-blur-md border border-[#cca766]/40 text-[#d4af37] px-8 py-4 rounded-none font-bold text-sm tracking-widest transition-all uppercase">
                {t("Price PSF Comparison", "每尺价格横向评估")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-28 bg-[#0a0a0a] border-t border-[#cca766]/25 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-3 gap-12 items-center mb-16">
            <div className="lg:col-span-1">
              <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("Unrivaled Crossing Access", "无可比拟的跨国通道")}</span>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
                {t("Your Direct Gateway to ", "直通")}<span className="font-extrabold text-[#d4af37]">{t("Singapore", "新加坡")}</span>{t("", "的无界陆路门户")}
              </h2>
              <p className="text-base text-slate-400 font-light leading-relaxed mb-6">
                {t("Avoid daily heavy traffic blocks. Summer Suites offers an elegant climate-controlled covered walk option spanning a safe, direct path of only ", "彻底摆脱每日繁重拥堵。云澜名邸提供优雅的全天候温控防雨步道，全程安全直达、仅需步行")} <strong className="text-white font-semibold">{t("850 meters", "850米")}</strong> {t(" to JB-Singapore CIQ checkpoint and future rapid transit links.", " 即可无缝对接新马通关CIQ关口及未来的RTS城际快速轻轨。")}
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#111] border-l-4 border-[#d4af37] rounded-none">
                  <div className="text-white font-bold text-sm mb-1 uppercase tracking-wide">{t("6-Minute Direct Connection", "6分钟新马直连通勤")}</div>
                  <p className="text-xs text-slate-400">{t("RTS transit guarantees standard sub-40-minute commutes into Singapore's Woodlands North MRT interchange hub.", "RTS轻轨极速穿梭，确保从容迈出家门不超40分钟直抵新加坡兀兰北(Woodlands North)地铁换乘枢纽。")}</p>
                </div>
                <div className="p-4 bg-[#111] border-l-4 border-slate-500 rounded-none">
                  <div className="text-white font-bold text-sm mb-1 uppercase tracking-wide">{t("Elite Freehold Status", "传世永久地契资产")}</div>
                  <p className="text-xs text-slate-400">{t("Preserve supreme generational wealth. Stand exempt from lease renewals typical of city assets.", "稳健传承世代财富。完全免除常见城市公寓繁琐的地契到期续期限制，安心尊享无限持有期。")}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#111] border border-[#cca766]/35 p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-[#cca766]/15 pb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#d4af37] w-5 h-5 animate-pulse" />
                    <span className="text-white font-mono text-xs uppercase tracking-wider font-semibold">{t("Location Navigation", "区域地段导航")}</span>
                  </div>
                  <div className="flex gap-1 bg-[#050505] p-1 border border-[#333]">
                    <button 
                      onClick={() => setLocationView('map')}
                      className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${locationView === 'map' ? 'bg-[#d4af37] text-black font-extrabold' : 'text-slate-400 hover:text-white'}`}
                    >
                      {t("Google Map (Coordinates)", "谷歌地图 (经纬坐标)")}
                    </button>
                    <button 
                      onClick={() => setLocationView('walk')}
                      className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${locationView === 'walk' ? 'bg-[#d4af37] text-black font-extrabold' : 'text-slate-400 hover:text-white'}`}
                    >
                      {t("CIQ Connected Path", "RTS/CIQ 直连通道")}
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden border border-[#222]">
                  {locationView === 'map' ? (
                    <div className="w-full h-[400px] sm:h-[450px] relative">
                      <iframe 
                        src="https://maps.google.com/maps?q=1.461958999005475,103.77014485194512&z=17&t=m&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full opacity-95 hover:opacity-100 transition-opacity filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                        title="Summer Suites Google Map Project Location"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/95 backdrop-blur-sm border border-[#cca766]/30 px-3 py-1.5 text-[10px] text-slate-400 font-mono">
                        📍 coordinates: 1.461959, 103.770145
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c080b0b818c92b36803e4.png" 
                        alt="Walking distance layout map highlighting Summer Suites proximity to RTS CIQ" 
                        className="w-full h-auto object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>{t("*Artist visualization mapping safe commuter path", "*示意图仅供参考：规划专属全天候防雨通勤路线")}</span>
                        <span className="text-[#e8c87b] underline cursor-pointer hover:text-white" onClick={() => setSelectedPlanImg({title: t("Walking Path Detail Map", "步行通道精细总图"), src: 'https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c080b0b818c92b36803e4.png'})}>{t("Expand View", "点击放大查看")}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Resort Facilities Section */}
      <section id="facilities" className="py-28 bg-[#050505] relative overflow-hidden border-t border-[#cca766]/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b58b38]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("Level 10 Exclusive Sky Sanctum", "10层尊享云顶空中圣境")}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              {t("Resort-Crafted Wellness ", "度假式高端康养")}<span className="font-bold text-[#d4af37]">{t("Facilities Zone", "会所配套区")}</span>
            </h2>
            <p className="text-lg text-slate-300 font-light">
              {t("Summer Suites moves beyond normal residential features with 20 masterfully planned facilities curated on a single massive outdoor deck.", "云澜名邸超越传统住宅藩篱，于10层全景空中平台上匠心规划20余款大师级至臻养身设施，构筑宏大度假生活圈。")}
            </p>
          </div>

          {/* Large Facility Blueprint Layout View */}
          <div className="mb-20 bg-[#111]/80 border border-[#cca766]/30 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center backdrop-blur-[2px] pointer-events-none">
              <span className="text-[#d4af37] border-2 border-[#d4af37] px-6 py-3 uppercase text-xs font-bold tracking-widest bg-black/80 shadow-2xl">
                {t("Open Full Level 10 Blueprint Structure", "点击开启10层全景会所蓝图规制")}
              </span>
              <p className="text-slate-300 text-xs mt-2 uppercase tracking-wider">{t("Click anywhere to maximize architectural schematic details", "点击任意区域，放大探秘大师级配套指标空间详情")}</p>
            </div>
            <div className="cursor-pointer" onClick={() => setSelectedPlanImg({title: t("Level 10 Facilities Master Plan Blueprint", "10层名流会所配套大图"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png"})}>
              <img 
                src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png" 
                alt="Detailed level 10 amenities directory map" 
                className="w-full h-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <div className="bg-black/90 p-4 border-t border-[#333] flex flex-wrap justify-between items-center text-xs gap-2 font-mono">
              <span className="text-[#cca766]">{t("⭐ Legend Highlights: Aqua Zone (Left), Co-Working Pavilion (Center Deck), Active Sports (Right Side Wing)", "⭐ 图例亮点：蔚蓝水疗泳池区（左侧）、空中联合共享会所（中庭露台）、跃动力量运动馆（右侧翼）")}</span>
              <button 
                onClick={() => setSelectedPlanImg({title: t("Level 10 Facilities Master Plan Blueprint", "10层名流会所配套大图"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png"})}
                className="text-[#d4af37] hover:underline uppercase tracking-widest text-[10px] font-bold"
              >
                {t("Inspect High-Res Directory", "查验高分辨率功能总览")}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 bg-gradient-to-b from-transparent to-[#111]/30 p-1">
            {/* Category 1 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Waves size={100} className="text-[#d4af37]" /></div>
              <Waves className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">{t("Wellness & Aqua", "康体水疗区")}</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">12.</span> {t("Jacuzzi Hideaways", "私享气泡按摩浴")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">13.</span> {t("Half Olympic Pool", "半奥林匹克恒温泳池")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">16.</span> {t("Sunset Gymnasium", "日落观景力量房")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">17.</span> {t("Hydrotherapy Zone", "微泡式水疗康体区")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">18.</span> {t("Private Steam Cabin", "尊属私人蒸气桑拿房")}</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Users size={100} className="text-[#d4af37]" /></div>
              <Users className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">{t("Gathering & Social", "社交圈层生活圈")}</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">07.</span> {t("Chill Lounge", "松弛感艺术沙龙吧")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">09.</span> {t("Multi Purpose Hall", "多用途格调宴会大厅")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">10.</span> {t("Outdoor Terrace Garden", "高空露天园艺花园")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">11.</span> {t("Premium BBQ Grill Deck", "尊享火山石炙烤台")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">15.</span> {t("Sunken Pool Lounge", "下沉式水畔社交浮岛")}</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Dumbbell size={100} className="text-[#d4af37]" /></div>
              <Dumbbell className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">{t("Active & Play", "乐活悦动多功能")}</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">05.</span> {t("Acoustic Media Room", "声学微型家庭影音房")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">06.</span> {t("Half Court Hoop Hub", "半场斗牛街头篮球馆")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">08.</span> {t("Virtual Sports WOW Cabin", "高尔夫虚拟感官体验舱")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">14.</span> {t("Safe Kids Splash Pool", "童真趣味恒温泼水乐园")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">19.</span> {t("Adventure Playground", "探险主题儿童攀爬营地")}</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Coffee size={100} className="text-[#d4af37]" /></div>
              <Coffee className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">{t("Convenience Core", "至臻智慧便利环")}</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">01.</span> {t("Resident Social Lobby", "住户专属私享大厅")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">02.</span> {t("24H Autonomous AI Mart", "24小时自动AI无人智慧超市")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">03.</span> {t("The Soap Bar Laundry", "共享全自动微波烘杀菌洗衣吧")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">04.</span> {t("Executive Study Nooks", "行政及共享办公私密卡座")}</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">20.</span> {t("Learning & Meeting hub", "多重智能脑暴会议交流室")}</li>
              </ul>
            </div>
          </div>

          {/* Interactive Artwork Swipe Gallery with Lightbox trigger */}
           <div>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between mb-10 gap-6">
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="text-xs uppercase tracking-widest text-[#cca766] block">{t("Architectural Renderings", "臻美大师建筑效果图")}</span>
                <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
                  {t("Luxury Private ", "尊享私人")}<span className="font-bold text-[#d4af37]">{t("Gallery Preview", "展厅效果品鉴")}</span>
                </h3>
              </div>
              
              {/* Premium View Mode Toggle */}
              <div className="flex flex-wrap items-center gap-4 bg-[#111] p-1.5 border border-[#cca766]/25 self-start lg:self-end">
                <button
                  type="button"
                  onClick={() => setGalleryViewMode('grid')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    galleryViewMode === 'grid'
                      ? 'bg-[#d4af37] text-black font-extrabold shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t("Grid Showcase (Show All)", "全景平铺 (全部展示 🗺️)")}
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryViewMode('slider')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    galleryViewMode === 'slider'
                      ? 'bg-[#d4af37] text-black font-extrabold shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t("Classic Swipe Slider", "经典滑动 (横屏聚焦 ◀ ▶)")}
                </button>
              </div>
            </div>

            {galleryViewMode === 'grid' ? (
              /* High-Clarity Premium Grid Layout (Shows ALL 9 images elegantly and clearly) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilityImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openGalleryImg(idx)}
                    className="bg-[#111] border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-500 cursor-zoom-in relative group overflow-hidden shadow-2xl flex flex-col h-full hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
                    id={`gallery-grid-item-${idx}`}
                  >
                    <div className="absolute top-3 left-3 z-30 bg-black/85 border border-[#cca766]/40 px-2.5 py-1 text-[9px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    {/* Widescreen aspect ratio with 100% natural opacity for crisp and clear display */}
                    <div className="aspect-[16/10] w-full overflow-hidden bg-black/80">
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="p-6 relative z-20 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-0.5 bg-[#d4af37] mb-3 group-hover:w-16 transition-all duration-300"></div>
                        <h4 className="text-white text-base font-bold tracking-wide uppercase group-hover:text-[#d4af37] transition-colors">{img.title}</h4>
                      </div>
                      
                      <div className="pt-3 border-t border-[#cca766]/10 flex items-center justify-between text-[10px] text-[#cca766] font-mono uppercase tracking-wider">
                        <span>{t("Click to maximize", "尊贵内部品鉴")}</span>
                        <span className="group-hover:text-white transition-colors flex items-center gap-1">{t("Zoom HD View", "无损放大")} <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Classic Horizon Swipe Slider (Retained for quick swipe) */
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-[#111] [&::-webkit-scrollbar-track]:rounded-none [&::-webkit-scrollbar-thumb]:bg-[#cca766]/40 [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-[#d4af37] transition-all">
                {facilityImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openGalleryImg(idx)}
                    className="flex-none w-[80vw] sm:w-[50vw] md:w-[380px] snap-center bg-[#111] border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-500 cursor-zoom-in relative group overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-75 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black/80">
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="p-5 relative z-20">
                      <div className="w-8 h-0.5 bg-[#d4af37] mb-2 group-hover:w-16 transition-all duration-300"></div>
                      <h4 className="text-white text-base font-bold tracking-wide uppercase">{img.title}</h4>
                      <div className="mt-3 flex items-center justify-between text-[10px] text-[#cca766] font-mono uppercase tracking-wider">
                        <span>{t("Exclusive Preview", "专属内部品鉴")}</span>
                        <span className="group-hover:text-white transition-colors flex items-center gap-1">{t("Zoom View", "放大视图")} <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Unique Smart Living Ecosystem */}
      <section id="smart" className="py-28 bg-[#0a0a0a] border-t border-[#cca766]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("High-Tech Safety & Utility", "尖端安全与低耗管家体系")}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">{t("Zero-Friction ", "零滞纳无界")}<span className="font-bold text-[#d4af37]">{t("Smart Ecosystem", "智联全感知生态")}</span></h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              {t("Summer Suites replaces antiquated, error-prone analog systems with a synchronized touchless ecosystem to simplify security for both landlords and commuters.", "云澜名邸全面摒弃过时易出错的传统人工门禁。取而代之的是一套全场景、零接触安防生态，最大化简化往返新马通勤白领与投资房东的安全看护成本。")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <ShieldCheck className="w-6 h-6 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{t("6-Way Smart Door Lock", "六合一全场景智能门锁")}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {t("Unlock instantly via fingerprint recognition, private app triggers, temporary digital cards, or backup manual codes. Built-in low voltage sensors.", "智享指纹毫秒级识别、APP远程、临时授权临时卡、动态密码或备用机械密钥。集成低电压电量预警与防撬强警报。")}
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Smartphone className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{t("Touch-Hold Resident SOS", "一键护航紧急呼救系统")}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {t("Custom application features integrated emergency hold triggers directly to the 24-hour guard concierge station with continuous tracking backup.", "专属业主APP集成连续触控紧急响应通道，实时对讲保安中心与24小时红外中央监控，全时捍卫通勤女精英的一手生活安全。")}
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Car className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{t("Facial & Plate Gate Sync", "视网膜人脸与车牌云端交互")}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {t("Facial scans authenticate foot traffic in private lift vestibules, while automated license read-cameras control secure multi-tier parking basements.", "私属电梯前厅采用人脸免感刷脸通关，避免通勤手拎包麻烦；车库采用多快读写AI车牌算法，确保高端车主的快捷尊享体验。")}
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Wifi className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{t("Acoustic Sound Windows", "德系系统级中空断桥吸音推拉窗")}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {t("Double-glazed window structures dampen high-frequency urban traffic noise, paired with luxury Siemens switches.", "双层高致密真空镀膜折射隔音，完美阻绝高铁与都市交通高频震波。更配套国际一档西门子高定面板。")}
              </p>
            </div>

            {/* Feature card full width */}
            <div className="bg-gradient-to-r from-[#111] to-[#1a1711] p-8 border border-[#cca766]/25 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group md:col-span-2 relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Trash2 className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-3">
                <span>{t("STREAM Automated Vacuum Waste Disposal", "STREAM 全场景超音速气力真空固废自洁管道收集系统")}</span>
                <span className="text-[10px] bg-[#d4af37] text-black font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest">{t("ECO Elite", "绿色生态旗舰")}</span>
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed max-w-4xl">
                {t("Ditch the unhygienic standard trash chutes that leak odors. Our fully sealed STREAM system vacuums physical waste directly from private collection docks at supersonic air speeds, protecting the block from odor, mold, and airborne germs.", "彻底拒绝酸臭熏人、蚊蝇肆虐的传统下投式垃圾通管道。全区配备先进封闭式垃圾管道自洁系统，超音速气动真空将居家垃圾瞬时抽吸至地下转运舱，无异味无霉变、杜绝气溶胶病菌在公摊空气中扩散。")}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#cca766] font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>{t("Eliminates garbage truck noise emissions & odors in common corridors", "杜绝垃圾转运卡车通行的噪声异味，捍卫五星级酒店式公摊廊道纯净")}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Analysis Comparison Section */}
      <section id="comparison" className="py-28 bg-[#111] relative overflow-hidden border-t border-[#cca766]/25">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("High-Value ROI Assessment", "置业回报前沿测算")}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">{t("Johor Bahru Core ", "新山黄金核心圈")}<span className="font-bold text-[#d4af37]">{t("Value Mastermind", "资产价值破局")}</span></h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {t("Why pay inflated prices? Save up to RM 200,000+ while unlocking double-digit potential rentals.", "何必为溢价买单？立刻立省高达 RM 200,000+，并能撬动令人艳羡的租金收益回报率。")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive PSF Chart */}
            <div className="lg:col-span-6 bg-black/90 p-6 sm:p-10 border border-[#cca766]/35 rounded-none relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-[#cca766]/20 pb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="text-[#d4af37] w-5 h-5" /> {t("Average Price Per Sq.Ft (PSF) Comparison", "各核心楼盘每平方英尺均价 (PSF) 横向对标")}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{t("JB Ring Core", "新山核心商圈")}</span>
              </div>

              <div className="space-y-6">
                {/* Competitor 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">{t("R&F Princess Cove (4,400 units)", "富力公主湾 (4,400套房源)")}</span>
                    <span className="text-slate-400">RM 1,600 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-600 h-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Competitor 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">{t("Sky One Residency (1,600 units)", "Sky One 豪邸 (1,600套房源)")}</span>
                    <span className="text-slate-400">RM 1,300 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-500 h-full transition-all duration-1000" style={{ width: '81.25%' }}></div>
                  </div>
                </div>

                {/* Competitor 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">{t("Exsim Landmark CIQ (4,000 units)", "Exsim 滨海地标 (4,000套房源)")}</span>
                    <span className="text-slate-400">RM 1,300 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-400 h-full transition-all duration-1000" style={{ width: '81.25%' }}></div>
                  </div>
                </div>

                {/* Competitor 4 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">{t("Gen Sphere Residences (1,000 units)", "Gen Sphere 理想国 (1,000套房源)")}</span>
                    <span className="text-slate-400">RM 1,200 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-300 h-full transition-all duration-1000" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="my-6 border-t border-[#d4af37]/15 border-dashed"></div>

                {/* Summer Suites */}
                <div className="bg-[#111] p-4 border border-[#d4af37]/35 relative shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-[#d4af37]/5 blur-lg"></div>
                  <div className="relative">
                    <div className="flex justify-between items-baseline mb-2">
                       <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">{t("Summer Suites (748 units) - Promo Tier", "云澜名邸 (748套自留) - 特惠置业档")}</span>
                      <span className="text-[#fcf0b1] font-mono text-xl font-extrabold">RM 900-1,000 /sqft</span>
                    </div>
                    <div className="w-full bg-black h-5 border border-[#d4af37]/45">
                      <div className="bg-gradient-to-r from-[#8a6829] via-[#d4af37] to-[#fcf0b1] h-full shadow-[0_0_15px_rgba(212,175,55,0.4)] relative" style={{ width: '59.38%' }}>
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 skew-x-12"></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">
                      {t("*Save ~RM 200,000+ compared directly with surrounding projects for same unit footages.", "*对标同量级精装户型空间，直省高达 ~RM 200,000+ 投资本金。")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Description Side */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-[#050505] p-6 border-l-4 border-[#d4af37]">
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">{t("Buy Smarter, Save Capital upfront", "智奢投资，大幅节省首期资本沉淀")}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  {t("For standard investments of approximately ", "以同等约 ")}<strong className="text-white">{t("RM 600,000", "RM 600,000")}</strong>{t(", competitors only offer tiny, cramped 1-bedroom footprints. At Summer Suites, that exact same capital secures a luxury ", " 左右置业预备金，在周边竞品仅能购得窒闷狭窄的一房，空间极为受阻。但在云澜名邸，同样的预算足以直接揽获一套 ")}<strong className="text-[#d4af37] font-semibold">{t("599 sq.ft. DUAL STUDIO", "599平方英尺的双钥匙独立开间！")}</strong>{t(" where you can rent out two independent keys simultaneously to dual white-collar tenants commuting to Singapore.", "让您能够同时合法获得双份独立优厚租金，一个抵充银行贷款，一个乐作闲余零花。")}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/40 p-5 border border-[#cca766]/15 hover:border-[#d4af37]/40 duration-300">
                  <div className="text-[#d4af37] font-bold text-xl mb-1">RM 900+ PSF</div>
                  <span className="text-xs uppercase tracking-widest block text-slate-400 mb-2 font-mono">{t("Starting Price Rate", "建面起售尺价")}</span>
                  <p className="text-xs text-slate-400">{t("Deep layout spaces with luxurious fittings starting at rates lowest in premium vicinity zones.", "极具阔绰深度的户型物理开间搭配名厂顶奢五金，造就新山板块惊世底线尺价。")}</p>
                </div>

                <div className="bg-black/40 p-5 border border-[#cca766]/15 hover:border-[#d4af37]/40 duration-300">
                  <div className="text-white font-bold text-xl mb-1">{t("Dual Key Optimized", "双钥匙租务优化")}</div>
                  <span className="text-xs uppercase tracking-widest block text-[#cca766] mb-2 font-mono">{t("Maximum Capital Yield", "资产包收益爆点")}</span>
                  <p className="text-xs text-slate-400">{t("Maximize ROI potential. Double individual rental income sources within a single property title deed.", "激增租金投资回报中枢，在一份永久房契名下合法拆分为两份独立的高薪新马通勤白领租金来源。")}</p>
                </div>
              </div>

              {/* Explainer Box */}
              <div className="p-6 bg-black border border-[#d4af37]/25 rounded-none shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex gap-4 items-start">
                  <div className="p-2.5 bg-[#111] border border-[#d4af37]/45 text-[#d4af37] flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[#e8c87b] font-medium mb-1 tracking-wider text-sm uppercase">{t("Is PSF a Critical Metric?", "为什么“每平方英尺价格 (PSF)”是关键分水岭？")}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {t("Yes. PSF (Price Per Square Foot) directly defines your entry price arbitrage. Securing a low PSF in a high-demand commuter neighborhood like CIQ maximizes capitalization yield and buffers you safely from downward market fluctuations.", "是的。每平英尺均价直接奠定了房产增值与套利的红利安全垫。在紧邻CIQ的核心高通航通勤板块，以低PSF建仓，能获得双倍的高阻尼租金回报率与绝对的顺周期抗通胀屏障。")}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* Smart-Plan Room Layout Showcase */}
      <section id="layouts" className="py-28 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("High-Value Floor Plans", "黄金主力户型结构")}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              {t("Designed to Accommodate ", "完美设计并精确贴合")}<span className="font-bold text-[#d4af37]">{t("Every Investor", "各阶高要求置业者")}</span>
            </h2>
            <p className="text-lg text-slate-300 font-light">
              {t("Toggle beneath our three primary configurations to explore deep spaces, private entries, and dual income arrangements.", "点击下方按钮自由切换并品鉴三款精心设计的明星户型二次元蓝图，洞悉宽绰生活开间与双轨收益版图：")}
            </p>
          </div>

          {/* Interactive Sharp-Corner Custom Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              onClick={() => setActiveTab('typeC')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeC' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              {t("Type C (599 SQFT • Dual Studio)", "C 户型 (599平方英尺 • 尊贵双独立开间)")}
            </button>
            <button 
              onClick={() => setActiveTab('typeB')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeB' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              {t("Type B (808 SQFT • 2+1 Bed)", "B 户型 (808平方英尺 • 2卧1卫 + 灵动书房)")}
            </button>
            <button 
              onClick={() => setActiveTab('typeA')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeA' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              {t("Type A (912 SQFT • Dual Key)", "A 户型 (912平方英尺 • 传世双钥匙旗舰)")}
            </button>
            <button 
              onClick={() => setActiveTab('masterPlan')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'masterPlan' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              {t("Master Floor Map", "高空大盘单元总览分布图")}
            </button>
          </div>

          {/* Interactive Layout Render Box with click-to-zoom triggers */}
          <div className="bg-[#0a0a0a] border border-[#cca766]/35 p-6 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]"></div>
            
            {activeTab === 'typeC' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    {t("Commuter Hotspot Layout", "通勤白领极速变现场景")}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">{t("Type C ", "C 户型 ")}<span className="font-extrabold text-[#d4af37]">{t("- Dual Studio", "- 独立双套房双门禁")}</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>599 Sq.Ft (55.6 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">{t("Starting RM 613,000+", "仅从 RM 613,000+ 起")}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 bg-[#111] border border-[#cca766]/20 divide-y divide-slate-800/60">
                    <div className="flex justify-between items-center px-4 py-3">
                      <span className="text-slate-400">{t("Estimated Management Fee (RM 0.40/sq.ft):", "预计物业服务及公摊储备金（RM 0.40/sq.ft）：")}</span>
                      <span className="text-[#d4af37] font-bold">RM 239.60/month</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 bg-[#d4af37]/5">
                      <span className="text-slate-300 font-semibold">{t("Exclusive Sales Promo Package:", "首发尊享销售折扣配套：")}</span>
                      <span className="text-emerald-400 font-bold font-mono">3% {t("Rebate Discount", "限时减免")} (-RM 18,390)</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {t("Specifically suited for professional rental generation. Features two independently lockable suites under a unified title deed. Rent both suites split or live in one with perfect privacy while a tenant pays off your mortgage installment.", "专为实现高租售比变现而生。在一张拥有永久私家地契的手续下，设计了两个完全物理独立设锁防护、各配精装浴间的格调开间。您可以分别出租给两个新马跨境通勤的白领精英；亦或自住一间，用另一间获得的租金轻松抵扣按揭贷款月供。")}
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("2 Independent, Secure Bedroom Suites", "两套由高静音防盗大门及指纹锁安全密封的独立主套房")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("2 En-Suite Premium Private Showers", "两个全部配备德标品牌恒温热水工程与舒适花洒的独立私密卫浴")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Dual Air-Conditioning & Kitchen Utility Hookups", "两套各自精巧规划的抽拉式厨房台、洗碗池排油位与空调专线")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Double Digital Key Access Preconfigured", "交付期由厂方深度定制的双网络智控指纹防盗入户锁")}</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      {t("Request Full Spec Brochure", "索取精装选材物料白皮书")}
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: t("Type C Floor Plan - Dual Studio (599 sqft)", "C户型双钥匙精品套房 (599平方英尺)"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be08984b712927d36b.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      {t("Expand Detailed Blueprint View", "点击放大查看高清建筑尺寸测理图")}
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be08984b712927d36b.jpg" 
                    alt="Type C Floor Plan Schematic Layout" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    {t("*Artist Floor Impression. Inverted color blueprint.", "*效果图仅供参考，色阶反转以便阅读尺寸细节")}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typeB' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    {t("Perfect Spacing Option", "中产自住幸福首选")}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">{t("Type B ", "B 户型 ")}<span className="font-extrabold text-[#d4af37]">{t("- 2+1 Standard", "- 经典两房 + 通航创想书房")}</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>808 Sq.Ft (75.1 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">{t("Starting RM 725,000+", "仅从 RM 725,000+ 起")}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 bg-[#111] border border-[#cca766]/20 divide-y divide-slate-800/60">
                    <div className="flex justify-between items-center px-4 py-3">
                      <span className="text-slate-400">{t("Estimated Management Fee (RM 0.40/sq.ft):", "预计物业服务及公摊储备金（RM 0.40/sq.ft）：")}</span>
                      <span className="text-[#d4af37] font-bold">RM 323.20/month</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-4 bg-[#d4af37]/5">
                      <span className="text-slate-300 font-semibold">{t("Exclusive Sales Promo Package:", "首发尊享销售折扣配套：")}</span>
                      <span className="text-emerald-400 font-bold font-mono">7% {t("Rebate Discount", "限时减免")} (-RM 50,750)</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {t("The premium multi-bedroom standard. Generously sized layout to accommodate growing commuter families. Features a flexible layout pocket study room configured with floor wiring ready for conversion to custom video studio or corporate home office space.", "中产家庭舒适人居标杆。宽阔客餐厅格局通透明澈，完美接驳舒适景观飘窗与玻璃阳台。特设一处带排布网络及强电线路的百变前瞻书房，助您灵动改造成电竞馆、居家摄影或名酒收藏柜。")}
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("2 Master Suite Bedrooms + Multi-Utility Study Pocket", "2大观景大开面卧房 + 经典行政多功能私密创想书房")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("2 Luxury Modern Bathrooms with preconfigured water heaters", "2间精雅干湿分离干爽卫浴，配备全部高能效速热电感热水器")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Symmetric Central Dining Arena & Glass Patio Connection", "大平层中轴对称家庭聚餐主场 & 防噪断桥面宽景观外露大阳台")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Generous Double Parking Lot assignment option", "特惠期内优先认购尊享优先挑选地下双固定产权车位特权")}</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      {t("Request Full Spec Brochure", "索取精装选材物料白皮书")}
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: t("Type B Floor Plan - 2+1 Bed Standard (808 sqft)", "B户型2卧+1书房 (808平方英尺)"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bec5ead5f775c286dc.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      {t("Expand Detailed Blueprint View", "点击放大查看高清建筑尺寸测理图")}
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bec5ead5f775c286dc.jpg" 
                    alt="Type B Floor Plan Blueprint" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    {t("*Artist Floor Impression. Inverted color blueprint.", "*效果图仅供参考，色阶反转以便阅读尺寸细节")}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typeA' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    {t("Supreme Luxury Suite", "巅峰阔绰领袖大宅")}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">{t("Type A ", "A 户型 ")}<span className="font-extrabold text-[#d4af37]">{t("- Dual Key Signature", "- 传世双钥匙旗舰")}</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>912 Sq.Ft (84.7 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">{t("Starting RM 902,000+", "仅从 RM 902,000+ 起")}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 bg-[#111] border border-[#cca766]/20 divide-y divide-slate-800/60">
                    <div className="flex justify-between items-center px-4 py-3">
                      <span className="text-slate-400">{t("Estimated Management Fee (RM 0.40/sq.ft):", "预计物业服务及公摊储备金（RM 0.40/sq.ft）：")}</span>
                      <span className="text-[#d4af37] font-bold">RM 364.80/month</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-4 bg-[#d4af37]/5">
                      <span className="text-slate-300 font-semibold">{t("Exclusive Sales Promo Package:", "首发尊享销售折扣配套：")}</span>
                      <span className="text-emerald-400 font-bold font-mono">5% {t("Rebate Discount", "限时减免")} (-RM 45,100)</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {t("The absolute flagship of Summer Suites. Seamless double-entry structure provides a complete primary 2-Bedroom unit paired with an adjoining fully equipped private 1-bed efficiency studio. Maximum investment flexibility config.", "大厦无可争议的极致奢配旗舰。双通道玄关各配锁具：左侧是两室两厅双阳台的温馨主层级大居所，右侧则是兼备独立橱卫水槽、洗衣空间的私属套间。尊享三代一门之下不相侵扰的和美，或轻松实现完美零压力收租供楼。")}
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Adjoining but private separate entrance foyers", "卓越玄关一门三分双入口引流，互不干扰、完美隔音")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("3 Complete Master Bedrooms & 3 Luxury Baths", "3间通透朝南景观主卧卧室 & 3个臻奢质感五金高卫")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Generous multi-balcony skyline perspective", "双大景观外延露台，将柔佛黄金海峡及城市海岸天际线尽收眼底")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>{t("Includes premium SIEMENS switches and layout upgrades", "精装免费大跃级！额外全屋精配断桥铝金推拉窗与高规格西门子奢级面板")}</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      {t("Request Full Spec Brochure", "索取精装选材物料白皮书")}
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: t("Type A Floor Plan - Dual Key Flagship (912 sqft)", "A户型三房黄金双钥匙 (912平方英尺)"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be64042ec872de7cca.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      {t("Expand Detailed Blueprint View", "点击放大查看高清建筑尺寸测理图")}
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be64042ec872de7cca.jpg" 
                    alt="Type A Dual Key Floor Plan Blueprint" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    {t("*Artist Floor Impression. Inverted color blueprint.", "*效果图仅供参考，色阶反转以便阅读尺寸细节")}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'masterPlan' && (
              <div className="flex flex-col items-center">
                <div className="text-center mb-10 max-w-2xl">
                  <span className="text-xs uppercase tracking-widest text-[#cca766] font-mono block mb-2">{t("Dynamic Tower Arrangement", "全维地盘及采光建筑总平")}</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white uppercase">{t("Overall Site Layout & ", "整盘规划及")}<span className="font-bold text-[#d4af37]">{t("Master Plan", "平面排布宏观图")}</span></h3>
                  <p className="text-sm text-slate-400 font-light mt-3">
                    {t("View unit facing coordinates, wind vector entry points, surrounding botanical visual corridors, and high-tech parking entrances.", "直观鸟瞰大厦每一座、每一户的自然朝向、季风对开方向、公共植物绿道及智能车位出入网口配置。")}
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-12 gap-8 w-full items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div 
                      className="bg-[#111] flex-1 flex items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative min-h-[350px]"
                      onClick={() => setSelectedPlanImg({title: t("Summer Suites Master Floor Plan Layout", "云澜名邸黄金规制大盘总布置图"), src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bee5084c4b71a68eba.jpg"})}
                    >
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm animate-fade-in">
                        <span className="text-[#d4af37] border-2 border-[#d4af37] px-6 py-3 uppercase font-bold text-xs tracking-widest bg-black/80">
                          {t("Inspect Master Layout Schematic", "点击放大分析整盘总平平面排布细节")}
                        </span>
                      </div>
                      <img 
                        src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bee5084c4b71a68eba.jpg" 
                        alt="Master site plan blueprint mapping layout blocks" 
                        className="w-full max-h-[420px] object-contain opacity-90 transition-all duration-700 group-hover:scale-[1.02]" 
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between w-full mt-4 text-[10px] sm:text-xs font-mono text-slate-500 gap-2">
                      <span>{t("*Tower orientation optimized for thermal cooling", "*整栋大楼避阳角经热能仿真计算，冬暖夏凉不闷热")}</span>
                      <span className="text-[#d4af37]">{t("Orientation: Facing North-East Towards Straits View", "大厦朝向：向东北无遮挡，阔俯新马一线璀璨海景")}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-black/40 border border-[#cca766]/25 p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-white text-xs font-bold font-mono uppercase tracking-widest mb-6 border-b border-[#cca766]/20 pb-3 flex items-center justify-between">
                        <span>{t("Tower Structural Specifications", "大楼纵向空间格局与层级指标")}</span>
                        <span className="text-[#d4af37] font-normal text-[10px]">44 {t("Stories", "层高大厦")}</span>
                      </h4>
                      
                      <div className="space-y-3.5">
                        
                        {/* Level 11 to 44 */}
                        <div className="border border-[#d4af37]/35 bg-[#111] p-4 flex gap-4 items-start relative overflow-hidden group hover:border-[#d4af37] duration-300">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/5 rounded-full blur-xl pointer-events-none"></div>
                          <div className="w-10 h-10 border border-[#d4af37] text-[#d4af37] font-mono text-xs flex flex-col items-center justify-center font-bold bg-black shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                            <span className="text-[9px] leading-tight uppercase font-medium">{t("LVL", "层级")}</span>
                            <span className="text-sm font-bold -mt-1">11-44</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-[#e8c87b] font-bold text-xs uppercase tracking-wider mb-1 text-left">
                              {t("Level 11 to 44 : Unit Floor", "Level 11 to 44 : Unit Floor")}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-light leading-relaxed text-left">
                              {t("Signature high-value residential suites, offering premium Dual Key configurations and luxury comfort bedrooms.", "11至44层：臻奢高定产权客房单元。包含顶级优质双钥匙、自住格局，拥揽新马一线海岸璀璨海景。")}
                            </p>
                          </div>
                        </div>

                        {/* Level 10 */}
                        <div className="border border-[#cca766]/25 bg-[#111] p-4 flex gap-4 items-start relative overflow-hidden group hover:border-[#d4af37] duration-300">
                          <div className="w-10 h-10 border border-[#cca766]/50 text-white font-mono text-xs flex flex-col items-center justify-center font-bold bg-black">
                            <span className="text-[9px] leading-tight uppercase font-medium">{t("LVL", "层级")}</span>
                            <span className="text-sm font-bold -mt-1">10</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-left">
                              {t("Level 10 : Facilities Floor", "Level 10 : Facilities Floor")}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-light leading-relaxed text-left">
                              {t("Infinity lap pool, sky-lit state-of-the-art gymnasiums, custom study lounges, and social meeting hubs.", "10层：豪华云顶无边配套天廊。包括高空无边泳池、业主健身馆、全自动杀菌共享洗衣房、私享干事卡座等多功全景生活配套。")}
                            </p>
                          </div>
                        </div>

                        {/* Level 2 to 9 */}
                        <div className="border border-white/10 bg-[#161616]/70 p-4 flex gap-4 items-start relative overflow-hidden">
                          <div className="w-10 h-10 border border-white/20 text-slate-300 font-mono text-xs flex flex-col items-center justify-center font-bold bg-black">
                            <span className="text-[9px] leading-tight uppercase font-medium">{t("LVL", "层级")}</span>
                            <span className="text-sm font-bold -mt-1">2-9</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-slate-300 font-bold text-xs uppercase tracking-wider mb-1 text-left">
                              {t("Level 2 to 9 : Car park", "Level 2 to 9 : Car park")}
                            </h5>
                            <p className="text-[10px] text-slate-500 font-light leading-relaxed text-left">
                              {t("Secure multi-tier parking allocation. Integrated with automated license plate readers and continuous surveillance patrols.", "2至9层：业主专用多层防晒停车场。配备行业领先的天眼自动识别牌抬杆阻隔系统，便捷安全。")}
                            </p>
                          </div>
                        </div>

                        {/* Ground Floor */}
                        <div className="border border-white/10 bg-[#161616]/70 p-4 flex gap-4 items-start relative overflow-hidden">
                          <div className="w-10 h-10 border border-white/20 text-slate-300 font-mono text-xs flex flex-col items-center justify-center font-bold bg-black">
                            <span className="text-[9px] leading-tight uppercase font-medium">{t("LVL", "层级")}</span>
                            <span className="text-sm font-bold -mt-1">G</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-slate-300 font-bold text-xs uppercase tracking-wider mb-1 text-left">
                              {t("Ground Floor : Arrival Lobby, Retail Space, Parking Facilities", "Ground Floor : Arrival Lobby, Retail Space, Parking Facilities")}
                            </h5>
                            <p className="text-[10px] text-slate-500 font-light leading-relaxed text-left">
                              {t("Curated double-volume 5-star style boutique arrival dropoff gallery, dynamic lifestyle retail spaces and guest car parks.", "首层：轻奢迎宾大堂、商业街区、客用车位。层高挑空星级大堂，外部设贵宾随停落车道与便利店餐饮空间。")}
                            </p>
                          </div>
                        </div>

                        {/* Basement */}
                        <div className="border border-white/5 bg-[#1a1a1a]/40 p-4 flex gap-4 items-start relative overflow-hidden opacity-85">
                          <div className="w-10 h-10 border border-white/10 text-slate-500 font-mono text-xs flex flex-col items-center justify-center font-bold bg-black">
                            <span className="text-[9px] leading-tight uppercase font-medium">{t("LVL", "层级")}</span>
                            <span className="text-sm font-bold -mt-1">B</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1 text-left">
                              {t("Basement : Sewerage Tank & Maintenance Area", "Basement : Sewerage Tank & Maintenance Area")}
                            </h5>
                            <p className="text-[10px] text-slate-600 font-light leading-relaxed text-left">
                              {t("Equipped with touchless vacuum waste-gathering holding rooms, building electrical vaults, and physical equipment backups.", "地下室：化粪污水净化池与配电维护间。集成 STREAM 真空垃圾回收中心、备用紧急电房等基础机电设备重地。")}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Exclusive High-Value Early-Bird Incentives Section */}
      <IncentivesSection t={t} />

      {/* VIP Registry & Appointment Book Option */}
      <section id="register-drawer" className="py-28 bg-[#050505] border-t border-[#cca766]/20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#050505]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="w-full">
            <MortgageCalculator t={t} />
          </div>

        </div>
      </section>

      {/* Footer Design Credits and Details */}
      <footer className="bg-black text-slate-500 py-16 border-t border-[#cca766]/15 relative z-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            
            {/* Logo and Emblem */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-7 h-9 flex items-center justify-center">
                  <div className="absolute inset-0 border-t-2 border-b-2 border-l-2 border-[#d4af37] transform -skew-x-[20deg] w-5 left-0"></div>
                  <div className="absolute inset-0 border-t-2 border-b-2 border-r-2 border-[#cca766] transform -skew-x-[20deg] w-5 right-0 translate-y-1 translate-x-1.5"></div>
                  <span className="relative z-10 text-lg font-black text-[#e8c87b] italic tracking-tighter">S</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[0.95rem] font-bold tracking-[0.2em] text-[#d4af37] leading-none uppercase">{t("Summer", "云澜")}</span>
                  <span className="text-[0.95rem] font-light tracking-[0.25em] text-[#e8c87b] leading-none uppercase mt-0.5">{t("Suites", "名邸")}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {t("A premium freehold luxury development showcasing elite studio and residency configurations in Johor Bahru. Optimized for border commuters & portfolio maximization.", "柔佛新山永久产权顶臻奢华地精著项目，全面呈献都市通勤独立双钥匙及自住大宅。旨在打造成往来新马跨境高级人才的轻量居所。")}
              </p>
            </div>

            {/* Quick Jumps */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t("Resident Links", "快速导引")}</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="#location" className="hover:text-[#d4af37] duration-300">{t("Location and Connectivity Map", "地理位置及黄金交通网位")}</a></li>
                <li><a href="#facilities" className="hover:text-[#d4af37] duration-300">{t("Level 10 Resort Deck", "Level 10 云水无边配套天廊")}</a></li>
                <li><a href="#comparison" className="hover:text-[#d4af37] duration-300">{t("PSF Price Value Matrix", "尺价ROI横向溢量分析")}</a></li>
                <li><a href="#layouts" className="hover:text-[#d4af37] duration-300">{t("Floor Blueprint Options", "经典户型平面及尺寸分布")}</a></li>
              </ul>
            </div>

            {/* Core Specs */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t("Explanations", "黄金置业背书")}</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><span className="text-slate-400 font-medium">{t("Freehold Status:", "永久私家私有产权：")}</span> {t("Generation wealth preservation", "世代传承的至上避风港")}</li>
                <li><span className="text-slate-400 font-medium">{t("RTS Crossing:", "捷运直通系统大成：")}</span> {t("Rapid 6-Minute Shuttle to woodlands", "快速通关，6分钟即达新加坡兀兰")}</li>
                <li><span className="text-slate-400 font-medium">{t("Auto-STREAM System:", "先进真空收集垃圾：")}</span> {t("Touchless vacuum ecological waste system", "全无触封控，杜绝异味霉变扩散")}</li>
              </ul>
            </div>

            {/* Disclaimer and Sales Office */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{t("Developer Sales Office", "开发商黄金中心")}</h4>
              <p className="text-xs text-slate-400 font-light">
                {t("Malaysia Sales Suite & Executive Galleries, Johor Bahru Ring Drive.", "马来西亚柔佛新山环城高速大道销售大厅暨贵宾尊品廊。")}
              </p>
              <div className="text-[10px] text-slate-500 font-mono lead-relaxed bg-[#111] p-3 border border-slate-800">
                {t("DISCLAIMER: All layout specifications, artist impressions, render artwork descriptions, and adjacent spacing dimensions are illustrative schematics representing potential options. Final allocations are governed by formal SPAs.", "免责声明：本网站及应用中所展示之所有户型结构图、艺术家手笔效果图、沙盘及文本描述均作为置业投资参考之用。一切具体物理指标与配置权利约束均以双方最终签署具有法律约束效力之正式销售买卖合约 (SPA) 条款为准。")}
              </div>
            </div>

          </div>

          <div className="border-t border-[#cca766]/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
            <span>{t("© 2026 Summer Suites Luxury Residency Core. All rights reserved.", "© 2026 云澜名邸(Summer Suites)置业投资产权中心。终身保留全部官方权利。")}</span>
            <span>{t("Created for Elite Multi-Access Commuters", "为往来跨境新马的高薪精英领袖领衔精装巨献")}</span>
          </div>
        </div>
      </footer>


      {/* --- GALLERY LIGHTBOX MODAL --- */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center text-white border-b border-[#cca766]/20 pb-4 relative z-50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-mono">{t("Architectural Art Showcase", "大师级实境设计美学图志")}</span>
              <h4 className="text-base font-bold tracking-wider uppercase mt-1">
                {facilityImages[selectedGalleryIndex]?.title}
              </h4>
            </div>
            <button 
              onClick={() => setSelectedGalleryImg(null)}
              className="p-2.5 bg-zinc-900 border border-zinc-800 text-[#cca766] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Image container */}
          <div className="relative flex-1 flex items-center justify-center p-2 max-h-[75vh]">
            <button 
              onClick={() => navigateGallery('prev')}
              className="absolute left-2 md:left-8 p-3 bg-zinc-900/85 border border-zinc-700/50 text-[#d4af37] hover:text-white transition-colors z-45"
            >
              ◀
            </button>
            <img 
              src={selectedGalleryImg} 
              alt="Expanded high-resolution artist view" 
              className="max-w-full max-h-full object-contain border border-[#cca766]/30 shadow-2xl" 
            />
            <button 
              onClick={() => navigateGallery('next')}
              className="absolute right-2 md:right-8 p-3 bg-zinc-900/85 border border-zinc-700/50 text-[#d4af37] hover:text-white transition-colors z-45"
            >
              ▶
            </button>
          </div>

          {/* Description Overlay */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto w-full text-center relative z-50">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              {t("Image ", "第 ")}{selectedGalleryIndex + 1}{t(" of ", " / ")}{facilityImages.length}{t(" • Summer Suites Private Portfolio Catalog", " 张图片 • 云澜名邸高定画册私人收藏专属")}
            </div>
          </div>
        </div>
      )}


      {/* --- BLUEPRINT EXPANDER LIGHTBOX --- */}
      {selectedPlanImg && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center text-white border-b border-[#cca766]/20 pb-4 relative z-50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-mono">{t("Schematic Dimension Blueprints", "精密比例户型测理蓝图")}</span>
              <h4 className="text-base font-bold tracking-wider uppercase mt-1">
                {selectedPlanImg.title}
              </h4>
            </div>
            <button 
              onClick={() => setSelectedPlanImg(null)}
              className="p-2.5 bg-zinc-900 border border-zinc-800 text-[#cca766] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-2">
            <img 
              src={selectedPlanImg.src} 
              alt={selectedPlanImg.title} 
              className="max-w-full max-h-[80vh] object-contain filter invert opacity-95 transition-all duration-300 bg-[#000] p-4 border border-[#d4af37]/45" 
            />
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-800 w-full text-center relative z-50">
            <p className="text-xs text-slate-400 font-light">
              {t("Press Escape or click the top-right button to exit fullscreen schematic. Actual layouts are optimized for ventilation, views, and sound dampening.", "键盘按下 Esc 或点击右上角按钮即可极速退出全屏。全幅核心比例建筑图由承建单位总工程办公室深度优化通透、视点范围及声学降噪指标。")}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
