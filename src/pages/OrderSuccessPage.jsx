import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';
import { formatCurrency } from '../utils/index';
import OrderChatModal from '../components/OrderChatModal';

// ─── Demo order data (in production, derive from route state / API) ──────────
const DEMO_ORDER = {
  id: 'ORD-29481',
  listingId: 'cd-1',
  listingTitle: 'Custom Corporate Agreements & NDAs',
  category: 'Contract Drafting',
  provider: 'Advocate Priya Sharma',
  providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
  listingImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  totalPaid: 3605,
  guestEmail: 'buyer@example.com',
  deliveryTime: '2 Days',
  placedAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
};

// ─── Escrow Timeline ─────────────────────────────────────────────────────────
const TIMELINE_STEPS = [
  {
    id: 1,
    label: 'Funds Secured',
    sub: 'In escrow',
    icon: 'lock',
    status: 'done', // 'done' | 'active' | 'pending'
  },
  {
    id: 2,
    label: 'Seller Notified',
    sub: 'Order confirmed',
    icon: 'notifications_active',
    status: 'active',
  },
  {
    id: 3,
    label: 'Work in Progress',
    sub: 'Seller working',
    icon: 'pending_actions',
    status: 'pending',
  },
  {
    id: 4,
    label: 'Delivery & Review',
    sub: 'Your approval',
    icon: 'rate_review',
    status: 'pending',
  },
  {
    id: 5,
    label: 'Funds Released',
    sub: 'To seller',
    icon: 'payments',
    status: 'pending',
  },
];

const EscrowTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_20px_rgba(48,51,49,0.04)] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <span className="material-symbols-outlined text-emerald-600 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
        </div>
        <div>
          <h2 className="font-bold text-on-surface text-base">Escrow Protection Active</h2>
          <p className="text-xs text-on-surface-variant">Funds held securely until you confirm delivery</p>
        </div>
        <div className="ml-auto shrink-0 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
          Live
        </div>
      </div>

      {/* Timeline track */}
      <div className="relative">
        {/* Connector line (desktop) */}
        <div className="hidden sm:block absolute top-5 left-0 right-0 h-0.5 bg-surface-container z-0">
          {/* Filled portion up to step 2 */}
          <div className="absolute left-0 h-full bg-emerald-400 transition-all duration-700" style={{ width: '25%' }} />
        </div>

        <ol className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2">
          {TIMELINE_STEPS.map((step, idx) => {
            const isDone = step.status === 'done';
            const isActive = step.status === 'active';

            return (
              <li key={step.id} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 sm:text-center">
                {/* Mobile connector line */}
                {idx > 0 && (
                  <div className={cn(
                    'sm:hidden w-px h-6 shrink-0 self-start mt-0 ml-5',
                    isDone ? 'bg-emerald-400' : 'bg-surface-container'
                  )} />
                )}

                {/* Icon node */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500',
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_0_4px_rgba(52,211,153,0.2)]'
                      : isActive
                      ? 'bg-white border-emerald-500 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]'
                      : 'bg-white border-surface-container'
                  )}
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  ) : (
                    <span
                      className={cn(
                        'material-symbols-outlined text-[18px]',
                        isActive ? 'text-emerald-500' : 'text-outline-variant'
                      )}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {step.icon}
                    </span>
                  )}

                  {/* Active pulse ring */}
                  {isActive && (
                    <span className="absolute w-10 h-10 rounded-full border-2 border-emerald-400 animate-ping opacity-40" />
                  )}
                </div>

                {/* Label */}
                <div className="sm:mt-2 text-left sm:text-center">
                  <p className={cn(
                    'text-xs font-bold leading-tight',
                    isDone || isActive ? 'text-on-surface' : 'text-outline-variant'
                  )}>
                    {step.label}
                  </p>
                  <p className={cn(
                    'text-[10px] mt-0.5 leading-tight',
                    isDone ? 'text-emerald-600' : isActive ? 'text-emerald-500 font-medium' : 'text-outline-variant'
                  )}>
                    {isActive ? '● ' : ''}{step.sub}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

