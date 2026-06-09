import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  trendingEvents,
  openTasks
} from '../data/mockData';
import { EVENTS_TASKS_CATEGORIES } from '../data/constants';
import SubNav from '../components/SubNav';
import CategoryGrid from '../components/CategoryGrid';
import { getRepresentativeListingForTaxonomy } from '../data/listings/marketplace';

const EventsAndTasksPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getTabFromUrl = () => {
    if (!categoryId) return 'All';
    const validTabs = Object.values(EVENTS_TASKS_CATEGORIES).map(c => c.id.toLowerCase());
    if (validTabs.includes(categoryId.toLowerCase())) {
        const found = Object.values(EVENTS_TASKS_CATEGORIES).find(c => c.id.toLowerCase() === categoryId.toLowerCase());
        return found ? found.id : 'All';
    }
    return 'All';
  };

  const activeTab = getTabFromUrl();

  const handleTabClick = (tabId) => {
    if (tabId === 'All') {
        navigate('/events-tasks');
    } else {
        navigate(`/events-tasks/${tabId}`);
    }
  };

  // Use cat.id (the slug) as the tab id so navigation URLs are valid
  const dynamicTabs = Object.values(EVENTS_TASKS_CATEGORIES).map(cat => ({
    id: cat.id,
    icon: cat.icon,
    label: cat.label
  }));

  const tabs = [
    { id: 'All', icon: 'confirmation_number', label: 'All Events' },
    ...dynamicTabs
  ];
  const activeGroup = Object.values(EVENTS_TASKS_CATEGORIES).find(c => c.id === activeTab);
  const activeLabel = activeGroup?.label || 'All';

  return (
    <main className="page-container pb-32 pt-8">
      {/* Sub Navigation */}
      <section className="mb-24">
        <SubNav items={tabs} activeItem={activeTab} onSelect={handleTabClick} />
      </section>

      {/* Dynamic Content: Only show Category Grid if NOT on Tasks tab */}
      {activeTab !== 'local-tasks' && (
          <section className="mb-24">
             {(() => {
                let combinedSubCats = [];
                let activeGroupId = null;

                if (activeTab === 'All') {
                  combinedSubCats = Object.values(EVENTS_TASKS_CATEGORIES).flatMap(c => 
                    c.subCategories.map(sub => ({ ...sub, parentGroupId: c.id }))
                  );
                } else {
                  activeGroupId = activeGroup ? activeGroup.id : null;
                  if (activeGroup) {
                    combinedSubCats = activeGroup.subCategories.map(sub => ({ ...sub, parentGroupId: activeGroup.id }));
                  }
                }

                const dynamicCategories = combinedSubCats.map(subCat => {
                  const exampleListing = getRepresentativeListingForTaxonomy(
                    subCat.id,
                    'events-tasks'
                  );
                  return {
                    id: subCat.id,
                    title: subCat.label,
                    image: exampleListing?.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
                    bgColor: "bg-surface-container-low",
                    textDim: false,
                    colSpan2: false,
                    parentGroupId: subCat.parentGroupId
                  };
                });

                if (dynamicCategories.length > 0) {
                    dynamicCategories[0].colSpan2 = true;
                    dynamicCategories[0].bgColor = "bg-secondary-container";
                    dynamicCategories[0].textDim = true;
                }

                return <CategoryGrid activeTab={activeTab} activeLabel={activeLabel} categories={dynamicCategories} domain="events-tasks" categoryKey={activeGroupId} />;
             })()}
          </section>
      )}

      {/* Main Listing Feed: Switches between Event Cards and Task/Bounty Cards */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-fluid-h2 mb-2 text-on-surface">
              {activeTab === 'local-tasks' ? 'Open Requests & Bounties' : 'Trending Passes & Tickets'}
            </h2>
            <div className="h-1 w-24 bg-tertiary"></div>
          </div>
          <Link to="/events-tasks" className="text-tertiary font-body font-bold text-sm tracking-widest uppercase hover:text-on-surface transition-colors">
            {activeTab === 'local-tasks' ? 'Back to Events' : 'View All Events'}
          </Link>
        </div>

        {/* CONDITIONAL RENDER: Task Board vs Event Grid */}
        {activeTab === 'local-tasks' ? (

            // --- THE TASK / BOUNTY BOARD (List Layout) ---
            <div className="flex flex-col gap-4">
              {openTasks.map((task, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl hover:border-tertiary transition-colors">
                    {/* User Request Avatar/Initials */}
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-surface-container items-center justify-center text-on-surface-variant font-serif italic text-xl shrink-0">
                        {task.requesterInitials}
                    </div>

                    <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="bg-error-container/20 text-error px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                Deadline: {task.deadline}
                            </span>
                            <span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                {task.location}
                            </span>
                        </div>
                        <h4 className="font-serif text-xl text-on-surface mb-2">{task.title}</h4>
                        <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-4">
                            {task.description}
                        </p>
                    </div>

                    {/* Task Budget & Action */}
                    <div className="md:border-l md:border-surface-container md:pl-6 flex flex-col justify-center shrink-0 min-w-[200px]">
                        <p className="font-body text-[10px] text-on-surface/50 uppercase tracking-widest mb-1">Escrow Budget</p>
                        <p className="font-body text-2xl font-bold text-tertiary mb-4">{task.budget}</p>
                        <button className="w-full py-2 bg-on-surface text-surface rounded hover:bg-on-surface/90 font-bold text-sm transition-colors">
                            Fulfill Request
                        </button>
                    </div>
                </div>
              ))}
            </div>

        ) : (

            // --- THE EVENT GRID (Card Layout) ---
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trendingEvents.map((event, idx) => (
                <div key={idx} className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden border border-surface-container hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Event Flyer / Image */}
                  <div className="aspect-[4/3] w-full bg-surface-container relative overflow-hidden">
                    <img
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={event.image}
                    />
                    {/* Date Calendar Badge overlay */}
                    <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur rounded-lg p-2 text-center shadow-md min-w-[3rem]">
                        <p className="font-body text-[10px] uppercase text-error font-bold">{event.month}</p>
                        <p className="font-serif text-xl text-on-surface leading-none">{event.day}</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {event.venue}
                    </div>
                    <h4 className="font-serif text-lg text-on-surface leading-tight mb-4">{event.title}</h4>

                    <div className="mt-auto pt-4 border-t border-surface-container flex items-center justify-between">
                        <div>
                            <p className="font-body text-[10px] text-on-surface/50 uppercase tracking-widest">{event.passType}</p>
                            <p className="font-body font-bold text-on-surface text-lg">{event.price}</p>
                        </div>
                        <span className="material-symbols-outlined text-tertiary">confirmation_number</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        )}
      </section>
    </main>
  );
};

export default EventsAndTasksPage;
