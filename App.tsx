
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Instagram, Facebook, Mail, MapPin, 
  Phone, Settings, Check, ChevronRight, ArrowRight,
  Plus, Trash2, Globe, Layout, Utensils, PenTool, ExternalLink,
  Lock, LogOut, UserCheck, Image as ImageIcon, Eye, EyeOff, Maximize, Minimize, Save, Sparkles
} from 'lucide-react';
import { INITIAL_CONFIG, MENU_ITEMS, BLOG_POSTS } from './constants';
import { SiteConfig, MenuItem, BlogPost, SEOData } from './types';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/Menu';
import Reservations from './pages/Reservations';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Context
interface AppState {
  config: SiteConfig;
  menu: MenuItem[];
  posts: BlogPost[];
  seo: Record<string, SEOData>;
  isAuthenticated: boolean;
  userEmail: string | null;
  isDashboardOpen: boolean;
  showLoginModal: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  login: (email: string) => void;
  logout: () => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateMenu: (newMenu: MenuItem[]) => void;
  addItem: (item: MenuItem) => void;
  updateItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;
  updatePosts: (newPosts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  updateSEO: (path: string, data: SEOData) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-brandRed shadow-[0_0_10px_#cc0000] transition-all duration-100 ease-out origin-left"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};

const SEOManager = () => {
  const { seo, config } = useApp();
  const location = useLocation();
  useEffect(() => {
    const currentSEO = seo[location.pathname];
    if (currentSEO) {
      document.title = `${currentSEO.title} | ${config.name}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', currentSEO.description);
    } else {
      document.title = `${config.name} | ${config.tagline}`;
    }
  }, [location.pathname, seo, config]);
  return null;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { config } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Experience', path: '/services' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-charcoal text-ivory border-b transition-all duration-700 backdrop-blur-xl ${scrolled ? 'h-16 bg-opacity-90 border-brandRed/10' : 'h-24 bg-opacity-80 border-transparent'}`}>
      <div 
        className="mx-auto px-6 sm:px-10 h-full flex items-center justify-between"
        style={{ maxWidth: `${config.headerMaxWidth}px` }}
      >
        <Link to="/" className="flex items-center group overflow-visible">
          {config.showLogoHeader && config.logoUrl ? (
            <img 
              src={config.logoUrl} 
              alt={config.name} 
              style={{ height: scrolled ? `${config.logoHeight * 0.7}px` : `${config.logoHeight}px` }}
              className="w-auto transition-all duration-500 hover:scale-105 rounded-sm border hover:border-brandRed border-transparent"
            />
          ) : (
            <span className={`font-sonmari tracking-tighter logo-text-styled transition-all duration-700 ${scrolled ? 'text-3xl' : 'text-5xl'}`}>
              {config.name}
            </span>
          )}
        </Link>

        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-[11px] font-medium tracking-[0.25em] uppercase hover:text-brandRed transition-all ${location.pathname === link.path ? 'text-brandRed' : 'text-ivory'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/reservations" className="bg-gold text-charcoal px-8 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brandRed hover:text-white transition-all shadow-xl btn-hover-glow">
            Book
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-ivory hover:text-brandRed transition-all p-2">
            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-charcoal h-screen overflow-y-auto animate-in fade-in duration-500">
          <div className="flex justify-end p-8">
             <button onClick={() => setIsOpen(false)} className="text-brandRed"><X size={32} /></button>
          </div>
          <div className="px-10 py-10 space-y-8 flex flex-col items-center justify-center h-full">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-4xl font-serif italic text-ivory hover:text-brandRed transition-all">
                {link.name}
              </Link>
            ))}
            <Link to="/reservations" onClick={() => setIsOpen(false)} className="bg-brandRed text-white px-12 py-5 rounded-sm text-sm font-bold uppercase tracking-widest mt-10">
              Reserve a Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { config, isAuthenticated, setIsDashboardOpen, setShowLoginModal } = useApp();
  const handleStaffToggle = () => {
    if (isAuthenticated) setIsDashboardOpen(true);
    else setShowLoginModal(true);
  };

  return (
    <footer className="bg-charcoal text-ivory pt-32 pb-16 border-t border-brandRed/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
          <div className="md:col-span-5">
            {config.showLogoFooter && config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt={config.name} 
                style={{ height: `${config.logoHeightFooter}px` }}
                className="w-auto mb-10 transition-all duration-500 hover:scale-105 rounded-sm grayscale-[0.5] hover:grayscale-0"
              />
            ) : (
              <h3 className="text-5xl font-sonmari logo-text-styled mb-10">{config.name}</h3>
            )}
            <p className="text-stone text-lg leading-relaxed max-w-sm mb-12">
              {config.tagline}. <br/>
              A harmonious blend of <span className="text-brandRed">Korean soul</span> and modern craftsmanship.
            </p>
            <div className="flex space-x-8">
              <a href={config.instagram} className="text-stone hover:text-brandRed transition-all"><Instagram size={22} /></a>
              <a href={config.facebook} className="text-stone hover:text-brandRed transition-all"><Facebook size={22} /></a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brandRed/60">Navigation</h4>
            <ul className="space-y-4 text-stone text-sm">
              <li><Link to="/menu" className="hover:text-brandRed transition-all">The Menu</Link></li>
              <li><Link to="/about" className="hover:text-brandRed transition-all">Our Story</Link></li>
              <li><Link to="/reservations" className="hover:text-brandRed transition-all">Reservations</Link></li>
              <li><Link to="/blog" className="hover:text-brandRed transition-all">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brandRed/60">Location</h4>
            <div className="space-y-6 text-stone text-sm">
              <p className="flex items-start hover:text-brandRed transition-colors cursor-default"><MapPin size={18} className="mr-4 text-brandRed shrink-0" /> {config.address}</p>
              <p className="flex items-center hover:text-brandRed transition-colors cursor-default"><Phone size={18} className="mr-4 text-brandRed shrink-0" /> {config.phone}</p>
              <p className="flex items-center hover:text-brandRed transition-colors cursor-default"><Mail size={18} className="mr-4 text-brandRed shrink-0" /> {config.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brandRed/60">Newsletter</h4>
            <div className="border-b border-brandRed/30 flex items-center pb-2">
              <input type="email" placeholder="EMAIL" className="bg-transparent text-xs w-full outline-none placeholder:text-stone/30 tracking-widest focus:placeholder:text-brandRed" />
              <button className="text-brandRed"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-stone/50">
          <div className="flex items-center gap-10">
            <p>© {new Date().getFullYear()} {config.name}.</p>
            <button onClick={handleStaffToggle} className="hover:text-brandRed transition-all flex items-center gap-2">
              <Lock size={12} /> Staff Portal
            </button>
          </div>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-brandRed transition-all">Privacy</a>
            <a href="#" className="hover:text-brandRed transition-all">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ThemePanel = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'blog' | 'menu' | 'logo' | 'atmosphere'>('general');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const { 
    config, updateConfig, menu, addItem, updateItem, deleteItem, 
    posts, addPost, updatePost, deletePost, seo, updateSEO, 
    isAuthenticated, login, logout, userEmail, isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal 
  } = useApp();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'Admin' && passwordInput === 'SONMARI@2025') {
      login(usernameInput);
      setLoginError('');
      setShowLoginModal(false);
      setIsDashboardOpen(true);
    } else {
      setLoginError('Invalid Credentials');
    }
  };

  const currentSEO = seo[location.pathname] || { title: config.name, description: config.tagline, keywords: 'korean, restaurant, nyc' };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/95 backdrop-blur-2xl">
          <div className="max-w-md w-full bg-charcoal-light border border-brandRed/20 rounded-3xl p-12 shadow-2xl relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-8 right-8 text-stone hover:text-brandRed"><X size={24} /></button>
            <h2 className="text-3xl font-serif italic text-brandRed mb-10 text-center">Staff Access</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} placeholder="Username" className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-ivory outline-none focus:border-brandRed" />
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-ivory outline-none focus:border-brandRed" />
              {loginError && <p className="text-brandRed text-[10px] text-center uppercase tracking-widest">{loginError}</p>}
              <button type="submit" className="w-full bg-brandRed text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-brandRed transition-all">Sign In</button>
            </form>
          </div>
        </div>
      )}
      
      {isDashboardOpen && (
        <div className="fixed right-0 top-0 h-screen w-[400px] z-[100] bg-charcoal-light border-l border-brandRed/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
           <div className="p-8 border-b border-brandRed/10 flex justify-between items-center">
              <h3 className="text-xl font-serif text-brandRed italic">Brand Studio</h3>
              <button onClick={() => setIsDashboardOpen(false)} className="text-stone hover:text-brandRed"><X size={20} /></button>
           </div>
           
           <div className="flex border-b border-brandRed/10">
              {['general', 'menu', 'blog', 'seo'].map(t => (
                <button key={t} onClick={() => setActiveTab(t as any)} className={`flex-grow py-4 text-[10px] uppercase tracking-widest font-bold ${activeTab === t ? 'text-brandRed border-b-2 border-brandRed' : 'text-stone/40 hover:text-stone'}`}>
                  {t}
                </button>
              ))}
           </div>

           <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div><label className="text-[10px] text-brandRed/50 uppercase tracking-widest mb-2 block">Site Name</label><input value={config.name} onChange={e => updateConfig({ name: e.target.value })} className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-brandRed" /></div>
                  <div><label className="text-[10px] text-brandRed/50 uppercase tracking-widest mb-2 block">Tagline</label><input value={config.tagline} onChange={e => updateConfig({ tagline: e.target.value })} className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-brandRed" /></div>
                  <div><label className="text-[10px] text-brandRed/50 uppercase tracking-widest mb-2 block">Address</label><input value={config.address} onChange={e => updateConfig({ address: e.target.value })} className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-brandRed" /></div>
                  <div><label className="text-[10px] text-brandRed/50 uppercase tracking-widest mb-2 block">Logo URL</label><input value={config.logoUrl} onChange={e => updateConfig({ logoUrl: e.target.value })} className="w-full bg-charcoal border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-brandRed" /></div>
                </div>
              )}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <button onClick={() => addItem({ id: Date.now().toString(), name: 'New Dish', description: 'Description', price: '$0', category: 'Mains', image: '' })} className="w-full border border-brandRed/30 text-brandRed py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-brandRed hover:text-white transition-all">+ Add Dish</button>
                  {menu.map(item => (
                    <div key={item.id} className="p-4 bg-charcoal rounded-xl border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <input value={item.name} onChange={e => updateItem(item.id, { name: e.target.value })} className="bg-transparent border-none p-0 text-gold focus:text-brandRed font-serif text-sm outline-none" />
                        <button onClick={() => deleteItem(item.id)} className="text-brandRed opacity-50 hover:opacity-100"><Trash2 size={14} /></button>
                      </div>
                      <input value={item.price} onChange={e => updateItem(item.id, { price: e.target.value })} className="w-full bg-charcoal-light p-2 rounded text-[10px] border border-white/5 outline-none focus:border-brandRed" />
                    </div>
                  ))}
                </div>
              )}
           </div>

           <div className="p-8 border-t border-brandRed/10 flex justify-between">
              <button onClick={logout} className="text-[10px] uppercase tracking-widest font-bold text-stone/50 hover:text-brandRed flex items-center gap-2"><LogOut size={14} /> Logout</button>
              <button onClick={() => { setIsDashboardOpen(false); }} className="bg-brandRed text-white px-6 py-2 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-brandRed transition-all">Done</button>
           </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const loadInitial = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [config, setConfig] = useState<SiteConfig>(() => loadInitial('sonmari_config', INITIAL_CONFIG));
  const [menu, setMenu] = useState<MenuItem[]>(() => loadInitial('sonmari_menu', MENU_ITEMS));
  const [posts, setPosts] = useState<BlogPost[]>(() => loadInitial('sonmari_posts', BLOG_POSTS));
  const [seo, setSeo] = useState<Record<string, SEOData>>(() => loadInitial('sonmari_seo', {}));
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('sonmari_auth') === 'true');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('sonmari_user'));
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => localStorage.setItem('sonmari_config', JSON.stringify(config)), [config]);
  useEffect(() => localStorage.setItem('sonmari_menu', JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem('sonmari_posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('sonmari_seo', JSON.stringify(seo)), [seo]);
  useEffect(() => {
    localStorage.setItem('sonmari_auth', isAuthenticated.toString());
    if (userEmail) localStorage.setItem('sonmari_user', userEmail);
    else localStorage.removeItem('sonmari_user');
  }, [isAuthenticated, userEmail]);

  const login = (email: string) => { setIsAuthenticated(true); setUserEmail(email); };
  const logout = () => { setIsAuthenticated(false); setUserEmail(null); setIsDashboardOpen(false); };
  const updateConfig = (newConfig: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));
  const updateMenu = (newMenu: MenuItem[]) => setMenu(newMenu);
  const addItem = (item: MenuItem) => setMenu(prev => [item, ...prev]);
  const updateItem = (id: string, updates: Partial<MenuItem>) => setMenu(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  const deleteItem = (id: string) => setMenu(prev => prev.filter(i => i.id !== id));
  const updatePosts = (newPosts: BlogPost[]) => setPosts(newPosts);
  const addPost = (post: BlogPost) => setPosts(prev => [post, ...prev]);
  const updatePost = (id: string, updates: Partial<BlogPost>) => setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));
  const updateSEO = (path: string, data: SEOData) => setSeo(prev => ({ ...prev, [path]: data }));

  return (
    <AppContext.Provider value={{ 
      config, menu, posts, seo, isAuthenticated, userEmail, login, logout, isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal, updateConfig, updateMenu, addItem, updateItem, deleteItem, updatePosts, addPost, updatePost, deletePost, updateSEO 
    }}>
      <HashRouter>
        <ScrollToTop />
        <SEOManager />
        <ScrollProgressBar />
        <div className="min-h-screen flex flex-col bg-charcoal text-ivory selection:bg-brandRed selection:text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ThemePanel />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
