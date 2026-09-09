export type TemplateType = 'adventure' | 'premium' | 'cultural';
export type ObjectiveType = 'whatsapp' | 'quote';
export type LanguageType = 'es' | 'en';

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
  guideName: string;
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
  faqs?: FAQItem[];
  testimonials?: TestimonialItem[];
}
