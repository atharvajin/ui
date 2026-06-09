import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExploreHero from '../components/ExploreHero';
import CategoryCard from '../components/CategoryCard';
import HowItWorks from '../components/HowItWorks';
import AuctionCard from '../components/AuctionCard';
import DigitalAssetCard from '../components/DigitalAssetCard';
import ServiceCard from '../components/ServiceCard';

import { curatedCategories, auctions, trendingDigitalAssets, localServices } from '../data/mockData';

// Map curated category titles to their correct domain routes
const CATEGORY_ROUTE_MAP = {
  'Fine Art':       '/art-craft/fine-art',
  'Automobilia':    '/physical-goods/fashion',
  'Digital Assets': '/digital-assets',
  'Services':       '/services',
  'Govt Documents': '/services/legal/marketplace',
  'Refurbished':    '/physical-goods/electronics',
  'Contracts':      '/services/legal/marketplace',
};

const ExplorePage = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const handleScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 20);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Enrich curatedCategories with proper routes
  const enrichedCategories = curatedCategories.map(cat => ({
    ...cat,
    route: CATEGORY_ROUTE_MAP[cat.title] || '/'
  }));

  return (
    <main className="page-container pb-32 overflow-hidden">
      <ExploreHero />

      {/* Curated Category Grid / Carousel */}
      <section className="relative mb-32 group/carousel">
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
        >
          {enrichedCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Right Navigation Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-[-24px] top-[45%] -translate-y-1/2 w-16 h-16 bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full flex items-center justify-center text-on-surface hover:scale-110 hover:bg-white transition-all z-10"
          >
            <span className="material-symbols-outlined text-3xl font-light">arrow_back</span>
          </button>
        )}
        <button
          onClick={scrollRight}
          className="absolute right-[-24px] top-[45%] -translate-y-1/2 w-16 h-16 bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full flex items-center justify-center text-on-surface hover:scale-110 hover:bg-white transition-all z-10"
        >
          <span className="material-symbols-outlined text-3xl font-light">arrow_forward</span>
        </button>
      </section>

      <HowItWorks />

      {/* Feeds */}
      <section className="space-y-32">

        {/* Feed 1: Auctions Ending Soon */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-fluid-h2 mb-2">Auctions <span className="italic">Ending Soon</span></h2>
              <div className="h-1 w-24 bg-secondary"></div>
            </div>
            <Link to="/physical-goods" className="text-primary font-serif italic text-sm tracking-widest uppercase hover:underline">View All</Link>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {auctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>

        {/* Feed 2: Trending Digital Assets */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-fluid-h2 mb-2">Trending <span className="italic">Digital Assets</span></h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div>
            <Link to="/digital-assets" className="text-primary font-serif italic text-sm tracking-widest uppercase hover:underline">View All</Link>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {trendingDigitalAssets.map(asset => (
              <DigitalAssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>

        {/* Feed 3: Local Services Near You */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-fluid-h2 mb-2">Local Services <span className="italic">Near You</span></h2>
              <div className="h-1 w-24 bg-tertiary"></div>
            </div>
            <Link to="/services" className="text-primary font-serif italic text-sm tracking-widest uppercase hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

      </section>
    </main>
  );
};

export default ExplorePage;
