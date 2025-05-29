/*
  # Create normas table and set up security policies

  1. New Tables
    - `normas`
      - `id` (uuid, primary key)
      - `nome` (text, required)
      - `pais` (text, required)
      - `categoria` (text, nullable)
      - `ano` (text, nullable)
      - `imagem_url` (text, required)
      - `pdf_url` (text, required)
      - `created_at` (timestamptz, default: now())
      - `autor` (text, nullable)

  2. Security
    - Enable RLS on `normas` table
    - Add policies for:
      - Authenticated users can perform all operations
      - Anonymous users can only read
*/

CREATE TABLE IF NOT EXISTS normas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  pais text NOT NULL,
  categoria text,
  ano text,
  imagem_url text NOT NULL,
  pdf_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  autor text
);

-- Enable Row Level Security
ALTER TABLE normas ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read normas
CREATE POLICY "Anyone can view normas"
  ON normas
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage normas
CREATE POLICY "Authenticated users can manage normas"
  ON normas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);