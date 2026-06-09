import { LISTINGS as richListings } from './rich.js';
import {
  criminalLawsuitsListings,
  contractDraftingListings,
  courtAppearanceListings,
  govtDocumentsListings,
} from './legal.js';
import {
  brandStrategyListings,
  contentCreationListings,
  socialMediaManagementListings,
  digitalAdsListings,
  seoListings,
  socialMediaListings,
} from './marketing.js';
import {
  softwareDevelopmentListings,
  aiIntegrationListings,
  cloudInfraListings,
} from './technical.js';
import {
  taxConsultingListings,
  financialPlanningListings,
  auditServicesListings,
} from './financial.js';
import { genericListings } from './generic.js';
import {
  listingMatchesTaxonomyId,
  normalizeTaxonomyId,
  resolveListingTaxonomy,
} from '../../utils/taxonomy.js';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop';

const SOURCE_DEFINITIONS = [
  {
    sourceKey: 'rich.listings',
    sourceFile: 'src/data/listings/rich.js',
    listings: richListings,
  },
  {
    sourceKey: 'legal.criminalLawsuitsListings',
    sourceFile: 'src/data/listings/legal.js',
    listings: criminalLawsuitsListings,
    defaults: {
      domain: 'services',
      groupId: 'legal',
      taxonomyLeafId: 'criminal-lawsuits',
      category: 'Criminal Lawsuits',
    },
  },
  {
    sourceKey: 'legal.contractDraftingListings',
    sourceFile: 'src/data/listings/legal.js',
    listings: contractDraftingListings,
    defaults: {
      domain: 'services',
      groupId: 'legal',
      taxonomyLeafId: 'contract-drafting',
      category: 'Contract Drafting',
    },
  },
  {
    sourceKey: 'legal.courtAppearanceListings',
    sourceFile: 'src/data/listings/legal.js',
    listings: courtAppearanceListings,
    defaults: {
      domain: 'services',
      groupId: 'legal',
      taxonomyLeafId: 'court-appearance',
      category: 'Court Appearance',
    },
  },
  {
    sourceKey: 'legal.govtDocumentsListings',
    sourceFile: 'src/data/listings/legal.js',
    listings: govtDocumentsListings,
    defaults: {
      domain: 'services',
      groupId: 'legal',
      taxonomyLeafId: 'govt-documents',
      category: 'Govt Documents',
    },
  },
  {
    sourceKey: 'marketing.brandStrategyListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: brandStrategyListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'brand-strategy',
      category: 'Brand Strategy',
    },
  },
  {
    sourceKey: 'marketing.contentCreationListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: contentCreationListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'content-creation',
      category: 'Content Creation',
    },
  },
  {
    sourceKey: 'marketing.socialMediaManagementListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: socialMediaManagementListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'social-media-management',
      category: 'Social Media Management',
    },
  },
  {
    sourceKey: 'marketing.digitalAdsListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: digitalAdsListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'digital-ads',
      category: 'Digital Ads',
    },
  },
  {
    sourceKey: 'marketing.seoListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: seoListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'seo',
      category: 'SEO & Performance',
    },
  },
  {
    sourceKey: 'marketing.socialMediaListings',
    sourceFile: 'src/data/listings/marketing.js',
    listings: socialMediaListings,
    defaults: {
      domain: 'services',
      groupId: 'marketing',
      taxonomyLeafId: 'social-media-management',
      category: 'Social Media Management',
    },
  },
  {
    sourceKey: 'technical.softwareDevelopmentListings',
    sourceFile: 'src/data/listings/technical.js',
    listings: softwareDevelopmentListings,
    defaults: {
      domain: 'services',
      groupId: 'technical',
      taxonomyLeafId: 'software-development',
      category: 'Software Development',
    },
  },
  {
    sourceKey: 'technical.aiIntegrationListings',
    sourceFile: 'src/data/listings/technical.js',
    listings: aiIntegrationListings,
    defaults: {
      domain: 'services',
      groupId: 'technical',
      taxonomyLeafId: 'ai-integration',
      category: 'AI Integration',
    },
  },
  {
    sourceKey: 'technical.cloudInfraListings',
    sourceFile: 'src/data/listings/technical.js',
    listings: cloudInfraListings,
    defaults: {
      domain: 'services',
      groupId: 'technical',
      taxonomyLeafId: 'cloud-infra',
      category: 'Cloud Infrastructure',
    },
  },
  {
    sourceKey: 'financial.taxConsultingListings',
    sourceFile: 'src/data/listings/financial.js',
    listings: taxConsultingListings,
    defaults: {
      domain: 'services',
      groupId: 'financial',
      taxonomyLeafId: 'tax-consulting',
      category: 'Tax Consulting',
    },
  },
  {
    sourceKey: 'financial.financialPlanningListings',
    sourceFile: 'src/data/listings/financial.js',
    listings: financialPlanningListings,
    defaults: {
      domain: 'services',
      groupId: 'financial',
      taxonomyLeafId: 'financial-planning',
      category: 'Financial Planning',
    },
  },
  {
    sourceKey: 'financial.auditServicesListings',
    sourceFile: 'src/data/listings/financial.js',
    listings: auditServicesListings,
    defaults: {
      domain: 'services',
      groupId: 'financial',
      taxonomyLeafId: 'audit-services',
      category: 'Audit Services',
    },
  },
  {
    sourceKey: 'generic.genericListings',
    sourceFile: 'src/data/listings/generic.js',
    listings: genericListings,
  },
];

const buildStableListingId = (sourceKey, fallbackIndex) =>
  `${sourceKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${fallbackIndex + 1}`;

