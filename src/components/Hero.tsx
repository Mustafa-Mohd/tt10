import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Globe } from 'lucide-react';
import heroVideo from '@/assets/Cinematic_Travel_Video_Generation_Complete.mp4';

const Hero = (props) => {
  const trustBadges = [
    { icon: Star, text: '4.9/5 Rating', count: '2,000+ Reviews' },
    { icon: Users, text: '50,000+ Users', count: 'Worldwide' },
    { icon: Globe, text: '150+ Countries', count: 'Covered' },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden">

        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 py-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-black/90 mb-6">
              Welcome to
            </h1>
            <span className="text-5xl md:text-7xl font-bold text-black mb-6 block hero-gradient bg-clip-text text-transparent mt-2">
              <span style={{ color: '#0F0F0F', fontWeight: 'bold' }}>TRAVEL </span>
              <span style={{ color: '#EF4B4B', fontWeight: 'bold' }}>TOP10 </span>
            </span>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-black/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the Top 10 Travel Experts Worldwide
            </p>

            <p className="text-lg text-black/80 mb-12 max-w-xl mx-auto">
              Connect with certified travel agencies, luxury hotels, destination management companies, and travel influencers from around the globe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col border-black/30 sm:flex-row gap-4 justify-center mb-16">
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() => {
                  const searchSection = document.querySelector('#search-section');
                  searchSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Listings
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="glass"
                size="xl"
                className="text-black border-black/30 hover:border-black/50"
              >
                Get Certified
              </Button>
            </div>

            {/* Trust Badges - All in red style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;

                return (
                  <div
                    key={index}
                    className="group bg-[#EF4B4B]/10 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 overflow-hidden relative"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                    <div className="p-6 text-center space-y-2 relative z-10">
                      <IconComponent className="h-8 w-8 mx-auto mb-1 text-[#EF4B4B]" />
                      <h3 className="font-semibold text-lg text-[#EF4B4B]">
                        {badge.text}
                      </h3>
                      <p className="text-sm text-[#0F0F0F]">
                        {badge.count}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-primary/20 rounded-full blur-sm animate-pulse animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/20 rounded-full blur-sm animate-pulse animation-delay-700"></div>
      </div>
    </section>
  );
};

export default Hero;