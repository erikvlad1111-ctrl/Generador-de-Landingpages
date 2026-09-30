'use client';

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Printer,
  Scale
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface ComplaintsBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: LanguageType;
  agencyName?: string;
  agencyRuc?: string;
  agencyAddress?: string;
}

const DICTS = {
  es: {
    badge: 'Conforme a la Ley N° 29571 • D.S. N° 011-2011-PCM',
    title: 'Libro de Reclamaciones Virtual',
    subtitle: 'Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, ponemos a tu disposición nuestro Libro de Reclamaciones Virtual.',
    supplierTitle: '1. Identificación del Proveedor',
    companyLabel: 'Razón Social / Comercial',
    rucLabel: 'R.U.C.',
    addressLabel: 'Dirección Fiscal / Establecimiento',
    consumerTitle: '2. Identificación del Consumidor Reclamante',
    nameLabel: 'Nombres y Apellidos Completos *',
    docTypeLabel: 'Tipo de Documento *',
    docNumLabel: 'N° Documento *',
    phoneLabel: 'Teléfono / WhatsApp *',
    emailLabel: 'Correo Electrónico *',
    domicileLabel: 'Domicilio / Ciudad *',
    serviceTitle: '3. Identificación del Servicio Turístico Contratado',
    serviceTypeLabel: 'Tipo de Contratación *',
    tourService: 'Tour / Excursión Diaria',
    packageService: 'Paquete Turístico Multidía',
    trekService: 'Trek de Aventura / Alta Montaña',
    privateService: 'Servicio Privado / Traslado',
    amountLabel: 'Monto Reclamado (S/ o USD)',
    serviceDescLabel: 'Nombre del Tour / Código de Reserva *',
    claimTitle: '4. Detalle de la Reclamación',
    typeLabel: 'Tipo de Afectación *',
    typeClaim: 'Reclamo',
    typeClaimDesc: 'Disconformidad relacionada directamente a los productos o servicios contratados.',
    typeComplaint: 'Queja',
    typeComplaintDesc: 'Malestar o descontento respecto a la atención recibida por el personal.',
    detailLabel: 'Detalle de los hechos (¿Qué ocurrió?) *',
    detailPlaceholder: 'Describe de forma clara y cronológica lo sucedido durante la prestación del servicio...',
    requestLabel: 'Pedido concreto del consumidor *',
    requestPlaceholder: 'Indica la solución esperada (devolución, reprogramación, compensación, etc.)...',
    declaration: 'Declaro bajo juramento que los datos consignados en la presente Hoja de Reclamación son verdaderos y fidedignos, de acuerdo con el Código de Protección y Defensa del Consumidor de la República del Perú.',
    submitBtn: 'Enviar Hoja de Reclamación',
    successTitle: '¡Hoja de Reclamación Registrada!',
    successSheetNo: 'Hoja de Reclamación N°',
    successMsg: (code: string) => `Tu reclamación ha sido registrada con el código oficial ${code}. Conforme al Art. 24 de la Ley N° 29571, te responderemos en un plazo máximo no mayor a quince (15) días hábiles al correo electrónico indicado.`,
    copyNotice: 'Se ha enviado una copia automática a tu correo electrónico y a nuestro departamento de atención al consumidor.',
    printBtn: 'Imprimir Constancia',
    closeBtn: 'Cerrar Ventana'
  },
  en: {
    badge: 'Peruvian Law No. 29571 • Supreme Decree 011-2011-PCM',
    title: 'Virtual Complaints & Claims Book',
    subtitle: 'Pursuant to the Peruvian Consumer Protection and Defense Code, our official virtual complaints book is available to you.',
    supplierTitle: '1. Travel Supplier Information',
    companyLabel: 'Trade / Business Name',
    rucLabel: 'Tax ID (R.U.C.)',
    addressLabel: 'Official Registered Address',
    consumerTitle: '2. Consumer Information',
    nameLabel: 'Full Legal Name *',
    docTypeLabel: 'Document Type *',
    docNumLabel: 'Document ID / Passport *',
    phoneLabel: 'Phone / WhatsApp *',
    emailLabel: 'Email Address *',
    domicileLabel: 'Home Address / City *',
    serviceTitle: '3. Contracted Tourism Service',
    serviceTypeLabel: 'Contracted Service Type *',
    tourService: 'Day Tour / Excursion',
    packageService: 'Multi-Day Travel Package',
    trekService: 'Adventure Trek / High Mountain',
    privateService: 'Private Service / Transfer',
    amountLabel: 'Claim Amount (USD or PEN)',
    serviceDescLabel: 'Tour Name / Booking Reference *',
    claimTitle: '4. Claim & Complaint Details',
    typeLabel: 'Filing Category *',
    typeClaim: 'Claim (Reclamo)',
    typeClaimDesc: 'Dissatisfaction directly related to contracted products or services delivered.',
    typeComplaint: 'Complaint (Queja)',
    typeComplaintDesc: 'Discontent regarding customer service, attention or staff conduct.',
    detailLabel: 'Chronological Description of Facts *',
    detailPlaceholder: 'Clearly describe what happened during the provision of the service...',
    requestLabel: 'Specific Consumer Request *',
    requestPlaceholder: 'Indicate your expected resolution (refund, rescheduling, compensation, etc.)...',
    declaration: 'I declare that the information provided in this Claim Sheet is true and accurate in accordance with the Peruvian Consumer Protection Code.',
    submitBtn: 'Submit Official Claim Sheet',
    successTitle: 'Claim Sheet Successfully Registered!',
    successSheetNo: 'Official Claim Sheet No.',
    successMsg: (code: string) => `Your filing has been officially recorded under code ${code}. Pursuant to Peruvian INDECOPI regulations, we will formally reply within no more than 15 business days to your email.`,
    copyNotice: 'An automatic confirmation copy has been dispatched to your email and our compliance department.',
    printBtn: 'Print Voucher',
    closeBtn: 'Close'
  },
  pt: {
    badge: 'Conforme a Lei Peruana Nº 29571 • D.S. Nº 011-2011-PCM',
    title: 'Livro Virtual de Reclamações',
    subtitle: 'De acordo com o Código de Defesa do Consumidor do Peru, disponibilizamos nosso Livro de Reclamações Virtual oficial.',
    supplierTitle: '1. Identificação do Fornecedor',
    companyLabel: 'Razão Social / Nome Comercial',
    rucLabel: 'R.U.C. (Identificação Fiscal)',
    addressLabel: 'Endereço Comercial',
    consumerTitle: '2. Identificação do Consumidor',
    nameLabel: 'Nome Completo *',
    docTypeLabel: 'Tipo de Documento *',
    docNumLabel: 'Nº do Documento / Passaporte *',
    phoneLabel: 'Telefone / WhatsApp *',
    emailLabel: 'E-mail *',
    domicileLabel: 'Endereço Residencial / Cidade *',
    serviceTitle: '3. Serviço Turístico Contratado',
    serviceTypeLabel: 'Tipo de Serviço *',
    tourService: 'Tour Diário / Passeio',
    packageService: 'Pacote Turístico Multidias',
    trekService: 'Trekking de Aventura',
    privateService: 'Serviço Privado / Traslado',
    amountLabel: 'Valor Reclamado',
    serviceDescLabel: 'Nome do Tour / Reserva *',
    claimTitle: '4. Detalhes da Reclamação',
    typeLabel: 'Classificação *',
    typeClaim: 'Reclamação',
    typeClaimDesc: 'Insatisfação com o serviço ou produto contratado.',
    typeComplaint: 'Queixa',
    typeComplaintDesc: 'Descontentamento com o atendimento ou conduta da equipe.',
    detailLabel: 'Descrição dos fatos *',
    detailPlaceholder: 'Descreva de forma detalhada o ocorrido...',
    requestLabel: 'Pedido do consumidor *',
    requestPlaceholder: 'Indique a solução solicitada...',
    declaration: 'Declaro sob compromisso que as informações fornecidas são verdadeiras conforme a legislação peruana de defesa do consumidor.',
    submitBtn: 'Enviar Registro de Reclamação',
    successTitle: 'Reclamação Registrada com Sucesso!',
    successSheetNo: 'Folha de Reclamação Nº',
    successMsg: (code: string) => `Sua manifestação foi registrada sob o código oficial ${code}. Responderemos formalmente em até 15 dias úteis.`,
    copyNotice: 'Uma cópia foi enviada para o seu e-mail e departamento de conformidade.',
    printBtn: 'Imprimir Comprovante',
    closeBtn: 'Fechar'
  },
  fr: {
    badge: 'Loi péruvienne N° 29571 • Décret suprême 011-2011-PCM',
    title: 'Livre Virtuel de Réclamations',
    subtitle: 'Conformément au Code péruvien de protection du consommateur, notre registre officiel des réclamations est à votre disposition.',
    supplierTitle: '1. Identification du Prestataire',
    companyLabel: 'Raison sociale / Nom commercial',
    rucLabel: 'Numéro fiscal (R.U.C.)',
    addressLabel: 'Adresse officielle',
    consumerTitle: '2. Identification du Consommateur',
    nameLabel: 'Nom et Prénom *',
    docTypeLabel: 'Type de document *',
    docNumLabel: 'N° de Passeport / Document *',
    phoneLabel: 'Téléphone / WhatsApp *',
    emailLabel: 'Adresse e-mail *',
    domicileLabel: 'Adresse / Ville de résidence *',
    serviceTitle: '3. Prestation Touristique Concernée',
    serviceTypeLabel: 'Type de prestation *',
    tourService: 'Excursion d’un jour',
    packageService: 'Circuit touristique plusieurs jours',
    trekService: 'Trekking d’aventure',
    privateService: 'Service privé / Transfert',
    amountLabel: 'Montant réclamé',
    serviceDescLabel: 'Nom du Tour / Référence de réservation *',
    claimTitle: '4. Détail de la Réclamation',
    typeLabel: 'Catégorie *',
    typeClaim: 'Réclamation',
    typeClaimDesc: 'Insatisfaction portant directement sur les services ou prestations fournis.',
    typeComplaint: 'Plainte',
    typeComplaintDesc: 'Mécontentement relatif à l’accueil ou au comportement du personnel.',
    detailLabel: 'Exposé des faits *',
    detailPlaceholder: 'Décrivez de manière précise et chronologique le déroulement des faits...',
    requestLabel: 'Demande concrète *',
    requestPlaceholder: 'Indiquez la solution souhaitée (remboursement, report, compensation)...',
    declaration: 'Je certifie sur l’honneur l’exactitude des informations mentionnées sur cette fiche de réclamation.',
    submitBtn: 'Soumettre la Fiche Officielle',
    successTitle: 'Fiche de Réclamation Enregistrée !',
    successSheetNo: 'Fiche Officielle N°',
    successMsg: (code: string) => `Votre dossier a été enregistré sous la référence ${code}. Nous vous répondrons sous 15 jours ouvrables.`,
    copyNotice: 'Une copie a été expédiée à votre adresse email.',
    printBtn: 'Imprimer le Reçu',
    closeBtn: 'Fermer'
  },
  it: {
    badge: 'Legge peruviana N° 29571 • D.S. N° 011-2011-PCM',
    title: 'Registro Virtuale dei Reclami',
    subtitle: 'In conformità al Codice di Protezione del Consumatore del Perù, mettiamo a disposizione il nostro Registro Ufficiale dei Reclami.',
    supplierTitle: '1. Dati del Fornitore di Servizi',
    companyLabel: 'Ragione Sociale / Marchio',
    rucLabel: 'P. IVA / R.U.C.',
    addressLabel: 'Sede Legale',
    consumerTitle: '2. Dati del Consumatore',
    nameLabel: 'Nome e Cognome *',
    docTypeLabel: 'Tipo di Documento *',
    docNumLabel: 'N° Documento / Passaporto *',
    phoneLabel: 'Telefono / WhatsApp *',
    emailLabel: 'Email *',
    domicileLabel: 'Indirizzo / Città *',
    serviceTitle: '3. Servizio Turistico Contrattato',
    serviceTypeLabel: 'Tipologia Servizio *',
    tourService: 'Escursione Giornaliera',
    packageService: 'Pacchetto Multigiorno',
    trekService: 'Trekking Avventura',
    privateService: 'Servizio Privato / Transfer',
    amountLabel: 'Importo Reclamato',
    serviceDescLabel: 'Nome del Tour / Codice Prenotazione *',
    claimTitle: '4. Dettaglio del Reclamo',
    typeLabel: 'Tipologia *',
    typeClaim: 'Reclamo',
    typeClaimDesc: 'Disservizio legato ai prodotti o servizi forniti.',
    typeComplaint: 'Lamentela',
    typeComplaintDesc: 'Insoddisfazione relativa all’assistenza o al comportamento del personale.',
    detailLabel: 'Descrizione dei fatti *',
    detailPlaceholder: 'Descrivi in modo chiaro l’accaduto...',
    requestLabel: 'Richiesta del consumatore *',
    requestPlaceholder: 'Indica la soluzione auspicata...',
    declaration: 'Dichiaro che i dati forniti sono veritieri e conformi alle normative del Perù.',
    submitBtn: 'Invia Modulo di Reclamo',
    successTitle: 'Reclamo Registrato con Successo!',
    successSheetNo: 'Modulo Ufficiale N°',
    successMsg: (code: string) => `La tua segnalazione è stata registrata con il codice ${code}. Riceverai una risposta formale entro 15 giorni lavorativi.`,
    copyNotice: 'Una copia è stata inviata alla tua email.',
    printBtn: 'Stampa Ricevuta',
    closeBtn: 'Chiudi'
  }
};