const normalizeListingFromSource = (rawListing, sourceDefinition, fallbackIndex) => {
  const listing = { ...rawListing };
  const defaults = sourceDefinition.defaults || {};

  if (defaults.domain && !listing.domain) listing.domain = defaults.domain;
  if (defaults.groupId && !listing.subDomain) listing.subDomain = defaults.groupId;
  if (defaults.taxonomyLeafId && !listing.taxonomyLeafId) listing.taxonomyLeafId = defaults.taxonomyLeafId;
  if (defaults.category && !listing.category) listing.category = defaults.category;

  const resolvedTaxonomy = resolveListingTaxonomy(listing, defaults.domain);
  const primaryImage = listing.image || listing.images?.[0] || FALLBACK_IMAGE;
  const provider = listing.provider || listing.seller?.name || 'Marketplace Seller';
  const title = listing.title || provider;

  return {
    ...listing,
    id: String(listing.id || buildStableListingId(sourceDefinition.sourceKey, fallbackIndex)),
    title,
    provider,
    image: primaryImage,
    images:
      Array.isArray(listing.images) && listing.images.length > 0
        ? listing.images
        : [primaryImage],
    description:
      listing.description || listing.coreDescription || 'Details are available on the listing page.',
    coreDescription:
      listing.coreDescription || listing.description || 'Details are available on the listing page.',
    deliveryTime: listing.deliveryTime || 'TBD',
    experienceLevel: listing.experienceLevel || 'General',
    rating: listing.rating ?? '0',
    reviews: listing.reviews ?? '0',
    terms: listing.terms || listing.termsAndConditions || [],
    taxonomyLeafId: resolvedTaxonomy?.leaf?.id || listing.taxonomyLeafId || null,
    domain: resolvedTaxonomy?.domainId || listing.domain || null,
    subDomain: resolvedTaxonomy?.group?.id || listing.subDomain || null,
    category: resolvedTaxonomy?.leaf?.label || listing.category || null,
    _sourceKey: sourceDefinition.sourceKey,
    _sourceFile: sourceDefinition.sourceFile,
    _isMappedToTaxonomy: Boolean(resolvedTaxonomy),
  };
};

const duplicateListingIdWarnings = [];
const seenListingIds = new Set();

const allListingsWithDiagnostics = SOURCE_DEFINITIONS.flatMap((sourceDefinition) =>
  (Array.isArray(sourceDefinition.listings) ? sourceDefinition.listings : [])
    .filter((listing) => listing && typeof listing === 'object')
    .map((listing, index) => normalizeListingFromSource(listing, sourceDefinition, index))
    .map((normalizedListing) => {
      if (!seenListingIds.has(normalizedListing.id)) {
        seenListingIds.add(normalizedListing.id);
        return normalizedListing;
      }

      const dedupedId = `${normalizedListing.id}__${normalizeTaxonomyId(
        normalizedListing._sourceKey
      )}`;
      duplicateListingIdWarnings.push(
        `${normalizedListing.id} duplicated in ${normalizedListing._sourceFile}; renamed to ${dedupedId}`
      );
      seenListingIds.add(dedupedId);
      return {
        ...normalizedListing,
        id: dedupedId,
      };
    })
);

export const MARKETPLACE_LISTING_SOURCES = SOURCE_DEFINITIONS.map((sourceDefinition) => ({
  sourceKey: sourceDefinition.sourceKey,
  sourceFile: sourceDefinition.sourceFile,
  count: Array.isArray(sourceDefinition.listings) ? sourceDefinition.listings.length : 0,
}));

export const MARKETPLACE_ALL_LISTINGS = allListingsWithDiagnostics;
export const LISTINGS = MARKETPLACE_ALL_LISTINGS.filter((listing) => listing._isMappedToTaxonomy);
export const MARKETPLACE_UNMAPPED_LISTINGS = MARKETPLACE_ALL_LISTINGS.filter(
  (listing) => !listing._isMappedToTaxonomy
);

export const ALL_LISTINGS_MAP = Object.fromEntries(
  MARKETPLACE_ALL_LISTINGS.map((listing) => [listing.id, listing])
);

export const getMarketplaceListingById = (id) => ALL_LISTINGS_MAP[id];

export const getMarketplaceListingsByTaxonomy = (taxonomyId, domain) =>
  LISTINGS.filter((listing) => listingMatchesTaxonomyId(listing, taxonomyId, domain));

export const getRepresentativeListingForTaxonomy = (taxonomyId, domain) =>
  LISTINGS.find((listing) => listingMatchesTaxonomyId(listing, taxonomyId, domain)) || null;

export const getMarketplaceUnmappedListings = (domain) => {
  if (!domain) return MARKETPLACE_UNMAPPED_LISTINGS;
  const normalizedDomain = normalizeTaxonomyId(domain);
  return MARKETPLACE_UNMAPPED_LISTINGS.filter(
    (listing) => normalizeTaxonomyId(listing.domain) === normalizedDomain
  );
};

export const getMarketplaceDiagnostics = () => ({
  totalListings: MARKETPLACE_ALL_LISTINGS.length,
  mappedListings: LISTINGS.length,
  unmappedListings: MARKETPLACE_UNMAPPED_LISTINGS.length,
  duplicateListingIds: duplicateListingIdWarnings,
  sources: MARKETPLACE_LISTING_SOURCES,
});

if (import.meta?.env?.DEV && duplicateListingIdWarnings.length > 0) {
  console.warn('[marketplace] duplicate listing ids detected:', duplicateListingIdWarnings);
}

if (import.meta?.env?.DEV && MARKETPLACE_UNMAPPED_LISTINGS.length > 0) {
  console.warn(
    '[marketplace] unmapped listings excluded from taxonomy views:',
    MARKETPLACE_UNMAPPED_LISTINGS.map((listing) => ({
      id: listing.id,
      source: listing._sourceKey,
      file: listing._sourceFile,
    }))
  );
}
