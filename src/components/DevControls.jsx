import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';

const ROLES = ['Guest', 'Buyer', 'Seller', 'Agent'];

const ROLE_META = {
  Guest: {
    icon: 'person_off',
    pill: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
  Buyer: {
    icon: 'shopping_bag',
    pill: 'bg-sky-50 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
  },
  Seller: {
    icon: 'storefront',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  Agent: {
    icon: 'campaign',
    pill: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
};

const DevControls = () => {
  const { user, setRole } = useAuth();
  const [open, setOpen] = useState(false);

  // Normalize role to title-case for display
  const currentRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : 'Guest';

  const meta = ROLE_META[currentRole] || ROLE_META.Guest;

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans select-none">
      {/* Expanded panel */}
      {open && (
        <div className="mb-2 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-slate-200 p-4 w-52 animate-[fadeInUp_0.15s_ease-out]">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
            Dev: Switch Role
          </p>
          <div className="flex flex-col gap-1.5">
            {ROLES.map((role) => {
              const m = ROLE_META[role];
              const isActive = currentRole === role;
              return (
                <button
                  key={role}
                  onClick={() => { setRole(role); setOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold border transition-all
                    ${isActive
                      ? `${m.pill} border-2 shadow-sm`
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  <span
                    className="material-symbols-outlined text-[17px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {m.icon}
                  </span>
                  {role}
                  {isActive && (
                    <span className="ml-auto text-[10px] font-black opacity-60">ACTIVE</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Toggle pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Dev: Switch role"
        className={`flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.18)] border text-sm font-bold transition-all hover:scale-105 active:scale-95 ${meta.pill}`}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`} />
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {meta.icon}
        </span>
        <span>{currentRole}</span>
        <span className="material-symbols-outlined text-[14px] opacity-60">
          {open ? 'expand_more' : 'expand_less'}
        </span>
      </button>
    </div>
  );
};

export default DevControls;

