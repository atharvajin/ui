import React, { useState, useCallback } from 'react';
import { UIContext } from './uiContextStore';

export const UIProvider = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen]    = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toasts, setToasts]                       = useState([]);

  // ── Auth modal ──────────────────────────────────────────────────────────
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode]     = useState('signin'); // 'signin' | 'signup'

  const openAuthModal  = useCallback((mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);
  // ────────────────────────────────────────────────────────────────────────

  const openMobileNav  = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  const openSearchModal  = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const addToast = useCallback((message, type = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <UIContext.Provider value={{
      isMobileNavOpen,
      setIsMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      isSearchModalOpen,
      setIsSearchModalOpen,
      openSearchModal,
      closeSearchModal,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,
      toasts,
      addToast,
      removeToast,
    }}>
      {children}

      {/* Global Toast Container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in-up pointer-events-auto">
            {toast.message}
          </div>
        ))}
      </div>
    </UIContext.Provider>
  );
};
