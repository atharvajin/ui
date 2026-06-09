import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../../components/ListingCard';
import {
  MediaShowcase,
  CoreDescription,
  Requirements,
  TermsAccordion,
  SellerProfile,
  StickyActionBoard,
} from '../../components/ListingDetails';
import Button from '../../components/Button';

// ─── Helper: Map formData → the shape ListingCard & detail components expect ───
const buildListingFromFormData = (formData) => {
  // Resolve price
  const price =
    formData.pricingType === 'packages'
      ? formData.packages.find(p => p.price)?.price || 0
      : formData.singlePrice || 0;

  // Resolve images
  const images = formData.images && formData.images.length > 0
    ? formData.images.map(img => (typeof img === 'string' ? img : URL.createObjectURL(img)))
    : ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop'];

  // Resolve packages for StickyActionBoard
  const packages =
    formData.pricingType === 'packages'
      ? formData.packages
          .filter(p => p.price)
          .map(p => ({
            name: p.tier,
            price: Number(p.price),
            description: p.features || '',
            features: p.features ? p.features.split('\n').filter(Boolean) : [],
          }))
      : null;

  // Resolve terms for TermsAccordion (expects [{ title, content }])
  const terms =
    formData.customTerms && formData.customTerms.length > 0
      ? formData.customTerms.map((t, i) => ({ title: `Term ${i + 1}`, content: t }))
      : null;

  // Resolve requirements for the Requirements panel
  const requirements = formData.requiredDocuments && formData.requiredDocuments.length > 0
    ? formData.requiredDocuments
    : null;

  const categoryLabel = formData.category
    ? formData.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Listing';

  return {
    id: 'preview-listing',
    title: formData.title || 'Your Listing Title',
    provider: formData.title || 'Your Listing Title',
    description: formData.shortDescription || 'Your short description will appear here.',
    coreDescription: formData.detailedDescription || formData.shortDescription || '',
    image: images[0],
    images,
    price: Number(price),
    rating: '5.0',
    reviews: '0',
    deliveryTime: formData.eventDate ? new Date(formData.eventDate).toLocaleDateString('en-IN') : '3–5 days',
    experienceLevel: formData.subCategory || 'General',
    category: categoryLabel,
    packages: packages || undefined,
    requirements,
    terms,
    seller: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      memberSince: new Date().getFullYear().toString(),
      rating: '5.0',
      responseTime: 'Instant',
    },
  };
};

// ─── Search Card View ────────────────────────────────────────────────────────
const SearchCardView = ({ listing }) => {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <p className="text-sm text-on-surface-variant font-medium text-center max-w-xs">
        This is how your listing appears in search results and category grids.
      </p>
      <div className="w-72">
        <ListingCard listing={listing} />
      </div>
    </div>
  );
};

// ─── Detailed View ───────────────────────────────────────────────────────────
const DetailedView = ({ listing, formData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
      {/* Left: Content */}
      <div className="lg:col-span-8 flex flex-col">
        <MediaShowcase images={listing.images} title={listing.title} />
        <CoreDescription description={listing.coreDescription} />
        {listing.requirements && <Requirements requirements={listing.requirements} />}
        {listing.terms && <TermsAccordion terms={listing.terms} />}
        <SellerProfile seller={listing.seller} />
      </div>

      {/* Right: Sticky Action Board */}
      <div className="lg:col-span-4 relative">
        <StickyActionBoard
          listing={listing}
          isSalesAgent={formData.allowAgents || false}
        />
      </div>
    </div>
  );
};

