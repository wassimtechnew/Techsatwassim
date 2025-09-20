import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface IPTVOffer {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  download_url: string;
  app_name: string;
  created_at: string;
  updated_at: string;
}

export interface AndroidBox {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  purchase_url: string;
  specifications: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminSettings {
  id: string;
  service_name: string;
  available_apps: string[];
  created_at: string;
  updated_at: string;
}