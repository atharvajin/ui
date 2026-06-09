import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';
import { formatCurrency } from '../utils/index';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Types:  mode = 'chat' | 'negotiate'
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€â”€ Timestamp helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ts = (offsetMinutes = 0) => {
  const d = new Date(Date.now() - offsetMinutes * 60 * 1000);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

// â”€â”€â”€ Seed messages for chat mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SEED_CHAT_MESSAGES = [
  {
    id: 1,
    type: 'system',
    text: 'Order ORD-29481 created. Escrow is active.',
    time: ts(35),
  },
  {
    id: 2,
    type: 'seller',
    text: "Hello! I've received your order. I'll begin reviewing the requirements shortly.",
    time: ts(32),
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop',
    sender: 'Adv. Priya Sharma',
  },
  {
    id: 3,
    type: 'buyer',
    text: "Great, thank you! I've uploaded all the required documents.",
    time: ts(28),
  },
  {
    id: 4,
    type: 'system',
    text: 'System: 5 files uploaded securely. Seller can now download them.',
    time: ts(27),
    isFile: true,
  },
  {
    id: 5,
    type: 'seller',
    text: "Perfect, I can see them. I'll start the first draft by EOD.",
    time: ts(20),
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop',
    sender: 'Adv. Priya Sharma',
  },
];

// â”€â”€â”€ Seed messages for negotiate mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SEED_NEGOTIATE_MESSAGES = [];

const seedMessagesForMode = (mode) =>
  mode === 'negotiate' ? SEED_NEGOTIATE_MESSAGES : SEED_CHAT_MESSAGES;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Sub-components
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** System / event message â€” grey pill, centred */
const SystemMessage = ({ msg }) => (
  <div className="flex justify-center my-2">
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium max-w-[80%] text-center',
        msg.isFile
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          : 'bg-surface-container text-on-surface-variant border border-surface-container'
      )}
    >
      {msg.isFile && (
        <span
          className="material-symbols-outlined text-[14px] text-emerald-600 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          upload_file
        </span>
      )}
      <span className="leading-snug">{msg.text}</span>
      <span className="text-[10px] opacity-60 shrink-0">{msg.time}</span>
    </div>
  </div>
);

/** Offer accepted/rejected system pill */
const OfferStatusMessage = ({ msg }) => {
  const isAccepted = msg.offerStatus === 'accepted';
  return (
    <div className="flex justify-center my-2">
      <div
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border',
          isAccepted
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-red-50 border-red-200 text-red-700'
        )}
      >
        <span
          className="material-symbols-outlined text-[14px] shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isAccepted ? 'check_circle' : 'cancel'}
        </span>
        {msg.text}
      </div>
    </div>
  );
};

/** Offer bubble â€” a special buyer bubble with price highlight */
const OfferBubble = ({ msg }) => (
  <div className="flex justify-end mb-4">
    <div className="max-w-[72%]">
      <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_offer
          </span>
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">Price Offer</span>
        </div>
        <p className="text-2xl font-serif font-bold mb-1">{formatCurrency(msg.offerAmount)}</p>
        {msg.text && (
          <p className="text-sm text-white/90 leading-relaxed">{msg.text}</p>
        )}
      </div>
      <p className="text-[10px] text-outline-variant mt-1 text-right">{msg.time}</p>
    </div>
  </div>
);

/** Standard buyer bubble (right-aligned, primary) */
const BuyerBubble = ({ msg }) => (
  <div className="flex justify-end mb-3">
    <div className="max-w-[72%]">
      <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed shadow-sm">
        {msg.text}
      </div>
      <p className="text-[10px] text-outline-variant mt-1 text-right flex items-center justify-end gap-1">
        {msg.time}
        <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          done_all
        </span>
      </p>
    </div>
  </div>
);

