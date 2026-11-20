export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'trekking' | 'cultural' | 'luxury';
}

export const SAMPLE_TOUR_IMAGES: GalleryImage[] = [
  {
    id: 'img-mp-1',
    url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    title: 'Machu Picchu Ciudadela Clásica',
    category: 'luxury'
  },
  {
    id: 'img-mp-2',
    url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    title: 'Terrazas y Montañas Sagradas',
    category: 'cultural'
  },
  {
    id: 'img-humantay',
    url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
    title: 'Laguna Humantay Turquesa',
    category: 'trekking'
  },
  {
    id: 'img-rainbow',
    url: '/images/travelers/traveler-vinicunca.jpg',
    title: 'Montaña de Siete Colores (Vinicunca)',
    category: 'trekking'
  },
  {
    id: 'img-sacred-valley',
    url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
    title: 'Terrazas Circulares de Moray',
    category: 'cultural'
  },
  {
    id: 'img-tourist-hiker',
    url: '/images/hero-tourist-cusco.jpg',
    title: 'Turista de Aventura Mirando hacia Arriba (Andes Trek)',
    category: 'trekking'
  },
  {
    id: 'img-pisac-terraces',
    url: 'https://images.unsplash.com/photo-1642193013187-941f5f7228f4?q=80&w=1600&auto=format&fit=crop',
    title: 'Andenes y Fortaleza de Pisac (Valle Sagrado)',
    category: 'cultural'
  },
  {
    id: 'img-llamas-mp',
    url: 'https://images.unsplash.com/photo-1775195560603-82f5f990b835?q=80&w=1600&auto=format&fit=crop',
    title: 'Llamas en Machu Picchu al Amanecer',
    category: 'luxury'
  },
  {
    id: 'img-ollantaytambo',
    url: 'https://plus.unsplash.com/premium_photo-1733353208945-7d659385587b?q=80&w=1600&auto=format&fit=crop',
    title: 'Parque Arqueológico de Ollantaytambo',
    category: 'cultural'
  },
  {
    id: 'img-sacred-andes',
    url: 'https://plus.unsplash.com/premium_photo-1697729872733-24e9e8186a47?q=80&w=1600&auto=format&fit=crop',
    title: 'Paisaje Andino del Valle Sagrado (Cusco)',
    category: 'trekking'
  },
  {
    id: 'img-arequipa-colca',
    url: 'https://plus.unsplash.com/premium_photo-1694475446825-765b8f0af326?q=80&w=1600&auto=format&fit=crop',
    title: 'Arequipa & Cañón del Colca (Sur del Perú)',
    category: 'cultural'
  },
  {
    id: 'img-traveler-mp',
    url: '/images/travelers/traveler-machu-picchu.jpg',
    title: 'Viajero frente a Machu Picchu',
    category: 'luxury'
  },
  {
    id: 'img-traveler-humantay',
    url: '/images/travelers/traveler-humantay.jpg',
    title: 'Expedición Laguna Humantay',
    category: 'trekking'
  },
  {
    id: 'img-traveler-sacred-valley',
    url: '/images/travelers/traveler-sacred-valley.jpg',
    title: 'Ruta del Valle Sagrado de los Incas',
    category: 'cultural'
  }
];
