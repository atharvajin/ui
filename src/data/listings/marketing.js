// ─────────────────────────────────────────────────────────────────────────────
// Marketing listings — brand strategy, content, social media, digital ads, SEO
// ─────────────────────────────────────────────────────────────────────────────

export const brandStrategyListings = [
  {
    id: 'bs-1',
    title: 'Comprehensive Brand Audit & Strategy',
    category: 'Brand Strategy',
    provider: 'Athena Studios',
    rating: '4.9',
    reviews: '340',
    price: 12000,
    deliveryTime: '7 Days',
    experienceLevel: 'Agency',
    description: "A deep-dive analysis into your brand's digital presence, market positioning, and competitor landscape. We build a strategy that works.",
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: "Unlock your brand's full potential with our comprehensive strategy package.",
    requirements: [
      'Link to current website and social channels',
      'Brief history of your company and core values',
      'List of 3 main competitors',
      'Any existing brand guidelines or assets'
    ],
    terms: [
      { title: 'Revisions', content: 'Includes 2 strategy review sessions.' },
      { title: 'Deliverables', content: 'Final output is a comprehensive PDF playbook. Implementation is a separate service.' },
      { title: 'Cancellation', content: '50% non-refundable deposit required. Cancellation after discovery phase incurs full charge.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'Athena Studios',
      memberSince: '2019',
      rating: '4.9',
      responseTime: '2 Hours'
    },
    packages: [
      { name: 'Audit Only', price: 12000, description: 'Deep-dive analysis and competitor landscape report.', features: ['Brand Audit', 'Competitor Analysis', '7 Day Delivery'] },
      { name: 'Full Strategy', price: 25000, description: 'Audit + complete brand playbook and positioning strategy.', features: ['Brand Audit', 'Competitor Analysis', 'Brand Playbook', '14 Day Delivery'] }
    ],
    configurator: { type: 'input', label: 'Your Website URL' }
  },
  {
    id: 'bs-2',
    title: 'Startup Brand Identity Kickstart',
    category: 'Brand Strategy',
    provider: 'Vikram Designs',
    rating: '4.8',
    reviews: '156',
    price: 8000,
    deliveryTime: '5 Days',
    experienceLevel: 'Senior',
    description: 'Perfect for new startups. Get your foundational brand elements sorted quickly: Logo concepts, color palette, and basic typography rules.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Launch your startup with confidence.',
    requirements: [
      'Startup name and tagline',
      'Brief description of product/service',
      'Examples of brands you admire (moodboard)'
    ],
    terms: [
      { title: 'Revisions', content: 'Includes 3 logo concept revisions.' },
      { title: 'Files Provided', content: 'Final logo delivered in SVG, PNG, and JPG formats. Brand guide delivered as PDF.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      name: 'Vikram Designs',
      memberSince: '2021',
      rating: '4.8',
      responseTime: '1 Hour'
    },
    packages: [
      { name: 'Essentials', price: 8000, description: 'Logo design, color palette, and font selection.', features: ['Logo (3 concepts)', 'Color Palette', 'Font Selection', '5 Day Delivery'] },
      { name: 'Pro Launch', price: 15000, description: 'Essentials + Business card design and social media kit.', features: ['Logo (3 concepts)', 'Brand Guide PDF', 'Social Media Kit', 'Business Cards'] }
    ],
    configurator: { type: 'input', label: 'Describe your startup in one sentence' }
  }
];

export const contentCreationListings = [
  {
    id: 'cc-1',
    title: 'High-Converting Viral Video Ads',
    category: 'Content Creation',
    provider: 'The Creator Labs',
    rating: '5.0',
    reviews: '89',
    price: 3500,
    deliveryTime: '5 Days',
    experienceLevel: 'Agency',
    description: 'High-impact short-form video content designed for organic reach and engagement on TikTok, Reels, and Shorts.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Stop the scroll with our viral video ad packages.',
    requirements: [
      'Product samples (if applicable)',
      'Key selling points (USPs)',
      'Target audience demographics',
      'Preferred brand tone (e.g., humorous, professional, energetic)'
    ],
    terms: [
      { title: 'Revisions', content: 'Includes 1 round of editing revisions per video.' },
      { title: 'Usage Rights', content: 'Full commercial rights granted upon final payment.' },
      { title: 'Raw Footage', content: 'Raw footage is not provided unless specifically requested and paid for.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'The Creator Labs',
      memberSince: '2022',
      rating: '5.0',
      responseTime: '3 Hours'
    },
    packages: [
      { name: 'Single Ad', price: 3500, description: '1 high-impact short-form video ad (up to 30 seconds).', features: ['Scriptwriting', 'Video Editing', 'Trending Audio', '5 Day Delivery'] },
      { name: 'Ad Campaign', price: 9000, description: '3 variations of short-form ads for A/B testing.', features: ['Scriptwriting', '3 Video Variations', 'Trending Audio', '10 Day Delivery'] }
    ],
    configurator: { type: 'input', label: 'Main platform (e.g., TikTok, Instagram)' }
  }
];

export const socialMediaManagementListings = [
  {
    id: 'smm-1',
    title: 'Monthly Instagram Growth & Management',
    category: 'Social Media Management',
    provider: 'Sarah Jenkins',
    rating: '4.8',
    reviews: '210',
    price: 15000,
    deliveryTime: 'Monthly',
    experienceLevel: 'Senior',
    description: 'Complete Instagram management including content creation, scheduling, community management, and growth strategies.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: "Take the hassle out of Instagram.",
    requirements: [
      'Account credentials or Meta Business Suite access',
      'Brand assets (logos, fonts, existing imagery)',
      'Monthly promotional goals or offers'
    ],
    terms: [
      { title: 'Content Approval', content: 'All content is sent for approval 1 week prior to posting.' },
      { title: 'Contract', content: 'Minimum 3-month commitment recommended for best results. Billed monthly.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      name: 'Sarah Jenkins',
      memberSince: '2018',
      rating: '4.8',
      responseTime: '1 Hour'
    },
    packages: [
      { name: 'Basic Flow', price: 15000, description: '12 Feed posts + 12 Stories per month. Basic community engagement.', features: ['Content Calendar', 'Caption Writing', 'Hashtag Strategy', 'Monthly Report'] },
      { name: 'Aggressive Growth', price: 25000, description: '20 Feed posts + Daily Stories + Proactive community engagement.', features: ['Content Calendar', 'Reels Strategy', 'Proactive Outreach', 'Weekly Reports'] }
    ],
    configurator: { type: 'input', label: 'Instagram Handle (@username)' }
  }
];

export const digitalAdsListings = [
  {
    id: 'da-1',
    title: 'Google & Meta Ads Campaign Setup',
    category: 'Digital Ads',
    provider: 'ROI Driven Agency',
    rating: '4.9',
    reviews: '450',
    price: 18000,
    deliveryTime: '7 Days',
    experienceLevel: 'Agency',
    description: 'Expert setup and optimization of Google Search, Display, and Meta (Facebook/Instagram) advertising campaigns.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Maximize your Return on Ad Spend (ROAS).',
    requirements: [
      'Access to Google Ads / Meta Ads Manager',
      'Target CPA (Cost Per Acquisition) goals',
      'Ad creatives (if providing your own)'
    ],
    terms: [
      { title: 'Ad Spend', content: 'Ad spend is NOT included in this service fee. You will be billed directly by Google/Meta.' },
      { title: 'Management', content: 'This package covers campaign SETUP and initial 14-day optimization. Ongoing management is billed separately.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'ROI Driven Agency',
      memberSince: '2015',
      rating: '4.9',
      responseTime: '5 Hours'
    },
    packages: [
      { name: 'Single Platform', price: 18000, description: 'Setup on either Google Ads OR Meta Ads. Up to 3 campaigns.', features: ['Keyword/Audience Research', 'Ad Copywriting', 'Conversion Tracking Setup', '14-Day Monitoring'] },
      { name: 'Omnichannel', price: 30000, description: 'Comprehensive setup across both Google and Meta platforms.', features: ['Full Strategy', 'Retargeting Setup', 'Cross-platform attribution', '14-Day Monitoring'] }
    ],
    configurator: { type: 'input', label: 'Monthly Ad Budget Estimate (Rs)' }
  }
];

export const seoListings = [
  {
    id: 'seo-1',
    title: 'Comprehensive SEO Audit & Strategy',
    category: 'SEO',
    provider: 'TechGrowth Agency',
    rating: '4.8',
    reviews: '210',
    price: 15000,
    deliveryTime: '7 Days',
    experienceLevel: 'Senior',
    description: 'Comprehensive SEO audit and keyword optimization strategy to boost your organic traffic and search engine rankings.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop'],
    coreDescription: 'Stop losing traffic to competitors.',
    requirements: ['Website URL', 'Read-only Google Analytics/Search Console access'],
    terms: [{ title: 'No Guarantees', content: 'SEO takes time. We guarantee the work quality, not #1 rank overnight.' }],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'TechGrowth Agency',
      memberSince: '2017',
      rating: '4.8',
      responseTime: '4 Hours'
    },
    packages: [
      { name: 'Basic Audit', price: 15000, description: 'Technical audit report only.', features: ['Tech Audit'] },
      { name: 'Full Strategy', price: 30000, description: 'Tech audit + Content gaps + Backlink profile analysis.', features: ['Tech Audit', 'Content Gaps', 'Backlink Analysis'] }
    ],
    configurator: { type: 'input', label: 'Website URL' }
  },
  {
    id: 'seo-2',
    title: 'Local SEO & Google My Business Ranking',
    category: 'SEO',
    provider: 'Rahul Singh',
    rating: '4.9',
    reviews: '85',
    price: 5000,
    deliveryTime: '3 Days',
    experienceLevel: 'Junior',
    description: 'Local SEO optimization for small businesses. Get your Google My Business profile ranking high in local searches.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'],
    coreDescription: 'Dominate your local market.',
    requirements: ['GMB Manager Access', 'Business Name, Address, Phone'],
    terms: [{ title: 'Citations', content: 'Includes up to 20 local directory submissions.' }],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      name: 'Rahul Singh',
      memberSince: '2021',
      rating: '4.9',
      responseTime: '2 Hours'
    },
    packages: [
      { name: 'GMB Setup', price: 5000, description: 'Optimization of existing GMB profile.', features: ['Profile Optimization', 'Basic Citations'] }
    ],
    configurator: { type: 'input', label: 'Business Name & City' }
  }
];

export const socialMediaListings = [
  {
    id: 'sm-1',
    provider: 'CreativeBuzz Media',
    rating: '4.7',
    reviews: '150',
    price: 12000,
    deliveryTime: '5 Days',
    experienceLevel: 'Senior',
    description: 'Full-service social media management for a month. Includes content creation, scheduling, and community engagement.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sm-2',
    provider: 'Neha Gupta',
    rating: '5.0',
    reviews: '42',
    price: 3000,
    deliveryTime: '2 Days',
    experienceLevel: 'Junior',
    description: 'I will create 10 highly engaging custom Instagram templates for your brand using Canva.',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=800&auto=format&fit=crop'
  }
];

// ─── Detail maps (sub-category metadata + siblings) ──────────────────────────

export const brandStrategyDetails = {
  title: 'Brand Strategy',
  description: 'Build a strong, recognizable brand with expert strategists.',
  listings: brandStrategyListings,
  siblings: [
    { id: 'brand-strategy', title: 'Brand Strategy' },
    { id: 'content-creation', title: 'Content Creation' },
    { id: 'social-media-management', title: 'Social Media Management' },
    { id: 'digital-ads', title: 'Digital Ads' }
  ],
  filters: {
    experienceLevel: ['Senior', 'Agency'],
    deliveryTime: ['5 Days', '7 Days', '14 Days']
  }
};

export const contentCreationDetails = {
  title: 'Content Creation',
  description: 'Engaging content to tell your brand story and drive conversions.',
  listings: contentCreationListings,
  siblings: [
    { id: 'brand-strategy', title: 'Brand Strategy' },
    { id: 'content-creation', title: 'Content Creation' },
    { id: 'social-media-management', title: 'Social Media Management' },
    { id: 'digital-ads', title: 'Digital Ads' }
  ],
  filters: {
    experienceLevel: ['Junior', 'Senior', 'Agency'],
    deliveryTime: ['2 Days', '5 Days', '7 Days']
  }
};

export const socialMediaManagementDetails = {
  title: 'Social Media Management',
  description: 'Consistent, strategic engagement to build your community.',
  listings: socialMediaManagementListings,
  siblings: [
    { id: 'brand-strategy', title: 'Brand Strategy' },
    { id: 'content-creation', title: 'Content Creation' },
    { id: 'social-media-management', title: 'Social Media Management' },
    { id: 'digital-ads', title: 'Digital Ads' }
  ],
  filters: {
    experienceLevel: ['Senior', 'Agency'],
    deliveryTime: ['Monthly']
  }
};

export const digitalAdsDetails = {
  title: 'Digital Ads',
  description: 'Data-driven campaigns to maximize your ROI across platforms.',
  listings: digitalAdsListings,
  siblings: [
    { id: 'brand-strategy', title: 'Brand Strategy' },
    { id: 'content-creation', title: 'Content Creation' },
    { id: 'social-media-management', title: 'Social Media Management' },
    { id: 'digital-ads', title: 'Digital Ads' }
  ],
  filters: {
    experienceLevel: ['Senior', 'Agency'],
    deliveryTime: ['7 Days', '14 Days']
  }
};
