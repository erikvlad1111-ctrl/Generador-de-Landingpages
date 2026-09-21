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
  officeAddress?: string;
  officeHours?: string;
  mapsUrl?: string;
}

export default function TrustGuaranteeAndOffice({
  lang = 'es',
  whatsapp = '+51984123456',
  brandName = 'Cusco Tours Oficial',
  isMobile = false,
  officeAddress,
  officeHours,
  mapsUrl
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
      addressValue: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Perú',
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
  const effectiveAddress = officeAddress || t.addressValue;
  const effectiveHours = officeHours || t.hoursValue;
  const effectiveMapsUrl = mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(effectiveAddress)}`;
  
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
      <section className="py-12 sm:py-20 bg-[#161412] text-white rounded-[36px] mx-3 sm:mx-6 p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Columna Izquierda: Información de Contacto y Atención */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
                <Building2 size={13} className="text-amber-400" /> {t.officeBadge}
              </span>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {t.officeTitle}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t.officeSubtitle}
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3.5 bg-stone-900/90 hover:bg-stone-900 p-4 rounded-2xl border border-stone-800 transition-all shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5500]/15 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-stone-200 block text-xs">{t.addressTitle}</span>
                    <span className="text-stone-300 text-xs leading-relaxed block">{effectiveAddress}</span>
                    <span className="inline-block text-[10px] text-amber-400 font-semibold pt-0.5">Centro Histórico • A 1 min de la Plaza de Armas</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-stone-900/90 hover:bg-stone-900 p-4 rounded-2xl border border-stone-800 transition-all shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-stone-200 block text-xs">{t.hoursTitle}</span>
                    <span className="text-stone-300 text-xs block">{effectiveHours}</span>
                    <span className="inline-block text-[10px] text-emerald-400 font-semibold pt-0.5">● Abierto hoy (Atención Continua)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-stone-900/90 hover:bg-stone-900 p-4 rounded-2xl border border-stone-800 transition-all shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-stone-200 block text-xs">{t.directPhone}</span>
                    <span className="text-amber-400 font-mono font-black text-sm">{whatsapp}</span>
                    <span className="text-[10px] text-stone-400 block pt-0.5">Recepción telefónica y WhatsApp oficial</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons & Sello */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-3">
                <a
                  href={effectiveMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[170px] bg-white hover:bg-stone-100 text-stone-900 font-black px-5 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl cursor-pointer active:scale-98"
                >
                  <Navigation size={15} className="text-[#FF5500]" />
                  {t.openMapsBtn}
                </a>

                <a
                  href={waOfficeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[170px] bg-[#FF5500] hover:bg-[#e04b00] text-white font-black px-5 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF5500]/30 hover:shadow-[#FF5500]/50 cursor-pointer active:scale-98"
                >
                  <MessageCircle size={15} />
                  {t.contactDeskBtn}
                </a>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-emerald-400 shrink-0" />
                  <span className="text-stone-300 font-semibold text-[11px]">Licencia Municipal N° 04821 • DIRCETUR</span>
                </div>
                <span className="text-emerald-400 font-black text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
                  VIGENTE
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Gran Mapa Interactivo Ampliado y Enmarcado */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-stone-950/90 border border-stone-800 hover:border-stone-700/80 rounded-3xl p-4 sm:p-5 flex-1 flex flex-col space-y-3.5 shadow-2xl transition-all">
              {/* Barra Superior del Mapa */}
              <div className="flex items-center justify-between text-xs pb-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-bold text-white text-xs">
                    Google Maps en Tiempo Real
                  </span>
                </div>

                <a
                  href={effectiveMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Abrir en Pantalla Completa</span>
                  <ExternalLink size={12} className="text-[#FF5500]" />
                </a>
              </div>

              {/* Contenedor del Mapa Ampliado */}
              <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 group shadow-inner">
                <iframe
                  title="Ubicación de la Agencia en Google Maps"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(effectiveAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0 opacity-95 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Badge flotante con nombre de oficina */}
                <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700/80 shadow-lg flex items-center gap-2 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                  <span className="text-white text-xs font-black">
                    Sede Oficial en Cusco
                  </span>
                </div>

                {/* Botón flotante 'Cómo Llegar' */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(effectiveAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-stone-950/90 hover:bg-black text-white text-xs font-extrabold px-3.5 py-2 rounded-xl border border-stone-700 shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Navigation size={13} className="text-[#FF5500]" />
                  <span>Cómo Llegar (Ruta)</span>
                </a>
              </div>

              {/* Barra Inferior del Mapa */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2 pt-1 px-1">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <MapPin size={12} className="text-[#FF5500]" />
                  {effectiveAddress}
                </span>
                <span className="text-[10px] text-stone-500 italic">
                  * Puedes arrastrar y hacer zoom sobre el mapa
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
