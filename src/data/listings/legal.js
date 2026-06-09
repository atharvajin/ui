// ─────────────────────────────────────────────────────────────────────────────
// Legal listings — raw listing records for all legal sub-categories
// ─────────────────────────────────────────────────────────────────────────────

export const criminalLawsuitsListings = [
  {
    id: 'cl-1',
    title: 'Expert Criminal Defense Representation',
    category: 'Criminal Lawsuits',
    provider: 'Adv. Vikram Singh',
    rating: '4.9',
    reviews: '312',
    price: 25000,
    deliveryTime: '24 Hours',
    experienceLevel: 'Partner',
    description: 'Expert criminal defense attorney specializing in high-profile cases. Initial consultation and strategy planning.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Aggressive and experienced criminal defense. If you are facing serious charges, you need a strategy immediately. This retainer covers the initial deep-dive consultation, case file review, and the formulation of a robust defense strategy.',
    requirements: [
      'FIR Copy',
      'Charge sheet (if filed)',
      'Any available evidence'
    ],
    terms: [
      { title: 'Retainer Scope', content: 'This fee is for initial strategy and bail application only. Trial phases are billed separately.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'Adv. Vikram Singh',
      memberSince: '2012',
      rating: '4.9',
      responseTime: '1 Hour'
    },
    packages: [
      { name: 'Strategy Session', price: 25000, description: 'File review and 2-hour strategy session.', features: ['File Review', '2-Hr Consultation'] },
      { name: 'Bail Application', price: 50000, description: 'Strategy session + drafting and filing of bail application.', features: ['Strategy Session', 'Bail Drafting', 'Filing'] }
    ],
    configurator: {
      type: 'input',
      label: 'Urgent? Describe briefly'
    }
  }
];

export const contractDraftingListings = [
  {
    id: 'cd-1',
    title: 'Custom Corporate Agreements & NDAs',
    category: 'Contract Drafting',
    provider: 'Advocate Priya Sharma',
    rating: '4.9',
    reviews: '124',
    price: 3500,
    deliveryTime: '2 Days',
    experienceLevel: 'Senior',
    description: 'Expert in corporate law and drafting robust non-disclosure agreements, employment contracts, and vendor agreements. Tailored to your specific business needs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Protect your business interests with bulletproof legal agreements. I specialize in drafting custom corporate contracts, including Non-Disclosure Agreements (NDAs), Employment Contracts, Vendor Agreements, and Software Licensing Agreements. Each document is meticulously crafted to ensure maximum legal protection and compliance with current corporate laws.',
    requirements: [
      'Brief description of the parties involved',
      'Key terms and conditions to be included',
      'Specific jurisdiction requirements',
      'Any existing templates or previous agreements (if applicable)'
    ],
    terms: [
      { title: 'Revisions', content: 'Includes up to 2 rounds of revisions within 7 days of initial delivery.' },
      { title: 'Scope of Work', content: 'This service covers drafting only. Legal representation or negotiation with third parties is subject to a separate retainer.' },
      { title: 'Confidentiality', content: 'All shared information will be kept strictly confidential under attorney-client privilege.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
      name: 'Advocate Priya Sharma',
      memberSince: '2016',
      rating: '4.9',
      responseTime: '2 Hours'
    },
    packages: [
      { name: 'Standard NDA', price: 3500, description: 'Standard Non-Disclosure or Non-Compete Agreement (up to 5 pages).', features: ['Custom Drafting', '1 Revision', 'Delivery in 2 Days'] },
      { name: 'Complex Agreement', price: 8000, description: 'Comprehensive Vendor, Employment, or Licensing Agreement.', features: ['Custom Drafting', '2 Revisions', 'Delivery in 4 Days', '30-min Consultation'] }
    ],
    configurator: {
      type: 'input',
      label: 'Specify Contract Type (e.g., NDA, Employment)'
    }
  },
  {
    id: 'cd-2',
    title: 'Standard Rental & Freelance Contracts',
    category: 'Contract Drafting',
    provider: 'Lawyer Amit Patel',
    rating: '4.7',
    reviews: '89',
    price: 2000,
    deliveryTime: '24 Hours',
    experienceLevel: 'Junior',
    description: 'Quick turnaround on standard rental agreements, freelance contracts, and simple service agreements. Perfect for small businesses and individuals.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Need a quick and reliable contract? I provide fast turnaround on standard agreements like Residential/Commercial Leases, Freelance Service Agreements, and basic Sale Deeds. Perfect for individuals and small business owners looking for affordable, legally sound documents.',
    requirements: [
      'Names and addresses of all parties',
      'Financial terms (rent, payment schedule, etc.)',
      'Duration of the agreement',
      'Specific clauses or conditions to include'
    ],
    terms: [
      { title: 'Turnaround Time', content: 'Guaranteed 24-hour delivery for standard drafts.' },
      { title: 'Revisions', content: 'Includes 1 round of minor edits.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'Lawyer Amit Patel',
      memberSince: '2020',
      rating: '4.7',
      responseTime: '30 Mins'
    },
    packages: [
      { name: 'Basic Draft', price: 2000, description: 'Standard template-based draft tailored to your details.', features: ['24 Hour Delivery', '1 Revision'] },
      { name: 'Custom Clause', price: 3500, description: 'Standard draft with up to 3 custom clauses drafted from scratch.', features: ['Custom Clauses', '24 Hour Delivery', '1 Revision'] }
    ],
    configurator: {
      type: 'input',
      label: 'Briefly describe your needs'
    }
  }
];

export const courtAppearanceListings = [
  {
    id: 'ca-1',
    title: 'Expert Civil & Family Court Representation',
    category: 'Court Appearance',
    provider: 'Advocate Rahul Verma',
    rating: '4.8',
    reviews: '92',
    price: 5000,
    deliveryTime: 'Same Day',
    experienceLevel: 'Senior',
    description: 'Expert representation for civil disputes, property matters, and family court cases. Available for immediate court appearances in local and high courts.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    altText: 'Court Appearance Service 1',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574888204213-91ee1e6e91f4?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Secure top-tier representation for your court hearings. I bring years of litigation experience to local and high courts, ensuring your case is presented powerfully. Specializing in civil disputes, family law, and property litigation.',
    requirements: [
      'Case brief and relevant documents',
      'Court name and hearing date',
      'Vakalatnama authorization'
    ],
    terms: [
      { title: 'Appearance Fee', content: 'Fee covers one full day of appearance. Additional hearings are charged separately.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      name: 'Advocate Rahul Verma',
      memberSince: '2015',
      rating: '4.8',
      responseTime: '2 Hours'
    },
    packages: [
      { name: 'Single Hearing', price: 5000, description: 'One-time court appearance and brief update.', features: ['Court Appearance', 'Post-hearing update'] },
      { name: 'Hearing + Prep', price: 8500, description: 'Includes case file review prior to appearance.', features: ['File Review', 'Court Appearance', 'Post-hearing update'] }
    ],
    configurator: {
      type: 'input',
      label: 'Date of Hearing'
    }
  },
  {
    id: 'ca-2',
    title: 'High Court Litigation & Appeals',
    category: 'Court Appearance',
    provider: 'Legal Associates Group',
    rating: '4.9',
    reviews: '156',
    price: 8000,
    deliveryTime: 'Next Day',
    experienceLevel: 'Partner',
    description: 'Senior partners available for complex litigation, appeals, and high-stakes corporate disputes in the High Court.',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=800&auto=format&fit=crop',
    altText: 'Court Appearance Service 2',
    images: [
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Premium legal representation for high-stakes matters. Our senior partners handle complex appeals and corporate litigation with precision and strategic depth.',
    requirements: [
      'Complete case file',
      'Previous orders (if any)',
      'Detailed consultation required'
    ],
    terms: [
      { title: 'Consultation', content: 'Initial consultation is mandatory before accepting the brief.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'Legal Associates Group',
      memberSince: '2010',
      rating: '4.9',
      responseTime: '4 Hours'
    },
    packages: [
      { name: 'High Court Appearance', price: 8000, description: 'Standard appearance by a senior associate.', features: ['Senior Associate', 'Appearance'] },
      { name: 'Partner Representation', price: 25000, description: 'Direct representation by a managing partner.', features: ['Managing Partner', 'Strategy session', 'Appearance'] }
    ],
    configurator: {
      type: 'input',
      label: 'Case Number / Details'
    }
  }
];

export const govtDocumentsListings = [
  {
    id: 'gd-1',
    title: 'Comprehensive Passport & PAN Registration Assistance',
    category: 'Govt Documents',
    provider: 'DocAssist Services',
    rating: '4.7',
    reviews: '210',
    price: 1500,
    deliveryTime: '3 Days',
    experienceLevel: 'Junior',
    description: 'Assistance with passport applications, PAN card registration, and other standard government document processing.',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop',
    altText: 'Govt Documents Service 1',
    images: [
      'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568225422204-c5a898495bc2?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Get your essential government documents processed without the hassle. We provide end-to-end assistance for Passport and PAN card applications.',
    requirements: [
      'Valid Identity Proof (Aadhaar Card/Voter ID)',
      'Valid Address Proof (Utility Bill/Rent Agreement)',
      '2 Recent Passport-sized Photographs',
      'Birth Certificate (for age proof)'
    ],
    terms: [
      { title: 'Cancellation Policy', content: 'Cancellation fee of Rs. 200 applies if cancelled after forms are processed.' },
      { title: 'Revisions', content: 'We offer free correction of errors made by our team before final submission.' },
      { title: 'Government Fees', content: 'Government application fees are not included in this service charge.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'DocAssist Services',
      memberSince: '2021',
      rating: '4.7',
      responseTime: '1 Hour'
    },
    packages: [
      { name: 'Basic', price: 1500, description: 'Standard processing (3-5 days). Includes form filling and appointment booking.', features: ['Form filling', 'Appointment booking'] },
      { name: 'Premium', price: 2500, description: 'Expedited processing. Priority support and door-step document pickup.', features: ['Expedited processing', 'Priority support', 'Door-step pickup'] }
    ],
    configurator: {
      type: 'date-time',
      label: 'Select appointment preference'
    }
  },
  {
    id: 'gd-2',
    title: 'Expedited Property Registration & Legal Review',
    category: 'Govt Documents',
    provider: 'Advocate Priya Sharma',
    rating: '4.9',
    reviews: '124',
    price: 3000,
    deliveryTime: '24 Hours',
    experienceLevel: 'Senior',
    description: 'Expedited processing and legal review for property registration, marriage certificates, and trademark filing.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    altText: 'Govt Documents Service 2',
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Expert legal assistance for crucial property and business registrations.',
    requirements: [
      'Property Sale Deed / Relevant Agreement Copies',
      'Identity Proof of Buyer and Seller',
      'NOC from relevant authorities',
      'Passport-sized photographs of all parties'
    ],
    terms: [
      { title: 'Cancellation Policy', content: 'No cancellation once legal review has commenced.' },
      { title: 'Scope of Work', content: 'Includes legal review and filing. Representation in disputes is a separate service.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
      name: 'Advocate Priya Sharma',
      memberSince: '2018',
      rating: '4.9',
      responseTime: '30 Mins'
    },
    packages: [
      { name: 'Standard', price: 3000, description: 'Legal review and preparation of documents.', features: ['Legal review', 'Document preparation'] },
      { name: 'Comprehensive', price: 8000, description: 'Includes representation at the registrar office.', features: ['Legal review', 'Document preparation', 'Registrar representation'] }
    ],
    configurator: {
      type: 'input',
      label: 'Property/Filing ID (Optional)'
    }
  }
];
