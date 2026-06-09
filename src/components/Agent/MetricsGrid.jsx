import React from 'react';
import { formatCurrency } from '../../utils/index';
import { cn } from '../../utils';

const MetricCard = ({ icon, label, value, sub, tone = 'emerald' }) => (
  <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
    <div className="flex items-start gap-4">
      <div
        className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
          tone === 'emerald' && 'bg-emerald-50 text-emerald-700 border border-emerald-100',
          tone === 'blue' && 'bg-blue-50 text-blue-700 border border-blue-100',
          tone === 'amber' && 'bg-amber-50 text-amber-700 border border-amber-100'
        )}
      >
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-on-surface-variant font-medium mb-1">{label}</p>
        <p className="font-serif text-2xl font-bold text-on-surface leading-none">{value}</p>
        {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
      </div>
    </div>
  </div>
);

const MetricsGrid = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        icon="ads_click"
        label="Total Clicks"
        value={summary.totalClicks.toLocaleString('en-IN')}
        sub="Across all active referral links"
        tone="blue"
      />
      <MetricCard
        icon="conversion_path"
        label="Conversions"
        value={summary.conversions.toLocaleString('en-IN')}
        sub={`${summary.conversionRate}% conversion rate`}
      />
      <MetricCard
        icon="lock"
        label={
          <span className="inline-flex items-center gap-1">
            Locked in Escrow
            <span
              title="Commissions unlock automatically when the buyer confirms delivery."
              className="material-symbols-outlined text-[14px] text-on-surface-variant cursor-help"
            >
              info
            </span>
          </span>
        }
        value={formatCurrency(summary.pendingEscrow)}
        sub="Awaiting delivery confirmation"
        tone="amber"
      />
      <MetricCard
        icon="wallet"
        label="Available Wallet"
        value={formatCurrency(summary.availableBalance)}
        sub="Ready to withdraw"
      />
    </div>
  );
};

export default MetricsGrid;
