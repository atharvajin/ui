import React, { useState, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { cn } from '../utils';
import { formatCurrency } from '../utils/index';
import KYCVerification from '../components/KYCVerification';
import AgentHub from '../components/Agent/AgentHub';
import ResolutionHub from '../components/Resolution/ResolutionHub';
import { useAuth } from '../context/useAuth';

// ─────────────────────────────────────────────────────────────────────────────
// Mock Inbox messages
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_INBOX = [
  { id: 'msg-1', from: 'Adv. Priya Sharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop', subject: 'Re: Corporate NDA Draft', preview: 'Hi, I have updated the NDA clauses as requested. Please review and let me know if...', time: '10 min ago', unread: true, orderId: 'ORD-29481' },
  { id: 'msg-2', from: 'DesignHive Studio', avatar: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=60&auto=format&fit=crop', subject: 'Logo files delivered', preview: 'Your logo pack (SVG + PNG) has been uploaded to the order. Please confirm delivery to release funds.', time: '2 hrs ago', unread: true, orderId: 'ORD-29340' },
  { id: 'msg-3', from: 'Lens & Light Co.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=60&auto=format&fit=crop', subject: 'Thank you!', preview: 'It was a pleasure working with you. Please leave a review when you get a chance!', time: '3 days ago', unread: false, orderId: 'ORD-29100' },
];

// Mock Wishlist items
const MOCK_WISHLIST = [
  { id: 'wl-1', title: 'Handcrafted Leather Journal – A5', price: 2200, seller: 'ArtisanCo.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=120&auto=format&fit=crop', category: 'Art & Craft', inStock: true },
  { id: 'wl-2', title: 'UI/UX Design System Kit – Figma', price: 1499, seller: 'PixelCraft', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=120&auto=format&fit=crop', category: 'Digital Assets', inStock: true },
  { id: 'wl-3', title: 'Professional Video Editing – 10min', price: 5500, seller: 'CutPro Studio', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=120&auto=format&fit=crop', category: 'Services', inStock: false },
  { id: 'wl-4', title: 'Vintage Brass Compass – Antique', price: 3800, seller: 'Heritage Finds', image: 'https://images.unsplash.com/photo-1553861215-a8e5c2e2d1b4?q=80&w=120&auto=format&fit=crop', category: 'Physical Goods', inStock: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// Navigation config  (portal-scoped)
// ─────────────────────────────────────────────────────────────────────────────
const BUYER_NAV = [
  { id: 'buying',     label: 'Buying Hub',       icon: 'shopping_bag',          badge: 3,    color: 'text-blue-600',    activeBg: 'bg-blue-50',    activeBorder: 'border-blue-500',    activeText: 'text-blue-700'    },
  { id: 'inbox',      label: 'Inbox',             icon: 'inbox',                 badge: 2,    color: 'text-sky-600',     activeBg: 'bg-sky-50',     activeBorder: 'border-sky-500',     activeText: 'text-sky-700'     },
  { id: 'wishlist',   label: 'Wishlist',          icon: 'favorite',              badge: null, color: 'text-rose-600',    activeBg: 'bg-rose-50',    activeBorder: 'border-rose-500',    activeText: 'text-rose-700'    },
  { id: 'resolution', label: 'Resolution Center', icon: 'gavel',                 badge: null, color: 'text-amber-600',   activeBg: 'bg-amber-50',   activeBorder: 'border-amber-500',   activeText: 'text-amber-700'   },
  { id: 'profile',    label: 'My Profile',        icon: 'manage_accounts',       badge: null, color: 'text-amber-600',   activeBg: 'bg-amber-50',   activeBorder: 'border-amber-500',   activeText: 'text-amber-700'   },
];

const SELLER_NAV = [
  { id: 'orders',     label: 'Incoming Orders',  icon: 'receipt_long',          badge: 1,    color: 'text-violet-600',  activeBg: 'bg-violet-50',  activeBorder: 'border-violet-500',  activeText: 'text-violet-700'  },
  { id: 'listings',   label: 'My Listings',       icon: 'storefront',            badge: null, color: 'text-blue-600',    activeBg: 'bg-blue-50',    activeBorder: 'border-blue-500',    activeText: 'text-blue-700'    },
  { id: 'wallet',     label: 'Wallet & Earnings', icon: 'account_balance_wallet',badge: null, color: 'text-emerald-600', activeBg: 'bg-emerald-50', activeBorder: 'border-emerald-500', activeText: 'text-emerald-700' },
  { id: 'resolution', label: 'Resolution Center', icon: 'gavel',                 badge: null, color: 'text-amber-600',   activeBg: 'bg-amber-50',   activeBorder: 'border-amber-500',   activeText: 'text-amber-700'   },
  { id: 'profile',    label: 'My Profile',        icon: 'manage_accounts',       badge: null, color: 'text-amber-600',   activeBg: 'bg-amber-50',   activeBorder: 'border-amber-500',   activeText: 'text-amber-700'   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared UI primitives
// ─────────────────────────────────────────────────────────────────────────────
const SectionHeading = ({ icon, title, sub, action }) => (
  <div className="flex items-start justify-between mb-6 gap-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[22px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      </div>
      <div>
        <h1 className="font-serif text-2xl text-on-surface leading-tight">{title}</h1>
        {sub && <p className="text-sm text-on-surface-variant mt-0.5">{sub}</p>}
      </div>
    </div>
    {action && action}
  </div>
);

const EmptyState = ({ icon, title, message, cta, ctaTo }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
    <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center">
      <span className="material-symbols-outlined text-[40px] text-outline-variant">{icon}</span>
    </div>
    <div>
      <h3 className="font-bold text-on-surface text-lg mb-1">{title}</h3>
      <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">{message}</p>
    </div>
    {cta && (
      <Link to={ctaTo || '/'} className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all">
        {cta}
      </Link>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ORDER STATUS CHIP
// ─────────────────────────────────────────────────────────────────────────────
const statusConfig = {
  in_progress: { label: 'In Progress', bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  pending:     { label: 'Pending',     bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500'  },
  delivered:   { label: 'Delivered',   bg: 'bg-emerald-100',text: 'text-emerald-700',dot: 'bg-emerald-500'},
  disputed:    { label: 'Disputed',    bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
  completed:   { label: 'Completed',   bg: 'bg-surface-container', text: 'text-on-surface-variant', dot: 'bg-outline-variant' },
};
const StatusChip = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold', cfg.bg, cfg.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot, status === 'in_progress' && 'animate-pulse')} />
      {cfg.label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  { id: 'ORD-29481', title: 'Custom Corporate Agreements & NDAs', provider: 'Adv. Priya Sharma', sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=120&auto=format&fit=crop', price: 3605, status: 'in_progress', placedOn: '18 Apr 2026', dueOn: '20 Apr 2026', listingId: 'cd-1', escrowStep: 3, totalSteps: 5, stepLabel: 'Work in Progress', category: 'Legal Services', escrowStatus: 'PENDING' },
  { id: 'ORD-29340', title: 'Logo Design – Startup Branding Kit', provider: 'DesignHive Studio', sellerAvatar: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=60&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=120&auto=format&fit=crop', price: 4200, status: 'delivered', placedOn: '12 Apr 2026', dueOn: '15 Apr 2026', listingId: 'da-2', escrowStep: 4, totalSteps: 5, stepLabel: 'Delivery & Review', category: 'Digital Assets', escrowStatus: 'PENDING' },
  { id: 'ORD-29100', title: 'Wedding Photography – Full Day', provider: 'Lens & Light Co.', sellerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=60&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=120&auto=format&fit=crop', price: 28000, status: 'completed', placedOn: '01 Apr 2026', dueOn: '06 Apr 2026', listingId: 'ev-1', escrowStep: 5, totalSteps: 5, stepLabel: 'Funds Released', category: 'Events & Tasks', escrowStatus: 'RELEASED' },
];

const MOCK_LISTINGS = [
  { id: 'my-1', title: 'Technical Resume Writing & LinkedIn Optimization', category: 'Services', listingType: 'services', price: 1800, status: 'active', paused: false, views: 342, inquiries: 11, sales: 4, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=120&auto=format&fit=crop' },
  { id: 'my-2', title: 'Handcrafted Ceramic Dinner Set (12 pcs)', category: 'Art & Craft', listingType: 'physical', price: 8500, status: 'draft', paused: false, views: 0, inquiries: 0, sales: 0, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=120&auto=format&fit=crop' },
  { id: 'my-3', title: 'Brand Logo Design Package (SVG + PNG)', category: 'Digital Assets', listingType: 'digital', price: 3200, status: 'active', paused: false, views: 512, inquiries: 24, sales: 9, image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=120&auto=format&fit=crop' },
  { id: 'my-4', title: 'Social Media Marketing Strategy Pack', category: 'Digital Assets', listingType: 'digital', price: 2100, status: 'active', paused: true, views: 189, inquiries: 7, sales: 2, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop' },
  { id: 'my-5', title: 'Premium Handwoven Silk Scarf', category: 'Art & Craft', listingType: 'physical', price: 4500, status: 'active', paused: false, views: 98, inquiries: 3, sales: 1, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=120&auto=format&fit=crop' },
];

const MOCK_SELLER_ORDERS = [
  { id: 'ORD-29510', buyer: 'Rohan Mehta', buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&auto=format&fit=crop', title: 'Technical Resume Writing & LinkedIn Optimization', price: 1800, status: 'in_progress', needsDeliverables: true, placedOn: '19 Apr 2026', dueOn: '21 Apr 2026', escrowStep: 3, totalSteps: 5, stepLabel: 'Work in Progress', escrowStatus: 'PENDING', listingType: 'services' },
  { id: 'ORD-29420', buyer: 'Sneha Iyer', buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=60&auto=format&fit=crop', title: 'Brand Logo Design Package (SVG + PNG)', price: 3200, status: 'pending', needsDeliverables: false, placedOn: '17 Apr 2026', dueOn: '22 Apr 2026', escrowStep: 1, totalSteps: 5, stepLabel: 'Funds Secured', escrowStatus: 'PENDING', listingType: 'digital' },
  { id: 'ORD-29380', buyer: 'Amit Verma', buyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=60&auto=format&fit=crop', title: 'Premium Handwoven Silk Scarf', price: 4500, status: 'in_progress', needsDeliverables: false, placedOn: '16 Apr 2026', dueOn: '23 Apr 2026', escrowStep: 2, totalSteps: 5, stepLabel: 'Seller Notified', escrowStatus: 'PENDING', listingType: 'physical' },
];

const MOCK_SELLER_TRANSACTIONS = [
  { id: 'tx-2', date: '15 Apr 2026', item: 'Technical Resume Writing – Seller Payout', orderId: 'ORD-29200', amount: +1746, escrowStatus: 'released', icon: 'description', listingType: 'services' },
  { id: 'tx-4', date: '10 Apr 2026', item: 'Handcrafted Ceramic Set – Agent Commission', orderId: 'ORD-29100', amount: +1275, escrowStatus: 'released', icon: 'campaign', listingType: 'physical' },
  { id: 'tx-7', date: '08 Apr 2026', item: 'Brand Logo Design Package – Payout', orderId: 'ORD-29050', amount: +3104, escrowStatus: 'released', icon: 'palette', listingType: 'digital' },
  { id: 'tx-8', date: '05 Apr 2026', item: 'Social Media Strategy Pack – Payout', orderId: 'ORD-28980', amount: +2037, escrowStatus: 'released', icon: 'bar_chart', listingType: 'digital' },
  { id: 'tx-9', date: '01 Apr 2026', item: 'Resume Coaching Session – Partial Refund', orderId: 'ORD-28800', amount: -500, escrowStatus: 'refunded', icon: 'undo', listingType: 'services' },
  { id: 'tx-10', date: '28 Mar 2026', item: 'Premium Silk Scarf – Payout', orderId: 'ORD-28700', amount: +4365, escrowStatus: 'released', icon: 'inventory_2', listingType: 'physical' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ESCROW STEP BAR
// ─────────────────────────────────────────────────────────────────────────────
const ESCROW_STEPS = [
  { step: 1, label: 'Funds Secured' },
  { step: 2, label: 'Seller Notified' },
  { step: 3, label: 'Work in Progress' },
  { step: 4, label: 'Delivery & Review' },
  { step: 5, label: 'Funds Released' },
];

const EscrowStepBar = ({ currentStep, totalSteps = 5, stepLabel }) => {
  const pct = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  return (
    <div className="px-5 pb-5 pt-0">
      <div className="flex items-center justify-between text-[11px] font-bold mb-2">
        <span className="text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-primary">adjust</span>
          Step {currentStep} of {totalSteps}: <span className="text-primary ml-1">{stepLabel}</span>
        </span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="relative h-2 bg-surface-container rounded-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-2">
        {ESCROW_STEPS.map(s => (
          <div key={s.step} className="flex flex-col items-center gap-0.5 flex-1">
            <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all', s.step < currentStep ? 'bg-primary border-primary' : s.step === currentStep ? 'bg-white border-primary ring-2 ring-primary/30' : 'bg-surface-container border-outline-variant')}>
              {s.step < currentStep && <span className="material-symbols-outlined text-white" style={{ fontSize: '10px', fontVariationSettings: "'FILL' 1" }}>check</span>}
              {s.step === currentStep && <span className="w-1.5 h-1.5 rounded-full bg-primary block" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BUYING HUB
// ─────────────────────────────────────────────────────────────────────────────
const BuyingHub = () => {
  const [filter, setFilter] = useState('all');
  const [chatOrder, setChatOrder] = useState(null);
  const filters = [
    { id: 'all',         label: 'All Orders' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'delivered',   label: 'Delivered' },
    { id: 'completed',   label: 'Completed' },
  ];
  const filtered      = filter === 'all' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter);
  const activeCount   = MOCK_ORDERS.filter(o => o.status === 'in_progress').length;
  const deliveredCount= MOCK_ORDERS.filter(o => o.status === 'delivered').length;
  const completedCount= MOCK_ORDERS.filter(o => o.status === 'completed').length;

  return (
    <div>
      <SectionHeading icon="shopping_bag" title="Buying Hub" sub="Track every purchase – escrow-protected from start to delivery."
        action={
          <Link to="/" className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">storefront</span>Browse Listings
          </Link>
        }
      />

      {/* Stats – no total spend */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: 'pending_actions', label: 'In Progress', value: activeCount,    bg: 'bg-blue-50',    ic: 'text-blue-600'    },
          { icon: 'inventory_2',     label: 'Delivered',   value: deliveredCount, bg: 'bg-violet-50',  ic: 'text-violet-600'  },
          { icon: 'task_alt',        label: 'Completed',   value: completedCount, bg: 'bg-emerald-50', ic: 'text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', s.bg)}>
              <span className={cn('material-symbols-outlined text-[20px]', s.ic)} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">{s.label}</p>
            <p className="font-serif text-2xl font-bold text-on-surface leading-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn('px-4 py-2 rounded-full text-xs font-bold transition-all', filter === f.id ? 'bg-on-surface text-surface shadow-sm' : 'bg-white border border-surface-container text-on-surface-variant hover:bg-surface-container')}
          >
            {f.label}
            {f.id === 'in_progress' && activeCount > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-blue-500 text-white text-[9px] font-black rounded-full">{activeCount}</span>}
          </button>
        ))}
      </div>

      {/* Order Cards – single column */}
      {filtered.length === 0 ? (
        <EmptyState icon="inbox" title="No orders here" message="No orders match this filter." cta="Browse Listings" ctaTo="/" />
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map(order => {
            const isActive    = order.status === 'in_progress';
            const isDelivered = order.status === 'delivered';
            const isDone      = order.status === 'completed';
            return (
              <div key={order.id} className={cn('bg-white rounded-2xl border shadow-[0_4px_16px_rgba(48,51,49,0.06)] overflow-hidden flex flex-col transition-shadow hover:shadow-[0_8px_24px_rgba(48,51,49,0.1)]', isActive ? 'border-primary/30 ring-1 ring-primary/10' : isDelivered ? 'border-violet-200' : 'border-surface-container')}>
                <div className="flex gap-4 p-5 pb-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-surface-container">
                      <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                    </div>
                    <div className={cn('absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center', isActive ? 'bg-blue-500' : isDelivered ? 'bg-violet-500' : 'bg-emerald-500')}>
                      <span className="material-symbols-outlined text-white" style={{ fontSize: '11px', fontVariationSettings: "'FILL' 1" }}>{isActive ? 'construction' : isDelivered ? 'inventory_2' : 'check'}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 justify-between mb-1.5">
                      <p className="font-bold text-on-surface text-sm leading-snug line-clamp-2 flex-1">{order.title}</p>
                      <StatusChip status={order.status} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={order.sellerAvatar} alt={order.provider} className="w-5 h-5 rounded-full object-cover border border-surface-container shrink-0" />
                      <p className="text-xs text-on-surface-variant truncate">{order.provider}</p>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">tag</span>{order.id}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span>Due {order.dueOn}</span>
                      <span className="font-serif font-bold text-on-surface">{formatCurrency(order.price)}</span>
                    </div>
                  </div>
                </div>

                {!isDone && <EscrowStepBar currentStep={order.escrowStep} totalSteps={order.totalSteps} stepLabel={order.stepLabel} />}

                {isDone && (
                  <div className="mx-5 mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-xs font-bold text-emerald-700">Completed · Funds Released</span>
                    <span className="ml-auto text-[10px] text-emerald-600">{order.dueOn}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2 px-5 pb-5 pt-1 mt-auto flex-wrap">
                  <button onClick={() => setChatOrder(order)} className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>View Order
                  </button>
                  {/* Contact Seller */}
                  <button onClick={() => setChatOrder(order)} className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 active:scale-[0.98] transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[15px]">chat</span>Contact Seller
                  </button>
                  {isActive && (
                    <Link to="/order-success" className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all">
                      <span className="material-symbols-outlined text-[15px]">task_alt</span>Confirm Delivery
                    </Link>
                  )}
                  {isDelivered && (
                    <button className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 text-white font-bold text-xs rounded-xl hover:bg-violet-700 active:scale-[0.98] transition-all">
                      <span className="material-symbols-outlined text-[15px]">rate_review</span>Review & Release
                    </button>
                  )}
                  {isDone && (
                    <button className="flex items-center gap-1.5 px-4 py-2.5 border border-surface-container text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                      <span className="material-symbols-outlined text-[15px]">star</span>Leave Review
                    </button>
                  )}
                  {!isDone && (
                    <Link to={`/dashboard?mode=buyer&tab=resolution&orderId=${order.id}`} className="ml-auto flex items-center gap-1 px-3 py-2.5 text-amber-700 font-bold text-xs rounded-xl hover:bg-amber-50 transition-colors">
                      <span className="material-symbols-outlined text-[15px]">flag</span>Report Issue
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chat modal */}
      {chatOrder && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setChatOrder(null)}>
          <div className="bg-white w-full sm:w-[420px] rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-on-surface">{chatOrder.title}</h3>
                <p className="text-xs text-on-surface-variant">{chatOrder.id} · by {chatOrder.provider}</p>
              </div>
              <button onClick={() => setChatOrder(null)} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <EscrowStepBar currentStep={chatOrder.escrowStep} totalSteps={chatOrder.totalSteps} stepLabel={chatOrder.stepLabel} />
            <div className="bg-surface-container rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2 block">chat</span>
              <p className="text-sm font-bold text-on-surface mb-0.5">Chat with {chatOrder.provider}</p>
              <p className="text-xs text-on-surface-variant">Full messaging loads here</p>
            </div>
            <Link to="/order-success" onClick={() => setChatOrder(null)} className="w-full h-11 flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>Go to Full Order Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INBOX VIEW (replaces Agent Hub in buyer portal)
// ─────────────────────────────────────────────────────────────────────────────
const InboxView = () => {
  const [messages, setMessages] = useState(MOCK_INBOX);
  const [selected, setSelected] = useState(null);

  const unreadCount = messages.filter(m => m.unread).length;

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  const handleSelect = (msg) => {
    setSelected(msg);
    markRead(msg.id);
  };

  return (
    <div>
      <SectionHeading icon="inbox" title="Inbox" sub="Messages from sellers about your active orders."
        action={
          <span className={cn('px-3 py-1.5 rounded-full text-xs font-bold', unreadCount > 0 ? 'bg-sky-100 text-sky-700' : 'bg-surface-container text-on-surface-variant')}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
          </span>
        }
      />

      {messages.length === 0 ? (
        <EmptyState icon="inbox" title="No messages" message="Messages from sellers will appear here." />
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map(msg => (
            <button key={msg.id} onClick={() => handleSelect(msg)}
              className={cn('w-full text-left bg-white rounded-2xl border p-4 flex items-start gap-4 transition-all hover:shadow-md', msg.unread ? 'border-sky-200 ring-1 ring-sky-100' : 'border-surface-container')}
            >
              <div className="relative shrink-0">
                <img src={msg.avatar} alt={msg.from} className="w-12 h-12 rounded-xl object-cover border border-surface-container" />
                {msg.unread && <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className={cn('text-sm truncate', msg.unread ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant')}>{msg.from}</p>
                  <span className="text-[10px] text-on-surface-variant shrink-0">{msg.time}</span>
                </div>
                <p className={cn('text-xs mb-1', msg.unread ? 'font-bold text-on-surface' : 'text-on-surface-variant')}>{msg.subject}</p>
                <p className="text-xs text-on-surface-variant line-clamp-1">{msg.preview}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[11px]">tag</span>{msg.orderId}
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline-variant shrink-0 mt-1">chevron_right</span>
            </button>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSelected(null)}>
          <div className="bg-white w-full sm:w-[480px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-5 border-b border-surface-container">
              <img src={selected.avatar} alt={selected.from} className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-on-surface text-sm">{selected.from}</p>
                <p className="text-xs text-on-surface-variant">{selected.subject}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-surface-container rounded-xl p-4 text-sm text-on-surface leading-relaxed mb-4">{selected.preview}</div>
              <span className="text-[10px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[11px]">tag</span>Order: {selected.orderId}</span>
            </div>
            <div className="p-5 border-t border-surface-container flex gap-3">
              <input placeholder="Type a reply…" className="flex-1 rounded-xl border border-outline-variant px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <button className="px-4 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST VIEW
// ─────────────────────────────────────────────────────────────────────────────
const WishlistView = () => {
  const [items, setItems] = useState(MOCK_WISHLIST);

  const removeItem = (id) => setItems(prev => prev.filter(w => w.id !== id));

  return (
    <div>
      <SectionHeading icon="favorite" title="Wishlist" sub="Items you've saved – pick up where you left off."
        action={
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">{items.length} saved</span>
        }
      />

      {items.length === 0 ? (
        <EmptyState icon="favorite_border" title="Your wishlist is empty" message="Save items you love while browsing — they'll appear here." cta="Browse Listings" ctaTo="/" />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)] flex items-center gap-4 p-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-surface-container shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-on-surface text-sm leading-snug mb-1 line-clamp-1">{item.title}</p>
                <p className="text-xs text-on-surface-variant mb-1.5">{item.seller} · {item.category}</p>
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-on-surface">{formatCurrency(item.price)}</span>
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', item.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600')}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {item.inStock ? (
                  <Link to="/" className="px-3 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all text-center whitespace-nowrap">
                    Buy Now
                  </Link>
                ) : (
                  <button className="px-3 py-2 bg-surface-container text-on-surface-variant text-xs font-bold rounded-xl cursor-not-allowed" disabled>
                    Unavailable
                  </button>
                )}
                <button onClick={() => removeItem(item.id)} className="px-3 py-2 border border-outline-variant text-on-surface-variant text-xs font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-center">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SELLER – INCOMING ORDERS TAB
// ─────────────────────────────────────────────────────────────────────────────
const SellerOrders = () => {
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadedIds, setUploadedIds] = useState(new Set());

  const needsAction  = MOCK_SELLER_ORDERS.filter(o => o.needsDeliverables).length;
  const unreadMessages = 3;

  const handleUpload = (orderId) => {
    setUploadingId(orderId);
    setTimeout(() => { setUploadingId(null); setUploadedIds(prev => new Set([...prev, orderId])); }, 2000);
  };

  // Per-type earnings from seller orders
  const earningsByType = MOCK_SELLER_ORDERS.reduce((acc, o) => { acc[o.listingType] = (acc[o.listingType] || 0) + o.price; return acc; }, {});
  const totalEarnings  = Object.values(earningsByType).reduce((a, v) => a + v, 0);

  return (
    <div>
      <SectionHeading icon="receipt_long" title="Incoming Orders" sub="Active buyer orders — upload deliverables and manage escrow."
        action={
          <Link to="/" className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">storefront</span>View Store
          </Link>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_4px_16px_rgba(48,51,49,0.06)] flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-violet-600 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide mb-0.5">Active Orders</p>
            <p className="font-serif text-3xl font-bold text-on-surface leading-none">{MOCK_SELLER_ORDERS.length}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{MOCK_SELLER_ORDERS.filter(o => o.status === 'in_progress').length} in progress</p>
          </div>
        </div>
        <div className={cn('rounded-2xl border p-5 shadow-[0_4px_16px_rgba(48,51,49,0.06)] flex items-center gap-4 relative overflow-hidden', needsAction > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-surface-container')}>
          {needsAction > 0 && <div className="absolute top-3 right-3 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"><span className="text-white text-[10px] font-black">{needsAction}</span></div>}
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', needsAction > 0 ? 'bg-amber-200' : 'bg-surface-container')}>
            <span className={cn('material-symbols-outlined text-[22px]', needsAction > 0 ? 'text-amber-700' : 'text-on-surface-variant')} style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
          </div>
          <div>
            <p className={cn('text-[11px] font-bold uppercase tracking-wide mb-0.5', needsAction > 0 ? 'text-amber-700' : 'text-on-surface-variant')}>Pending Action</p>
            <p className={cn('font-serif text-3xl font-bold leading-none', needsAction > 0 ? 'text-amber-800' : 'text-on-surface')}>{needsAction}</p>
            <p className={cn('text-xs mt-0.5', needsAction > 0 ? 'text-amber-600' : 'text-on-surface-variant')}>Needs deliverables</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_4px_16px_rgba(48,51,49,0.06)] flex items-center gap-4 relative">
          {unreadMessages > 0 && <div className="absolute top-3 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"><span className="text-white text-[10px] font-black">{unreadMessages}</span></div>}
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-blue-600 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide mb-0.5">Unread Messages</p>
            <p className="font-serif text-3xl font-bold text-on-surface leading-none">{unreadMessages}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">From active buyers</p>
          </div>
        </div>
      </div>

      {/* Earnings by category */}
      <div className="bg-white rounded-2xl border border-surface-container p-5 mb-8 shadow-[0_4px_16px_rgba(48,51,49,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-on-surface text-base">Earnings Overview</h2>
          <span className="text-xs text-on-surface-variant">Active orders</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-1 bg-gradient-to-br from-[#1a3d2b] to-[#0f2419] text-white rounded-xl p-4 flex flex-col gap-1">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-emerald-300 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Total Active</p>
            <p className="font-serif text-xl font-bold text-emerald-300 leading-none">{formatCurrency(totalEarnings)}</p>
            <p className="text-white/40 text-[10px]">All categories</p>
          </div>
          {[
            { key: 'services', label: 'Services',       icon: 'handshake',      bg: 'bg-blue-50',   ic: 'text-blue-600'   },
            { key: 'digital',  label: 'Digital Goods',  icon: 'cloud_download', bg: 'bg-violet-50', ic: 'text-violet-600' },
            { key: 'physical', label: 'Physical Goods', icon: 'inventory_2',    bg: 'bg-amber-50',  ic: 'text-amber-600'  },
          ].map(t => (
            <div key={t.key} className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container flex flex-col gap-1">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-1', t.bg)}>
                <span className={cn('material-symbols-outlined text-[16px]', t.ic)} style={{ fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
              </div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">{t.label}</p>
              <p className="font-serif text-lg font-bold text-on-surface leading-none">{formatCurrency(earningsByType[t.key] || 0)}</p>
              <p className="text-[10px] text-on-surface-variant">{MOCK_SELLER_ORDERS.filter(o => o.listingType === t.key).length} orders</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order cards */}
      {MOCK_SELLER_ORDERS.length === 0 ? (
        <EmptyState icon="receipt_long" title="No incoming orders" message="Orders from buyers will appear here." />
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_SELLER_ORDERS.map(order => {
            const isUploading = uploadingId === order.id;
            const isUploaded  = uploadedIds.has(order.id);
            return (
              <div key={order.id} className={cn('bg-white rounded-2xl border shadow-[0_4px_16px_rgba(48,51,49,0.06)] overflow-hidden', order.needsDeliverables && !isUploaded ? 'border-amber-200 ring-1 ring-amber-100' : 'border-surface-container')}>
                {order.needsDeliverables && !isUploaded && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 border-b border-amber-200">
                    <span className="material-symbols-outlined text-amber-600 text-[16px] animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    <span className="text-xs font-bold text-amber-700">Action Required: Upload final deliverables to release escrow</span>
                  </div>
                )}
                {isUploaded && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border-b border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-xs font-bold text-emerald-700">Deliverables uploaded – awaiting buyer confirmation</span>
                  </div>
                )}
                <div className="flex gap-4 p-5">
                  <div className="relative shrink-0">
                    <img src={order.buyerAvatar} alt={order.buyer} className="w-12 h-12 rounded-xl object-cover border border-surface-container" />
                    <div className={cn('absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white', order.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 justify-between mb-1">
                      <p className="font-bold text-on-surface text-sm leading-snug line-clamp-1 flex-1">{order.title}</p>
                      <StatusChip status={order.status} />
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2">from <span className="font-bold text-on-surface">{order.buyer}</span></p>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">tag</span>{order.id}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span>Due {order.dueOn}</span>
                      <span className="font-serif font-bold text-on-surface">{formatCurrency(order.price)}</span>
                    </div>
                  </div>
                </div>
                <EscrowStepBar currentStep={order.escrowStep} totalSteps={order.totalSteps} stepLabel={order.stepLabel} />
                <div className="flex items-center gap-2 px-5 pb-5 flex-wrap">
                  {order.needsDeliverables && !isUploaded && (
                    <button onClick={() => handleUpload(order.id)} disabled={isUploading}
                      className={cn('flex items-center gap-2 px-4 py-2.5 font-bold text-xs rounded-xl transition-all shadow-sm', isUploading ? 'bg-amber-300 text-white cursor-wait' : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98]')}
                    >
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: isUploading ? "'FILL' 1" : "'FILL' 0" }}>{isUploading ? 'cloud_sync' : 'upload_file'}</span>
                      {isUploading ? 'Uploading…' : 'Upload Deliverables'}
                    </button>
                  )}
                  <button className="flex items-center gap-1.5 px-4 py-2.5 border border-surface-container text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-[15px]">chat</span>Message Buyer
                  </button>
                  <button className="ml-auto flex items-center gap-1 px-3 py-2.5 text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[15px]">more_vert</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SELLER – MY LISTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
const LISTING_TYPE_TABS = [
  { id: 'all',      label: 'All',          icon: 'grid_view'      },
  { id: 'services', label: 'Services',     icon: 'handshake'      },
  { id: 'digital',  label: 'Digital Goods',icon: 'cloud_download' },
  { id: 'physical', label: 'Physical',     icon: 'inventory_2'    },
];

const MyListings = () => {
  const [listings, setListings]       = useState(MOCK_LISTINGS);
  const [listingTypeTab, setListingTypeTab] = useState('all');

  const togglePause = (id) => setListings(prev => prev.map(l => l.id === id ? { ...l, paused: !l.paused } : l));

  const filtered = listingTypeTab === 'all' ? listings : listings.filter(l => l.listingType === listingTypeTab);

  return (
    <div>
      <SectionHeading icon="storefront" title="My Listings" sub="Manage all your active, paused, and draft listings."
        action={
          <Link to="/create-listing" className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>New Listing
          </Link>
        }
      />

      {/* Category tabs */}
      <div className="flex gap-1 mb-5 bg-surface-container p-1 rounded-2xl w-full overflow-x-auto scrollbar-hide">
        {LISTING_TYPE_TABS.map(tab => {
          const count = tab.id === 'all' ? listings.length : listings.filter(l => l.listingType === tab.id).length;
          return (
            <button key={tab.id} onClick={() => setListingTypeTab(tab.id)}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center', listingTypeTab === tab.id ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface')}
            >
              <span className="material-symbols-outlined text-[14px]" style={listingTypeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
              {tab.label}
              <span className={cn('px-1.5 py-0.5 rounded-md text-[10px] font-black', listingTypeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant')}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="store" title="No listings here" message="No listings in this category yet." cta="Create a Listing" ctaTo="/create-listing" />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl border border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)] overflow-hidden">
              <div className="flex items-center gap-4 p-5">
                <div className={cn('w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-surface-container transition-all', listing.paused && 'opacity-50')}>
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={cn('font-bold text-on-surface text-sm truncate flex-1', listing.paused && 'text-on-surface-variant line-through')}>{listing.title}</p>
                    <span className={cn('shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold', listing.paused ? 'bg-surface-container text-on-surface-variant' : listing.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                      {listing.paused ? '⏸ Paused' : listing.status === 'active' ? '● Live' : '◌ Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-on-surface-variant">{listing.category} · {formatCurrency(listing.price)}</p>
                    <span className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold', listing.listingType === 'services' ? 'bg-blue-50 text-blue-700' : listing.listingType === 'digital' ? 'bg-violet-50 text-violet-700' : 'bg-amber-50 text-amber-700')}>
                      {listing.listingType === 'services' ? 'Service' : listing.listingType === 'digital' ? 'Digital' : 'Physical'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span>{listing.views}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">forum</span>{listing.inquiries}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">shopping_bag</span>{listing.sales} sales</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link to="/create-listing" className="px-3 py-1.5 border border-outline-variant text-on-surface text-xs font-bold rounded-xl hover:bg-surface-container transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">edit</span>Edit
                  </Link>
                  {listing.status === 'active' && (
                    <button onClick={() => togglePause(listing.id)} className={cn('px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1', listing.paused ? 'bg-primary text-white hover:bg-primary/90' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container')}>
                      <span className="material-symbols-outlined text-[13px]">{listing.paused ? 'play_arrow' : 'pause'}</span>
                      {listing.paused ? 'Resume' : 'Pause'}
                    </button>
                  )}
                  {listing.status === 'draft' && (
                    <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">publish</span>Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WALLET & EARNINGS (seller-only)
// ─────────────────────────────────────────────────────────────────────────────
const ESCROW_STATUS_CFG = {
  in_escrow: { label: 'In Escrow',  bg: 'bg-amber-100',   text: 'text-amber-800',   dot: 'bg-amber-500'   },
  released:  { label: 'Released',   bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  refunded:  { label: 'Refunded',   bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500'     },
};
const EscrowStatusPill = ({ status }) => {
  const cfg = ESCROW_STATUS_CFG[status] || ESCROW_STATUS_CFG.in_escrow;
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap', cfg.bg, cfg.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', cfg.dot, status === 'in_escrow' && 'animate-pulse')} />
      {cfg.label}
    </span>
  );
};

const SparklineChart = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-full">
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        const pct = max > 0 ? (v / max) * 100 : 0;
        return (
          <div key={i} className={cn('flex-1 rounded-t-md transition-all duration-300', isLast ? 'bg-emerald-500' : 'bg-surface-container hover:bg-emerald-300')} style={{ height: `${Math.max(pct, 6)}%` }} />
        );
      })}
    </div>
  );
};

const WalletView = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [txFilter, setTxFilter]       = useState('all');
  const [earningsTab, setEarningsTab] = useState('all');
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const balance  = 12430;
  const escrow   = 3605;
  const lifetime = 57820;
  const earningsData = [1800, 4200, 2100, 5500, 3200, 7800, 4100, 6300, 5900, 8200, 4500, 9100, 6700, 10300];

  const earningTypeTabs = [
    { id: 'all',      label: 'All',          icon: 'grid_view'      },
    { id: 'services', label: 'Services',     icon: 'handshake'      },
    { id: 'digital',  label: 'Digital Goods',icon: 'cloud_download' },
    { id: 'physical', label: 'Physical',     icon: 'inventory_2'    },
  ];

  const earningsFiltered = earningsTab === 'all' ? MOCK_SELLER_TRANSACTIONS : MOCK_SELLER_TRANSACTIONS.filter(tx => tx.listingType === earningsTab);
  const filteredTx       = txFilter === 'all' ? earningsFiltered : earningsFiltered.filter(tx => tx.escrowStatus === txFilter);

  const typeEarnings = {
    services: MOCK_SELLER_TRANSACTIONS.filter(t => t.listingType === 'services' && t.amount > 0).reduce((a, t) => a + t.amount, 0),
    digital:  MOCK_SELLER_TRANSACTIONS.filter(t => t.listingType === 'digital'  && t.amount > 0).reduce((a, t) => a + t.amount, 0),
    physical: MOCK_SELLER_TRANSACTIONS.filter(t => t.listingType === 'physical' && t.amount > 0).reduce((a, t) => a + t.amount, 0),
  };

  return (
    <div>
      <SectionHeading icon="account_balance_wallet" title="Wallet & Earnings" sub="Your complete seller financials – every payout secured by escrow."
        action={
          <button onClick={() => setWithdrawOpen(true)} className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-on-surface text-surface font-bold text-sm rounded-xl hover:bg-on-surface/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>Withdraw
          </button>
        }
      />

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1a3d2b] to-[#0f2419] text-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(26,61,43,0.25)]">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Available Balance</p>
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-[16px] text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
            </div>
            <p className="font-serif text-4xl font-bold text-emerald-300 leading-none mb-1">{formatCurrency(balance)}</p>
            <p className="text-white/40 text-xs mb-4">Ready to withdraw</p>
            <button onClick={() => setWithdrawOpen(true)} className="w-full h-10 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined text-[15px]">download</span>Withdraw Funds
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-2xl border border-amber-200 p-5">
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <p className="text-amber-700/70 text-[10px] font-bold uppercase tracking-widest">Locked in Escrow</p>
              <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-[14px] text-amber-700">info</span>
                {showTooltip && (
                  <div className="absolute right-0 top-8 w-56 bg-on-surface text-surface text-xs rounded-xl p-3 shadow-xl z-50 leading-relaxed">
                    Held securely — released once buyer confirms delivery.
                    <div className="absolute -top-1.5 right-2 w-3 h-3 bg-on-surface rotate-45 rounded-sm" />
                  </div>
                )}
              </button>
            </div>
            <p className="font-serif text-4xl font-bold text-amber-800 leading-none mb-1">{formatCurrency(escrow)}</p>
            <p className="text-amber-700/60 text-xs mb-4">1 active order</p>
            <div className="h-2 bg-amber-200 rounded-full overflow-hidden"><div className="h-full w-[35%] bg-amber-500 rounded-full animate-pulse" /></div>
          </div>
          <span className="material-symbols-outlined absolute -right-3 -bottom-3 text-[72px] text-amber-200/60 select-none pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-surface-container p-5 shadow-[0_4px_16px_rgba(48,51,49,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Lifetime Earnings</p>
            <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100 text-[10px] font-black text-emerald-600">
              <span className="material-symbols-outlined text-emerald-500 text-[13px]">trending_up</span>+24%
            </span>
          </div>
          <p className="font-serif text-4xl font-bold text-on-surface leading-none mb-1">{formatCurrency(lifetime)}</p>
          <p className="text-on-surface-variant text-xs mb-4">Since joining Apr 2024</p>
          <div className="h-10"><SparklineChart data={earningsData} /></div>
        </div>
      </div>

      {/* Bifurcated earnings by category */}
      <div className="bg-white rounded-2xl border border-surface-container p-5 mb-8 shadow-[0_4px_16px_rgba(48,51,49,0.04)]">
        <h2 className="font-bold text-on-surface text-base mb-4">Earnings by Category</h2>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { key: 'services', label: 'Services',       icon: 'handshake',      bg: 'bg-blue-50',   ic: 'text-blue-600',   border: 'border-blue-100'   },
            { key: 'digital',  label: 'Digital Goods',  icon: 'cloud_download', bg: 'bg-violet-50', ic: 'text-violet-600', border: 'border-violet-100' },
            { key: 'physical', label: 'Physical Goods', icon: 'inventory_2',    bg: 'bg-amber-50',  ic: 'text-amber-600',  border: 'border-amber-100'  },
          ].map(t => (
            <div key={t.key} className={cn('rounded-xl p-4 border flex flex-col gap-2', t.bg, t.border)}>
              <div className="flex items-center gap-2">
                <span className={cn('material-symbols-outlined text-[18px]', t.ic)} style={{ fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                <span className="text-xs font-bold text-on-surface">{t.label}</span>
              </div>
              <p className="font-serif text-2xl font-bold text-on-surface">{formatCurrency(typeEarnings[t.key])}</p>
              <p className="text-[10px] text-on-surface-variant">{MOCK_SELLER_TRANSACTIONS.filter(tx => tx.listingType === t.key && tx.amount > 0).length} payouts</p>
            </div>
          ))}
        </div>
        <div className="border-t border-surface-container pt-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-on-surface text-sm">Monthly Earnings</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">April 2026</p>
            </div>
          </div>
          <div className="h-32 mb-3"><SparklineChart data={earningsData} /></div>
          <div className="flex justify-between text-[10px] text-outline-variant px-0.5">
            {['Apr 1','Apr 4','Apr 7','Apr 10','Apr 13','Apr 16','Apr 19','Today'].map(l => <span key={l}>{l}</span>)}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-surface-container">
            {[
              { label: 'Gross Inflow',  value: formatCurrency(MOCK_SELLER_TRANSACTIONS.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0)), color: 'text-emerald-600', icon: 'arrow_downward' },
              { label: 'Gross Outflow', value: formatCurrency(MOCK_SELLER_TRANSACTIONS.filter(t => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0)), color: 'text-on-surface', icon: 'arrow_upward' },
              { label: 'Net Earnings',  value: formatCurrency(MOCK_SELLER_TRANSACTIONS.reduce((a, t) => a + t.amount, 0)), color: 'text-primary', icon: 'account_balance' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className={cn('material-symbols-outlined text-[14px]', item.color)}>{item.icon}</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <p className={cn('font-serif font-bold text-lg', item.color)}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction history with category tabs */}
      <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_16px_rgba(48,51,49,0.04)] overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-surface-container">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div>
              <h2 className="font-bold text-on-surface text-base">Transaction History</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">{filteredTx.length} transactions</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all','in_escrow','released','refunded'].map(f => (
                <button key={f} onClick={() => setTxFilter(f)} className={cn('px-3 py-1.5 rounded-full text-xs font-bold transition-all capitalize', txFilter === f ? 'bg-on-surface text-surface' : f === 'in_escrow' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : f === 'released' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : f === 'refunded' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high')}>
                  {f === 'all' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-1 bg-surface-container p-1 rounded-xl w-full overflow-x-auto scrollbar-hide">
            {earningTypeTabs.map(tab => (
              <button key={tab.id} onClick={() => setEarningsTab(tab.id)} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center', earningsTab === tab.id ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface')}>
                <span className="material-symbols-outlined text-[13px]" style={earningsTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {filteredTx.length === 0 ? (
          <div className="py-16 text-center text-sm text-on-surface-variant">No transactions match this filter.</div>
        ) : (
          <ul className="divide-y divide-surface-container">
            {filteredTx.map(tx => {
              const isCredit = tx.amount > 0;
              return (
                <li key={tx.id} className="px-6 py-4 hover:bg-surface-container-lowest transition-colors flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{tx.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface line-clamp-1">{tx.item}</p>
                    <p className="text-[10px] text-outline-variant mt-0.5">{tx.date} · {tx.orderId}</p>
                  </div>
                  <p className={cn('font-serif font-bold text-base tabular-nums whitespace-nowrap', isCredit ? 'text-emerald-600' : 'text-red-500')}>
                    {isCredit ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <EscrowStatusPill status={tx.escrowStatus} />
                </li>
              );
            })}
          </ul>
        )}
        <div className="px-6 py-4 border-t border-surface-container bg-surface-container-lowest flex items-center justify-between">
          <p className="text-xs text-on-surface-variant">Showing {filteredTx.length} of {MOCK_SELLER_TRANSACTIONS.length} transactions</p>
          <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">download</span>Export CSV</button>
        </div>
      </div>

      {/* Withdraw modal */}
      {withdrawOpen && (
        <>
          <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm" onClick={() => setWithdrawOpen(false)} />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-on-surface text-lg">Withdraw Funds</h3>
                <button onClick={() => setWithdrawOpen(false)} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[20px]">close</span></button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <span className="text-sm text-emerald-700 font-medium">Available</span>
                <span className="font-serif font-bold text-2xl text-emerald-800">{formatCurrency(balance)}</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                  <input defaultValue="12430" type="number" className="w-full rounded-xl border border-outline-variant py-3 pl-8 pr-4 text-on-surface font-bold text-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="flex gap-3 p-3.5 border-2 border-primary rounded-xl items-center">
                <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                <div><p className="text-sm font-bold text-on-surface">HDFC Bank ••4821</p><p className="text-xs text-on-surface-variant">Savings · IFSC HDFC0001234</p></div>
              </div>
              <button onClick={() => setWithdrawOpen(false)} className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>Confirm Withdrawal
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
const ProfileSettings = () => {
  const [name, setName]     = useState('Dhruv Jain');
  const [email, setEmail]   = useState('dhruv@example.com');
  const [bio, setBio]       = useState('Passionate technologist & marketplace enthusiast.');
  const [saved, setSaved]   = useState(false);
  const [profileTab, setProfileTab] = useState('info');

  const inputCls = 'w-full rounded-xl border border-outline-variant py-3 px-4 text-sm text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors';
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <SectionHeading icon="manage_accounts" title="My Profile" sub="Manage your personal info, identity verification, and account security." />
      <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl shadow-[0_2px_8px_rgba(251,191,36,0.08)]">
        <span className="material-symbols-outlined text-amber-600 text-[22px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-amber-800">Identity Not Verified</p>
          <p className="text-xs text-amber-700">Complete KYC to unlock up to ₹2,00,000 in escrow transactions.</p>
        </div>
        <button onClick={() => setProfileTab('kyc')} className="shrink-0 px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition-all whitespace-nowrap">Verify Now</button>
      </div>
      <div className="flex gap-1 mb-6 bg-surface-container p-1 rounded-2xl w-fit">
        {[{ id: 'info', icon: 'person', label: 'Personal Info' }, { id: 'kyc', icon: 'verified_user', label: 'Identity (KYC)' }].map(tab => (
          <button key={tab.id} onClick={() => setProfileTab(tab.id)} className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all', profileTab === tab.id ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface')}>
            <span className="material-symbols-outlined text-[16px]" style={profileTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
            {tab.label}
            {tab.id === 'kyc' && <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black rounded-md">!</span>}
          </button>
        ))}
      </div>
      {profileTab === 'info' && (
        <>
          <div className="bg-white rounded-2xl border border-surface-container p-6 mb-6 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
            <h2 className="font-bold text-on-surface text-base mb-4">Profile Photo</h2>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[#1a6b47] flex items-center justify-center text-white font-serif text-3xl font-bold shadow-sm">D</div>
                <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-on-surface rounded-full flex items-center justify-center border-2 border-white"><span className="material-symbols-outlined text-white text-[13px]">edit</span></button>
              </div>
              <div>
                <p className="font-bold text-on-surface text-sm mb-0.5">{name}</p>
                <p className="text-xs text-on-surface-variant">{email}</p>
                <button className="mt-2 text-xs text-primary font-bold hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">upload</span>Upload photo</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-surface-container p-6 mb-6 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
            <h2 className="font-bold text-on-surface text-base mb-5">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2"><label className="block text-xs font-bold text-on-surface mb-1.5">Full Name</label><input value={name} onChange={e => setName(e.target.value)} className={inputCls} /></div>
              <div className="sm:col-span-2"><label className="block text-xs font-bold text-on-surface mb-1.5">Email Address</label><div className="relative"><input value={email} onChange={e => setEmail(e.target.value)} className={cn(inputCls, 'pr-28')} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">Verified</span></div></div>
              <div className="sm:col-span-2"><label className="block text-xs font-bold text-on-surface mb-1.5">Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className={cn(inputCls, 'resize-none')} /></div>
            </div>
            <button onClick={handleSave} className={cn('mt-5 h-11 px-6 flex items-center gap-2 font-bold text-sm rounded-xl transition-all', saved ? 'bg-emerald-600 text-white' : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm')}>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{saved ? 'check_circle' : 'save'}</span>
              {saved ? 'Changes Saved!' : 'Save Changes'}
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
            <h2 className="font-bold text-on-surface text-base mb-5">Security</h2>
            <ul className="flex flex-col gap-3">
              {[
                { icon: 'lock',          label: 'Change Password',           sub: 'Last changed 3 months ago' },
                { icon: 'security',      label: 'Two-Factor Authentication', sub: 'Not enabled', badge: 'Recommended', badgeColor: 'bg-amber-100 text-amber-700' },
                { icon: 'notifications', label: 'Notification Preferences',  sub: 'Email & in-app' },
              ].map(item => (
                <button key={item.label} className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container transition-colors group text-left">
                  <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[18px] text-on-surface-variant">{item.icon}</span></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-on-surface text-sm">{item.label}</p>
                      {item.badge && <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold', item.badgeColor)}>{item.badge}</span>}
                    </div>
                    <p className="text-xs text-on-surface-variant">{item.sub}</p>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
                </button>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-surface-container">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Danger Zone</p>
              <button className="px-4 py-2.5 border-2 border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">person_remove</span>Delete Account
              </button>
            </div>
          </div>
        </>
      )}
      {profileTab === 'kyc' && <KYCVerification />}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VIEW MAPS
// ─────────────────────────────────────────────────────────────────────────────
const BUYER_VIEWS  = { buying: BuyingHub, inbox: InboxView, wishlist: WishlistView, resolution: ResolutionHub, profile: ProfileSettings };
const SELLER_VIEWS = { orders: SellerOrders, listings: MyListings, wallet: WalletView, resolution: ResolutionHub, profile: ProfileSettings };

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL SWITCH BANNER
// ─────────────────────────────────────────────────────────────────────────────
const PortalSwitchBanner = ({ mode, onSwitch }) => {
  const isBuyer = mode === 'buyer';
  return (
    <div className={cn('flex items-center gap-3 px-4 py-3 rounded-2xl border mb-6 shadow-[0_2px_8px_rgba(48,51,49,0.04)]', isBuyer ? 'bg-violet-50 border-violet-200' : 'bg-blue-50 border-blue-200')}>
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', isBuyer ? 'bg-violet-100' : 'bg-blue-100')}>
        <span className={cn('material-symbols-outlined text-[18px]', isBuyer ? 'text-violet-600' : 'text-blue-600')} style={{ fontVariationSettings: "'FILL' 1" }}>{isBuyer ? 'storefront' : 'shopping_bag'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-bold', isBuyer ? 'text-violet-800' : 'text-blue-800')}>
          {isBuyer ? 'Want to sell on the platform?' : 'Switch to your buyer account?'}
        </p>
        <p className={cn('text-xs', isBuyer ? 'text-violet-600' : 'text-blue-600')}>
          {isBuyer ? 'Use the same account to list and sell services, digital goods, or physical products.' : 'View and manage your purchases and orders.'}
        </p>
      </div>
      <button onClick={onSwitch} className={cn('shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap', isBuyer ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-blue-600 text-white hover:bg-blue-700')}>
        <span className="material-symbols-outlined text-[16px]">{isBuyer ? 'add_business' : 'shopping_bag'}</span>
        {isBuyer ? 'Start Selling' : 'Go to Buyer Portal'}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DashboardPage
// ─────────────────────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const mobileTabRef = useRef(null);

  const mode     = searchParams.get('mode') === 'seller' ? 'seller' : 'buyer';
  const isSeller = mode === 'seller';
  const navItems = isSeller ? SELLER_NAV : BUYER_NAV;
  const VIEWS    = isSeller ? SELLER_VIEWS : BUYER_VIEWS;

  const tabFromUrl = searchParams.get('tab');
  const defaultTab = isSeller ? 'orders' : 'buying';
  const activeTab  = navItems.some(n => n.id === tabFromUrl) ? tabFromUrl : defaultTab;
  const activeNav  = navItems.find(n => n.id === activeTab) || navItems[0];
  const resolutionOrderId = searchParams.get('orderId') || '';

  const handleTabChange = (id) => {
    setSearchParams({ mode, tab: id }, { replace: true });
    if (mobileTabRef.current) {
      const btn = mobileTabRef.current.querySelector(`[data-tab="${id}"]`);
      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handlePortalSwitch = () => {
    const nextMode = isSeller ? 'buyer' : 'seller';
    const nextTab  = nextMode === 'seller' ? 'orders' : 'buying';
    setSearchParams({ mode: nextMode, tab: nextTab }, { replace: true });
  };

  const ActiveView = VIEWS[activeTab] || (isSeller ? SellerOrders : BuyingHub);

  return (
    <div className="min-h-screen bg-[#f5f7f5] font-body">

      {/* ══ MOBILE sticky tab bar ══════════════════════════════════════════ */}
      <nav ref={mobileTabRef} className="lg:hidden sticky top-0 z-20 bg-white border-b border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)] overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max px-4 py-2 gap-1">
          <div className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black mr-1 shrink-0', isSeller ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700')}>
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isSeller ? 'storefront' : 'shopping_bag'}</span>
            {isSeller ? 'Seller' : 'Buyer'}
          </div>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} data-tab={item.id} onClick={() => handleTabChange(item.id)}
                className={cn('relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200', isActive ? `${item.activeBg} ${item.activeText}` : 'text-on-surface-variant hover:bg-surface-container')}
              >
                <span className="material-symbols-outlined text-[18px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                {item.label}
                {item.badge && <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0">{item.badge}</span>}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t-full bg-current" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ══ DESKTOP sidebar + content ══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:flex lg:gap-8 xl:gap-10">

        {/* ─── SIDEBAR ──────────────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
          {/* User card */}
          <div className="bg-white rounded-2xl border border-surface-container p-5 mb-2 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#1a6b47] flex items-center justify-center text-white font-serif text-xl font-bold shadow-sm shrink-0">D</div>
              <div className="min-w-0">
                <p className="font-bold text-on-surface text-sm leading-tight truncate">Dhruv Jain</p>
                <p className="text-xs text-on-surface-variant truncate">dhruv@example.com</p>
              </div>
            </div>
            <div className={cn('flex items-center gap-2 p-2.5 rounded-xl border mb-3', isSeller ? 'bg-violet-50 border-violet-100' : 'bg-blue-50 border-blue-100')}>
              <span className={cn('material-symbols-outlined text-[16px]', isSeller ? 'text-violet-600' : 'text-blue-600')} style={{ fontVariationSettings: "'FILL' 1" }}>{isSeller ? 'storefront' : 'shopping_bag'}</span>
              <div className="flex-1 min-w-0">
                <p className={cn('text-[10px] font-black uppercase tracking-wider', isSeller ? 'text-violet-700' : 'text-blue-700')}>Active Portal</p>
                <p className={cn('text-xs font-bold', isSeller ? 'text-violet-900' : 'text-blue-900')}>{isSeller ? 'Seller Portal' : 'Buyer Portal'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Trust Score</p>
                <p className="text-sm font-bold text-emerald-900">Excellent · 4.9</p>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="bg-white rounded-2xl border border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)] overflow-hidden">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => handleTabChange(item.id)}
                  className={cn('w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-all duration-200 relative group text-left', idx < navItems.length - 1 && 'border-b border-surface-container', isActive ? `${item.activeBg} ${item.activeText} border-l-4 ${item.activeBorder} pl-4` : 'text-on-surface-variant hover:bg-surface-container-lowest border-l-4 border-transparent pl-4')}
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0">{item.badge}</span>}
                  {isActive && <span className="material-symbols-outlined text-[16px] shrink-0">chevron_right</span>}
                </button>
              );
            })}
          </nav>

          {/* Portal switch button */}
          <button onClick={handlePortalSwitch} className={cn('flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl border font-bold text-sm transition-all shadow-[0_2px_8px_rgba(48,51,49,0.04)]', isSeller ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'bg-violet-600 text-white border-violet-600 hover:bg-violet-700')}>
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isSeller ? 'shopping_bag' : 'add_business'}</span>
            <span>{isSeller ? 'Switch to Buyer Portal' : 'Start Selling'}</span>
            <span className="material-symbols-outlined text-[16px] ml-auto">arrow_forward</span>
          </button>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)] p-4 flex flex-col gap-1">
            {[
              { icon: 'add_circle', label: 'Create a Listing', to: '/create-listing' },
              { icon: 'help',       label: 'Help & Support',   to: '#' },
              { icon: 'logout',     label: 'Sign Out',          to: '/', danger: true },
            ].map(link => (
              <Link key={link.label} to={link.to} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', link.danger ? 'text-red-500 hover:bg-red-50' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface')}>
                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>{link.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-on-surface-variant mb-6">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className={cn('px-2 py-0.5 rounded-lg font-bold text-[11px]', isSeller ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700')}>
              {isSeller ? 'Seller Portal' : 'Buyer Portal'}
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className={cn('font-bold', activeNav.activeText)}>{activeNav.label}</span>
          </div>

          {/* Portal switch banner */}
          <PortalSwitchBanner mode={mode} onSwitch={handlePortalSwitch} />

          {/* Mobile switch button */}
          <button onClick={handlePortalSwitch} className={cn('lg:hidden w-full flex items-center justify-center gap-2 mb-5 py-3 rounded-2xl font-bold text-sm transition-all', isSeller ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-violet-600 text-white hover:bg-violet-700')}>
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isSeller ? 'shopping_bag' : 'add_business'}</span>
            {isSeller ? 'Switch to Buyer Portal' : 'Start Selling'}
          </button>

          {/* Dynamic view */}
          <div key={`${mode}-${activeTab}`} className="animate-[fadeInUp_0.2s_ease-out]">
            {activeTab === 'resolution' ? (
              <ResolutionHub initialOrderId={resolutionOrderId} portalMode={mode} />
            ) : (
              <ActiveView />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
