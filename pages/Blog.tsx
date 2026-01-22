
import React, { useEffect } from 'react';
import { useApp } from '../App';
import { Calendar, User, ArrowRight, Tag, Sparkles } from 'lucide-react';

const Blog: React.FC = () => {
  const { posts } = useApp();

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
    <div className="bg-charcoal min-h-screen text-ivory">
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 reveal">
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Kitchen Dispatches</span>
            <h1 className="text-6xl md:text-9xl font-serif italic mb-10 text-ivory leading-tight">Journal</h1>
            <p className="max-w-2xl mx-auto text-stone text-xl leading-relaxed italic font-serif opacity-70">
              Discover stories from our kitchen—seasonal menus, chef insights, cultural inspirations, and special events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {posts.map((post, idx) => (
              <article key={post.id} className={`reveal reveal-scale delay-${(idx + 1) * 100} group flex flex-col`}>
                <div className="aspect-video overflow-hidden rounded-[2.5rem] mb-12 border border-gold/10 group-hover:border-gold/30 transition-all relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute top-8 right-8 bg-charcoal/40 backdrop-blur-md px-6 py-2 rounded-full border border-gold/10">
                     <span className="text-[9px] uppercase tracking-widest font-bold text-gold">{post.category}</span>
                  </div>
                </div>
                
                <div className="px-4 flex-grow">
                  <div className="flex items-center gap-8 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold text-stone/50">
                    <span className="flex items-center gap-2 text-gold/60"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif italic mb-8 text-ivory group-hover:text-gold transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-stone text-lg leading-relaxed italic font-serif opacity-60 mb-10 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="group/btn flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold mt-auto">
                    Read Story <ArrowRight size={18} className="group-hover/btn:translate-x-3 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-40 pt-20 border-t border-gold/5 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-stone/30">
            <Sparkles size={16} />
            <span>Curating more moments</span>
            <Sparkles size={16} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
