import React from 'react';

const ActiveFiltersBar = ({ activeFilters, marketplaceData, handleFilterChange }) => {
  if (!Object.values(activeFilters).some((arr) => arr.length > 0)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(activeFilters).map(([key, values]) =>
        values.map((val) => {
          let displayVal = val;
          if (key === 'subCategories') {
            const sibling = marketplaceData.siblings.find((s) => s.id === val);
            if (sibling) displayVal = sibling.title;
          }
          return (
            <div
              key={`${key}-${val}`}
              className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full text-sm font-body text-on-surface"
            >
              <span>{displayVal}</span>
              <button
                onClick={() => handleFilterChange(key, val)}
                className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          );
        })
      )}
      <button
        onClick={() => handleFilterChange('clear', null)}
        className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors ml-2"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFiltersBar;
