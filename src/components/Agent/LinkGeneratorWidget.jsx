import React, { useMemo, useState } from 'react';
import { cn } from '../../utils';

const LinkGeneratorWidget = ({ defaultUrl = '', referralCode }) => {
  const [listingUrl, setListingUrl] = useState(defaultUrl);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const promoText = 'Trusted listing on The Curator. Secure checkout with escrow protection.';
  const canShare = Boolean(generatedUrl);

  const shareLinks = useMemo(() => {
    if (!generatedUrl) return {};
    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${promoText} ${generatedUrl}`)}`,
      x: `https://x.com/intent/tweet?text=${encodeURIComponent(promoText)}&url=${encodeURIComponent(generatedUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('A trusted listing you may like')}&body=${encodeURIComponent(`${promoText}\n\n${generatedUrl}`)}`,
    };
  }, [generatedUrl]);

  const handleGenerate = (e) => {
    e.preventDefault();
    setFeedback('');
    setError('');

    const trimmed = listingUrl.trim();
    if (!trimmed) {
      setError('Add a listing URL to generate your tracked link.');
      return;
    }

    try {
      let url;
      try {
        url = new URL(trimmed);
      } catch {
        url = new URL(trimmed, window.location.origin);
      }

      url.searchParams.set('ref', referralCode);
      setGeneratedUrl(url.toString());
      setFeedback('Tracked link ready to share.');
    } catch {
      setGeneratedUrl('');
      setError('That URL looks invalid. Try a full listing URL or a valid relative path.');
    }
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;
    setFeedback('');
    setError('');

    try {
      await navigator.clipboard.writeText(generatedUrl);
      setFeedback('Copied to clipboard.');
    } catch {
      setError('Clipboard access is unavailable right now. Please copy manually.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)] h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-on-surface">Link Generator</h3>
          <p className="text-xs text-on-surface-variant mt-1">Create referral links and share instantly.</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold">
          <span className="material-symbols-outlined text-[12px]">badge</span>
          {referralCode}
        </span>
      </div>

      <form className="space-y-3" onSubmit={handleGenerate}>
        <label className="block">
          <span className="block text-xs font-bold text-on-surface mb-1.5">Listing URL</span>
          <input
            value={listingUrl}
            onChange={(e) => setListingUrl(e.target.value)}
            placeholder="https://thecurator.app/listing/..."
            className="w-full h-11 rounded-xl border border-outline-variant px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
          />
        </label>

        <button
          type="submit"
          className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">link</span>
          Generate Tracked URL
        </button>

        <label className="block">
          <span className="block text-xs font-bold text-on-surface mb-1.5">Tracked URL</span>
          <textarea
            readOnly
            value={generatedUrl}
            rows={3}
            placeholder="Your generated link appears here"
            className="w-full rounded-xl border border-surface-container bg-surface-container-lowest px-3 py-2 text-sm text-on-surface-variant focus:outline-none resize-none"
          />
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!canShare}
            className={cn(
              'h-10 rounded-xl text-sm font-bold border transition-colors inline-flex items-center justify-center gap-1.5',
              canShare
                ? 'border-outline-variant text-on-surface hover:bg-surface-container'
                : 'border-surface-container text-outline-variant cursor-not-allowed'
            )}
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            Copy
          </button>
          <a
            href={canShare ? shareLinks.whatsapp : '#'}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => !canShare && e.preventDefault()}
            className={cn(
              'h-10 rounded-xl text-sm font-bold border inline-flex items-center justify-center gap-1.5 transition-colors',
              canShare
                ? 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                : 'border-surface-container text-outline-variant pointer-events-none'
            )}
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            WhatsApp
          </a>
          <a
            href={canShare ? shareLinks.x : '#'}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => !canShare && e.preventDefault()}
            className={cn(
              'h-10 rounded-xl text-sm font-bold border inline-flex items-center justify-center gap-1.5 transition-colors',
              canShare
                ? 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                : 'border-surface-container text-outline-variant pointer-events-none'
            )}
          >
            <span className="material-symbols-outlined text-[16px]">alternate_email</span>
            X
          </a>
          <a
            href={canShare ? shareLinks.email : '#'}
            onClick={(e) => !canShare && e.preventDefault()}
            className={cn(
              'h-10 rounded-xl text-sm font-bold border inline-flex items-center justify-center gap-1.5 transition-colors',
              canShare
                ? 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
                : 'border-surface-container text-outline-variant pointer-events-none'
            )}
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Email
          </a>
        </div>

        {(feedback || error) && (
          <p className={cn('text-xs font-medium', feedback ? 'text-emerald-700' : 'text-red-600')}>
            {feedback || error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LinkGeneratorWidget;
