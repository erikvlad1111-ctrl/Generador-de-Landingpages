export type TemplateType = 'adventure' | 'premium' | 'cultural' | 'boho-nature' | 'agency-portal';
export type ObjectiveType = 'whatsapp' | 'quote' | 'both';
export type LanguageType = 'es' | 'en';
export type PlanTier = 'free' | 'basic' | 'pro' | 'advance';

export interface ItineraryItem {
  step: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  name: string;
  origin: string;
  comment: string;
  rating: number;
}

export interface LandingData {
  id: string;
  name: string;
  slug: string;
  tier?: PlanTier;
  guideName: string;
  guideAvatar?: string;
  guideCert?: string;
  guideLanguages?: string;
  destination?: string;
  altitude?: string;
  groupType?: string;
  aiTone?: string;
  whatsapp: string;
  price: string;
  duration: string;
  difficulty: string;
  objective: ObjectiveType;
  template: TemplateType;
  language: LanguageType;
  status: 'published' | 'draft';
  date: string;
  views: string;
  heroImage?: string;
  galleryImages?: string[];
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    content: string;
  };
  features: {
    title: string;
    items: string[];
  };
  itinerary?: ItineraryItem[];
  notIncluded?: string[];
  whatToBring?: string[];
  trustBadges?: string[];
  faqs?: FAQItem[];
  testimonials?: TestimonialItem[];
}
