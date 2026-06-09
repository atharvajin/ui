import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils';
import { navLinks } from './navLinks';
import { useUI } from '../../context/useUI';
import { useAuth } from '../../context/useAuth';

const MobileNavModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileNavOpen, setIsMobileNavOpen, openAuthModal } = useUI();
  const { user, setUser } = useAuth();

  const close = () => setIsMobileNavOpen(false);

  // Normalise role
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : 'Guest';

  const isAuthenticated = user?.isLoggedIn && ['Buyer', 'Seller', 'Agent'].includes(role);
  const dashboardTab = role === 'Agent' ? 'agent' : 'buying';

  const handleDashboard = () => {
    navigate(`/dashboard?tab=${dashboardTab}`);
    close();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden",
          isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[80%] max-w-sm bg-surface z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileNavOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-container-high">
          <span className="font-serif italic text-xl">Menu</span>
          <button onClick={close} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* User identity strip â€” authenticated only */}
        {isAuthenticated && (
          <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-lowest flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#1a6b47] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">{user.name || 'Account'}</p>
              <p className="text-xs text-on-surface-variant capitalize">{role}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="p-6 flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-2 font-body text-base font-medium text-on-surface">
            {navLinks.map((link) => {
              const isActive = link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
              return (
                <li key={link.path}>
                  <a
                    href={link.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 transition-colors px-4 py-3 rounded-xl",
                      isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary hover:bg-surface-container"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) {
                        window.scrollTo(0, 0);
                        if (location.pathname !== link.path) {
                          navigate(link.path);
                        }
                      } else {
                        navigate(link.path);
                        window.scrollTo(0, 0);
                      }
                      close();
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth footer */}
        <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              {/* My Dashboard â€” prominent CTA */}
              <button
                onClick={handleDashboard}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary text-white font-body font-bold hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                My Dashboard
              </button>
              <button
                onClick={() => { setUser({ isLoggedIn: false, role: 'Guest', name: '' }); close(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-outline-variant text-on-surface-variant font-body font-bold hover:bg-surface-container transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { openAuthModal('signup'); close(); }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary text-on-primary font-body font-bold hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">person_add</span>
                Join Free
              </button>
              <button
                onClick={() => { openAuthModal('signin'); close(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-outline-variant text-on-surface font-body font-bold hover:bg-surface-container transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavModal;


