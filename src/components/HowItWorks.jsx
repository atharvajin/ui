import React from 'react';
import { howItWorksFeatures } from '../data/mockData';

const HowItWorks = () => {
  return (
    <section className="bg-surface-container rounded-xl py-20 px-12 mb-32 grid grid-cols-1 md:grid-cols-3 gap-16">
      {howItWorksFeatures.map(feature => (
        <div key={feature.id} className="text-center">
          <div className="mb-6 flex justify-center">
            <span className="material-symbols-outlined text-5xl text-primary">{feature.icon}</span>
          </div>
          <h4 className="font-serif text-fluid-h3 mb-4">{feature.title}</h4>
          <p className="font-body text-on-surface-variant leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default HowItWorks;
