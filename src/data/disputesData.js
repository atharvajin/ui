export const ISSUE_CATEGORIES = [
  'Delivery Delay',
  'Work Quality',
  'Missing Requirements',
  'Incorrect Deliverable',
  'Communication Gap',
  'Other',
];

export const RESOLUTION_ACTIONS = [
  { id: 'partial_refund', label: 'Accept Partial Refund' },
  { id: 'full_refund', label: 'Offer Full Refund' },
  { id: 'decline', label: 'Decline' },
  { id: 'escalate', label: 'Escalate to Admin' },
];

export const DISPUTE_STATUS = {
  OPEN: 'OPEN',
  SETTLED: 'SETTLED',
  ESCALATED: 'ESCALATED',
};

export const MOCK_DISPUTES = [
  {
    id: 'DSP-2001',
    orderId: 'ORD-29481',
    title: 'Custom Corporate Agreements & NDAs',
    category: 'Work Quality',
    description:
      'The delivered NDA draft is missing the non-solicit clause and the indemnity section requested in the order brief.',
    status: DISPUTE_STATUS.OPEN,
    escrowStatus: 'FROZEN',
    raisedByRole: 'Buyer',
    openedAt: '2026-04-20T09:30:00.000Z',
    responseDueAt: '2026-04-22T09:30:00.000Z',
    requestedPartialRefund: 1200,
    transaction: {
      totalAmount: 3605,
      sellerName: 'Adv. Priya Sharma',
      buyerName: 'Dhruv Jain',
      placedOn: '18 Apr 2026',
      dueOn: '20 Apr 2026',
    },
    evidence: [
      {
        id: 'ev-1',
        name: 'delivery-v1.pdf',
        kind: 'file',
        uploadedBy: 'Buyer',
        uploadedAt: '2026-04-20T09:35:00.000Z',
      },
      {
        id: 'ev-2',
        name: 'brief-checklist.png',
        kind: 'image',
        uploadedBy: 'Buyer',
        uploadedAt: '2026-04-20T09:36:00.000Z',
      },
    ],
    timeline: [
      {
        id: 'tl-1',
        type: 'system',
        actor: 'Platform',
        message: 'Issue reported and escrow frozen pending mediation.',
        at: '2026-04-20T09:30:00.000Z',
      },
      {
        id: 'tl-2',
        type: 'buyer',
        actor: 'Buyer',
        message: 'Shared annotated checklist and highlighted missing clauses.',
        at: '2026-04-20T09:36:00.000Z',
      },
    ],
  },
];

export const cloneDisputes = () => JSON.parse(JSON.stringify(MOCK_DISPUTES));
