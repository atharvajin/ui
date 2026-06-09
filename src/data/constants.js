// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY CONSTANTS
// Authoritative source of truth for all categories and sub-categories.
// Components should import from here rather than use inline strings.
// ─────────────────────────────────────────────────────────────────────────────

// ── Top-level Domains ──────────────────────────────────────────────────────
export const DOMAINS = {
  PHYSICAL_GOODS:  'physical-goods',
  DIGITAL_ASSETS:  'digital-assets',
  SERVICES:        'services',
  ART_AND_CRAFT:   'art-craft',
  EVENTS_TASKS:    'events-tasks',
};

// ── Physical Goods Sub-categories ──────────────────────────────────────────
export const PHYSICAL_GOODS_CATEGORIES = {
  ELECTRONICS: {
    id:    'electronics',
    label: 'Electronics',
    icon:  'devices',
    color: 'bg-sky-50 text-sky-700',
    subCategories: [
      { id: 'smartphones',       label: 'Smartphones & Tablets' },
      { id: 'laptops',           label: 'Laptops & Computers'   },
      { id: 'audio-wearables',  label: 'Audio & Wearables'     },
      { id: 'pc-components',    label: 'PC Components'         },
      { id: 'cameras',           label: 'Cameras & Lenses'      },
    ],
  },
  FASHION: {
    id:    'fashion',
    label: 'Fashion',
    icon:  'checkroom',
    color: 'bg-pink-50 text-pink-700',
    subCategories: [
      { id: 'vintage-thrift',     label: 'Vintage & Thrift'       },
      { id: 'sneakers',           label: 'Sneakers'               },
      { id: 'watches-accessories',label: 'Watches & Accessories'  },
      { id: 'designer-bags',      label: 'Designer Bags'          },
    ],
  },
  HOME_LIVING: {
    id:    'home',
    label: 'Home & Living',
    icon:  'chair',
    color: 'bg-amber-50 text-amber-700',
    subCategories: [
      { id: 'appliances',      label: 'Home Appliances'   },
      { id: 'office-furniture',label: 'Office Furniture'  },
      { id: 'home-decor',      label: 'Home Décor'        },
      { id: 'lighting',        label: 'Lighting'          },
    ],
  },
};

// ── Digital Assets Sub-categories ──────────────────────────────────────────
export const DIGITAL_ASSETS_CATEGORIES = {
  GAMING: {
    id:    'gaming',
    label: 'Gaming',
    icon:  'sports_esports',
    color: 'bg-violet-50 text-violet-700',
    subCategories: [
      { id: 'game-accounts',     label: 'Game Accounts'     },
      { id: 'in-game-skins',    label: 'In-Game Skins'     },
      { id: 'gaming-gift-cards',label: 'Gaming Gift Cards'  },
    ],
  },
  GIFT_CARDS: {
    id:    'vouchers',
    label: 'Gift Cards',
    icon:  'card_giftcard',
    color: 'bg-rose-50 text-rose-700',
    subCategories: [
      { id: 'ecommerce-vouchers',label: 'E-commerce Vouchers' },
      { id: 'travel-vouchers',  label: 'Travel Vouchers'     },
      { id: 'food-delivery',    label: 'Food Delivery'       },
    ],
  },
  SOCIAL_MEDIA: {
    id:    'social',
    label: 'Social Media',
    icon:  'group',
    color: 'bg-indigo-50 text-indigo-700',
    subCategories: [
      { id: 'instagram-accounts',label: 'Instagram Pages'   },
      { id: 'youtube-channels', label: 'YouTube Channels'  },
      { id: 'twitter-handles',  label: 'X / Twitter'       },
    ],
  },
};

