import React, { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../utils';
import { searchMenuOptions, searchResultsMock } from '../../data/searchData';
import { Link, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

const SearchBar = ({ isSearchOpen, setIsSearchOpen }) => {
  const [activeSearchTab, setActiveSearchTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchResultsMock[activeSearchTab] || searchResultsMock['trending'];

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [setIsSearchOpen]);

  const debouncedSearch = useMemo(
    () =>
      debounce((nextValue) => {
        if (nextValue.trim().length > 0) {
          // Placeholder: keep debounce wiring ready for API integration.
        }
      }, 300),
    []
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
    setIsSearchOpen(true);
  };

  const handleKeyDown = (e) => {
    if (!isSearchOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < results.length) {
        const selectedItem = results[focusedIndex];
        setIsSearchOpen(false);
        setFocusedIndex(-1);
        navigate(selectedItem.path);
      } else if (searchTerm) {
        // Handle generic search
        setIsSearchOpen(false);
        // navigate(`/search?q=${searchTerm}`);
      }
    }
  };

  // Reset focus when tab changes
  useEffect(() => {
    const timer = setTimeout(() => setFocusedIndex(-1), 0);
    return () => clearTimeout(timer);
  }, [activeSearchTab]);

  return (
    <div className="flex items-center flex-1 justify-center" ref={searchContainerRef}>


      <div className="relative w-full max-w-2xl hidden md:block" onKeyDown={handleKeyDown}>
        {/* Search Input */}
        <div
          className={cn(
            "flex items-center px-6 py-3 w-full border transition-all duration-300 z-50 relative",
            isSearchOpen ? "bg-surface rounded-t-3xl border-surface-container-high border-b-transparent shadow-none" : "bg-surface-container-low rounded-full shadow-[0_4px_40px_rgba(48,51,49,0.06)] border-transparent hover:border-outline-variant/30"
          )}
          onClick={() => setIsSearchOpen(true)}
        >
          <span className="material-symbols-outlined text-outline text-xl">search</span>
          <input
            ref={inputRef}
            className="bg-transparent border-none focus:ring-0 text-base w-full font-body placeholder:text-on-surface-variant/80 ml-3 outline-none"
            placeholder="Search for products, services, or art..."
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsSearchOpen(true)}
          />
        </div>

        {/* Mega Dropdown Panel */}
        <div className={cn(
          "absolute top-full left-0 w-full bg-surface rounded-b-3xl shadow-none border border-surface-container-high border-t-transparent overflow-hidden origin-top transition-all duration-300 ease-out z-40 -mt-px",
          isSearchOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-0 pointer-events-none"
        )}>
          <div className="flex max-h-[70vh] h-max">

            {/* Left Navigation */}
            <div className="w-1/3 border-r border-surface-container-high py-6 px-4 flex flex-col gap-1">
              {searchMenuOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setActiveSearchTab(option.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left font-body text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    activeSearchTab === option.id
                      ? "bg-white text-on-surface font-bold shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  )}
                >
                  <span className="material-symbols-outlined text-lg" style={activeSearchTab === option.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {option.icon}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="w-2/3 py-6 px-8 bg-white overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {results.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(item.path);
                      }}
                      className={cn(
                      "flex items-center gap-4 w-full p-3 rounded-xl hover:bg-surface transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      focusedIndex === idx ? "bg-surface ring-2 ring-primary" : ""
                    )}>
                      <div className="w-12 h-12 bg-surface-container-low rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-outline">image</span>
                        )}
                      </div>
                      <div>
                        <div className="font-body font-medium text-on-surface">{item.title}</div>
                        <div className="font-body text-sm text-on-surface-variant">{item.subtitle}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              {activeSearchTab !== 'recent' && (
                <div className="mt-6 pt-6 border-t border-surface-container-high">
                  <button className="text-sm font-body font-bold text-primary hover:text-primary/80 transition-colors">
                    View all {searchMenuOptions.find(o => o.id === activeSearchTab)?.label.toLowerCase()}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
