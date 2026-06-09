import React, { useState } from 'react';
import { cn } from '../utils';
import SearchBar from './Header/SearchBar';
import DesktopNav from './Header/DesktopNav';
import MobileNavModal from './Header/MobileNavModal';
import UserActions from './Header/UserActions';
import MobileSearchModal from './Header/MobileSearchModal';
import { Link } from 'react-router-dom';
import { useUI } from '../context/useUI';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setIsSearchModalOpen } = useUI();

  return (
    <>
      {/* Search Overlay Background */}
      <div
        className={cn(
          "fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300",
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

                  <header className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        isSearchOpen ? "bg-surface border-b border-surface-container shadow-sm" : "bg-surface/80 dark:bg-on-surface/80 backdrop-blur-xl shadow-[0_40px_40px_0_rgba(48,51,49,0.06)]"
      )}>
        <div className="flex items-center justify-between page-container py-3 relative gap-6 border-b border-surface-container/30">
          <Link className="text-2xl font-serif italic text-on-surface dark:text-surface whitespace-nowrap z-50 shrink-0" to="/" onClick={() => setIsSearchOpen(false)}>
            The Curator
          </Link>

          <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

          {/* Mobile Search Icon */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors ml-auto mr-2 shrink-0"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>

          <UserActions />

        </div>
        <DesktopNav />
      </header>

      {/* spacer to prevent content from going under fixed header */}
      <div className="h-[72px] md:h-[80px]" />

      <MobileNavModal />
      <MobileSearchModal />
    </>
  );
};

export default Header;

