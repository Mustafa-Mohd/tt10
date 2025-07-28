import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, MapPin, Award, ExternalLink, Mail, Phone, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

const ListingDetail = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
      setListing(data || null);
      setLoading(false);
    };
    if (id) fetchListing();
  }, [id]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!user || (userRole !== 'user' && userRole !== 'dmc')) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Listing Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.rank && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold">
                #{listing.rank}
              </div>
            )}
            {listing.isCertified && (
              <div className="absolute top-4 right-4 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certified
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{listing.title}</h1>
              <p className="text-xl text-primary font-semibold mb-2">{listing.category}</p>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{listing.location}, {listing.country}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(listing.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{listing.rating}</span>
                <span className="text-muted-foreground">({listing.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">{listing.description}</p>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {listing.services.map((service, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <Card className="card-gradient border border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{listing.contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{listing.contact?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{listing.contact?.website}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Link to="/claim" className="flex-1">
                <Button className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  Claim Certificate
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;