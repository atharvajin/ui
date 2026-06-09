import React from 'react';
import { cn } from '../../utils';

const EvidenceGallery = ({ evidence = [] }) => {
  if (evidence.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-surface-container p-5 text-center">
        <p className="text-sm font-bold text-on-surface">No evidence shared yet</p>
        <p className="mt-1 text-xs text-on-surface-variant">
          Add files to keep the mediation timeline clear for both sides.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {evidence.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-surface-container bg-white p-3 flex items-start gap-3"
        >
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
              item.kind === 'image' ? 'bg-amber-100 text-amber-700' : 'bg-surface-container text-on-surface-variant'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">
              {item.kind === 'image' ? 'image' : 'description'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-on-surface truncate">{item.name}</p>
            <p className="text-[11px] text-on-surface-variant">
              Uploaded by {item.uploadedBy}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvidenceGallery;
