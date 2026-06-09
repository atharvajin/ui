import React from 'react';
import { exploreHeroTags } from '../data/mockData';

const ExploreHero = () => {
  return (
    <section className="py-12 text-center">
      <div className="mb-8">
        <span className="material-symbols-outlined text-7xl font-thin text-on-surface/10">all_inclusive</span>
      </div>
      <h1 className="font-serif text-fluid-hero mb-12 text-on-surface">Discover the <span className="italic">Extraordinary</span></h1>
      <div className="flex flex-wrap justify-center gap-4">
        {exploreHeroTags.map(tag => (
          <button key={tag.id} className={`flex items-center gap-3 px-6 py-3 rounded-full border border-outline-variant/30 transition-all group hover:border-transparent ${tag.hoverClass} ${tag.shapeClass}`}>
            <span className={`material-symbols-outlined text-xl ${tag.colorClass}`}>{tag.icon}</span>
            <span className="font-serif text-fluid-body font-medium" dangerouslySetInnerHTML={{__html: tag.text}}></span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExploreHero;