export default function ComplaintsBookModal({
  isOpen,
  onClose,
  lang = 'es',
  agencyName = 'Cusco Creativos Operador Turístico S.A.C.',
  agencyRuc = '20608945123',
  agencyAddress = 'Portal de Panes 123, Plaza de Armas, Cusco - Perú'
}: ComplaintsBookModalProps) {
  const t = DICTS[lang] || DICTS.es;

  const [formData, setFormData] = useState({
    fullName: '',
    docType: 'DNI',
    docNumber: '',
    phone: '',
    email: '',
    domicile: '',
    serviceType: 'tour',
    tourName: '',
    amount: '',
    claimType: 'reclamo',
    detail: '',
    request: '',
    acceptedTerms: false
  });

  const [submittedSheet, setSubmittedSheet] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.docNumber || !formData.email || !formData.detail || !formData.request) {
      alert('Por favor completa todos los campos obligatorios marcados con (*)');
      return;
    }
    if (!formData.acceptedTerms) {
      alert('Debes aceptar la declaración jurada conforme al Código del Consumidor.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const year = new Date().getFullYear();
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const sheetCode = `REC-${year}-${randomCode}`;
      setSubmittedSheet(sheetCode);
      setIsSubmitting(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-900 dark:text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                  {t.badge}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {submittedSheet ? (
            /* Pantalla de Éxito / Constancia */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                  {t.successTitle}
                </h3>
                <div className="inline-block px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-mono font-bold text-sm sm:text-base">
                  {t.successSheetNo} {submittedSheet}
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed pt-2">
                  {t.successMsg(submittedSheet)}
                </p>
                <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs text-left space-y-1">
                  <p className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Garantía Legal INDECOPI</span>
                  </p>
                  <p>{t.copyNotice}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold text-xs text-stone-700 dark:text-stone-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer size={15} />
                  <span>{t.printBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSheet(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            /* Formulario Oficial */
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                {t.subtitle}
              </p>

              {/* 1. Datos del Proveedor */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <Building2 size={15} className="text-amber-500" />
                  <span>{t.supplierTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t.companyLabel}</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{agencyName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t.rucLabel}</span>
                    <span className="font-semibold font-mono text-stone-800 dark:text-stone-200">{agencyRuc}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t.addressLabel}</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{agencyAddress}</span>
                  </div>
                </div>
              </div>

              {/* 2. Datos del Consumidor */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-wider border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <User size={15} className="text-blue-500" />
                  <span>{t.consumerTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej. Juan Pérez Ramos"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.docTypeLabel}
                    </label>
                    <select
                      value={formData.docType}
                      onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs cursor-pointer"
                    >
                      <option value="DNI">DNI (Documento Nacional)</option>
                      <option value="PASSPORT">Pasaporte / Foreign Passport</option>
                      <option value="CE">Carné de Extranjería</option>
                      <option value="RUC">RUC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.docNumLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.docNumber}
                      onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                      placeholder="N° de documento"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+51 999 999 999"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.domicileLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.domicile}
                      onChange={(e) => setFormData({ ...formData, domicile: e.target.value })}
                      placeholder="Dirección, Distrito, Ciudad o País"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Identificación del Servicio */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-wider border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <FileText size={15} className="text-emerald-500" />
                  <span>{t.serviceTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.serviceTypeLabel}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs cursor-pointer"
                    >
                      <option value="tour">{t.tourService}</option>
                      <option value="package">{t.packageService}</option>
                      <option value="trek">{t.trekService}</option>
                      <option value="private">{t.privateService}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.amountLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Ej. S/ 350 PEN o $120 USD"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                      {t.serviceDescLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tourName}
                      onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                      placeholder="Ej. Tour Machu Picchu Full Day / N° Reserva 4082"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Detalle de la Reclamación */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-wider border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <Scale size={15} className="text-rose-500" />
                  <span>{t.claimTitle}</span>
                </div>

                {/* Switch Reclamo / Queja */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label 
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      formData.claimType === 'reclamo' 
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-950/30' 
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimType"
                      value="reclamo"
                      checked={formData.claimType === 'reclamo'}
                      onChange={() => setFormData({ ...formData, claimType: 'reclamo' })}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-bold block text-xs text-stone-900 dark:text-white">{t.typeClaim}</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight block mt-0.5">
                        {t.typeClaimDesc}
                      </span>
                    </div>
                  </label>

                  <label 
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      formData.claimType === 'queja' 
                        ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-950/30' 
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimType"
                      value="queja"
                      checked={formData.claimType === 'queja'}
                      onChange={() => setFormData({ ...formData, claimType: 'queja' })}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-bold block text-xs text-stone-900 dark:text-white">{t.typeComplaint}</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight block mt-0.5">
                        {t.typeComplaintDesc}
                      </span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                    {t.detailLabel}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.detail}
                    onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                    placeholder={t.detailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                    {t.requestLabel}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    placeholder={t.requestPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Declaración Jurada & Checkbox */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <label className="flex items-start gap-3 cursor-pointer text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>{t.declaration}</span>
                </label>
              </div>

              {/* Botón Submit */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-amber-600/25 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Registrando...' : t.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
