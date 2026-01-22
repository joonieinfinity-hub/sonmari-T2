
import React, { useEffect } from 'react';
import { useApp } from '../App';
import { ArrowRight, Gift, Users, Star, Sparkles } from 'lucide-react';

const Services: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-charcoal text-ivory">
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 reveal">
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Elevated Occasions</span>
            <h1 className="text-6xl md:text-9xl font-serif italic mb-10 text-ivory leading-tight">Bespoke Experiences</h1>
            <p className="max-w-2xl mx-auto text-stone text-xl leading-relaxed italic font-serif opacity-70">
              From intimate dinners to grand celebrations, Sonmari offers curated moments rooted in elegance and flavor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
            <div className="relative h-[700px] rounded-[3rem] overflow-hidden group reveal reveal-left border border-gold/10">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Private Dining" className="w-full h-full object-cover grayscale-[0.3] brightness-[0.3] group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 p-16 flex flex-col justify-end">
                <Users size={40} className="text-gold mb-8" />
                <h2 className="text-4xl font-serif italic text-gold mb-6">Private Dining</h2>
                <p className="text-stone text-lg leading-relaxed italic font-serif opacity-80 mb-10">
                  Sonmari offers curated private dining experiences ideal for celebrations, corporate gatherings, and special occasions for up to 24 guests.
                </p>
                <button className="bg-gold text-charcoal px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest self-start hover:bg-ivory transition-all shadow-2xl">Inquire Concierge</button>
              </div>
            </div>

            <div className="relative h-[700px] rounded-[3rem] overflow-hidden group reveal reveal-right border border-gold/10">
              <img src="https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?auto=format&fit=crop&q=80&w=800" alt="Tasting Menu" className="w-full h-full object-cover grayscale-[0.3] brightness-[0.3] group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 p-16 flex flex-col justify-end">
                <Star size={40} className="text-gold mb-8" />
                <h2 className="text-4xl font-serif italic text-gold mb-6">Chef’s Tasting</h2>
                <p className="text-stone text-lg leading-relaxed italic font-serif opacity-80 mb-10">
                  Experience our seasonal tasting menu, crafted nightly to highlight the kitchen’s most inspired creations and traditional inspirations.
                </p>
                <button className="bg-gold text-charcoal px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest self-start hover:bg-ivory transition-all shadow-2xl">View Sample Menu</button>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-light rounded-[4rem] p-12 md:p-32 flex flex-col lg:flex-row items-center gap-24 border border-gold/10 reveal reveal-scale">
            <div className="lg:w-1/2 space-y-12">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                 <Gift size={32} />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic text-ivory leading-tight">The Perfect Gift</h2>
              <p className="text-stone text-xl leading-relaxed italic font-serif opacity-80">
                "Give the gift of an unforgettable dining experience. Our curated gift experiences are the ideal choice for those who appreciate the finer details of culinary craft."
              </p>
              <div className="flex flex-wrap gap-8">
                <button className="bg-gold text-charcoal px-10 py-5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow-xl">Purchase Credit</button>
                <button className="border border-gold/30 text-gold px-10 py-5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10 transition-all">Physical Gift Cards</button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-4 border border-gold/10 rounded-[2rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
               <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" alt="Gift Card" className="rounded-2xl shadow-2xl grayscale-[0.2] border border-gold/20 relative z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
