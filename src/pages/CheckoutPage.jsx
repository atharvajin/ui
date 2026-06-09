import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ESCROW_CONFIG } from '../data/constants';
import { formatCurrency } from '../utils/index';
import { cn } from '../utils';
import { useUI } from '../context/useUI';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MOCK: resolve listing from URL param  (falls back to a rich default)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FALLBACK_LISTING = {
  id: 'cd-1',
  title: 'Custom Corporate Agreements & NDAs',
  provider: 'Advocate Priya Sharma',
  price: 3500,
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  rating: '4.9',
  reviews: '124',
  category: 'Contract Drafting',
  deliveryTime: '2 Days',
  seller: {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    name: 'Advocate Priya Sharma',
  },
  terms: [
    { title: 'Revisions', content: 'Includes up to 2 rounds of revisions within 7 days of initial delivery.' },
    { title: 'Scope of Work', content: 'This service covers drafting only. Legal representation or negotiation with third parties is subject to a separate retainer.' },
    { title: 'Confidentiality', content: 'All shared information will be kept strictly confidential under attorney-client privilege.' },
  ],
};

const PLATFORM_FEE_RATE = 0.03; // 3%

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Sub-components
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Compact listing preview for the right-column Order Summary */
const MiniListingCard = ({ listing }) => (
  <div className="flex gap-4 items-start">
    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-surface-container">
      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-outline-variant font-medium mb-0.5">{listing.category}</p>
      <h3 className="font-serif text-base text-on-surface leading-snug line-clamp-2">{listing.title}</h3>
      <div className="flex items-center gap-1.5 mt-1.5">
        <img
          src={listing.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=40'}
          alt={listing.provider}
          className="w-5 h-5 rounded-full object-cover"
        />
        <span className="text-xs text-on-surface-variant font-medium">{listing.provider}</span>
        <span className="text-outline-variant">Â·</span>
        <span className="material-symbols-outlined text-[13px] text-amber-500">star</span>
        <span className="text-xs font-bold text-on-surface">{listing.rating}</span>
      </div>
    </div>
  </div>
);

/** Price breakdown rows */
const PriceBreakdown = ({ basePrice, platformFee, total }) => (
  <div className="flex flex-col gap-2.5 py-4 border-t border-surface-container">
    {[
      { label: 'Base Price', value: basePrice },
      { label: 'Platform Fee (3%)', value: platformFee },
    ].map(({ label, value }) => (
      <div key={label} className="flex justify-between text-sm">
        <span className="text-on-surface-variant font-medium">{label}</span>
        <span className="text-on-surface font-bold">{formatCurrency(value)}</span>
      </div>
    ))}
    <div className="h-px bg-outline-variant/20 my-1" />
    <div className="flex justify-between">
      <span className="font-bold text-on-surface text-base">Total</span>
      <span className="font-bold text-on-surface text-xl font-serif">{formatCurrency(total)}</span>
    </div>
  </div>
);

/** Escrow guarantee callout */
const EscrowBadge = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-[#e8faf2] border border-emerald-200 p-5">
    {/* Background shield watermark */}
    <span
      className="material-symbols-outlined absolute -right-3 -bottom-3 text-[80px] text-emerald-100 select-none pointer-events-none"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      verified_user
    </span>

    <div className="relative z-10">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
        </div>
        <h4 className="font-bold text-emerald-900 text-sm leading-tight">
          Escrow Guarantee
        </h4>
      </div>

      <ul className="flex flex-col gap-2">
        {[
          'Your payment is held securely â€” never released until you confirm delivery.',
          'Instant refund if the seller doesn\'t deliver.',
          'Raise a dispute anytime. Our team resolves it within 48 hrs.',
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-emerald-800 leading-relaxed">
            <span className="material-symbols-outlined text-emerald-500 text-[15px] mt-0.5 shrink-0">
              check_circle
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/** Minimum value non-escrow guarantee */
const BuyerGuaranteeBadge = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-[#ebecfa] border border-indigo-200 p-5">
    {/* Background shield watermark */}
    <span
      className="material-symbols-outlined absolute -right-3 -bottom-3 text-[80px] text-indigo-100 select-none pointer-events-none"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      local_police
    </span>

    <div className="relative z-10">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-indigo-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
        </div>
        <h4 className="font-bold text-indigo-900 text-sm leading-tight">
          Buyer Guarantee (Instant)
        </h4>
      </div>

      <ul className="flex flex-col gap-2">
        {[
          'Transaction value is below escrow threshold.',
          'Payment sent directly to verified seller.',
          'Instant 100% refund if code/service is invalid or not delivered.',
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-indigo-800 leading-relaxed">
            <span className="material-symbols-outlined text-indigo-500 text-[15px] mt-0.5 shrink-0">
              check_circle
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// â”€â”€â”€ Step 1: Review & Confirm Terms â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const StepTerms = ({ listing, agreed, setAgreed }) => (
  <div className="flex flex-col gap-5">
    <div className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-lowest rounded-xl p-4 border border-surface-container">
      Review the seller's terms carefully. You must accept them before proceeding.
    </div>

    {/* Terms list */}
    {listing.terms && listing.terms.length > 0 ? (
      <ul className="flex flex-col gap-3">
        {listing.terms.map((term, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-surface-container shadow-[0_1px_4px_rgba(48,51,49,0.04)]"
          >
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">gavel</span>
            <div>
              <p className="font-bold text-on-surface text-sm mb-1">{term.title}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{term.content}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="p-5 border border-dashed border-surface-container rounded-xl text-center text-on-surface-variant text-sm">
        No custom terms from this seller. Platform's{' '}
        <a href="#" className="text-primary underline">standard T&Cs</a> apply.
      </div>
    )}

    {/* Agreement checkbox (intentional friction) */}
    <label
      htmlFor="terms-agree"
      className={cn(
        'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none',
        agreed
          ? 'border-primary bg-primary-container/40'
          : 'border-outline-variant hover:border-primary/50 bg-surface-container-lowest'
      )}
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          id="terms-agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
            agreed ? 'bg-primary border-primary' : 'bg-white border-outline-variant'
          )}
        >
          {agreed && (
            <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
              check
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-on-surface leading-relaxed">
        <span className="font-bold">I agree to the Seller's Terms & Conditions</span> listed above, and to The Curator's{' '}
        <a href="#" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Platform Policy</a>.
      </p>
    </label>
  </div>
);

// â”€â”€â”€ Step 2: Guest Details â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const inputCls = (err) =>
  cn(
    'w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-surface text-on-surface',
    err ? 'border-red-400 bg-red-50' : 'border-outline-variant'
  );

const StepGuestDetails = ({ guestData, setGuestData, errors }) => {
  const update = (field) => (e) =>
    setGuestData((prev) => ({ ...prev, [field]: e.target.value }));
  const { openAuthModal } = useUI();

  return (
    <div className="flex flex-col gap-5">
      <div className="text-sm text-on-surface-variant bg-surface-container-lowest rounded-xl p-4 border border-surface-container flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[18px] text-outline">info</span>
        No account required. Your order confirmation will be sent to your email.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-on-surface mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
              person
            </span>
            <input
              id="guest-name"
              type="text"
              value={guestData.name}
              onChange={update('name')}
              placeholder="Priya Mehta"
              className={cn(inputCls(errors.name), 'pl-10')}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-on-surface mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
              mail
            </span>
            <input
              id="guest-email"
              type="email"
              value={guestData.email}
              onChange={update('email')}
              placeholder="priya@example.com"
              className={cn(inputCls(errors.email), 'pl-10')}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
        </div>

        {/* Phone (optional) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-on-surface mb-2">
            Phone <span className="text-outline-variant font-normal text-xs ml-1">(optional)</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
              phone
            </span>
            <input
              id="guest-phone"
              type="tel"
              value={guestData.phone}
              onChange={update('phone')}
              placeholder="+91 98765 43210"
              className={cn(inputCls(false), 'pl-10')}
            />
          </div>
        </div>
      </div>

      {/* Already have account */}
      <p className="text-xs text-on-surface-variant text-center">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => openAuthModal('signin')}
          className="text-primary font-bold hover:underline"
        >
          Sign in for faster checkout
        </button>
      </p>
    </div>
  );
};

// â”€â”€â”€ Step 3: Payment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PAYMENT_TABS = [
  { id: 'card', label: 'Card', icon: 'credit_card' },
  { id: 'upi', label: 'UPI', icon: 'account_balance' },
  { id: 'wallet', label: 'Wallet', icon: 'account_balance_wallet' },
];

const CardTab = ({ cardData, setCardData, errors }) => {
  const update = (f) => (e) => setCardData((p) => ({ ...p, [f]: e.target.value }));

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Card number */}
      <div>
        <label className="block text-sm font-bold text-on-surface mb-2">Card Number</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
            credit_card
          </span>
          <input
            id="card-number"
            type="text"
            inputMode="numeric"
            value={cardData.number}
            onChange={(e) => setCardData((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className={cn(inputCls(errors.cardNumber), 'pl-10 font-mono tracking-widest')}
          />
          {/* Network logos */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5 items-center opacity-70">
            <span className="text-[10px] font-black bg-[#1a1f71] text-white px-1.5 py-0.5 rounded">VISA</span>
            <span className="text-[10px] font-black text-white px-1.5 py-0.5 rounded bg-gradient-to-r from-[#eb001b] to-[#f79e1b]">MC</span>
          </div>
        </div>
        {errors.cardNumber && <p className="text-red-500 text-xs mt-1.5">{errors.cardNumber}</p>}
      </div>

      {/* Name on card */}
      <div>
        <label className="block text-sm font-bold text-on-surface mb-2">Name on Card</label>
        <input
          id="card-name"
          type="text"
          value={cardData.name}
          onChange={update('name')}
          placeholder="PRIYA MEHTA"
          className={inputCls(errors.cardName)}
        />
        {errors.cardName && <p className="text-red-500 text-xs mt-1.5">{errors.cardName}</p>}
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Expiry</label>
          <input
            id="card-expiry"
            type="text"
            inputMode="numeric"
            value={cardData.expiry}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, '').slice(0, 4);
              if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
              setCardData((p) => ({ ...p, expiry: v }));
            }}
            placeholder="MM / YY"
            maxLength={5}
            className={cn(inputCls(errors.expiry), 'font-mono tracking-widest')}
          />
          {errors.expiry && <p className="text-red-500 text-xs mt-1.5">{errors.expiry}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">CVV</label>
          <div className="relative">
            <input
              id="card-cvv"
              type="password"
              inputMode="numeric"
              value={cardData.cvv}
              onChange={(e) => setCardData((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
              placeholder="â€¢â€¢â€¢"
              maxLength={4}
              className={cn(inputCls(errors.cvv), 'font-mono')}
            />
            <span
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant text-[16px] cursor-help"
              title="3-digit security code on the back of your card"
            >
              help_outline
            </span>
          </div>
          {errors.cvv && <p className="text-red-500 text-xs mt-1.5">{errors.cvv}</p>}
        </div>
      </div>

      {/* Save card nudge */}
      <label className="flex items-center gap-2.5 cursor-pointer group">
        <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
        <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
          Save card for future checkouts (requires account)
        </span>
      </label>
    </div>
  );
};

const UpiTab = ({ upiId, setUpiId, error }) => (
  <div className="flex flex-col gap-5">
    {/* Popular UPI apps */}
    <div>
      <p className="text-xs font-bold text-outline-variant uppercase tracking-wider mb-3">Pay with</p>
      <div className="grid grid-cols-4 gap-3">
        {[
          { name: 'GPay', bg: 'bg-white', emoji: 'ðŸ‡¬', border: true },
          { name: 'PhonePe', bg: 'bg-[#5f259f]', emoji: 'ðŸ“±', light: true },
          { name: 'Paytm', bg: 'bg-[#00b9f1]', emoji: 'ðŸ’³', light: true },
          { name: 'BHIM', bg: 'bg-[#f26522]', emoji: 'ðŸ¦', light: true },
        ].map((app) => (
          <button
            key={app.name}
            onClick={() => setUpiId('')}
            className={cn(
              'flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95',
              app.border ? 'border-outline-variant' : 'border-transparent',
              app.bg
            )}
          >
            <span className="text-xl">{app.emoji}</span>
            <span className={cn('text-xs font-bold', app.light ? 'text-white' : 'text-on-surface')}>{app.name}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-outline-variant/30" />
      <span className="text-xs text-outline-variant">or enter UPI ID</span>
      <div className="h-px flex-1 bg-outline-variant/30" />
    </div>

    {/* UPI ID input */}
    <div>
      <label className="block text-sm font-bold text-on-surface mb-2">UPI ID</label>
      <div className="relative">
        <input
          id="upi-id"
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourname@upi"
          className={cn(inputCls(error), 'pr-24')}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors">
          Verify
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
      <p className="text-xs text-on-surface-variant mt-2">
        A collect request will be sent to your UPI app.
      </p>
    </div>
  </div>
);

const WalletTab = ({ selectedWallet, setSelectedWallet }) => {
  const wallets = [
    { id: 'mobikwik', name: 'MobiKwik', balance: 'â‚¹ 320', color: 'bg-[#0066cc]' },
    { id: 'freecharge', name: 'FreeCharge', balance: 'â‚¹ 0', color: 'bg-[#ff5722]' },
    { id: 'airtel', name: 'Airtel Money', balance: 'â‚¹ 1,200', color: 'bg-[#e40000]' },
    { id: 'amazon', name: 'Amazon Pay', balance: 'â‚¹ 50', color: 'bg-[#ff9900]' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-on-surface-variant">
        Select a wallet. You may need to top up if the balance is insufficient.
      </p>
      {wallets.map((w) => (
        <label
          key={w.id}
          htmlFor={`wallet-${w.id}`}
          className={cn(
            'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
            selectedWallet === w.id
              ? 'border-primary bg-primary-container/30'
              : 'border-surface-container hover:border-outline-variant'
          )}
        >
          <input
            type="radio"
            id={`wallet-${w.id}`}
            name="wallet"
            value={w.id}
            checked={selectedWallet === w.id}
            onChange={() => setSelectedWallet(w.id)}
            className="sr-only"
          />
          {/* Color swatch */}
          <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', w.color)}>
            <span className="material-symbols-outlined text-white text-[18px]">account_balance_wallet</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-on-surface text-sm">{w.name}</p>
            <p className="text-xs text-on-surface-variant">Balance: {w.balance}</p>
          </div>
          {/* Radio indicator */}
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              selectedWallet === w.id ? 'border-primary' : 'border-outline-variant'
            )}
          >
            {selectedWallet === w.id && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

const StepPayment = ({ paymentData, setPaymentData, errors }) => {
  const [activeTab, setActiveTab] = useState('card');

  return (
    <div className="flex flex-col gap-5">
      {/* Simulated SSL notice */}
      <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
        <span className="material-symbols-outlined text-[16px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
          https
        </span>
        256-bit SSL encrypted. Your payment details are never stored on our servers.
      </div>

      {/* Payment Method Tabs */}
      <div className="flex p-1 bg-surface-container-low rounded-xl border border-surface-container">
        {PAYMENT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200',
              activeTab === tab.id
                ? 'bg-white shadow-sm text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'card' && (
          <CardTab
            cardData={paymentData.card}
            setCardData={(updater) =>
              setPaymentData((prev) => ({
                ...prev,
                card: typeof updater === 'function' ? updater(prev.card) : updater,
              }))
            }
            errors={errors}
          />
        )}
        {activeTab === 'upi' && (
          <UpiTab
            upiId={paymentData.upiId}
            setUpiId={(val) => setPaymentData((p) => ({ ...p, upiId: val }))}
            error={errors.upiId}
          />
        )}
        {activeTab === 'wallet' && (
          <WalletTab
            selectedWallet={paymentData.wallet}
            setSelectedWallet={(val) => setPaymentData((p) => ({ ...p, wallet: val }))}
          />
        )}
      </div>
    </div>
  );
};

// â”€â”€â”€ Checkout Step Accordion wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CheckoutStep = ({ number, title, icon, isActive, isCompleted, onEdit, children }) => (
  <div
    className={cn(
      'rounded-2xl border transition-all duration-300',
      isActive
        ? 'border-primary/30 shadow-[0_4px_20px_rgba(48,51,49,0.06)]'
        : isCompleted
        ? 'border-surface-container bg-white'
        : 'border-surface-container bg-surface-container-lowest opacity-60'
    )}
  >
    {/* Step header */}
    <div className="flex items-center gap-4 p-5">
      <div
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors',
          isCompleted
            ? 'bg-primary text-white'
            : isActive
            ? 'bg-primary text-white ring-4 ring-primary/20'
            : 'bg-surface-container text-outline-variant'
        )}
      >
        {isCompleted ? (
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check
          </span>
        ) : (
          number
        )}
      </div>
      <div className="flex-1 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{icon}</span>
        <h2 className={cn('font-bold text-base', isActive ? 'text-on-surface' : 'text-on-surface-variant')}>
          {title}
        </h2>
      </div>
      {isCompleted && (
        <button
          onClick={onEdit}
          className="text-xs text-primary font-bold hover:underline flex items-center gap-1 shrink-0"
        >
          <span className="material-symbols-outlined text-[14px]">edit</span>
          Edit
        </button>
      )}
    </div>

    {/* Step body */}
    {isActive && (
      <div className="px-5 pb-6 border-t border-surface-container pt-5">
        {children}
      </div>
    )}
    {isCompleted && !isActive && (
      <div className="px-5 pb-4 text-sm text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
        Completed
      </div>
    )}
  </div>
);

// â”€â”€â”€ Payment Success Screen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PaymentSuccess = ({ listing, total, guestEmail }) => (
  <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4 py-16 relative overflow-hidden">
    {/* Subtle confetti BG */}
    <div className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(76,175,80,0.15), transparent)`,
      }}
    />

    <div className="max-w-lg w-full text-center flex flex-col items-center gap-6 animate-[fadeInUp_0.5s_ease-out]">
      {/* Animated success ring */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-50" />
        <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center z-10">
          <span
            className="material-symbols-outlined text-6xl text-emerald-600"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
      </div>

      <div>
        <h1 className="font-serif text-4xl text-on-surface mb-2">Payment Confirmed!</h1>
        <p className="text-on-surface-variant text-base leading-relaxed">
          Your order is placed and funds are now held securely in escrow.
          <br />
          A confirmation has been sent to <span className="font-bold text-on-surface">{guestEmail || 'your email'}</span>.
        </p>
      </div>

      {/* Order summary pill */}
      <div className="w-full bg-white rounded-2xl border border-surface-container p-5 flex items-center gap-4 text-left shadow-sm">
        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-outline-variant mb-0.5">{listing.category}</p>
          <p className="font-bold text-on-surface text-sm line-clamp-1">{listing.title}</p>
          <p className="text-xs text-on-surface-variant mt-0.5">by {listing.provider}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-outline-variant">Total Paid</p>
          <p className="font-serif font-bold text-lg text-on-surface">{formatCurrency(total)}</p>
        </div>
      </div>

      {/* Escrow status banner */}
      <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-left">
        <span className="material-symbols-outlined text-emerald-600 text-[22px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
          shield
        </span>
        <div>
          <p className="font-bold text-emerald-900 text-sm">Funds in Escrow</p>
          <p className="text-xs text-emerald-800 mt-0.5">
            Funds will be released to the seller only after you confirm delivery.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-xs font-bold text-outline-variant uppercase tracking-wider">What happens next?</p>
        {[
          { icon: 'notifications_active', text: 'The seller is notified immediately and will begin work.' },
          { icon: 'check_box', text: 'Confirm delivery when done â€” funds are released to the seller.' },
          { icon: 'support_agent', text: 'Need help? Raise a dispute any time from your dashboard.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-left">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">{item.icon}</span>
            <span className="text-on-surface-variant leading-relaxed">{item.text}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
        <Link
          to={`/listing/${listing.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 h-14 px-6 bg-primary text-white font-bold text-base rounded-2xl hover:bg-primary/90 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          View Listing
        </Link>
        <Link
          to="/"
          className="flex-1 inline-flex items-center justify-center gap-2 h-14 px-6 border-2 border-outline-variant text-on-surface font-bold text-base rounded-2xl hover:bg-surface-container hover:border-outline transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">store</span>
          Browse Marketplace
        </Link>
      </div>
    </div>
  </div>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MAIN CheckoutPage
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CheckoutPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [listing, setListing] = useState(FALLBACK_LISTING);
  const [activeStep, setActiveStep] = useState(1);       // 1 | 2 | 3
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1
  const [agreed, setAgreed] = useState(false);
  // Step 2
  const [guestData, setGuestData] = useState({ name: '', email: '', phone: '' });
  // Step 3
  const [paymentData, setPaymentData] = useState({
    card: { number: '', name: '', expiry: '', cvv: '' },
    upiId: '',
    wallet: 'mobikwik',
  });
  const [formErrors, setFormErrors] = useState({});

  // Try to resolve listing from mock data by ID
  useEffect(() => {
    window.scrollTo(0, 0);
    if (listingId) {
      // In a real app: fetch from API. For now, keep fallback if no match.
      import('../data/mockData').then((mod) => {
        const allArrays = Object.values(mod).filter(Array.isArray);
        for (const arr of allArrays) {
          const found = arr.find((item) => item?.id === listingId);
          if (found) { setListing(found); break; }
        }
      });
    }
  }, [listingId]);

  const tierIdx = searchParams.get('tier');
  let basePrice = listing.price || 0;
  const variants = listing.tiers || listing.packages;
  if (variants && tierIdx !== null && variants[tierIdx]) {
    basePrice = variants[tierIdx].price;
  }

  const platformFee = Math.round(basePrice * PLATFORM_FEE_RATE);
  const total = basePrice + platformFee;

  // â”€â”€ Step advance logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleContinueStep1 = () => {
    if (!agreed) {
      setFormErrors({ agreed: 'You must accept the terms to continue.' });
      return;
    }
    setFormErrors({});
    setCompletedSteps((prev) => new Set([...prev, 1]));
    setActiveStep(2);
    setTimeout(() => document.getElementById('step-2-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleContinueStep2 = () => {
    const errs = {};
    if (!guestData.name.trim()) errs.name = 'Name is required.';
    if (!guestData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestData.email)) errs.email = 'Enter a valid email.';
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setFormErrors({});
    setCompletedSteps((prev) => new Set([...prev, 2]));
    setActiveStep(3);
    setTimeout(() => document.getElementById('step-3-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay, then navigate to order success page
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-success', { replace: true });
    }, 2200);
  };



  return (
    <div className="min-h-screen bg-[#f8faf9] font-body">
      {/* â”€â”€â”€ Page Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-white border-b border-surface-container sticky top-0 z-30 shadow-[0_1px_8px_rgba(48,51,49,0.04)]">
        <div className="page-container py-4 flex items-center justify-between">
          <Link to={`/listing/${listing.id}`} className="flex items-center gap-1.5 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to listing
          </Link>
          <span className="font-serif italic text-lg text-on-surface">Secure Checkout</span>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            SSL Encrypted
          </div>
        </div>
      </div>

      {/* â”€â”€â”€ Main Split Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="page-container py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">

          {/* â•â• LEFT COLUMN: Checkout Steps (8/12) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          <div className="lg:col-span-8 flex flex-col gap-5 mb-8 lg:mb-0">
            {/* Progress breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-1">
              {['Review Terms', 'Your Details', 'Payment'].map((label, i) => (
                <React.Fragment key={label}>
                  <span
                    className={cn(
                      'font-bold',
                      activeStep === i + 1
                        ? 'text-primary'
                        : completedSteps.has(i + 1)
                        ? 'text-on-surface'
                        : 'text-outline-variant'
                    )}
                  >
                    {label}
                  </span>
                  {i < 2 && <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>}
                </React.Fragment>
              ))}
            </div>

            {/* â”€â”€â”€ Step 1: Terms â”€â”€â”€ */}
            <div id="step-1-anchor">
              <CheckoutStep
                number={1}
                title="Review Seller's Terms"
                icon="gavel"
                isActive={activeStep === 1}
                isCompleted={completedSteps.has(1)}
                onEdit={() => { setActiveStep(1); setCompletedSteps(new Set([...completedSteps].filter(s => s !== 1))); }}
              >
                <StepTerms listing={listing} agreed={agreed} setAgreed={setAgreed} />
                {formErrors.agreed && (
                  <p className="text-red-500 text-sm mt-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {formErrors.agreed}
                  </p>
                )}
                <button
                  onClick={handleContinueStep1}
                  className="mt-5 w-full h-12 flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all"
                >
                  Continue to Your Details
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </CheckoutStep>
            </div>

            {/* â”€â”€â”€ Step 2: Guest Details â”€â”€â”€ */}
            <div id="step-2-anchor">
              <CheckoutStep
                number={2}
                title="Your Details"
                icon="person"
                isActive={activeStep === 2}
                isCompleted={completedSteps.has(2)}
                onEdit={() => { setActiveStep(2); setCompletedSteps(new Set([...completedSteps].filter(s => s !== 2 && s !== 3))); }}
              >
                <StepGuestDetails guestData={guestData} setGuestData={setGuestData} errors={formErrors} />
                <button
                  onClick={handleContinueStep2}
                  className="mt-5 w-full h-12 flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all"
                >
                  Continue to Payment
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </CheckoutStep>
            </div>

            {/* â”€â”€â”€ Step 3: Payment â”€â”€â”€ */}
            <div id="step-3-anchor">
              <CheckoutStep
                number={3}
                title="Payment"
                icon="credit_card"
                isActive={activeStep === 3}
                isCompleted={completedSteps.has(3)}
                onEdit={() => setActiveStep(3)}
              >
                <StepPayment paymentData={paymentData} setPaymentData={setPaymentData} errors={formErrors} />

                {/* Sticky Pay Button within left column */}
                <div className="mt-6 sticky bottom-6">
                  <button
                    id="pay-button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className={cn(
                      'w-full h-16 flex items-center justify-center gap-3 font-bold text-lg rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(48,51,49,0.15)] hover:shadow-[0_6px_30px_rgba(48,51,49,0.2)]',
                      isProcessing
                        ? 'bg-primary/70 text-white/80 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99]'
                    )}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Processing paymentâ€¦
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[22px]">lock</span>
                        Pay {formatCurrency(total)} Securely
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-on-surface-variant mt-2.5">
                    By paying, you agree to The Curator's{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </div>
              </CheckoutStep>
            </div>
          </div>

          {/* â•â• RIGHT COLUMN: Order Summary (4/12) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_20px_rgba(48,51,49,0.04)] p-5 flex flex-col gap-5">
                <h2 className="font-bold text-on-surface text-base">Order Summary</h2>

                {/* Mini listing */}
                <MiniListingCard listing={listing} />

                {/* Delivery info pill */}
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  <span>Estimated delivery: <span className="font-bold text-on-surface">{listing.deliveryTime}</span></span>
                </div>

                {/* Price breakdown */}
                <PriceBreakdown basePrice={basePrice} platformFee={platformFee} total={total} />
              </div>

              {/* Escrow Guarantee / Buyer Guarantee */}
              {basePrice >= ESCROW_CONFIG.MINIMUM_ESCROW_VALUE || !listing.minimumEscrowValue ? (
                <EscrowBadge />
              ) : (
                <BuyerGuaranteeBadge />
              )}

              {/* Trust logos */}
              <div className="flex items-center justify-center gap-4 opacity-50">
                {['Verified', 'Encrypted', 'Protected'].map((label) => (
                  <div key={label} className="text-center">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant block">
                      {label === 'Verified' ? 'verified' : label === 'Encrypted' ? 'lock' : 'shield'}
                    </span>
                    <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>

              {/* Help link */}
              <p className="text-xs text-center text-on-surface-variant">
                Have a question?{' '}
                <a href="#" className="text-primary font-bold hover:underline">
                  Chat with support
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

