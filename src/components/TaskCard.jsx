import React, { useState } from 'react';
import { cn } from '../utils';
import OfferModal from './OfferModal';

// ─────────────────────────────────────────────────────────────────────────────
// URGENCY CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const URGENCY_CONFIG = {
  high:   { label: 'Urgent',   bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500',    icon: 'bolt' },
  medium: { label: 'Moderate', bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500',  icon: 'schedule' },
  low:    { label: 'Flexible', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: 'calendar_month' },
};

const CATEGORY_COLORS = {
  'Logistics & Delivery': 'bg-blue-50 text-blue-700',
  'Tech & Software':      'bg-violet-50 text-violet-700',
  'Services':             'bg-emerald-50 text-emerald-700',
  'Legal':                'bg-amber-50 text-amber-700',
  'Creative':             'bg-pink-50 text-pink-700',
  'Events':               'bg-orange-50 text-orange-700',
  'Research':             'bg-cyan-50 text-cyan-700',
};

// ─────────────────────────────────────────────────────────────────────────────
// TASK CARD
// ─────────────────────────────────────────────────────────────────────────────
const TaskCard = ({ task }) => {
  const [offerOpen, setOfferOpen] = useState(false);
  const urgencyCfg = URGENCY_CONFIG[task.urgency] || URGENCY_CONFIG.medium;
  const catColor   = CATEGORY_COLORS[task.category] || 'bg-surface-container text-on-surface-variant';

  return (
    <>
      <article
        className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_16px_rgba(48,51,49,0.05)] hover:shadow-[0_8px_28px_rgba(48,51,49,0.11)] transition-all duration-200 flex flex-col overflow-hidden group"
      >
        {/* ── Card Top: Urgency Accent Bar ── */}
        <div className={cn(
          'h-1.5 w-full transition-all',
          task.urgency === 'high'   ? 'bg-gradient-to-r from-red-400 to-red-300' :
          task.urgency === 'medium' ? 'bg-gradient-to-r from-amber-400 to-amber-300' :
          'bg-gradient-to-r from-emerald-400 to-emerald-300'
        )} />

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* ── Header Row: Buyer + Urgency ── */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={task.buyerAvatar}
                  alt={task.buyerName}
                  className="w-9 h-9 rounded-xl object-cover border border-surface-container"
                />
                {/* Online indicator */}
                {task.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-on-surface truncate">{task.buyerName}</p>
                <div className="flex items-center gap-1 text-[10px] text-outline-variant">
                  <span className="material-symbols-outlined text-amber-400 text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-medium">{task.buyerRating}</span>
                  <span>·</span>
                  <span>{task.buyerOrders} orders</span>
                </div>
              </div>
            </div>

            {/* Urgency chip */}
            <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0', urgencyCfg.bg, urgencyCfg.text)}>
              <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', urgencyCfg.dot, task.urgency === 'high' && 'animate-pulse')} />
              {urgencyCfg.label}
            </span>
          </div>

          {/* ── Title ── */}
          <div>
            <span className={cn('inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold mb-2', catColor)}>
              {task.category}
            </span>
            <h3 className="font-serif text-base font-bold text-on-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5 line-clamp-2">{task.description}</p>
            )}
          </div>

          {/* ── Tags ── */}
          {task.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {task.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Budget + Deadline Row ── */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Budget pill */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest border border-surface-container rounded-xl">
              <span className="material-symbols-outlined text-primary text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <div>
                <p className="text-[9px] text-outline-variant font-bold uppercase tracking-wider">Budget</p>
                <p className="text-xs font-black text-primary leading-none">{task.budgetLabel}</p>
              </div>
            </div>

            {/* Deadline pill */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest border border-surface-container rounded-xl">
              <span className={cn('material-symbols-outlined text-[15px]', task.urgency === 'high' ? 'text-red-500' : 'text-on-surface-variant')}>schedule</span>
              <div>
                <p className="text-[9px] text-outline-variant font-bold uppercase tracking-wider">Deadline</p>
                <p className="text-xs font-black text-on-surface leading-none">{task.deadline}</p>
              </div>
            </div>

            {/* Offer count */}
            <div className="ml-auto text-right">
              <p className="text-[9px] text-outline-variant font-bold uppercase tracking-wider">Offers</p>
              <p className="text-xs font-black text-on-surface">{task.offerCount}</p>
            </div>
          </div>
        </div>

        {/* ── Card Footer: CTA ── */}
        <div className="px-5 pb-5 pt-2">
          <div className="h-px bg-surface-container mb-4" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOfferOpen(true)}
              className="flex-1 h-11 flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
              Make an Offer
            </button>
            <button
              aria-label="Save task"
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-surface-container hover:bg-surface-container text-on-surface-variant transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
            </button>
            <button
              aria-label="Share task"
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-surface-container hover:bg-surface-container text-on-surface-variant transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </article>

      {offerOpen && <OfferModal task={task} onClose={() => setOfferOpen(false)} />}
    </>
  );
};

export default TaskCard;
