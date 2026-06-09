import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// These mock data imports will need to be created in your mockData.js
import {
  trendingProducts,
  electronicsTrending,
  fashionTrending
} from '../data/mockData';
import { PHYSICAL_GOODS_CATEGORIES } from '../data/constants';
import SubNav from '../components/SubNav';
import Breadcrumbs from '../components/Breadcrumbs';
import CategoryGrid from '../components/CategoryGrid';
import { getRepresentativeListingForTaxonomy } from '../data/listings/marketplace';
// Notice: We don't use ExpertCarousel here. Products rely on Product Cards.

const PhysicalGoodsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Find initial tab from URL or default to 'All'
  const getTabFromUrl = () => {
    if (!categoryId) return 'All';
    const validTabs = Object.values(PHYSICAL_GOODS_CATEGORIES).map(c => c.id.toLowerCase());
    if (validTabs.includes(categoryId.toLowerCase())) {
        const found = Object.values(PHYSICAL_GOODS_CATEGORIES).find(c => c.id.toLowerCase() === categoryId.toLowerCase());
        return found ? found.id : 'All';
    }
    return 'All';
  };

  const activeTab = getTabFromUrl();

  const handleTabClick = (tabId) => {
    if (tabId === 'All') {
        navigate('/physical-goods');
    } else {
        navigate(`/physical-goods/${tabId}`);
    }
  };

  // Use cat.id (the slug) as the tab id so navigation URLs are valid
  const dynamicTabs = Object.values(PHYSICAL_GOODS_CATEGORIES).map(cat => ({
    id: cat.id,
    icon: cat.icon,
    label: cat.label
  }));

  const tabs = [
    { id: 'All', icon: 'grid_view', label: 'All Goods' },
    ...dynamicTabs
  ];
  const activeGroup = Object.values(PHYSICAL_GOODS_CATEGORIES).find(c => c.id === activeTab);
  const activeLabel = activeGroup?.label || 'All';

  return (
    <main className="page-container pb-32 pt-8">
      {/* Breadcrumbs could go here */}

      {/* Sub Navigation */}
      <section className="mb-24">
        <SubNav items={tabs} activeItem={activeTab} onSelect={handleTabClick} />
      </section>

      {/* Dynamic Content Based on Tab */}
      <section className="mb-24">
         {/* Optional: Tab specific introduction */}
         {activeTab === 'electronics' && (
              <div className="mb-12">
                <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                  Discover authenticated, pre-owned smartphones, laptops, and wearables. All devices are escrow-protected.
                </p>
              </div>
         )}

         {/* Sub-subcategory Grid Generator */}
         {(() => {
            let combinedSubCats = [];
            let activeGroupId = null;

            if (activeTab === 'All') {
              combinedSubCats = Object.values(PHYSICAL_GOODS_CATEGORIES).flatMap(c => 
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
                'physical-goods'
              );
              return {
                id: subCat.id,
                title: subCat.label,
                image: exampleListing?.image || "https://images.unsplash.com/photo-1550009158-9ebf6d973145?w=800&q=80",
                bgColor: "bg-surface-container-low",
                textDim: false,
                colSpan2: false,
                parentGroupId: subCat.parentGroupId
              };
            });

            // Styling parity: Make specific grid items larger for the editorial layout
            if (dynamicCategories.length > 1) {
                dynamicCategories[1].colSpan2 = true;
                dynamicCategories[1].bgColor = "bg-primary-fixed-dim"; // Custom color mapping
                dynamicCategories[1].textDim = true;
            }
            if (dynamicCategories.length > 2) {
                dynamicCategories[2].bgColor = "bg-tertiary-container";
                dynamicCategories[2].textDim = true;
            }

            return <CategoryGrid activeTab={activeTab} activeLabel={activeLabel} categories={dynamicCategories} domain="physical-goods" categoryKey={activeGroupId} />;
         })()}
      </section>

      {/* Trending Products Section */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-fluid-h2 mb-2 text-on-surface">
              {activeTab === 'All' ? 'Trending Goods' : `Trending in ${activeLabel}`}
            </h2>
            <div className="h-1 w-24 bg-terracotta"></div> {/* Differentiating color for products */}
          </div>
          <Link to="/physical-goods" className="text-terracotta font-body font-bold text-sm tracking-widest uppercase hover:text-on-surface transition-colors">
            View All Inventory
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(activeTab === 'electronics' ? electronicsTrending : activeTab === 'fashion' ? fashionTrending : trendingProducts).map((product, idx) => (
            <div key={idx} className="group flex flex-col cursor-pointer">
              {/* Product Image Container: Note the aspect-square instead of 4/3 */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-surface-container relative">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={product.image}
                />
                {/* Condition Badge */}
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-surface">
                  {product.condition}
                </div>
                {/* Negotiable Indicator */}
                {product.negotiable && (
                    <div className="absolute top-4 right-4 bg-secondary-container/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-on-secondary-container flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">handshake</span>
                        OBO
                    </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-body text-[10px] uppercase tracking-widest text-on-surface/50">{product.sellerLoc}</p>
                  {/* Trust Icon */}
                  {product.verifiedBill && (
                     <span className="material-symbols-outlined text-sm text-tertiary" title="Original Bill Available">receipt_long</span>
                  )}
                </div>
                <h4 className="font-serif text-lg text-on-surface leading-tight mb-2 line-clamp-2">{product.title}</h4>
                <div className="mt-auto flex items-end justify-between">
                    <p className="font-body font-bold text-on-surface text-lg">{product.price}</p>
                    <p className="font-body text-xs text-on-surface/50 line-through">{product.originalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PhysicalGoodsPage;
