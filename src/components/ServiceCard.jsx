import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="flex gap-6 items-center p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition-colors">
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img alt={service.alt} className="w-full h-full object-cover" src={service.image}/>
      </div>
      <div>
        <h3 className="font-serif text-fluid-body mb-1">{service.title}</h3>
        <p className="text-[10px] font-body font-bold uppercase tracking-widest text-on-surface-variant mb-2">{service.rating}</p>
        <p className="font-body text-xs leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
