import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface-container py-24 px-8 mt-32 border-t border-outline-variant/20">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-xs">
          <h2 className="text-3xl font-serif italic mb-6 text-earth-brown">The Curator</h2>
          <p className="font-body text-sm text-on-surface-variant leading-loose mb-8">Elevating the marketplace to an editorial standard. We source, verify, and deliver the extraordinary to the most discerning collectors in the world.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-terracotta hover:bg-terracotta hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">language</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-terracotta hover:bg-terracotta hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">share</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
          <div>
            <h5 className="font-body font-bold text-xs uppercase tracking-widest text-terracotta mb-6">Marketplace</h5>
            <ul className="space-y-4 text-sm font-body text-on-surface-variant">
              <li><a className="hover:text-terracotta transition-colors" href="#">Auctions</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Private Sales</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Digital Vault</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Service Directory</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-body font-bold text-xs uppercase tracking-widest text-terracotta mb-6">Resources</h5>
            <ul className="space-y-4 text-sm font-body text-on-surface-variant">
              <li><a className="hover:text-terracotta transition-colors" href="#">Editorial</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Provenance Guide</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Shipping Logistics</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Secure Escrow</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-body font-bold text-xs uppercase tracking-widest text-terracotta mb-6">The Company</h5>
            <ul className="space-y-4 text-sm font-body text-on-surface-variant">
              <li><a className="hover:text-terracotta transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Contact</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Legal &amp; Privacy</a></li>
              <li><a className="hover:text-terracotta transition-colors" href="#">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto pt-16 mt-16 border-t border-outline-variant/20 flex justify-between items-center text-xs font-body tracking-widest uppercase text-on-surface-variant/60">
        <p>© 2024 The Curator Editorial Marketplace. All rights reserved.</p>
        <p>Designed for the Extraordinary</p>
      </div>
    </footer>
  );
};

export default Footer;
