import React from 'react';

const AuctionCard = ({ auction }) => {
  return (
    <div className="min-w-[320px] group">
      <div className="h-96 rounded-xl bg-surface-container overflow-hidden mb-6 relative">
        <img alt={auction.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={auction.image}/>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary font-body">{auction.endTime}</div>
      </div>
      <h3 className="font-serif text-fluid-body mb-1">{auction.title}</h3>
      <p className="font-body text-on-surface-variant text-sm mb-4">Current Bid: {auction.currentBid}</p>
      <button className="w-full bg-primary text-on-primary py-4 rounded-full font-serif italic text-sm tracking-widest uppercase transition-transform active:scale-95">Place Bid</button>
    </div>
  );
};

export default AuctionCard;
