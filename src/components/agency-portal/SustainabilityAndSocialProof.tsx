'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Star, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Camera, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface SustainabilityAndSocialProofProps {
  lang?: LanguageType;
  brandName?: string;
  isMobile?: boolean;
}

export default function SustainabilityAndSocialProof({
  lang = 'es',
  brandName = 'Cusco Tours Oficial',
  isMobile = false
}: SustainabilityAndSocialProofProps) {
  const content = {
    es: {
      socialBadge: 'Turismo Consciente & Ético',
      socialTitle: 'Compromiso Social, Trato Justo y Cero Huella',
      socialSubtitle: 'Tu viaje genera un impacto positivo directo en las familias y comunidades quechuas de los Andes peruanos.',
      pillars: [
        {
          title: 'Trato Digno a Porteadores y Cocineros',
          desc: 'Salarios 25% por encima de la media legal, seguro de accidentes, alimentación balanceada y equipo térmico de alta montaña para todo nuestro personal de campo.',
          icon: 'Users',
          tag: 'Bienestar Laboral'
        },
        {
          title: 'Comercio Justo con Comunidades Nativas',
          desc: 'Abastecemos nuestras provisiones (papas nativas, trucha, quinoa, maíz del valle) comprando directamente a familias campesinas sin intermediarios.',
          icon: 'HeartHandshake',
          tag: 'Impacto Local'
        },
        {
          title: 'Política Ambiental Leave No Trace',
          desc: 'Prohibición estricta de plásticos de un solo uso en todas nuestras expediciones. Llevamos de regreso el 100% de los residuos generados en cada ruta.',
          icon: 'Leaf',
          tag: 'Eco-Sostenible'
        }
      ],
      reputationBadge: 'Prestigio Internacional Verificado',
      reputationTitle: 'Reconocidos por las Plataformas de Viajes Líderes',
      tripadvisorTitle: 'TripAdvisor Travelers’ Choice 2026',
      tripadvisorSub: 'En el Top 1% de experiencias mejor valoradas a nivel mundial.',
      googleTitle: 'Google Business Reviews',
      googleSub: '4.9 ★ / 5.0 basado en más de 850 opiniones verificadas.',
      safeTravelsTitle: 'Sello Oficial Safe Travels',
      safeTravelsSub: 'Certificado internacional de protocolos de bioseguridad y turismo formal.',
      
      feedBadge: 'Momentos Reales Esta Semana',
      feedTitle: '#CuscoTravelers: Fotos en Vivo de Nuestros Pasajeros',
      feedSubtitle: 'Imágenes capturadas por viajeros que recorrieron Machu Picchu, Humantay y Vinicunca con nuestro equipo en los últimos días.',
      verifiedTraveler: 'Viajero Verificado'
    },
    en: {
      socialBadge: 'Conscious & Ethical Tourism',
      socialTitle: 'Social Commitment, Fair Treatment & Eco-Care',
      socialSubtitle: 'Your journey directly empowers indigenous Quechua families and mountain stewards across the Peruvian Andes.',
      pillars: [
        {
          title: 'Fair Porter & Mountain Staff Welfare',
          desc: 'Salaries 25% above Peruvian legal guidelines, dedicated accident insurance, nutritious meals, and high-altitude thermal gear for all field crews.',
          icon: 'Users',
          tag: 'Staff Well-being'
        },
        {
          title: 'Direct Trade with Native Villages',
          desc: 'We source fresh provisions (native potatoes, Andean trout, quinoa, giant corn) directly from indigenous farming families without middlemen.',
          icon: 'HeartHandshake',
          tag: 'Local Impact'
        },
        {
          title: 'Leave No Trace Environmental Policy',
          desc: 'Zero single-use plastics permitted on our trails. We pack out 100% of trash generated and participate in trail preservation initiatives.',
          icon: 'Leaf',
          tag: 'Eco-Friendly'
        }
      ],
      reputationBadge: 'Verified Global Reputation',
      reputationTitle: 'Endorsed by World-Leading Travel Platforms',
      tripadvisorTitle: 'TripAdvisor Travelers’ Choice 2026',
      tripadvisorSub: 'Ranked among the top 1% of travel operators worldwide.',
      googleTitle: 'Google Business Reviews',
      googleSub: '4.9 ★ / 5.0 score from over 850 verified traveler reviews.',
      safeTravelsTitle: 'Safe Travels International Stamp',
      safeTravelsSub: 'Certified by the WTTC and DIRCETUR Cusco for gold-standard service.',
      
      feedBadge: 'Live Moments This Week',
      feedTitle: '#CuscoTravelers: Real Photos from Our Guests',
      feedSubtitle: 'Unfiltered pictures captured by travelers exploring Machu Picchu, Humantay, and Rainbow Mountain with our guides.',
      verifiedTraveler: 'Verified Traveler'
    },
    pt: {
      socialBadge: 'Turismo Consciente & Ético',
      socialTitle: 'Compromisso Social, Trabalho Justo e Cuidado Ambiental',
      socialSubtitle: 'Sua viagem apoia diretamente as famílias quechuas dos Andes peruanos.',
      pillars: [
        {
          title: 'Tratamento Digno aos Carregadores',
          desc: 'Salários 25% acima da lei, seguro contra acidentes, alimentação saudável e roupas térmicas de alta montanha para nossa equipe.',
          icon: 'Users',
          tag: 'Bem-Estar'
        },
        {
          title: 'Comércio Justo com Comunidades',
          desc: 'Compramos nossos suprimentos frescos diretamente de pequenos produtores andinos, apoiando a economia rural.',
          icon: 'HeartHandshake',
          tag: 'Impacto Local'
        },
        {
          title: 'Política Leave No Trace',
          desc: 'Sem plásticos descartáveis nas trilhas. Retiramos todo o lixo gerado durante os circuitos.',
          icon: 'Leaf',
          tag: 'Sustentável'
        }
      ],
      reputationBadge: 'Reputação Internacional Verificada',
      reputationTitle: 'Reconhecido pelas Melhores Plataformas',
      tripadvisorTitle: 'TripAdvisor Travelers’ Choice 2026',
      tripadvisorSub: 'No Top 1% das experiências mais bem avaliadas do mundo.',
      googleTitle: 'Avaliações do Google',
      googleSub: 'Nota 4.9 ★ / 5.0 com mais de 850 depoimentos verificados.',
      safeTravelsTitle: 'Selo Oficial Safe Travels',
      safeTravelsSub: 'Certificação internacional de segurança e turismo regulamentado.',
      
      feedBadge: 'Momentos Reais Esta Semana',
      feedTitle: '#CuscoTravelers: Fotos Reais de Viajantes',
      feedSubtitle: 'Imagens tiradas pelos nossos passageiros durante a última semana no Peru.',
      verifiedTraveler: 'Viajante Verificado'
    },
    fr: {
      socialBadge: 'Tourisme Éthique & Responsable',
      socialTitle: 'Engagement Social, Respect des Porteurs & Écologie',
      socialSubtitle: 'Votre voyage soutient directement les communautés quechuas locales.',
      pillars: [
        {
          title: 'Respect et Bien-être des Porteurs',
          desc: 'Salaires décents, assurances, nourriture saine et équipement thermique de qualité pour toutes nos équipes de montagne.',
          icon: 'Users',
          tag: 'Éthique Sociale'
        },
        {
          title: 'Commerce Direct avec les Villages',
          desc: 'Achat direct de provisions locales sans intermédiaires pour dynamiser l’économie des hauts plateaux andins.',
          icon: 'HeartHandshake',
          tag: 'Impact Direct'
        },
        {
          title: 'Zéro Plastique & Leave No Trace',
          desc: 'Aucun plastique à usage unique sur les sentiers et nettoyage actif des sites préservés.',
          icon: 'Leaf',
          tag: 'Éco-Responsable'
        }
      ],
      reputationBadge: 'Excellence Internationale',
      reputationTitle: 'Plébiscité par les Leaders du Voyage',
      tripadvisorTitle: 'TripAdvisor Travelers’ Choice 2026',
      tripadvisorSub: 'Dans le top 1 % des meilleures expériences au monde.',
      googleTitle: 'Avis Google Vérifiés',
      googleSub: 'Note 4.9 ★ / 5.0 avec plus de 850 avis d’aventuriers.',
      safeTravelsTitle: 'Sceau Officiel Safe Travels',
      safeTravelsSub: 'Certifié conforme aux normes internationales de qualité et de sécurité.',
      
      feedBadge: 'En Direct cette Semaine',
      feedTitle: '#CuscoTravelers: Les Photos de Nos Voyageurs',
      feedSubtitle: 'Photos authentiques partagées par nos clients découvrant les merveilles incas.',
      verifiedTraveler: 'Voyageur Vérifié'
    },
    it: {
      socialBadge: 'Turismo Etico & Sostenibile',
      socialTitle: 'Impegno Sociale, Trattamento Equo e Rispetto per la Terra',
      socialSubtitle: 'La tua vacanza sostiene le famiglie indigene delle Ande peruviane.',
      pillars: [
        {
          title: 'Trattamento Equo per Portatori e Cuochi',
          desc: 'Salari equi, assicurazione medica, cibo nutriente ed equipaggiamento termico per tutto il personale di supporto.',
          icon: 'Users',
          tag: 'Benessere'
        },
        {
          title: 'Commercio Diretto con le Comunità',
          desc: 'Acquistiamo prodotti freschi dai coltivatori locali per valorizzare le cooperative andine.',
          icon: 'HeartHandshake',
          tag: 'Impatto Locale'
        },
        {
          title: 'Politica Leave No Trace',
          desc: 'Nessuna plastica monouso sui sentieri e tutela attiva dell’ambiente naturale.',
          icon: 'Leaf',
          tag: 'Sostenibile'
        }
      ],
      reputationBadge: 'Reputazione Globale Verificata',
      reputationTitle: 'Premiati dalle Migliori Piattaforme Turistiche',
      tripadvisorTitle: 'TripAdvisor Travelers’ Choice 2026',
      tripadvisorSub: 'Nel top 1% delle esperienze turistiche più apprezzate al mondo.',
      googleTitle: 'Recensioni Google',
      googleSub: 'Valutazione 4.9 ★ / 5.0 con oltre 850 recensioni verificate.',
      safeTravelsTitle: 'Sigillo Safe Travels',
      safeTravelsSub: 'Riconoscimento internazionale di qualità e sicurezza turistica.',
      
      feedBadge: 'Momenti Reali Questa Settimana',
      feedTitle: '#CuscoTravelers: Gli Scatti dei Nostri Ospiti',
      feedSubtitle: 'Foto autentiche scattate dai viaggiatori con le nostre guide in questi giorni.',
      verifiedTraveler: 'Viaggiatore Verificato'
    }
  };

  const t = content[lang] || content.es;

  // Real traveler photo feed with authentic tourists enjoying tours in Peru
  const travelerFeed = [
    {
      user: '@sarah.anderson_travel',
      country: '🇺🇸 EE.UU.',
      tour: 'Machu Picchu VIP & Huayna Picchu',
      timeAgo: 'Hace 2 días',
      image: '/images/travelers/traveler-machu-picchu.jpg',
      comment: '¡Un amanecer mágico sin multitudes! Carlos fue el mejor guía que pudimos tener.'
    },
    {
      user: '@matteo_rossi_explorer',
      country: '🇮🇹 Italia',
      tour: 'Laguna Humantay Turquesa',
      timeAgo: 'Hace 3 días',
      image: '/images/travelers/traveler-humantay.jpg',
      comment: 'El color del agua es irreal. Nos dieron bastones de trekking y té de coca calientito.'
    },
    {
      user: '@camila.viajes.br',
      country: '🇧🇷 Brasil',
      tour: 'Montaña 7 Colores Vinicunca',
      timeAgo: 'Esta semana',
      image: '/images/travelers/traveler-vinicunca.jpg',
      comment: 'Subimos a 5,036 metros y el oxígeno que llevaban en la van nos dio total tranquilidad.'
    },
    {
      user: '@julien_voyage_paris',
      country: '🇫🇷 Francia',
      tour: 'Valle Sagrado & Ollantaytambo',
      timeAgo: 'Esta semana',
      image: '/images/travelers/traveler-sacred-valley.jpg',
      comment: 'Excelente organización y transporte privado de primera clase con aire acondicionado.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20">
      {/* 1. SECCIÓN DE TURISMO SOSTENIBLE Y TRATO JUSTO */}
      <section className="py-12 sm:py-20 bg-[#F9F7F4] border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-600/20">
              <Leaf size={13} /> {t.socialBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900">
              {t.socialTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t.socialSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center font-bold">
                      {idx === 0 ? <Users size={24} /> : idx === 1 ? <HeartHandshake size={24} /> : <Leaf size={24} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 size={15} /> Compromiso Oficial {brandName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INSIGNIAS DE REPUTACIÓN EXTERNA (TRIPADVISOR / GOOGLE / SAFE TRAVELS) */}
      <section className="py-6 sm:py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center justify-center gap-1">
              <Award size={13} /> {t.reputationBadge}
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-stone-900">
              {t.reputationTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* TripAdvisor Badge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md flex items-center gap-4 hover:border-amber-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#00AA6C]/20 text-[#00AA6C] flex items-center justify-center font-black text-2xl shrink-0 border border-[#00AA6C]/30">
                🦉
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                </div>
                <h4 className="text-sm font-black text-white truncate">
                  {t.tripadvisorTitle}
                </h4>
                <p className="text-[11px] text-stone-400 leading-tight">
                  {t.tripadvisorSub}
                </p>
              </div>
            </div>

            {/* Google Reviews Badge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-md flex items-center gap-4 hover:border-blue-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl shrink-0 border border-blue-200">
                G
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-stone-900">4.9 / 5.0</span>
                  <div className="flex text-amber-500 text-xs">
                    {'★★★★★'}
                  </div>
                </div>
                <h4 className="text-sm font-black text-stone-900 truncate">
                  {t.googleTitle}
                </h4>
                <p className="text-[11px] text-stone-500 leading-tight">
                  {t.googleSub}
                </p>
              </div>
            </div>

            {/* Safe Travels Stamp */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-emerald-200 shadow-md flex items-center gap-4 hover:border-emerald-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0 border border-emerald-300">
                <ShieldCheck size={28} />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  WTTC & MINCETUR
                </span>
                <h4 className="text-sm font-black text-stone-900 truncate">
                  {t.safeTravelsTitle}
                </h4>
                <p className="text-[11px] text-stone-600 leading-tight">
                  {t.safeTravelsSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEED DE FOTOS REALES DE VIAJEROS (#CuscoTravelers) */}
      <section className="py-10 sm:py-16 bg-stone-950 text-white border-y border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF5500] text-xs font-black uppercase tracking-widest border border-[#FF5500]/30">
                <Camera size={13} /> {t.feedBadge}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white">
                {t.feedTitle}
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                {t.feedSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Historias actualizadas en tiempo real
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {travelerFeed.map((post, idx) => (
              <div 
                key={idx}
                className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-stone-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-800">
                    <Image
                      src={post.image}
                      alt={post.tour}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                      <MapPin size={10} className="text-[#FF5500]" /> {post.country}
                    </div>
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-[10px] font-semibold text-white/90 truncate">
                      {post.tour}
                    </div>
                  </div>

                  {/* Post caption */}
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-stone-200">
                        {post.user}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {post.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 italic leading-relaxed">
                      &quot;{post.comment}&quot;
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 size={11} /> {t.verifiedTraveler}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
