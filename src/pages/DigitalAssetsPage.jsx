import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  trendingDigitalAssets,
  gamingTrending
} from '../data/mockData';
import { DIGITAL_ASSETS_CATEGORIES } from '../data/constants';
import SubNav from '../components/SubNav';
import CategoryGrid from '../components/CategoryGrid';
import { getRepresentativeListingForTaxonomy } from '../data/listings/marketplace';

const DigitalAssetsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getTabFromUrl = () => {
    if (!categoryId) return 'All';
    const validTabs = Object.values(DIGITAL_ASSETS_CATEGORIES).map(c => c.id.toLowerCase());
    if (validTabs.includes(categoryId.toLowerCase())) {
        const found = Object.values(DIGITAL_ASSETS_CATEGORIES).find(c => c.id.toLowerCase() === categoryId.toLowerCase());
        return found ? found.id : 'All';
    }
    return 'All';
  };

  const activeTab = getTabFromUrl();

  const handleTabClick = (tabId) => {
    if (tabId === 'All') {
        navigate('/digital-assets');
    } else {
        navigate(`/digital-assets/${tabId}`);
    }
  };

  // Use cat.id (the slug) as the tab id so navigation URLs are valid
  const dynamicTabs = Object.values(DIGITAL_ASSETS_CATEGORIES).map(cat => ({
    id: cat.id,
    icon: cat.icon,
    label: cat.label
  }));

  const tabs = [
    { id: 'All', icon: 'apps', label: 'All Assets' },
    ...dynamicTabs
  ];
  const activeGroup = Object.values(DIGITAL_ASSETS_CATEGORIES).find(c => c.id === activeTab);
  const activeLabel = activeGroup?.label || 'All';

  return (
    <main className="page-container pb-32 pt-8">
      {/* Sub Navigation */}
      <section className="mb-24">
        <SubNav items={tabs} activeItem={activeTab} onSelect={handleTabClick} />
      </section>

      {/* Dynamic Content Based on Tab */}
      <section className="mb-24">
         {activeTab === 'gaming' && (
              <div className="mb-12">
                <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                  Securely trade game accounts, skins, and digital currencies. Funds are held in escrow until account access is verified.
                </p>
              </div>
         )}

         {(() => {
            let combinedSubCats = [];
            let activeGroupId = null;

            if (activeTab === 'All') {
              combinedSubCats = Object.values(DIGITAL_ASSETS_CATEGORIES).flatMap(c => 
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
                'digital-assets'
              );
              return {
                id: subCat.id,
                title: subCat.label,
                image: exampleListing?.image || "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
                bgColor: "bg-surface-container-low",
                textDim: false,
                colSpan2: false,
                parentGroupId: subCat.parentGroupId
              };
            });

            // Make specific grid items larger
            if (dynamicCategories.length > 1) {
                dynamicCategories[1].colSpan2 = true;
                dynamicCategories[1].bgColor = "bg-primary-fixed";
                dynamicCategories[1].textDim = true;
            }
            if (dynamicCategories.length > 2) {
                dynamicCategories[2].bgColor = "bg-surface-dim";
                dynamicCategories[2].textDim = false;
            }

            return <CategoryGrid activeTab={activeTab} activeLabel={activeLabel} categories={dynamicCategories} domain="digital-assets" categoryKey={activeGroupId} />;
         })()}
      </section>

      {/* Trending Digital Assets Section */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-fluid-h2 mb-2 text-on-surface">
              {activeTab === 'All' ? 'Trending Digital Assets' : `Trending in ${activeLabel}`}
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <Link to="/digital-assets" className="text-primary font-body font-bold text-sm tracking-widest uppercase hover:text-on-surface transition-colors">
            View All Assets
          </Link>
        </div>

        {/* Digital Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(activeTab === 'gaming' ? gamingTrending : trendingDigitalAssets).map((asset, idx) => (
            <div key={idx} className="group flex flex-col cursor-pointer bg-surface-container-lowest rounded-2xl border border-surface-container hover:shadow-lg transition-all duration-300">
              {/* Image Container: 16:9 Aspect Ratio for digital goods */}
              <div className="aspect-video w-full rounded-t-2xl overflow-hidden bg-surface-container relative">
                <img
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={asset.image}
                />

                {/* Delivery Speed Badge (Crucial for Digital) */}
                {asset.instantDelivery ? (
                    <div className="absolute top-3 left-3 bg-tertiary-container/95 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[12px]">bolt</span>
                        Instant
                    </div>
                ) : (
                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-on-surface shadow-sm">
                        Manual Transfer
                    </div>
                )}

                {/* Platform Badge (e.g., Steam, Instagram) */}
                <div className="absolute bottom-3 right-3 bg-inverse-surface/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-inverse-on-surface">
                  {asset.platform}
                </div>
              </div>

              {/* Asset Details */}
              <div className="flex flex-col flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-body text-[10px] uppercase tracking-widest text-on-surface/50">{asset.assetType}</p>
                  {/* Stats (e.g., Followers for social, Level for gaming) */}
                  {asset.metric && (
                     <span className="font-body text-xs font-bold text-primary">{asset.metric}</span>
                  )}
                </div>
                <h4 className="font-serif text-lg text-on-surface leading-tight mb-4 line-clamp-2">{asset.title}</h4>
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-surface-container/50">
                    <div>
                        <p className="font-body text-[10px] text-on-surface/50 mb-0.5">Price</p>
                        <p className="font-body font-bold text-on-surface text-lg">{asset.price}</p>
                    </div>
                    {/* Security Icon */}
                    <span className="material-symbols-outlined text-outline-variant" title="Escrow Protected">verified_user</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DigitalAssetsPage;
