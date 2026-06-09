import React from 'react';
import { RESOLUTION_ACTIONS } from '../../data/disputesData';

const ResolutionActionStrip = ({ role, onAction, disabled = false }) => {
  const isSeller = role === 'Seller';

  if (!isSeller) {
    return (
      <div className="rounded-xl bg-surface-container-lowest border border-surface-container p-3">
        <p className="text-xs text-on-surface-variant">
          Waiting for seller response. Admin escalation becomes available after 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-surface-container p-3">
      <p className="text-xs font-bold text-on-surface mb-2">Find a Solution</p>
      <div className="flex flex-wrap gap-2">
        {RESOLUTION_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction?.(action.id)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-outline-variant text-on-surface-variant hover:bg-white transition-colors disabled:opacity-60"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResolutionActionStrip;
