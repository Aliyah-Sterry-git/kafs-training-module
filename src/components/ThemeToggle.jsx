// src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  const colors = {
    dark: { cyan: "#00E5FF", blue: "#3B82F6", sun: "#FCD34D" },
    light: { cyan: "#00E5FF", blue: "#3B82F6", sun: "#FCD34D" }
  };
  
  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-500 backdrop-blur-md group"
      style={{
        background: theme === 'dark' ? 'rgba(26, 31, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        border: `2px solid ${theme === 'dark' ? 'rgba(255, 213, 0, 0.58)' : 'rgba(25, 118, 210, 0.3)'}`,
        boxShadow: theme === 'dark' ? '0 10px 40px rgba(0, 229, 255, 0.2)' : '0 10px 40px rgba(25, 118, 210, 0.2)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative">
        {theme === 'light' ? (
          <Moon className="w-6 h-6 transition-all duration-300" style={{ color: currentColors.blue }} />
        ) : (
          <Sun className="w-6 h-6 transition-all duration-300" style={{ color: currentColors.sun }} />
        )}
      </div>
      
      {/* Tooltip */}
      <div 
        className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 text-sm rounded-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
        style={{
          background: theme === 'dark' ? '#1A1F2E' : '#FFFFFF',
          color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
          borderColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'
        }}
      >
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </div>
    </button>
  );
}