// src/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Sparkles, ArrowRight, Brain, Target,
  Shield, TrendingUp, Users, GraduationCap, Calculator, BookOpen,
  Award, Gamepad2, CheckCircle2, Trophy, Compass, Mail, Phone,
  MapPin, Facebook, Twitter, Linkedin, Youtube, Rocket, Star
} from "lucide-react";

const colors = {
  dark: {
    cyan: "#00E5FF",
    purple: "#7C4DFF",
    blue: "#3B82F6",
    green: "#10B981",
    orange: "#F97316",
    pink: "#E91E63",
    bg: "#0A0F1E",
    card: "#1A1F2E",
    text: "#FFFFFF",
    textSecondary: "#9CA3AF"
  },
  light: {
    cyan: "#00E5FF",
    purple: "#7C4DFF",
    blue: "#3B82F6",
    green: "#10B981",
    orange: "#F97316",
    pink: "#E91E63",
    bg: "#FFFFFF",
    card: "#F8FAFC",
    text: "#0F172A",
    textSecondary: "#475569"
  }
};

const carouselSlides = [
  {
    title: "Actuarial Training Hub",
    subtitle: "Comprehensive training modules for insurance professionals",
    highlight: "Professional Training",
    cta: "Start Free Today",
    ctaSecondary: "Watch Demo",
    statsTitle: "Join 500+ Actuaries",
    statsSubtitle: "Learning Together",
    stat1: "17+", stat1Label: "Modules",
    stat2: "120h", stat2Label: "Content",
    successRate: "98% Success Rate"
  },
  {
    title: "IFRS 17 Training Hub",
    subtitle: "Master the new insurance accounting standard",
    highlight: "Industry Standard",
    cta: "Get Started Free",
    ctaSecondary: "Learn More",
    statsTitle: "Join 300+ Professionals",
    statsSubtitle: "Mastering IFRS 17",
    stat1: "25+", stat1Label: "Lessons",
    stat2: "80h", stat2Label: "Content",
    successRate: "95% Pass Rate"
  },
  {
    title: "Actuarial Valuation Tools",
    subtitle: "Professional models for risk adjustment and LRC calculations",
    highlight: "50+ Tools Available",
    cta: "Sign Up Free",
    ctaSecondary: "See Tools",
    statsTitle: "Used by 400+ Teams",
    statsSubtitle: "Daily Calculations",
    stat1: "50+", stat1Label: "Tools",
    stat2: "1000+", stat2Label: "Users",
    successRate: "99% Accuracy"
  },
  {
    title: "Qualification Pathways",
    subtitle: "Your complete guide to actuarial professional exams",
    highlight: "Career Growth",
    cta: "Join Now - It's Free",
    ctaSecondary: "View Pathways",
    statsTitle: "Guide 600+ Students",
    statsSubtitle: "To Success",
    stat1: "15+", stat1Label: "Exams",
    stat2: "200h", stat2Label: "Prep",
    successRate: "92% Pass Rate"
  },
  {
    title: "IFRS 17 Game",
    subtitle: "Test your knowledge and compete on the leaderboard",
    highlight: "Gamified Learning",
    cta: "Create Free Account",
    ctaSecondary: "How It Works",
    statsTitle: "Join 250+ Players",
    statsSubtitle: "Competing Daily",
    stat1: "100+", stat1Label: "Questions",
    stat2: "Top 50", stat2Label: "Ranking",
    successRate: "85% Completion"
  }
];

function useCountUp(end, duration = 2000, shouldStart) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime, animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);
  return count;
}

