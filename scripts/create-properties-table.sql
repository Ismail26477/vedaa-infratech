-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  price BIGINT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area DECIMAL(10, 2),
  image_url TEXT,
  property_type TEXT,
  status TEXT DEFAULT 'available',
  square_feet DECIMAL(10, 2),
  year_built INTEGER,
  rating DECIMAL(3, 1),
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert demo properties
INSERT INTO properties (title, description, location, country, price, bedrooms, bathrooms, area, image_url, property_type, status, square_feet, year_built, rating, features) VALUES
('Modern Luxury Apartment', 'Beautiful luxury apartment with stunning city views', 'Mumbai, Maharashtra', 'India', 5000000, 3, 2, 2500, '/modern-luxury-apartment.png', 'Apartment', 'available', 2500, 2022, 4.8, ARRAY['Smart Home', 'Gym', 'Parking']),
('Premium Villa', 'Spacious premium villa with private garden and pool', 'Bangalore, Karnataka', 'India', 8500000, 4, 3, 4200, '/premium-villa.png', 'Villa', 'available', 4200, 2021, 4.9, ARRAY['Swimming Pool', 'Garden', 'Terrace']),
('Spacious Penthouse', 'Luxurious penthouse with rooftop access and panoramic views', 'Delhi, India', 'India', 12000000, 5, 4, 5500, '/spacious-penthouse.jpg', 'Penthouse', 'available', 5500, 2023, 5.0, ARRAY['Rooftop', 'Cinema', 'Wine Cellar']),
('Riverside Townhouse', 'Charming townhouse with river view and modern amenities', 'Pune, Maharashtra', 'India', 4200000, 3, 2, 2800, '/riverside-townhouse.jpg', 'Townhouse', 'available', 2800, 2020, 4.7, ARRAY['River View', 'Parking', 'Garden']),
('Sydney Harbour View', 'Beautiful apartment with stunning harbour views', 'Sydney, NSW', 'Australia', 3500000, 3, 2, 2200, '/sydney-harbour-view.jpg', 'Apartment', 'available', 2200, 2019, 4.7, ARRAY['Harbour View', 'Balcony', 'Concierge']),
('Downtown Dubai Penthouse', 'Luxurious penthouse in the heart of Dubai', 'Downtown Dubai, UAE', 'Dubai', 4500000, 3, 3, 3100, '/downtown-dubai-penthouse.jpg', 'Penthouse', 'available', 3100, 2020, 4.9, ARRAY['City View', 'Gym', 'Concierge']);
