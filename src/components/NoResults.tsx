import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import agencyImage from '@/assets/travel-agency.jpg';

const NoResults = () => {
  const similarLocations = [
    'New York, USA',
    'Paris, France', 
    'Tokyo, Japan',
    'London, UK'
  ];

  const placeholderListings = [
    {
      title: 'Nearby Travel Agency',
      location: 'Alternative City',
      image: agencyImage,
      type: 'Similar to your search'
    },
    {
      title: 'Recommended Hotel',
      location: 'Popular Destination',
      image: agencyImage,
      type: 'Highly rated'
    },
    {
      title: 'Top DMC Partner',
      location: 'Regional Hub',
      image: agencyImage,
      type: 'Trusted provider'
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Message */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-4">
              We couldn't find anything in your city
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't worry! We have amazing travel partners worldwide. 
              Try searching in nearby locations or explore our most popular destinations.
            </p>
          </div>

          {/* Similar Locations */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Try searching in these popular locations:
            </h3>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {similarLocations.map((location, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="group hover:bg-primary hover:text-primary-foreground transition-travel"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {location}
                </Button>
              ))}
            </div>
          </div>

          {/* Placeholder Cards */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Or explore these recommended options:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {placeholderListings.map((listing, index) => (
                <div key={index} className="card-gradient rounded-xl shadow-travel border border-border p-6 hover-lift">
                  <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20"></div>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-2">{listing.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{listing.location}</p>
                  <p className="text-xs text-primary font-medium">{listing.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button variant="hero" size="lg" className="group">
              Explore All Destinations
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Or <Button variant="link" className="text-primary p-0 h-auto">contact our support team</Button> for personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoResults;