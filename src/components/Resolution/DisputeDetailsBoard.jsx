import React, { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '../../utils/index';
import EvidenceGallery from './EvidenceGallery';
import ResolutionActionStrip from './ResolutionActionStrip';

const getCountdown = (responseDueAt, now) => {
  const remainingMs = new Date(responseDueAt).getTime() - now.getTime();
  if (remainingMs <= 0) return '00h 00m 00s';
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
};

const DisputeDetailsBoard = ({ dispute, role, onAction }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(
    () => getCountdown(dispute.responseDueAt, now),
    [dispute.responseDueAt, now]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <section className="bg-white rounded-2xl border border-surface-container p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-on-surface text-base">{dispute.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-700">
            ESCROW FROZEN
          </span>
        </div>
        <p className="mt-2 text-sm text-on-surface-variant">{dispute.description}</p>

        <div className="mt-4 space-y-2 text-sm">
          <p className="text-on-surface-variant">
            <span className="font-bold text-on-surface">Order:</span> {dispute.orderId}
          </p>
          <p className="text-on-surface-variant">
            <span className="font-bold text-on-surface">Amount:</span> {formatCurrency(dispute.transaction.totalAmount)}
          </p>
          <p className="text-on-surface-variant">
            <span className="font-bold text-on-surface">Category:</span> {dispute.category}
          </p>
          <p className="text-on-surface-variant">
            <span className="font-bold text-on-surface">Seller response window:</span> {countdown}
          </p>
        </div>

        <div className="mt-5">
          <ResolutionActionStrip role={role} onAction={onAction} />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-surface-container p-5">
        <h3 className="font-bold text-on-surface text-base mb-3">Mediation Timeline</h3>
        <ol className="space-y-3 mb-5">
          {dispute.timeline.map((event) => (
            <li key={event.id} className="rounded-xl border border-surface-container p-3">
              <p className="text-xs font-bold text-on-surface">{event.actor}</p>
              <p className="text-sm text-on-surface-variant mt-1">{event.message}</p>
            </li>
          ))}
        </ol>

        <h4 className="font-bold text-on-surface text-sm mb-2">Evidence</h4>
        <EvidenceGallery evidence={dispute.evidence} />
      </section>
    </div>
  );
};

export default DisputeDetailsBoard;
