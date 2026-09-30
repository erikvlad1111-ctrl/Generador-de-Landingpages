'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Printer
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: LanguageType;
  initialTab?: 'terms' | 'cancellation' | 'privacy' | 'license';
  agencyName?: string;
  agencyRuc?: string;
}

const DICTS = {
  es: {
    title: 'Información Legal & Normativa Turística',
    subtitle: 'Marco legal oficial de contratación turística, políticas de viaje y protección de datos en el Perú.',
    tabTerms: 'Términos y Condiciones',
    tabCancellation: 'Políticas de Cancelación',
    tabPrivacy: 'Protección de Datos (Ley 29733)',
    tabLicense: 'Acreditaciones & DIRCETUR',
    closeBtn: 'Cerrar',
    printBtn: 'Imprimir',
    termsTitle: 'Términos y Condiciones Generales de Servicio',
    termsIntro: 'El presente contrato regula los términos aplicables a las reservas, traslados y guiados contratados con nuestra agencia operadora autorizada.',
    termsSections: [
      {
        h: '1. Reservas y Confirmación de Salidas',
        p: 'Toda reserva queda formalizada tras la confirmación de disponibilidad y el pago del anticipo correspondiente. Los vouchers digitales emitidos son de carácter personal e intransferible.'
      },
      {
        h: '2. Documentación de Viaje Requerida',
        p: 'Es responsabilidad obligatoria del pasajero portar documento de identidad original vigente (DNI para peruanos o Pasaporte original / Carné de Extranjería para extranjeros) en todas las rutas hacia Machu Picchu, Camino Inca y aeropuertos.'
      },
      {
        h: '3. Salud, Altitud y Aptitud Física',
        p: 'Nuestras excursiones operan entre 2,800 y 5,036 msnm. El viajero debe informar cualquier condición médica preexistente. Contamos con botiquín de primeros auxilios y oxígeno medicinal de emergencia en todas las unidades y expediciones.'
      },
      {
        h: '4. Seguros de Asistencia al Viajero',
        p: 'Nuestras tarifas incluyen Seguro Obligatorio de Accidentes de Tránsito (SOAT) en traslados terrestres y asistencia de primeros auxilios en ruta. Se recomienda contar con seguro médico internacional complementario para trekking de alta montaña.'
      }
    ],
    cancelTitle: 'Políticas de Cancelación, Devolución y Reprogramación',
    cancelIntro: 'Reguladas bajo los estándares de la Ley General de Turismo del Perú y las normativas específicas de SERNANP, MINCUL y empresas ferroviarias.',
    cancelSections: [
      {
        h: '1. Cancelaciones con Más de 72 Horas de Anticipación',
        p: 'Para tours diarios clásicos (City Tour, Valle Sagrado, Maras Moray), el pasajero podrá reprogramar la fecha sin penalidad o solicitar reembolso con una retención administrativa del 10%.'
      },
      {
        h: '2. Boletos de Tren y Entradas a Machu Picchu / Camino Inca',
        p: 'IMPORTANTE: Conforme a la estricta regulación oficial de SERNANP, Ministerio de Cultura y empresas de tren (PeruRail / Inca Rail), los boletos nominativos son 100% NO REEMBOLSABLES ni transferibles una vez emitidos.'
      },
      {
        h: '3. No Show (Inasistencia el Día de la Salida)',
        p: 'La inasistencia a la hora y lugar fijados de recojo sin previo aviso implica la pérdida total del servicio contratado (100% de penalidad).'
      },
      {
        h: '4. Fuerza Mayor y Condiciones Meteorológicas',
        p: 'En caso de huelgas, paros cívicos o fenómenos climáticos extremos que impidan la salida, la agencia coordinará rutas alternas de igual valor o reprogramación inmediata priorizando la seguridad física del viajero.'
      }
    ],
    privacyTitle: 'Política de Protección de Datos Personales (Ley N° 29733)',
    privacyIntro: 'En estricto cumplimiento de la Ley N° 29733 de la República del Perú y su Reglamento (D.S. 003-2013-JUS):',
    privacySections: [
      {
        h: '1. Finalidad del Tratamiento',
        p: 'Los datos recabados (nombres, pasaporte, correo, teléfono) se utilizan exclusivamente para la emisión de boletos de tren, entradas a monumentos arqueológicos oficiales y coordinación logística del tour.'
      },
      {
        h: '2. Confidencialidad y Seguridad',
        p: 'Aplicamos protocolos de seguridad informática y cifrado SSL de 256 bits para resguardar la información bancaria y de contacto. No comercializamos bases de datos a terceros bajo ninguna circunstancia.'
      },
      {
        h: '3. Ejercicio de Derechos ARCO',
        p: 'El titular de los datos puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición remitiendo una solicitud formal a nuestro correo electrónico oficial.'
      }
    ],
    licenseTitle: 'Registro Nacional de Turismo & Cumplimiento DIRCETUR',
    licenseIntro: 'Operador debidamente registrado y fiscalizado por las autoridades turísticas del Perú:',
    licenseItems: [
      { label: 'DIRCETUR Cusco', val: 'Licencia Oficial de Agencia de Viajes y Turismo N° 2026-CC-EXP' },
      { label: 'MINCETUR Perú', val: 'Prestador Registrado en el Directorio Nacional de Servicios Turísticos' },
      { label: 'SERNANP', val: 'Operador Autorizado Red de Caminos Inca y Santuario Histórico de Machu Picchu' },
      { label: 'COLITUR Cusco', val: '100% Guías Oficiales Colegiados y Acreditados con Carnet Vigente' },
      { label: 'Sello Internacional', val: 'Certificación Safe Travels de Bioseguridad y Turismo Seguro' }
    ]
  },
  en: {
    title: 'Legal Terms & Tourism Regulations',
    subtitle: 'Official legal framework for travel services, cancellation policies, and personal data protection in Peru.',
    tabTerms: 'Terms & Conditions',
    tabCancellation: 'Cancellation Policies',
    tabPrivacy: 'Data Privacy (Law 29733)',
    tabLicense: 'Licensing & Compliance',
    closeBtn: 'Close',
    printBtn: 'Print',
    termsTitle: 'General Terms and Conditions of Travel Services',
    termsIntro: 'These conditions govern reservations, tours, and services contracted with our authorized travel agency.',
    termsSections: [
      {
        h: '1. Bookings and Departures Confirmation',
        p: 'All bookings are confirmed upon verified availability and advance payment. Issued travel vouchers are strictly nominative and non-transferable.'
      },
      {
        h: '2. Mandatory Travel Documentation',
        p: 'Travelers are legally required to carry their physical original valid passport or immigration card on all routes to Machu Picchu, Inca Trail, and domestic transportation.'
      },
      {
        h: '3. Altitude, Fitness, and Health',
        p: 'Our Andean excursions operate between 2,800m and 5,036m (9,200ft to 16,500ft). Pre-existing medical conditions must be disclosed. Emergency altitude oxygen tanks and wilderness first aid kits are carried on all vehicles and trekking routes.'
      },
      {
        h: '4. Travel Insurance Coverage',
        p: 'Fares include Peruvian mandatory vehicular transit accident insurance (SOAT) and on-route wilderness first aid. Comprehensive international travel & medical insurance is strongly advised for high-altitude trekking.'
      }
    ],
    cancelTitle: 'Cancellation, Refund & Rescheduling Policies',
    cancelIntro: 'Regulated under the Peruvian General Tourism Act and specific regulations of SERNANP, Ministry of Culture, and railway operators.',
    cancelSections: [
      {
        h: '1. Notice Prior to 72 Hours',
        p: 'For standard day tours, travelers may reschedule without penalty or request a refund minus a 10% administrative processing fee.'
      },
      {
        h: '2. Train Tickets & Machu Picchu / Inca Trail Entry Passes',
        p: 'CRITICAL NOTE: Pursuant to official government regulations (SERNANP, Peruvian Ministry of Culture) and railway carriers (PeruRail / Inca Rail), nominative train and sanctuary tickets are 100% NON-REFUNDABLE and strictly non-transferable.'
      },
      {
        h: '3. No Show',
        p: 'Failure to arrive at the designated pickup location and time without prior notice entails 100% service cancellation penalty.'
      },
      {
        h: '4. Force Majeure & Severe Weather',
        p: 'In cases of road blockades or severe weather that compromise traveler safety, the agency will coordinate alternative itineraries of equal value or rescheduling.'
      }
    ],
    privacyTitle: 'Personal Data Protection Policy (Peruvian Law 29733)',
    privacyIntro: 'In compliance with Peruvian Personal Data Protection Law No. 29733 and Supreme Decree 003-2013-JUS:',
    privacySections: [
      {
        h: '1. Purpose of Processing',
        p: 'Collected personal data is strictly utilized for official train ticketing, Machu Picchu permits, and direct tour coordination.'
      },
      {
        h: '2. Confidentiality & Security',
        p: 'We enforce 256-bit SSL encryption and strict data privacy standards. We do not sell or disclose customer data to commercial third parties.'
      },
      {
        h: '3. Data Subject Rights (ARCO)',
        p: 'You may exercise your rights of Access, Rectification, Cancellation, and Opposition at any time by emailing our compliance office.'
      }
    ],
    licenseTitle: 'National Tourism Registry & DIRCETUR Compliance',
    licenseIntro: 'Fully accredited and inspected operator by Peruvian government tourism authorities:',
    licenseItems: [
      { label: 'DIRCETUR Cusco', val: 'Official Travel Agency & Tour Operator License No. 2026-CC-EXP' },
      { label: 'MINCETUR Peru', val: 'Registered Provider in the National Tourism Service Directory' },
      { label: 'SERNANP', val: 'Authorized Inca Trail & Machu Picchu Historic Sanctuary Operator' },
      { label: 'COLITUR Cusco', val: '100% Certified Official Tour Guides with Valid Professional Credentials' },
      { label: 'International Stamp', val: 'Safe Travels Global Health and Safety Hygiene Protocol Stamp' }
    ]
  },
  pt: {
    title: 'Informações Legais & Regulamentação Turística',
    subtitle: 'Estrutura legal oficial para serviços de viagem, políticas de cancelamento e proteção de dados no Peru.',
    tabTerms: 'Termos e Condições',
    tabCancellation: 'Políticas de Cancelamento',
    tabPrivacy: 'Proteção de Dados (Lei 29733)',
    tabLicense: 'Licenciamento & DIRCETUR',
    closeBtn: 'Fechar',
    printBtn: 'Imprimir',
    termsTitle: 'Termos Gerais de Serviços Turísticos',
    termsIntro: 'Estas condições regulam as reservas e passeios contratados com nossa agência credenciada.',
    termsSections: [
      {
        h: '1. Reservas e Confirmação',
        p: 'Todas as reservas são confirmadas mediante pagamento antecipado e disponibilidade. Os vouchers emitidos são nominais e intransferíveis.'
      },
      {
        h: '2. Documentação Obrigatória',
        p: 'O passageiro deve portar passaporte original válido ou RG para todas as viagens rumo a Machu Picchu e Camino Inca.'
      },
      {
        h: '3. Altitude e Saúde',
        p: 'Nossos passeios operam em altitudes elevadas. Dispomos de oxigênio medicinal e kit de primeiros socorros em todas as expedições.'
      },
      {
        h: '4. Seguro Viagem',
        p: 'Recomendamos seguro médico internacional para atividades de montanha e trekking.'
      }
    ],
    cancelTitle: 'Políticas de Cancelamento e Reembolso',
    cancelIntro: 'Regulamentado pela Lei Geral do Turismo do Peru e normas do SERNANP e Ministério da Cultura.',
    cancelSections: [
      {
        h: '1. Cancelamento com mais de 72 horas',
        p: 'Para passeios tradicionais, é possível reagendar sem custos adicionais.'
      },
      {
        h: '2. Bilhetes de Trem e Ingressos a Machu Picchu',
        p: 'Ingressos nominativos para Machu Picchu e bilhetes de trem são 100% NÃO REEMBOLSÁVEIS pelas normas do governo peruano.'
      },
      {
        h: '3. No Show',
        p: 'O não comparecimento sem aviso prévio resulta na perda total do serviço.'
      }
    ],
    privacyTitle: 'Proteção de Dados Pessoais (Lei Peruana Nº 29733)',
    privacyIntro: 'Seus dados pessoais são protegidos com sigilo e segurança criptografada.',
    privacySections: [
      {
        h: '1. Uso dos Dados',
        p: 'Utilizados exclusivamente para emissão de ingressos oficiais e coordenação logística.'
      },
      {
        h: '2. Direitos do Titular',
        p: 'Você pode solicitar correção ou exclusão a qualquer momento.'
      }
    ],
    licenseTitle: 'Registro Nacional de Turismo',
    licenseIntro: 'Operador devidamente autorizado pelas autoridades de turismo do Peru:',
    licenseItems: [
      { label: 'DIRCETUR Cusco', val: 'Licença Oficial de Agência de Turismo Nº 2026-CC-EXP' },
      { label: 'MINCETUR Peru', val: 'Operador Registrado no Diretório Nacional de Turismo' },
      { label: 'Safe Travels', val: 'Selo Internacional de Turismo Seguro' }
    ]
  },
  fr: {
    title: 'Mentions Légales & Réglementation Touristique',
    subtitle: 'Cadre juridique officiel des prestations touristiques et protection des données au Pérou.',
    tabTerms: 'Conditions Générales',
    tabCancellation: 'Politique d’Annulation',
    tabPrivacy: 'Protection des Données',
    tabLicense: 'Agréments & DIRCETUR',
    closeBtn: 'Fermer',
    printBtn: 'Imprimer',
    termsTitle: 'Conditions Générales de Vente',
    termsIntro: 'Ces conditions encadrent les prestations de voyage et d’excursion au Pérou.',
    termsSections: [
      {
        h: '1. Réservations et Billetterie',
        p: 'Les réservations sont fermes dès réception de l’acompte et confirmation des disponibilités.'
      },
      {
        h: '2. Passeport et Identité',
        p: 'Le passeport original en cours de validité est obligatoire pour tous les accès au Machu Picchu.'
      }
    ],
    cancelTitle: 'Modalités d’Annulation et de Report',
    cancelIntro: 'Conforme aux réglementations officielles du Ministère péruvien de la Culture et du SERNANP.',
    cancelSections: [
      {
        h: '1. Billets Machu Picchu et Trains',
        p: 'Les billets nominatifs officiels sont strictement NON REMBOURSABLES et non cessibles.'
      }
    ],
    privacyTitle: 'Protection des Données Personnelles (Loi 29733)',
    privacyIntro: 'Vos informations sont traitées dans le respect du secret professionnel et de la réglementation péruvienne.',
    privacySections: [
      {
        h: '1. Utilisation',
        p: 'Exclusivement pour l’émission des titres de transport et pass officiels.'
      }
    ],
    licenseTitle: 'Agréments Officiels',
    licenseIntro: 'Agence agréée par le Ministère péruvien du Tourisme :',
    licenseItems: [
      { label: 'DIRCETUR Cusco', val: 'Licence Officielle d’Agence Réceptive N° 2026-CC-EXP' },
      { label: 'MINCETUR', val: 'Enregistrement au Répertoire National du Tourisme' }
    ]
  },
  it: {
    title: 'Informazioni Legali & Normativa Turistica',
    subtitle: 'Quadro normativo per le prenotazioni turistiche e protezione dei dati in Perù.',
    tabTerms: 'Termini e Condizioni',
    tabCancellation: 'Politiche di Cancellazione',
    tabPrivacy: 'Protezione Dati (Legge 29733)',
    tabLicense: 'Licenze & DIRCETUR',
    closeBtn: 'Chiudi',
    printBtn: 'Stampa',
    termsTitle: 'Termini e Condizioni Generali di Contratto',
    termsIntro: 'Condizioni applicabili a tutti i servizi di escursione e trekking in Perù.',
    termsSections: [
      {
        h: '1. Prenotazioni',
        p: 'Le prenotazioni si intendono confermate con il saldo dell’anticipo e l’emissione del voucher.'
      },
      {
        h: '2. Documentazione Obbligatoria',
        p: 'È obbligatorio presentare il passaporto originale in corso di validità per tutti gli accessi a Machu Picchu.'
      }
    ],
    cancelTitle: 'Politiche di Cancellazione e Rimborsi',
    cancelIntro: 'In accordo con le norme SERNANP e del Ministero della Cultura del Perù.',
    cancelSections: [
      {
        h: '1. Biglietti Machu Picchu e Treni',
        p: 'I biglietti nominativi per il santuario e i treni sono al 100% NON RIMBORSABILI per disposizioni governative.'
      }
    ],
    privacyTitle: 'Trattamento dei Dati Personali (Legge 29733)',
    privacyIntro: 'I dati personali sono protetti con standard crittografici conformi alle leggi peruviane.',
    privacySections: [
      {
        h: '1. Finalità',
        p: 'Utilizzo esclusivo per l’acquisto dei titoli di accesso e coordinamento del viaggio.'
      }
    ],
    licenseTitle: 'Autorizzazioni Ufficiali',
    licenseIntro: 'Operatore registrato presso gli enti turistici peruviani:',
    licenseItems: [
      { label: 'DIRCETUR Cusco', val: 'Licenza Ufficiale di Agenzia di Viaggi N° 2026-CC-EXP' },
      { label: 'Safe Travels', val: 'Certificazione Internazionale di Sicurezza Turistica' }
    ]
  }
};

