import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Grid,
  HardDrive,
  BarChart2,
  Code,
  FileText,
  Database,
  ExternalLink,
} from "lucide-react";

export default function TrainingLinks({ theme = 'dark' }) {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-quart" });
  }, []);

  const isDark = theme === 'dark';

  // Theme-specific color schemes
  const colors = {
    dark: {
      background: 'linear-gradient(to bottom right, #0f172a, #020617)',
      text: '#ffffff',
      title: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      subtitle: '#94a3b8',
      
      // Excel/Power Query/Statistics - Blue theme
      blue: {
        cardBg: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
        cardBorder: 'rgba(96, 165, 250, 0.3)',
        iconBg: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
        iconShadow: 'rgba(59, 130, 246, 0.3)',
        headerText: 'linear-gradient(to right, #93c5fd, #67e8f9)',
        linkBg: 'rgba(59, 130, 246, 0.1)',
        linkBorder: 'rgba(96, 165, 250, 0.2)',
        linkHover: 'rgba(59, 130, 246, 0.2)',
        linkText: '#bfdbfe',
        sourceBg: 'rgba(59, 130, 246, 0.3)',
        sourceText: '#93c5fd',
        sourceBorder: 'rgba(96, 165, 250, 0.4)',
        iconColor: '#60a5fa',
        cardShadow: 'rgba(59, 130, 246, 0.2)'
      },
      
      // VBA/Tableau/SQL - Purple theme
      purple: {
        cardBg: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1))',
        cardBorder: 'rgba(167, 139, 250, 0.3)',
        iconBg: 'linear-gradient(to bottom right, #8b5cf6, #d946ef)',
        iconShadow: 'rgba(139, 92, 246, 0.3)',
        headerText: 'linear-gradient(to right, #c4b5fd, #f0abfc)',
        linkBg: 'rgba(139, 92, 246, 0.1)',
        linkBorder: 'rgba(167, 139, 250, 0.2)',
        linkHover: 'rgba(139, 92, 246, 0.2)',
        linkText: '#ddd6fe',
        sourceBg: 'rgba(139, 92, 246, 0.3)',
        sourceText: '#c4b5fd',
        sourceBorder: 'rgba(167, 139, 250, 0.4)',
        iconColor: '#a78bfa',
        cardShadow: 'rgba(139, 92, 246, 0.2)'
      },
      
      // Background glows
      glows: [
        { color: '#a855f7', opacity: 0.15, size: '300px', position: { top: '20%', left: '10%' } },
        { color: '#06b6d4', opacity: 0.15, size: '400px', position: { bottom: '15%', right: '10%' } },
        { color: '#3b82f6', opacity: 0.15, size: '250px', position: { top: '50%', right: '30%' } }
      ]
    },
    light: {
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      text: '#0f172a',
      title: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      subtitle: '#475569',
      
      // Excel/Power Query/Statistics - Blue theme
      blue: {
        cardBg: 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.08), rgba(14, 165, 233, 0.08))',
        cardBorder: 'rgba(37, 99, 235, 0.25)',
        iconBg: 'linear-gradient(to bottom right, #2563eb, #0ea5e9)',
        iconShadow: 'rgba(37, 99, 235, 0.25)',
        headerText: 'linear-gradient(to right, #1d4ed8, #0284c7)',
        linkBg: 'rgba(37, 99, 235, 0.06)',
        linkBorder: 'rgba(37, 99, 235, 0.15)',
        linkHover: 'rgba(37, 99, 235, 0.12)',
        linkText: '#1e40af',
        sourceBg: 'rgba(37, 99, 235, 0.15)',
        sourceText: '#1e40af',
        sourceBorder: 'rgba(37, 99, 235, 0.3)',
        iconColor: '#2563eb',
        cardShadow: 'rgba(37, 99, 235, 0.15)'
      },
      
      // VBA/Tableau/SQL - Purple theme
      purple: {
        cardBg: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.08), rgba(192, 38, 211, 0.08))',
        cardBorder: 'rgba(124, 58, 237, 0.25)',
        iconBg: 'linear-gradient(to bottom right, #7c3aed, #c026d3)',
        iconShadow: 'rgba(124, 58, 237, 0.25)',
        headerText: 'linear-gradient(to right, #6d28d9, #a21caf)',
        linkBg: 'rgba(124, 58, 237, 0.06)',
        linkBorder: 'rgba(124, 58, 237, 0.15)',
        linkHover: 'rgba(124, 58, 237, 0.12)',
        linkText: '#6b21a8',
        sourceBg: 'rgba(124, 58, 237, 0.15)',
        sourceText: '#6b21a8',
        sourceBorder: 'rgba(124, 58, 237, 0.3)',
        iconColor: '#7c3aed',
        cardShadow: 'rgba(124, 58, 237, 0.15)'
      },
      
      // Background glows - more subtle for light mode
      glows: [
        { color: '#a855f7', opacity: 0.04, size: '300px', position: { top: '20%', left: '10%' } },
        { color: '#06b6d4', opacity: 0.04, size: '400px', position: { bottom: '15%', right: '10%' } },
        { color: '#3b82f6', opacity: 0.04, size: '250px', position: { top: '50%', right: '30%' } }
      ]
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  // Category data
  const categories = [
    {
      theme: 'blue',
      icon: Grid,
      title: 'Excel',
      links: [
        { name: 'Excel Advanced Formulas', source: 'Udemy' },
        { name: 'Data Analysis with Excel', source: 'Udemy' }
      ]
    },
    {
      theme: 'blue',
      icon: HardDrive,
      title: 'Power Query',
      links: [
        { name: 'Power Query for Data Transformation', source: 'Udemy' }
      ]
    },
    {
      theme: 'blue',
      icon: BarChart2,
      title: 'Statistics',
      links: [
        { name: 'Probability & Statistics for Actuaries', source: 'Udemy' }
      ]
    },
    {
      theme: 'purple',
      icon: Code,
      title: 'VBA',
      links: [
        { name: 'Excel VBA Automation', source: 'Udemy' }
      ]
    },
    {
      theme: 'purple',
      icon: FileText,
      title: 'Tableau',
      links: [
        { name: 'Tableau for Data Visualization', source: 'Udemy' }
      ]
    },
    {
      theme: 'purple',
      icon: Database,
      title: 'SQL',
      links: [
        { name: 'SQL for Data Analysis', source: 'Udemy' }
      ]
    }
  ];

  return (
    <div 
      className="relative p-6 md:p-10 min-h-screen font-sans transition-colors duration-300"
      style={{
        background: currentColors.background,
        color: currentColors.text
      }}
    >
      {/* Background glow circles */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {currentColors.glows.map((glow, index) => (
          <div
            key={index}
            className="absolute rounded-full blur-3xl"
            style={{
              width: glow.size,
              height: glow.size,
              backgroundColor: glow.color,
              opacity: glow.opacity,
              ...glow.position
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 
          className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent"
          style={{ backgroundImage: currentColors.title }}
        >
          Training Resources
        </h1>
        <p 
          className="text-lg md:text-xl"
          style={{ color: currentColors.subtitle }}
        >
          Curated collection of premium courses to boost your skills
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => {
          const themeColors = currentColors[category.theme];
          const Icon = category.icon;
          
          return (
            <div
              key={index}
              className="backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: themeColors.cardBg,
                border: `1px solid ${themeColors.cardBorder}`,
                boxShadow: `0 8px 32px ${themeColors.cardShadow}`
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Category Header */}
              <div 
                className="flex items-center gap-4 mb-4 pb-4"
                style={{ borderBottom: `1px solid ${themeColors.cardBorder}` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: themeColors.iconBg,
                    boxShadow: `0 4px 15px ${themeColors.iconShadow}`
                  }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <h2 
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: themeColors.headerText }}
                >
                  {category.title}
                </h2>
              </div>

              {/* Links */}
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 group"
                      style={{
                        background: themeColors.linkBg,
                        border: `1px solid ${themeColors.linkBorder}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = themeColors.linkHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = themeColors.linkBg;
                      }}
                    >
                      <span style={{ color: themeColors.linkText }} className="font-medium">
                        {link.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{
                            background: themeColors.sourceBg,
                            color: themeColors.sourceText,
                            border: `1px solid ${themeColors.sourceBorder}`
                          }}
                        >
                          {link.source}
                        </span>
                        <ExternalLink 
                          size={16} 
                          style={{ color: themeColors.iconColor }}
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}