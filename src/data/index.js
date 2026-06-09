// ─────────────────────────────────────────────────────────────────────────────
// src/data/index.js — Barrel export (single source of truth for consumers)
//
// All existing named imports from '../data/mockData' continue to work through
// this barrel and the backward-compat shim in mockData.js.
// ─────────────────────────────────────────────────────────────────────────────

// ── Rich universal listings + O(1) map ────────────────────────────────────────
export {
  LISTINGS,
  ALL_LISTINGS_MAP,
  MARKETPLACE_ALL_LISTINGS,
  MARKETPLACE_UNMAPPED_LISTINGS,
  MARKETPLACE_LISTING_SOURCES,
  getMarketplaceDiagnostics,
} from './listings/marketplace';

// ── Physical goods ────────────────────────────────────────────────────────────
export { trendingProducts, electronicsTrending, fashionTrending } from './listings/physical';

// ── Digital assets + gaming ───────────────────────────────────────────────────
export { trendingDigitalAssets, gamingTrending } from './listings/digital';

// ── Events + tasks ────────────────────────────────────────────────────────────
export { trendingEvents, openTasks } from './listings/digital';

// ── Art & craft ───────────────────────────────────────────────────────────────
export { trendingArtwork, fineArtTrending } from './listings/art';

// ── Services: Legal ───────────────────────────────────────────────────────────
export {
  criminalLawsuitsListings,
  contractDraftingListings,
  courtAppearanceListings,
  govtDocumentsListings,
} from './listings/legal';

// ── Services: Marketing ───────────────────────────────────────────────────────
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

// ── Services: Technical ───────────────────────────────────────────────────────
export {
  softwareDevelopmentListings,
  aiIntegrationListings,
  cloudInfraListings,
  softwareDevelopmentDetails,
  aiIntegrationDetails,
  cloudInfraDetails,
} from './listings/technical';

// ── Services: Financial ───────────────────────────────────────────────────────
export {
  taxConsultingListings,
  financialPlanningListings,
  auditServicesListings,
  taxConsultingDetails,
  financialPlanningDetails,
  auditServicesDetails,
} from './listings/financial';

// ── Generic ───────────────────────────────────────────────────────────────────
export { genericListings } from './listings/generic';

// ── Category data map (fixes the original TDZ crash) ─────────────────────────
export { categoryDataMap } from './maps/categoryDataMap';

// ── Parent categories map ─────────────────────────────────────────────────────
export { parentCategoriesMap, parentCategoryDetails } from './maps/parentCategoriesMap';

// ── Services category grids & featured cards ──────────────────────────────────
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

// ── Explore page static data ──────────────────────────────────────────────────
export {
  exploreHeroTags,
  curatedCategories,
  howItWorksFeatures,
  auctions,
  localServices,
} from './explore/hero';

// ── Convenience: getListingById helper ───────────────────────────────────────
import { ALL_LISTINGS_MAP as _MAP } from './listings/marketplace';
export function getListingById(id) {
  return _MAP[id];
}
