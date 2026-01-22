
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../App';
import { Leaf, Info, ChevronLeft, ChevronRight, Camera, Sparkles, ArrowRight, Check, ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menu } = useApp();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Cinematic Gallery State
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  
  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Sides'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearCategories = () => setSelectedCategories([]);

  const galleryItems = useMemo(() => {
    return menu.filter(item => item.image);
  }, [menu]);

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const processedMenu = useMemo(() => {
    // 1. Filter
    let items = selectedCategories.length === 0 
      ? [...menu] 
      : menu.filter(item => selectedCategories.includes(item.category));

    // 2. Sort
    if (sortOrder === 'price-asc') {
      items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOrder === 'price-desc') {
      items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    
    return items;
  }, [menu, selectedCategories, sortOrder]);

  // Cinematic Gallery Navigation
  const nextSlide = useCallback(() => {
    setActiveGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevSlide = useCallback(() => {
    setActiveGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  useEffect(() => {
    if (galleryItems.length === 0) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, galleryItems.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [processedMenu]);

  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      
      {/* Cinematic Plate Gallery - Styled like Hero */}
      <section className="relative h-[75vh] min-h-[600px] overflow-hidden bg-charcoal-light border-b border-gold/5 group/gallery">
        <div className="absolute inset-0 z-0">
          {galleryItems.map((item, idx) => (
            <div
              key={`slide-${item.id}`}
              className={`absolute inset-0 transition-all duration-[2400ms] ease-out ${idx === activeGalleryIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* Floating Gallery Controls - Refined Hover/Active States */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="pointer-events-auto w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 bg-charcoal/20 backdrop-blur-xl opacity-0 -translate-x-10 group-hover/gallery:opacity-100 group-hover/gallery:translate-x-0 hover:text-gold hover:border-gold hover:scale-110 hover:shadow-[0_0_30px_rgba(201,162,77,0.3)] active:scale-95 transition-all duration-500 ease-out btn-active-press"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={nextSlide}
            className="pointer-events-auto w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 bg-charcoal/20 backdrop-blur-xl opacity-0 translate-x-10 group-hover/gallery:opacity-100 group-hover/gallery:translate-x-0 hover:text-gold hover:border-gold hover:scale-110 hover:shadow-[0_0_30px_rgba(201,162,77,0.3)] active:scale-95 transition-all duration-500 ease-out btn-active-press"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Slide Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
             <span className="text-brandRed text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block animate-fade-in">Signature Plate</span>
             
             {galleryItems.map((item, idx) => (
               idx === activeGalleryIndex && (
                 <div key={`content-${item.id}`} className="space-y-6">
                    <h2 className="text-5xl md:text-8xl font-serif italic text-ivory animate-writing leading-tight drop-shadow-2xl">
                      {item.name}
                    </h2>
                    <div className="flex items-center justify-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                      <span className="text-gold font-bold text-2xl font-serif">{item.price}</span>
                      <div className="w-12 h-[1px] bg-gold/30" />
                      <span className="text-stone/60 text-[10px] uppercase tracking-widest font-bold">{item.category}</span>
                    </div>
                 </div>
               )
             ))}
          </div>
        </div>

        {/* Progress Bar (Hero Style) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
           {galleryItems.map((_, i) => (
             <button 
               key={`indicator-${i}`} 
               onClick={() => setActiveGalleryIndex(i)} 
               className={`h-[2px] transition-all duration-700 ${i === activeGalleryIndex ? 'w-16 bg-gold shadow-[0_0_10px_rgba(201,162,77,0.5)]' : 'w-4 bg-white/10 hover:bg-white/30'}`} 
             />
           ))}
        </div>
      </section>

      {/* Menu Header - Positioned below the Cinematic Gallery */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <span className="text-gold text-[11px] uppercase tracking-[0.6em] font-bold mb-8 block reveal">Culinary Craft</span>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-10 leading-tight reveal delay-150">The Menu</h1>
          <p className="max-w-2xl mx-auto text-stone text-xl leading-relaxed italic font-serif opacity-70 reveal delay-300">
            Our menu is designed to be shared, explored, and remembered. Each dish reflects our commitment to balance, freshness, and bold yet refined flavor combinations.
          </p>
        </div>
      </section>

      {/* Advanced Filtering & Sorting Controls */}
      <section className="sticky top-24 z-40 bg-charcoal/90 backdrop-blur-2xl border-b border-gold/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Multi-Category Selection */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={clearCategories}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border transition-all ${
                selectedCategories.length === 0 ? 'bg-gold text-charcoal border-gold' : 'border-gold/20 text-stone hover:border-gold/50'
              }`}
            >
              All
            </button>
            <div className="h-4 w-[1px] bg-gold/20 mx-2 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border transition-all flex items-center gap-2 group ${
                  selectedCategories.includes(cat) 
                  ? 'bg-gold/10 text-gold border-gold/40 shadow-[0_0_15px_rgba(201,162,77,0.1)]' 
                  : 'border-white/5 text-stone/60 hover:border-gold/30 hover:text-gold'
                }`}
              >
                {selectedCategories.includes(cat) && <Check size={12} className="animate-in zoom-in" />}
                {cat}
              </button>
            ))}
          </div>

          {/* Price Sorting Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-4 bg-charcoal-light border border-gold/20 px-6 py-2.5 rounded-xl hover:border-brandRed transition-all group"
            >
              <ArrowUpDown size={14} className="text-gold group-hover:text-brandRed" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone">
                {sortOrder === 'default' ? 'Sort By Price' : sortOrder === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'}
              </span>
              <ChevronDown size={14} className={`text-stone transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                <div className="absolute top-full right-0 mt-4 w-56 bg-charcoal-light border border-gold/10 rounded-2xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => { setSortOrder('default'); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all ${sortOrder === 'default' ? 'bg-gold/10 text-gold' : 'text-stone hover:bg-white/5 hover:text-ivory'}`}
                    >
                      Default View
                    </button>
                    <button 
                      onClick={() => { setSortOrder('price-asc'); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all ${sortOrder === 'price-asc' ? 'bg-gold/10 text-gold' : 'text-stone hover:bg-white/5 hover:text-ivory'}`}
                    >
                      Price: Low to High
                    </button>
                    <button 
                      onClick={() => { setSortOrder('price-desc'); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all ${sortOrder === 'price-desc' ? 'bg-gold/10 text-gold' : 'text-stone hover:bg-white/5 hover:text-ivory'}`}
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Menu List with Background Effects */}
      <section className="py-24 relative overflow-hidden">
        {/* Aesthetic Background Decorations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Typographic Watermark */}
          <div className="absolute top-1/4 -left-20 text-[20rem] font-serif italic text-white/[0.02] -rotate-12 whitespace-nowrap">
            Handcrafted Selection
          </div>
          <div className="absolute bottom-1/4 -right-20 text-[25rem] font-sonmari text-brandRed/[0.02] rotate-12 whitespace-nowrap">
            Sonmari
          </div>
          
          {/* Moving Orbs */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full animate-pulse mix-blend-overlay" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-brandRed/5 blur-[150px] rounded-full animate-pulse [animation-delay:2s] mix-blend-overlay" />

          {/* Architectural Grid Pattern (Subtle) */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(#C9A24D 1px, transparent 1px), linear-gradient(90deg, #C9A24D 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            {processedMenu.map((item) => (
              <div key={item.id} className="reveal reveal-scale flex flex-col sm:flex-row gap-10 group border-b border-gold/5 pb-16 last:border-none backdrop-blur-[2px]">
                <div className="shrink-0 w-full sm:w-48 h-56 rounded-2xl overflow-hidden border border-gold/5 group-hover:border-gold/30 transition-all shadow-lg">
                  <img src={item.image || 'https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?auto=format&fit=crop&q=80&w=400'} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" />
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
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] uppercase tracking-widest font-bold text-brandRed/60 border border-brandRed/10 px-3 py-1 rounded bg-brandRed/5">
                       {item.category}
                     </span>
                     <span className="text-[9px] uppercase tracking-widest font-bold text-gold/40 border border-gold/10 px-3 py-1 rounded">Chef Signature</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {processedMenu.length === 0 && (
            <div className="text-center py-40">
              <p className="text-stone italic text-2xl font-serif opacity-40">No items match the selected refined filters.</p>
              <button onClick={clearCategories} className="mt-8 text-gold text-[10px] font-bold uppercase tracking-widest hover:text-ivory transition-all underline underline-offset-8">Reset All Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Sourcing Note */}
      <section className="py-48 border-t border-gold/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="p-16 md:p-24 bg-charcoal rounded-[40px] border border-gold/10 text-center relative overflow-hidden reveal">
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
