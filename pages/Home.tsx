
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { ArrowRight, Star, Quote, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const { config, menu } = useApp();
  const [offset, setOffset] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [menuScrollProgress, setMenuScrollProgress] = useState(0);
  const menuCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const nextHero = useCallback(() => {
    setCurrentHeroIndex((prev) => (prev + 1) % config.heroImages.length);
  }, [config.heroImages.length]);

  const prevHero = useCallback(() => {
    setCurrentHeroIndex((prev) => (prev - 1 + config.heroImages.length) % config.heroImages.length);
  }, [config.heroImages.length]);

  // Keyboard navigation for Hero
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevHero();
      if (e.key === 'ArrowRight') nextHero();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextHero, prevHero]);

  useEffect(() => {
    const timer = setInterval(nextHero, 8000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const nameChars = useMemo(() => config.name.split(''), [config.name]);

  // Menu Carousel Navigation
  const scrollMenu = (direction: 'next' | 'prev') => {
    if (!menuCarouselRef.current) return;
    const container = menuCarouselRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of view for better flow
    const target = direction === 'next' ? container.scrollLeft + scrollAmount : container.scrollLeft - scrollAmount;
    
    container.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handleMenuScroll = () => {
    if (!menuCarouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = menuCarouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setMenuScrollProgress(0);
      return;
    }
    const progress = (scrollLeft / maxScroll) * 100;
    setMenuScrollProgress(progress);
  };

  // Parallax values
  const bgTransform = `translateY(${offset * 0.45}px) scale(${1 + offset * 0.0003})`;
  const contentTransform = `translateY(${offset * -0.2}px)`;
  const overlayOpacity = Math.min(offset / 1000, 0.6);
  const blurAmount = Math.min(offset * 0.015, 10);

  return (
    <div className="bg-charcoal text-ivory">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden group/hero">
        <div 
          className="absolute inset-0 z-0 will-change-transform"
          style={{ 
            transform: bgTransform,
            filter: `blur(${blurAmount}px)`,
          }}
        >
          {config.heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${idx === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover brightness-[0.45]" />
            </div>
          ))}
        </div>

        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-300"
          style={{ backgroundColor: `rgba(15, 15, 15, ${overlayOpacity})` }}
        />
        
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal" />

        {/* Hero Controls: Responsive Visibility */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-25 flex items-center justify-between px-4 sm:px-10 pointer-events-none">
          <button 
            onClick={prevHero}
            aria-label="Previous Slide"
            className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/5 flex items-center justify-center text-ivory/30 bg-charcoal/10 backdrop-blur-md lg:opacity-0 lg:-translate-x-10 lg:group-hover/hero:opacity-100 lg:group-hover/hero:translate-x-0 hover:text-gold hover:border-gold hover:bg-charcoal/40 hover:scale-110 hover:shadow-[0_0_30px_rgba(201,162,77,0.3)] active:scale-95 transition-all duration-500 ease-out"
          >
            <ChevronLeft size={28} className="sm:size-8" />
          </button>
          <button 
            onClick={nextHero}
            aria-label="Next Slide"
            className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/5 flex items-center justify-center text-ivory/30 bg-charcoal/10 backdrop-blur-md lg:opacity-0 lg:translate-x-10 lg:group-hover/hero:opacity-100 lg:group-hover/hero:translate-x-0 hover:text-gold hover:border-gold hover:bg-charcoal/40 hover:scale-110 hover:shadow-[0_0_30px_rgba(201,162,77,0.3)] active:scale-95 transition-all duration-500 ease-out"
          >
            <ChevronRight size={28} className="sm:size-8" />
          </button>
        </div>

        <div 
          className="relative z-20 text-center px-6 max-w-5xl will-change-transform"
          style={{ transform: contentTransform }}
        >
          <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
             <span className="text-brandRed text-[10px] uppercase tracking-[0.5em] font-bold">New York • Seoul</span>
          </div>
          <h1 className="text-[7rem] md:text-[14rem] font-sonmari logo-text-styled leading-none flex justify-center flex-nowrap whitespace-nowrap overflow-visible select-none tracking-normal">
            {nameChars.map((char, i) => (
              <span key={i} className="animate-writing opacity-0 inline-block px-1" style={{ animationDelay: `${400 + (i * 150)}ms` }}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl text-stone mt-6 max-w-2xl mx-auto italic font-serif leading-relaxed animate-fade-in" style={{ animationDelay: '1800ms', opacity: 0 }}>
            {config.tagline}
          </p>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in" style={{ animationDelay: '2200ms', opacity: 0 }}>
            <Link to="/reservations" className="bg-gold text-charcoal px-14 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brandRed hover:text-white transition-all shadow-2xl btn-hover-glow">
              Reserve a Table
            </Link>
            <Link to="/menu" className="border border-gold/40 text-gold px-14 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-brandRed hover:text-brandRed transition-all btn-hover-glow backdrop-blur-sm">
              Explore the Menu
            </Link>
          </div>
        </div>

        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20"
          style={{ transform: `translate(-50%, ${offset * 0.15}px)` }}
        >
           {config.heroImages.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrentHeroIndex(i)} 
               className={`h-1 transition-all duration-500 ${i === currentHeroIndex ? 'w-12 bg-gold shadow-[0_0_8px_rgba(201,162,77,0.5)]' : 'w-4 bg-gold/20'}`} 
             />
           ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-48 border-b border-gold/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="reveal text-4xl md:text-6xl font-serif italic mb-12 text-ivory">
            A Refined Expression of <span className="text-brandRed">Korean</span> Flavor
          </h2>
          <p className="reveal delay-200 text-xl md:text-2xl text-stone leading-relaxed italic font-serif opacity-80">
            "Sonmari is a contemporary Korean-inspired restaurant celebrating precision, creativity, and balance. Rooted in respect for ingredients and driven by creativity, our kitchen reimagines comfort and sophistication on every plate."
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-48 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Inspired Sushi', desc: 'Korean-Inspired Sushi & Hand Rolls crafted with precision.' },
              { title: 'Chef-Driven', desc: 'Chef-driven seasonal creations highlighting bold flavors.' },
              { title: 'Refined Spirits', desc: 'Curated selection of sake and handcrafted cocktails.' },
              { title: 'Intimate Setting', desc: 'An intimate, design-forward atmosphere for mindful dining.' }
            ].map((item, idx) => (
              <div key={idx} className={`reveal reveal-scale delay-${(idx + 1) * 100} p-10 border border-gold/10 rounded-2xl hover:border-brandRed/30 transition-all group`}>
                <Sparkles size={24} className="text-gold/30 group-hover:text-brandRed mb-8 transition-colors" />
                <h3 className="text-2xl font-serif italic mb-4 text-gold group-hover:text-brandRed transition-colors">{item.title}</h3>
                <p className="text-stone text-sm leading-relaxed opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Carousel Section */}
      <section className="py-48 border-b border-gold/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24">
            <div className="reveal">
              <span className="text-brandRed text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Seasonal Selection</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-ivory">On The Table</h2>
            </div>
            
            <div className="reveal delay-200 flex items-center gap-12 mt-10 lg:mt-0">
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollMenu('prev')}
                  className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center text-gold hover:border-brandRed hover:text-brandRed hover:scale-110 hover:shadow-[0_0_20px_rgba(204,0,0,0.2)] active:scale-95 transition-all duration-500 ease-out"
                  aria-label="Previous dishes"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scrollMenu('next')}
                  className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center text-gold hover:border-brandRed hover:text-brandRed hover:scale-110 hover:shadow-[0_0_20px_rgba(204,0,0,0.2)] active:scale-95 transition-all duration-500 ease-out"
                  aria-label="Next dishes"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <Link to="/menu" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold hover:text-brandRed transition-colors">
                View All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div 
            ref={menuCarouselRef}
            onScroll={handleMenuScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 cursor-grab active:cursor-grabbing no-scrollbar"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {menu.map((item, idx) => (
              <div 
                key={item.id} 
                className="shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] snap-start group"
              >
                <div className="reveal reveal-scale" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-8 border border-gold/5 group-hover:border-brandRed transition-all relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="bg-charcoal/80 backdrop-blur-md text-[9px] text-gold uppercase tracking-widest px-4 py-2 rounded-full border border-gold/20">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-4">
                     <h4 className="text-2xl font-serif italic text-ivory group-hover:text-brandRed transition-colors">{item.name}</h4>
                     <span className="text-gold font-bold text-sm">{item.price}</span>
                  </div>
                  <p className="text-stone text-sm leading-relaxed italic opacity-60 mb-6 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Progress Bar */}
          <div className="max-w-xs mx-auto mt-8 h-[1px] bg-white/5 relative reveal delay-300">
            <div 
              className="absolute h-full bg-brandRed transition-all duration-300"
              style={{ 
                width: `20%`, // Indicator width
                left: `${(menuScrollProgress / 100) * 80}%` // Range of movement
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-48 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal reveal-blur">
            <Quote size={60} className="text-brandRed/10 mx-auto mb-12" />
          </div>
          <h2 className="reveal delay-150 text-3xl md:text-5xl font-serif italic text-ivory leading-tight mb-12">
            "Every detail at Sonmari is intentional—from the way dishes are plated to the mood created by our space. A masterpiece of modern <span className="text-brandRed">Korean</span> dining."
          </h2>
          <div className="reveal delay-300 flex items-center justify-center gap-1 mb-4 text-brandRed">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span className="reveal delay-400 text-[10px] uppercase tracking-[0.4em] font-bold text-stone">The Gastronome Weekly</span>
        </div>
      </section>

      {/* Contact Map Section */}
      <section className="relative h-[600px] bg-charcoal-light flex items-center justify-center overflow-hidden border-t border-gold/5">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
        <div className="relative z-10 text-center px-6">
          <div className="reveal reveal-scale">
            <MapPin size={40} className="text-brandRed mx-auto mb-8" />
            <h2 className="text-4xl font-serif italic text-ivory mb-6">Visit Our Sanctuary</h2>
            <p className="text-stone text-lg mb-10">{config.address}</p>
          </div>
          <div className="reveal delay-300 flex flex-col md:flex-row items-center justify-center gap-10 text-xs font-bold uppercase tracking-widest text-gold/60">
             <span className="flex items-center gap-2 hover:text-brandRed transition-colors"><Clock size={16} /> 5:30 PM — 11:00 PM</span>
             <span className="flex items-center gap-2 hover:text-brandRed transition-colors"><Phone size={16} /> {config.phone}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
