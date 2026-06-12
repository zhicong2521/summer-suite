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

export default function App() {
  const [activeTab, setActiveTab] = useState<'typeC' | 'typeB' | 'typeA' | 'masterPlan'>('typeC');
  const [locationView, setLocationView] = useState<'map' | 'walk'>('map');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(-1);
  const [selectedPlanImg, setSelectedPlanImg] = useState<{title: string, src: string} | null>(null);
  
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

  const facilityImages = [
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14adacee7c3e558c74.png",
      title: "Infinity Pool View",
      desc: "Architectural impression of our world-class swimming deck with pristine skyline views."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14e650055aa2dd6d28.png",
      title: "Lobby & Water Features",
      desc: "Spacious luxury entrance lounge displaying tranquil fountain structures and golden highlights."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14c53e51acc0a88fbe.png",
      title: "Rooftop Sky Terrace",
      desc: "Bespoke modern gathering space combining private seating alcoves with rich botanical planters."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14c53e51acc0a88fc3.png",
      title: "Co-Working & Multi-Purpose Zone",
      desc: "Sleek glass partitions, designer light rigs, and fully integrated high-speed connectivity."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d14e650055aa2dd6d23.png",
      title: "The Sunset Club Deck",
      desc: "Sublime outdoor dining space featuring open firepits, wood tables, and direct dusk vista lines."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d328a3c98ce5631d577.png",
      title: "Wellness & Spa Oasis",
      desc: "Unwind in our thermal sauna rooms and specialized private hydrotherapy massage chambers."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d4816651db7bff730b6.png",
      title: "Double-Story Fitness Gym",
      desc: "Pro-athletic grade free-weights arena accompanied by a panoramic spin lounge."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d408a3c98ce5631d653.png",
      title: "Bento Garden Lounges",
      desc: "Symmetric Japanese-style zen gardens crafted for quiet reflection and morning yoga routines."
    },
    {
      src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0d4396783b1af56d630e.png",
      title: "The Royal BBQ Pavilion",
      desc: "Gourmet outdoor kitchens fitted with premium grills and comfortable family dining booths."
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
        <span>RTS Link Cross-Border Special Pricing Phase Active • Exquisite Freehold Residence</span>
        <span className="hidden md:inline border-l border-black/30 pl-2 ml-2">Book a Private Gallery Tour today</span>
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
              <a href="#location" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">Location</a>
              <a href="#facilities" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">Facilities</a>
              <a href="#comparison" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">Price Analysis</a>
              <a href="#smart" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">Smart Living</a>
              <a href="#layouts" className="text-sm font-medium tracking-widest text-slate-300 hover:text-[#d4af37] transition-colors uppercase">Layouts</a>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="#register-drawer" 
                className="bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#e8c87b] hover:from-[#d4af37] hover:to-[#fcf0b1] text-black px-6 py-3 rounded-none font-bold text-xs uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] tracking-widest hover:scale-[1.03]"
              >
                Register Interest
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 lg:pt-60 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/60 z-10"></div>
          {/* Subtle elegant lines reflecting the premium blueprint brochure cover */}
          <div className="absolute inset-0 opacity-20 z-15 style-lines" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0L1000 1000M500 0L0 800M1000 200L200 1000\' stroke=\'%23d4af37\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")' }}></div>
          <img 
            src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be00fb1ed4cacb3b44.webp" 
            alt="Summer Suites Luxury Tower Residency" 
            className="w-full h-full object-cover object-center opacity-40 grayscale-[25%] transform scale-105 duration-[12000ms] animate-pulse"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#111] backdrop-blur-md border border-[#cca766]/50 text-[#d4af37] font-semibold text-xs mb-8 shadow-[0_0_15px_rgba(212,175,55,0.15)] uppercase tracking-widest animate-bounce">
              <Award className="w-4 h-4 text-[#e8c87b]" />
              <span>Est. Completion June 2029 • Freehold Strategic Masterpiece</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tight">
              A Living Solution,<br/>
              <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#fcf0b1] drop-shadow-lg">
                Not Just A Space.
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl font-light">
              Elevate your investment strategy in Johor Bahru’s core. Strategically designed for daily Singapore commuters & high-yield investors seeking seamless integration with CIQ & next-gen RTS link.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mb-12 bg-black/60 p-6 border border-[#cca766]/10 backdrop-blur-sm">
              <div className="border-r border-[#cca766]/20 pr-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">RTS Link Connectivity</span>
                <span className="text-white font-bold text-lg">850m Dedicated Covered Walkway</span>
              </div>
              <div className="border-r border-[#cca766]/20 px-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Starting Price Tier</span>
                <span className="text-[#d4af37] font-extrabold text-lg">From RM 613,000+ Only</span>
              </div>
              <div className="px-4 last:border-0 last:pr-0">
                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Exclusive Value Advantage</span>
                <span className="text-white font-bold text-lg">Lowest PSF in Premium JB Ring</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#layouts" className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#e8c87b] hover:from-[#d4af37] hover:to-[#fcf0b1] text-black px-8 py-4 rounded-none font-bold text-sm tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.30)] uppercase">
                Explore Studio Layouts <ChevronRight className="w-5 h-5 text-black" />
              </a>
              <a href="#comparison" className="flex items-center justify-center gap-2 bg-[#0a0a0a]/90 hover:bg-[#111] backdrop-blur-md border border-[#cca766]/40 text-[#d4af37] px-8 py-4 rounded-none font-bold text-sm tracking-widest transition-all uppercase">
                Price PSF Comparison
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
              <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">Unrivaled Crossing Access</span>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">Your Direct Gateway to <span className="font-extrabold text-[#d4af37]">Singapore</span></h2>
              <p className="text-base text-slate-400 font-light leading-relaxed mb-6">
                Avoid daily heavy traffic blocks. Summer Suites offers an elegant climate-controlled covered walk option spanning a safe, direct path of only <strong className="text-white font-semibold">850 meters</strong> to JB-Singapore CIQ checkpoint and future rapid transit links.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#111] border-l-4 border-[#d4af37] rounded-none">
                  <div className="text-white font-bold text-sm mb-1 uppercase tracking-wide">6-Minute Direct Connection</div>
                  <p className="text-xs text-slate-400">RTS transit guarantees standard sub-40-minute commutes into Singapore's Woodlands North MRT interchange hub.</p>
                </div>
                <div className="p-4 bg-[#111] border-l-4 border-slate-500 rounded-none">
                  <div className="text-white font-bold text-sm mb-1 uppercase tracking-wide">Elite Freehold Status</div>
                  <p className="text-xs text-slate-400">Preserve supreme generational wealth. Stand exempt from lease renewals typical of city assets.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#111] border border-[#cca766]/35 p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-[#cca766]/15 pb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#d4af37] w-5 h-5 animate-pulse" />
                    <span className="text-white font-mono text-xs uppercase tracking-wider font-semibold">Location Navigation</span>
                  </div>
                  <div className="flex gap-1 bg-[#050505] p-1 border border-[#333]">
                    <button 
                      onClick={() => setLocationView('map')}
                      className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${locationView === 'map' ? 'bg-[#d4af37] text-black font-extrabold' : 'text-slate-400 hover:text-white'}`}
                    >
                      Google Map (Coordinates)
                    </button>
                    <button 
                      onClick={() => setLocationView('walk')}
                      className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${locationView === 'walk' ? 'bg-[#d4af37] text-black font-extrabold' : 'text-slate-400 hover:text-white'}`}
                    >
                      CIQ Connected Path
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
                        <span>*Artist visualization mapping safe commuter path</span>
                        <span className="text-[#e8c87b] underline cursor-pointer hover:text-white" onClick={() => setSelectedPlanImg({title: 'Walking Path Detail Map', src: 'https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c080b0b818c92b36803e4.png'})}>Expand View</span>
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
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">Level 10 Exclusive Sky Sanctum</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Resort-Crafted Wellness <span className="font-bold text-[#d4af37]">Facilities Zone</span></h2>
            <p className="text-lg text-slate-300 font-light">
              Summer Suites moves beyond normal residential features with 20 masterfully planned facilities curated on a single massive outdoor deck.
            </p>
          </div>

          {/* Large Facility Blueprint Layout View */}
          <div className="mb-20 bg-[#111]/80 border border-[#cca766]/30 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center backdrop-blur-[2px] pointer-events-none">
              <span className="text-[#d4af37] border-2 border-[#d4af37] px-6 py-3 uppercase text-xs font-bold tracking-widest bg-black/80 shadow-2xl">
                Open Full Level 10 Blueprint Structure
              </span>
              <p className="text-slate-300 text-xs mt-2 uppercase tracking-wider">Click anywhere to maximize architectural schematic details</p>
            </div>
            <div className="cursor-pointer" onClick={() => setSelectedPlanImg({title: "Level 10 Facilities Master Plan Blueprint", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png"})}>
              <img 
                src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png" 
                alt="Detailed level 10 amenities directory map" 
                className="w-full h-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <div className="bg-black/90 p-4 border-t border-[#333] flex flex-wrap justify-between items-center text-xs gap-2 font-mono">
              <span className="text-[#cca766]">⭐ Legend Highlights: Aqua Zone (Left), Co-Working Pavilion (Center Deck), Active Sports (Right Side Wing)</span>
              <button 
                onClick={() => setSelectedPlanImg({title: "Level 10 Facilities Master Plan Blueprint", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c0aecc5c622320628de9c.png"})}
                className="text-[#d4af37] hover:underline uppercase tracking-widest text-[10px] font-bold"
              >
                Inspect High-Res Directory
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 bg-gradient-to-b from-transparent to-[#111]/30 p-1">
            {/* Category 1 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Waves size={100} className="text-[#d4af37]" /></div>
              <Waves className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">Wellness & Aqua</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">12.</span> Jacuzzi Hideaways</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">13.</span> Half Olympic Pool</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">16.</span> Sunset Gymnasium</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">17.</span> Hydrotherapy Zone</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">18.</span> Private Steam Cabin</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Users size={100} className="text-[#d4af37]" /></div>
              <Users className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">Gathering & Social</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">07.</span> Chill Lounge</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">09.</span> Multi Purpose Hall</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">10.</span> Outdoor Terrace Garden</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">11.</span> Premium BBQ Grill Deck</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">15.</span> Sunken Pool Lounge</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Dumbbell size={100} className="text-[#d4af37]" /></div>
              <Dumbbell className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">Active & Play</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">05.</span> Acoustic Media Room</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">06.</span> Half Court Hoop Hub</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">08.</span> Virtual Sports WOW Cabin</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">14.</span> Safe Kids Splash Pool</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">19.</span> Adventure Playground</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="bg-[#0b0b0b] border border-[#cca766]/20 p-8 hover:border-[#d4af37] transition-all duration-[400ms] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] duration-500"><Coffee size={100} className="text-[#d4af37]" /></div>
              <Coffee className="w-8 h-8 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-semibold tracking-wide text-white mb-4 border-b border-[#cca766]/10 pb-3 uppercase text-sm">Convenience Core</h3>
              <ul className="space-y-3 font-light text-slate-400 text-sm">
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">01.</span> Resident Social Lobby</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">02.</span> 24H Autonomous AI Mart</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">03.</span> The Soap Bar Laundry</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">04.</span> Executive Study Nooks</li>
                <li className="flex items-center gap-3"><span className="text-[#d4af37] text-xs font-mono font-bold">20.</span> Learning & Meeting hub</li>
              </ul>
            </div>
          </div>

          {/* Interactive Artwork Swipe Gallery with Lightbox trigger */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="text-xs uppercase tracking-widest text-[#cca766] block">Architectural Renderings</span>
                <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">Luxury Private <span className="font-bold text-[#d4af37]">Gallery Preview</span></h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#cca766]">
                <ChevronRight className="w-5 h-5 text-[#d4af37] animate-pulse" />
                <span className="uppercase tracking-widest">Click any image below to zoom high-resolution view</span>
              </div>
            </div>

            {/* Gallery Horizon Scroll Container */}
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-[#111] [&::-webkit-scrollbar-track]:rounded-none [&::-webkit-scrollbar-thumb]:bg-[#cca766]/40 [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-[#d4af37] transition-all">
              {facilityImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => openGalleryImg(idx)}
                  className="flex-none w-[80vw] sm:w-[50vw] md:w-[380px] snap-center bg-[#111] border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-500 cursor-zoom-in relative group overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-5 relative z-20">
                    <div className="w-8 h-0.5 bg-[#d4af37] mb-2 group-hover:w-16 transition-all duration-300"></div>
                    <h4 className="text-white text-base font-bold tracking-wide uppercase">{img.title}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 font-light leading-relaxed">{img.desc}</p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-[#cca766] font-mono uppercase tracking-wider">
                      <span>Exclusive Preview</span>
                      <span className="group-hover:text-white transition-colors flex items-center gap-1">Zoom View <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Unique Smart Living Ecosystem */}
      <section id="smart" className="py-28 bg-[#0a0a0a] border-t border-[#cca766]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">High-Tech Safety & Utility</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Zero-Friction <span className="font-bold text-[#d4af37]">Smart Ecosystem</span></h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Summer Suites replaces antiquated, error-prone analog systems with a synchronized touchless ecosystem to simplify security for both landlords and commuters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <ShieldCheck className="w-6 h-6 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">6-Way Smart Door Lock</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Unlock instantly via fingerprint recognition, private app triggers, temporary digital cards, or backup manual codes. Built-in low voltage sensors.
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Smartphone className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Touch-Hold Resident SOS</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Custom application features integrated emergency hold triggers directly to the 24-hour guard concierge station with continuous tracking backup.
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Car className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Facial & Plate Gate Sync</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Facial scans authenticate foot traffic in private lift vestibules, while automated license read-cameras control secure multi-tier parking basements.
              </p>
            </div>

            {/* Feature card */}
            <div className="bg-[#111] p-8 border border-[#cca766]/15 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Wifi className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Acoustic Sound Windows</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Double-glazed window structures dampen high-frequency urban traffic noise, paired with luxury Siemens switches.
              </p>
            </div>

            {/* Feature card full width */}
            <div className="bg-gradient-to-r from-[#111] to-[#1a1711] p-8 border border-[#cca766]/25 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group md:col-span-2 relative">
              <div className="w-12 h-12 bg-black flex items-center justify-center border border-[#cca766]/30 mb-8 group-hover:border-[#d4af37]">
                <Trash2 className="w-10 h-10 text-[#cca766] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-3">
                <span>STREAM Automated Vacuum Waste Disposal</span>
                <span className="text-[10px] bg-[#d4af37] text-black font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest">ECO Elite</span>
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed max-w-4xl">
                Ditch the unhygienic standard trash chutes that leak odors. Our fully sealed STREAM system vacuums physical waste directly from private collection docks at supersonic air speeds, protecting the block from odor, mold, and airborne germs.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#cca766] font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>Eliminates garbage truck noise emissions & odors in common corridors</span>
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
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">High-Value ROI Assessment</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Johor Bahru Core <span className="font-bold text-[#d4af37]">Value Mastermind</span></h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Why pay inflated prices? Save up to RM 200,000+ while unlocking double-digit potential rentals.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive PSF Chart */}
            <div className="lg:col-span-6 bg-black/90 p-6 sm:p-10 border border-[#cca766]/35 rounded-none relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-[#cca766]/20 pb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="text-[#d4af37] w-5 h-5" /> Average Price Per Sq.Ft (PSF) Comparison
                </h3>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">JB Ring Core</span>
              </div>

              <div className="space-y-6">
                {/* Competitor 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">R&F Princess Cove</span>
                    <span className="text-slate-400">RM 1,600 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-600 h-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Competitor 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">Sky One Residency</span>
                    <span className="text-slate-400">RM 1,300 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-500 h-full transition-all duration-1000" style={{ width: '81.25%' }}></div>
                  </div>
                </div>

                {/* Competitor 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">Exsim Landmark CIQ</span>
                    <span className="text-slate-400">~RM 1,150 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-400 h-full transition-all duration-1000" style={{ width: '71.8%' }}></div>
                  </div>
                </div>

                {/* Competitor 4 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">Gen Sphere Residences</span>
                    <span className="text-slate-400">RM 1,050 /sqft</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-3.5 border border-[#333]">
                    <div className="bg-slate-300 h-full transition-all duration-1000" style={{ width: '65.62%' }}></div>
                  </div>
                </div>

                <div className="my-6 border-t border-[#d4af37]/15 border-dashed"></div>

                {/* Summer Suites */}
                <div className="bg-[#111] p-4 border border-[#d4af37]/35 relative shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-[#d4af37]/5 blur-lg"></div>
                  <div className="relative">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Summer Suites Promo Tier</span>
                      <span className="text-[#fcf0b1] font-mono text-xl font-extrabold">RM 800-900 /sqft</span>
                    </div>
                    <div className="w-full bg-black h-5 border border-[#d4af37]/45">
                      <div className="bg-gradient-to-r from-[#8a6829] via-[#d4af37] to-[#fcf0b1] h-full shadow-[0_0_15px_rgba(212,175,55,0.4)] relative" style={{ width: '53.1%' }}>
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 skew-x-12"></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">
                      *Save ~RM 200,000+ compared directly with surrounding projects for same unit footages.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Description Side */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-[#050505] p-6 border-l-4 border-[#d4af37]">
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Buy Smarter, Save Capital upfront</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  For standard investments of approximately <strong className="text-white">RM 600,000</strong>, competitors only offer tiny, cramped 1-bedroom footprints. At Summer Suites, that exact same capital secures a luxury <strong className="text-[#d4af37] font-semibold">599 sq.ft. DUAL STUDIO</strong> where you can rent out two independent keys simultaneously to dual white-collar tenants commuting to Singapore.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/40 p-5 border border-[#cca766]/15 hover:border-[#d4af37]/40 duration-300">
                  <div className="text-[#d4af37] font-bold text-xl mb-1">RM 800+ PSF</div>
                  <span className="text-xs uppercase tracking-widest block text-slate-400 mb-2 font-mono">Starting Price Rate</span>
                  <p className="text-xs text-slate-400">Deep layout spaces with luxurious fittings starting at rates lowest in premium vicinity zones.</p>
                </div>

                <div className="bg-black/40 p-5 border border-[#cca766]/15 hover:border-[#d4af37]/40 duration-300">
                  <div className="text-white font-bold text-xl mb-1">Dual Key Optimized</div>
                  <span className="text-xs uppercase tracking-widest block text-[#cca766] mb-2 font-mono">Maximum Capital Yield</span>
                  <p className="text-xs text-slate-400">Maximize ROI potential. Double individual rental income sources within a single property title deed.</p>
                </div>
              </div>

              {/* Explainer Box */}
              <div className="p-6 bg-black border border-[#d4af37]/25 rounded-none shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex gap-4 items-start">
                  <div className="p-2.5 bg-[#111] border border-[#d4af37]/45 text-[#d4af37] flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[#e8c87b] font-medium mb-1 tracking-wider text-sm uppercase">Is PSF a Critical Metric?</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Yes. PSF (Price Per Square Foot) directly defines your entry price arbitrage. Securing a low PSF in a high-demand commuter neighborhood like CIQ maximizes capitalization yield and buffers you safely from downward market fluctuations.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Exclusive Early-Bird Packages Overview */}
      <section className="py-28 bg-[#050505] relative overflow-hidden border-y border-[#cca766]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d190f] via-[#050505] to-[#050505] opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">Early-Bird Capital Assistance</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Exclusive High-Value <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b58b38] to-[#fcf0b1]">Early-Bird Incentives</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base font-light">
              Decrease your capital requirements to a minimum with low upfront fees. Move-in or begin renting immediately with luxury partial furnishing and fully absorbed legal costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Furnishing Card */}
            <div className="bg-[#0a0a0a] border border-[#cca766]/30 p-8 sm:p-12 hover:border-[#d4af37] transition-all duration-500 group relative shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 blur-lg"></div>
              
              <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
                <div className="w-14 h-14 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Premium Partial</h3>
                  <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase">Furnishing Package</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Digital Door Lock Set (Highly Secure Multi-Access Model)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> High-Efficiency Aircon systems pre-installed (2-4 Units based on layout size)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Instant Heating Water Reservoirs (2 or 3 Units premium spec)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Professional Kitchen Cooking Hob & Hood exhaust extractor
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Built-In Elegant Master Kitchen Cabinets (Length ranges 6 to 8 feet)
                  </span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-[#cca766]/10 text-xs text-slate-500 font-mono tracking-wider text-right">
                *Pre-arranged directly with development builders
              </div>
            </div>

            {/* Legal / Absorption Card */}
            <div className="bg-[#0a0a0a] border border-[#cca766]/30 p-8 sm:p-12 hover:border-[#d4af37] transition-all duration-500 group relative shadow-2xl">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#d4af37]/5 blur-lg"></div>

              <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
                <div className="w-14 h-14 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                  <FileSignature className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Low Upfront Fee</h3>
                  <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase">Legal Absorption</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Legal Fee on SPA (Sale and Purchase Agreement legalities absorbed)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Legal Fee on Loan Agreements (Fully offset by development fund)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-light">
                    <strong className="text-white font-semibold">FREE</strong> Stamp Duty Fees on Loan Documentation
                  </span>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-[#111] border border-[#d4af37]/35 text-center shadow-inner">
                <span className="text-[#cca766] font-mono text-xs tracking-widest uppercase block mb-1">Instant Purchaser Savings Value</span>
                <span className="text-white text-base font-bold">Estimated Savings: RM 24,000 to RM 38,000+</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Smart-Plan Room Layout Showcase */}
      <section id="layouts" className="py-28 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">High-Value Floor Plans</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Designed to Accommodate <span className="font-bold text-[#d4af37]">Every Investor</span></h2>
            <p className="text-lg text-slate-300 font-light">
              Toggle beneath our three primary configurations to explore deep spaces, private entries, and dual income arrangements.
            </p>
          </div>

          {/* Interactive Sharp-Corner Custom Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              onClick={() => setActiveTab('typeC')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeC' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              Type C (599 SQFT • Dual Studio)
            </button>
            <button 
              onClick={() => setActiveTab('typeB')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeB' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              Type B (808 SQFT • 2+1 Bed)
            </button>
            <button 
              onClick={() => setActiveTab('typeA')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'typeA' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              Type A (912 SQFT • Dual Key)
            </button>
            <button 
              onClick={() => setActiveTab('masterPlan')}
              className={`px-6 py-4 text-xs tracking-widest font-bold uppercase transition-all border ${activeTab === 'masterPlan' ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#111] text-slate-400 hover:text-[#d4af37] border-[#222]'}`}
            >
              Master Floor Map
            </button>
          </div>

          {/* Interactive Layout Render Box with click-to-zoom triggers */}
          <div className="bg-[#0a0a0a] border border-[#cca766]/35 p-6 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]"></div>
            
            {activeTab === 'typeC' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    Commuter Hotspot Layout
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">Type C <span className="font-extrabold text-[#d4af37]">- Dual Studio</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>599 Sq.Ft (55.6 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">Starting RM 613,000+</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 flex justify-between items-center bg-[#111] px-4 py-3 border border-[#cca766]/20">
                    <span className="text-slate-400">Estimated Management Fee (RM 0.40/sq.ft):</span>
                    <span className="text-[#d4af37] font-bold">RM 239.60/month</span>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    Specifically suited for professional rental generation. Features two independently lockable suites under a unified title deed. Rent both suites split or live in one with perfect privacy while a tenant pays off your mortgage installment.
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>2 Independent, Secure Bedroom Suites</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>2 En-Suite Premium Private Showers</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Dual Air-Conditioning & Kitchen Utility Hookups</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Double Digital Key Access Preconfigured</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      Request Full Spec Brochure
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: "Type C Floor Plan - Dual Studio (599 sqft)", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be08984b712927d36b.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      Expand Detailed Blueprint View
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be08984b712927d36b.jpg" 
                    alt="Type C Floor Plan Schematic Layout" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    *Artist Floor Impression. Inverted color blueprint.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typeB' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    Perfect Spacing Option
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">Type B <span className="font-extrabold text-[#d4af37]">- 2+1 Standard</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>808 Sq.Ft (75.1 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">Starting RM 725,000+</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 flex justify-between items-center bg-[#111] px-4 py-3 border border-[#cca766]/20">
                    <span className="text-slate-400">Estimated Management Fee (RM 0.40/sq.ft):</span>
                    <span className="text-[#d4af37] font-bold">RM 323.20/month</span>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    The premium multi-bedroom standard. Generously sized layout to accommodate growing commuter families. Features a flexible layout pocket study room configured with floor wiring ready for conversion to custom video studio or corporate home office space.
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>2 Master Suite Bedrooms + Multi-Utility Study Pocket</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>2 Luxury Modern Bathrooms with preconfigured water heaters</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Symmetric Central Dining Arena & Glass Patio Connection</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Generous Double Parking Lot assignment option</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      Request Full Spec Brochure
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: "Type B Floor Plan - 2+1 Bed Standard (808 sqft)", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bec5ead5f775c286dc.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      Expand Detailed Blueprint View
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bec5ead5f775c286dc.jpg" 
                    alt="Type B Floor Plan Blueprint" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    *Artist Floor Impression. Inverted color blueprint.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typeA' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#111] text-[#d4af37] border border-[#cca766]/35 font-semibold tracking-widest text-[10px] mb-6 uppercase">
                    Supreme Luxury Suite
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light text-white mb-2 uppercase">Type A <span className="font-extrabold text-[#d4af37]">- Dual Key Signature</span></h3>
                  <div className="text-xl font-mono text-slate-400 mb-2 border-b border-slate-800 pb-4 flex justify-between items-baseline">
                    <span>912 Sq.Ft (84.7 M²)</span>
                    <span className="text-[#e8c87b] font-bold text-sm">Starting RM 902,000+</span>
                  </div>
                  <div className="text-slate-300 font-mono text-xs mb-6 flex justify-between items-center bg-[#111] px-4 py-3 border border-[#cca766]/20">
                    <span className="text-slate-400">Estimated Management Fee (RM 0.40/sq.ft):</span>
                    <span className="text-[#d4af37] font-bold">RM 364.80/month</span>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    The absolute flagship of Summer Suites. Seamless double-entry structure provides a complete primary 2-Bedroom unit paired with an adjoining fully equipped private 1-bed efficiency studio. Maximum investment flexibility config.
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Adjoining but private separate entrance foyers</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>3 Complete Master Bedrooms & 3 Luxury Baths</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Generous multi-balcony skyline perspective</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="text-[#cca766] w-5 h-5 flex-shrink-0" />
                      <span>Includes premium SIEMENS switches and layout upgrades</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <a href="#register-drawer" className="bg-[#d4af37] hover:bg-[#e8c87b] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors inline-block">
                      Request Full Spec Brochure
                    </a>
                  </div>
                </div>

                <div 
                  className="bg-[#111] aspect-square flex flex-col items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: "Type A Floor Plan - Dual Key Flagship (912 sqft)", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be64042ec872de7cca.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-5 py-2.5 uppercase font-bold text-xs tracking-widest bg-black/80">
                      Expand Detailed Blueprint View
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00be64042ec872de7cca.jpg" 
                    alt="Type A Dual Key Floor Plan Blueprint" 
                    className="w-full h-full object-contain filter invert opacity-90 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 font-mono">
                    *Artist Floor Impression. Inverted color blueprint.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'masterPlan' && (
              <div className="flex flex-col items-center">
                <div className="text-center mb-10 max-w-2xl">
                  <span className="text-xs uppercase tracking-widest text-[#cca766] font-mono block mb-2">Dynamic Tower Arrangement</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white uppercase">Overall Site Layout & <span className="font-bold text-[#d4af37]">Master Plan</span></h3>
                  <p className="text-sm text-slate-400 font-light mt-3">
                    View unit facing coordinates, wind vector entry points, surrounding botanical visual corridors, and high-tech parking entrances.
                  </p>
                </div>
                
                <div 
                  className="bg-[#111] w-full flex items-center justify-center border border-[#cca766]/20 overflow-hidden p-6 group cursor-zoom-in relative"
                  onClick={() => setSelectedPlanImg({title: "Summer Suites Master Floor Plan Layout", src: "https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bee5084c4b71a68eba.jpg"})}
                >
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm animate-fade-in">
                    <span className="text-[#d4af37] border-2 border-[#d4af37] px-6 py-3 uppercase font-bold text-xs tracking-widest bg-black/80">
                      Inspect Master Layout Schematic
                    </span>
                  </div>
                  <img 
                    src="https://assets.cdn.filesafe.space/M6pV5u7evfLDPcD2VL5K/media/6a2c00bee5084c4b71a68eba.jpg" 
                    alt="Master site plan blueprint mapping layout blocks" 
                    className="w-full max-h-[500px] object-contain opacity-90 transition-all duration-700 group-hover:scale-[1.02]" 
                  />
                </div>
                
                <div className="flex justify-between w-full mt-4 text-xs font-mono text-slate-500">
                  <span>*Tower orientation optimized for thermal cooling</span>
                  <span className="text-[#d4af37]">Orientation: Facing North-East Towards Straits View</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>



      {/* VIP Registry & Appointment Book Option */}
      <section id="register-drawer" className="py-28 bg-[#050505] border-t border-[#cca766]/20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#050505]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid md:grid-cols-12 gap-12 items-start">
            
            <div className="md:col-span-5 space-y-6">
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="text-[#cca766] uppercase text-xs font-mono tracking-widest block mb-1">VIP Priority Lounge</span>
                <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">Secure High Value <span className="font-bold text-[#d4af37]">Early Bird Allocation</span></h3>
              </div>
              
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Submit this official register request. Booking an appointment generates an interactive profile reservation, letting you bypass showroom waiting pipelines and receive direct developer discounts.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-[#d4af37] w-4.5 h-4.5" />
                  <span>Free VIP Priority Parking at Private Gallery</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-[#d4af37] w-4.5 h-4.5" />
                  <span>Interactive VR layout model headset walkthrough</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-[#d4af37] w-4.5 h-4.5" />
                  <span>Print physical copy of Summer Suites Brochure</span>
                </div>
              </div>

              {/* Saved Appointments Counter */}
              {savedAppointments.length > 0 && (
                <div className="mt-8 p-5 bg-[#111] border border-[#d4af37]/30 text-xs">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#d4af37] font-bold uppercase tracking-wider font-mono">Your Saved Bookings ({savedAppointments.length})</span>
                    <button onClick={() => setShowAppointments(!showAppointments)} className="text-slate-300 underline font-mono">
                      {showAppointments ? "Hide Lists" : "Inspect Lists"}
                    </button>
                  </div>
                  
                  {showAppointments && (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 divide-y divide-slate-800">
                      {savedAppointments.map((app) => (
                        <div key={app.id} className="pt-2 text-slate-400">
                          <p className="font-semibold text-white">{app.name} - Interest {app.layout.toUpperCase()}</p>
                          <p className="text-[10px]">{app.timestamp}</p>
                          <p className="text-[10px] mt-1 text-[#cca766]">{app.phone} | {app.email}</p>
                        </div>
                      ))}
                      <div className="pt-3">
                        <button 
                          onClick={clearAppointments} 
                          className="text-red-400 hover:text-red-300 uppercase font-bold text-[9px] tracking-widest font-mono"
                        >
                          Clear Reservation Logs
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-black border border-[#cca766]/35 p-6 sm:p-10 relative">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-wider">Appointment Confirmed!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you <strong className="text-white">{bookingName}</strong>. Our high-value developer sales concierge has allocated your exclusive queue slot. A dedicated agent will contact you on <strong className="text-[#d4af37]">{bookingPhone}</strong> within 3 business hours.
                  </p>
                  
                  <div className="bg-[#111] p-5 max-w-sm mx-auto border border-[#cca766]/30 text-left text-xs font-mono">
                    <div className="text-center font-bold text-[#cca766] uppercase mb-2">Private Pass Ticket</div>
                    <div className="space-y-1 text-slate-400">
                      <p><span className="text-slate-500 text-[10px] uppercase block">Assigned VIP</span> {bookingName}</p>
                      <p><span className="text-slate-500 text-[10px] uppercase block">Tier Class</span> Early-Bird SPA Absorbed Package</p>
                      <p><span className="text-slate-500 text-[10px] uppercase block">Selected Unit Config</span> Type {selectedLayout.toUpperCase()}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#cca766] underline font-mono hover:text-[#d4af37] uppercase tracking-widest block mx-auto"
                  >
                    Edit Registration Info / Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="text-center sm:text-left mb-6">
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider">Book Private Showroom Entry</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fields indicated with * must be verified prior to slot lock</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono uppercase block">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Darren Chen"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-black border border-[#cca766]/30 text-white p-3 font-light text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-mono uppercase block">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. darren@gmail.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full bg-black border border-[#cca766]/30 text-white p-3 font-light text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-mono uppercase block">Contact Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +65 9123 4567"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full bg-black border border-[#cca766]/30 text-white p-3 font-light text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono uppercase block">Layout Option Interest</label>
                    <select 
                      value={selectedLayout}
                      onChange={(e) => setSelectedLayout(e.target.value)}
                      className="w-full bg-black border border-[#cca766]/30 text-[#e8c87b] p-3 font-mono text-xs focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="typeC">Type C (599 SQFT • Dual Studio Arrangement)</option>
                      <option value="typeB">Type B (808 SQFT • 2+1 Comfort Bedroom)</option>
                      <option value="typeA">Type A (912 SQFT • Adjoining Dual Key Flagship)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono uppercase block">Custom Special Arrangements / Instructions</label>
                    <textarea 
                      placeholder="Specify if requiring custom wheelchair access, corporate bulk unit financing, or special language assistance."
                      value={bookingMessage}
                      rows={3}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      className="w-full bg-black border border-[#cca766]/30 text-white p-3 font-light text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#b58b38] via-[#d4af37] to-[#e8c87b] hover:from-[#d4af37] hover:to-[#fcf0b1] text-black font-bold uppercase tracking-widest text-xs py-4 transition-all"
                  >
                    Lock Priority Registry Ticket
                  </button>

                  <div className="text-[10px] text-slate-500 font-mono text-center">
                    🔒 By registering you consent to receive direct priority communication regarding secure sales opportunities. No spam.
                  </div>
                </form>
              )}

            </div>

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
                  <span className="text-[0.95rem] font-bold tracking-[0.2em] text-[#d4af37] leading-none uppercase">Summer</span>
                  <span className="text-[0.95rem] font-light tracking-[0.25em] text-[#e8c87b] leading-none uppercase mt-0.5">Suites</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                A premium freehold luxury development showcasing elite studio and residency configurations in Johor Bahru. Optimized for border commuters & portfolio maximization.
              </p>
            </div>

            {/* Quick Jumps */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Resident Links</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="#location" className="hover:text-[#d4af37] duration-300">Location and Connectivity Map</a></li>
                <li><a href="#facilities" className="hover:text-[#d4af37] duration-300">Level 10 Resort Deck</a></li>
                <li><a href="#comparison" className="hover:text-[#d4af37] duration-300">PSF Price Value Matrix</a></li>
                <li><a href="#layouts" className="hover:text-[#d4af37] duration-300">Floor Blueprint Options</a></li>
              </ul>
            </div>

            {/* Core Specs */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Explanations</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><span className="text-slate-400 font-medium">Freehold Status:</span> Generation wealth preservation</li>
                <li><span className="text-slate-400 font-medium">RTS Crossing:</span> Rapid 6-Minute Shuttle to woodlands</li>
                <li><span className="text-slate-400 font-medium">Auto-STREAM System:</span> Touchless vacuum ecological waste system</li>
              </ul>
            </div>

            {/* Disclaimer and Sales Office */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Developer Sales Office</h4>
              <p className="text-xs text-slate-400 font-light">
                Malaysia Sales Suite & Executive Galleries, Johor Bahru Ring Drive.
              </p>
              <div className="text-[10px] text-slate-500 font-mono lead-relaxed bg-[#111] p-3 border border-slate-800">
                DISCLAIMER: All layout specifications, artist impressions, render artwork descriptions, and adjacent spacing dimensions are illustrative schematics representing potential options. Final allocations are governed by formal SPAs.
              </div>
            </div>

          </div>

          <div className="border-t border-[#cca766]/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
            <span>© 2026 Summer Suites Luxury Residency Core. All rights reserved.</span>
            <span>Created for Elite Multi-Access Commuters</span>
          </div>
        </div>
      </footer>


      {/* --- GALLERY LIGHTBOX MODAL --- */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center text-white border-b border-[#cca766]/20 pb-4 relative z-50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-mono">Architectural Art Showcase</span>
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
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {facilityImages[selectedGalleryIndex]?.desc}
            </p>
            <div className="mt-2 text-[10px] text-slate-500 font-mono uppercase">
              Image {selectedGalleryIndex + 1} of {facilityImages.length} • Summer Suites Private Portfolio Catalog
            </div>
          </div>
        </div>
      )}


      {/* --- BLUEPRINT EXPANDER LIGHTBOX --- */}
      {selectedPlanImg && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center text-white border-b border-[#cca766]/20 pb-4 relative z-50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-mono">Schematic Dimension Blueprints</span>
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
              Press Escape or click the top-right button to exit fullscreen schematic. Actual layouts are optimized for ventilation, views, and sound dampening.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
