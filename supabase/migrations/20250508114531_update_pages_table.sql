-- Update pages table to include blocks column
ALTER TABLE pages
ADD COLUMN IF NOT EXISTS blocks JSONB DEFAULT '[]'::jsonb;

-- Add index for blocks column
CREATE INDEX IF NOT EXISTS idx_pages_blocks ON pages USING gin (blocks);

-- Update existing pages to have empty blocks array
UPDATE pages
SET blocks = '[]'::jsonb
WHERE blocks IS NULL;
