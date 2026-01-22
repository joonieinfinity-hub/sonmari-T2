
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks' | 'Sides';
  image: string;
  tags?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  heroImages: string[];
  aboutText: string;
  aboutImage: string;
  operatingHours: string[];
  // Logo Configuration
  logoUrl: string;
  logoHeight: number;
  logoHeightFooter: number;
  logoPadding: number;
  showLogoHeader: boolean;
  showLogoFooter: boolean;
  // Header Configuration
  headerMaxWidth: number;
  // Mood Configuration
  manualMood?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}
