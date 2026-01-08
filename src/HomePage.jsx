// src/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Shield,
  TrendingUp,
  Users,
  GraduationCap,
  Calculator,
  BookOpen,
  Award,
  Gamepad2,
  CheckCircle2,
  Trophy,
  Compass,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";
import heroImg from "./assets/hero.jpg";

// Kenbright Brand Colors (Dark Mode Optimized)
const colors = {
  cyan: "#00E5FF",
  purple: "#7C4DFF",
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F97316",
  pink: "#E91E63",
  darkBg: "#0A0F1E",
  darkCard: "#1A1F2E"
};

// Carousel Slides
const carouselSlides = [
  {
    title: "Actuarial Training Hub",
    subtitle: "Comprehensive training modules for insurance professionals",
    highlight: "Professional Training",
    cta: "Start Learning Today",
    gradient: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.cyan} 50%, ${colors.purple} 100%)`,
    statsTitle: "Join 500+ Actuaries",
    statsSubtitle: "Learning Together",
    stat1: "17+",
    stat1Label: "Modules",
    stat2: "120h",
    stat2Label: "Content",
    successRate: "98% Success Rate"
  },
  {
    title: "IFRS 17 Training Hub",
    subtitle: "Master the new insurance accounting standard",
    highlight: "Industry Standard",
    cta: "Explore IFRS 17",
    gradient: `linear-gradient(135deg, ${colors.purple} 0%, #9D4EDD 50%, ${colors.blue} 100%)`,
    statsTitle: "Join 300+ Professionals",
    statsSubtitle: "Mastering IFRS 17",
    stat1: "25+",
    stat1Label: "Lessons",
    stat2: "80h",
    stat2Label: "Content",
    successRate: "95% Pass Rate"
  },
  {
    title: "Actuarial Valuation Tools",
    subtitle: "Professional models for risk adjustment and LRC calculations",
    highlight: "50+ Tools Available",
    cta: "Access Tools",
    gradient: `linear-gradient(135deg, ${colors.green} 0%, #48C774 50%, ${colors.blue} 100%)`,
    statsTitle: "Used by 400+ Teams",
    statsSubtitle: "Daily Calculations",
    stat1: "50+",
    stat1Label: "Tools",
    stat2: "1000+",
    stat2Label: "Users",
    successRate: "99% Accuracy"
  },
  {
    title: "Qualification Pathways",
    subtitle: "Your complete guide to actuarial professional exams",
    highlight: "Career Growth",
    cta: "View Pathways",
    gradient: `linear-gradient(135deg, ${colors.orange} 0%, #FF8C42 50%, ${colors.purple} 100%)`,
    statsTitle: "Guide 600+ Students",
    statsSubtitle: "To Success",
    stat1: "15+",
    stat1Label: "Exams",
    stat2: "200h",
    stat2Label: "Prep",
    successRate: "92% Pass Rate"
  },
  {
    title: "IFRS 17 Game",
    subtitle: "Test your knowledge and compete on the leaderboard",
    highlight: "Gamified Learning",
    cta: "Play Now",
    gradient: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.purple} 50%, ${colors.blue} 100%)`,
    statsTitle: "Join 250+ Players",
    statsSubtitle: "Competing Daily",
    stat1: "100+",
    stat1Label: "Questions",
    stat2: "Top 50",
    stat2Label: "Ranking",
    successRate: "85% Completion"
  }
];

// Counter Hook
function useCountUp(end, duration = 2000, shouldStart) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const userCount = useCountUp(1500, 2000, statsVisible);
  const moduleCount = useCountUp(17, 2000, statsVisible);
  const toolCount = useCountUp(50, 2000, statsVisible);
  const successRate = useCountUp(95, 2000, statsVisible);

  // Carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  const currentSlideData = carouselSlides[currentSlide];

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: colors.darkBg }}>
      {/* CAROUSEL - Extended to top for transparent navbar */}
      <div className="relative">
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
          {carouselSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === i
                  ? 'opacity-100 translate-x-0'
                  : i < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
              }`}
              style={{ background: slide.gradient }}
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: colors.cyan }} />
                <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: colors.purple }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'white' }} />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }}
                />
              </div>

              {/* Content - Added padding for navbar space */}
              <div className="relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center" style={{ paddingTop: '72px' }}>
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                  {/* Left - Text */}
                  <div className="text-white z-10">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: colors.cyan }} />
                      <span className="text-sm font-semibold">{slide.highlight}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-lg">
                      {slide.subtitle}
                    </p>
                    <button
                      onClick={() => window.location.href = '/modules'}
                      className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-2xl text-gray-900"
                      style={{
                        background: colors.cyan,
                        boxShadow: `0 10px 40px ${colors.cyan}50`
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Right - Visual Stats Card */}
                  <div className="hidden lg:flex justify-end">
                    <div className="relative">
                      <div
                        className="w-[400px] h-[300px] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                          <div className="flex -space-x-4 mb-6">
                            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((c, j) => (
                              <div
                                key={j}
                                className="w-14 h-14 rounded-full border-4 border-white/20 flex items-center justify-center text-white font-bold"
                                style={{ background: c }}
                              >
                                {String.fromCharCode(65 + j)}
                              </div>
                            ))}
                          </div>
                          <p className="text-white/90 text-lg font-semibold">{currentSlideData.statsTitle}</p>
                          <p className="text-white/60 text-sm mt-2">{currentSlideData.statsSubtitle}</p>
                          <div className="flex gap-4 mt-6">
                            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
                              <div className="text-2xl font-black text-white">{currentSlideData.stat1}</div>
                              <div className="text-xs text-white/70">{currentSlideData.stat1Label}</div>
                            </div>
                            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
                              <div className="text-2xl font-black text-white">{currentSlideData.stat2}</div>
                              <div className="text-xs text-white/70">{currentSlideData.stat2Label}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute -top-4 -left-4 px-4 py-2 rounded-xl shadow-xl animate-bounce"
                        style={{ background: colors.cyan }}
                      >
                        <span className="text-white font-bold text-sm">🎓 New Modules!</span>
                      </div>
                      <div
                        className="absolute -bottom-4 -right-4 px-6 py-3 rounded-xl shadow-xl"
                        style={{ background: 'white' }}
                      >
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" style={{ color: colors.cyan }} />
                          <span className="font-bold text-gray-900">{currentSlideData.successRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  currentSlide === i ? 'w-10 bg-white shadow-lg' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PLATFORM OVERVIEW SECTION - Smaller Cards */}
      <section className="py-20 px-4 lg:px-8" style={{ background: `linear-gradient(180deg, ${colors.darkCard} 0%, ${colors.darkBg} 100%)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              All Your Actuarial Needs in One Platform
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              From training to tools, from exams to games - everything you need to excel in actuarial science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Actuarial Training Hub",
                desc: "17+ comprehensive modules covering everything from data cleanup to IAS 19 valuation",
                features: ["Structured learning paths", "Real-world case studies", "Progress tracking"],
                color: colors.cyan
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "IFRS 17 Training Hub",
                desc: "Dedicated platform for mastering the new insurance accounting standard",
                features: ["25+ detailed lessons", "Interactive examples", "Certification prep"],
                color: colors.purple
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "Valuation Tools",
                desc: "Professional-grade models for risk adjustment, LRC, and liability calculations",
                features: ["50+ actuarial tools", "Excel integration", "Instant calculations"],
                color: colors.green
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Qualification Pathways",
                desc: "Complete roadmap for actuarial professional exams and certifications",
                features: ["15+ exam guides", "Study resources", "Career planning"],
                color: colors.orange
              },
              {
                icon: <Gamepad2 className="w-8 h-8" />,
                title: "IFRS 17 Game",
                desc: "Gamified learning experience with competitive leaderboards",
                features: ["100+ quiz questions", "Global rankings", "Achievement badges"],
                color: colors.pink
              },
              {
                icon: <Compass className="w-8 h-8" />,
                title: "Integrated Experience",
                desc: "Seamless navigation between all platforms with unified progress tracking",
                features: ["Single dashboard", "Cross-platform sync", "Unified analytics"],
                color: colors.blue
              }
            ].map((platform, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}10, ${platform.color}05)`,
                  borderColor: `${platform.color}30`,
                  boxShadow: `0 4px 20px ${platform.color}15`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 15px 50px ${platform.color}40`;
                  e.currentTarget.style.borderColor = `${platform.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 20px ${platform.color}15`;
                  e.currentTarget.style.borderColor = `${platform.color}30`;
                }}
              >
                <div
                  className="p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${platform.color}20`, color: platform.color }}
                >
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{platform.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">{platform.desc}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: platform.color }} />
                      <span className="text-gray-500 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION WITH BACKGROUND IMAGE */}
      <section 
        className="py-20 px-4 lg:px-8 relative overflow-hidden"
      >
        {/* Parallax Background Image with Blur */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'blur(2px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Dark overlay with gradient - Reduced opacity */}
        <div className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(rgba(10, 15, 30, 0.75), rgba(10, 15, 30, 0.8))` 
          }}
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-blue-900/20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-black mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Why Choose Kenbright?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive actuarial platform designed by industry experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Brain className="w-8 h-8" />, title: "Expert Content", desc: "Industry-leading curriculum", color: colors.cyan },
              { icon: <Target className="w-8 h-8" />, title: "Practical Skills", desc: "Real-world applications", color: colors.green },
              { icon: <Shield className="w-8 h-8" />, title: "Compliance Ready", desc: "IFRS 17 & regulations", color: colors.purple },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Career Growth", desc: "Advance your expertise", color: colors.blue }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative"
              >
                {/* Animated background glow */}
                <div 
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`
                  }}
                />
                
                {/* Card content */}
                <div
                  className="relative p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                    borderColor: `${item.color}50`,
                    boxShadow: `0 8px 32px ${item.color}20`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}40`;
                    e.currentTarget.style.borderColor = `${item.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 8px 32px ${item.color}20`;
                    e.currentTarget.style.borderColor = `${item.color}50`;
                  }}
                >
                  {/* Shine effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}15, transparent 70%)`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className="p-4 rounded-2xl w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ 
                        background: `${item.color}25`, 
                        color: item.color,
                        boxShadow: `0 4px 20px ${item.color}30`
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{item.desc}</p>
                  </div>

                  {/* Corner accent */}
                  <div 
                    className="absolute bottom-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${item.color}, transparent 70%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION WITH COUNTING ANIMATION */}
      <section ref={statsRef} className="py-20 px-4 lg:px-8" style={{ background: colors.darkCard }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="w-8 h-8" />, value: userCount, suffix: "+", label: "Active Users", color: colors.cyan },
              { icon: <GraduationCap className="w-8 h-8" />, value: moduleCount, suffix: "+", label: "Training Modules", color: colors.purple },
              { icon: <Calculator className="w-8 h-8" />, value: toolCount, suffix: "+", label: "Valuation Tools", color: colors.green },
              { icon: <Trophy className="w-8 h-8" />, value: successRate, suffix: "%", label: "Success Rate", color: colors.orange }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div 
                  className="text-5xl font-black mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, white)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-4 lg:px-8" style={{ background: colors.darkBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: `${colors.cyan}20`, border: `1px solid ${colors.cyan}40` }}
              >
                <Users className="w-4 h-4" style={{ color: colors.cyan }} />
                <span className="text-sm font-semibold" style={{ color: colors.cyan }}>Collaborative Learning</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                Learn Together, <span style={{ color: colors.cyan }}>Grow Together</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Join a community of actuarial professionals collaborating on real-world challenges across all our platforms.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Interactive team workshops and case studies",
                  "Peer-to-peer knowledge sharing sessions",
                  "Expert-led masterclasses and Q&A sessions",
                  "Real-time collaboration on actuarial models"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: colors.cyan }}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.location.href = '/modules'}
                className="px-8 py-4 rounded-xl font-bold text-white text-lg flex items-center gap-3 transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`,
                  boxShadow: `0 10px 40px ${colors.cyan}30`
                }}
              >
                Join Our Community
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative hidden lg:block">
              <div
                className="relative w-full h-[400px] rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.cyan}30, ${colors.purple}20)`,
                  border: `2px solid ${colors.cyan}40`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-24 rounded-lg"
                      style={{ background: colors.darkCard, border: `2px solid ${colors.cyan}60` }}
                    >
                      <div className="w-full h-16 rounded-t-lg p-2" style={{ background: colors.cyan }}>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                      </div>
                    </div>
                    {[
                      { x: '15%', y: '20%', color: '#FF6B6B', name: 'A' },
                      { x: '75%', y: '15%', color: '#4ECDC4', name: 'B' },
                      { x: '85%', y: '60%', color: '#45B7D1', name: 'C' },
                      { x: '20%', y: '70%', color: '#96CEB4', name: 'D' },
                      { x: '50%', y: '85%', color: '#FFEAA7', name: 'E' }
                    ].map((member, i) => (
                      <div
                        key={i}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                        style={{ left: member.x, top: member.y, animationDelay: `${i * 0.2}s` }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl"
                          style={{ background: member.color, boxShadow: `0 0 20px ${member.color}60` }}
                        >
                          {member.name}
                        </div>
                      </div>
                    ))}
                    <div
                      className="absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-semibold animate-bounce"
                      style={{ background: colors.cyan, color: 'white' }}
                    >
                      Live Session
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED FOOTER */}
      <footer className="py-16 px-4 lg:px-8 border-t" style={{ background: colors.darkCard, borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl"
                  style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})` }}
                >
                  KB
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Kenbright Actuarial Hub</div>
                  <div className="text-gray-500 text-sm">Empowering Actuarial Excellence</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Your comprehensive platform for actuarial training, valuation tools, exam preparation, and gamified learning. 
                Join thousands of professionals advancing their careers through our integrated solutions.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, color: colors.blue },
                  { icon: <Twitter className="w-5 h-5" />, color: colors.cyan },
                  { icon: <Linkedin className="w-5 h-5" />, color: colors.blue },
                  { icon: <Youtube className="w-5 h-5" />, color: colors.pink }
                ].map((social, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: `${social.color}20`, color: social.color }}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Training Modules', 'IFRS 17 Hub', 'Valuation Tools', 'Exam Pathways', 'IFRS 17 Game'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4" style={{ color: colors.cyan }} />
                  <span>info@kenbright.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4" style={{ color: colors.cyan }} />
                  <span>+254 700 000 000</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" style={{ color: colors.cyan }} />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kenbright Actuarial Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-cyan-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}