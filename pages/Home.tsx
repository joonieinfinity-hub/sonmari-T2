
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { ArrowRight, Star, Quote, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const { config, menu } = useApp();
  const [offset, setOffset] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.15 });

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

  useEffect(() => {
    const timer = setInterval(nextHero, 8000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const nameChars = useMemo(() => config.name.split(''), [config.name]);

  return (
    <div className="bg-charcoal text-ivory">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 transition-transform duration-[2000ms] ease-out"
          style={{ transform: `translateY(${offset * 0.3}px)` }}
        >
          {config.heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ${idx === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover brightness-[0.4]" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal" />

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="flex justify-center mb-6 animate-in slide-in-from-top duration-1000">
             <span className="text-brandRed text-[10px] uppercase tracking-[0.5em] font-bold">New York • Seoul</span>
          </div>
          <h1 className="text-[6rem] md:text-[12rem] font-sonmari logo-text-styled leading-none drop-shadow-2xl flex justify-center flex-nowrap whitespace-nowrap overflow-visible select-none tracking-tight">
            {nameChars.map((char, i) => (
              <span key={i} className="animate-writing opacity-0 inline-block px-1" style={{ animationDelay: `${400 + (i * 200)}ms` }}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl text-stone mt-10 max-w-2xl mx-auto italic font-serif leading-relaxed animate-in fade-in duration-1000 delay-[1800ms]">
            {config.tagline}
          </p>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 animate-in slide-in-from-bottom duration-1000 delay-[2200ms]">
            <Link to="/reservations" className="bg-gold text-charcoal px-14 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brandRed hover:text-white transition-all shadow-2xl btn-hover-glow">
              Reserve a Table
            </Link>
            <Link to="/menu" className="border border-gold/40 text-gold px-14 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-brandRed hover:text-brandRed transition-all btn-hover-glow backdrop-blur-sm">
              Explore the Menu
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
           {config.heroImages.map((_, i) => (
             <button key={i} onClick={() => setCurrentHeroIndex(i)} className={`h-1 transition-all ${i === currentHeroIndex ? 'w-12 bg-gold' : 'w-4 bg-gold/20'}`} />
           ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-40 border-b border-gold/5 px-6">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-12 text-ivory">A Refined Expression of <span className="text-brandRed">Korean</span> Flavor</h2>
          <p className="text-xl md:text-2xl text-stone leading-relaxed italic font-serif opacity-80">
            "Sonmari is a contemporary Korean-inspired restaurant celebrating precision, creativity, and balance. Rooted in respect for ingredients and driven by creativity, our kitchen reimagines comfort and sophistication on every plate."
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-40 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Inspired Sushi', desc: 'Korean-Inspired Sushi & Hand Rolls crafted with precision.' },
              { title: 'Chef-Driven', desc: 'Chef-driven seasonal creations highlighting bold flavors.' },
              { title: 'Refined Spirits', desc: 'Curated selection of sake and handcrafted cocktails.' },
              { title: 'Intimate Setting', desc: 'An intimate, design-forward atmosphere for mindful dining.' }
            ].map((item, idx) => (
              <div key={idx} className="reveal reveal-scale p-10 border border-gold/10 rounded-2xl hover:border-brandRed/30 transition-all group">
                <Sparkles size={24} className="text-gold/30 group-hover:text-brandRed mb-8 transition-colors" />
                <h3 className="text-2xl font-serif italic mb-4 text-gold group-hover:text-brandRed transition-colors">{item.title}</h3>
                <p className="text-stone text-sm leading-relaxed opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Teaser */}
      <section className="py-40 border-b border-gold/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 reveal">
            <div>
              <span className="text-brandRed text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Seasonal Selection</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-ivory">On The Table</h2>
            </div>
            <Link to="/menu" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold mt-10 lg:mt-0 hover:text-brandRed transition-colors">
              View All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {menu.slice(0, 3).map((item, idx) => (
              <div key={item.id} className={`reveal reveal-scale delay-${(idx + 1) * 100} group`}>
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-8 border border-gold/5 group-hover:border-brandRed transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex justify-between items-baseline mb-4">
                   <h4 className="text-2xl font-serif italic text-ivory group-hover:text-brandRed transition-colors">{item.name}</h4>
                   <span className="text-gold font-bold text-sm">{item.price}</span>
                </div>
                <p className="text-stone text-sm leading-relaxed italic opacity-60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-40 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <Quote size={60} className="text-brandRed/10 mx-auto mb-12" />
          <h2 className="text-3xl md:text-5xl font-serif italic text-ivory leading-tight mb-12">
            "Every detail at Sonmari is intentional—from the way dishes are plated to the mood created by our space. A masterpiece of modern <span className="text-brandRed">Korean</span> dining."
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4 text-brandRed">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone">The Gastronome Weekly</span>
        </div>
      </section>

      {/* Contact Map Section */}
      <section className="relative h-[600px] bg-charcoal-light flex items-center justify-center overflow-hidden border-t border-gold/5">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
        <div className="relative z-10 text-center px-6 reveal reveal-scale">
          <MapPin size={40} className="text-brandRed mx-auto mb-8" />
          <h2 className="text-4xl font-serif italic text-ivory mb-6">Visit Our Sanctuary</h2>
          <p className="text-stone text-lg mb-10">{config.address}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-xs font-bold uppercase tracking-widest text-gold/60">
             <span className="flex items-center gap-2 hover:text-brandRed transition-colors"><Clock size={16} /> 5:30 PM — 11:00 PM</span>
             <span className="flex items-center gap-2 hover:text-brandRed transition-colors"><Phone size={16} /> {config.phone}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
