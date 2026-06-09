// ─────────────────────────────────────────────────────────────────────────────
// Technical listings — software development, AI integration, cloud infra
// ─────────────────────────────────────────────────────────────────────────────

export const softwareDevelopmentListings = [
  {
    id: 'sd-1',
    title: 'Full-Stack Web App MVP Build',
    category: 'Software Development',
    provider: 'CodeCraft Solutions',
    rating: '4.9',
    reviews: '110',
    price: 150000,
    deliveryTime: '30 Days',
    experienceLevel: 'Agency',
    description: 'We build robust, scalable Minimum Viable Products (MVPs) using React, Node.js, and PostgreSQL. Get your startup to market fast.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: 'Turn your idea into a working product. Our agency specializes in building rapid MVPs for startups.',
    requirements: [
      'Detailed feature requirements/user stories',
      'Figma designs or wireframes',
      'Branding assets (logos, colors)'
    ],
    terms: [
      { title: 'Source Code', content: 'Full ownership of the source code transfers to you upon final payment.' },
      { title: 'Support', content: 'Includes 14 days of bug-fixing support post-launch.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      name: 'CodeCraft Solutions',
      memberSince: '2020',
      rating: '4.9',
      responseTime: '3 Hours'
    },
    packages: [
      { name: 'Basic MVP', price: 150000, description: 'Core features, up to 5 main screens.', features: ['Frontend & Backend', 'Database Setup', 'Deployment'] },
      { name: 'Advanced App', price: 250000, description: 'Complex features, 3rd party integrations (Stripe, Auth).', features: ['Custom Integrations', 'Admin Panel', 'Performance Optimization'] }
    ],
    configurator: { type: 'input', label: 'Main Framework Preference (e.g. React/Vue)' }
  }
];

export const aiIntegrationListings = [
  {
    id: 'ai-1',
    title: 'Custom AI Chatbot (GPT-4) Integration',
    category: 'AI Integration',
    provider: 'Nexus AI Labs',
    rating: '5.0',
    reviews: '85',
    price: 45000,
    deliveryTime: '14 Days',
    experienceLevel: 'Senior',
    description: 'Integrate a custom AI assistant trained on your company data into your website or Slack workspace to automate customer support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
    ],
    coreDescription: "Supercharge your team with AI.",
    requirements: [
      'Knowledge base documents (PDFs, TXT, URLs)',
      'OpenAI API Key',
      'Hosting environment details'
    ],
    terms: [
      { title: 'API Costs', content: 'You are responsible for ongoing OpenAI API usage costs.' },
      { title: 'Data Privacy', content: 'We configure the API to ensure your data is not used for training OpenAI models.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      name: 'Nexus AI Labs',
      memberSince: '2023',
      rating: '5.0',
      responseTime: '1 Hour'
    },
    packages: [
      { name: 'Website Bot', price: 45000, description: 'RAG-powered bot embedded on your website.', features: ['RAG Pipeline', 'UI Widget', 'Analytics Dashboard'] }
    ],
    configurator: { type: 'input', label: 'Describe primary use case' }
  }
];

export const cloudInfraListings = [
  {
    id: 'ci-1',
    title: 'AWS Infrastructure Audit & Optimization',
    category: 'Cloud Infrastructure',
    provider: 'CloudOps Pro',
    rating: '4.8',
    reviews: '60',
    price: 30000,
    deliveryTime: '7 Days',
    experienceLevel: 'Senior',
    description: 'Reduce your AWS bill and improve security. I will audit your cloud setup, apply best practices, and implement cost-saving measures.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'],
    coreDescription: 'Are you overpaying for cloud services? Is your data secure?',
    requirements: [
      'Read-only IAM access to AWS account',
      'Current architecture diagrams (if available)'
    ],
    terms: [
      { title: 'Implementation', content: 'The base package is an audit report. Actual implementation of changes requires the premium package.' }
    ],
    seller: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      name: 'CloudOps Pro',
      memberSince: '2017',
      rating: '4.8',
      responseTime: '5 Hours'
    },
    packages: [
      { name: 'Audit & Report', price: 30000, description: 'Detailed PDF report highlighting security flaws and cost savings.', features: ['Security Audit', 'Cost Analysis'] },
      { name: 'Audit + Fixes', price: 75000, description: 'Report + Hands-on implementation of critical fixes via IaC.', features: ['Security Audit', 'Cost Analysis', 'Terraform Implementation'] }
    ],
    configurator: { type: 'input', label: 'Current Monthly AWS Bill (Estimate)' }
  }
];

// ─── Detail maps ──────────────────────────────────────────────────────────────

export const softwareDevelopmentDetails = {
  title: 'Software Development',
  description: 'Build robust, scalable software applications.',
  listings: softwareDevelopmentListings,
  siblings: [
    { id: 'software-development', title: 'Software Development' },
    { id: 'ai-integration', title: 'AI Integration' },
    { id: 'cloud-infra', title: 'Cloud Infrastructure' }
  ],
  filters: { experienceLevel: ['Senior', 'Agency'], deliveryTime: ['30 Days'] }
};

export const aiIntegrationDetails = {
  title: 'AI Integration',
  description: 'Integrate cutting-edge AI into your workflows.',
  listings: aiIntegrationListings,
  siblings: [
    { id: 'software-development', title: 'Software Development' },
    { id: 'ai-integration', title: 'AI Integration' },
    { id: 'cloud-infra', title: 'Cloud Infrastructure' }
  ],
  filters: { experienceLevel: ['Senior'], deliveryTime: ['14 Days'] }
};

export const cloudInfraDetails = {
  title: 'Cloud Infrastructure',
  description: 'Optimize, secure, and scale your cloud environments.',
  listings: cloudInfraListings,
  siblings: [
    { id: 'software-development', title: 'Software Development' },
    { id: 'ai-integration', title: 'AI Integration' },
    { id: 'cloud-infra', title: 'Cloud Infrastructure' }
  ],
  filters: { experienceLevel: ['Senior'], deliveryTime: ['7 Days'] }
};
