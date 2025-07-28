import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Users,
  Building2,
  MapPin,
  Award,
  MessageSquare,
  Mail,
  TrendingUp,
  Calendar,
  Star,
  Activity,
  BarChart3
} from 'lucide-react';

interface Stats {
  totalListings: number;
  totalUsers: number;
  pendingCertificates: number;
  totalCmsContent: number;
  totalContactMessages: number;
  unreadMessages: number;
  recentActivity: number;
  approvedCertificates: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  created_at: string;
  status?: string;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    totalUsers: 0,
    pendingCertificates: 0,
    totalCmsContent: 0,
    totalContactMessages: 0,
    unreadMessages: 0,
    recentActivity: 0,
    approvedCertificates: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeCounts, setTypeCounts] = useState({
    hotel: 0,
    agency: 0,
    dmc: 0,
    influencer: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [
        listingsResult,
        profilesResult,
        certificatesResult,
        cmsResult,
        contactResult
      ] = await Promise.all([
        supabase.from('listings').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('certificates').select('*, listings(title)'),
        supabase.from('cms_content').select('*'),
        supabase.from('contact_messages').select('*')
      ]);

      const listings = listingsResult.data || [];
      const profiles = profilesResult.data || [];
      const certificates = certificatesResult.data || [];
      const cms = cmsResult.data || [];
      const contacts = contactResult.data || [];

      // Count listing types
      const typeCounts = {
        hotel: listings.filter(l => l.type?.toLowerCase() === 'hotel').length,
        agency: listings.filter(l => l.type?.toLowerCase() === 'agency').length,
        dmc: listings.filter(l => l.type?.toLowerCase() === 'dmc').length,
        influencer: listings.filter(l => l.type?.toLowerCase() === 'influencer').length,
      };
      setTypeCounts(typeCounts);

      // Calculate stats
      setStats({
        totalListings: listings.length,
        totalUsers: profiles.length,
        pendingCertificates: certificates.filter(c => c.status === 'pending').length,
        totalCmsContent: cms.length,
        totalContactMessages: contacts.length,
        unreadMessages: contacts.filter(m => m.status === 'unread').length,
        recentActivity: listings.filter(l => 
          new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        approvedCertificates: certificates.filter(c => c.status === 'approved').length,
      });

      // Prepare recent activities
      const activities: RecentActivity[] = [
        ...listings.slice(0, 3).map(l => ({
          id: l.id,
          type: 'listing',
          title: `New ${l.type} listing`,
          description: `${l.title} in ${l.city}, ${l.country}`,
          created_at: l.created_at
        })),
        ...certificates.slice(0, 3).map(c => ({
          id: c.id,
          type: 'certificate',
          title: 'Certificate request',
          description: `Request for ${c.listings?.title}`,
          created_at: c.created_at,
          status: c.status
        })),
        ...contacts.slice(0, 3).map(c => ({
          id: c.id,
          type: 'message',
          title: 'New contact message',
          description: `From ${c.name}: ${c.subject}`,
          created_at: c.created_at,
          status: c.status
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your Travel Top 10 platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                <p className="text-2xl font-bold text-primary">{stats.totalListings}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  +{stats.recentActivity} this week
                </p>
              </div>
              <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-accent">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active members
                </p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-success/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold text-success">{stats.approvedCertificates}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.pendingCertificates} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold text-primary">{stats.totalContactMessages}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.unreadMessages} unread
                </p>
              </div>
              <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-travel-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates across your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-travel">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    {activity.status && (
                      <Badge 
                        variant={activity.status === 'unread' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="shadow-travel-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hotels</span>
                <span className="text-sm font-medium">{typeCounts.hotel}</span>
              </div>
              {/* <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Agencies</span>
                <span className="text-sm font-medium">{typeCounts.agency}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">DMCs</span>
                <span className="text-sm font-medium">{typeCounts.dmc}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Influencers</span>
                <span className="text-sm font-medium">{typeCounts.influencer}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-travel-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Platform Health</span>
                <Badge variant="default" className="bg-success">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <span className="text-sm font-medium">&lt; 200ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}