// src/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Home, BookOpen, Award, Gamepad2, Calculator, User, ChevronDown, LogOut, Settings, LayoutDashboard, Menu, X } from "lucide-react";

export default function Navbar({ userProfile, currentPath = "/" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => currentPath === path;

  // Kenbright colors
  const kenbrightCyan = "#00E5FF";
  const kenbrightPurple = "#7C4DFF";
  const kenbrightDarkBlue = "rgb(1, 55, 166)"; // R-1, G-55, B-166
  const darkCard = "#1A1F2E";

  // Navigation items (Removed Pathways - now integrated in Training)
  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/modules", label: "Training", icon: <BookOpen className="w-5 h-5" /> },
    { path: "/tools", label: "Tools", icon: <Calculator className="w-5 h-5" /> },
    { path: "/game", label: "Game", icon: <Gamepad2 className="w-5 h-5" /> },
  ];

  // Resources dropdown items
  const resourceItems = [
    { label: "QAS Reports", path: "/qas-reports" },
    { label: "Training Links", path: "/training-links" },
    { label: "File Formats", path: "/file-saving-format" },
    { label: "Documentation", path: "/docs" },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out"
      style={{
        background: isScrolled 
          ? `${darkCard}f5` 
          : 'rgba(10, 15, 30, 0.05)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(16px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(16px)',
        borderBottom: isScrolled 
          ? `1px solid ${kenbrightCyan}33` 
          : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isScrolled 
          ? `0 4px 30px rgba(0, 229, 255, 0.1)` 
          : '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="w-full px-2">
        <div className="flex items-center justify-between h-20 max-w-[100%]">
          {/* Left - Logo & Brand (pushed to far edge) */}
          <div className="flex items-center gap-3 pl-2">
            <a
              href="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: `linear-gradient(135deg, ${kenbrightCyan}, ${kenbrightPurple})`,
                  boxShadow: isScrolled ? `0 4px 15px ${kenbrightCyan}40` : `0 8px 20px ${kenbrightCyan}30`
                }}
              >
                KB
              </div>
              <div className="hidden lg:block">
                <div 
                  className="font-black text-lg leading-none transition-all duration-300"
                  style={{
                    color: kenbrightDarkBlue,
                    textShadow: !isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
                >
                  KENBRIGHT
                </div>
                <div 
                  className="text-xs font-medium mt-0.5"
                  style={{ 
                    color: isScrolled ? kenbrightCyan : 'rgba(255,255,255,0.8)',
                    textShadow: !isScrolled ? '0 1px 5px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
                >
                  Actuarial Hub
                </div>
              </div>
            </a>
          </div>

          {/* Center - Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path) ? 'font-semibold' : 'hover:scale-105'
                  }`}
                  style={{
                    color: isActive(item.path) ? kenbrightCyan : 'white',
                    background: isActive(item.path) 
                      ? `${kenbrightCyan}15` 
                      : 'transparent',
                    textShadow: !isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none',
                    opacity: isScrolled ? 1 : 0.95
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = `${kenbrightCyan}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}

              {/* Resources Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    showResourcesMenu ? 'font-semibold' : 'hover:scale-105'
                  }`}
                  style={{
                    color: showResourcesMenu ? kenbrightCyan : 'white',
                    background: showResourcesMenu ? `${kenbrightCyan}15` : 'transparent',
                    textShadow: !isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none',
                    opacity: isScrolled ? 1 : 0.95
                  }}
                  onMouseEnter={(e) => {
                    if (!showResourcesMenu) {
                      e.currentTarget.style.background = `${kenbrightCyan}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showResourcesMenu) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showResourcesMenu && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: `${darkCard}f5`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${kenbrightCyan}30`,
                      boxShadow: `0 8px 32px rgba(0, 229, 255, 0.15)`
                    }}
                  >
                    {resourceItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.path}
                        className="block px-4 py-3 text-white hover:bg-white/5 transition-all text-sm"
                        style={{
                          borderBottom: i < resourceItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${kenbrightCyan}15`;
                          e.currentTarget.style.color = kenbrightCyan;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'white';
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Profile (pushed to far edge) */}
          <div className="flex items-center gap-4 pr-2">
            {/* Desktop Profile Dropdown */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: showProfileMenu 
                    ? `linear-gradient(135deg, ${kenbrightCyan}20, ${kenbrightPurple}20)`
                    : `${isScrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
                  border: `1px solid ${showProfileMenu ? kenbrightCyan : 'rgba(255,255,255,0.2)'}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: !isScrolled ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none'
                }}
              >
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${kenbrightPurple}, ${kenbrightCyan})`
                  }}
                >
                  RO
                </div>
                <div className="text-left">
                  <div 
                    className="text-sm font-semibold leading-none mb-1"
                    style={{ 
                      color: 'white',
                      textShadow: !isScrolled ? '0 1px 5px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    admin
                  </div>
                  <div 
                    className="text-xs leading-none"
                    style={{ 
                      color: kenbrightCyan,
                      textShadow: !isScrolled ? '0 1px 5px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    Administrator
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div 
                  className="absolute top-full right-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    background: `${darkCard}f5`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${kenbrightCyan}30`,
                    boxShadow: `0 8px 32px rgba(0, 229, 255, 0.15)`
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                        style={{
                          background: `linear-gradient(135deg, ${kenbrightPurple}, ${kenbrightCyan})`
                        }}
                      >
                        RO
                      </div>
                      <div>
                        <div className="text-white font-semibold">admin</div>
                        <div className="text-gray-400 text-xs">admin@kenbright.com</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <a
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-all text-sm"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${kenbrightCyan}15`;
                        e.currentTarget.style.color = kenbrightCyan;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </a>
                    <a
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-all text-sm"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${kenbrightCyan}15`;
                        e.currentTarget.style.color = kenbrightCyan;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-all text-sm"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${kenbrightCyan}15`;
                        e.currentTarget.style.color = kenbrightCyan;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </a>
                  </div>

                  <div className="p-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <button
                      onClick={() => {/* Add logout logic */}}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500/10 transition-all text-sm w-full"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                        e.currentTarget.style.color = '#EF4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg transition-all"
              style={{
                background: showMobileMenu ? `${kenbrightCyan}20` : 'rgba(255,255,255,0.1)',
                color: 'white'
              }}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div 
            className="lg:hidden pb-6"
            style={{
              background: `${darkCard}f5`,
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${kenbrightCyan}20`,
              marginLeft: '-0.5rem',
              marginRight: '-0.5rem',
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                  style={{
                    color: isActive(item.path) ? kenbrightCyan : 'white',
                    background: isActive(item.path) ? `${kenbrightCyan}15` : 'transparent'
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
              
              <div className="pt-4 pb-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-gray-400 text-xs font-semibold px-4 mb-2">RESOURCES</div>
                {resourceItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.path}
                    className="block px-4 py-3 text-white rounded-lg transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}