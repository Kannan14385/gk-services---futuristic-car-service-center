import React, { useState, useEffect } from 'react';
import { ArrowUp, Sun, Moon } from 'lucide-react';

interface BackToTopWithScrollPercentageProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const BackToTopWithScrollPercentage: React.FC<BackToTopWithScrollPercentageProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))) : 0;
      
      setScrollPercentage(pct);
      setIsVisible(scrollTop > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG ring math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      id="floating-corner-controls"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 animate-fadeIn"
    >
      {/* 1. Light / Dark Mode Button positioned ABOVE the Back to Top button (Requirement 1) */}
      <button
        id="floating-theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        className="relative w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_8px_25px_var(--accent-glow)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[var(--accent-cyan)] cursor-pointer backdrop-blur-md group"
        title={`Switch to ${theme === 'dark' ? 'Light Aerospace Theme' : 'Dark Cyber Titanium'} Mode`}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-300 transition-transform duration-500 group-hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-500 group-hover:-rotate-45" />
        )}

        {/* Floating tooltip badge */}
        <span className="absolute -left-32 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-md text-[10px] font-mono-tech font-semibold uppercase tracking-wider bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-xl pointer-events-none whitespace-nowrap">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>

      {/* 2. Back to Top Button with Circular Scroll Percentage Ring */}
      {isVisible && (
        <button
          id="back-to-top-button"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Scroll back to top. Page scrolled ${scrollPercentage} percent`}
          className="relative w-14 h-14 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_10px_30px_var(--accent-glow)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[var(--accent-cyan)] cursor-pointer backdrop-blur-md group animate-fadeIn"
        >
          {/* Progress SVG Ring */}
          <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 56 56">
            {/* Background circle track */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-[var(--border-color)] fill-none"
              strokeWidth="3"
            />
            {/* Active progress fill */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-[var(--accent-cyan)] fill-none transition-all duration-150 ease-out"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Center content: Percentage or Arrow on Hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isHovered ? (
              <ArrowUp className="w-5 h-5 text-[var(--accent-cyan)] animate-bounce" />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-[11px] font-mono-tech font-bold text-[var(--accent-cyan)] leading-none">
                  {scrollPercentage}%
                </span>
              </div>
            )}
          </div>

          {/* Floating tooltip */}
          <span className="absolute -left-28 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-md text-[10px] font-mono-tech font-semibold uppercase tracking-wider bg-[var(--bg-card)] text-[var(--accent-cyan)] border border-[var(--border-color)] shadow-lg pointer-events-none whitespace-nowrap">
            Top · {scrollPercentage}%
          </span>
        </button>
      )}
    </div>
  );
};
