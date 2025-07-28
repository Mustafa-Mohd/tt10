import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, Building2, MapPin, Award, Plus, Edit, Trash2, Eye, MessageSquare, Mail } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  type: string;
  city: string;
  country: string;
  rating: number;
  rank: number;
  description: string;
  youtube_url: string;
  created_at: string;
}

interface Profile {
  id: string;
  name: string;
  role: string;
  created_at: string;
  user_id: string;
}

interface Certificate {
  id: string;
  status: string;
  created_at: string;
  listing_id: string;
  listings: { title: string };
}

interface CMSContent {
  id: string;
  title: string;
  content_type: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  user_id: string | null;
}

function AdminDashboardProtected({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  if (isAdmin === null) return null; // or a loading spinner

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [cmsContent, setCmsContent] = useState<CMSContent[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalUsers: 0,
    pendingCertificates: 0,
    totalCmsContent: 0,
    totalContactMessages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (listingsError) {
        console.error('Error fetching listings:', listingsError);
      }

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Fetch certificates with listing details
      const { data: certificatesData, error: certificatesError } = await supabase
        .from('certificates')
        .select('*, listings(title)')
        .order('created_at', { ascending: false });

      if (certificatesError) {
        console.error('Error fetching certificates:', certificatesError);
      }

      // Fetch CMS content
      const { data: cmsData, error: cmsError } = await supabase
        .from('cms_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (cmsError) {
        console.error('Error fetching CMS:', cmsError);
      }

      // Fetch contact messages
      const { data: contactData, error: contactError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) {
        console.error('Error fetching contact messages:', contactError);
      }

      setListings(listingsData || []);
      setProfiles(profilesData || []);
      setCertificates(certificatesData || []);
      setCmsContent(cmsData || []);
      setContactMessages(contactData || []);

      // Update stats
      setStats({
        totalListings: listingsData?.length || 0,
        totalUsers: profilesData?.length || 0,
        pendingCertificates: certificatesData?.filter(c => c.status === 'pending').length || 0,
        totalCmsContent: cmsData?.length || 0,
        totalContactMessages: contactData?.length || 0,
        unreadMessages: contactData?.filter(m => m.status === 'unread').length || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch dashboard data');
    }
  };

  const approveCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .update({ status: 'approved', issued_on: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Certificate approved successfully!');
      fetchData();
    } catch (error) {
      console.error('Error approving certificate:', error);
      toast.error('Failed to approve certificate');
    }
  };

  const denyCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .update({ status: 'denied' })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Certificate denied');
      fetchData();
    } catch (error) {
      console.error('Error denying certificate:', error);
      toast.error('Failed to deny certificate');
    }
  };

  const toggleCmsActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('cms_content')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Content ${!isActive ? 'activated' : 'deactivated'} successfully!`);
      fetchData();
    } catch (error) {
      console.error('Error updating CMS content:', error);
      toast.error('Failed to update content');
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Message marked as read');
      fetchData();
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Travel Top 10 platform</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalListings}</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Certificates</p>
                  <p className="text-3xl font-bold text-primary">{stats.pendingCertificates}</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CMS Content</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalCmsContent}</p>
                </div>
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Messages</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalContactMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                  <p className="text-3xl font-bold text-primary">{stats.unreadMessages}</p>
                </div>
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="cms">CMS Content</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  All Listings
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Listing
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {listing.type} • {listing.city}, {listing.country} • Rank #{listing.rank}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{listing.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Rating: {listing.rating}</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Role: {profile.role} • Joined: {new Date(profile.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                        {profile.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{certificate.listings?.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Status: {certificate.status} • Requested: {new Date(certificate.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            certificate.status === 'approved' ? 'default' : 
                            certificate.status === 'denied' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {certificate.status}
                        </Badge>
                        {certificate.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => approveCertificate(certificate.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => denyCertificate(certificate.id)}
                            >
                              Deny
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CMS Tab */}
          <TabsContent value="cms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  CMS Content Management
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cmsContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{content.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Type: {content.content_type} • Created: {new Date(content.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={content.is_active ? 'default' : 'secondary'}>
                          {content.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleCmsActive(content.id, content.is_active)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Form Submissions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Message</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.map((message) => (
                      <tr key={message.id} className="border-b">
                        <td className="px-4 py-2 whitespace-nowrap">{message.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{message.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{message.subject}</td>
                        <td className="px-4 py-2 whitespace-pre-line max-w-xs truncate">{message.message}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
                            {message.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {new Date(message.created_at).toLocaleDateString()}<br />
                          <span className="text-xs text-muted-foreground">{new Date(message.created_at).toLocaleTimeString()}</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {message.status === 'unread' && (
                            <Button size="sm" onClick={() => markMessageAsRead(message.id)}>
                              Mark as Read
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;