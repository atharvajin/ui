import React from 'react';

const ExpertCarousel = ({ experts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {experts.map((expert, idx) => (
        <div key={idx} className="group flex flex-col bg-white p-8 rounded-xl shadow-[0_24px_48px_rgba(77,100,94,0.06)] border border-outline-variant/5 relative">

          {/* Mock Verified Badge - Trust Signal */}
          <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-sm border border-surface-container z-10" title="Verified Expert">
            <span className="material-symbols-outlined text-[#10b981] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container">
              <img alt={expert.altText || expert.name} className="w-full h-full object-cover" src={expert.image}/>
            </div>
            <div>
              <h4 className="font-serif text-fluid-body text-on-surface">{expert.name}</h4>
              <div className="flex items-center gap-1 text-sm font-bold text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{expert.rating}</span>
              </div>
            </div>
          </div>
          <p className="font-body text-sm text-on-surface/60 mb-8 leading-relaxed">{expert.description}</p>
          <div className="flex justify-between items-center border-t border-surface-container pt-6 mt-auto">
            <span className="font-serif text-fluid-body text-primary">{expert.price}<span className="text-xs font-body text-outline">/hr</span></span>
            <button className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full transition-all font-label text-xs">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertCarousel;
