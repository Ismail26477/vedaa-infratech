-- Create properties table for admin to manage properties
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(12, 2),
  bedrooms INT,
  bathrooms INT,
  area DECIMAL(10, 2),
  image_url TEXT,
  property_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin credentials table (for simple auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin@123)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$YourHashedPasswordHere')
ON CONFLICT (username) DO NOTHING;

-- Enable RLS on properties table
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read
CREATE POLICY "Allow public read on properties" ON properties
  FOR SELECT USING (true);

-- Create policy to allow admin write (we'll handle admin check in app)
CREATE POLICY "Allow admin write on properties" ON properties
  FOR ALL USING (true);
