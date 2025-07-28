-- Create users table for additional profile information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create listings table
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'agency', 'DMC', 'influencer')),
  description TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  youtube_url TEXT,
  rank INTEGER,
  image_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create CMS content table
CREATE TABLE public.cms_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('country', 'place', 'featured')),
  image_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  issued_on TIMESTAMP WITH TIME ZONE,
  requested_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for listings
CREATE POLICY "Anyone can view listings" 
ON public.listings 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create listings" 
ON public.listings 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own listings" 
ON public.listings 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Create policies for CMS content
CREATE POLICY "Anyone can view active CMS content" 
ON public.cms_content 
FOR SELECT 
USING (is_active = true);

-- Create policies for certificates
CREATE POLICY "Users can view certificates for their listings" 
ON public.certificates 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.listings 
    WHERE listings.id = certificates.listing_id 
    AND listings.created_by = auth.uid()
  )
);

CREATE POLICY "Users can request certificates for their listings" 
ON public.certificates 
FOR INSERT 
WITH CHECK (
  auth.uid() = requested_by AND
  EXISTS (
    SELECT 1 FROM public.listings 
    WHERE listings.id = certificates.listing_id 
    AND listings.created_by = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at
  BEFORE UPDATE ON public.cms_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data
INSERT INTO public.listings (title, type, description, city, country, youtube_url, rank, image_url, rating) VALUES
('Grand Palace Hotel', 'hotel', 'Luxury 5-star hotel in the heart of the city', 'Bangkok', 'Thailand', 'https://youtube.com/watch?v=sample1', 1, '/placeholder.svg', 4.8),
('Wanderlust Travel Agency', 'agency', 'Premium travel planning services worldwide', 'New York', 'USA', 'https://youtube.com/watch?v=sample2', 2, '/placeholder.svg', 4.7),
('Thailand Adventures DMC', 'DMC', 'Expert destination management in Southeast Asia', 'Phuket', 'Thailand', 'https://youtube.com/watch?v=sample3', 1, '/placeholder.svg', 4.9),
('Travel Blogger Sarah', 'influencer', 'Travel content creator with 500K followers', 'London', 'UK', 'https://youtube.com/watch?v=sample4', 3, '/placeholder.svg', 4.6);

INSERT INTO public.cms_content (title, content_type, description, image_url) VALUES
('Thailand', 'country', 'Discover the Land of Smiles with pristine beaches and rich culture', '/placeholder.svg'),
('Bali Beaches', 'place', 'Perfect tropical getaway with stunning sunsets', '/placeholder.svg'),
('Featured: Best Hotels 2024', 'featured', 'Our top-rated hotel recommendations for this year', '/placeholder.svg');