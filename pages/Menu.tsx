
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../App';
import { ChevronUp, ChevronDown, Leaf, Info, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menu } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredMenu = useMemo(() => {
    return activeCategory === 'All' 
      ? [...menu] 
      : menu.filter(item => item.category === activeCategory);
  }, [menu, activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredMenu]);

  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      {/* Menu Header */}
      <section className="py-40 border-b border-gold/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <span className="text-gold text-[11px] uppercase tracking-[0.6em] font-bold mb-8 block">Culinary Craft</span>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-10 leading-tight">The Menu</h1>
          <p className="max-w-2xl mx-auto text-stone text-xl leading-relaxed italic font-serif opacity-70">
            Our menu is designed to be shared, explored, and remembered. Each dish reflects our commitment to balance, freshness, and bold yet refined flavor combinations.
          </p>

          <div className="mt-24 flex flex-wrap justify-center gap-10 md:gap-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold uppercase tracking-[0.4em] transition-all relative pb-4 ${
                  activeCategory === cat ? 'text-gold' : 'text-stone/40 hover:text-stone'
                }`}
              >
                {cat}
                {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold animate-in slide-in-from-left" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            {filteredMenu.map((item, idx) => (
              <div key={item.id} className="reveal reveal-scale flex flex-col sm:flex-row gap-10 group border-b border-gold/5 pb-16 last:border-none">
                <div className="shrink-0 w-full sm:w-48 h-56 rounded-2xl overflow-hidden border border-gold/5 group-hover:border-gold/30 transition-all">
                  <img src={item.image || 'https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?auto=format&fit=crop&q=80&w=400'} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-3xl font-serif italic text-ivory group-hover:text-gold transition-colors">{item.name}</h3>
                    <div className="shrink-0 h-[1px] bg-gold/10 mx-6 flex-grow hidden sm:block" />
                    <span className="text-gold font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-stone text-sm leading-relaxed italic opacity-60 mb-6 flex-grow">
                    {item.description}
                  </p>
                  <div className="flex gap-4">
                     <span className="text-[9px] uppercase tracking-widest font-bold text-gold/40 border border-gold/10 px-3 py-1 rounded">Balanced</span>
                     <span className="text-[9px] uppercase tracking-widest font-bold text-gold/40 border border-gold/10 px-3 py-1 rounded">Chef Signature</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-40">
              <p className="text-stone italic text-2xl font-serif opacity-40">Our kitchen is currently preparing new creations...</p>
            </div>
          )}

          {/* Sourcing Note */}
          <div className="mt-40 p-16 md:p-24 bg-charcoal-light rounded-[40px] border border-gold/10 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-[0.02] rotate-12 pointer-events-none">
              <Sparkles size={300} className="text-gold" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif italic mb-10 text-gold">Commitment to Quality</h2>
              <p className="text-stone text-xl leading-relaxed italic font-serif opacity-80 mb-12">
                "Rooted in respect for ingredients and driven by creativity, our kitchen reimagines comfort and sophistication on every plate. We partner exclusively with sustainable suppliers to bring you the purest flavors."
              </p>
              <div className="flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-stone/50">
                <span className="flex items-center gap-3"><Leaf size={14} className="text-gold" /> Sustainably Sourced</span>
                <span className="flex items-center gap-3"><Camera size={14} className="text-gold" /> Seasonal Rotation</span>
                <span className="flex items-center gap-3"><Info size={14} className="text-gold" /> Handcrafted Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
