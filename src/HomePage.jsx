// src/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  Award,
  Gamepad2,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  PlayCircle,
  BarChart3,
  Calendar,
  Bell,
  Star,
  Trophy,
  Flame
} from "lucide-react";

// Carousel Slides for Dashboard
const carouselSlides = [
  {
    title: "Welcome Back!",
    subtitle: "Continue your actuarial journey",
    highlight: "Your Progress",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #00E5FF 50%, #7C4DFF 100%)",
    cta: "Continue Learning",
    link: "/modules"
  },
  {
    title: "IFRS 17 Training",
    subtitle: "Master the new standard",
    highlight: "Trending Now",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #9D4EDD 50%, #3B82F6 100%)",
    cta: "Start Module",
    link: "/modules"
  },
  {
    title: "Actuarial Tools",
    subtitle: "Professional valuation models",
    highlight: "50+ Tools",
    gradient: "linear-gradient(135deg, #10B981 0%, #48C774 50%, #3B82F6 100%)",
    cta: "Access Tools",
    link: "/modules"
  },
  {
    title: "IFRS 17 Game",
    subtitle: "Test your knowledge",
    highlight: "Leaderboard",
    gradient: "linear-gradient(135deg, #E91E63 0%, #7C4DFF 50%, #3B82F6 100%)",
    cta: "Play Now",
    link: "https://www.ifrs17game.com/"
  }
];

