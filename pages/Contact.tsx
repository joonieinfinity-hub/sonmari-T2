
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Send, MapPin, Phone, Mail, Instagram, Facebook, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const { config } = useApp();
  const [formSent, setFormSent] = useState(false);

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
    setFormSent(true);
  };

  return (
    <div className="bg-charcoal text-ivory">
      {/* Contact Header */}
      <section className="py-40 px-6 border-b border-gold/5">
        <div className="max-w-7xl mx-auto text-center reveal">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Inquiries</span>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-10 text-ivory">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-stone text-xl leading-relaxed italic font-serif opacity-70">
            We’d love to hear from you. For reservations, events, or general inquiries, please reach out using the form below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            
            <div className="reveal reveal-left space-y-24">
              <div className="space-y-16">
                 <div className="flex gap-10 group">
                    <div className="shrink-0 w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/5 transition-all">
                       <MapPin size={28} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-stone/40 mb-3 block">Presence</span>
                       <h3 className="text-3xl font-serif italic text-ivory mb-2">{config.address}</h3>
                       <p className="text-gold text-xs font-bold uppercase tracking-widest opacity-60">Greenwich Village • NYC</p>
                    </div>
                 </div>

                 <div className="flex gap-10 group">
                    <div className="shrink-0 w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/5 transition-all">
                       <Phone size={28} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-stone/40 mb-3 block">Direct Line</span>
                       <h3 className="text-3xl font-serif italic text-ivory">{config.phone}</h3>
                    </div>
                 </div>

                 <div className="flex gap-10 group">
                    <div className="shrink-0 w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/5 transition-all">
                       <Mail size={28} />
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-stone/40 mb-3 block">Concierge</span>
                       <a href={`mailto:${config.email}`} className="text-3xl font-serif italic text-ivory hover:text-gold transition-colors">{config.email}</a>
                    </div>
                 </div>
              </div>

              <div className="pt-16 border-t border-gold/10">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-stone/40 mb-10 block">Stay Connected</span>
                 <div className="flex gap-10">
                    <a href={config.instagram} className="w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center text-stone hover:text-gold hover:border-gold/40 transition-all"><Instagram size={24} /></a>
                    <a href={config.facebook} className="w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center text-stone hover:text-gold hover:border-gold/40 transition-all"><Facebook size={24} /></a>
                 </div>
              </div>
            </div>

            <div className="bg-charcoal-light p-12 md:p-24 rounded-[4rem] border border-gold/10 reveal reveal-right shadow-2xl">
              {formSent ? (
                <div className="text-center py-24 animate-in zoom-in duration-700">
                   <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-10">
                      <Sparkles size={40} />
                   </div>
                   <h2 className="text-4xl font-serif italic mb-6 text-ivory">Message Delivered</h2>
                   <p className="text-stone italic text-lg opacity-60 mb-12">An elegant response will follow shortly.</p>
                   <button onClick={() => setFormSent(false)} className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] hover:text-ivory transition-all">Send New Inquiry</button>
                </div>
              ) : (
                <div className="space-y-12">
                   <h2 className="text-5xl font-serif italic text-gold">Leave a Note</h2>
                   <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <input placeholder="GIVEN NAME" required className="w-full bg-charcoal border border-gold/10 p-5 rounded-xl text-ivory outline-none focus:border-gold transition-all text-[10px] tracking-[0.2em] placeholder:opacity-20" />
                         <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-charcoal border border-gold/10 p-5 rounded-xl text-ivory outline-none focus:border-gold transition-all text-[10px] tracking-[0.2em] placeholder:opacity-20" />
                      </div>
                      <input placeholder="SUBJECT" className="w-full bg-charcoal border border-gold/10 p-5 rounded-xl text-ivory outline-none focus:border-gold transition-all text-[10px] tracking-[0.2em] placeholder:opacity-20" />
                      <textarea placeholder="MESSAGE" required className="w-full bg-charcoal border border-gold/10 p-5 rounded-xl text-ivory outline-none focus:border-gold transition-all text-[10px] tracking-[0.2em] placeholder:opacity-20 h-40 resize-none" />
                      <button type="submit" className="w-full bg-gold text-charcoal py-6 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-ivory transition-all shadow-xl flex items-center justify-center gap-4 group">
                         Submit Inquiry <Send size={16} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                   </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footnote */}
      <section className="py-24 border-t border-gold/5 bg-charcoal-light flex items-center justify-center">
         <div className="flex items-center gap-10 opacity-20">
            <Sparkles size={16} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Sonmari Sanctuary</span>
            <Sparkles size={16} />
         </div>
      </section>
    </div>
  );
};

export default Contact;
