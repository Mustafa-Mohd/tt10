import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter, Map, Star, Award } from 'lucide-react';

const SearchFilter = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const tabs = [
    // { id: 'agencies', name: 'Travel Agencies', icon: MapPin },
    { id: 'hotels', name: 'Hotels', icon: Star },
    { id: 'dmcs', name: 'DMCs', icon: Award },
    { id: 'influencers', name: 'Influencers', icon: Search },
  ];

  const countries = [
    'United States', 'France', 'Italy', 'Spain', 'Japan', 'Thailand', 
    'Australia', 'Germany', 'United Kingdom', 'Brazil'
  ];

  const cities = {
    'United States': ['New York', 'Los Angeles', 'Miami', 'Las Vegas'],
    'France': ['Paris', 'Nice', 'Lyon', 'Marseille'],
    'Italy': ['Rome', 'Venice', 'Florence', 'Milan'],
    'Spain': ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
    'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    'Thailand': ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
    'United Kingdom': ['London', 'Edinburgh', 'Manchester', 'Liverpool'],
    'Brazil': ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'],
  };

  return (
    <section id="search-section" className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Top Rated Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full shadow-travel font-semibold">
            <Award className="h-4 w-4" />
            Top Rated This Week
          </div>
        </div>

        {/* Search Card */}
        <div className="max-w-6xl mx-auto card-gradient rounded-2xl shadow-travel-lg p-8 border border-border">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-secondary rounded-xl">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-travel font-semibold ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-travel'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Country Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                disabled={!selectedCountry}
              >
                <option value="">Select City</option>
                {selectedCountry && cities[selectedCountry as keyof typeof cities]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Filter by</label>
              <select className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel">
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" className="group">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
            
            <Button variant="ghost" className="text-primary">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;