export default function LandingPage({ theme = 'dark' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  const userCount = useCountUp(1500, 2000, statsVisible);
  const moduleCount = useCountUp(17, 2000, statsVisible);
  const toolCount = useCountUp(50, 2000, statsVisible);
  const successRate = useCountUp(95, 2000, statsVisible);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  const currentSlideData = carouselSlides[currentSlide];

  const handleSignUp = () => navigate('/auth?mode=signup');

  const getGradient = (slideIndex) => {
    const gradients = {
      dark: [
        `linear-gradient(135deg, ${colors.dark.blue} 0%, ${colors.dark.cyan} 50%, ${colors.dark.purple} 100%)`,
        `linear-gradient(135deg, ${colors.dark.purple} 0%, #9D4EDD 50%, ${colors.dark.blue} 100%)`,
        `linear-gradient(135deg, ${colors.dark.green} 0%, #48C774 50%, ${colors.dark.blue} 100%)`,
        `linear-gradient(135deg, ${colors.dark.orange} 0%, #FF8C42 50%, ${colors.dark.purple} 100%)`,
        `linear-gradient(135deg, ${colors.dark.pink} 0%, ${colors.dark.purple} 50%, ${colors.dark.blue} 100%)`
      ],
      light: [
        `linear-gradient(135deg, ${colors.light.blue} 0%, ${colors.light.cyan} 50%, ${colors.light.purple} 100%)`,
        `linear-gradient(135deg, ${colors.light.purple} 0%, #9D4EDD 50%, ${colors.light.blue} 100%)`,
        `linear-gradient(135deg, ${colors.light.green} 0%, #48C774 50%, ${colors.light.blue} 100%)`,
        `linear-gradient(135deg, ${colors.light.orange} 0%, #FF8C42 50%, ${colors.light.purple} 100%)`,
        `linear-gradient(135deg, ${colors.light.pink} 0%, ${colors.light.purple} 50%, ${colors.light.blue} 100%)`
      ]
    };
    return gradients[theme][slideIndex];
  };

  return (
    <div className="min-h-screen overflow-hidden transition-colors duration-300" style={{ background: currentColors.bg }}>
      {/* HERO CAROUSEL */}
      <div className="relative">
        <div className="relative h-[650px] md:h-[750px] overflow-hidden">
          {carouselSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === i ? 'opacity-100 translate-x-0'
                  : i < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
              }`}
              style={{ background: getGradient(i) }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: theme === 'dark' ? colors.dark.cyan : 'white' }} />
                <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: theme === 'dark' ? colors.dark.purple : 'white' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'white' }} />
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  opacity: 0.3
                }} />
              </div>

              <div className="relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center" style={{ paddingTop: '72px' }}>
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                  <div className="z-10" style={{ color: theme === 'dark' ? 'white' : '#1A1F2E' }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                      style={{ 
                        background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)', 
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
                      }}>
                      <Sparkles className="w-4 h-4" style={{ color: currentColors.cyan }} />
                      <span className="text-sm font-semibold">{slide.highlight}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-lg" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>{slide.subtitle}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleSignUp}
                        className="px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl"
                        style={{ 
                          background: currentColors.cyan, 
                          boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                          color: theme === 'dark' ? '#1A1F2E' : 'white'
                        }}
                      >
                        <Rocket className="w-5 h-5" />
                        {slide.cta}
                      </button>
                      <button
                        className="px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105"
                        style={{ 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)', 
                          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                          color: theme === 'dark' ? 'white' : currentColors.text
                        }}
                      >
                        {slide.ctaSecondary}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'].map((c, j) => (
                          <div key={j} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'white' }} />
                        ))}
                      </div>
                      <div className="text-sm" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                        <span className="font-bold" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>1,500+</span> professionals already learning
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex justify-end">
                    <div className="relative">
                      <div className="w-[400px] h-[300px] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                        style={{ 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)', 
                          backdropFilter: 'blur(20px)', 
                          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)'}` 
                        }}>
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                          <div className="flex -space-x-4 mb-6">
                            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((c, j) => (
                              <div key={j} className="w-14 h-14 rounded-full flex items-center justify-center font-bold" 
                                style={{ 
                                  background: c, 
                                  border: `4px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                  color: 'white'
                                }}>
                                {String.fromCharCode(65 + j)}
                              </div>
                            ))}
                          </div>
                          <p className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : currentColors.text }}>{currentSlideData.statsTitle}</p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : currentColors.textSecondary }}>{currentSlideData.statsSubtitle}</p>
                          <div className="flex gap-4 mt-6">
                            <div className="px-4 py-2 rounded-lg" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)' }}>
                              <div className="text-2xl font-black" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>{currentSlideData.stat1}</div>
                              <div className="text-xs" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : currentColors.textSecondary }}>{currentSlideData.stat1Label}</div>
                            </div>
                            <div className="px-4 py-2 rounded-lg" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)' }}>
                              <div className="text-2xl font-black" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>{currentSlideData.stat2}</div>
                              <div className="text-xs" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : currentColors.textSecondary }}>{currentSlideData.stat2Label}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl shadow-xl animate-bounce" style={{ background: currentColors.cyan }}>
                        <span className="font-bold text-sm" style={{ color: theme === 'dark' ? '#1A1F2E' : 'white' }}>🎓 100% Free to Start!</span>
                      </div>
                      <div className="absolute -bottom-4 -right-4 px-6 py-3 rounded-xl shadow-xl" style={{ 
                        background: theme === 'dark' ? currentColors.card : 'white', 
                        border: `1px solid ${theme === 'dark' ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0,0,0,0.1)'}`
                      }}>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" style={{ color: currentColors.cyan }} />
                          <span className="font-bold" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>{currentSlideData.successRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`h-3 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10' : 'w-3'}`}
                style={{ 
                  background: currentSlide === i 
                    ? (theme === 'dark' ? 'white' : currentColors.cyan)
                    : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'),
                  boxShadow: currentSlide === i ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* PLATFORM OVERVIEW */}
      <section id="features" className="py-20 px-4 lg:px-8 transition-colors duration-300" 
        style={{ background: theme === 'dark' ? `linear-gradient(180deg, ${currentColors.card} 0%, ${currentColors.bg} 100%)` : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" 
              style={{ background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              All Your Actuarial Needs in One Platform
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: currentColors.textSecondary }}>From training to tools, from exams to games - everything you need to excel in actuarial science</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <GraduationCap className="w-8 h-8" />, title: "Actuarial Training Hub", desc: "17+ comprehensive modules covering everything from data cleanup to IAS 19 valuation", features: ["Structured learning paths", "Real-world case studies", "Progress tracking"], color: currentColors.cyan },
              { icon: <BookOpen className="w-8 h-8" />, title: "IFRS 17 Training Hub", desc: "Dedicated platform for mastering the new insurance accounting standard", features: ["25+ detailed lessons", "Interactive examples", "Certification prep"], color: currentColors.purple },
              { icon: <Calculator className="w-8 h-8" />, title: "Valuation Tools", desc: "Professional-grade models for risk adjustment, LRC, and liability calculations", features: ["50+ actuarial tools", "Excel integration", "Instant calculations"], color: currentColors.green },
              { icon: <Award className="w-8 h-8" />, title: "Qualification Pathways", desc: "Complete roadmap for actuarial professional exams and certifications", features: ["15+ exam guides", "Study resources", "Career planning"], color: currentColors.orange },
              { icon: <Gamepad2 className="w-8 h-8" />, title: "IFRS 17 Game", desc: "Gamified learning experience with competitive leaderboards", features: ["100+ quiz questions", "Global rankings", "Achievement badges"], color: currentColors.pink },
              { icon: <Compass className="w-8 h-8" />, title: "Integrated Experience", desc: "Seamless navigation between all platforms with unified progress tracking", features: ["Single dashboard", "Cross-platform sync", "Unified analytics"], color: currentColors.blue }
            ].map((platform, i) => (
              <div key={i} className="group p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ 
                  background: theme === 'dark' ? `linear-gradient(135deg, ${platform.color}10, ${platform.color}05)` : currentColors.card,
                  borderColor: `${platform.color}30`, 
                  boxShadow: theme === 'dark' ? `0 4px 20px ${platform.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 15px 50px ${platform.color}40` : `0 10px 30px ${platform.color}30`; 
                  e.currentTarget.style.borderColor = `${platform.color}60`; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 4px 20px ${platform.color}15` : '0 2px 15px rgba(0,0,0,0.08)'; 
                  e.currentTarget.style.borderColor = `${platform.color}30`; 
                }}>
                <div className="p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3" 
                  style={{ background: `${platform.color}20`, color: platform.color }}>{platform.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: currentColors.text }}>{platform.title}</h3>
                <p className="mb-4 leading-relaxed text-sm" style={{ color: currentColors.textSecondary }}>{platform.desc}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: platform.color }} />
                      <span className="text-xs" style={{ color: currentColors.textSecondary }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button onClick={handleSignUp} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center gap-3"
              style={{ 
                background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, 
                boxShadow: `0 10px 40px ${currentColors.cyan}40`,
                color: theme === 'dark' ? '#1A1F2E' : 'white'
              }}>
              <Star className="w-6 h-6" />
              Get Started Free - No Credit Card Required
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE KENBRIGHT */}
      <section id="training" className="py-20 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: theme === 'dark' 
            ? `linear-gradient(135deg, ${currentColors.cyan}15, ${currentColors.purple}15)` 
            : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)` 
        }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4" 
              style={{ background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Why Choose Kenbright?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: currentColors.textSecondary }}>Comprehensive actuarial platform designed by industry experts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Brain className="w-8 h-8" />, title: "Expert Content", desc: "Industry-leading curriculum", color: currentColors.cyan },
              { icon: <Target className="w-8 h-8" />, title: "Practical Skills", desc: "Real-world applications", color: currentColors.green },
              { icon: <Shield className="w-8 h-8" />, title: "Compliance Ready", desc: "IFRS 17 & regulations", color: currentColors.purple },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Career Growth", desc: "Advance your expertise", color: currentColors.blue }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" 
                  style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)` }} />
                <div className="relative p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-xl overflow-hidden"
                  style={{ 
                    background: theme === 'dark' ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)` : currentColors.card,
                    borderColor: `${item.color}50`, 
                    boxShadow: theme === 'dark' ? `0 8px 32px ${item.color}20` : `0 4px 20px ${item.color}15`
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                    e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}40`; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                    e.currentTarget.style.boxShadow = theme === 'dark' ? `0 8px 32px ${item.color}20` : `0 4px 20px ${item.color}15`; 
                  }}>
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" 
                      style={{ background: `${item.color}25`, color: item.color, boxShadow: `0 4px 20px ${item.color}30` }}>{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: currentColors.text }}>{item.title}</h3>
                    <p style={{ color: currentColors.textSecondary }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-20 px-4 lg:px-8 transition-colors duration-300" 
        style={{ background: theme === 'dark' ? currentColors.card : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="w-8 h-8" />, value: userCount, suffix: "+", label: "Active Users", color: currentColors.cyan },
              { icon: <GraduationCap className="w-8 h-8" />, value: moduleCount, suffix: "+", label: "Training Modules", color: currentColors.purple },
              { icon: <Calculator className="w-8 h-8" />, value: toolCount, suffix: "+", label: "Valuation Tools", color: currentColors.green },
              { icon: <Trophy className="w-8 h-8" />, value: successRate, suffix: "%", label: "Success Rate", color: currentColors.orange }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-transform group-hover:scale-110" 
                  style={{ background: `${stat.color}20`, color: stat.color }}>{stat.icon}</div>
                <div className="text-5xl font-black mb-2" 
                  style={{ 
                    color: stat.color,
                    textShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="font-medium" style={{ color: currentColors.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 lg:px-8" 
        style={{ background: theme === 'dark' ? `linear-gradient(135deg, ${currentColors.cyan}20, ${currentColors.purple}20)` : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-black mb-6" style={{ color: currentColors.text }}>Ready to Accelerate Your Actuarial Career?</h2>
          <p className="text-xl mb-10" style={{ color: currentColors.textSecondary }}>Join 1,500+ professionals already learning with Kenbright. Start your free account today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleSignUp} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
              style={{ 
                background: currentColors.cyan, 
                boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                color: theme === 'dark' ? '#1A1F2E' : 'white'
              }}>
              <Rocket className="w-6 h-6" />
              Create Free Account
            </button>
            <button onClick={() => navigate('/auth?mode=login')} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
              style={{ 
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)', 
                border: `2px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                color: currentColors.text
              }}>
              Already have an account? Log In
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-4 lg:px-8 border-t transition-colors duration-300" 
        style={{ 
          background: theme === 'dark' ? currentColors.card : '#FFFFFF', 
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
        }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl" 
                  style={{ background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, color: 'white' }}>KB</div>
                <div>
                  <div className="font-bold text-lg" style={{ color: currentColors.text }}>Kenbright Actuarial Hub</div>
                  <div className="text-sm" style={{ color: currentColors.textSecondary }}>Empowering Actuarial Excellence</div>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: currentColors.textSecondary }}>Your comprehensive platform for actuarial training, valuation tools, exam preparation, and gamified learning.</p>
              <div className="flex items-center gap-4">
                {[{ icon: <Facebook className="w-5 h-5" />, color: currentColors.blue }, { icon: <Twitter className="w-5 h-5" />, color: currentColors.cyan }, { icon: <Linkedin className="w-5 h-5" />, color: currentColors.blue }, { icon: <Youtube className="w-5 h-5" />, color: currentColors.pink }].map((social, i) => (
                  <button key={i} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" 
                    style={{ background: `${social.color}20`, color: social.color }}>{social.icon}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: currentColors.text }}>Quick Links</h3>
              <ul className="space-y-3">
                {['Training Modules', 'IFRS 17 Hub', 'Valuation Tools', 'Exam Pathways', 'IFRS 17 Game'].map((link, i) => (
                  <li key={i}><a href="#" className="transition text-sm hover:opacity-70" style={{ color: currentColors.textSecondary }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: currentColors.text }}>Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm" style={{ color: currentColors.textSecondary }}>
                  <Mail className="w-4 h-4" style={{ color: currentColors.cyan }} />
                  <span>info@kenbright.com</span>
                </li>
                <li className="flex items-center gap-3 text-sm" style={{ color: currentColors.textSecondary }}>
                  <Phone className="w-4 h-4" style={{ color: currentColors.cyan }} />
                  <span>+254 700 000 000</span>
                </li>
                <li className="flex items-center gap-3 text-sm" style={{ color: currentColors.textSecondary }}>
                  <MapPin className="w-4 h-4" style={{ color: currentColors.cyan }} />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" 
            style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            <div className="text-sm" style={{ color: currentColors.textSecondary }}>© {new Date().getFullYear()} Kenbright Actuarial Hub. All rights reserved.</div>
            <div className="flex items-center gap-6 text-sm" style={{ color: currentColors.textSecondary }}>
              <a href="#" className="transition hover:opacity-70">Privacy Policy</a>
              <a href="#" className="transition hover:opacity-70">Terms of Service</a>
              <a href="#" className="transition hover:opacity-70">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}