import { useState, useMemo, useTransition, useCallback, useEffect, useRef } from 'react';
import { SORT_OPTIONS } from '../utils/constants';
import { listingMatchesTaxonomyId, resolveTaxonomyId } from '../utils/taxonomy';

export const useMarketplaceFilters = (initialSubCat, marketplaceData, subCategoryId) => {
  const canonicalInitialSubCat = useMemo(
    () => resolveTaxonomyId(initialSubCat, marketplaceData?.domain),
    [initialSubCat, marketplaceData?.domain]
  );

  const [activeSort, setActiveSort] = useState(SORT_OPTIONS.RECOMMENDED);
  const [isPending, startTransition] = useTransition();
  const [activeFilters, setActiveFilters] = useState({
    experienceLevel: [],
    deliveryTime: [],
    subCategories: canonicalInitialSubCat ? [canonicalInitialSubCat] : []
  });
  const [debouncedFilters, setDebouncedFilters] = useState(activeFilters);
  const prevSubCategory = useRef(subCategoryId);
  const debounceTimer = useRef(null);

  // Clean state transitions: explicitly reset filters when category changes
  useEffect(() => {
    if (prevSubCategory.current !== subCategoryId) {
      const newFilters = {
        experienceLevel: [],
        deliveryTime: [],
        subCategories: canonicalInitialSubCat ? [canonicalInitialSubCat] : []
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveFilters(newFilters);
      setDebouncedFilters(newFilters);
      setActiveSort(SORT_OPTIONS.RECOMMENDED);
      prevSubCategory.current = subCategoryId;
    }
  }, [subCategoryId, canonicalInitialSubCat]);

  const updateDebouncedFilters = useCallback((filters) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      startTransition(() => {
        setDebouncedFilters(filters);
      });
    }, 300);
  }, []);

  useEffect(() => () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, []);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      const newFilters = {
        experienceLevel: [],
        deliveryTime: [],
        subCategories: []
      };
      setActiveFilters(newFilters);
      updateDebouncedFilters(newFilters);
      return;
    }

    if (filterType === 'clearSection') {
      setActiveFilters(prev => {
        const newFilters = {
          ...prev,
          [value]: []
        };
        updateDebouncedFilters(newFilters);
        return newFilters;
      });
      return;
    }

    setActiveFilters(prev => {
      if (filterType === 'subCategories') {
        const resolvedSubCategoryId = resolveTaxonomyId(value, marketplaceData?.domain);
        if (!resolvedSubCategoryId) return prev;

        const isSelected = prev.subCategories.includes(resolvedSubCategoryId);
        const nextSubCategories = isSelected
          ? prev.subCategories.filter((taxonomyId) => taxonomyId !== resolvedSubCategoryId)
          : [...prev.subCategories, resolvedSubCategoryId];

        const newFilters = {
          ...prev,
          subCategories: nextSubCategories,
        };

        updateDebouncedFilters(newFilters);
        return newFilters;
      }

      const currentFilters = prev[filterType] || [];
      const isSelected = currentFilters.includes(value);

      const newFilters = {
        ...prev,
        [filterType]: isSelected
          ? currentFilters.filter(v => v !== value)
          : [...currentFilters, value]
      };
      updateDebouncedFilters(newFilters);
      return newFilters;
    });
  };

  const processedListings = useMemo(() => {
    if (!marketplaceData) return [];

    let result = [...marketplaceData.listings];

    if (debouncedFilters.subCategories.length > 0) {
      result = result.filter((listing) =>
        debouncedFilters.subCategories.some((taxonomyId) =>
          listingMatchesTaxonomyId(
            listing,
            resolveTaxonomyId(taxonomyId, marketplaceData.domain),
            marketplaceData.domain
          )
        )
      );
    }

    // Apply Other Filters
    if (debouncedFilters.experienceLevel.length > 0) {
      result = result.filter(listing => debouncedFilters.experienceLevel.includes(listing.experienceLevel));
    }

    if (debouncedFilters.deliveryTime.length > 0) {
      result = result.filter(listing => debouncedFilters.deliveryTime.includes(listing.deliveryTime));
    }

    // Apply Sorting
            const parsePrice = (priceStr) => {
      if (typeof priceStr === 'number') return priceStr;
      if (!priceStr) return 0;
      return parseFloat(priceStr.toString().replace(/[^0-9.]/g, ''));
    };

    const parseReviews = (reviewsStr) => {
      if (typeof reviewsStr === 'number') return reviewsStr;
      if (!reviewsStr) return 0;
      return parseInt(reviewsStr.toString().replace(/[^0-9]/g, ''));
    };

    switch (activeSort) {
      case SORT_OPTIONS.PRICE_LOW_TO_HIGH:
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case SORT_OPTIONS.PRICE_HIGH_TO_LOW:
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case SORT_OPTIONS.HIGHEST_RATED:
        result.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
        break;
      case SORT_OPTIONS.RECOMMENDED:
      default:
        result.sort((a, b) => (parseFloat(b.rating || 0) * parseReviews(b.reviews)) - (parseFloat(a.rating || 0) * parseReviews(a.reviews)));
        break;
    }

    return result;
  }, [marketplaceData, activeSort, debouncedFilters]);

  return {
    activeSort,
    setActiveSort,
    activeFilters,
    handleFilterChange,
    isPending,
    processedListings
  };
};
