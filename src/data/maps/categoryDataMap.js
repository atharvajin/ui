import { FULL_TAXONOMY } from '../constants.js';
import {
  getMarketplaceListingsByTaxonomy,
  getRepresentativeListingForTaxonomy,
} from '../listings/marketplace.js';
import { getLeafOptionsForGroup } from '../../utils/taxonomy.js';

const buildFilters = (listings) => {
  const experienceLevel = new Set();
  const deliveryTime = new Set();
  const condition = new Set();

  listings.forEach((listing) => {
    if (listing.experienceLevel) experienceLevel.add(listing.experienceLevel);
    if (listing.deliveryTime) deliveryTime.add(listing.deliveryTime);
    if (listing.condition) condition.add(listing.condition);
  });

  return {
    experienceLevel: Array.from(experienceLevel),
    deliveryTime: Array.from(deliveryTime),
    condition: Array.from(condition),
  };
};

const taxonomyEntries = Object.entries(FULL_TAXONOMY).flatMap(([domainId, domainGroups]) =>
  Object.values(domainGroups).flatMap((group) =>
    (group.subCategories || []).map((leaf) => {
      const listings = getMarketplaceListingsByTaxonomy(leaf.id, domainId);
      const representativeListing = getRepresentativeListingForTaxonomy(leaf.id, domainId);

      return [
        leaf.id,
        {
          title: leaf.label,
          description: `Browse ${leaf.label.toLowerCase()} listings with escrow protection.`,
          listings,
          siblings: getLeafOptionsForGroup(group),
          filters: buildFilters(listings),
          taxonomyLeafId: leaf.id,
          domain: domainId,
          parentCategoryId: group.id,
          representativeImage: representativeListing?.image || null,
        },
      ];
    })
  )
);

const legacyEntries = [
  [
    'social-media',
    {
      title: 'Social Media',
      description: 'Legacy key retained for backward compatibility.',
      listings: [],
      filters: { experienceLevel: [], deliveryTime: [], condition: [] },
      siblings: [],
    },
  ],
  [
    'content-marketing',
    {
      title: 'Content Marketing',
      description: 'Legacy key retained for backward compatibility.',
      listings: [],
      filters: { experienceLevel: [], deliveryTime: [], condition: [] },
      siblings: [],
    },
  ],
  [
    'email-marketing',
    {
      title: 'Email Marketing',
      description: 'Legacy key retained for backward compatibility.',
      listings: [],
      filters: { experienceLevel: [], deliveryTime: [], condition: [] },
      siblings: [],
    },
  ],
  [
    'tax-consulting-old',
    {
      title: 'Tax Consulting',
      description: 'Legacy key retained for backward compatibility.',
      listings: [],
      filters: { experienceLevel: [], deliveryTime: [], condition: [] },
      siblings: [],
    },
  ],
];

export const categoryDataMap = Object.fromEntries([...taxonomyEntries, ...legacyEntries]);
