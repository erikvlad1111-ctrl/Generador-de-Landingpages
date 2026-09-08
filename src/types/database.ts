export type Role = 'admin' | 'employee';
export type TemplateStatus = 'active' | 'inactive';
export type LandingStatus = 'draft' | 'published' | 'archived';
export type Language = 'es' | 'en';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  status: TemplateStatus;
  created_at: string;
  updated_at: string;
}

export interface Landing {
  id: string;
  template_id: string;
  created_by: string;
  name: string;
  slug: string;
  language: Language;
  status: LandingStatus;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  landing_id: string;
  type: string;
  content: any; // JSONB
  order_index: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  landing_id: string;
  section_id: string | null;
  storage_path: string;
  alt_text: string | null;
  created_at: string;
}

export interface AIGeneration {
  id: string;
  landing_id: string;
  user_id: string;
  prompt: string;
  response: any; // JSONB
  model: string;
  created_at: string;
}
