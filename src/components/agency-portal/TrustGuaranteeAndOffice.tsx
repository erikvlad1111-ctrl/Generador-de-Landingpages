'use client';

import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Navigation,
  MessageCircle,
  Building2
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface TrustGuaranteeAndOfficeProps {
  lang?: LanguageType;
  whatsapp?: string;
  brandName?: string;
  isMobile?: boolean;
}

export default function TrustGuaranteeAndOffice({
  lang = 'es',
  whatsapp = '+51984123456',
  brandName = 'Cusco Tours Oficial',
  isMobile = false
}: TrustGuaranteeAndOfficeProps) {
  const cleanPhone = whatsapp.replace(/[^0-9]/g, '');

  const content = {
    es: {
      guaranteeBadge: 'Tu Inversión 100% Protegida',
      guaranteeTitle: 'Garantía de Flexibilidad & Reserva con Tranquilidad',
      guaranteeSubtitle: 'Sabemos que los imprevistos ocurren. Por eso blindamos tu experiencia antes, durante y después de tu llegada a Perú.',
      items: [
        {
          title: 'Reprogramación Gratuita de Fechas',
          desc: 'Si cambias de planes o tus vuelos se modifican, puedes mover la fecha de tu tour sin ninguna penalidad avisando hasta 7 días antes.',
          badge: 'Cero Penalidad'
        },
        {
          title: 'Garantía de Fuerza Mayor & Clima',
          desc: 'En caso de cierre oficial de la vía férrea a Machu Picchu, mal clima severo o huelgas, reprogramamos o gestionamos tu reembolso de inmediato.',
          badge: '100% Respaldado'
        },
        {
          title: 'Cero Costos Ocultos ni Sorpresas',
          desc: 'Nuestras cotizaciones incluyen exactamente lo convenido: entradas oficiales registradas a tu nombre, impuestos y traslados privados.',
          badge: 'Transparencia Total'
        }
      ],
      officeBadge: 'Atención Presencial en Cusco',
      officeTitle: 'Nuestra Oficina Física en el Centro Histórico',
      officeSubtitle: 'Visítanos en persona para coordinar los detalles de tu tour, recoger tu kit de viajero o probar una degustación de café cusqueño.',
      addressTitle: 'Dirección Principal:',
      addressValue: 'Portal de Panes N° 123 (Plaza de Armas) & Av. El Sol N° 456, Centro Histórico, Cusco - Perú',
      hoursTitle: 'Horarios de Atención:',
      hoursValue: 'Lunes a Domingo: 08:00 AM – 08:00 PM (Horario Corrido)',
      directPhone: 'Central de Reservas & Recepción:',
      openMapsBtn: 'Ver en Google Maps',
      contactDeskBtn: 'Hablar con Recepción'
    },
    en: {
      guaranteeBadge: '100% Protected Investment',
      guaranteeTitle: 'Flexibility Guarantee & Worry-Free Booking',
      guaranteeSubtitle: 'We know travel plans can change. That is why your booking is protected before, during, and after your arrival in Peru.',
      items: [
        {
          title: 'Free Date Rescheduling',
          desc: 'If your flight changes or plans shift, you can reschedule your tour dates with zero penalty fees up to 7 days before departure.',
          badge: 'Zero Fees'
        },
        {
          title: 'Force Majeure & Weather Guarantee',
          desc: 'In the event of official railway closures to Machu Picchu, severe weather, or strikes, we instantly reschedule or process refunds.',
          badge: '100% Covered'
        },
        {
          title: 'Zero Hidden Fees or Surprise Charges',
          desc: 'Our written quotes include exactly what was agreed: official entrance tickets issued in your name, all taxes, and private transfers.',
          badge: 'Total Transparency'
        }
      ],
      officeBadge: 'Walk-In Office in Cusco',
      officeTitle: 'Our Headquarters in Cusco Historic Center',
      officeSubtitle: 'Meet us in person to finalize details, pick up your welcome briefing kit, or enjoy a complimentary cup of high-altitude organic coffee.',
      addressTitle: 'Official Address:',
      addressValue: 'Portal de Panes #123 (Main Plaza de Armas) & Av. El Sol #456, Historic District, Cusco - Peru',
      hoursTitle: 'Office Opening Hours:',
      hoursValue: 'Monday to Sunday: 08:00 AM – 08:00 PM (Every day)',
      directPhone: 'Front Desk Direct Line:',
      openMapsBtn: 'Open in Google Maps',
      contactDeskBtn: 'Chat with Reception'
    },
    pt: {
      guaranteeBadge: 'Seu Investimento 100% Protegido',
      guaranteeTitle: 'Garantia de Flexibilidade & Reserva sem Preocupações',
      guaranteeSubtitle: 'Sabemos que imprevistos acontecem. Por isso sua reserva é protegida do início ao fim da sua viagem ao Peru.',
      items: [
        {
          title: 'Reagendamento Gratuito de Datas',
          desc: 'Seus planos mudaram? Você pode alterar a data do seu passeio sem nenhuma taxa com até 7 dias de antecedência.',
          badge: 'Sem Taxas'
        },
        {
          title: 'Garantia por Força Maior e Clima',
          desc: 'Em caso de interrupção da ferrovia para Machu Picchu ou fatores climáticos, reagendamos ou reembolsamos prontamente.',
          badge: '100% Garantido'
        },
        {
          title: 'Sem Custos Ocultos',
          desc: 'Nossos orçamentos incluem tudo o que foi prometido: ingressos oficiais no seu nome, taxas e transporte privativo.',
          badge: 'Transparência'
        }
      ],
      officeBadge: 'Atendimento Presencial em Cusco',
      officeTitle: 'Nosso Escritório Físico no Centro Histórico',
      officeSubtitle: 'Venha nos visitar pessoalmente para tirar dúvidas, receber seu kit de boas-vindas e tomar um autêntico café peruano.',
      addressTitle: 'Endereço:',
      addressValue: 'Portal de Panes N° 123 (Plaza de Armas) & Av. El Sol N° 456, Centro Histórico, Cusco - Peru',
      hoursTitle: 'Horário de Atendimento:',
      hoursValue: 'Segunda a Domingo: 08:00 às 20:00 (Ininterrupto)',
      directPhone: 'Central de Atendimento:',
      openMapsBtn: 'Abrir no Google Maps',
      contactDeskBtn: 'Falar com a Recepção'
    },
    fr: {
      guaranteeBadge: 'Investissement Protégé à 100%',
      guaranteeTitle: 'Garantie de Flexibilité & Réservation Sérénité',
      guaranteeSubtitle: 'Les imprévus arrivent. Votre réservation est garantie avant, pendant et après votre arrivée au Pérou.',
      items: [
        {
          title: 'Report de Date Gratuit',
          desc: 'Modifiez vos dates sans aucune pénalité jusqu’à 7 jours avant le départ en cas d’ajustement de vos vols.',
          badge: 'Sans Pénalité'
        },
        {
          title: 'Garantie Force Majeure & Météo',
          desc: 'En cas de fermeture ferroviaire officielle vers le Machu Picchu ou intempéries, report ou remboursement immédiat.',
          badge: 'Garantie Totale'
        },
        {
          title: 'Zéro Frais Cachés',
          desc: 'Nos devis comprennent exactement ce qui est convenu : billets officiels nominatifs, taxes et transferts.',
          badge: 'Transparence'
        }
      ],
      officeBadge: 'Accueil Physique à Cusco',
      officeTitle: 'Notre Agence au Cœur du Centre Historique',
      officeSubtitle: 'Venez nous rencontrer pour finaliser votre itinéraire et récupérer vos documents de voyage.',
      addressTitle: 'Adresse Officielle :',
      addressValue: 'Portal de Panes N° 123 (Plaza de Armas) & Av. El Sol N° 456, Centre Historique, Cusco - Pérou',
      hoursTitle: 'Horaires d’Ouverture :',
      hoursValue: 'Du Lundi au Dimanche : 08h00 – 20h00',
      directPhone: 'Ligne Directe Réception :',
      openMapsBtn: 'Ouvrir sur Google Maps',
      contactDeskBtn: 'Contacter l’Agence'
    },
    it: {
      guaranteeBadge: 'Il tuo Viaggio Protetto al 100%',
      guaranteeTitle: 'Garanzia di Flessibilità & Prenotazione Protetta',
      guaranteeSubtitle: 'I piani possono cambiare. Proteggiamo la tua esperienza con condizioni chiare e senza sorprese.',
      items: [
        {
          title: 'Cambio Data Gratuito',
          desc: 'Puoi modificare le date del tuo tour senza alcuna penale fino a 7 giorni prima dell’arrivo.',
          badge: 'Zero Penali'
        },
        {
          title: 'Garanzia Forza Maggiore',
          desc: 'In caso di chiusure ferroviarie verso Machu Picchu o maltempo estremo, riprogrammazione o rimborso garantito.',
          badge: '100% Tutelato'
        },
        {
          title: 'Nessun Costo Nascosto',
          desc: 'I nostri preventivi includono ingressi ufficiali nominativi, tasse governative e transfer privati.',
          badge: 'Trasparenza'
        }
      ],
      officeBadge: 'Sede Fisica a Cusco',
      officeTitle: 'Il Nostro Ufficio nel Centro Storico di Cusco',
      officeSubtitle: 'Vieni a trovarci per coordinare i dettagli del viaggio e ritirare il tuo kit di benvenuto.',
      addressTitle: 'Indirizzo:',
      addressValue: 'Portal de Panes N° 123 (Plaza de Armas) & Av. El Sol N° 456, Centro Storico, Cusco - Perù',
      hoursTitle: 'Orari di Apertura:',
      hoursValue: 'Dal Lunedì alla Domenica: 08:00 – 20:00',
      directPhone: 'Centralino Ufficio:',
      openMapsBtn: 'Apri su Google Maps',
      contactDeskBtn: 'Parla con la Reception'
    }
  };

  const t = content[lang] || content.es;
  const mapsUrl = 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru';
  const waOfficeUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    lang === 'en'
      ? `Hello ${brandName}, I would like to visit your office in Cusco to coordinate my tour booking.`
      : `Hola ${brandName}, deseo coordinar una visita a su oficina en Cusco para ultimar detalles de mi reserva.`
  )}`;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. GARANTÍA DE FLEXIBILIDAD Y CANCELACIÓN */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-stone-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest border border-blue-600/20">
              <ShieldCheck size={13} /> {t.guaranteeBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900">
              {t.guaranteeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t.guaranteeSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.items.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center font-black">
                      <Sparkles size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-blue-700 text-xs font-bold">
                  <CheckCircle2 size={14} /> Respaldado por Contrato Formal
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OFICINA FÍSICA Y HORARIOS EN CUSCO */}
      <section className="py-10 sm:py-16 bg-[#1C1917] text-white rounded-3xl mx-3 sm:mx-6 p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Información */}
          <div className="md:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
              <Building2 size={13} /> {t.officeBadge}
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.officeTitle}
            </h3>
            
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t.officeSubtitle}
            </p>

            <div className="space-y-3.5 pt-2 text-xs">
              <div className="flex items-start gap-3 bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800">
                <MapPin size={18} className="text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block text-xs">{t.addressTitle}</span>
                  <span className="text-stone-300 text-xs">{t.addressValue}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800">
                <Clock size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block text-xs">{t.hoursTitle}</span>
                  <span className="text-stone-300 text-xs">{t.hoursValue}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800">
                <Phone size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block text-xs">{t.directPhone}</span>
                  <span className="text-amber-400 font-mono font-bold text-xs">{whatsapp}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-stone-100 text-stone-900 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Navigation size={14} className="text-[#FF5500]" />
                {t.openMapsBtn}
              </a>

              <a
                href={waOfficeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF5500] hover:bg-[#e04b00] text-white font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-[#FF5500]/30 cursor-pointer"
              >
                <MessageCircle size={14} />
                {t.contactDeskBtn}
              </a>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Estilizada de Mapa y Sello Municipal */}
          <div className="md:col-span-5 relative">
            <div className="bg-stone-900/90 border border-stone-700 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 flex items-center justify-center">
                <div className="absolute inset-0 bg-radial from-stone-800 to-stone-950" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center mx-auto animate-bounce">
                    <MapPin size={24} />
                  </div>
                  <p className="font-extrabold text-white text-xs">
                    Plaza de Armas de Cusco
                  </p>
                  <span className="text-[10px] text-stone-400 block">
                    A sólo 2 minutos caminando de la Catedral
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span className="text-stone-300 font-semibold">Licencia Municipal N° 04821</span>
                </div>
                <span className="text-emerald-400 font-bold text-[10px]">VIGENTE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
