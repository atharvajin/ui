import React, { useState, useEffect } from 'react';
import { cn } from '../utils';
import { useUI } from '../context/useUI';
import { useAuth } from '../context/useAuth';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PASSWORD STRENGTH
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const getStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8)          score++;
  if (/[A-Z]/.test(pw))       score++;
  if (/[0-9]/.test(pw))       score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  return score;
};

const strengthMeta = [
  { label: '',         color: 'bg-surface-container' },
  { label: 'Weak',     color: 'bg-red-400'     },
  { label: 'Fair',     color: 'bg-amber-400'   },
  { label: 'Good',     color: 'bg-blue-400'    },
  { label: 'Strong',   color: 'bg-emerald-500' },
];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SOCIAL BUTTON
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SocialBtn = ({ logo, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-3 w-full h-11 rounded-xl border border-outline-variant bg-white hover:bg-surface-container active:scale-[0.99] transition-all text-sm font-bold text-on-surface shadow-[0_1px_4px_rgba(48,51,49,0.06)]"
  >
    {logo}
    <span>{label}</span>
  </button>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FIELD
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Field = ({ label, id, type = 'text', value, onChange, placeholder, error, suffix, required }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-xs font-bold text-on-surface">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
        className={cn(
          'w-full rounded-xl border py-3 px-4 text-sm text-on-surface bg-white outline-none transition-all',
          'focus:ring-2 focus:ring-primary/20 focus:border-primary',
          suffix && 'pr-11',
          error
            ? 'border-red-400 bg-red-50/40 focus:ring-red-200 focus:border-red-400'
            : 'border-outline-variant'
        )}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
      )}
    </div>
    {error && <p className="text-red-500 text-[11px] font-medium">{error}</p>}
  </div>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AUTH MODAL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AuthModal = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, addToast } = useUI();
  const { setUser } = useAuth();

  // Form state
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed]     = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const isSignIn = authModalMode === 'signin';

  // Reset form when mode/open changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setName('');
      setEmail('');
      setPassword('');
      setAgreed(false);
      setShowPw(false);
      setErrors({});
    }, 0);
    return () => clearTimeout(timer);
  }, [authModalMode, isAuthModalOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isAuthModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isAuthModalOpen]);

  // Escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const h = (e) => { if (e.key === 'Escape') closeAuthModal(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isAuthModalOpen, closeAuthModal]);

  const validate = () => {
    const e = {};
    if (!isSignIn && name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.';
    if (!password || password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!isSignIn && !agreed) e.agreed = 'You must agree to continue.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulated auth
    setTimeout(() => {
      setUser({ isLoggedIn: true, role: 'seller', name: isSignIn ? 'Dhruv Jain' : name });
      setLoading(false);
      closeAuthModal();
      addToast(isSignIn ? 'ðŸ‘‹ Welcome back, Dhruv!' : `ðŸŽ‰ Account created! Welcome, ${name.split(' ')[0]}!`);
    }, 1200);
  };

  const strength = getStrength(password);
  const sMeta    = strengthMeta[strength];

  if (!isAuthModalOpen) return null;

  return (
    <>
      {/* â”€â”€ Backdrop â”€â”€ */}
      <div
        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* â”€â”€ Modal Panel â”€â”€ */}
      <div
        className="fixed inset-0 z-[301] flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={isSignIn ? 'Sign In' : 'Create Account'}
      >
        <div
          className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_0.25s_ease-out]"
          onClick={e => e.stopPropagation()}
        >
          {/* â”€â”€ Header â”€â”€ */}
          <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-surface-container">
            <div>
              {/* Brand micro-logo */}
              <p className="font-serif italic text-primary text-sm mb-1 tracking-wide">The Curator</p>
              <h2 className="font-serif text-2xl font-bold text-on-surface leading-tight">
                {isSignIn ? 'Welcome back' : 'Join today'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {isSignIn
                  ? 'Sign in to manage orders, listings & your wallet.'
                  : 'Create a free account. No credit card required.'}
              </p>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-2 -mr-1 -mt-1 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors shrink-0"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* â”€â”€ Scrollable body â”€â”€ */}
          <div className="overflow-y-auto flex-1 px-7 py-5 flex flex-col gap-5 custom-scrollbar">

            {/* Social login */}
            <div className="flex flex-col gap-2.5">
              <SocialBtn
                label={`${isSignIn ? 'Sign in' : 'Continue'} with Google`}
                logo={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                }
                onClick={() => {}}
              />
              <SocialBtn
                label={`${isSignIn ? 'Sign in' : 'Continue'} with Apple`}
                logo={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                }
                onClick={() => {}}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-surface-container" />
              <span className="text-[11px] font-bold text-outline-variant uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-surface-container" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

              {/* Full Name â€” signup only */}
              {!isSignIn && (
                <Field
                  id="auth-name"
                  label="Full Name"
                  placeholder="e.g. Dhruv Jain"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: null })); }}
                  error={errors.name}
                  required
                />
              )}

              {/* Email */}
              <Field
                id="auth-email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: null })); }}
                error={errors.email}
                required
              />

              {/* Password */}
              <Field
                id="auth-password"
                label="Password"
                type={showPw ? 'text' : 'password'}
                placeholder={isSignIn ? 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢' : 'Min. 8 characters'}
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: null })); }}
                error={errors.password}
                required
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="text-outline-variant hover:text-on-surface transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">{showPw ? 'visibility_off' : 'visibility'}</span>
                  </button>
                }
              />

              {/* Password strength â€” signup only */}
              {!isSignIn && password && (
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className={cn('h-1.5 flex-1 rounded-full transition-all duration-300', i <= strength ? sMeta.color : 'bg-surface-container')}
                      />
                    ))}
                  </div>
                  {sMeta.label && (
                    <p className={cn('text-[11px] font-bold', strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-amber-600' : strength === 3 ? 'text-blue-600' : 'text-emerald-600')}>
                      {sMeta.label} password
                    </p>
                  )}
                </div>
              )}

              {/* Forgot password â€” sign in only */}
              {isSignIn && (
                <div className="-mt-1 flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Terms checkbox â€” signup only */}
              {!isSignIn && (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={e => { setAgreed(e.target.checked); setErrors(p => ({ ...p, agreed: null })); }}
                      className="w-4.5 h-4.5 rounded border-outline-variant accent-primary cursor-pointer"
                    />
                  </div>
                  <span className={cn('text-xs leading-relaxed', errors.agreed ? 'text-red-500' : 'text-on-surface-variant')}>
                    I agree to the{' '}
                    <button type="button" className="text-primary font-bold hover:underline">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-primary font-bold hover:underline">Privacy Policy</button>
                    {errors.agreed && <span className="block text-red-500 mt-0.5">{errors.agreed}</span>}
                  </span>
                </label>
              )}

              {/* Escrow trust note */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="material-symbols-outlined text-emerald-600 text-[17px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <p className="text-[11px] text-emerald-700 leading-snug">All transactions are <strong>escrow-protected</strong>. Your money is safe until delivery is confirmed.</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'w-full h-12 flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all',
                  loading
                    ? 'bg-primary/60 text-white cursor-wait'
                    : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm'
                )}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    {isSignIn ? 'Signing inâ€¦' : 'Creating accountâ€¦'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isSignIn ? 'login' : 'person_add'}
                    </span>
                    {isSignIn ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>

            {/* Mode toggle */}
            <p className="text-center text-sm text-on-surface-variant pb-1">
              {isSignIn ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => openAuthModal(isSignIn ? 'signup' : 'signin')}
                className="font-bold text-primary hover:underline"
              >
                {isSignIn ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;



