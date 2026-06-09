import React, { useState } from 'react';
import { cn } from '../utils';
import { formatCurrency } from '../utils/index';

// ─────────────────────────────────────────────────────────────────────────────
// OFFER MODAL
// ─────────────────────────────────────────────────────────────────────────────

const DELIVERY_OPTIONS = [
  '12 hours',
  '1 day',
  '2 days',
  '3 days',
  '5 days',
  '1 week',
  '2 weeks',
  '1 month',
  'To be discussed',
];

const OfferModal = ({ task, onClose }) => {
  const [price, setPrice]       = useState('');
  const [delivery, setDelivery] = useState('');
  const [message, setMessage]   = useState('');
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!price || isNaN(price) || Number(price) <= 0) e.price = 'Enter a valid offer price.';
    if (!delivery) e.delivery = 'Select an estimated delivery time.';
    if (message.trim().length < 20) e.message = 'Write at least 20 characters to the buyer.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setTimeout(onClose, 2200);
  };

  // Trap scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  React.useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const inputCls = 'w-full rounded-xl border border-outline-variant py-3 px-4 text-sm text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors';
  const errCls   = 'border-red-400 bg-red-50/50 focus:ring-red-200 focus:border-red-400';

  if (submitted) {
    return (
      <>
        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-5 text-center animate-[fadeInUp_0.3s_ease-out]">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600 text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-on-surface mb-1">Offer Submitted!</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your offer of <span className="font-bold text-primary">{formatCurrency(Number(price))}</span> has been sent to <span className="font-bold text-on-surface">{task.buyerName}</span>. You'll be notified when they respond.
              </p>
            </div>
            <div className="flex gap-3 mt-1 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-emerald-500">lock</span>No payment until accepted</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-emerald-500">shield</span>Escrow protected</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-0 z-[201] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
        <div
          className="w-full sm:max-w-lg bg-[#f8faf9] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_0.25s_ease-out]"
          style={{ maxHeight: 'min(94vh, 780px)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── Modal Header ── */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-surface-container shrink-0">
            <div>
              <h2 className="font-bold text-on-surface text-base">Make an Offer</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Your bid is non-binding until the buyer accepts.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {/* ── Task Summary ── */}
            <div className="mx-5 mt-5 p-4 bg-white rounded-2xl border border-surface-container shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
              <div className="flex items-start gap-3">
                <img src={task.buyerAvatar} alt={task.buyerName} className="w-10 h-10 rounded-xl object-cover border border-surface-container shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface text-sm leading-snug line-clamp-2">{task.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1">by {task.buyerName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-outline-variant font-medium">Budget</p>
                  <p className="text-sm font-bold text-primary">{task.budgetLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-container text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>Due {task.deadline}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">category</span>{task.category}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">group</span>{task.offerCount} offers
                </span>
              </div>
            </div>

            {/* ── Form Fields ── */}
            <div className="px-5 pb-5">
              {/* Price */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-on-surface mb-1.5">
                  Your Offer Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant text-sm">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: null })); }}
                    placeholder="e.g. 48000"
                    className={cn(inputCls, 'pl-8', errors.price && errCls)}
                  />
                  {task.budgetMax && Number(price) > 0 && (
                    <span className={cn(
                      'absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-1 rounded-lg',
                      Number(price) <= task.budgetMax
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-600'
                    )}>
                      {Number(price) <= task.budgetMax ? '✓ Within budget' : '↑ Over budget'}
                    </span>
                  )}
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                {/* Quick-pick buttons */}
                {task.budgetMin && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[
                      { label: 'Min Budget', val: task.budgetMin },
                      { label: 'Mid Budget', val: Math.round((task.budgetMin + task.budgetMax) / 2) },
                      { label: 'Max Budget', val: task.budgetMax },
                    ].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => { setPrice(String(opt.val)); setErrors(p => ({ ...p, price: null })); }}
                        className="text-[10px] font-bold px-2.5 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors"
                      >
                        {opt.label}: {formatCurrency(opt.val)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery Time */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-on-surface mb-1.5">
                  Estimated Delivery Time <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DELIVERY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setDelivery(opt); setErrors(p => ({ ...p, delivery: null })); }}
                      className={cn(
                        'px-3 py-2 rounded-xl text-xs font-bold transition-all border',
                        delivery === opt
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container hover:border-outline'
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.delivery && <p className="text-red-500 text-xs mt-1.5">{errors.delivery}</p>}
              </div>

              {/* Message */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    Message to Buyer <span className="text-red-500">*</span>
                  </label>
                  <span className={cn('text-[10px] font-medium', message.trim().length < 20 ? 'text-outline-variant' : 'text-emerald-600')}>
                    {message.trim().length}/20 min
                  </span>
                </div>
                <textarea
                  value={message}
                  onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: null })); }}
                  rows={4}
                  placeholder="Introduce yourself and explain why you're the best fit for this task…"
                  className={cn(inputCls, 'resize-none leading-relaxed', errors.message && errCls)}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Escrow note */}
              <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  <span className="font-bold">Escrow Protected.</span> Payment is only released after the buyer confirms successful delivery. No upfront payment is required.
                </p>
              </div>
            </div>
          </div>

          {/* ── Submit Bar ── */}
          <div className="px-5 pb-5 pt-3 bg-white border-t border-surface-container shrink-0">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-12 border-2 border-outline-variant text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-2 flex-[2] h-12 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferModal;