// ─── File Upload Widget ───────────────────────────────────────────────────────
const FileUploadWidget = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({}); // { fileName: 'uploading' | 'done' | 'error' }
  const inputRef = useRef(null);

  const processFiles = useCallback((incoming) => {
    const newFiles = Array.from(incoming).filter(
      (f) => !files.find((ex) => ex.name === f.name)
    );
    if (!newFiles.length) return;

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress per file
    newFiles.forEach((file) => {
      setUploadStatus((prev) => ({ ...prev, [file.name]: 'uploading' }));
      const delay = 1000 + Math.random() * 1500;
      setTimeout(() => {
        setUploadStatus((prev) => ({ ...prev, [file.name]: 'done' }));
      }, delay);
    });
  }, [files]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setUploadStatus((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const humanSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const iconForFile = (name) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'picture_as_pdf';
    if (['doc', 'docx'].includes(ext)) return 'description';
    if (['xls', 'xlsx'].includes(ext)) return 'table_chart';
    if (['zip', 'rar', '7z'].includes(ext)) return 'folder_zip';
    return 'insert_drive_file';
  };

  const allDone = files.length > 0 && files.every((f) => uploadStatus[f.name] === 'done');

  return (
    <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_20px_rgba(48,51,49,0.04)] overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-start gap-4">
        <div className="p-3 bg-amber-100 rounded-xl shrink-0">
          <span className="material-symbols-outlined text-amber-600 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            upload_file
          </span>
        </div>
        <div>
          <h2 className="font-bold text-on-surface text-base mb-0.5">Upload Your Files</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The seller requires your files to begin work. Upload them below to get started.
          </p>
        </div>
        {allDone && (
          <div className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            All uploaded
          </div>
        )}
      </div>

      {/* Required files checklist */}
      <div className="px-6 mb-4">
        <p className="text-xs font-bold text-outline-variant uppercase tracking-wider mb-2">Required by Seller</p>
        <ul className="flex flex-col gap-1.5">
          {[
            'Brief description of the parties involved',
            'Key terms and conditions to be included',
            'Any existing templates or previous agreements',
          ].map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-outline mt-0.5 shrink-0">radio_button_unchecked</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Drop Zone */}
      <div className="px-6 pb-6">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 group',
            isDragging
              ? 'border-primary bg-primary-container/40 scale-[1.01]'
              : 'border-outline-variant/50 hover:border-primary/60 hover:bg-surface-container-lowest'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => processFiles(e.target.files)}
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.zip"
          />

          {/* Animated upload icon */}
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200',
            isDragging ? 'bg-primary/10 scale-110' : 'bg-surface-container-low group-hover:bg-primary/5'
          )}>
            <span className={cn(
              'material-symbols-outlined text-[32px] transition-colors',
              isDragging ? 'text-primary' : 'text-outline-variant group-hover:text-primary/70'
            )}>
              cloud_upload
            </span>
          </div>

          {isDragging ? (
            <p className="font-bold text-primary text-sm">Drop files here!</p>
          ) : (
            <>
              <div className="text-center">
                <p className="font-bold text-on-surface text-sm">
                  Drag & drop files here, or{' '}
                  <span className="text-primary underline underline-offset-2">browse</span>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  PDF, DOC, DOCX, PNG, JPG, XLS, ZIP • Max 50 MB per file
                </p>
              </div>
            </>
          )}
        </div>

        {/* Uploaded file list */}
        {files.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2.5">
            {files.map((file) => {
              const status = uploadStatus[file.name];
              return (
                <li
                  key={file.name}
                  className="flex items-center gap-3 p-3.5 bg-surface-container-lowest rounded-xl border border-surface-container group"
                >
                  {/* File type icon */}
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      {iconForFile(file.name)}
                    </span>
                  </div>

                  {/* Name + progress */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {status === 'uploading' ? (
                        <>
                          {/* Progress bar */}
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full animate-[upload-progress_1.5s_ease-in-out_forwards]"
                              style={{ width: '70%', animation: 'none', transition: 'width 1.5s ease-in-out', backgroundImage: 'linear-gradient(90deg, var(--tw-gradient-stops))'  }}
                            />
                          </div>
                          <span className="text-xs text-on-surface-variant shrink-0">Uploading…</span>
                        </>
                      ) : status === 'done' ? (
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Uploaded · {humanSize(file.size)}
                        </span>
                      ) : (
                        <span className="text-xs text-on-surface-variant">{humanSize(file.size)}</span>
                      )}
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(file.name)}
                    aria-label="Remove file"
                    className="text-outline-variant hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Send files CTA */}
        {files.length > 0 && (
          <button
            disabled={!allDone}
            className={cn(
              'mt-4 w-full h-11 flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all',
              allDone
                ? 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99]'
                : 'bg-surface-container text-outline-variant cursor-not-allowed'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            {allDone ? 'Send Files to Seller' : 'Waiting for uploads…'}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Account Creation Callout ─────────────────────────────────────────────────
const AccountCallout = ({ email }) => {
  const [password, setPassword] = useState('');
  const [created, setCreated] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0); // 0–4

  const scorePassword = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const handlePwChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    setStrength(scorePassword(v));
  };

  const strengthConfig = [
    { label: 'Too short', color: 'bg-red-400' },
    { label: 'Weak', color: 'bg-orange-400' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-lime-500' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];

  const handleCreate = () => {
    if (password.length >= 6) setCreated(true);
  };

  if (created) {
    return (
      <div className="bg-gradient-to-br from-primary-container/60 to-[#e8f8f0] rounded-2xl border border-primary/20 p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            how_to_reg
          </span>
        </div>
        <div>
          <p className="font-bold text-on-surface text-sm">Account created!</p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Your order is saved. Sign in anytime with <span className="font-bold">{email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-[#f0fbf6] via-white to-primary-container/20 p-6">
      {/* Decorative glyph */}
      <span className="material-symbols-outlined absolute -right-4 -top-4 text-[100px] text-primary/5 select-none pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>
        manage_accounts
      </span>

      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-xl shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
          </div>
          <div>
            <h3 className="font-bold text-on-surface text-sm">Save your order details</h3>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Create a free account to track this order, message your seller, and check out faster next time.
            </p>
          </div>
        </div>

        {/* Email (pre-filled, read-only) */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-on-surface mb-1.5">Email</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline-variant">
              mail
            </span>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest py-2.5 pl-9 pr-4 text-sm text-on-surface-variant outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-surface-container text-[10px] text-outline-variant font-bold rounded">
              Pre-filled
            </span>
          </div>
        </div>

        {/* Password input */}
        <div className="mb-1">
          <label className="block text-xs font-bold text-on-surface mb-1.5">
            Choose a Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline-variant">
              lock
            </span>
            <input
              id="account-password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={handlePwChange}
              placeholder="Min. 8 characters"
              className="w-full rounded-xl border border-outline-variant py-2.5 pl-9 pr-11 text-sm text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
              aria-label="Toggle password visibility"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPass ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Strength indicator */}
        {password.length > 0 && (
          <div className="mb-4 flex items-center gap-2 mt-2">
            <div className="flex gap-1 flex-1">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    strength >= bar ? strengthConfig[strength]?.color : 'bg-surface-container'
                  )}
                />
              ))}
            </div>
            <span className={cn('text-xs font-bold shrink-0', `text-${strengthConfig[strength]?.color?.replace('bg-', '')}`)}>
              {strengthConfig[strength]?.label}
            </span>
          </div>
        )}

        {/* Create Account button */}
        <button
          onClick={handleCreate}
          disabled={password.length < 6}
          className={cn(
            'w-full h-11 flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all',
            password.length >= 6
              ? 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm'
              : 'bg-surface-container text-outline-variant cursor-not-allowed'
          )}
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Create Account — It's Free
        </button>

        <p className="text-[10px] text-on-surface-variant text-center mt-3">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a> &{' '}
          <a href="#" className="text-primary hover:underline">Terms</a>.
        </p>
      </div>
    </div>
  );
};

// ─── Order Summary Mini-Card ──────────────────────────────────────────────────
const OrderMiniCard = ({ order }) => (
  <div className="bg-white rounded-2xl border border-surface-container shadow-[0_2px_12px_rgba(48,51,49,0.04)] p-5 flex gap-4 items-start">
    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-surface-container">
      <img src={order.listingImage} alt={order.listingTitle} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-outline-variant mb-0.5">{order.category}</p>
          <h3 className="font-serif text-base text-on-surface leading-snug line-clamp-2">{order.listingTitle}</h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-outline-variant">Total Paid</p>
          <p className="font-serif font-bold text-lg text-on-surface">{formatCurrency(order.totalPaid)}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
        <div className="flex items-center gap-1.5">
          <img src={order.providerAvatar} alt={order.provider} className="w-4 h-4 rounded-full object-cover" />
          <span className="text-xs text-on-surface-variant">{order.provider}</span>
        </div>
        <span className="text-outline-variant text-xs">·</span>
        <span className="text-xs text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px]">schedule</span>
          {order.deliveryTime} est.
        </span>
        <span className="text-outline-variant text-xs">·</span>
        <span className="text-xs text-outline-variant">{order.placedAt}</span>
      </div>
    </div>
  </div>
);

// ─── Active Orders Dashboard Banner ──────────────────────────────────────────
const DashboardCTA = () => (
  <div className="bg-gradient-to-r from-on-surface to-on-surface/90 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-white overflow-hidden relative">
    {/* Decorative circle */}
    <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -right-2 -bottom-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 z-10">
      <span className="material-symbols-outlined text-[28px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
        dashboard
      </span>
    </div>
    <div className="flex-1 text-center sm:text-left z-10">
      <h3 className="font-bold text-lg leading-tight mb-1">Manage Your Active Orders</h3>
      <p className="text-white/70 text-sm leading-relaxed">
        Track delivery, upload files, chat with your seller, and confirm completion — all in one place.
      </p>
    </div>
    <Link
      to="/dashboard?tab=buying"
      className="z-10 shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-on-surface font-bold text-sm rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap"
    >
      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
      Go to Active Orders
    </Link>
  </div>
);

// ─── What Happens Next ────────────────────────────────────────────────────────
const NextSteps = ({ requiresFiles }) => {
  const steps = [
    ...(requiresFiles
      ? [{ icon: 'upload_file', color: 'text-amber-500', bg: 'bg-amber-50', label: 'Upload your files', desc: 'The seller needs your documents to start. Use the uploader above.' }]
      : []),
    { icon: 'notifications_active', color: 'text-blue-500', bg: 'bg-blue-50', label: 'Seller starts work', desc: 'You\'ll receive an email + in-app notification when the seller begins.' },
    { icon: 'rate_review', color: 'text-purple-500', bg: 'bg-purple-50', label: 'Review the delivery', desc: 'Once delivered, you have 72 hours to review and request revisions.' },
    { icon: 'payments', color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Confirm & release funds', desc: 'Approve delivery to release escrow funds to the seller. Done!' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_20px_rgba(48,51,49,0.04)] p-6">
      <h2 className="font-bold text-on-surface text-base mb-5">What Happens Next?</h2>
      <ol className="flex flex-col gap-5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', step.bg)}>
              <span className={cn('material-symbols-outlined text-[18px]', step.color)} style={{ fontVariationSettings: "'FILL' 1" }}>
                {step.icon}
              </span>
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-on-surface text-sm">{step.label}</p>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="absolute ml-4 mt-9 w-px h-5 bg-surface-container hidden sm:block" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

// ─── Quick Info Bar ────────────────────────────────────────────────────────────
const InfoBar = ({ order }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {[
      { icon: 'tag', label: 'Order ID', value: order.id },
      { icon: 'schedule', label: 'Delivery', value: order.deliveryTime },
      { icon: 'mail', label: 'Confirmation', value: 'Emailed' },
      { icon: 'lock', label: 'Escrow', value: 'Active' },
    ].map((item) => (
      <div key={item.label} className="bg-white rounded-xl border border-surface-container px-4 py-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-outline-variant">
          <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
        </div>
        <p className="font-bold text-sm text-on-surface">{item.value}</p>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN OrderSuccessPage
// ─────────────────────────────────────────────────────────────────────────────
const OrderSuccessPage = ({ requiresFiles = true }) => {
  const order = DEMO_ORDER; // In production: derive from location.state or API
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-body pb-20">

      {/* ─── Hero Success Banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-[#2e7d5e] text-white">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 page-container py-12 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Animated checkmark */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
              <span
                className="material-symbols-outlined text-6xl text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                task_alt
              </span>
            </div>
            {/* Outer ping */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-60" />
          </div>

          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold mb-3 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
              Order Placed Successfully
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mb-2 leading-tight">
              Your payment is secured 🔐
            </h1>
            <p className="text-green-100 text-base leading-relaxed max-w-lg">
              Funds are held safely in escrow and will only be released once you confirm delivery.
              Confirmation sent to <span className="font-bold text-white">{order.guestEmail}</span>.
            </p>
          </div>

          {/* Order ID pill — top right on desktop */}
          <div className="md:ml-auto shrink-0 text-center bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Order ID</p>
            <p className="font-mono font-bold text-lg text-white">{order.id}</p>
          </div>
        </div>
      </div>

      {/* ─── Page Content ────────────────────────────────────────────── */}
      <div className="page-container py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">

          {/* ══ LEFT / MAIN COLUMN (8/12) ═══════════════════════ */}
          <main className="lg:col-span-8 flex flex-col gap-6">

            {/* Escrow Timeline */}
            <EscrowTimeline />

            {/* Quick info bar */}
            <InfoBar order={order} />

            {/* File Upload Widget — conditional on requiresFiles */}
            {requiresFiles && <FileUploadWidget />}

            {/* What Happens Next */}
            <NextSteps requiresFiles={requiresFiles} />

            {/* Account Creation Callout */}
            <AccountCallout email={order.guestEmail} />

            {/* Dashboard CTA */}
            <DashboardCTA />
          </main>

          {/* ══ RIGHT / STICKY SIDEBAR (4/12) ═══════════════════ */}
          <aside className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="sticky top-8 flex flex-col gap-5">

              {/* Order summary card */}
              <div>
                <h2 className="font-bold text-on-surface text-base mb-3">Your Order</h2>
                <OrderMiniCard order={order} />
              </div>

              {/* Escrow status badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield
                  </span>
                  <h4 className="font-bold text-emerald-900 text-sm">Escrow Active</h4>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-serif text-2xl font-bold text-emerald-800">{formatCurrency(order.totalPaid)}</span>
                  <span className="text-xs text-emerald-600">held securely</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full w-[20%] bg-emerald-500 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-emerald-600 font-bold mt-1">
                  <span>Funds Secured</span>
                  <span>Funds Released</span>
                </div>
              </div>

              {/* Seller contact card */}
              <div className="bg-white rounded-2xl border border-surface-container p-5">
                <h4 className="font-bold text-on-surface text-sm mb-3">Your Seller</h4>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={order.providerAvatar}
                    alt={order.provider}
                    className="w-12 h-12 rounded-full object-cover border-2 border-surface-container"
                  />
                  <div>
                    <p className="font-bold text-on-surface text-sm">{order.provider}</p>
                    <p className="text-xs text-on-surface-variant">Responds within 2 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full h-10 flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface text-sm font-bold rounded-xl hover:bg-surface-container hover:border-outline transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Message Seller
                </button>
              </div>

              {/* Support link */}
              <div className="text-center text-xs text-on-surface-variant space-y-1.5">
                <p>Issue with your order?</p>
                <Link
                  to={`/dashboard?tab=resolution&orderId=${order.id}`}
                  className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                >
                  <span className="material-symbols-outlined text-[14px]">support_agent</span>
                  Report an Issue
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <OrderChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        mode="chat"
        listing={{
          id: order.listingId,
          title: order.listingTitle,
          image: order.listingImage,
          category: order.category,
          price: order.totalPaid,
        }}
        sellerAvatar={order.providerAvatar}
        sellerName={order.provider}
        orderId={order.id}
        allowIssueReporting
      />
    </div>
  );
};

export default OrderSuccessPage;
