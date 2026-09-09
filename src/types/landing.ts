export type TemplateType = 'adventure' | 'premium' | 'cultural';
export type ObjectiveType = 'whatsapp' | 'quote';
export type LanguageType = 'es' | 'en';

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
  itinerary?: {
    day: string;
    title: string;
    desc: string;
  }[];
}
