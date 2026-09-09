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
    url: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    title: 'Montaña de Siete Colores (Vinicunca)',
    category: 'trekking'
  },
  {
    id: 'img-sacred-valley',
    url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
    title: 'Terrazas Circulares de Moray',
    category: 'cultural'
  }
];
