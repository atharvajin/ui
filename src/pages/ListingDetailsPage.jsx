import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../data/mockData';
import { resolveListingTaxonomy } from '../utils/taxonomy';
import Breadcrumbs from '../components/Breadcrumbs';
import OrderChatModal from '../components/OrderChatModal';
import {
  MediaShowcase,
  CoreDescription,
  Requirements,
  TermsAccordion,
  SellerProfile,
  StickyActionBoard
} from '../components/ListingDetails';

// Derive domain label + marketplace path from a listing's metadata via FULL_TAXONOMY
const resolveBreadcrumbFromListing = (listing) => {
  if (!listing) return null;

  const resolved = resolveListingTaxonomy(listing);
  if (!resolved) return null;

  return {
    domainLabel: resolved.domainId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    domainPath: `/${resolved.domainId}`,
    groupLabel: resolved.group.label,
    groupPath: `/${resolved.domainId}/${resolved.group.id}/marketplace`,
    subLabel: resolved.leaf.label,
    subPath: `/${resolved.domainId}/${resolved.group.id}/marketplace?sub=${resolved.leaf.id}`,
  };
};

const ListingDetailsPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [previewExpired, setPreviewExpired] = useState(false);
  const [isSalesAgent, setIsSalesAgent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Special case: preview listing from CreateListing wizard
    if (listingId === 'preview-listing') {
      try {
        const stored = sessionStorage.getItem('preview-listing');
        if (stored) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setListing(JSON.parse(stored));
          return;
        }
      } catch {
        // JSON parse failure — fall through to expired state
      }
      setPreviewExpired(true);
      return;
    }

    const data = getListingById(listingId);
    if (data) {
      setListing(data);
    } else {
      navigate('/404', { replace: true });
    }
  }, [listingId, navigate]);

  if (previewExpired) {
    return (
      <div className="page-container py-20 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant">preview</span>
        <h1 className="font-serif text-3xl text-on-surface">Preview Expired</h1>
        <p className="text-on-surface-variant max-w-sm">
          This preview link is only valid immediately after publishing. Go to your dashboard to find your live listing.
        </p>
        <a href="/dashboard?tab=selling" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all">
          Go to Seller Hub
        </a>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="page-container py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Build breadcrumbs dynamically from listing taxonomy
  const resolved = resolveBreadcrumbFromListing(listing);
  const breadcrumbItems = resolved
    ? [
        { label: 'Home', path: '/' },
        { label: resolved.domainLabel, path: resolved.domainPath },
        { label: resolved.groupLabel, path: resolved.groupPath },
        { label: listing.title || listing.provider, path: null }
      ]
    : [
        { label: 'Home', path: '/' },
        { label: listing.category || 'Listing', path: '/' },
        { label: listing.title || listing.provider, path: null }
      ];

  return (
    <div className="page-container py-8 relative">

      {/* Dev Toggle for Demo */}
      <div className="fixed bottom-6 right-6 z-50 bg-white p-3 rounded-lg shadow-lg border border-surface-container flex items-center gap-3">
        <label className="text-xs font-medium text-on-surface flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSalesAgent}
            onChange={(e) => setIsSalesAgent(e.target.checked)}
            className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
          />
          Sales Agent Mode
        </label>
      </div>

      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">

        {/* Left Column: Content & Context */}
        <div className="lg:col-span-8 flex flex-col">
          <MediaShowcase images={listing.images || [listing.image]} title={listing.title || listing.provider} />
          <CoreDescription description={listing.coreDescription || listing.description} />
          <Requirements requirements={listing.requirements} />
          <TermsAccordion terms={listing.terms} />
          <SellerProfile
            seller={listing.seller || {
              name: listing.provider,
              avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
              memberSince: '2023',
              rating: listing.rating,
              responseTime: 'Few hours'
            }}
            onContact={() => setChatOpen(true)}
          />
        </div>

        {/* Right Column: The Sticky Action Board */}
        <div className="lg:col-span-4 relative">
          <StickyActionBoard listing={listing} isSalesAgent={isSalesAgent} />
        </div>

      </div>

      {/* Page-level OrderChatModal (opened via SellerProfile contact button) */}
      <OrderChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        mode="chat"
        listing={listing}
        sellerAvatar={listing.seller?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=60&auto=format&fit=crop'}
        sellerName={listing.seller?.name || listing.provider}
      />
    </div>
  );
};

export default ListingDetailsPage;
