import { SERVICES_CATEGORIES } from '../constants';

export const parentCategoriesMap = Object.fromEntries(
  Object.values(SERVICES_CATEGORIES).map((group) => [
    group.id,
    group.subCategories.map((leaf) => leaf.id),
  ])
);

export const parentCategoryDetails = Object.fromEntries(
  Object.values(SERVICES_CATEGORIES).map((group) => [
    group.id,
    {
      title: `${group.label} Services`,
      description: `Browse ${group.label.toLowerCase()} services with escrow protection.`,
    },
  ])
);
