import React from 'react';
import { Button } from '@/components/ui/button';
import ListingCard from './ListingCard';
import { ArrowRight, Building2, Hotel, Users, Video } from 'lucide-react';
import agencyImage from '@/assets/travel-agency.jpg';
import hotelImage from '@/assets/luxury-hotel.jpg';
import dmcImage from '@/assets/dmc-guide.jpg';
import influencerImage from '@/assets/travel-influencer.jpg';

const ListingSections = () => {
  const sections = [
    // {
    //   id: 'agencies',
    //   title: 'Top Travel Agencies by City',
    //   description: 'Discover certified travel agencies that create unforgettable journeys worldwide',
    //   icon: Building2,
    //   gradient: 'ocean-gradient',
    //   data: [
    //     {
    //       title: 'Wanderlust Adventures',
    //       category: 'Full-Service Travel Agency',
    //       location: 'New York',
    //       country: 'United States',
    //       rating: 4.9,
    //       rank: 1,
    //       image: agencyImage,
    //       isCertified: true,
    //       type: 'agency' as const
    //     },
    //     {
    //       title: 'Global Escapes Travel',
    //       category: 'Luxury Travel Specialists',
    //       location: 'Paris',
    //       country: 'France',
    //       rating: 4.8,
    //       rank: 2,
    //       image: agencyImage,
    //       isCertified: true,
    //       type: 'agency' as const
    //     },
    //     {
    //       title: 'Adventure Seekers Co.',
    //       category: 'Adventure Travel',
    //       location: 'Sydney',
    //       country: 'Australia',
    //       rating: 4.7,
    //       rank: 3,
    //       image: agencyImage,
    //       isCertified: false,
    //       type: 'agency' as const
    //     }
    //   ]
    // },
    {
      id: 'hotels',
      title: 'Hotels by Global Ranking',
      description: 'Luxurious accommodations ranked by guest satisfaction and premium services',
      icon: Hotel,
      gradient: 'sunset-gradient',
      data: [
        {
          title: 'The Oceanview Resort',
          category: '5-Star Luxury Resort',
          location: 'Maldives',
          country: 'Maldives',
          rating: 4.9,
          rank: 1,
          image: hotelImage,
          isCertified: true,
          type: 'hotel' as const
        },
        {
          title: 'Mountain Peak Lodge',
          category: 'Boutique Mountain Hotel',
          location: 'Aspen',
          country: 'United States',
          rating: 4.8,
          rank: 2,
          image: hotelImage,
          isCertified: true,
          type: 'hotel' as const
        },
        {
          title: 'Urban Luxury Suites',
          category: 'Business Hotel',
          location: 'Tokyo',
          country: 'Japan',
          rating: 4.7,
          rank: 3,
          image: hotelImage,
          isCertified: true,
          type: 'hotel' as const
        }
      ]
    },
    {
      id: 'dmcs',
      title: 'Destination Management Companies by Country',
      description: 'Expert local partners providing authentic cultural experiences and seamless logistics',
      icon: Users,
      gradient: 'bg-success',
      data: [
        {
          title: 'Himalayan Expeditions',
          category: 'Adventure & Culture DMC',
          location: 'Kathmandu',
          country: 'Nepal',
          rating: 4.9,
          rank: 1,
          image: dmcImage,
          isCertified: true,
          type: 'dmc' as const
        },
        {
          title: 'Tuscan Heritage Tours',
          category: 'Cultural Heritage DMC',
          location: 'Florence',
          country: 'Italy',
          rating: 4.8,
          rank: 2,
          image: dmcImage,
          isCertified: true,
          type: 'dmc' as const
        },
        {
          title: 'Safari Dreams Africa',
          category: 'Wildlife Safari DMC',
          location: 'Nairobi',
          country: 'Kenya',
          rating: 4.7,
          rank: 3,
          image: dmcImage,
          isCertified: false,
          type: 'dmc' as const
        }
      ]
    },
    {
      id: 'influencers',
      title: 'Travel Influencers & Content Creators',
      description: 'Top travel bloggers, YouTubers, and social media personalities sharing authentic experiences',
      icon: Video,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      data: [
        {
          title: 'Sarah\'s World Adventures',
          category: 'Travel Blogger & YouTuber',
          location: 'Los Angeles',
          country: 'United States',
          rating: 4.9,
          image: influencerImage,
          isCertified: true,
          hasVideo: true,
          type: 'influencer' as const
        },
        {
          title: 'Nomadic Lens',
          category: 'Photography & Travel',
          location: 'London',
          country: 'United Kingdom',
          rating: 4.8,
          image: influencerImage,
          isCertified: true,
          hasVideo: true,
          type: 'influencer' as const
        },
        {
          title: 'Backpack Diaries',
          category: 'Budget Travel Expert',
          location: 'Berlin',
          country: 'Germany',
          rating: 4.7,
          image: influencerImage,
          isCertified: false,
          hasVideo: true,
          type: 'influencer' as const
        }
      ]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {sections.map((section, sectionIndex) => {
          const IconComponent = section.icon;
          return (
            <section id={section.id} key={section.id} className={`mb-20 ${sectionIndex === sections.length - 1 ? 'mb-0' : ''}`}>
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center gap-3 ${section.gradient} text-white px-6 py-3 rounded-full shadow-travel-md mb-6`}>
                  <IconComponent className="h-6 w-6" />
                  <span className="font-bold">{section.title}</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {section.description}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {section.data.map((item, index) => (
                  <ListingCard key={index} {...item} />
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center">
                <Button variant="outline" size="lg" className="group">
                  View All {section.title.split(' ')[1]}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ListingSections;