export default function LegalTermsModal({
  isOpen,
  onClose,
  lang = 'es',
  initialTab = 'terms',
  agencyName = 'Cusco Creativos Operador Turístico S.A.C.',
  agencyRuc = '20608945123'
}: LegalTermsModalProps) {
  const t = DICTS[lang] || DICTS.es;
  const [activeTab, setActiveTab] = useState<'terms' | 'cancellation' | 'privacy' | 'license'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-900 dark:text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-300 dark:border-blue-800">
                  {agencyName} • RUC {agencyRuc}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-stone-900 dark:text-white mt-0.5">
                {t.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/50 px-4 sm:px-6 overflow-x-auto gap-2 shrink-0 py-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <FileText size={14} />
            <span>{t.tabTerms}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cancellation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'cancellation'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <AlertTriangle size={14} />
            <span>{t.tabCancellation}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <Lock size={14} />
            <span>{t.tabPrivacy}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('license')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'license'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <Scale size={14} />
            <span>{t.tabLicense}</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="text-base font-black text-stone-900 dark:text-white">{t.termsTitle}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">{t.termsIntro}</p>
              </div>
              <div className="space-y-4">
                {t.termsSections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-1">
                    <h4 className="font-black text-stone-900 dark:text-white text-xs sm:text-sm">{sec.h}</h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{sec.p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cancellation' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="text-base font-black text-stone-900 dark:text-white">{t.cancelTitle}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">{t.cancelIntro}</p>
              </div>
              <div className="space-y-4">
                {t.cancelSections.map((sec, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border space-y-1 ${
                    idx === 1 
                      ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800' 
                      : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800'
                  }`}>
                    <h4 className="font-black text-stone-900 dark:text-white text-xs sm:text-sm">{sec.h}</h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{sec.p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="text-base font-black text-stone-900 dark:text-white">{t.privacyTitle}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">{t.privacyIntro}</p>
              </div>
              <div className="space-y-4">
                {t.privacySections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-1">
                    <h4 className="font-black text-stone-900 dark:text-white text-xs sm:text-sm">{sec.h}</h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{sec.p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="text-base font-black text-stone-900 dark:text-white">{t.licenseTitle}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">{t.licenseIntro}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.licenseItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-black text-stone-900 dark:text-white text-xs">{item.label}</span>
                      <span className="text-stone-600 dark:text-stone-300 text-xs leading-tight block mt-0.5">{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold text-xs text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>{t.printBtn}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
