import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/index';
import Button from './Button';

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(48,51,49,0.04)] border border-surface-container hover:shadow-[0_8px_30px_rgba(48,51,49,0.08)] transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
        <Link to={`/listing/${listing.id}`} className="w-full h-full block">
          <img
            src={listing.image}
            alt={listing.altText || listing.provider}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Mock Verified Badge */}
        {/* Accessible Tooltip for Verified Badge */}
        <button
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm flex items-center justify-center group/tooltip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Verified Expert"
        >
          <span className="material-symbols-outlined text-[16px] text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 bg-inverse-surface text-inverse-on-surface text-xs rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus/tooltip:opacity-100 group-focus/tooltip:visible transition-all pointer-events-none z-10">
            Verified Expert
          </span>
        </button>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-amber-500 fill-current">star</span>
          <span className="text-sm font-bold text-on-surface">{listing.rating}</span>
          <span className="text-xs text-outline-variant">({listing.reviews})</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/listing/${listing.id}`} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            <h3 className="font-serif text-xl text-on-surface line-clamp-1">{listing.provider}</h3>
          </Link>
        </div>

        <p className="text-sm text-on-surface-variant font-body mb-4 line-clamp-3 flex-1">
          {listing.description}
        </p>

        <div className="flex items-center gap-4 mb-5 text-sm text-on-surface-variant font-body">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>{listing.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>{listing.experienceLevel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-surface-container mt-auto">
          <div>
            <p className="text-xs text-outline-variant mb-0.5">Starting at</p>
            <p className="font-serif text-lg font-bold text-on-surface">{formatCurrency(listing.price)}</p>
          </div>
          <Link to={`/listing/${listing.id}`}>
            <Button variant="outline" size="sm" className="bg-surface-container-high border-outline-variant/10 text-on-surface">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