// ── Services Sub-categories ────────────────────────────────────────────────
export const SERVICES_CATEGORIES = {
  LEGAL: {
    id:    'legal',
    label: 'Legal',
    icon:  'gavel',
    color: 'bg-slate-50 text-slate-700',
    subCategories: [
      { id: 'contract-drafting',  label: 'Contract Drafting'    },
      { id: 'court-appearance',   label: 'Court Appearance'     },
      { id: 'govt-documents',     label: 'Govt Documents'       },
      { id: 'criminal-lawsuits',  label: 'Criminal Lawsuits'    },
      { id: 'corporate-advisory', label: 'Corporate Advisory'   },
    ],
  },
  MARKETING: {
    id:    'marketing',
    label: 'Marketing',
    icon:  'campaign',
    color: 'bg-orange-50 text-orange-700',
    subCategories: [
      { id: 'brand-strategy',           label: 'Brand Strategy'            },
      { id: 'content-creation',          label: 'Content Creation'          },
      { id: 'social-media-management',  label: 'Social Media Management'  },
      { id: 'digital-ads',              label: 'Digital Ads'               },
      { id: 'seo',                        label: 'SEO & Performance'         },
    ],
  },
  TECHNICAL: {
    id:    'technical',
    label: 'Technical',
    icon:  'code',
    color: 'bg-emerald-50 text-emerald-700',
    subCategories: [
      { id: 'software-development',label: 'Software Development' },
      { id: 'ai-integration',      label: 'AI Integration'       },
      { id: 'cloud-infra',         label: 'Cloud Infrastructure' },
      { id: 'cybersecurity',       label: 'Cybersecurity'        },
    ],
  },
  CREATIVES: {
    id:    'creatives',
    label: 'Creatives',
    icon:  'brush',
    color: 'bg-fuchsia-50 text-fuchsia-700',
    subCategories: [
      { id: 'logo-design',  label: 'Logo & Identity' },
      { id: 'illustration', label: 'Illustration'     },
      { id: 'video-editing',label: 'Video Editing'   },
      { id: 'copywriting',  label: 'Copywriting'     },
    ],
  },
  FINANCIAL: {
    id:    'financial',
    label: 'Financial',
    icon:  'account_balance',
    color: 'bg-green-50 text-green-700',
    subCategories: [
      { id: 'tax-consulting',      label: 'Tax Consulting'      },
      { id: 'financial-planning',  label: 'Financial Planning'  },
      { id: 'audit-services',      label: 'Audit Services'      },
    ],
  },
  TRAVEL: {
    id:    'travel',
    label: 'Travel',
    icon:  'flight',
    color: 'bg-cyan-50 text-cyan-700',
    subCategories: [
      { id: 'itinerary-planning',  label: 'Itinerary Planning'  },
      { id: 'visa-assistance',     label: 'Visa Assistance'     },
      { id: 'corporate-booking',   label: 'Corporate Booking'   },
      { id: 'corporate-travel',    label: 'Corporate Travel'    },
    ],
  },
  WEDDING: {
    id:    'wedding',
    label: 'Wedding',
    icon:  'celebration',
    color: 'bg-rose-50 text-rose-700',
    subCategories: [
      { id: 'wedding-planning',    label: 'Wedding Planning'    },
      { id: 'floral-design',       label: 'Floral Design'       },
      { id: 'venue-curation',      label: 'Venue Curation'      },
    ],
  },
};

// ── Art & Craft Sub-categories ─────────────────────────────────────────────
export const ART_CRAFT_CATEGORIES = {
  FINE_ART: {
    id:    'fine-art',
    label: 'Fine Art',
    icon:  'palette',
    color: 'bg-amber-50 text-amber-700',
    subCategories: [
      { id: 'original-paintings', label: 'Original Paintings'   },
      { id: 'illustrations',      label: 'Drawings & Illustrations' },
      { id: 'sculptures',         label: 'Sculptures & 3D Art'  },
      { id: 'limited-prints',     label: 'Limited Edition Prints'},
    ],
  },
  DIGITAL_ART: {
    id:    'commissions',
    label: 'Digital Art',
    icon:  'draw',
    color: 'bg-cyan-50 text-cyan-700',
    subCategories: [
      { id: 'digital-portraits', label: 'Digital Portraits'     },
      { id: 'pet-portraits',     label: 'Custom Pet Portraits'  },
      { id: 'custom-apparel',    label: 'Hand-painted Apparel'  },
    ],
  },
  HANDMADE: {
    id:    'handicrafts',
    label: 'Handmade',
    icon:  'work',
    color: 'bg-lime-50 text-lime-700',
    subCategories: [
      { id: 'pottery-ceramics',  label: 'Pottery & Ceramics' },
      { id: 'woodworking',       label: 'Woodworking & Resin'},
      { id: 'textiles-macrame',  label: 'Textiles & Macramé' },
      { id: 'handmade-jewelry',  label: 'Handmade Jewelry'   },
    ],
  },
};

