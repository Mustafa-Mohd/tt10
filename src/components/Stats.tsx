import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Hotel, Building2, Star, Users, Award, TrendingUp } from 'lucide-react';

const Stats = () => {
  const [counts, setCounts] = useState({
    hotels: 0,
    // agencies: 0,
    reviews: 0,
    users: 0
  });

  const finalCounts = {
    hotels: 2500,
    // agencies: 1800,
    reviews: 125000,
    users: 50000
  };

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      setCounts(prev => ({
        hotels: Math.min(prev.hotels + Math.ceil(finalCounts.hotels / steps), finalCounts.hotels),
        // agencies: Math.min(prev.agencies + Math.ceil(finalCounts.agencies / steps), finalCounts.agencies),
        reviews: Math.min(prev.reviews + Math.ceil(finalCounts.reviews / steps), finalCounts.reviews),
        users: Math.min(prev.users + Math.ceil(finalCounts.users / steps), finalCounts.users)
      }));
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Hotel,
      count: counts.hotels.toLocaleString(),
      label: 'Certified Hotels',
      description: 'Luxury accommodations worldwide',
      color: 'text-accent'
    },
    // {
    //   icon: Building2,
    //   count: counts.agencies.toLocaleString(),
    //   label: 'Registered Agencies',
    //   description: 'Trusted travel partners',
    //   color: 'text-primary'
    // },
    {
      icon: Star,
      count: counts.reviews.toLocaleString(),
      label: 'Reviews Collected',
      description: 'Authentic traveler feedback',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      count: counts.users.toLocaleString(),
      label: 'Happy Travelers',
      description: 'Global community members',
      color: 'text-success'
    }
  ];

  const partners = [
    'TripAdvisor', 'Booking.com', 'Expedia', 'Airbnb', 'IATA', 'UNWTO'
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold mb-6">
            <TrendingUp className="h-4 w-4" />
            Our Legacy in Numbers
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Travelers Worldwide
          </h2>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of certified travel professionals and millions of satisfied travelers 
            in our global network.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="glass rounded-2xl p-8 hover-lift transition-travel">
                  <IconComponent className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.count}+
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-white/80">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Want to Get Certified?
          </h3>
          
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Join our exclusive network of verified travel professionals and grow your business 
            with enhanced credibility and global reach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="lg" className="text-white border-white/30 hover:bg-white/20">
              <Award className="h-5 w-5 mr-2" />
              Get Certified Now
            </Button>
            <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
              Learn More
            </Button>
          </div>
        </div>

        {/* Partners */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-white/90 mb-6">
            Trusted by Industry Leaders
          </h4>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="glass px-6 py-3 rounded-lg text-white font-semibold text-sm hover:bg-white/20 transition-travel"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;