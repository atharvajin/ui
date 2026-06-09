import { FULL_TAXONOMY } from '../data/constants.js';

export const normalizeTaxonomyId = (value) =>
  String(value || '').trim().toLowerCase();

const slugifyTaxonomyValue = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getDomainsToSearch = (domain) =>
  domain ? [[domain, getDomainGroups(domain)]] : Object.entries(FULL_TAXONOMY);

export const getDomainGroups = (domain) => FULL_TAXONOMY[domain] || null;

export const getGroupById = (groupId, domain) => {
  const normalizedGroupId = normalizeTaxonomyId(groupId);
  const domains = getDomainsToSearch(domain);

  for (const [domainId, groups] of domains) {
    if (!groups) continue;
    const group = Object.values(groups).find((candidate) => normalizeTaxonomyId(candidate.id) === normalizedGroupId);
    if (group) return { domainId, group };
  }

  return null;
};

export const getLeafById = (leafId, domain) => {
  const normalizedLeafId = normalizeTaxonomyId(leafId);
  const domains = getDomainsToSearch(domain);

  for (const [domainId, groups] of domains) {
    if (!groups) continue;
    for (const group of Object.values(groups)) {
      const leaf = group.subCategories?.find((candidate) => normalizeTaxonomyId(candidate.id) === normalizedLeafId);
      if (leaf) return { domainId, group, leaf };
    }
  }

  return null;
};

export const resolveTaxonomyId = (value, domain) => {
  const normalizedValue = normalizeTaxonomyId(value);
  if (!normalizedValue) return null;

  const directNode = getTaxonomyNode(normalizedValue, domain);
  if (directNode) return directNode.id;

  const slugValue = slugifyTaxonomyValue(value);
  if (slugValue) {
    const slugNode = getTaxonomyNode(slugValue, domain);
    if (slugNode) return slugNode.id;
  }

  const domains = getDomainsToSearch(domain);

  for (const [, groups] of domains) {
    if (!groups) continue;
    for (const group of Object.values(groups)) {
      if (
        normalizeTaxonomyId(group.label) === normalizedValue ||
        slugifyTaxonomyValue(group.label) === slugValue
      ) {
        return group.id;
      }

      const leaf = group.subCategories?.find(
        (candidate) =>
          normalizeTaxonomyId(candidate.label) === normalizedValue ||
          slugifyTaxonomyValue(candidate.label) === slugValue
      );

      if (leaf) return leaf.id;
    }
  }

  return null;
};

export const getTaxonomyNode = (taxonomyId, domain) => {
  const leafMatch = getLeafById(taxonomyId, domain);
  if (leafMatch) {
    return {
      type: 'leaf',
      domainId: leafMatch.domainId,
      group: leafMatch.group,
      leaf: leafMatch.leaf,
      id: leafMatch.leaf.id,
      label: leafMatch.leaf.label,
    };
  }

  const groupMatch = getGroupById(taxonomyId, domain);
  if (groupMatch) {
    return {
      type: 'group',
      domainId: groupMatch.domainId,
      group: groupMatch.group,
      id: groupMatch.group.id,
      label: groupMatch.group.label,
    };
  }

  return null;
};

export const getLeafIdsForNode = (node) => {
  if (!node) return [];
  if (node.type === 'leaf') return [node.leaf.id];
  return node.group.subCategories?.map((leaf) => leaf.id) || [];
};

export const getLeafOptionsForGroup = (group) =>
  group?.subCategories?.map((leaf) => ({
    id: leaf.id,
    title: leaf.label,
  })) || [];

export const resolveListingTaxonomy = (listing, domainHint) => {
  if (!listing) return null;

  const domain = domainHint || listing.domain;
  const explicitLeafId = resolveTaxonomyId(listing.taxonomyLeafId || listing.subCategory, domain);
  if (explicitLeafId) {
    const explicitLeaf = getLeafById(explicitLeafId, domain);
    if (explicitLeaf) return explicitLeaf;
  }

  const normalizedSubDomain = resolveTaxonomyId(listing.subDomain, domain) || listing.subDomain;
  const groupMatch = getGroupById(normalizedSubDomain, domain);
  if (groupMatch) {
    const label = normalizeTaxonomyId(listing.category);
    const leaf = groupMatch.group.subCategories?.find(
      (candidate) => normalizeTaxonomyId(candidate.label) === label || normalizeTaxonomyId(candidate.id) === label
    );
    if (leaf) return { domainId: groupMatch.domainId, group: groupMatch.group, leaf };
  }

  const leafFromSubDomain = getLeafById(
    resolveTaxonomyId(listing.subDomain, domain) || listing.subDomain,
    domain
  );
  if (leafFromSubDomain) return leafFromSubDomain;

  const leafFromSlug = getLeafById(resolveTaxonomyId(listing.slug, domain) || listing.slug, domain);
  if (leafFromSlug) return leafFromSlug;

  return null;
};

export const listingMatchesTaxonomyId = (listing, taxonomyId, domain) => {
  const node = getTaxonomyNode(taxonomyId, domain);
  const resolved = resolveListingTaxonomy(listing, domain);
  if (!node || !resolved) return false;

  if (node.type === 'group') {
    return resolved.domainId === node.domainId && resolved.group.id === node.group.id;
  }

  return resolved.domainId === node.domainId && resolved.leaf.id === node.leaf.id;
};

export const getUnmatchedListings = (listings) =>
  listings.filter((listing) => !resolveListingTaxonomy(listing));
