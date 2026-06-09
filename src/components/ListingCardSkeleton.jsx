import React from 'react';

const ListingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(48,51,49,0.04)] border border-surface-container flex flex-col h-full animate-pulse">
      <div className="aspect-[4/3] w-full bg-surface-container-high"></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="h-6 bg-surface-container-high rounded w-3/4 mb-4"></div>
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-surface-container-high rounded w-full"></div>
          <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
        </div>
        <div className="flex justify-between pt-4 border-t border-surface-container mt-auto">
          <div className="h-8 bg-surface-container-high rounded w-24"></div>
          <div className="h-8 bg-surface-container-high rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardSkeleton;
