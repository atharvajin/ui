import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { frequentServices, marketingFrequentServices, weddingFrequentServices, technicalLeadCurators } from '../data/mockData';
import { SERVICES_CATEGORIES } from '../data/constants';
import SubNav from '../components/SubNav';
import Breadcrumbs from '../components/Breadcrumbs';
import CategoryGrid from '../components/CategoryGrid';
import ExpertCarousel from '../components/ExpertCarousel';
import { getRepresentativeListingForTaxonomy } from '../data/listings/marketplace';

const ServicesPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Find initial tab from URL or default to 'All'
  const getTabFromUrl = () => {
    if (!categoryId) return 'All';
    const validTabs = Object.values(SERVICES_CATEGORIES).map(c => c.id.toLowerCase());
    if (validTabs.includes(categoryId.toLowerCase())) {
        const found = Object.values(SERVICES_CATEGORIES).find(c => c.id.toLowerCase() === categoryId.toLowerCase());
        return found ? found.id : 'All';
    }
    return 'All';
  };

  const activeTab = getTabFromUrl();

  const handleTabClick = (tabId) => {
    if (tabId === 'All') {
        navigate('/services');
    } else {
        navigate(`/services/${tabId}`);
    }
  };

  // Use cat.id (the slug) as the tab id so navigation URLs are valid
  const dynamicTabs = Object.values(SERVICES_CATEGORIES).map(cat => ({
    id: cat.id,
    icon: cat.icon,
    label: cat.label
  }));

  const tabs = [
    { id: 'All', icon: 'grid_view', label: 'All Services' },
    ...dynamicTabs
  ];
  const activeGroup = Object.values(SERVICES_CATEGORIES).find(c => c.id === activeTab);
  const activeLabel = activeGroup?.label || 'All';

  return (
    <main className="page-container pb-32 pt-8">
      {/* Sub Navigation */}
      <section className="mb-24">
        <SubNav items={tabs} activeItem={activeTab} onSelect={handleTabClick} />
      </section>

      {/* Dynamic Content Based on Tab */}
      <section className="mb-24">
         {activeTab === 'technical' && (
              <div className="mb-12">
                <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">

                </p>
              </div>
         )}
         {(() => {
            let combinedSubCats = [];
            let activeGroupId = null;
            if (activeTab === 'All') {
              combinedSubCats = Object.values(SERVICES_CATEGORIES).flatMap(c => 
                c.subCategories.map(sub => ({ ...sub, parentGroupId: c.id }))
              );
            } else {
              activeGroupId = activeGroup ? activeGroup.id : null;
              if (activeGroup) {
                combinedSubCats = activeGroup.subCategories.map(sub => ({ ...sub, parentGroupId: activeGroup.id }));
              }
            }
            
            const dynamicCategories = combinedSubCats.map(subCat => {
              const exampleListing = getRepresentativeListingForTaxonomy(subCat.id, 'services');
              return {
                id: subCat.id,
                title: subCat.label,
                image: exampleListing?.image || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
                bgColor: "bg-surface-container-low",
                textDim: false,
                colSpan2: false,
                parentGroupId: subCat.parentGroupId
              };
            });

            // Make the first item larger for styling parity if enough items exist
            if (dynamicCategories.length > 1) {
                dynamicCategories[1].colSpan2 = true;
                dynamicCategories[1].bgColor = "bg-primary-fixed";
                dynamicCategories[1].textDim = true;
            }
            if (dynamicCategories.length > 2) {
                dynamicCategories[2].bgColor = "bg-secondary-container";
                dynamicCategories[2].textDim = true;
            }

            return <CategoryGrid activeTab={activeTab} activeLabel={activeLabel} categories={dynamicCategories} domain="services" categoryKey={activeGroupId} />;
         })()}
      </section>

      {/* Frequently Used Services Section or Curators */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-fluid-h2 mb-2 text-on-surface">
              {activeTab === 'technical' ? 'The Lead Curators' : activeTab === 'marketing' ? 'Frequently Used Marketing Services' : activeTab === 'wedding' ? 'Frequently Used Wedding Services' : 'Frequently Used Services'}
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <Link to="/services" className="text-primary font-body font-bold text-sm tracking-widest uppercase hover:text-on-surface transition-colors">
            {activeTab === 'technical' ? 'View All Experts' : 'View All'}
          </Link>
        </div>

        {activeTab === 'technical' ? (
          <ExpertCarousel experts={technicalLeadCurators} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(activeTab === 'marketing' ? marketingFrequentServices : activeTab === 'wedding' ? weddingFrequentServices : frequentServices).map((service, idx) => (
              <div key={idx} className="group flex flex-col">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 bg-surface-container relative">
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={service.image}
                  />
                  {service.badge && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                      {service.badge}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-widest text-on-surface/50 mb-1">{service.provider}</p>
                    <h4 className="font-serif text-fluid-body text-on-surface">{service.title}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span>{service.rating}</span>
                  </div>
                </div>
                <p className="font-body text-sm text-on-surface/60 mb-4">{service.description}</p>
                <p className="font-body font-bold text-on-surface mt-auto">{service.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
};

export default ServicesPage;
