import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 bg-surface relative overflow-hidden min-h-[70vh]">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl text-center space-y-8 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center shadow-inner mb-4 relative">
            <span className="material-symbols-outlined text-5xl text-outline absolute animate-pulse">construction</span>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_10s_linear_infinite] border-t-primary/80"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-on-surface tracking-tight">
            Curating Something <span className="italic font-light">Special</span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            This section is currently being crafted by our team. Check back soon for exclusive new offerings.
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-primary text-white rounded-full font-label tracking-wider hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Return Home
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 bg-surface-container text-on-surface rounded-full font-label tracking-wider hover:bg-surface-container-high transition-colors border border-outline-variant/20"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
