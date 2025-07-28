import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Building, MapPin, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

const Claim = () => {
  const [formData, setFormData] = useState({
    listingName: '',
    category: '',
    city: '',
    country: '',
    youtubeLink: '',
    contactEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Certificate claim submitted! We\'ll review your application.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Claim Your <span className="text-primary">Certificate</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our certified network of travel professionals
            </p>
          </div>

          <Card className="card-gradient border border-border shadow-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Certificate Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Listing Name
                    </label>
                    <input
                      type="text"
                      value={formData.listingName}
                      onChange={(e) => setFormData({...formData, listingName: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Your business name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="agency">Travel Agency</option>
                      <option value="hotel">Hotel</option>
                      <option value="dmc">DMC</option>
                      <option value="influencer">Influencer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Your city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Your country"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    YouTube Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeLink}
                    onChange={(e) => setFormData({...formData, youtubeLink: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Claim;