import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { BUYER_MOCK_ORDERS, SELLER_MOCK_ORDERS } from '../../data/mockOrders';
import { cloneDisputes, DISPUTE_STATUS } from '../../data/disputesData';
import ReportIssueModal from './ReportIssueModal';
import DisputeDetailsBoard from './DisputeDetailsBoard';

// portalMode: 'buyer' | 'seller' — determines which orders/disputes are shown.
// This is passed explicitly by DashboardPage so the view is always scoped to
// the currently-active portal, regardless of the user's auth role.
const ResolutionHub = ({ initialOrderId = '', portalMode }) => {
  const { user } = useAuth();

  // Prefer explicit portalMode; fall back to auth role for backward-compat
  const effectiveMode = portalMode || (user?.isSeller ? 'seller' : 'buyer');
  const isSeller      = effectiveMode === 'seller';

  const scopedOrders  = isSeller ? SELLER_MOCK_ORDERS : BUYER_MOCK_ORDERS;

  const [disputes, setDisputes] = useState(() => cloneDisputes());
  const [selectedOrderId, setSelectedOrderId] = useState(
    () => initialOrderId || scopedOrders[0]?.id || ''
  );
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedDisputeId, setSelectedDisputeId] = useState(() => {
    const match = cloneDisputes().find((item) => item.orderId === initialOrderId);
    return match?.id || cloneDisputes()[0]?.id || '';
  });

  const selectedOrder = useMemo(
    () => scopedOrders.find((order) => order.id === selectedOrderId) || null,
    [scopedOrders, selectedOrderId]
  );
  const selectedDispute = useMemo(
    () => disputes.find((item) => item.id === selectedDisputeId) || null,
    [disputes, selectedDisputeId]
  );

  const handleReportSubmit = (payload) => {
    const order = scopedOrders.find((item) => item.id === payload.orderId) || selectedOrder;
    if (!order) return;

    const nowIso         = new Date().toISOString();
    const responseDueAt  = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    const nextDispute = {
      id: `DSP-${Date.now()}`,
      orderId: order.id,
      title: order.title,
      category: payload.category,
      description: payload.description,
      status: DISPUTE_STATUS.OPEN,
      escrowStatus: 'FROZEN',
      raisedByRole: isSeller ? 'Seller' : 'Buyer',
      openedAt: nowIso,
      responseDueAt,
      requestedPartialRefund: Math.round(order.price * 0.35),
      transaction: {
        totalAmount: order.price,
        sellerName: isSeller ? 'You (Seller)' : (order.provider || 'Seller'),
        buyerName: isSeller ? (order.buyer || 'Buyer') : 'You (Buyer)',
        placedOn: order.placedOn,
        dueOn: order.dueOn,
      },
      evidence: payload.evidence,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          type: 'system',
          actor: 'Platform',
          message: 'Issue reported. Escrow is now frozen while mediation is active.',
          at: nowIso,
        },
      ],
    };

    setDisputes((prev) => [nextDispute, ...prev]);
    setSelectedDisputeId(nextDispute.id);
    setIsReportModalOpen(false);
  };

  const handleSellerAction = (actionId) => {
    if (!selectedDispute) return;

    setDisputes((prev) =>
      prev.map((item) => {
        if (item.id !== selectedDispute.id) return item;

        const now = new Date();
        if (actionId === 'escalate' && now < new Date(item.responseDueAt)) {
          return {
            ...item,
            timeline: [
              { id: `tl-${Date.now()}`, type: 'system', actor: 'Platform', message: 'Escalation unlocks after the 48-hour mediation window.', at: now.toISOString() },
              ...item.timeline,
            ],
          };
        }

        const updates = {
          partial_refund: { message: 'Seller accepted a partial refund proposal.',            status: DISPUTE_STATUS.SETTLED,   escrowStatus: 'REFUNDED' },
          full_refund:    { message: 'Seller offered a full refund.',                          status: DISPUTE_STATUS.SETTLED,   escrowStatus: 'REFUNDED' },
          decline:        { message: 'Seller declined the request and shared additional context.', status: DISPUTE_STATUS.OPEN, escrowStatus: 'FROZEN'   },
          escalate:       { message: 'Dispute escalated to platform admin review.',            status: DISPUTE_STATUS.ESCALATED, escrowStatus: 'FROZEN'   },
        }[actionId];

        if (!updates) return item;

        return {
          ...item,
          status: updates.status,
          escrowStatus: updates.escrowStatus,
          timeline: [
            { id: `tl-${Date.now()}`, type: isSeller ? 'seller' : 'buyer', actor: isSeller ? 'Seller' : 'Buyer', message: updates.message, at: now.toISOString() },
            ...item.timeline,
          ],
        };
      })
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-serif text-2xl text-on-surface">Resolution Center</h1>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${isSeller ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isSeller ? 'storefront' : 'shopping_bag'}</span>
              {isSeller ? 'Seller View' : 'Buyer View'}
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">
            {isSeller
              ? 'Manage disputes raised against your listings – respond and resolve.'
              : 'Track issues raised on your purchases – mediation-first, escrow-protected.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedOrderId}
            onChange={(event) => setSelectedOrderId(event.target.value)}
            className="h-10 rounded-xl border border-outline-variant px-3 text-sm"
          >
            {scopedOrders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} – {order.title?.slice(0, 28)}{order.title?.length > 28 ? '…' : ''}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors"
          >
            Report an Issue
          </button>
        </div>
      </div>

      {disputes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-surface-container p-10 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="font-bold text-on-surface text-lg mb-1">No active disputes</h2>
          <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
            {isSeller
              ? 'No disputes have been raised on your listings.'
              : 'All your orders are dispute-free. If you need help, report an issue below.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {disputes.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDisputeId(item.id)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  selectedDisputeId === item.id
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-surface-container bg-white hover:bg-surface-container-lowest'
                }`}
              >
                <p className="text-xs font-black text-on-surface">{item.orderId}</p>
                <p className="text-sm font-bold text-on-surface mt-1 line-clamp-1">{item.category}</p>
                <p className="text-xs text-on-surface-variant mt-1">{item.status} · {item.escrowStatus}</p>
              </button>
            ))}
          </div>

          {selectedDispute && (
            <DisputeDetailsBoard
              dispute={selectedDispute}
              role={isSeller ? 'Seller' : 'Buyer'}
              onAction={handleSellerAction}
            />
          )}
        </>
      )}

      <ReportIssueModal
        isOpen={isReportModalOpen}
        order={selectedOrder}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default ResolutionHub;
