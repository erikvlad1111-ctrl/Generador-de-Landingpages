export type Role = 'admin' | 'employee';
export type TemplateStatus = 'active' | 'inactive';
export type LandingStatus = 'draft' | 'published' | 'archived';
export type Language = 'es' | 'en' | 'pt' | 'fr' | 'it';
export type PlanTier = 'free' | 'basic' | 'pro' | 'advance';
export type TicketStatus = 'open' | 'answered' | 'closed';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  code: string | null;
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
  languages: Language[];
  tier: PlanTier;
  status: LandingStatus;
  /** LandingData completo (ver src/types/landing.ts) */
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  landing_id: string;
  type: string;
  content: Record<string, unknown>; // JSONB
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
  response: Record<string, unknown>; // JSONB
  model: string;
  tokens_in: number | null;
  tokens_out: number | null;
  cost_usd: number | null;
  created_at: string;
}

export interface AgencySettings {
  id: string;
  owner_id: string;
  company_name: string;
  ruc: string | null;
  central_whatsapp: string | null;
  admin_email: string | null;
  address: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Guide {
  id: string;
  created_by: string;
  name: string;
  role: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  landing_id: string | null;
  kind: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  status: TicketStatus;
  created_at: string;
}

export interface SupportMessage {
  id: string;
  ticket_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
}
