import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FULL_TAXONOMY } from '../data/constants';
import { getTaxonomyNode, resolveTaxonomyId } from '../utils/taxonomy';

const toDisplayLabel = (value) =>
  String(value || '')
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (items?.length) {
    return (
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm font-body text-on-surface-variant">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <li>
                  {item.path && !isLast ? (
                    <Link to={item.path} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-on-surface font-medium" aria-current={isLast ? 'page' : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
                {!isLast && (
                  <li>
                    <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }

  const getBreadcrumbLabel = (value, index) => {
    if (value === 'marketplace') return 'Marketplace';

    if (index === 0 && FULL_TAXONOMY[value]) {
      return toDisplayLabel(value);
    }

    const domainId = pathnames[0];
    const canonicalTaxonomyId = resolveTaxonomyId(value, domainId);
    if (canonicalTaxonomyId) {
      const taxonomyNode = getTaxonomyNode(canonicalTaxonomyId, domainId);
      if (taxonomyNode) return taxonomyNode.label;
    }

    return toDisplayLabel(value);
  };

  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm font-body text-on-surface-variant">
        <li>
          <Link to="/" className="hover:text-primary transition-colors flex items-center">
            <span className="material-symbols-outlined text-[16px]">home</span>
          </Link>
        </li>

        {pathnames.length > 0 && (
          <li>
            <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
          </li>
        )}

        {pathnames.map((value, index) => {
          let to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = getBreadcrumbLabel(value, index);

          return (
            <React.Fragment key={to}>
              <li>
                {isLast ? (
                  <span className="text-on-surface font-medium" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link to={to} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li>
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
