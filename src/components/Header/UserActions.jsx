import React from 'react';
import { useAuth } from '../../context/useAuth';
import { useUI } from '../../context/useUI';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';

const UserActions = () => {
  const { user, setUser } = useAuth();
  const { setIsMobileNavOpen, openAuthModal } = useUI();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser({ isLoggedIn: false, role: 'Guest', name: '' });
  };

  // Normalise role to title-case for comparison
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : 'Guest';

  const isAuthenticated = user?.isLoggedIn && ['Buyer', 'Seller', 'Agent'].includes(role);
  const dashboardTab = role === 'Agent' ? 'agent' : 'buying';

  return (
    <div className="flex items-center gap-2 md:gap-3 shrink-0 relative z-50">

      {/* Create Listing â€” logged-in sellers only */}
      {isAuthenticated && role === 'Seller' && (
        <Link to="/create-listing" className="hidden md:block">
          <Button variant="primary" size="sm">Create Listing</Button>
        </Link>
      )}

      {/* Icon actions â€” logged in */}
      {isAuthenticated && (
        <>
          <button
            className="hidden md:flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
          </button>
          <button
            className="hidden md:flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors"
            title="Inbox"
          >
            <span className="material-symbols-outlined text-xl">inbox</span>
          </button>
          <button
            className="hidden md:flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors"
            title="Cart"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
          </button>
        </>
      )}

      {/* Auth section */}
      {isAuthenticated ? (
        /* My Dashboard + Avatar pill */
        <div className="hidden md:flex items-center gap-2">
          {/* My Dashboard CTA */}
          <button
            onClick={() => navigate(`/dashboard?tab=${dashboardTab}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              dashboard
            </span>
            My Dashboard
          </button>

          {/* Avatar + sign-out */}
          <div className="flex items-center gap-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-surface-container-high text-on-surface font-body font-bold text-sm hover:bg-surface-container-highest transition-all hover:shadow-sm"
              title="Account"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#1a6b47] flex items-center justify-center text-white font-bold text-xs shrink-0">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden lg:block">{user.name?.split(' ')[0] || 'Account'}</span>
            </Link>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      ) : (
        /* Guest â€” Sign In + Join Free */
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => openAuthModal('signin')}
            className="px-4 py-2 rounded-full text-on-surface font-bold text-sm hover:bg-surface-container transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className="px-4 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
          >
            Join Free
          </button>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors"
        onClick={() => setIsMobileNavOpen(true)}
        aria-label="Open menu"
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>
    </div>
  );
};

export default UserActions;


