import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  trendingArtwork,
  fineArtTrending
} from '../data/mockData';
import { ART_CRAFT_CATEGORIES } from '../data/constants';
import SubNav from '../components/SubNav';
import CategoryGrid from '../components/CategoryGrid';
import { getRepresentativeListingForTaxonomy } from '../data/listings/marketplace';

const ArtAndCraftPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getTabFromUrl = () => {
    if (!categoryId) return 'All';
    const validTabs = Object.values(ART_CRAFT_CATEGORIES).map(c => c.id.toLowerCase());
    if (validTabs.includes(categoryId.toLowerCase())) {
        const found = Object.values(ART_CRAFT_CATEGORIES).find(c => c.id.toLowerCase() === categoryId.toLowerCase());
        return found ? found.id : 'All';
    }
    return 'All';
  };

  const activeTab = getTabFromUrl();

  const handleTabClick = (tabId) => {
    if (tabId === 'All') {
        navigate('/art-craft');
    } else {
        navigate(`/art-craft/${tabId}`);
    }
  };

  // SubNav Taxonomy for Art & Craft — use cat.id (slug) as tab id
  const dynamicTabs = Object.values(ART_CRAFT_CATEGORIES).map(cat => ({
    id: cat.id,
    icon: cat.icon,
    label: cat.label
  }));

  const tabs = [
    { id: 'All', icon: 'auto_awesome_mosaic', label: 'The Gallery' },
    ...dynamicTabs
  ];
  const activeGroup = Object.values(ART_CRAFT_CATEGORIES).find(c => c.id === activeTab);
  const activeLabel = activeGroup?.label || 'All';

  return (
    <main className="page-container pb-32 pt-8">
      {/* Sub Navigation */}
      <section className="mb-24">
        <SubNav items={tabs} activeItem={activeTab} onSelect={handleTabClick} />
      </section>

      {/* Dynamic Content Based on Tab */}
      <section className="mb-24">
         {activeTab === 'commissions' && (
              <div className="mb-12">
                <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                  Hire independent creators to bring your vision to life. Milestone-based escrow ensures you only pay when the artwork meets your expectations.
                </p>
              </div>
         )}

         {(() => {
            let combinedSubCats = [];
            let activeGroupId = null;
            if (activeTab === 'All') {
              combinedSubCats = Object.values(ART_CRAFT_CATEGORIES).flatMap(c => 
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
                'art-craft'
              );
              return {
                id: subCat.id,
                title: subCat.label,
                image: exampleListing?.image || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
                bgColor: "bg-surface-container-low",
                textDim: false,
                colSpan2: false,
                parentGroupId: subCat.parentGroupId
              };
            });

            // Make specific grid items larger for the editorial layout
            // Art relies heavily on aesthetic layouts
            if (dynamicCategories.length > 0) {
                dynamicCategories[0].colSpan2 = true;
                dynamicCategories[0].bgColor = "bg-earth-brown"; // Custom dark brown from your config
                dynamicCategories[0].textDim = true;
            }
            if (dynamicCategories.length > 3) {
                dynamicCategories[3].bgColor = "bg-sandy-beige";
                dynamicCategories[3].textDim = false;
            }

            return <CategoryGrid activeTab={activeTab} activeLabel={activeLabel} categories={dynamicCategories} domain="art-craft" categoryKey={activeGroupId} />;
         })()}
      </section>

      {/* The Gallery / Trending Section */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-fluid-h2 mb-2 text-on-surface">
              {activeTab === 'All' ? 'Curated Collection' : `Discover ${activeLabel}`}
            </h2>
            <div className="h-1 w-24 bg-secondary"></div>
          </div>
          <Link to="/art-craft" className="text-secondary font-body font-bold text-sm tracking-widest uppercase hover:text-on-surface transition-colors">
            View Exhibition
          </Link>
        </div>

        {/* Art Grid: Portrait Aspect Ratio (3:4) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {(activeTab === 'fine-art' ? fineArtTrending : trendingArtwork).map((art, idx) => (
            <div key={idx} className="group flex flex-col cursor-pointer">

              {/* Artwork Image Container */}
              <div className="aspect-[3/4] w-full bg-surface-container relative mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <img
                  alt={art.title}
                  className="w-full h-full object-cover"
                  src={art.image}
                />

                {/* Overlay gradient for text legibility if needed, but keeping it clean is better for art */}

                {/* Artwork Tags (Original, Print, Commission) */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {art.isOriginal && (
                        <div className="bg-surface/95 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface border border-outline-variant/30">
                            Original Piece
                        </div>
                    )}
                    {art.isCommission && (
                        <div className="bg-tertiary-container/95 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container">
                            Open for Commissions
                        </div>
                    )}
                </div>

                {/* Certificate of Authenticity Icon */}
                {art.hasCoA && (
                    <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur p-1.5 rounded-full text-secondary" title="Certificate of Authenticity Included">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                    </div>
                )}
              </div>

              {/* Artwork & Artist Details */}
              <div className="flex flex-col flex-grow">
                {/* Artist Info */}
                <div className="flex items-center gap-2 mb-3">
                    <img src={art.artistAvatar} alt={art.artist} className="w-6 h-6 rounded-full object-cover" />
                    <p className="font-body text-xs font-bold text-on-surface">{art.artist}</p>
                </div>

                <h4 className="font-serif text-xl text-on-surface leading-tight mb-1">{art.title}</h4>
                <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">{art.medium} • {art.dimensions}</p>

                <div className="mt-auto pt-4 border-t border-surface-container flex items-end justify-between">
                    <div>
                        <p className="font-body text-[10px] text-on-surface/50 mb-0.5">{art.isCommission ? 'Starting at' : 'Price'}</p>
                        <p className="font-body font-bold text-on-surface text-lg">{art.price}</p>
                    </div>
                    {/* Like/Save Button - Crucial for Art platforms */}
                    <button className="text-outline hover:text-error transition-colors">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ArtAndCraftPage;
