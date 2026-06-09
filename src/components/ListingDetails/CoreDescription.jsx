import React from 'react';

const CoreDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mb-10">
      <h2 className="text-h3 font-headline mb-4">About this service</h2>
      <div className="text-on-surface-variant leading-relaxed whitespace-pre-line">
        {description}
      </div>
    </div>
  );
};

export default CoreDescription;
