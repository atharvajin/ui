import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/index';
import { cn } from '../../utils';
import Button from '../Button';
import OrderChatModal from '../OrderChatModal';

// A listing is "negotiable" if it has `allowNegotiation: true`
// OR its category string matches physical goods / art-craft variants
const isNegotiable = (listing) => {
  if (listing.allowNegotiation) return true;
  const cat = (listing.category || '').toLowerCase();
  return cat.includes('physical') || cat.includes('art') || cat.includes('craft') || cat.includes('goods');
};

const StickyActionBoard = ({ listing, isSalesAgent }) => {
  const [selectedPackage, setSelectedPackage] = useState(0);

  // Chat / negotiate modal state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMode, setChatMode] = useState('chat'); // 'chat' | 'negotiate'

  const openChat = () => { setChatMode('chat'); setChatOpen(true); };
  const openNegotiate = () => { setChatMode('negotiate'); setChatOpen(true); };

  const negotiable = isNegotiable(listing);

  const sellerAvatar =
    listing.seller?.avatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=60&auto=format&fit=crop';
  const sellerName = listing.seller?.name || listing.provider || 'Seller';

  return (
    <>
      <div className="sticky top-28 bg-white rounded-2xl border border-surface-container shadow-sm p-6 flex flex-col gap-6">

        {/* Header */}
        <div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <h1 className="text-2xl font-headline font-bold text-on-surface leading-tight">
              {listing.title || listing.provider}
            </h1>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
                aria-label="Save"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
              </button>
            </div>
          </div>
          <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded-full font-medium">
            {listing.category || 'Service'}
          </span>
          {negotiable && (
            <span className="ml-2 inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold border border-amber-200">
              Negotiable
            </span>
          )}
        </div>

        {/* Pricing & Variants */}
        {(listing.tiers || listing.packages) ? (
          <div className="flex flex-col gap-3">
            <div className="flex p-1 bg-surface-container-low rounded-lg">
              {(listing.tiers || listing.packages).map((pkg, idx) => (
                <button
                  key={idx}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedPackage === idx
                      ? 'bg-white shadow-sm text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  onClick={() => setSelectedPackage(idx)}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-on-surface mb-2">
                {formatCurrency((listing.tiers || listing.packages)[selectedPackage].price)}
              </div>
              <p className="text-sm text-on-surface-variant mb-4">
                {(listing.tiers || listing.packages)[selectedPackage].description}
              </p>
              <ul className="space-y-2 mb-4 text-sm">
                {(listing.tiers || listing.packages)[selectedPackage].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                    <span className="text-on-surface">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <div className="text-2xl font-bold text-on-surface mb-2">
              {formatCurrency(listing.price)}
            </div>
          </div>
        )}

        {/* Configurator */}
        {listing.configurator && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface">{listing.configurator.label}</label>
            {listing.configurator.type === 'date-time' ? (
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 rounded-lg border-outline-variant py-2 px-3 text-sm focus:ring-primary focus:border-primary"
                />
                <input
                  type="time"
                  className="flex-1 rounded-lg border-outline-variant py-2 px-3 text-sm focus:ring-primary focus:border-primary"
                />
              </div>
            ) : (
              <input
                type="text"
                placeholder="Enter details..."
                className="w-full rounded-lg border-outline-variant py-2 px-3 text-sm focus:ring-primary focus:border-primary"
              />
            )}
          </div>
        )}

        {/* ── CTA Buttons ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-2.5">
          {/* Primary CTA — Checkout */}
          <Link to={`/checkout/${listing.id}?tier=${selectedPackage}`} className="w-full">
            <Button variant="primary" size="lg" className="w-full">
              Continue to Checkout
            </Button>
          </Link>

          {/* Secondary CTAs row */}
          <div className="flex gap-2">
            {/* Negotiate Price — opens modal in offer mode instead of navigating */}
            {negotiable ? (
              <button
                onClick={openNegotiate}
                className="flex-1 h-11 flex items-center justify-center gap-1.5 border-2 border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold text-sm rounded-xl transition-all active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[16px]">local_offer</span>
                Negotiate Price
              </button>
            ) : null}

            {/* Message Seller */}
            <button
              onClick={openChat}
              className={cn(
                'h-11 flex items-center justify-center gap-1.5 border-2 border-outline-variant text-on-surface hover:bg-surface-container font-bold text-sm rounded-xl transition-all active:scale-[0.99]',
                negotiable ? 'flex-1' : 'w-full'
              )}
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              {negotiable ? 'Message' : 'Message Seller'}
            </button>
          </div>
        </div>

        {/* Trust & Safety Banner */}
        <div className="flex items-start gap-3 p-4 bg-[#f8faf9] rounded-xl border border-[#e8f3ef]">
          <span className="material-symbols-outlined text-emerald-600 mt-0.5 text-[20px]">lock</span>
          <div>
            <h4 className="text-sm font-bold text-emerald-900 mb-0.5">Secure Transaction</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Funds held securely until delivery verified.
            </p>
          </div>
        </div>

        {/* Sales Agent Hook */}
        {isSalesAgent && (
          <div className="mt-2 p-4 bg-tertiary-container rounded-xl border border-tertiary-fixed-dim border-dashed relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <span className="material-symbols-outlined text-4xl text-tertiary">monetization_on</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-on-tertiary-container flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                Agent Opportunity
              </h4>
              <p className="text-xs text-on-tertiary-container mb-3 leading-relaxed">
                Earn 15% (
                {formatCurrency(
                  listing.packages
                    ? listing.packages[selectedPackage].price * 0.15
                    : listing.price * 0.15
                )}
                ) on successful closure.
              </p>
              <button className="w-full py-2 bg-white/60 hover:bg-white text-tertiary text-xs font-bold rounded-lg transition-colors border border-tertiary/20 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">link</span>
                Copy Agent Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── OrderChatModal ──────────────────────────────────────── */}
      <OrderChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        mode={chatMode}
        listing={listing}
        sellerAvatar={sellerAvatar}
        sellerName={sellerName}
      />
    </>
  );
};

export default StickyActionBoard;
