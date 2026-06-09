import React, { useState, useMemo } from 'react';
import { cn } from '../utils';
import TaskCard from '../components/TaskCard';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK TASK DATA
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_TASKS = [
  {
    id: 'task-1',
    title: 'Need someone flying from US to bring a sealed iPhone 16 Pro Max (Natural Titanium, 256GB)',
    description: 'Flying from New York or San Francisco? I need a sealed, receipt-accompanied iPhone 16 Pro Max delivered to Bengaluru. I will pay customs + your fee.',
    buyerName: 'Arjun Kapoor',
    buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.8,
    buyerOrders: 12,
    isOnline: true,
    category: 'Logistics & Delivery',
    budgetLabel: '₹55,000 – ₹62,000',
    budgetMin: 55000,
    budgetMax: 62000,
    deadline: 'Apr 28, 2026',
    urgency: 'high',
    offerCount: 4,
    tags: ['iphone', 'international', 'delivery'],
  },
  {
    id: 'task-2',
    title: 'Looking for a React developer to build a dashboard with D3.js charts in 3 days',
    description: 'Need a skilled React dev to convert Figma designs into a pixel-perfect analytics dashboard with 5 interactive D3 visualizations. APIs already built.',
    buyerName: 'Sneha Iyer',
    buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=60&auto=format&fit=crop',
    buyerRating: 5.0,
    buyerOrders: 34,
    isOnline: false,
    category: 'Tech & Software',
    budgetLabel: '₹8,000 – ₹12,000',
    budgetMin: 8000,
    budgetMax: 12000,
    deadline: 'Apr 23, 2026',
    urgency: 'high',
    offerCount: 11,
    tags: ['react', 'd3', 'dashboard'],
  },
  {
    id: 'task-3',
    title: 'Need a professional to draft a Freelance Service Agreement for my agency',
    description: 'Looking for a lawyer or experienced paralegal to draft a comprehensive freelance service agreement covering IP, deliverables, payment terms, and dispute resolution.',
    buyerName: 'Rohan Mehta',
    buyerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.6,
    buyerOrders: 7,
    isOnline: true,
    category: 'Legal',
    budgetLabel: '₹4,000 – ₹7,000',
    budgetMin: 4000,
    budgetMax: 7000,
    deadline: 'May 5, 2026',
    urgency: 'medium',
    offerCount: 3,
    tags: ['legal', 'contract', 'agency'],
  },
  {
    id: 'task-4',
    title: 'Seeking a professional wedding MC for a 200-guest reception in Jaipur on May 15',
    description: 'Looking for an experienced, bilingual (Hindi/English) MC for our wedding reception. Should have prior experience with high-profile events.',
    buyerName: 'Priya Sharma',
    buyerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.9,
    buyerOrders: 3,
    isOnline: false,
    category: 'Events',
    budgetLabel: '₹25,000 – ₹35,000',
    budgetMin: 25000,
    budgetMax: 35000,
    deadline: 'May 15, 2026',
    urgency: 'medium',
    offerCount: 7,
    tags: ['wedding', 'mc', 'jaipur'],
  },
  {
    id: 'task-5',
    title: 'Need an illustrator for 10 custom icons in a flat, Material Design style',
    description: 'Building a SaaS product and need 10 unique, on-brand product icons. Will provide a detailed style guide and Figma workspace access.',
    buyerName: 'Dhruv Bose',
    buyerAvatar: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.7,
    buyerOrders: 19,
    isOnline: true,
    category: 'Creative',
    budgetLabel: '₹3,000 – ₹5,000',
    budgetMin: 3000,
    budgetMax: 5000,
    deadline: 'Apr 30, 2026',
    urgency: 'low',
    offerCount: 15,
    tags: ['illustration', 'icons', 'saas'],
  },
  {
    id: 'task-6',
    title: 'Research competitor pricing for 20 SaaS tools and compile a detailed report',
    description: 'Need thorough, well-structured research on pricing strategies for the top 20 project management SaaS tools. Deliverable is a Google Sheet + a 2-page summary.',
    buyerName: 'Ananya Singh',
    buyerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.5,
    buyerOrders: 5,
    isOnline: false,
    category: 'Research',
    budgetLabel: '₹2,000 – ₹3,500',
    budgetMin: 2000,
    budgetMax: 3500,
    deadline: 'May 2, 2026',
    urgency: 'low',
    offerCount: 6,
    tags: ['research', 'saas', 'pricing'],
  },
  {
    id: 'task-7',
    title: 'Find me a direct supplier for wholesale organic jaggery (100kg minimum order)',
    description: 'I run a small food brand and am looking for a reliable organic jaggery supplier in Karnataka or Maharashtra who can supply ≥100kg monthly at a competitive rate.',
    buyerName: 'Kiran Rao',
    buyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.3,
    buyerOrders: 2,
    isOnline: true,
    category: 'Logistics & Delivery',
    budgetLabel: '₹1,500 – ₹2,500',
    budgetMin: 1500,
    budgetMax: 2500,
    deadline: 'May 10, 2026',
    urgency: 'medium',
    offerCount: 2,
    tags: ['wholesale', 'organic', 'supplier'],
  },
  {
    id: 'task-8',
    title: 'Need a Python script to automate LinkedIn outreach with personalized messages',
    description: 'Looking for a developer who can build a safe, API-based LinkedIn automation tool that sends personalized connection requests and follow-up messages.',
    buyerName: 'Vikram Jain',
    buyerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=60&auto=format&fit=crop',
    buyerRating: 4.8,
    buyerOrders: 8,
    isOnline: false,
    category: 'Tech & Software',
    budgetLabel: '₹6,000 – ₹10,000',
    budgetMin: 6000,
    budgetMax: 10000,
    deadline: 'Apr 25, 2026',
    urgency: 'high',
    offerCount: 9,
    tags: ['python', 'linkedin', 'automation'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'All Categories',
  'Logistics & Delivery',
  'Tech & Software',
  'Legal',
  'Creative',
  'Events',
  'Research',
  'Services',
];

const BUDGET_RANGES = [
  { label: 'Any Budget',       min: 0,     max: Infinity },
  { label: 'Under ₹5,000',    min: 0,     max: 5000     },
  { label: '₹5,000 – ₹15,000',min: 5000,  max: 15000    },
  { label: '₹15,000 – ₹50,000',min: 15000, max: 50000    },
  { label: '₹50,000+',        min: 50000, max: Infinity  },
];

const SORT_OPTIONS = [
  { id: 'newest',     label: 'Newest First'    },
  { id: 'budget_hi',  label: 'Budget: High → Low' },
  { id: 'budget_lo',  label: 'Budget: Low → High' },
  { id: 'offers',    label: 'Most Offers'     },
];

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR FILTER SECTION
// ─────────────────────────────────────────────────────────────────────────────
const FilterSection = ({ title, icon, children }) => (
  <div className="pb-5 border-b border-surface-container last:border-0 last:pb-0">
    <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span>
      <h3 className="text-xs font-black text-on-surface uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TASKS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const TasksPage = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget]     = useState(0); // index into BUDGET_RANGES
  const [urgencyFilter, setUrgencyFilter]       = useState('all'); // all | high | medium | low
  const [sortBy, setSortBy]                     = useState('newest');
  const [searchQuery, setSearchQuery]           = useState('');
  const [sidebarOpen, setSidebarOpen]           = useState(false);

  // Derived filtered + sorted tasks
  const tasks = useMemo(() => {
    const budgetRange = BUDGET_RANGES[selectedBudget];

    let list = MOCK_TASKS.filter(t => {
      // Category
      if (selectedCategory !== 'All Categories' && t.category !== selectedCategory) return false;
      // Budget
      if (t.budgetMin < budgetRange.min || t.budgetMax > budgetRange.max) {
        if (!(t.budgetMin >= budgetRange.min && t.budgetMax <= budgetRange.max)) {
          if (budgetRange.max !== Infinity && t.budgetMax > budgetRange.max) return false;
          if (t.budgetMin < budgetRange.min && t.budgetMax < budgetRange.min) return false;
        }
      }
      // Urgency
      if (urgencyFilter !== 'all' && t.urgency !== urgencyFilter) return false;
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description?.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'budget_hi': list = [...list].sort((a, b) => b.budgetMax - a.budgetMax); break;
      case 'budget_lo': list = [...list].sort((a, b) => a.budgetMin - b.budgetMin); break;
      case 'offers':    list = [...list].sort((a, b) => b.offerCount - a.offerCount); break;
      default: break; // newest = original order
    }

    return list;
  }, [selectedCategory, selectedBudget, urgencyFilter, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedBudget(0);
    setUrgencyFilter('all');
    setSortBy('newest');
    setSearchQuery('');
  };

  const activeFilterCount = [
    selectedCategory !== 'All Categories',
    selectedBudget !== 0,
    urgencyFilter !== 'all',
  ].filter(Boolean).length;

  // ── Sidebar content (shared across mobile sheet + desktop) ──
  const renderSidebarContent = () => (
    <div className="flex flex-col gap-5">

      <FilterSection title="Category" icon="category">
        <ul className="flex flex-col gap-0.5">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
                  selectedCategory === cat
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                )}
              >
                {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Budget Range" icon="payments">
        <ul className="flex flex-col gap-0.5">
          {BUDGET_RANGES.map((range, i) => (
            <li key={range.label}>
              <button
                onClick={() => setSelectedBudget(i)}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  selectedBudget === i
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                )}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Urgency" icon="bolt">
        <div className="flex flex-col gap-2">
          {[
            { id: 'all',    label: 'All',      bg: 'bg-surface-container',  text: 'text-on-surface-variant' },
            { id: 'high',   label: '🔴 Urgent',    bg: 'bg-red-100',    text: 'text-red-700'    },
            { id: 'medium', label: '🟡 Moderate',  bg: 'bg-amber-100',  text: 'text-amber-700'  },
            { id: 'low',    label: '🟢 Flexible',  bg: 'bg-emerald-100',text: 'text-emerald-700'},
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setUrgencyFilter(opt.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all border-2',
                urgencyFilter === opt.id
                  ? `${opt.bg} ${opt.text} border-current`
                  : 'border-transparent text-on-surface-variant hover:bg-surface-container'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 border-2 border-outline-variant text-on-surface-variant text-xs font-bold rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[15px]">filter_alt_off</span>
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7f5] font-body">

      {/* ── Page Hero ── */}
      <div className="bg-white border-b border-surface-container">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg">REVERSE MARKETPLACE</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-on-surface leading-tight">
                Open Tasks
              </h1>
              <p className="text-on-surface-variant mt-1.5 text-sm max-w-xl">
                Buyers post what they need — browse real requests and make your best offer. Secured by escrow.
              </p>
            </div>

            {/* Post a Task CTA */}
            <button className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_task</span>
              Post a Task
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-5 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline-variant">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title, category, or keyword…"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-outline-variant bg-white text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-[0_2px_8px_rgba(48,51,49,0.04)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Grid ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex gap-6 lg:gap-8 items-start">

          {/* ─────────────────────────── LEFT SIDEBAR (desktop) ─── */}
          <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-6">
            <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_4px_16px_rgba(48,51,49,0.05)]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-on-surface text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">filter_list</span>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">{activeFilterCount}</span>
                  )}
                </h2>
              </div>
              {renderSidebarContent()}
            </div>
          </aside>

          {/* ─────────────────────────── MAIN CONTENT ─── */}
          <main className="flex-1 min-w-0">

            {/* Toolbar row */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {/* Mobile filter button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-white border border-surface-container text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">filter_list</span>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-4.5 h-4.5 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">{activeFilterCount}</span>
                )}
              </button>

              {/* Result count */}
              <p className="text-sm text-on-surface-variant font-medium">
                <span className="font-bold text-on-surface">{tasks.length}</span> tasks found
                {searchQuery && <> for "<span className="text-primary">{searchQuery}</span>"</>}
              </p>

              {/* Sort dropdown */}
              <div className="ml-auto">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-outline-variant pointer-events-none">sort</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-white border border-surface-container text-on-surface text-sm font-bold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-outline-variant pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'All Categories' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    <span className="material-symbols-outlined text-[12px]">category</span>
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All Categories')} className="ml-0.5 hover:bg-primary/20 rounded-full p-0.5">
                      <span className="material-symbols-outlined text-[11px]">close</span>
                    </button>
                  </span>
                )}
                {selectedBudget !== 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    <span className="material-symbols-outlined text-[12px]">payments</span>
                    {BUDGET_RANGES[selectedBudget].label}
                    <button onClick={() => setSelectedBudget(0)} className="ml-0.5 hover:bg-primary/20 rounded-full p-0.5">
                      <span className="material-symbols-outlined text-[11px]">close</span>
                    </button>
                  </span>
                )}
                {urgencyFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    <span className="material-symbols-outlined text-[12px]">bolt</span>
                    {urgencyFilter.charAt(0).toUpperCase() + urgencyFilter.slice(1)}
                    <button onClick={() => setUrgencyFilter('all')} className="ml-0.5 hover:bg-primary/20 rounded-full p-0.5">
                      <span className="material-symbols-outlined text-[11px]">close</span>
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Task grid */}
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px] text-outline-variant">search_off</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg mb-1">No tasks found</h3>
                  <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">Try adjusting your filters or search query.</p>
                </div>
                <button
                  onClick={resetFilters}
                  className="mt-1 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-[201] w-[300px] bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-container">
              <h2 className="font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">filter_list</span>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">{activeFilterCount}</span>
                )}
              </h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {renderSidebarContent()}
            </div>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-surface-container">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Show {tasks.length} Tasks
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksPage;

