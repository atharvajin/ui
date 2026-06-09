import { SORT_OPTIONS } from '../utils/constants';
import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';
import ListingCardSkeleton from '../components/ListingCardSkeleton';
import ActiveFiltersBar from '../components/ActiveFiltersBar';
import SubNav from '../components/SubNav';
import Breadcrumbs from '../components/Breadcrumbs';

import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { useMarketplaceFilters } from '../hooks/useMarketplaceFilters';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { FULL_TAXONOMY } from '../data/constants';
import { getTaxonomyNode, normalizeTaxonomyId, resolveTaxonomyId } from '../utils/taxonomy';

const MarketplacePage = () => {
  // Extract both domain and subCategoryId from URL
  const { domain, subCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const canonicalRouteTaxonomyId = useMemo(
    () => resolveTaxonomyId(subCategoryId, domain) || normalizeTaxonomyId(subCategoryId),
    [subCategoryId, domain]
  );

  // Determine which tabs to show based on the URL domain
  const currentTabs = useMemo(() => {
    const domainData = FULL_TAXONOMY[domain] || FULL_TAXONOMY['services'];
    return [
      { id: 'all', icon: 'grid_view', label: 'All' },
      ...Object.values(domainData).map(group => ({
        id: group.id,
        icon: group.icon,
        label: group.label
      }))
    ];
  }, [domain]);

  const activeTab = useMemo(() => {
    const node = getTaxonomyNode(canonicalRouteTaxonomyId, domain);
    const activeGroupId = node?.type === 'leaf' ? node.group.id : node?.id;
    const tab = currentTabs.find(t => normalizeTaxonomyId(t.id) === normalizeTaxonomyId(activeGroupId));
    return tab ? tab.id : currentTabs.find((candidate) => candidate.id !== 'all')?.id;
  }, [canonicalRouteTaxonomyId, currentTabs, domain]);

  const handleTabClick = (tabId) => {
    if (tabId === 'all') {
      navigate(`/${domain}`);
      return;
    }

    const canonicalTabId = resolveTaxonomyId(tabId, domain) || normalizeTaxonomyId(tabId);

    if (tabId === activeTab) {
      // Reset filters if clicking the already active tab
      navigate(`/${domain}/${canonicalTabId}/marketplace`);
      return;
    }

    navigate(`/${domain}/${canonicalTabId}/marketplace`);
  };

  useScrollPosition(location.pathname + location.search);
  const queryParams = new URLSearchParams(location.search);
  const initialSubCat = queryParams.get('sub');

  const marketplaceData = useMarketplaceData(canonicalRouteTaxonomyId, domain);

  const {
    activeSort,
    setActiveSort,
    activeFilters,
    handleFilterChange,
    isPending: isUpdating,
    processedListings
  } = useMarketplaceFilters(initialSubCat, marketplaceData, canonicalRouteTaxonomyId);

  if (!marketplaceData) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-body">
        <main className="flex-1 flex items-center justify-center pt-8 pb-16">
          <div className="text-center">
            <h1 className="font-serif text-4xl mb-4">Category Not Found</h1>
            <p className="text-on-surface-variant">The category you're looking for doesn't exist or hasn't been implemented yet.</p>
          </div>
        </main>
      </div>
    );
  }

  const hasActiveFilters = Object.values(activeFilters).some(
    (values) => Array.isArray(values) && values.length > 0
  );
  const isCategoryEmpty = !hasActiveFilters && marketplaceData.listings.length === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <main className="flex-1 pb-24">
        {/* Sub Navigation */}
        <section className="page-container mb-8 pt-0">
          <SubNav items={currentTabs} activeItem={activeTab} onSelect={handleTabClick} />
        </section>

        {/* Category Header */}
        <div className="bg-surface-container-low py-12 mb-12 border-b border-surface-container">
          <div className="page-container">
            <Breadcrumbs />
            <h1 className="font-serif text-4xl md:text-5xl text-on-surface mb-4">
              {marketplaceData.title}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl font-body">
              {marketplaceData.description}
            </p>
          </div>
        </div>

        <div className="page-container flex flex-col lg:flex-row gap-10">

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-150px)] flex flex-col">
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(48,51,49,0.04)] border border-surface-container overflow-y-auto custom-scrollbar flex-1">
                <FilterSidebar
                  siblings={marketplaceData.siblings}
                  filters={marketplaceData.filters}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  activeSort={activeSort}
                  onSortChange={(val) => setActiveSort(val)}
                />
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1 @container">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant font-medium">
                Showing {processedListings.length} results
              </p>
            </div>

            <ActiveFiltersBar activeFilters={activeFilters} marketplaceData={marketplaceData} handleFilterChange={handleFilterChange} />

            {import.meta.env.DEV && marketplaceData.unmappedListings.length > 0 && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
                {marketplaceData.unmappedListings.length} listing(s) are currently unmapped and excluded
                from taxonomy views:
                {' '}
                {marketplaceData.unmappedListings
                  .slice(0, 8)
                  .map((listing) => listing.id)
                  .join(', ')}
                {marketplaceData.unmappedListings.length > 8 ? ', ...' : ''}
              </div>
            )}

            {isUpdating ? (
              <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            ) : processedListings.length > 0 ? (
              <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
                {processedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-surface-container">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">search_off</span>
                <h3 className="font-serif text-xl mb-2">
                  {isCategoryEmpty ? 'No listings in this category yet' : 'No listings found'}
                </h3>
                <p className="text-on-surface-variant mb-6">
                  {isCategoryEmpty
                    ? 'This taxonomy path is valid, but there are no mapped listings to display right now.'
                    : 'Try adjusting your filters to see more results.'}
                </p>
                {!isCategoryEmpty && (
                  <button
                    onClick={() => handleFilterChange('clear', null)}
                    className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
