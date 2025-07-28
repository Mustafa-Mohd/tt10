-- Insert admin user data (this will be referenced when the user signs up)
-- Note: The actual user account must be created through the auth signup process

-- Insert admin profile (will be created when user signs up with admin@gmail.com)
-- For now, let's add some sample data to populate the admin dashboard

-- Add some sample CMS content
INSERT INTO cms_content (title, content_type, description, image_url, is_active) VALUES
('Welcome Message', 'announcement', 'Welcome to our travel platform! Discover amazing destinations with our certified travel partners.', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', true),
('Featured Destinations', 'featured', 'Explore our handpicked destinations around the world', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', true),
('Travel Tips', 'blog', 'Essential travel tips for your next adventure', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', true);

-- Add some sample listings for different types
INSERT INTO listings (title, description, type, city, country, rating, image_url) VALUES
('Luxury Resort Management', 'Premier resort management services in Bali', 'hotel', 'Bali', 'Indonesia', 4.8, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'),
('Adventure Travel Agency', 'Specialized in adventure and eco-tourism', 'agency', 'Queenstown', 'New Zealand', 4.9, 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800'),
('Himalayan DMC Services', 'Complete destination management for Himalayan region', 'dmc', 'Kathmandu', 'Nepal', 4.7, 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'),
('Travel Influencer Network', 'Connect with top travel influencers worldwide', 'influencer', 'Los Angeles', 'USA', 4.6, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'),
('European DMC Alliance', 'Comprehensive destination services across Europe', 'dmc', 'Paris', 'France', 4.8, 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800'),
('Boutique Hotels Group', 'Curated collection of unique boutique properties', 'hotel', 'Santorini', 'Greece', 4.9, 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800');