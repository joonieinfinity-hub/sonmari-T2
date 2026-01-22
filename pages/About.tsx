
import React, { useEffect } from 'react';
import { useApp } from '../App';
import { Sparkles, Star, Quote } from 'lucide-react';

const About: React.FC = () => {
  const { config } = useApp();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-charcoal text-ivory">
      {/* About Header */}
      <section className="py-40 bg-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center reveal">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Legacy & Vision</span>
          <h1 className="text-7xl md:text-[10rem] font-serif italic mb-12 text-ivory leading-none">Our Story</h1>
          <p className="max-w-3xl mx-auto text-stone text-2xl leading-relaxed italic font-serif opacity-70">
            "Sonmari was created as a modern expression of Korean culinary inspiration, blending traditional flavors with contemporary techniques."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-40 border-y border-gold/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative reveal reveal-left">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-gold/10 relative z-10">
                <img src="https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover grayscale-[0.2]" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border border-gold/5 rounded-[3rem] -z-10" />
            </div>
            
            <div className="reveal reveal-right space-y-12">
              <h2 className="text-5xl font-serif italic text-gold leading-tight">Elevated & Welcoming</h2>
              <div className="space-y-8 text-stone text-xl leading-relaxed italic font-serif opacity-80">
                <p>
                  Rooted in respect for ingredients and driven by creativity, our kitchen reimagines comfort and sophistication on every plate. We believe that fine dining doesn't need to be loud to be heard.
                </p>
                <p>
                  Our philosophy is simple: quality ingredients, precise execution, and a dining experience that feels both elevated and welcoming.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                 <div className="space-y-4">
                    <span className="text-gold font-bold text-3xl font-serif">Craft</span>
                    <p className="text-stone text-sm opacity-60">Prioritizing craftsmanship over excess in every detail.</p>
                 </div>
                 <div className="space-y-4">
                    <span className="text-gold font-bold text-3xl font-serif">Balance</span>
                    <p className="text-stone text-sm opacity-60">A delicate harmony of tradition and bold innovation.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-40 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-24 reveal">
            <h2 className="text-5xl md:text-7xl font-serif italic text-ivory">The Hands Behind</h2>
            <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mt-6">Hospitality with Intention</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: 'David Kim', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400' },
              { name: 'Sarah Moon', role: 'Curator of Experience', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' },
              { name: 'Minh Choi', role: 'Head of Fermentation', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400' }
            ].map((member, i) => (
              <div key={i} className={`reveal reveal-scale delay-${(i + 1) * 100} group text-center`}>
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 border border-gold/10 group-hover:border-gold/30 transition-all">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </div>
                <h3 className="text-3xl font-serif italic text-ivory mb-2">{member.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold opacity-60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="py-32 border-t border-gold/5 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-around gap-20 reveal">
             {['Craftsmanship', 'Innovation', 'Intention'].map((v, idx) => (
               <div key={idx} className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center text-gold">
                    <Sparkles size={20} />
                 </div>
                 <span className="text-2xl font-serif italic text-stone">{v}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
