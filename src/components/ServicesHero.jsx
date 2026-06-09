import React from 'react';

const ServicesHero = () => {
  return (
    <section className="py-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-12 border-b border-surface-container-highest/30">
      <div className="flex-1">
        <h1 className="font-serif text-fluid-h2 md:text-fluid-h1 leading-tight mb-6">
          Curated <span className="italic font-light">Services</span> for <br/> Every Requirement
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed">
          Connect with top-tier professionals. From legal counsel to technical architecture, our vetted experts deliver exceptional results.
        </p>
        <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-label tracking-wide hover:shadow-xl transition-all flex items-center group">
          Explore All Services
          <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
        </button>
      </div>
      <div className="w-full md:w-1/3 max-w-[40%] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-primary/20">workspace_premium</span>
      </div>
    </section>
  );
};

export default ServicesHero;
