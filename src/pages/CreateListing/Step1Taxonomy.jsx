import React, { useState } from 'react';
import { cn } from '../../utils';

const coreCategories = [
  { id: 'physical-goods', label: 'Physical Goods', icon: 'inventory_2', color: 'bg-primary-container text-on-primary-container', subCategories: ['Electronics', 'Home & Office', 'Fashion', 'Collectibles'] },
  { id: 'digital-assets', label: 'Digital Assets', icon: 'devices', color: 'bg-secondary-container text-on-secondary-container', subCategories: ['Software', 'Social Media', 'Creative Assets', 'Gaming'] },
  { id: 'services', label: 'Services', icon: 'handshake', color: 'bg-tertiary-container text-on-tertiary-container', subCategories: ['Legal', 'Marketing', 'Wedding', 'Technical', 'Financial'] },
  { id: 'art-craft', label: 'Art & Craft', icon: 'palette', color: 'bg-[#ffdad3] text-[#410002]', subCategories: ['Fine Art', 'Handicrafts', 'Jewelry', 'Commissions'] },
  { id: 'events', label: 'Events & Tasks', icon: 'event_available', color: 'bg-[#e2e2ec] text-[#44464f]', subCategories: ['Concerts', 'Festivals', 'Sports', 'Bounties'] },
];

const mockSubSubCategories = {
  'Legal': ['Contract Drafting', 'Court Appearance', 'Govt Documents'],
  'Marketing': ['Brand Strategy', 'Social Media', 'Content Creation'],
  'Tech & Electronics': ['Smartphones', 'Laptops', 'Wearables']
};

const Step1Taxonomy = ({ formData, setFormData }) => {
  const [selectedCore, setSelectedCore] = useState(formData.category || null);
  const [selectedSub, setSelectedSub] = useState(formData.subCategory || null);

  const handleCoreSelect = (id) => {
    setSelectedCore(selectedCore === id ? null : id);
    setSelectedSub(null); // Reset sub selection
    setFormData({ ...formData, category: id, subCategory: '', subSubCategory: '' });
  };

  const handleSubSelect = (sub) => {
    setSelectedSub(selectedSub === sub ? null : sub);
    setFormData({ ...formData, subCategory: sub, subSubCategory: '' });
  };

  const handleSubSubSelect = (subSub) => {
    setFormData({ ...formData, subSubCategory: subSub });
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up mt-8">
      <div className="text-center">
         <h2 className="font-serif text-4xl text-on-surface mb-3">What are you offering?</h2>
         <p className="text-on-surface-variant font-body text-lg">Select the taxonomy that best describes your listing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreCategories.map((core) => {
           const isExpanded = selectedCore === core.id;
           
           return (
             <div 
               key={core.id} 
               className={cn(
                 "col-span-1 border rounded-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white cursor-pointer relative",
                 isExpanded ? "md:col-span-2 lg:col-span-3 border-primary shadow-[0_10px_40px_rgba(48,51,49,0.08)] ring-1 ring-primary mx-[-1rem] md:mx-0 p-2 md:p-6" : "border-surface-container hover:border-outline hover:shadow-md h-full"
               )}
             >
               <div 
                 className={cn("p-6 flex items-center justify-between transition-colors", isExpanded ? `${core.color} rounded-2xl` : "bg-transparent")}
                 onClick={() => handleCoreSelect(core.id)}
               >
                  <div className="flex items-center gap-5">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors", isExpanded ? "bg-white/30" : core.color)}>
                       <span className="material-symbols-outlined text-3xl">{core.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold">{core.label}</h3>
                      {!isExpanded && <p className="text-sm opacity-80 mt-1">{core.subCategories.length} subcategories</p>}
                    </div>
                  </div>
                  <span className={cn(
                    "material-symbols-outlined transition-transform duration-300 text-3xl opacity-50 hover:bg-black/5 hover:opacity-100 p-2 rounded-full",
                    isExpanded ? "rotate-180" : ""
                  )}>
                    expand_more
                  </span>
               </div>
               
               {/* Drill down area: Subcategories */}
               <div 
                 className={cn(
                   "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-white/50 rounded-b-2xl",
                   isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
                 )}
               >
                 <div className="min-h-0 flex flex-col gap-4">
                    <p className="text-sm font-bold text-on-surface-variant px-4 uppercase tracking-wider">Select Subcategory</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pb-6 border-b border-surface-container/50">
                      {core.subCategories.map(sub => {
                        const isSubSelected = selectedSub === sub;
                        const subSubs = mockSubSubCategories[sub] || [];
                        
                        return (
                          <div key={sub} className={cn("col-span-1 md:col-span-1 flex flex-col gap-2", isSubSelected && subSubs.length > 0 ? "col-span-2 md:col-span-4" : "")}>
                             <button
                               onClick={(e) => { e.stopPropagation(); handleSubSelect(sub); }}
                               className={cn(
                                 "w-full px-5 py-4 text-left rounded-xl font-medium border-2 transition-all flex justify-between items-center bg-white",
                                 isSubSelected 
                                   ? "border-primary text-primary shadow-sm" 
                                   : "border-surface-container hover:border-outline text-on-surface"
                               )}
                             >
                               {sub}
                               {subSubs.length > 0 && (
                                <span className={cn("material-symbols-outlined text-[20px] transition-transform", isSubSelected ? "rotate-180 text-primary" : "text-outline")}>expand_more</span>
                               )}
                             </button>
                             
                             {/* Sub-Sub Categories */}
                             {isSubSelected && subSubs.length > 0 && (
                                <div className="ml-4 pl-6 border-l-2 border-surface-container py-4 flex flex-col gap-3 animate-fade-in">
                                  <p className="text-xs font-bold text-outline-variant uppercase tracking-wider">Select Speciality</p>
                                  <div className="flex flex-col md:flex-row gap-3">
                                      {subSubs.map(ss => (
                                        <button
                                          key={ss}
                                          onClick={(e) => { e.stopPropagation(); handleSubSubSelect(ss); }}
                                          className={cn(
                                            "px-5 py-3 text-left rounded-lg text-sm font-medium transition-all border-2",
                                            formData.subSubCategory === ss
                                              ? "bg-primary text-white border-primary shadow-sm"
                                              : "bg-surface border-surface-container text-on-surface hover:border-outline"
                                          )}
                                        >
                                          {ss}
                                        </button>
                                      ))}
                                  </div>
                                </div>
                             )}
                          </div>
                        );
                      })}
                    </div>
                 </div>
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default Step1Taxonomy;
