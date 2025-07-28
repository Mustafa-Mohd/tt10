import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Award, ExternalLink, Play } from 'lucide-react';

interface ListingCardProps {
  title: string;
  category: string;
  location: string;
  country: string;
  rating: number;
  rank?: number;
  image: string;
  isCertified?: boolean;
  hasVideo?: boolean;
  type: 'agency' | 'hotel' | 'dmc' | 'influencer';
}

const ListingCard: React.FC<ListingCardProps> = ({
  title,
  category,
  location,
  country,
  rating,
  rank,
  image,
  isCertified = false,
  hasVideo = false,
  type
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'agency': return 'text-primary';
      case 'hotel': return 'text-accent';
      case 'dmc': return 'text-success';
      case 'influencer': return 'text-purple-600';
      default: return 'text-primary';
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case 'agency': return 'ocean-gradient';
      case 'hotel': return 'sunset-gradient';
      case 'dmc': return 'bg-success';
      case 'influencer': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default: return 'ocean-gradient';
    }
  };

  return (
    <div className="card-gradient rounded-xl shadow-travel border border-border hover-lift overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-travel group-hover:scale-105"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Rank Badge */}
        {rank && (
          <div className={`absolute top-3 left-3 ${getTypeGradient(type)} text-white px-3 py-1 rounded-full font-bold text-sm`}>
            #{rank}
          </div>
        )}
        
        {/* Certified Badge */}
        {isCertified && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Award className="h-3 w-3" />
            Certified
          </div>
        )}
        
        {/* Video Indicator */}
        {hasVideo && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white p-2 rounded-full">
            <Play className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">{title}</h3>
          <p className={`text-sm font-semibold ${getTypeColor(type)} mb-2`}>{category}</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}, {country}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">(324 reviews)</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant={type === 'hotel' ? 'sunset' : type === 'dmc' ? 'success' : 'ocean'} 
            size="sm"
            className="flex-1"
          >
            Claim Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;