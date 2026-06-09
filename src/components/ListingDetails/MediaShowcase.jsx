import React from 'react';

const MediaShowcase = ({ images, title }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        <div className="md:col-span-2 h-64 md:h-96">
          <img src={images[0]} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:flex flex-col gap-2 h-96">
          {images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="flex-1 h-1/2">
              <img src={img} alt={`${title} - view ${idx + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaShowcase;
