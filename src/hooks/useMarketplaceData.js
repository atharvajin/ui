import { useMemo } from 'react';
import {
  getMarketplaceListingsByTaxonomy,
  getMarketplaceUnmappedListings,
} from '../data/listings/marketplace';
import {
  getLeafIdsForNode,
  getLeafOptionsForGroup,
  getTaxonomyNode,
  resolveTaxonomyId,
} from '../utils/taxonomy';

const getAvailableFilters = (listings) => {
  const allExperienceLevels = new Set();
  const allDeliveryTimes = new Set();
  const allConditions = new Set();

  listings.forEach((listing) => {
    if (listing.experienceLevel) allExperienceLevels.add(listing.experienceLevel);
    if (listing.deliveryTime) allDeliveryTimes.add(listing.deliveryTime);
    if (listing.condition) allConditions.add(listing.condition);
  });

  return {
    experienceLevel: Array.from(allExperienceLevels),
    deliveryTime: Array.from(allDeliveryTimes),
    condition: Array.from(allConditions),
  };
};

export const useMarketplaceData = (subCategoryId, domain) => {
  return useMemo(() => {
    if (!subCategoryId) return null;

    const canonicalTaxonomyId = resolveTaxonomyId(subCategoryId, domain) || subCategoryId;
    const taxonomyNode = getTaxonomyNode(canonicalTaxonomyId, domain);
    if (!taxonomyNode) return null;

    const matchingListings = getMarketplaceListingsByTaxonomy(
      taxonomyNode.id,
      taxonomyNode.domainId
    );
    const unmappedListings = getMarketplaceUnmappedListings(taxonomyNode.domainId);

    return {
      domain: taxonomyNode.domainId,
      taxonomyId: taxonomyNode.id,
      leafIds: getLeafIdsForNode(taxonomyNode),
      title: taxonomyNode.label,
      description: taxonomyNode.type === 'group'
        ? `Browse all ${taxonomyNode.label} listings. Secure escrow protection included.`
        : `Premium listings in ${taxonomyNode.label}. Secure escrow protection included.`,
      listings: matchingListings,
      siblings: getLeafOptionsForGroup(taxonomyNode.group),
      isGroupView: taxonomyNode.type === 'group',
      filters: getAvailableFilters(matchingListings),
      unmappedListings,
    };
  }, [subCategoryId, domain]);
};