// ─── Success Screen ──────────────────────────────────────────────────────────
const SuccessScreen = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#fcfdfa] flex items-center justify-center overflow-y-auto">
      <div className="max-w-lg mx-auto px-6 py-20 text-center flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Animated Checkmark Ring */}
        <div className="relative flex items-center justify-center mb-2">
          <div className="w-28 h-28 rounded-full bg-primary-container flex items-center justify-center animate-[ping_0.6s_ease-out_1]">
            <span
              className="material-symbols-outlined text-6xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          {/* Outer ring pulse */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
        </div>

        <h1 className="font-serif text-4xl text-on-surface leading-tight">
          Your listing is live! 🎉
        </h1>
        <p className="text-on-surface-variant font-body text-lg leading-relaxed">
          Thank you for listing on <span className="font-bold text-on-surface font-serif italic">The Curator</span>.
          Buyers can discover and purchase your item immediately. All transactions are protected by our escrow system.
        </p>

        {/* Stats Row */}
        <div className="flex gap-6 mt-2">
          {[
            { icon: 'visibility', label: 'Visible to buyers' },
            { icon: 'shield', label: 'Escrow protected' },
            { icon: 'notifications_active', label: 'Instant notifications' },
          ].map(item => (
            <div key={item.icon} className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <Link to="/listing/preview-listing" className="flex-1">
            <Button variant="primary" size="lg" className="w-full gap-2">
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              View Live Listing
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full gap-2">
              <span className="material-symbols-outlined text-[20px]">explore</span>
              Back to Marketplace
            </Button>
          </Link>
        </div>

        {/* Share prompt */}
        <p className="text-sm text-on-surface-variant">
          🔗 Share your listing link to attract your first buyer!
        </p>
      </div>
    </div>
  );
};

// ─── Main Step Six Component ─────────────────────────────────────────────────
const StepSixPreview = ({ formData, onPublish }) => {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'detail'
  const [showSuccess, setShowSuccess] = useState(false);

  const listing = buildListingFromFormData(formData);

  const handlePublish = () => {
    // Save preview listing to sessionStorage so /listing/preview-listing can show it
    try {
      sessionStorage.setItem('preview-listing', JSON.stringify(listing));
    } catch {
      // sessionStorage not available (e.g., private browsing) — silently skip
    }
    setShowSuccess(true);
    if (onPublish) onPublish();
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up mt-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif text-4xl text-on-surface mb-3">Preview &amp; Publish</h2>
        <p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto">
          This is exactly what buyers will see. Review your listing before going live.
        </p>
      </div>

      {/* Readiness Checklist */}
      <div className="bg-white rounded-xl border border-surface-container p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Category', ok: !!formData.category, icon: 'category' },
          { label: 'Title & Desc', ok: !!formData.title && !!formData.shortDescription, icon: 'title' },
          { label: 'Price Set', ok: !!(formData.singlePrice || formData.packages?.some(p => p.price)), icon: 'payments' },
          { label: 'T&Cs Added', ok: !!(formData.customTerms?.length > 0), icon: 'gavel' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.ok ? 'bg-emerald-100' : 'bg-surface-container'}`}>
              <span className={`material-symbols-outlined text-[16px] ${item.ok ? 'text-emerald-600' : 'text-outline-variant'}`}>
                {item.ok ? 'check' : item.icon}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">{item.label}</p>
              <p className={`text-xs ${item.ok ? 'text-emerald-600' : 'text-outline-variant'}`}>
                {item.ok ? 'Ready' : 'Missing'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Segmented Control */}
      <div className="flex p-1 bg-surface-container-low rounded-xl border border-surface-container self-start">
        {[
          { id: 'card', label: 'Search Card View', icon: 'grid_view' },
          { id: 'detail', label: 'Detailed View', icon: 'article' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white shadow-sm text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Pane */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-6 md:p-8 min-h-[400px]">
        {/* "PREVIEW" Watermark Banner */}
        <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg w-fit">
          <span className="material-symbols-outlined text-amber-600 text-[16px]">preview</span>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Preview Mode — Not yet published</span>
        </div>

        {activeTab === 'card' ? (
          <SearchCardView listing={listing} />
        ) : (
          <DetailedView listing={listing} formData={formData} />
        )}
      </div>

      {/* Publish CTA */}
      <div className="bg-gradient-to-br from-primary/5 to-primary-container/30 rounded-2xl border border-primary/20 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-on-surface mb-1">Ready to go live?</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Your listing will immediately appear in the marketplace. You can edit or deactivate it anytime from your dashboard.
          </p>
        </div>
        <button
          onClick={handlePublish}
          className="shrink-0 flex items-center gap-2.5 px-8 py-4 bg-primary text-white font-bold text-base rounded-2xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(var(--color-primary-rgb),0.4)] hover:shadow-[0_6px_24px_rgba(var(--color-primary-rgb),0.5)]"
        >
          <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
          Publish Listing
        </button>
      </div>
    </div>
  );
};

export { SuccessScreen };
export default StepSixPreview;
