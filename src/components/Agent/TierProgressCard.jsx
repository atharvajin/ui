import React from 'react';
import { cn } from '../../utils';

const TierProgressCard = ({ summary, tierConfig }) => {
  const currentTier = tierConfig?.[summary.tierName];
  const currentRate = currentTier?.commissionRate ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Tier Progress</p>
            <h2 className="font-serif text-2xl text-on-surface leading-tight">
              {summary.tierName} Tier Agent ({currentRate}% Commission)
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              {summary.conversionsToNextTier} more conversions to unlock {summary.nextTierName}.
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-emerald-700" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-on-surface-variant">Progress to {summary.nextTierName}</span>
            <span className="text-emerald-700">{summary.tierPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-emerald-100 overflow-hidden">
            <div
              className={cn('h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500')}
              style={{ width: `${summary.tierPercent}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-on-surface-variant">
          Keep sharing high-intent listings to reach {summary.nextTierName} faster and increase commission per closed order.
        </p>
      </div>
    </div>
  );
};

export default TierProgressCard;