export default function HomePage({ theme = 'dark' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

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

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  // Carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  const handleSlideClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  // Dashboard Quick Stats
  const quickStats = [
    { label: "Modules Completed", value: "8/17", icon: <BookOpen className="w-5 h-5" />, color: currentColors.cyan, progress: 47 },
    { label: "Study Streak", value: "12 days", icon: <Flame className="w-5 h-5" />, color: currentColors.orange, badge: "🔥" },
    { label: "Quiz Score", value: "85%", icon: <Trophy className="w-5 h-5" />, color: currentColors.green, trend: "+5%" },
    { label: "Time Invested", value: "42h", icon: <Clock className="w-5 h-5" />, color: currentColors.purple, subtext: "this month" }
  ];

  // Recent Activity
  const recentActivity = [
    { module: "Module 5: Risk Adjustment", progress: 75, color: currentColors.blue, time: "2 hours ago" },
    { module: "IFRS 17 Quiz", progress: 100, color: currentColors.green, time: "Yesterday" },
    { module: "Module 4: Loss Triangles", progress: 45, color: currentColors.orange, time: "2 days ago" }
  ];

  // Quick Actions
  const quickActions = [
    { title: "Training Modules", desc: "17+ Comprehensive Courses", icon: <BookOpen className="w-6 h-6" />, color: currentColors.cyan, link: "/modules" },
    { title: "Valuation Tools", desc: "50+ Professional Models", icon: <Calculator className="w-6 h-6" />, color: currentColors.green, link: "/modules" },
    { title: "Qualification Paths", desc: "Exam Preparation", icon: <Award className="w-6 h-6" />, color: currentColors.orange, link: "/modules" },
    { title: "IFRS 17 Game", desc: "Test Your Knowledge", icon: <Gamepad2 className="w-6 h-6" />, color: currentColors.pink, link: "https://www.ifrs17game.com/" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: currentColors.bg }}>
      {/* SVG Gradient Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id={`starGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme === 'dark' ? currentColors.cyan : currentColors.purple} />
            <stop offset="100%" stopColor={theme === 'dark' ? currentColors.cyan : currentColors.blue} />
          </linearGradient>
        </defs>
      </svg>

      {/* HERO CAROUSEL */}
      <div className="relative">
        <div className="relative h-[400px] overflow-hidden">
          {carouselSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentSlide === i ? 'opacity-100 translate-x-0'
                : i < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                }`}
              style={{ background: slide.gradient }}
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: theme === 'dark' ? currentColors.cyan : 'white' }} />
                <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: theme === 'dark' ? currentColors.purple : 'white' }} />
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  opacity: 0.3
                }} />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center" style={{ paddingTop: '80px' }}>
                <div className="w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                      style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`
                      }}>
                      <Sparkles className="w-4 h-4" style={{ color: currentColors.cyan }} />
                      <span className="text-sm font-semibold" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>{slide.highlight}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight" style={{ color: theme === 'dark' ? 'white' : '#1A1F2E' }}>
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                      {slide.subtitle}
                    </p>
                    <button
                      onClick={() => handleSlideClick(slide.link)}
                      className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-2xl"
                      style={{
                        background: currentColors.cyan,
                        boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                        color: theme === 'dark' ? '#1A1F2E' : 'white'
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
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

      {/* DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: theme === 'dark' ? currentColors.card : 'white',
                borderColor: `${stat.color}30`,
                boxShadow: theme === 'dark' ? `0 4px 20px ${stat.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
              }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ background: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                {stat.badge && <span className="text-2xl">{stat.badge}</span>}
                {stat.trend && <span className="text-sm font-bold" style={{ color: currentColors.green }}>{stat.trend}</span>}
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: currentColors.text }}>{stat.value}</div>
              <div className="text-sm" style={{ color: currentColors.textSecondary }}>{stat.label}</div>
              {stat.progress && (
                <div className="mt-4">
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stat.progress}%`, background: stat.color }} />
                  </div>
                </div>
              )}
              {stat.subtext && <div className="text-xs mt-2" style={{ color: currentColors.textSecondary }}>{stat.subtext}</div>}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2 p-6 rounded-2xl border" style={{
            background: theme === 'dark' ? currentColors.card : 'white',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: currentColors.text }}>Recent Activity</h2>
              <button className="text-sm font-semibold flex items-center gap-2 hover:opacity-70 transition" style={{ color: currentColors.cyan }}>
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer" style={{
                  background: theme === 'dark' ? `${activity.color}10` : currentColors.card,
                  borderColor: `${activity.color}30`
                }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-5 h-5" style={{ color: activity.color }} />
                      <span className="font-semibold" style={{ color: currentColors.text }}>{activity.module}</span>
                    </div>
                    <span className="text-xs" style={{ color: currentColors.textSecondary }}>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${activity.progress}%`, background: activity.color }} />
                    </div>
                    <span className="text-sm font-bold" style={{ color: activity.color }}>{activity.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="p-6 rounded-2xl border" style={{
            background: theme === 'dark' ? currentColors.card : 'white',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: currentColors.text }}>This Week</h2>
              <Calendar className="w-5 h-5" style={{ color: currentColors.cyan }} />
            </div>
            <div className="space-y-4">
              {[
                { day: "Today", task: "Module 6: CSM", time: "2:00 PM", color: currentColors.cyan },
                { day: "Tomorrow", task: "IFRS 17 Quiz", time: "10:00 AM", color: currentColors.purple },
                { day: "Wednesday", task: "Live Workshop", time: "3:00 PM", color: currentColors.green }
              ].map((event, i) => (
                <div key={i} className="p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer" style={{
                  background: theme === 'dark' ? `${event.color}10` : currentColors.card,
                  borderColor: `${event.color}30`
                }}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ background: event.color }} />
                    <div className="flex-1">
                      <div className="text-xs font-semibold mb-1" style={{ color: event.color }}>{event.day}</div>
                      <div className="font-semibold mb-1" style={{ color: currentColors.text }}>{event.task}</div>
                      <div className="text-xs flex items-center gap-1" style={{ color: currentColors.textSecondary }}>
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: currentColors.text }}>Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, i) => (
              <div key={i}
                onClick={() => action.link.startsWith('http') ? window.open(action.link, '_blank') : navigate(action.link)}
                className="group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: theme === 'dark' ? `${action.color}10` : 'white',
                  borderColor: `${action.color}30`,
                  boxShadow: theme === 'dark' ? `0 4px 20px ${action.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 15px 50px ${action.color}40` : `0 10px 30px ${action.color}30`;
                  e.currentTarget.style.borderColor = `${action.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 4px 20px ${action.color}15` : '0 2px 15px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = `${action.color}30`;
                }}>
                <div className="p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${action.color}20`, color: action.color }}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: currentColors.text }}>{action.title}</h3>
                <p className="text-sm" style={{ color: currentColors.textSecondary }}>{action.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="p-8 rounded-2xl border relative overflow-hidden" style={{
          background: theme === 'dark' ? `linear-gradient(135deg, ${currentColors.cyan}20, ${currentColors.purple}20)` : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)`,
          borderColor: theme === 'dark' ? `${currentColors.cyan}40` : `${currentColors.cyan}100`
        }}>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: `${currentColors.cyan}20`, border: `1px solid ${currentColors.cyan}40` }}>
                <Star className="w-4 h-4" style={{
                  fill: `url(#starGradient-${theme})`,
                  stroke: `url(#starGradient-${theme})`
                }} />
                <span className="text-sm font-semibold" style={{
                  ...(theme === 'dark'
                    ? { color: currentColors.cyan }
                    : {
                      background: `linear-gradient(135deg, ${currentColors.purple} 0%, ${currentColors.blue} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    })
                }}>Achievement Unlocked!</span>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>Keep Up The Great Work!</h3>
              <p className="text-lg mb-6" style={{ color: currentColors.textSecondary }}>You're on a 12-day learning streak. Complete today's module to maintain your momentum!</p>
              <button onClick={() => navigate('/modules')} className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105" style={{
                background: currentColors.cyan,
                color: theme === 'dark' ? '#1A1F2E' : 'white',
                boxShadow: `0 10px 30px ${currentColors.cyan}40`
              }}>
                Continue Learning <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-6xl">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}