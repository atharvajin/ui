import React, { useState } from 'react';
import { cn } from '../../utils';
import { searchMenuOptions, searchResultsMock } from '../../data/searchData';
import { useUI } from '../../context/useUI';
import { useNavigate } from 'react-router-dom';

const MobileSearchModal = () => {
  const { isSearchModalOpen, setIsSearchModalOpen } = useUI();
  const [activeSearchTab, setActiveSearchTab] = useState('trending');
  const results = searchResultsMock[activeSearchTab] || searchResultsMock['trending'];
  const navigate = useNavigate();

  const handleResultClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    setIsSearchModalOpen(false);
  };

  return (
    <div className={cn(
      "fixed inset-0 bg-surface z-[60] flex flex-col transition-transform duration-300 md:hidden",
      isSearchModalOpen ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="flex items-center gap-4 p-4 border-b border-surface-container-high bg-surface">
        <button
          onClick={() => setIsSearchModalOpen(false)}
          className="p-2 -ml-2 rounded-full hover:bg-surface-container text-on-surface"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1 flex items-center bg-surface-container-low rounded-full px-4 py-2">
          <span className="material-symbols-outlined text-outline text-lg mr-2">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-base w-full font-body outline-none"
            placeholder="Search..."
            autoFocus={isSearchModalOpen}
          />
        </div>
      </div>

      <div className="flex overflow-x-auto p-4 gap-2 border-b border-surface-container-high scrollbar-hide">
        {searchMenuOptions.map(option => (
          <button
            key={option.id}
            onClick={() => setActiveSearchTab(option.id)}
            className={cn(
              "px-4 py-2 rounded-full whitespace-nowrap text-sm font-body font-medium transition-colors",
              activeSearchTab === option.id
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <ul className="flex flex-col gap-2">
          {results.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleResultClick(item)}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-surface-container transition-colors text-left"
              >
                <div className="w-12 h-12 bg-surface-container-low rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-outline">image</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-medium text-on-surface">{item.title}</div>
                  <div className="font-body text-sm text-on-surface-variant truncate">{item.subtitle}</div>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">chevron_right</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileSearchModal;

