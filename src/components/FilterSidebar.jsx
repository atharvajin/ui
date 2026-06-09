import { SORT_OPTIONS } from '../utils/constants';
import React, { useState } from 'react';
import { cn } from '../utils';

const CollapsibleSection = ({ title, isOpenDefault, children, onClear, showClear }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-6 border-b border-surface-container-high pb-4 last:border-0 last:pb-0 last:mb-0">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 items-center gap-2 font-serif text-lg text-on-surface hover:text-primary transition-colors text-left"
        >
          <span className="flex-1">{title}</span>
          <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            expand_more
          </span>
        </button>
        {showClear && (
          <button
            onClick={onClear}
            className="text-xs font-body font-bold text-primary/80 hover:text-primary transition-colors uppercase tracking-wider ml-4"
          >
            Clear
          </button>
        )}
      </div>

      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
      )}>
        <div className="overflow-hidden">
          <div className="pt-2 pb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSidebar = ({ siblings, filters, activeFilters, onFilterChange, activeSort, onSortChange }) => {

  const handleClearSection = (filterKey) => {
      // Create a simulated clear by repeatedly toggling selected values to off.
      // Better approach: filterChange supports a list or reset mode. Let's add a clear section case in parent.
      onFilterChange('clearSection', filterKey);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-on-surface">Filters</h2>
        {Object.values(activeFilters).some(arr => arr && arr.length > 0) && (
          <button
            onClick={() => onFilterChange('clear', null)}
            className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sub-categories Section (Multiple Checkboxes) */}
      {siblings && siblings.length > 0 && (
        <CollapsibleSection
          title="Categories"
          isOpenDefault={true}
          showClear={activeFilters.subCategories?.length > 0}
          onClear={() => handleClearSection('subCategories')}
        >
            <div className="space-y-2.5">
              {siblings.map((sibling) => (
                <label key={sibling.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <input
                      type="checkbox"
                      checked={activeFilters.subCategories?.includes(sibling.id) || false}
                      onChange={() => onFilterChange('subCategories', sibling.id)}
                      className="appearance-none w-5 h-5 rounded border-2 border-outline-variant checked:border-primary checked:bg-primary transition-colors cursor-pointer peer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                    />
                    <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className={cn(
                    "text-sm font-body transition-colors",
                    activeFilters.subCategories?.includes(sibling.id) ? "text-on-surface font-medium" : "text-on-surface-variant group-hover:text-on-surface"
                  )}>
                    {sibling.title}
                  </span>
                </label>
              ))}
            </div>
        </CollapsibleSection>
      )}

      {/* Sort Section */}
      <CollapsibleSection
        title="Sort By"
        isOpenDefault={true}
      >
        <div className="space-y-2.5">
          {Object.values(SORT_OPTIONS).map((sortOption) => (
            <label key={sortOption} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                <input
                  type="radio"
                  name="sort"
                  value={sortOption}
                  checked={activeSort === sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-outline-variant checked:border-primary transition-colors cursor-pointer peer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                />
                <div className="absolute w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <span className={cn(
                "text-sm font-body transition-colors",
                activeSort === sortOption ? "text-on-surface font-medium" : "text-on-surface-variant group-hover:text-on-surface"
              )}>
                {sortOption}
              </span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Experience Level Filter */}
      {filters.experienceLevel && filters.experienceLevel.length > 0 && (
        <CollapsibleSection
          title="Experience Level"
          isOpenDefault={false}
          showClear={activeFilters.experienceLevel?.length > 0}
          onClear={() => handleClearSection('experienceLevel')}
        >
          <div className="space-y-2.5">
            {filters.experienceLevel.map((level) => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <input
                    type="checkbox"
                    checked={activeFilters.experienceLevel?.includes(level) || false}
                    onChange={() => onFilterChange('experienceLevel', level)}
                    className="appearance-none w-5 h-5 rounded border-2 border-outline-variant checked:border-primary checked:bg-primary transition-colors cursor-pointer peer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                  />
                  <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm font-body text-on-surface-variant group-hover:text-on-surface transition-colors">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Delivery Time Filter */}
      {filters.deliveryTime && filters.deliveryTime.length > 0 && (
        <CollapsibleSection
          title="Delivery Time"
          isOpenDefault={false}
          showClear={activeFilters.deliveryTime?.length > 0}
          onClear={() => handleClearSection('deliveryTime')}
        >
          <div className="space-y-2.5">
            {filters.deliveryTime.map((time) => (
              <label key={time} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <input
                    type="checkbox"
                    checked={activeFilters.deliveryTime?.includes(time) || false}
                    onChange={() => onFilterChange('deliveryTime', time)}
                    className="appearance-none w-5 h-5 rounded border-2 border-outline-variant checked:border-primary checked:bg-primary transition-colors cursor-pointer peer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                  />
                  <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm font-body text-on-surface-variant group-hover:text-on-surface transition-colors">
                  {time}
                </span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

export default FilterSidebar;
