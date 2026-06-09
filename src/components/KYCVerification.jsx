import React, { useState, useRef } from 'react';
import { cn } from '../utils';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const DOC_TYPES = [
  {
    id: 'aadhaar',
    label: 'Aadhaar Card',
    icon: 'badge',
    desc: '12-digit unique identity number issued by UIDAI',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    id: 'pan',
    label: 'PAN Card',
    icon: 'credit_card',
    desc: 'Permanent Account Number issued by Income Tax Dept.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    id: 'passport',
    label: 'Passport',
    icon: 'book',
    desc: 'Indian Passport — any valid passport accepted',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
];

const SECURITY_BADGES = [
  { icon: 'verified_user', label: 'Bank-level Encryption', sub: '256-bit AES' },
  { icon: 'lock',          label: 'End-to-End Secure',     sub: 'TLS 1.3' },
  { icon: 'policy',        label: 'RBI Compliant',         sub: 'KYC Norms'  },
  { icon: 'privacy_tip',   label: 'Data Protected',        sub: 'ISO 27001'  },
];

const STEPS = ['Document Type', 'Upload ID', 'Selfie', 'Review & Submit'];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// Step indicator at top
const StepBar = ({ current }) => (
  <div className="flex items-center gap-0">
    {STEPS.map((label, i) => {
      const done    = i < current;
      const active  = i === current;
      return (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all shrink-0',
              done   ? 'bg-emerald-500 border-emerald-500 text-white' :
              active ? 'bg-primary border-primary text-white ring-4 ring-primary/20' :
              'bg-white border-outline-variant text-outline-variant'
            )}>
              {done
                ? <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                : i + 1
              }
            </div>
            <span className={cn(
              'text-[10px] font-bold mt-1 whitespace-nowrap hidden sm:block',
              active ? 'text-primary' : done ? 'text-emerald-600' : 'text-outline-variant'
            )}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn('flex-1 h-0.5 mx-1 transition-all duration-500', i < current ? 'bg-emerald-400' : 'bg-surface-container')} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// Single document upload slot  
const UploadSlot = ({ label, file, onFile, isDragOver, onDrag, onDrop, id }) => {
  const inputRef = useRef(null);
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer group',
        isDragOver
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : file
          ? 'border-emerald-400 bg-emerald-50/50'
          : 'border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary/5'
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); onDrag(true); }}
      onDragLeave={() => onDrag(false)}
      onDrop={e => { e.preventDefault(); onDrag(false); onDrop(e.dataTransfer.files[0]); }}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={e => onFile(e.target.files[0])}
      />

      {file ? (
        <>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-600 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-emerald-700">{label} uploaded</p>
            <p className="text-[11px] text-emerald-600 truncate max-w-[160px]">{file.name}</p>
          </div>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onFile(null); }}
            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow border border-surface-container flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            <span className="material-symbols-outlined text-red-400 text-[13px]">close</span>
          </button>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[24px] transition-colors">upload_file</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-on-surface">{label}</p>
            <p className="text-[11px] text-on-surface-variant">Drag & drop or <span className="text-primary font-bold">click to browse</span></p>
            <p className="text-[10px] text-outline-variant mt-1">JPG, PNG, PDF · Max 5 MB</p>
          </div>
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const KYCVerification = () => {
  const [step, setStep]           = useState(0);
  const [docType, setDocType]     = useState('');
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile]   = useState(null);
  const [selfieDone, setSelfieDone] = useState(false);
  const [selfieLoading, setSelfieLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragFront, setDragFront] = useState(false);
  const [dragBack, setDragBack]   = useState(false);
  const [agree, setAgree]         = useState(false);

  const selectedDoc = DOC_TYPES.find(d => d.id === docType);
  const needsBack   = docType !== 'passport'; // passport is single-page upload

  const canNextStep0 = !!docType;
  const canNextStep1 = frontFile && (needsBack ? backFile : true);
  const canNextStep2 = selfieDone;
  const canSubmit    = canNextStep0 && canNextStep1 && canNextStep2 && agree;

  const simulateSelfie = () => {
    setSelfieLoading(true);
    setTimeout(() => { setSelfieLoading(false); setSelfieDone(true); }, 2000);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  // ── PENDING STATE ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Pending hero */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-[0_8px_32px_rgba(251,191,36,0.12)] overflow-hidden">
          {/* Amber top bar */}
          <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-300" />

          <div className="p-8 flex flex-col items-center text-center gap-5">
            {/* Animated amber icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                <span className="material-symbols-outlined text-white text-[14px]">schedule</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 border border-amber-200 rounded-full mb-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Verification Pending</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-on-surface mb-2">Documents Submitted!</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
                Our compliance team is reviewing your <strong>{selectedDoc?.label}</strong> and selfie.
                This typically takes <strong className="text-amber-700">1–2 hours</strong> during business hours.
              </p>
            </div>

            {/* Timeline */}
            <div className="w-full max-w-sm flex flex-col gap-3 mt-2">
              {[
                { done: true,  label: 'Documents received',       sub: 'Just now'         },
                { done: false, label: 'Under review',             sub: 'Est. 1–2 hours'   },
                { done: false, label: 'Verification decision',    sub: 'Email notification'},
                { done: false, label: 'KYC Complete — Ready to transact', sub: 'After approval' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-left">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    item.done ? 'bg-emerald-500' : i === 1 ? 'bg-amber-400 animate-pulse' : 'bg-surface-container'
                  )}>
                    {item.done
                      ? <span className="material-symbols-outlined text-white text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      : <span className="text-[10px] font-black text-outline-variant">{i + 1}</span>
                    }
                  </div>
                  <div>
                    <p className={cn('text-sm font-bold', item.done ? 'text-emerald-700' : i === 1 ? 'text-amber-700' : 'text-on-surface-variant')}>{item.label}</p>
                    <p className="text-[11px] text-outline-variant">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What's next */}
            <div className="w-full p-4 bg-surface-container-lowest rounded-2xl border border-surface-container text-left">
              <p className="text-xs font-black text-on-surface-variant uppercase tracking-wider mb-2">What happens next?</p>
              <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
                {[
                  'You\'ll receive an email at dhruv@example.com once reviewed.',
                  'Your transaction limit will increase to ₹2,00,000 after KYC.',
                  'KYC approval is valid for 5 years.',
                ].map(text => (
                  <li key={text} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[13px] mt-0.5 shrink-0">arrow_right</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => { setSubmitted(false); setStep(0); setDocType(''); setFrontFile(null); setBackFile(null); setSelfieDone(false); setAgree(false); }}
              className="text-sm text-on-surface-variant hover:text-primary font-bold transition-colors"
            >
              ← Start a new submission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── Trust Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2c1e] to-[#1a3d2b] rounded-3xl p-6 mb-6 shadow-[0_8px_32px_rgba(15,44,30,0.25)]">
        {/* Decorative rings */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <span className="material-symbols-outlined text-emerald-400 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Identity Verification</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-white leading-tight">KYC Verification Portal</h2>
            <p className="text-sm text-white/60 mt-1 leading-relaxed">
              Complete your identity check to unlock higher transaction limits and build buyer trust.
            </p>
          </div>
        </div>

        {/* Security badges */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {SECURITY_BADGES.map(b => (
            <div key={b.label} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-emerald-400 text-[15px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white/80 leading-none">{b.label}</p>
                <p className="text-[9px] text-white/40 mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Step Tracker ── */}
      <div className="bg-white rounded-2xl border border-surface-container p-5 mb-6 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
        <StepBar current={step} />
      </div>

      {/* ── Step Content Card ── */}
      <div className="bg-white rounded-2xl border border-surface-container shadow-[0_4px_16px_rgba(48,51,49,0.06)] overflow-hidden">

        {/* ════════════════════ STEP 0: Document Type ════════════════════ */}
        {step === 0 && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Select Document Type</h3>
                <p className="text-xs text-on-surface-variant">Choose the government-issued ID you'll upload</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {DOC_TYPES.map(doc => (
                <label
                  key={doc.id}
                  htmlFor={`doc-${doc.id}`}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all',
                    docType === doc.id
                      ? `${doc.border} ${doc.bg}`
                      : 'border-surface-container hover:border-outline-variant hover:bg-surface-container-lowest'
                  )}
                >
                  <input
                    type="radio"
                    id={`doc-${doc.id}`}
                    name="docType"
                    value={doc.id}
                    checked={docType === doc.id}
                    onChange={() => setDocType(doc.id)}
                    className="hidden"
                  />
                  {/* Custom radio dot */}
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                    docType === doc.id ? `border-current ${doc.color}` : 'border-outline-variant'
                  )}>
                    {docType === doc.id && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                  </div>

                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', doc.bg)}>
                    <span className={cn('material-symbols-outlined text-[20px]', doc.color)} style={{ fontVariationSettings: "'FILL' 1" }}>{doc.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface text-sm">{doc.label}</p>
                    <p className="text-xs text-on-surface-variant">{doc.desc}</p>
                  </div>

                  {docType === doc.id && (
                    <span className="material-symbols-outlined text-emerald-500 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ STEP 1: Upload ════════════════════ */}
        {step === 1 && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Upload {selectedDoc?.label}</h3>
                <p className="text-xs text-on-surface-variant">
                  {needsBack ? 'Upload clear photos of both sides' : 'Upload a clear photo of your passport information page'}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Good lighting', 'All 4 corners visible', 'No glare or blur', 'Original document only'].map(tip => (
                <span key={tip} className="flex items-center gap-1 px-2.5 py-1 bg-surface-container rounded-xl text-[11px] text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-emerald-500 text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {tip}
                </span>
              ))}
            </div>

            <div className={cn('grid gap-4', needsBack ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
              <UploadSlot
                id="front-upload"
                label={needsBack ? 'Front Side' : 'Information Page'}
                file={frontFile}
                onFile={setFrontFile}
                isDragOver={dragFront}
                onDrag={setDragFront}
                onDrop={setFrontFile}
              />
              {needsBack && (
                <UploadSlot
                  id="back-upload"
                  label="Back Side"
                  file={backFile}
                  onFile={setBackFile}
                  isDragOver={dragBack}
                  onDrag={setDragBack}
                  onDrop={setBackFile}
                />
              )}
            </div>

            {/* Encryption note */}
            <div className="flex items-center gap-2 mt-4 p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="material-symbols-outlined text-[16px] text-outline-variant" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <p className="text-[11px] text-on-surface-variant leading-snug">
                Documents are <strong>256-bit AES encrypted</strong> during upload and stored in a secure isolated vault. They are never shared with third parties.
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════ STEP 2: Selfie ════════════════════ */}
        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-violet-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Selfie Verification</h3>
                <p className="text-xs text-on-surface-variant">A quick photo confirms you match your document</p>
              </div>
            </div>

            {/* Camera mock UI */}
            <div className={cn(
              'relative w-full aspect-[4/3] max-h-72 rounded-3xl overflow-hidden flex items-center justify-center border-2',
              selfieDone ? 'border-emerald-400 bg-emerald-50' : 'border-dashed border-outline-variant bg-surface-container-lowest'
            )}>
              {selfieDone ? (
                <>
                  {/* Simulated face silhouette */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-emerald-200 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-600 text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-full">
                      <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-white text-sm font-bold">Selfie Captured</span>
                    </div>
                  </div>
                  {/* Overlay corner brackets  */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />
                </>
              ) : (
                <>
                  {/* Camera placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
                  {/* Face guide oval */}
                  <div className="w-36 h-44 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[56px] text-on-surface-variant/30">person</span>
                  </div>
                  {/* Scanner line animation */}
                  <div className="absolute inset-x-0 top-[30%] h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-[scanLine_2s_ease-in-out_infinite]" />
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                  {/* Guide text */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-[11px] font-bold">
                      Align your face within the oval
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Requirements */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: 'light_mode',   label: 'Good lighting'      },
                { icon: 'face_retouching_off', label: 'No glasses/mask' },
                { icon: 'crop_free',    label: 'Face centred'       },
              ].map(req => (
                <div key={req.label} className="flex flex-col items-center gap-1 p-2.5 bg-surface-container-lowest rounded-xl border border-surface-container text-center">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{req.icon}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant">{req.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={selfieDone ? () => setSelfieDone(false) : simulateSelfie}
              disabled={selfieLoading}
              className={cn(
                'w-full mt-4 h-12 flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all',
                selfieLoading
                  ? 'bg-primary/60 text-white cursor-wait'
                  : selfieDone
                  ? 'bg-surface-container text-on-surface-variant hover:bg-red-50 hover:text-red-600'
                  : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm'
              )}
            >
              {selfieLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Analysing…
                </>
              ) : selfieDone ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Retake Selfie
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                  Take Selfie
                </>
              )}
            </button>
          </div>
        )}

        {/* ════════════════════ STEP 3: Review ════════════════════ */}
        {step === 3 && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Review & Submit</h3>
                <p className="text-xs text-on-surface-variant">Confirm all documents are correct before submitting</p>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-3 mb-5">
              {[
                { icon: selectedDoc?.icon || 'badge', label: 'Document',   value: selectedDoc?.label,    ok: !!docType,      color: selectedDoc?.color },
                { icon: 'upload_file',               label: 'Front Side',  value: frontFile?.name,       ok: !!frontFile,    color: 'text-blue-600'    },
                { icon: 'upload_file',               label: needsBack ? 'Back Side' : 'Info Page', value: needsBack ? backFile?.name : frontFile?.name, ok: needsBack ? !!backFile : !!frontFile, color: 'text-blue-600' },
                { icon: 'face',                      label: 'Selfie',      value: selfieDone ? 'Captured successfully' : 'Not taken', ok: selfieDone, color: 'text-violet-600' },
              ].map((row, i) => (
                <div key={i} className={cn('flex items-center gap-3 p-3.5 rounded-xl border', row.ok ? 'bg-surface-container-lowest border-surface-container' : 'bg-red-50 border-red-200')}>
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', row.ok ? 'bg-surface-container' : 'bg-red-100')}>
                    <span className={cn('material-symbols-outlined text-[16px]', row.ok ? row.color : 'text-red-500')} style={{ fontVariationSettings: "'FILL' 1" }}>{row.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{row.label}</p>
                    <p className="text-sm font-bold text-on-surface truncate">{row.value || <span className="text-red-500">Missing</span>}</p>
                  </div>
                  <span className={cn('material-symbols-outlined text-[20px]', row.ok ? 'text-emerald-500' : 'text-red-400')} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {row.ok ? 'check_circle' : 'error'}
                  </span>
                </div>
              ))}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/20 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer shrink-0"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I confirm that the documents submitted are <strong className="text-on-surface">genuine and unaltered</strong>. I consent to The Curator processing my personal data for identity verification in accordance with the{' '}
                <button type="button" className="text-primary font-bold hover:underline">Privacy Policy</button> and{' '}
                <button type="button" className="text-primary font-bold hover:underline">KYC Policy</button>.
              </span>
            </label>
          </div>
        )}

        {/* ── Footer Navigation ── */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-surface-container-lowest border-t border-surface-container">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className={cn(
              'h-11 px-5 flex items-center gap-2 font-bold text-sm rounded-xl border-2 transition-all',
              step === 0
                ? 'border-surface-container text-outline-variant cursor-not-allowed'
                : 'border-outline-variant text-on-surface hover:bg-surface-container'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={
                (step === 0 && !canNextStep0) ||
                (step === 1 && !canNextStep1) ||
                (step === 2 && !canNextStep2)
              }
              className={cn(
                'h-11 px-6 flex items-center gap-2 font-bold text-sm rounded-xl transition-all',
                ((step === 0 && !canNextStep0) || (step === 1 && !canNextStep1) || (step === 2 && !canNextStep2))
                  ? 'bg-surface-container text-outline-variant cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm'
              )}
            >
              Continue
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                'h-11 px-6 flex items-center gap-2 font-bold text-sm rounded-xl transition-all',
                !canSubmit
                  ? 'bg-surface-container text-outline-variant cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99] shadow-sm'
              )}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              Submit Verification
            </button>
          )}
        </div>
      </div>

      {/* Scanner line keyframe — injected globally once */}
      <style>{`@keyframes scanLine { 0%,100% { top: 30%; opacity: 0.8; } 50% { top: 70%; opacity: 0.2; } }`}</style>
    </div>
  );
};

export default KYCVerification;
