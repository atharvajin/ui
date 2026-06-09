import React from 'react';

const SellerProfile = ({ seller, onContact }) => {
  if (!seller) return null;

  return (
    <div className="mb-10 p-6 bg-white rounded-2xl border border-surface-container flex flex-col md:flex-row gap-6 items-start md:items-center">
      <img
        src={seller.avatar}
        alt={seller.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-surface-container"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-on-surface mb-1">{seller.name}</h3>
        <p className="text-on-surface-variant text-sm mb-3">Member since {seller.memberSince}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-amber-500 fill-current">star</span>
            <span className="font-medium">{seller.rating}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant my-auto"></div>
          <div className="text-on-surface-variant">
            Responds in <span className="font-medium text-on-surface">{seller.responseTime}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onContact}
        className="px-5 py-2.5 rounded-full border border-outline font-medium hover:bg-surface-container-low transition-colors whitespace-nowrap flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">chat</span>
        Contact Me
      </button>
    </div>
  );
};

export default SellerProfile;

