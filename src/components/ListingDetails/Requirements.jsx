import React from 'react';

const Requirements = ({ requirements }) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="mb-10 p-6 bg-surface-container-low rounded-2xl border border-surface-container">
      <h2 className="text-h3 font-headline mb-4">What we need from you</h2>
      <ul className="space-y-3">
        {requirements.map((req, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
            <span className="text-on-surface">{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
