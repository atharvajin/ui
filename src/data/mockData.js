// ─────────────────────────────────────────────────────────────────────────────
// src/data/mockData.js — Backward-compatibility shim
//
// THE FIX: This file previously caused an import-time ReferenceError because
// `categoryDataMap` (an object literal) referenced `const` variables
// (softwareDevelopmentDetails, aiIntegrationDetails, cloudInfraDetails) that
// were declared BELOW it in the same file — a Temporal Dead Zone (TDZ) crash.
//
// All data now lives in domain-specific modules under src/data/listings/,
// src/data/categories/, src/data/maps/, and src/data/explore/.
// This file re-exports everything so existing consumer imports continue to work
// without any changes to page/component code.
// ─────────────────────────────────────────────────────────────────────────────

// ── Rich universal listings + O(1) lookup map ─────────────────────────────────
export {
  LISTINGS,
  ALL_LISTINGS_MAP,
  MARKETPLACE_ALL_LISTINGS,
  MARKETPLACE_UNMAPPED_LISTINGS,
  MARKETPLACE_LISTING_SOURCES,
  getMarketplaceDiagnostics,
} from './listings/marketplace';

// ── Physical goods ─────────────────────────────────────────────────────────────
export { trendingProducts, electronicsTrending, fashionTrending } from './listings/physical';

// ── Digital assets + gaming ────────────────────────────────────────────────────
export { trendingDigitalAssets, gamingTrending, trendingEvents, openTasks } from './listings/digital';

// ── Art & craft ────────────────────────────────────────────────────────────────
export { trendingArtwork, fineArtTrending } from './listings/art';

// ── Services: Legal ────────────────────────────────────────────────────────────
export {
  criminalLawsuitsListings,
  contractDraftingListings,
  courtAppearanceListings,
  govtDocumentsListings,
} from './listings/legal';

// ── Services: Marketing ────────────────────────────────────────────────────────
export {
  brandStrategyListings,
  contentCreationListings,
  socialMediaManagementListings,
  digitalAdsListings,
  seoListings,
  socialMediaListings,
  brandStrategyDetails,
  contentCreationDetails,
  socialMediaManagementDetails,
  digitalAdsDetails,
} from './listings/marketing';

// ── Services: Technical ────────────────────────────────────────────────────────
export {
  softwareDevelopmentListings,
  aiIntegrationListings,
  cloudInfraListings,
  softwareDevelopmentDetails,
  aiIntegrationDetails,
  cloudInfraDetails,
} from './listings/technical';

// ── Services: Financial ────────────────────────────────────────────────────────
export {
  taxConsultingListings,
  financialPlanningListings,
  auditServicesListings,
  taxConsultingDetails,
  financialPlanningDetails,
  auditServicesDetails,
} from './listings/financial';

// ── Generic fallback listings ──────────────────────────────────────────────────
export { genericListings } from './listings/generic';

// ── Category data map (TDZ fix: imports fully-initialized consts) ──────────────
export { categoryDataMap } from './maps/categoryDataMap';

// ── Parent categories map ──────────────────────────────────────────────────────
export { parentCategoriesMap, parentCategoryDetails } from './maps/parentCategoriesMap';

// ── Services category grids & featured cards ───────────────────────────────────
export {
  legalCategories,
  marketingCategories,
  marketingFrequentServices,
  weddingCategories,
  weddingFrequentServices,
  technicalCategories,
  technicalLeadCurators,
  financialCategories,
  travelCategories,
  creativesCategories,
  frequentServices,
} from './categories/services';

// ── Explore page static data ───────────────────────────────────────────────────
export {
  exploreHeroTags,
  curatedCategories,
  howItWorksFeatures,
  auctions,
  localServices,
} from './explore/hero';

// ── Helper: O(1) lookup by listing ID ─────────────────────────────────────────
import { ALL_LISTINGS_MAP as _MAP } from './listings/marketplace';

/**
 * getListingById(id) — used by ListingDetailsPage.jsx
 * @param {string} id
 * @returns {object|undefined}
 */
export function getListingById(id) {
  return _MAP[id];
}
