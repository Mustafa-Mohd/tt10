export interface Listing {
  id: string;
  title: string;
  category: string;
  location: string;
  country: string;
  rating: number;
  rank?: number;
  image: string;
  isCertified: boolean;
  hasVideo: boolean;
  type: 'agency' | 'hotel' | 'dmc' | 'influencer';
  description: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  services: string[];
  reviews: number;
}

export const mockListings: Listing[] = [
  // Travel Agencies
  {
    id: '1',
    title: 'Elite Travel Solutions',
    category: 'Luxury Travel Agency',
    location: 'New York',
    country: 'United States',
    rating: 4.9,
    rank: 1,
    image: '/src/assets/travel-agency.jpg',
    isCertified: true,
    hasVideo: true,
    type: 'agency',
    description: 'Premier luxury travel agency specializing in bespoke experiences worldwide.',
    contact: {
      email: 'info@elitetravel.com',
      phone: '+1-555-0123',
      website: 'www.elitetravel.com'
    },
    services: ['Luxury Tours', 'Corporate Travel', 'Event Planning'],
    reviews: 324
  },
  {
    id: '2',
    title: 'Adventure Seekers Co.',
    category: 'Adventure Travel Agency',
    location: 'Denver',
    country: 'United States',
    rating: 4.7,
    rank: 2,
    image: '/src/assets/travel-agency.jpg',
    isCertified: true,
    hasVideo: false,
    type: 'agency',
    description: 'Specialized in adventure and extreme sports travel experiences.',
    contact: {
      email: 'hello@adventureseekers.com',
      phone: '+1-555-0124',
      website: 'www.adventureseekers.com'
    },
    services: ['Adventure Tours', 'Group Travel', 'Equipment Rental'],
    reviews: 256
  },
  // Hotels
  {
    id: '3',
    title: 'Grand Palace Resort',
    category: '5-Star Luxury Resort',
    location: 'Maldives',
    country: 'Maldives',
    rating: 4.8,
    rank: 1,
    image: '/src/assets/luxury-hotel.jpg',
    isCertified: true,
    hasVideo: true,
    type: 'hotel',
    description: 'Overwater villas with stunning ocean views and world-class amenities.',
    contact: {
      email: 'reservations@grandpalace.mv',
      phone: '+960-555-0125',
      website: 'www.grandpalaceresort.com'
    },
    services: ['Spa Services', 'Water Sports', 'Fine Dining'],
    reviews: 892
  },
  {
    id: '4',
    title: 'Mountain View Lodge',
    category: 'Boutique Mountain Resort',
    location: 'Aspen',
    country: 'United States',
    rating: 4.6,
    rank: 2,
    image: '/src/assets/luxury-hotel.jpg',
    isCertified: true,
    hasVideo: false,
    type: 'hotel',
    description: 'Cozy mountain retreat with breathtaking alpine views.',
    contact: {
      email: 'info@mountainviewlodge.com',
      phone: '+1-555-0126',
      website: 'www.mountainviewlodge.com'
    },
    services: ['Skiing', 'Hiking', 'Wellness Center'],
    reviews: 445
  },
  // DMCs
  {
    id: '5',
    title: 'Mediterranean Experiences',
    category: 'Destination Management Company',
    location: 'Barcelona',
    country: 'Spain',
    rating: 4.9,
    rank: 1,
    image: '/src/assets/dmc-guide.jpg',
    isCertified: true,
    hasVideo: true,
    type: 'dmc',
    description: 'Expert local knowledge for unforgettable Mediterranean experiences.',
    contact: {
      email: 'contact@medexperiences.es',
      phone: '+34-555-0127',
      website: 'www.mediterraneanexperiences.com'
    },
    services: ['Local Tours', 'Event Management', 'Cultural Experiences'],
    reviews: 567
  },
  {
    id: '6',
    title: 'Asian Adventures DMC',
    category: 'Destination Management Company',
    location: 'Bangkok',
    country: 'Thailand',
    rating: 4.7,
    rank: 2,
    image: '/src/assets/dmc-guide.jpg',
    isCertified: true,
    hasVideo: false,
    type: 'dmc',
    description: 'Authentic Asian travel experiences with local expertise.',
    contact: {
      email: 'info@asianadventures.th',
      phone: '+66-555-0128',
      website: 'www.asianadventures.com'
    },
    services: ['Cultural Tours', 'Food Experiences', 'Adventure Activities'],
    reviews: 389
  },
  // Influencers
  {
    id: '7',
    title: 'Sarah\'s Travel Diaries',
    category: 'Travel Blogger & YouTuber',
    location: 'Los Angeles',
    country: 'United States',
    rating: 4.8,
    rank: 1,
    image: '/src/assets/travel-influencer.jpg',
    isCertified: true,
    hasVideo: true,
    type: 'influencer',
    description: 'Solo female travel expert with 500K+ followers sharing authentic experiences.',
    contact: {
      email: 'hello@sarahstraveldiaries.com',
      phone: '+1-555-0129',
      website: 'www.sarahstraveldiaries.com'
    },
    services: ['Content Creation', 'Brand Partnerships', 'Travel Consulting'],
    reviews: 1250
  },
  {
    id: '8',
    title: 'Adventure Bros',
    category: 'Adventure Travel Influencers',
    location: 'Vancouver',
    country: 'Canada',
    rating: 4.6,
    rank: 2,
    image: '/src/assets/travel-influencer.jpg',
    isCertified: false,
    hasVideo: true,
    type: 'influencer',
    description: 'Extreme sports and adventure travel content creators.',
    contact: {
      email: 'contact@adventurebros.ca',
      phone: '+1-555-0130',
      website: 'www.adventurebros.com'
    },
    services: ['Video Production', 'Photography', 'Adventure Consulting'],
    reviews: 678
  }
];

export const getListingsByType = (type: string) => {
  return mockListings.filter(listing => listing.type === type);
};

export const getListingById = (id: string) => {
  return mockListings.find(listing => listing.id === id);
};

export const searchListings = (query: string, type?: string, country?: string) => {
  let filtered = mockListings;
  
  if (type && type !== 'all') {
    filtered = filtered.filter(listing => listing.type === type);
  }
  
  if (country) {
    filtered = filtered.filter(listing => listing.country.toLowerCase().includes(country.toLowerCase()));
  }
  
  if (query) {
    filtered = filtered.filter(listing => 
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.category.toLowerCase().includes(query.toLowerCase()) ||
      listing.location.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  return filtered;
};