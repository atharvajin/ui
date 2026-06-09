import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import { formatCurrency } from '../../utils/index';

const STATUS_STYLES = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Paused: 'bg-slate-100 text-slate-700 border-slate-200',
  Cleared: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Locked in Escrow': 'bg-amber-50 text-amber-700 border-amber-200',
  Disputed: 'bg-red-50 text-red-700 border-red-200',
};

const StatusPill = ({ label }) => (
  <span
    className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap',
      STATUS_STYLES[label] || 'bg-surface-container text-on-surface-variant border-surface-container'
    )}
  >
    {label}
  </span>
);

const OnboardingEmptyState = () => (
  <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center">
    <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 mx-auto flex items-center justify-center mb-3">
      <span className="material-symbols-outlined text-[26px] text-emerald-700">campaign</span>
    </div>
    <h4 className="font-bold text-on-surface text-lg">Start your first campaign</h4>
    <p className="text-sm text-on-surface-variant max-w-xl mx-auto mt-1">
      Generate a tracked link and share it where your audience already trusts you. Digital Assets often convert best for first-time agents.
    </p>
    <div className="mt-4">
      <Link
        to="/digital-assets"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">explore</span>
        Explore Digital Assets
      </Link>
    </div>
  </div>
);

const CampaignTable = ({ activeLinks = [], conversionHistory = [] }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (value, id) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-on-surface">Active Campaigns</h3>
            <p className="text-xs text-on-surface-variant mt-1">Monitor link performance, conversions, and commission status.</p>
          </div>
        </div>

        {activeLinks.length === 0 ? (
          <OnboardingEmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="text-left border-b border-surface-container text-on-surface-variant">
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Listing</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Clicks</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Conversions</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Earned</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Status</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Escrow</th>
                  <th className="pb-2 pr-0 font-bold text-xs uppercase tracking-wide text-right">Tracked Link</th>
                </tr>
              </thead>
              <tbody>
                {activeLinks.map((row) => (
                  <tr key={row.id} className="border-b border-surface-container-lowest last:border-0">
                    <td className="py-3 pr-3">
                      <p className="font-bold text-on-surface leading-tight">{row.listingTitle}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{row.category}</p>
                    </td>
                    <td className="py-3 pr-3 font-medium text-on-surface">{row.clicks.toLocaleString('en-IN')}</td>
                    <td className="py-3 pr-3 font-medium text-on-surface">{row.conversions.toLocaleString('en-IN')}</td>
                    <td className="py-3 pr-3 font-bold text-on-surface">{formatCurrency(row.earned)}</td>
                    <td className="py-3 pr-3">
                      <StatusPill label={row.status} />
                    </td>
                    <td className="py-3 pr-3">
                      <div className="inline-flex items-center gap-1.5">
                        <StatusPill label={row.escrowStatus} />
                        {row.escrowStatus === 'Locked in Escrow' && (
                          <span
                            title="Commissions unlock automatically when the buyer confirms delivery."
                            className="material-symbols-outlined text-[14px] text-on-surface-variant cursor-help"
                          >
                            info
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleCopy(row.trackedUrl, row.id)}
                        className={cn(
                          'inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-colors',
                          copiedId === row.id
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'
                        )}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedId === row.id ? 'done' : 'content_copy'}
                        </span>
                        {copiedId === row.id ? 'Copied' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-on-surface">Conversion & Payout History</h3>
            <p className="text-xs text-on-surface-variant mt-1">Track every referral order from conversion to payout release.</p>
          </div>
        </div>

        {conversionHistory.length === 0 ? (
          <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-6 text-sm text-on-surface-variant">
            No conversions yet. Your first successful referral will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="text-left border-b border-surface-container text-on-surface-variant">
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Date</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Listing</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Order</th>
                  <th className="pb-2 pr-3 font-bold text-xs uppercase tracking-wide">Status</th>
                  <th className="pb-2 pr-0 font-bold text-xs uppercase tracking-wide text-right">Payout</th>
                </tr>
              </thead>
              <tbody>
                {conversionHistory.map((row) => (
                  <tr key={row.id} className="border-b border-surface-container-lowest last:border-0">
                    <td className="py-3 pr-3 text-on-surface-variant">{row.date}</td>
                    <td className="py-3 pr-3">
                      <p className="font-medium text-on-surface">{row.listingTitle}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{row.notes}</p>
                    </td>
                    <td className="py-3 pr-3 text-on-surface-variant font-medium">{row.orderId}</td>
                    <td className="py-3 pr-3">
                      <StatusPill label={row.status} />
                    </td>
                    <td className="py-3 text-right font-bold text-on-surface">
                      {row.payout > 0 ? formatCurrency(row.payout) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default CampaignTable;
