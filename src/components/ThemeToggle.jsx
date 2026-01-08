// src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-var(--card-bg) border border-var(--card-border) shadow-2xl hover:scale-110 transition-all duration-500 backdrop-blur-md group animate-float"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'var(--toggle-bg)',
        borderColor: 'var(--toggle-border)',
        boxShadow: 'var(--toggle-shadow)'
      }}
    >
      <div className="relative">
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-var(--toggle-icon) group-hover:text-var(--toggle-icon-hover) transition-colors duration-300" />
        ) : (
          <Sun className="w-6 h-6 text-var(--toggle-icon) group-hover:text-var(--toggle-icon-hover) transition-colors duration-300" />
        )}
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-var(--toggle-icon) opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity duration-300"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-var(--card-bg) text-var(--text-primary) text-sm rounded-lg border border-var(--card-border) opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-var(--card-border)"></div>
      </div>
    </button>
  );
}