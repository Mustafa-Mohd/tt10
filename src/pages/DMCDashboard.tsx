import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Star, Users, TrendingUp, Calendar } from "lucide-react";
import { Navigate } from "react-router-dom";

interface DMCStats {
  totalListings: number;
  averageRating: number;
  totalBookings: number;
  activeListings: number;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  rating: number;
  type: string;
  image_url: string;
  created_at: string;
}

interface Certificate {
  id: string;
  status: string;
  created_at: string;
  issued_on: string;
  listing_id: string;
}

export default function DMCDashboard() {
  const { user, userRole, loading } = useAuth();
  const [stats, setStats] = useState<DMCStats>({
    totalListings: 0,
    averageRating: 0,
    totalBookings: 0,
    activeListings: 0,
  });
  const [listings, setListings] = useState<Listing[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user && userRole === 'dmc') {
      fetchDMCData();
    }
  }, [user, userRole]);

  const fetchDMCData = async () => {
    try {
      // Fetch DMC listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('created_by', user?.id)
        .eq('type', 'DMC')
        .order('created_at', { ascending: false });

      if (listingsError) throw listingsError;

      // Fetch certificates for DMC listings
      const { data: certificatesData, error: certificatesError } = await supabase
        .from('certificates')
        .select('*')
        .eq('requested_by', user?.id)
        .order('created_at', { ascending: false });

      if (certificatesError) throw certificatesError;

      setListings(listingsData || []);
      setCertificates(certificatesData || []);

      // Calculate stats
      const totalListings = listingsData?.length || 0;
      const averageRating = totalListings > 0 
        ? listingsData.reduce((sum, listing) => sum + (listing.rating || 0), 0) / totalListings 
        : 0;
      const activeListings = listingsData?.filter(listing => listing.rating > 0).length || 0;

      setStats({
        totalListings,
        averageRating: Math.round(averageRating * 10) / 10,
        totalBookings: Math.floor(Math.random() * 100) + 50, // Mock data for now
        activeListings,
      });
    } catch (error) {
      console.error('Error fetching DMC data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const requestCertificate = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .insert({
          listing_id: listingId,
          requested_by: user?.id,
          status: 'pending'
        });

      if (error) throw error;
      
      fetchDMCData(); // Refresh data
    } catch (error) {
      console.error('Error requesting certificate:', error);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || userRole !== 'dmc') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">DMC Dashboard</h1>
        <Badge variant="secondary" className="text-sm">
          <Building className="w-4 h-4 mr-1" />
          Destination Management Company
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground">DMC services offered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Client satisfaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground">Currently promoted</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-4">
          <div className="grid gap-4">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={listing.image_url || "/placeholder.svg"} 
                      alt={listing.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{listing.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{listing.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{listing.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {listing.city}, {listing.country}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(listing.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-4">
            {certificates.map((certificate) => {
              const listing = listings.find(l => l.id === certificate.listing_id);
              return (
                <Card key={certificate.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{listing?.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Requested: {new Date(certificate.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant={certificate.status === 'approved' ? 'default' : 
                                certificate.status === 'denied' ? 'destructive' : 'secondary'}
                      >
                        {certificate.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your DMC service performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Client Satisfaction Rate</span>
                  <span className="font-semibold">{Math.round(stats.averageRating * 20)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Conversion Rate</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="font-semibold">&lt; 2 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}