/** Standard seller bubble (left-aligned) */
const SellerBubble = ({ msg }) => (
  <div className="flex items-end gap-2.5 mb-3">
    <img
      src={msg.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=60'}
      alt={msg.sender}
      className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 border border-surface-container"
    />
    <div className="max-w-[72%]">
      <p className="text-[10px] text-outline-variant mb-1 ml-1 font-medium">{msg.sender}</p>
      <div className="bg-white border border-surface-container rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-on-surface leading-relaxed shadow-[0_1px_4px_rgba(48,51,49,0.06)]">
        {msg.text}
      </div>
      <p className="text-[10px] text-outline-variant mt-1 ml-1">{msg.time}</p>
    </div>
  </div>
);

/** Message dispatcher */
const Message = ({ msg }) => {
  if (msg.type === 'system') return <SystemMessage msg={msg} />;
  if (msg.type === 'offer_status') return <OfferStatusMessage msg={msg} />;
  if (msg.type === 'offer') return <OfferBubble msg={msg} />;
  if (msg.type === 'buyer') return <BuyerBubble msg={msg} />;
  if (msg.type === 'seller') return <SellerBubble msg={msg} />;
  return null;
};

// â”€â”€â”€ Negotiate input panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const NegotiateInputPanel = ({ listing, onSendOffer, onSwitch }) => {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const askingPrice = listing?.price || 0;

  const handleSubmit = () => {
    const num = parseFloat(offerAmount);
    if (!num || num <= 0) { setError('Please enter a valid offer amount.'); return; }
    if (num >= askingPrice) { setError(`Your offer must be below the asking price (${formatCurrency(askingPrice)}).`); return; }
    setError('');
    onSendOffer(num, message.trim());
    setOfferAmount('');
    setMessage('');
  };

  const pct = askingPrice > 0 && offerAmount
    ? Math.round((1 - parseFloat(offerAmount) / askingPrice) * 100)
    : null;

  return (
    <div className="flex flex-col gap-4 p-5 border-t border-surface-container bg-surface">
      {/* Asking price reference */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-on-surface-variant font-medium">Asking Price</span>
        <span className="font-serif text-lg font-bold text-on-surface">{formatCurrency(askingPrice)}</span>
      </div>

      {/* Offer amount */}
      <div>
        <label className="block text-xs font-bold text-on-surface mb-1.5">
          Your Offer <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">â‚¹</span>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => { setOfferAmount(e.target.value); setError(''); }}
            placeholder="Enter your price"
            className={cn(
              'w-full rounded-xl border py-3 pl-8 pr-28 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface font-bold text-base bg-white',
              error ? 'border-red-400 bg-red-50' : 'border-outline-variant'
            )}
          />
          {/* Quick-pick shortcuts */}
          {askingPrice > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              {[0.9, 0.8, 0.7].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => { setOfferAmount(String(Math.round(askingPrice * ratio))); setError(''); }}
                  className="text-[10px] font-bold px-1.5 py-1 bg-surface-container rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors"
                >
                  {Math.round((1 - ratio) * 100)}% off
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Savings indicator */}
        {pct !== null && pct > 0 && !error && (
          <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">trending_down</span>
            {pct}% below asking price
          </p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* Optional message */}
      <div>
        <label className="block text-xs font-bold text-on-surface mb-1.5">
          Message to Seller
          <span className="text-outline-variant font-normal ml-1">(optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          placeholder="e.g. I'm interested but the price is a bit high for me..."
          className="w-full rounded-xl border border-outline-variant py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-on-surface bg-white resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onSwitch}
          className="flex-1 h-11 border-2 border-outline-variant text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          Just Chat
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 h-11 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">local_offer</span>
          Send Offer
        </button>
      </div>

      <p className="text-[10px] text-on-surface-variant text-center leading-relaxed">
        The seller will receive your offer and can accept, counter, or decline. No funds are charged until they accept.
      </p>
    </div>
  );
};

// â”€â”€â”€ Standard chat input bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ChatInputBar = ({ onSend, onOfferMode, showNegotiateButton }) => {
  const [text, setText] = useState('');
  const textRef = useRef(null);

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    textRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="p-3 border-t border-surface-container bg-white flex items-end gap-2">
      {/* Attachment button */}
      <button className="shrink-0 p-2 text-outline-variant hover:text-primary hover:bg-surface-container rounded-xl transition-colors" aria-label="Attach file">
        <span className="material-symbols-outlined text-[20px]">attach_file</span>
      </button>

      {/* Input */}
      <textarea
        ref={textRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Type a messageâ€¦"
        className="flex-1 resize-none overflow-hidden rounded-xl border border-outline-variant py-2.5 px-3.5 text-sm text-on-surface bg-surface-container-lowest outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors leading-relaxed min-h-[42px] max-h-[120px]"
        style={{ fieldSizing: 'content' }}
      />

      {/* Negotiate button */}
      {showNegotiateButton && (
        <button
          onClick={onOfferMode}
          title="Make an offer"
          className="shrink-0 p-2 text-primary bg-primary-container rounded-xl hover:bg-primary hover:text-white transition-all"
          aria-label="Make an offer"
        >
          <span className="material-symbols-outlined text-[20px]">local_offer</span>
        </button>
      )}

      {/* Send */}
      <button
        onClick={send}
        disabled={!text.trim()}
        className={cn(
          'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all',
          text.trim()
            ? 'bg-primary text-white hover:bg-primary/90 active:scale-95 shadow-sm'
            : 'bg-surface-container text-outline-variant cursor-not-allowed'
        )}
        aria-label="Send message"
      >
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          send
        </span>
      </button>
    </div>
  );
};

// â”€â”€â”€ Typing indicator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TypingIndicator = ({ name }) => (
  <div className="flex items-center gap-2.5 mb-3">
    <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-[14px] text-outline-variant">person</span>
    </div>
    <div className="bg-white border border-surface-container rounded-2xl rounded-bl-sm px-4 py-3 shadow-[0_1px_4px_rgba(48,51,49,0.06)]">
      <div className="flex items-center gap-1 h-4">
        {[0, 0.2, 0.4].map((d) => (
          <div
            key={d}
            className="w-2 h-2 rounded-full bg-outline-variant animate-bounce"
            style={{ animationDelay: `${d}s`, animationDuration: '0.8s' }}
          />
        ))}
      </div>
    </div>
    <span className="text-[10px] text-outline-variant">{name} is typingâ€¦</span>
  </div>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MAIN MODAL COMPONENT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
/**
 * OrderChatModal
 *
 * Props:
 *   isOpen        â€“ boolean
 *   onClose       â€“ () => void
 *   mode          â€“ 'chat' | 'negotiate'   (default 'chat')
 *   listing       â€“ { id, title, price, provider, image, category, ... }
 *   sellerAvatar  â€“ string URL
 *   sellerName    â€“ string
 */
const OrderChatModal = ({
  isOpen,
  onClose,
  mode: initialMode = 'chat',
  listing = {},
  sellerAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop',
  sellerName = 'Seller',
  orderId = '',
  allowIssueReporting = false,
  onReportIssue,
}) => {
  const [mode, setMode] = useState(initialMode);
  const [messages, setMessages] = useState(() => seedMessagesForMode(initialMode));
  const [isSellerTyping, setIsSellerTyping] = useState(false);
  const [offerSent, setOfferSent] = useState(false);

  const feedRef = useRef(null);

  // Keep mode in sync when prop changes (e.g. switching between listing views)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMode(initialMode);
      setMessages(seedMessagesForMode(initialMode));
      setOfferSent(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialMode, isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isSellerTyping]);

  // Simulate seller reply after buyer sends a message
  const simulateSellerReply = useCallback((replyText, delay = 1800) => {
    setIsSellerTyping(true);
    setTimeout(() => {
      setIsSellerTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'seller',
          text: replyText,
          time: ts(),
          avatar: sellerAvatar,
          sender: sellerName,
        },
      ]);
    }, delay);
  }, [sellerAvatar, sellerName]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: 'buyer', text, time: ts() },
    ]);
    // Simulate a generic seller reply
    simulateSellerReply("Got it! I'll keep you updated on the progress.");
  };

  const handleSendOffer = (amount, note) => {
    const newMessages = [
      ...messages,
      {
        id: Date.now(),
        type: 'offer',
        offerAmount: amount,
        text: note || null,
        time: ts(),
      },
      {
        id: Date.now() + 0.5,
        type: 'system',
        text: `Offer of ${formatCurrency(amount)} sent to ${sellerName}. Awaiting response.`,
        time: ts(),
      },
    ];
    setMessages(newMessages);
    setOfferSent(true);
    setMode('chat'); // Switch to chat after offer is sent

    // Simulate seller response to offer
    setTimeout(() => {
      setIsSellerTyping(true);
      setTimeout(() => {
        setIsSellerTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            type: 'offer_status',
            offerStatus: 'accepted',
            text: `Offer of ${formatCurrency(amount)} accepted by ${sellerName}! Proceed to checkout.`,
            time: ts(),
          },
          {
            id: Date.now() + 3,
            type: 'seller',
            text: `I've accepted your offer of ${formatCurrency(amount)}. Please proceed to checkout to complete the purchase.`,
            time: ts(),
            avatar: sellerAvatar,
            sender: sellerName,
          },
        ]);
      }, 2200);
    }, 800);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const reportIssueHref = orderId
    ? `/dashboard?tab=resolution&orderId=${encodeURIComponent(orderId)}`
    : '/dashboard?tab=resolution';

  if (!isOpen) return null;

  const isNegotiateMode = mode === 'negotiate';
  const canNegotiate = !!listing?.price && !offerSent;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="fixed inset-0 z-[201] flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={isNegotiateMode ? 'Make an Offer' : 'Order Chat'}
      >
        <div
          className="w-full sm:w-[480px] md:w-[540px] bg-[#f8faf9] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(92vh, 720px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-surface-container shrink-0">
            {/* Seller avatar + online dot */}
            <div className="relative shrink-0">
              <img
                src={sellerAvatar}
                alt={sellerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-surface-container"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-on-surface text-sm truncate">{sellerName}</h2>
                {isNegotiateMode && (
                  <span className="px-2 py-0.5 bg-primary-container text-primary text-[10px] font-bold rounded-full uppercase tracking-wide shrink-0">
                    Make an Offer
                  </span>
                )}
              </div>
              {listing?.title && (
                <p className="text-xs text-on-surface-variant truncate">{listing.title}</p>
              )}
            </div>

            {/* Mode toggle chips */}
            {canNegotiate && (
              <div className="flex gap-1 shrink-0">
                {[
                  { id: 'chat', icon: 'chat', label: 'Chat' },
                  { id: 'negotiate', icon: 'local_offer', label: 'Offer' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMode(tab.id)}
                    title={tab.label}
                    className={cn(
                      'p-2 rounded-xl transition-all text-sm',
                      mode === tab.id
                        ? 'bg-primary text-white'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    )}
                    aria-label={tab.label}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* â”€â”€ Listing mini-card (shown in negotiate mode) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {isNegotiateMode && listing?.title && (
            <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-lowest border-b border-surface-container shrink-0">
              {listing.image && (
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-surface-container">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-outline-variant truncate">{listing.category}</p>
                <p className="text-sm font-bold text-on-surface truncate">{listing.title}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-outline-variant">Asking</p>
                <p className="font-serif font-bold text-base text-on-surface">{formatCurrency(listing.price)}</p>
              </div>
            </div>
          )}

          {/* â”€â”€ Message feed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div
            ref={feedRef}
            className="flex-1 overflow-y-auto px-4 py-5 flex flex-col custom-scrollbar"
          >
            {/* Empty state for negotiate / fresh chat */}
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-3">
                <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[30px]">
                    {isNegotiateMode ? 'local_offer' : 'chat'}
                  </span>
                </div>
                <h3 className="font-bold text-on-surface text-sm">
                  {isNegotiateMode
                    ? 'Make Your First Offer'
                    : 'Start the conversation'}
                </h3>
                <p className="text-xs text-on-surface-variant max-w-[220px] leading-relaxed">
                  {isNegotiateMode
                    ? "Propose a price and the seller will be notified. No payment is made until they accept."
                    : "Ask the seller anything about this listing."}
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}

            {isSellerTyping && <TypingIndicator name={sellerName} />}
          </div>

          {/* â”€â”€ Input area (switches based on mode) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {isNegotiateMode ? (
            <NegotiateInputPanel
              listing={listing}
              onSendOffer={handleSendOffer}
              onSwitch={() => setMode('chat')}
            />
          ) : (
            <ChatInputBar
              onSend={handleSendMessage}
              onOfferMode={() => setMode('negotiate')}
              showNegotiateButton={canNegotiate}
            />
          )}

          {/* â”€â”€ Escrow footer note â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {allowIssueReporting && (
            <div className="px-4 py-2.5 bg-amber-50 border-t border-amber-100 flex items-center justify-between gap-3 shrink-0">
              <p className="text-[10px] text-amber-800 leading-relaxed">
                Need mediation? Report an issue to freeze escrow and start a calm resolution flow.
              </p>
              {onReportIssue ? (
                <button
                  onClick={() => {
                    onReportIssue({ orderId });
                    onClose();
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[11px] font-bold hover:bg-amber-600 transition-colors"
                >
                  Report an Issue
                </button>
              ) : (
                <Link
                  to={reportIssueHref}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[11px] font-bold hover:bg-amber-600 transition-colors"
                >
                  Report an Issue
                </Link>
              )}
            </div>
          )}
          <div className="px-4 py-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center justify-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-emerald-600 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lock
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">
              All communication is private and escrow-protected
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderChatModal;

