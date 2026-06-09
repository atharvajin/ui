import React from 'react';
import { cn } from '../utils';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

const SubNav = ({ items, activeItem, onSelect }) => {
  const { containerRef, canScrollLeft, canScrollRight, scroll, checkScrollability } = useHorizontalScroll();

  return (
    <div className="relative group w-full border-b border-surface-container-highest/30">

      {/* Left Scroll Button */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none">
          <button
            onClick={() => scroll('left')}
            className="ml-2 w-8 h-8 pointer-events-auto rounded-full bg-white shadow flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary opacity-0 group-hover:opacity-100 md:opacity-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
        </div>
      )}

      {/* Scrollable Container */}
      <nav aria-label="Service Categories">
        <ul
          ref={containerRef}
          onScroll={checkScrollability}
          className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-4 px-12 md:px-0"
          role="tablist"
        >
          {items.map((tab) => {
            const isActive = activeItem === tab.id;
            return (
              <li key={tab.id} role="presentation">
                <button
                  onClick={() => onSelect(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${tab.label} category`}
                  className={cn(
                    "flex flex-row items-center gap-2 py-2 px-5 rounded-full transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 min-w-max",
                    isActive
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-on-surface/80 hover:bg-surface-container hover:text-on-surface font-medium border border-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-xl",
                      isActive && "font-variation-settings-fill-1"
                    )}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {tab.icon}
                  </span>
                  <span className="font-body text-base tracking-wide capitalize">
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none">
          <button
            onClick={() => scroll('right')}
            className="mr-2 w-8 h-8 pointer-events-auto rounded-full bg-white shadow flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary opacity-0 group-hover:opacity-100 md:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubNav;
