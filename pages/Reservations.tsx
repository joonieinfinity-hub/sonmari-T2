
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Calendar, Users, Clock, Info, ArrowRight, Sparkles } from 'lucide-react';

const Reservations: React.FC = () => {
  const { config } = useApp();
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal">
        <div className="max-w-lg w-full text-center bg-charcoal-light p-16 rounded-[3rem] border border-brandRed/20 shadow-2xl animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-brandRed/10 text-brandRed rounded-full flex items-center justify-center mx-auto mb-10">
            <Sparkles size={48} />
          </div>
          <h2 className="text-5xl font-serif italic text-ivory mb-6 leading-tight">Your Experience is Set</h2>
          <p className="text-stone text-lg leading-relaxed mb-12 italic font-serif">We have received your request. An elegant confirmation will arrive in your inbox shortly.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-brandRed text-white py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-ivory hover:text-charcoal transition-all shadow-xl"
          >
            Return to Sanctuary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen text-ivory">
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            
            <div className="reveal reveal-left">
              <span className="text-brandRed text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Inquire</span>
              <h1 className="text-6xl md:text-8xl font-serif italic text-ivory leading-tight mb-12">Reserve Your Experience</h1>
              <p className="text-stone text-xl leading-relaxed italic font-serif opacity-70 mb-16 max-w-xl">
                Join us for an intimate dining experience at Sonmari. Reservations are recommended to ensure the best possible service and seating.
              </p>

              <div className="space-y-12">
                 {[
                   { icon: Calendar, title: 'Intimate Setting', desc: 'Curated seating for up to 90 minutes of dedicated culinary immersion.' },
                   { icon: Clock, title: 'Grace Period', desc: 'We value your time and hold tables for 15 minutes past scheduled arrival.' },
                   { icon: Users, title: 'Private & Large Parties', desc: 'For gatherings of 6 or more, please contact our concierge directly.' }
                 ].map((p, i) => (
                   <div key={i} className="flex items-start gap-8 group">
                      <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:text-brandRed group-hover:border-brandRed transition-all">
                        <p.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-xl font-serif italic text-gold group-hover:text-brandRed transition-all mb-2">{p.title}</h4>
                        <p className="text-stone text-sm opacity-60 leading-relaxed">{p.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-charcoal-light p-10 md:p-20 rounded-[4rem] border border-white/5 reveal reveal-right shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-charcoal rounded-full border border-brandRed/20 flex items-center justify-center">
                 <Sparkles size={24} className="text-brandRed" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone/40 block ml-2">Date</label>
                    <input type="date" required className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone/40 block ml-2">Guest Count</label>
                    <select className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all appearance-none">
                       <option>2 Guests</option>
                       <option>3 Guests</option>
                       <option>4 Guests</option>
                       <option>5 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone/40 block ml-2">Preferred Time</label>
                  <select className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all appearance-none">
                     <option>5:30 PM</option>
                     <option>6:45 PM</option>
                     <option>8:00 PM</option>
                     <option>9:15 PM</option>
                  </select>
                </div>

                <div className="space-y-8 pt-6 border-t border-white/5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <input placeholder="GIVEN NAME" required className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all text-xs tracking-widest placeholder:opacity-20" />
                      <input placeholder="FAMILY NAME" required className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all text-xs tracking-widest placeholder:opacity-20" />
                   </div>
                   <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all text-xs tracking-widest placeholder:opacity-20" />
                   <textarea placeholder="SPECIAL REQUESTS OR DIETARY REQUIREMENTS" className="w-full bg-charcoal border border-white/10 p-5 rounded-xl text-ivory outline-none focus:border-brandRed transition-all text-xs tracking-widest placeholder:opacity-20 h-32 resize-none" />
                </div>

                <button type="submit" className="w-full bg-brandRed text-white py-6 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-brandRed transition-all shadow-xl flex items-center justify-center gap-4 group">
                  Confirm Reservation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
