import { MenuItem, BlogPost, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  name: "Sonmari",
  tagline: "A Modern Korean-Inspired Dining Experience",
  primaryColor: "#0F0F0F", // Charcoal Black
  secondaryColor: "#C9A24D", // Accent Gold
  accentColor: "#F6F4F1", // Soft Ivory
  address: "123 Elegance Way, New York, NY 10013",
  phone: "(212) 555-0199",
  email: "concierge@sonmari.com",
  instagram: "https://www.instagram.com/sonmari.nyc",
  facebook: "https://facebook.com/sonmarirestaurant",
  heroImages: [
    "https://image2url.com/r2/default/images/1769085561523-6465d884-01fc-4731-a654-5b75c4616671.jpg",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=1600",
    "https://image2url.com/r2/default/images/1769086587929-e341648d-1293-4b31-bc58-b02a085be5af.jpg"
  ],
  aboutText: "Sonmari was created as a modern expression of Korean culinary inspiration, blending traditional flavors with contemporary techniques. Rooted in respect for ingredients and driven by creativity, our kitchen reimagines comfort and sophistication on every plate.",
  aboutImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  operatingHours: [
    "Tue - Thu: 5:30 PM - 10:30 PM",
    "Fri - Sat: 5:00 PM - 11:30 PM",
    "Sun: 5:00 PM - 10:00 PM",
    "Mon: Closed"
  ],
  logoUrl: "https://image2url.com/r2/default/images/1769080514412-267eae59-97af-4a55-9521-d2b993c273a0.jpg",
  logoHeight: 80,
  logoHeightFooter: 70,
  logoPadding: 10,
  showLogoHeader: true,
  showLogoFooter: true,
  headerMaxWidth: 1400,
  manualMood: ""
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Uni Toast',
    description: 'Hokkaido uni, toasted brioche, whipped cultured butter with a hint of seaweed.',
    price: '$32',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1616031036658-29a3e680a6c0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Crispy Rice Bites',
    description: 'Spicy tuna tartare, serrano pepper, honey-soy glaze, toasted sesame.',
    price: '$18',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Hamachi Crudo',
    description: 'Yuzu kosho vinaigrette, extra virgin olive oil, micro cilantro, sea salt.',
    price: '$24',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Seared Salmon Hand Roll',
    description: 'Premium seared salmon, house soy glaze, cucumber, sushi rice, toasted nori.',
    price: '$14',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    name: 'Bluefin Tuna Hand Roll',
    description: 'Aged bluefin tuna, freshly grated wasabi, chives, premium nori.',
    price: '$16',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    name: 'Short Rib Plate',
    description: '48-hour braised short rib, Korean-style marinade, seasonal root vegetables.',
    price: '$45',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '7',
    name: 'Miso Black Cod',
    description: 'Wild-caught cod, sweet miso glaze, pickled lotus root, sesame oil infusion.',
    price: '$42',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '8',
    name: 'Black Sesame Cheesecake',
    description: 'Velvety black sesame filling, graham cracker crust, matcha coulis.',
    price: '$16',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Balance of Tradition & Innovation',
    excerpt: 'Exploring how we blend ancient Korean fermentation techniques with modern NYC culinary trends.',
    content: 'Full story about our culinary approach...',
    author: 'Chef David Kim',
    date: 'Jan 15, 2025',
    category: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Seasonal Spotlight: Hokkaido Uni',
    excerpt: 'A deep dive into the sourcing of our world-class sea urchin and why it defines our starters.',
    content: 'Details on uni sourcing...',
    author: 'Sonmari Culinary Team',
    date: 'Feb 02, 2025',
    category: 'Sourcing',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
  }
];