// ── Events & Tasks Sub-categories ──────────────────────────────────────────
export const EVENTS_TASKS_CATEGORIES = {
  ENTERTAINMENT: {
    id:    'entertainment',
    label: 'Entertainment',
    icon:  'local_activity',
    color: 'bg-rose-50 text-rose-700',
    subCategories: [
      { id: 'concerts',       label: 'Live Music & Concerts'  },
      { id: 'comedy-shows',   label: 'Comedy & Theatre'       },
      { id: 'festivals',      label: 'Festivals & Fairs'      },
    ],
  },
  SPORTS: {
    id:    'sports',
    label: 'Sports',
    icon:  'sports_soccer',
    color: 'bg-emerald-50 text-emerald-700',
    subCategories: [
      { id: 'matches',        label: 'Cricket & Football Matches' },
      { id: 'tournaments',    label: 'Local Tournaments'          },
    ],
  },
  LOCAL_TASKS: {
    id:    'local-tasks',
    label: 'Local Tasks',
    icon:  'handyman',
    color: 'bg-blue-50 text-blue-700',
    subCategories: [
      { id: 'event-staff',    label: 'Event Staffing'             },
      { id: 'photography',    label: 'Event Photography'          },
    ],
  },
};

// ── Full Flat Taxonomy (all domains merged) ────────────────────────────────
export const FULL_TAXONOMY = {
  [DOMAINS.PHYSICAL_GOODS]: PHYSICAL_GOODS_CATEGORIES,
  [DOMAINS.DIGITAL_ASSETS]: DIGITAL_ASSETS_CATEGORIES,
  [DOMAINS.SERVICES]:       SERVICES_CATEGORIES,
  [DOMAINS.ART_AND_CRAFT]:  ART_CRAFT_CATEGORIES,
  [DOMAINS.EVENTS_TASKS]:   EVENTS_TASKS_CATEGORIES,
};

// ─────────────────────────────────────────────────────────────────────────────
// LISTING CONDITION / STATUS ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export const CONDITION = {
  NEW:         'New',
  LIKE_NEW:    'Like New',
  EXCELLENT:   'Excellent',
  GOOD:        'Good',
  FAIR:        'Fair',
  USED:        'Used',
  REFURBISHED: 'Refurbished',
  VINTAGE:     'Vintage',
};

export const LISTING_TYPE = {
  PHYSICAL:    'physical',
  DIGITAL:     'digital',
  SERVICE:     'service',
  ART:         'art',
  EVENT:       'event',
};

export const EXPERIENCE_LEVEL = {
  JUNIOR:  'Junior',
  SENIOR:  'Senior',
  PARTNER: 'Partner',
  AGENCY:  'Agency',
};

export const ESCROW_STATUS = {
  PENDING:   'pending',
  FUNDED:    'funded',
  RELEASED:  'released',
  DISPUTED:  'disputed',
  REFUNDED:  'refunded',
  IN_ESCROW: 'in_escrow',
};

// ─────────────────────────────────────────────────────────────────────────────
// ESCROW & PLATFORM CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const ESCROW_CONFIG = {
  PLATFORM_FEE_PERCENT:  2.5,   // 2.5% of order value
  MINIMUM_ESCROW_VALUE:  499,   // ₹499 — below this, escrow is not enforced
  RELEASE_WINDOW_DAYS:   3,     // Buyer must confirm or auto-release after 3 days
  DISPUTE_WINDOW_DAYS:   7,
  SUPPORTED_CURRENCIES:  ['INR'],
};

export const TIER_LABELS = {
  BASIC:    'Basic',
  STANDARD: 'Standard',
  PREMIUM:  'Premium',
};

// ─────────────────────────────────────────────────────────────────────────────
// SORT & FILTER OPTIONS (shared across marketplace pages)
// ─────────────────────────────────────────────────────────────────────────────

export const SORT_OPTIONS = {
  RECOMMENDED:       'Recommended',
  PRICE_LOW_TO_HIGH: 'Price: Low to High',
  PRICE_HIGH_TO_LOW: 'Price: High to Low',
  HIGHEST_RATED:     'Highest Rated',
  NEWEST:            'Newest First',
};

export const FILTER_CONDITION_OPTIONS = Object.values(CONDITION);
export const FILTER_EXPERIENCE_OPTIONS = Object.values(EXPERIENCE_LEVEL);
