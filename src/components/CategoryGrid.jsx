import React from 'react';
import { Link } from 'react-router-dom';

const toRouteTaxonomyId = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const CategoryGrid = ({ categories, activeTab, activeLabel, domain, categoryKey }) => {
  const parentCategory = categoryKey
    ? toRouteTaxonomyId(categoryKey)
    : activeTab === 'All'
      ? ''
      : toRouteTaxonomyId(activeTab);
  const displayLabel = activeLabel || activeTab;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-on-surface">Explore {activeTab !== 'All' ? displayLabel : 'Our'} Categories</h2>
        {activeTab !== 'All' && parentCategory && (
          <Link
            to={`/${domain}/${parentCategory}/marketplace`}
            className="text-primary hover:text-primary/80 font-bold text-sm tracking-wider uppercase transition-colors"
          >
            All {displayLabel}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {categories.map((cat, idx) => {
          const taxonomyLeafId = toRouteTaxonomyId(cat.id || cat.title);
          const taxonomyGroupId = toRouteTaxonomyId(cat.parentGroupId || cat.id || cat.title);
          const targetPath = activeTab === 'All'
            ? `/${domain}/${taxonomyGroupId}/marketplace`
            : `/${domain}/${parentCategory}/marketplace?sub=${taxonomyLeafId}`;

          return (
            <Link
              to={targetPath}
              key={idx}
              className={`group relative aspect-[4/3] w-full h-full object-cover ${cat.bgColor} rounded-2xl p-10 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-lg transition-shadow  block`}
            >
              <h3 className={`font-serif text-fluid-h3 ${cat.textDim ? 'text-secondary-fixed-dim brightness-50' : 'text-on-surface'}`}>
                {cat.title}
              </h3>
              <div className={activeTab === 'Marketing'
                ? "absolute -bottom-8 -right-8 w-48 h-48 rounded-full overflow-hidden border-[8px] border-surface-container-lowest"
                : "absolute bottom-[-10%] right-[-10%] w-[240px] h-[240px] bg-white cutout-right flex items-center justify-center p-6 overflow-hidden shadow-sm"}
              >
                <img
                  alt={cat.altText || cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={cat.image}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
