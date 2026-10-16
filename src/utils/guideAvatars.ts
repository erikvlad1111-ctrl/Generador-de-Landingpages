export interface GuidePreset {
  name: string;
  role: string;
  fullName: string;
  cert: string;
  languages: string;
  url: string;
  description: string;
}

export const OFFICIAL_PERUVIAN_GUIDE_PRESETS: GuidePreset[] = [
  {
    name: 'Carlos (Lujo/Senior)',
    role: 'Lujo/Senior',
    fullName: 'Carlos Mendoza',
    cert: 'Licenciado DIRCETUR & Operador Autorizado',
    languages: 'Español, Inglés y Portugués',
    url: '/images/tour-guide-carlos.jpg',
    description: 'Guía oficial senior en Machu Picchu y experiencias de alta gama.'
  },
  {
    name: 'Raúl (Aventura/Trek)',
    role: 'Aventura/Trek',
    fullName: 'Raúl Quispe',
    cert: 'Licenciado en Turismo DIRCETUR (10 años exp.)',
    languages: 'Español, Inglés y Quechua',
    url: '/images/tour-guide-raul.jpg',
    description: 'Especialista en alta montaña, Salkantay, Camino Inca y primeros auxilios.'
  },
  {
    name: 'Lucía (Arqueología/Cultura)',
    role: 'Arqueología/Cultura',
    fullName: 'Lucía Condori',
    cert: 'Arqueóloga Colegiada & Guía Oficial DIRCETUR',
    languages: 'Español, Inglés y Francés',
    url: '/images/tour-guide-lucia.jpg',
    description: 'Arqueóloga e investigadora de templos incas, Sacsayhuamán y cosmovisión.'
  },
  {
    name: 'Camila (Fotografía/Boho)',
    role: 'Fotografía/Boho',
    fullName: 'Camila Valdivia',
    cert: 'Guía Especialista en Fotografía Andina DIRCETUR',
    languages: 'Español, Inglés y Francés',
    url: '/images/tour-guide-camila.jpg',
    description: 'Guía y fotógrafa andina de paisajes, lagunas turquesas y viajes conscientes.'
  },
  {
    name: 'Valdivia (Historia/Lujo)',
    role: 'Historia/Lujo',
    fullName: 'Mag. Carlos Valdivia',
    cert: 'Magíster en Arte Andino UNSAAC & Guía Conferencista',
    languages: 'Español, Inglés e Italiano',
    url: '/images/tour-guide-valdivia.jpg',
    description: 'Catedrático e historiador de arte virreinal, conventos coloniales y Qorikancha.'
  }
];

export const PRESET_GUIDE_AVATARS = OFFICIAL_PERUVIAN_GUIDE_PRESETS.map((g) => ({
  name: g.name,
  url: g.url
}));

export function getSanitizedGuideAvatar(avatarUrl?: string | null, guideName?: string | null): string {
  // If missing or legacy stock photo from unsplash
  const isStockPhoto = !avatarUrl || 
    avatarUrl.includes('images.unsplash.com/photo-1534528741775') ||
    avatarUrl.includes('images.unsplash.com/photo-1507003211169') ||
    avatarUrl.includes('images.unsplash.com/photo-1544005313') ||
    avatarUrl.includes('images.unsplash.com/photo-1517841905240');

  if (isStockPhoto) {
    if (guideName) {
      const lower = guideName.toLowerCase();
      if (lower.includes('marco') || lower.includes('raúl') || lower.includes('raul') || lower.includes('quispe') || lower.includes('flores')) {
        return '/images/tour-guide-raul.jpg';
      }
      if (lower.includes('lucía') || lower.includes('lucia') || lower.includes('condori') || lower.includes('rosa')) {
        return '/images/tour-guide-lucia.jpg';
      }
      if (lower.includes('camila')) {
        return '/images/tour-guide-camila.jpg';
      }
      if (lower.includes('valdivia') || lower.includes('renzo') || lower.includes('farfán')) {
        return '/images/tour-guide-valdivia.jpg';
      }
    }
    return '/images/tour-guide-carlos.jpg';
  }

  return avatarUrl;
}
