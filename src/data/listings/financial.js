// ─────────────────────────────────────────────────────────────────────────────
// Financial services listings — tax consulting, financial planning, audit
// ─────────────────────────────────────────────────────────────────────────────

export const taxConsultingListings = [
  {
    id: 'tc-1',
    title: 'Expert Tax Strategy & Filing (Business)',
    category: 'Tax Consulting',
    provider: 'Global Tax Partners',
    rating: '4.9',
    reviews: '280',
    price: 15000,
    deliveryTime: '5 Days',
    experienceLevel: 'Agency',
    description: 'Comprehensive tax strategy, optimization, and filing for small to medium enterprises. Minimize your tax liability legally.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Stop overpaying on taxes.',
    requirements: [
      "Last year's tax return",
      'Current P&L and Balance Sheet',
      'Access to accounting software (Xero/QBO)'
    ],
    terms: [
      { title: 'Audit Support', content: 'Audit defense is not included in standard filing but available as an add-on.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'Global Tax Partners',
      memberSince: '2015',
      rating: '4.9',
      responseTime: '2 Hours'
    },
    packages: [
      { name: 'Standard Filing', price: 15000, description: 'Preparation and filing of state & federal returns.', features: ['Tax Filing', 'Deduction Check', '5 Day Turnaround'] },
      { name: 'Strategic Advisory', price: 35000, description: 'Filing + Quarterly strategic planning sessions.', features: ['Tax Filing', 'Quarterly Reviews', 'Dedicated CPA'] }
    ],
    configurator: { type: 'input', label: 'Annual Revenue Estimate' }
  }
];

export const financialPlanningListings = [
  {
    id: 'fp-1',
    title: 'Personal Wealth & Retirement Blueprint',
    category: 'Financial Planning',
    provider: 'Aditya Wealth Management',
    rating: '4.8',
    reviews: '125',
    price: 8000,
    deliveryTime: '7 Days',
    experienceLevel: 'Senior',
    description: 'Custom financial roadmap to help you achieve your wealth, retirement, and investing goals.',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Take control of your financial future.',
    requirements: [
      'Current income & expense breakdown',
      'List of current assets and liabilities',
      'Short and long-term financial goals'
    ],
    terms: [
      { title: 'Fiduciary Duty', content: 'We act as fiduciaries and do not earn commissions on product sales.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      name: 'Aditya Wealth Management',
      memberSince: '2019',
      rating: '4.8',
      responseTime: '12 Hours'
    },
    packages: [
      { name: 'Wealth Blueprint', price: 8000, description: 'Comprehensive PDF financial plan and 1-hour review session.', features: ['Asset Allocation', 'Retirement Timeline', '1-Hr Zoom Session'] }
    ],
    configurator: { type: 'date-time', label: 'Preferred Consultation Date' }
  }
];

export const auditServicesListings = [
  {
    id: 'as-1',
    title: 'Comprehensive Internal Business Audit',
    category: 'Audit Services',
    provider: 'AuditPro Solutions',
    rating: '5.0',
    reviews: '45',
    price: 45000,
    deliveryTime: '14 Days',
    experienceLevel: 'Agency',
    description: 'Deep-dive internal audit to ensure regulatory compliance, identify fraud risks, and optimize financial operations.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'],
    coreDescription: 'Protect your business from internal vulnerabilities.',
    requirements: [
      'Full ledger access',
      'Previous audit reports',
      'Employee handbook/policies'
    ],
    terms: [
      { title: 'Confidentiality', content: 'Strict NDA signed before commencement.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      name: 'AuditPro Solutions',
      memberSince: '2012',
      rating: '5.0',
      responseTime: '4 Hours'
    },
    packages: [
      { name: 'Standard Internal Audit', price: 45000, description: 'Full review of financial controls and compliance report.', features: ['Risk Assessment', 'Control Testing', 'Final Audit Report'] }
    ],
    configurator: { type: 'input', label: 'Industry / Niche' }
  }
];

// ─── Detail maps ──────────────────────────────────────────────────────────────

export const taxConsultingDetails = {
  title: 'Tax Consulting',
  description: 'Expert tax advice and preparation.',
  listings: taxConsultingListings,
  siblings: [
    { id: 'tax-consulting', title: 'Tax Consulting' },
    { id: 'financial-planning', title: 'Financial Planning' },
    { id: 'audit-services', title: 'Audit Services' }
  ],
  filters: { experienceLevel: ['Agency'], deliveryTime: ['5 Days'] }
};

export const financialPlanningDetails = {
  title: 'Financial Planning',
  description: 'Secure your financial future.',
  listings: financialPlanningListings,
  siblings: [
    { id: 'tax-consulting', title: 'Tax Consulting' },
    { id: 'financial-planning', title: 'Financial Planning' },
    { id: 'audit-services', title: 'Audit Services' }
  ],
  filters: { experienceLevel: ['Senior'], deliveryTime: ['7 Days'] }
};

export const auditServicesDetails = {
  title: 'Audit Services',
  description: 'Comprehensive financial auditing.',
  listings: auditServicesListings,
  siblings: [
    { id: 'tax-consulting', title: 'Tax Consulting' },
    { id: 'financial-planning', title: 'Financial Planning' },
    { id: 'audit-services', title: 'Audit Services' }
  ],
  filters: { experienceLevel: ['Agency'], deliveryTime: ['14 Days'] }
};
