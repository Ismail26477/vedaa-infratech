-- Add missing columns to properties table that admin form is trying to save
ALTER TABLE properties ADD COLUMN IF NOT EXISTS squareFeet DECIMAL(10, 2);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS yearBuilt INT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 1);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'India';
