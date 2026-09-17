'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Bot,
  AlertTriangle,
  Plus,
  Search,
  User,
  Eye,
  MessageSquare,
  ArrowLeft,
  HeartHandshake
} from 'lucide-react';
import { FAQItem, PlanTier, TemplateType, LanguageType } from '@/types/landing';

interface ForumReply {
  id: string;
  author: string;
  role: 'admin' | 'designer' | 'guide' | 'user';
  roleLabel: string;
  avatarBg?: string;
  timeAgo: string;
  content: string;
}

interface ForumQuestion {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  description: string;
  category: string;
  views: number;
  replies: ForumReply[];
}

interface TourSupportAndFaqsProps {
  faqs?: FAQItem[];
  tourName: string;
  whatsapp: string;
  guideName?: string;
  destination?: string;
  tier?: PlanTier;
  theme?: TemplateType;
  isMobile?: boolean;
  lang?: LanguageType;
}

const INITIAL_FORUM_QUESTIONS: ForumQuestion[] = [
  {
    id: 'fq-1',
    title: '¿Cómo puedo cambiar las imágenes de mi landing?',
    author: 'Erik',
    timeAgo: 'Hace 2 horas',
    category: 'Editor & Diseño',
    views: 18,
    description: 'Quiero cambiar las imágenes de mi landing pero no encuentro la opción para reemplazar la portada de Vinicunca y las fotos del catálogo.',
    replies: [
      {
        id: 'r-1',
        author: 'Administrador',
        role: 'admin',
        roleLabel: 'Soporte Cusco Creativos',
        avatarBg: 'bg-[#FF5500]',
        timeAgo: 'Hace 1 hora',
        content: 'Debes entrar al Editor → Galería → Editar imágenes. En la Fase 5 podrás regenerarlas automáticamente con IA.'
      },
      {
        id: 'r-2',
        author: 'Diseñador',
        role: 'designer',
        roleLabel: 'Equipo Creativo',
        avatarBg: 'bg-purple-600',
        timeAgo: 'Hace 45 minutos',
        content: 'También puedes reemplazarlas desde la sección "Imágenes" del proyecto cargando fotos WebP de alta velocidad.'
      }
    ]
  },
  {
    id: 'fq-2',
    title: '¿Qué precauciones toman si un viajero siente mal de altura (soroche)?',
    author: 'Valeria Ruiz',
    timeAgo: 'Ayer a las 16:30',
    category: 'Salud & Altura',
    views: 45,
    description: 'Viajo con mis padres mayores y me preocupa la subida a Vinicunca (5,000 msnm). ¿Llevan balón de oxígeno en la movilidad y en la ruta?',
    replies: [
      {
        id: 'r-3',
        author: 'Carlos Quispe',
        role: 'guide',
        roleLabel: 'Guía Oficial DIRCETUR',
        avatarBg: 'bg-emerald-600',
        timeAgo: 'Ayer a las 17:15',
        content: 'Llevamos permanentemente balón de oxígeno medicinal portátil, oxímetro de pulso para medir saturación en tiempo real y botiquín andino. Además, tenemos opción de caballo de auxilio en el control.'
      },
      {
        id: 'r-4',
        author: 'Administrador',
        role: 'admin',
        roleLabel: 'Soporte Oficial',
        avatarBg: 'bg-[#FF5500]',
        timeAgo: 'Ayer a las 18:00',
        content: 'Recomendamos descansar mínimo 1 día previo en Cusco y tomar abundante mate de coca antes de ascender.'
      }
    ]
  },
  {
    id: 'fq-3',
    title: '¿Se puede reprogramar la fecha del tour si hay lluvia intensa o imprevisto?',
    author: 'Fernando Mendoza',
    timeAgo: 'Hace 3 días',
    category: 'Políticas & Reservas',
    views: 32,
    description: '¿Tienen costo adicional las reprogramaciones de fecha si las condiciones climáticas no son seguras?',
    replies: [
      {
        id: 'r-5',
        author: 'Administrador',
        role: 'admin',
        roleLabel: 'Atención al Cliente',
        avatarBg: 'bg-[#FF5500]',
        timeAgo: 'Hace 3 días',
        content: 'Cero penalidad. Coordinamos la reprogramación para el día siguiente sin costo o cambiamos por un circuito en el Valle Sagrado a menor altitud.'
      }
    ]
  }
];

export default function TourSupportAndFaqs({
  faqs = [],
  tourName,
  whatsapp,
  guideName = 'Cusco Creativos',
  destination = 'Cusco',
  tier = 'advance',
  theme = 'agency-portal',
  isMobile = false,
  lang = 'es'
}: TourSupportAndFaqsProps) {
  const isEn = lang === 'en';

  // Navigation Tabs: 'forum' (Comunidad) | 'faq' (Preguntas Frecuentes) | 'ticket' (Mesa Privada)
  const [activeTab, setActiveTab] = useState<'forum' | 'faq' | 'ticket'>('forum');

  // Forum Threads State
  const [forumQuestions, setForumQuestions] = useState<ForumQuestion[]>(INITIAL_FORUM_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(isEn ? 'All' : 'Todas');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);

  // New Question Form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState(isEn ? 'Editor & Design' : 'Editor & Diseño');
  const [newDescription, setNewDescription] = useState('');

  // New Reply Form
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // FAQs Accordion
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Private Ticket State with Anti-Spam
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderQuestion, setSenderQuestion] = useState('');
  const [ticketCategory, setTicketCategory] = useState(isEn ? 'Logistics & Hotel Pickup' : 'Logística y Horarios de Recojo');
  const [ticketId, setTicketId] = useState('');

  // Anti-Spam Multilayer States
  const formLoadTime = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState('');
  const [mathNum1] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [mathNum2] = useState(() => Math.floor(Math.random() * 4) + 2);
  const [mathAnswer, setMathAnswer] = useState('');
  const [spamError, setSpamError] = useState<string | null>(null);

  // Load forum threads from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cusco_creativos_forum_threads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setForumQuestions(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save forum threads to localStorage
  const saveQuestions = (updated: ForumQuestion[]) => {
    setForumQuestions(updated);
    try {
      localStorage.setItem('cusco_creativos_forum_threads', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const cleanPhone = (whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    lang === 'en' 
      ? `Hello ${guideName}, I have an inquiry regarding the "${tourName}" tour in ${destination}. Could you please assist me?`
      : lang === 'pt'
      ? `Olá ${guideName}, tenho uma dúvida sobre o passeio "${tourName}" em ${destination}. Poderia me ajudar?`
      : lang === 'fr'
      ? `Bonjour ${guideName}, j’ai une question concernant le circuit "${tourName}" à ${destination}. Pourriez-vous m’aider ?`
      : lang === 'it'
      ? `Ciao ${guideName}, ho una domanda riguardo al tour "${tourName}" a ${destination}. Potreste aiutarmi?`
      : `Hola ${guideName}, tengo una consulta sobre el tour "${tourName}" en ${destination}. ¿Me podrían brindar asistencia?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  // 5-Language Default FAQs
  const ALL_FAQS: Record<LanguageType, FAQItem[]> = {
    es: [
      {
        q: `¿Qué incluye exactamente el servicio del tour "${tourName}"?`,
        a: `Incluye transporte turístico autorizado ida y vuelta, guiado oficial profesional bilingüe acreditado por DIRCETUR Cusco, balón de oxígeno para la altitud, botiquín de primeros auxilios y atención personalizada.`
      },
      {
        q: '¿Cómo funciona la confirmación de reserva y qué métodos de pago aceptan?',
        a: 'La confirmación es inmediata vía WhatsApp. Puedes asegurar tu cupo mediante transferencia bancaria (BCP, Interbank, BBVA), Yape, Plin o tarjetas de crédito/débito internacionales sin cargos ocultos.'
      },
      {
        q: '¿Por qué es seguro reservar con nosotros? (Sellos y Licencias)',
        a: 'Somos agencia formal con RUC 20 activo, acreditación oficial DIRCETUR Cusco y sello internacional Safe Travels. Tus reservas están 100% garantizadas y emitimos comprobantes oficiales.'
      },
      {
        q: '¿Qué precauciones y protocolos aplican para el mal de altura (soroche)?',
        a: `Recomendamos aclimatarse al menos 24 a 48 horas en Cusco antes del tour. Nuestro guía monitorea el ritmo cardíaco y oxigenación, disponiendo de botiquín andino y balón de oxígeno medicinal para altitudes de ${destination}.`
      },
      {
        q: '¿Cuál es la política de reprogramación o cancelación por clima o imprevistos?',
        a: 'Ofrecemos reprogramación sin penalidad avisando con 24 horas de anticipación ante inclemencias climáticas, huelgas o motivos médicos justificados.'
      },
      {
        q: '¿Dónde es el punto de encuentro y a qué hora inicia el recorrido?',
        a: 'Brindamos servicio de recojo directo en la puerta de tu hotel o alojamiento ubicado dentro del centro histórico de Cusco, coordinando la hora exacta por WhatsApp la noche anterior.'
      }
    ],
    en: [
      {
        q: `What exactly does the "${tourName}" tour service include?`,
        a: 'Includes official licensed tourist transport, professional bilingual guide accredited by DIRCETUR Cusco, emergency oxygen tank for altitude, complete first aid kit, and personalized concierge.'
      },
      {
        q: 'How does booking confirmation work and what payment methods are accepted?',
        a: 'Confirmation is instant via WhatsApp or private quote. You can secure your slot with international credit/debit cards, bank transfer or digital payments with zero hidden fees.'
      },
      {
        q: 'Why is booking with us completely safe? (Licenses & Badges)',
        a: 'We are a formal registered Peruvian tourism agency with active tax ID (RUC), official DIRCETUR Cusco license, and international Safe Travels seal. All bookings are 100% legally backed.'
      },
      {
        q: 'What altitude sickness (soroche) protocols and care do you provide?',
        a: `We recommend acclimatizing 24 to 48 hours in Cusco before the tour. Our official guide monitors oxygenation with a pulse oximeter, and carries portable medical oxygen throughout ${destination}.`
      },
      {
        q: 'What is your rescheduling and cancellation policy?',
        a: 'We offer hassle-free rescheduling with 24-hour notice in case of adverse weather, public strikes or justified medical circumstances.'
      },
      {
        q: 'Where is the pickup point and what time does the journey start?',
        a: 'We provide direct door-to-door pickup from your hotel or accommodation located in Cusco historic center, reconfirming the exact time the evening prior.'
      }
    ],
    pt: [
      {
        q: `O que inclui exatamente o serviço do passeio "${tourName}"?`,
        a: 'Inclui transporte turístico oficial com ar-condicionado, guia oficial bilíngue credenciado pela DIRCETUR Cusco, balão de oxigênio permanente para altitude, kit de primeiros socorros e atendimento 24/7.'
      },
      {
        q: 'Como funciona a confirmação da reserva e quais formas de pagamento são aceitas?',
        a: 'Confirmação imediata por WhatsApp ou orçamento privado. Aceitamos cartões internacionais de crédito e débito, transferências ou pagamentos digitais sem taxas ocultas.'
      },
      {
        q: 'Por que é 100% seguro reservar conosco? (Selos e Licenças)',
        a: 'Somos agência formal registrada com CNPJ/RUC ativo, credencial oficial DIRCETUR Cusco e selo internacional Safe Travels reconhecido mundialmente.'
      },
      {
        q: 'Quais precauções vocês tomam para o mal de altitude (soroche)?',
        a: `Recomendamos repouso prévio de 24 a 48 horas em Cusco. Nossos veículos contam com balão de oxigênio medicinal, oxímetro de pulso e chá de coca para garantir conforto em ${destination}.`
      },
      {
        q: 'Qual a política de cancelamento ou reagendamento?',
        a: 'Reagendamento gratuito com aviso prévio de 24 horas diante de condições climáticas adversas ou justificativa médica.'
      },
      {
        q: 'Onde é o ponto de encontro e qual o horário de partida?',
        a: 'Oferecemos embarque direto na porta do seu hotel no centro histórico de Cusco, reconfirmando o horário exato na noite anterior.'
      }
    ],
    fr: [
      {
        q: `Que comprend exactement le service pour le circuit "${tourName}" ?`,
        a: 'Comprend le transport touristique officiel tout confort, un guide officiel bilingue agréé par la DIRCETUR Cusco, une bouteille d’oxygène pour l’altitude, une trousse de premiers soins et un suivi 24/7.'
      },
      {
        q: 'Comment s’effectue la confirmation et quels sont les moyens de paiement ?',
        a: 'Confirmation immédiate par WhatsApp ou devis en ligne. Cartes bancaires internationales acceptées, virements bancaires et paiements sécurisés sans frais cachés.'
      },
      {
        q: 'Pourquoi réserver en toute confiance avec nous ? (Agréments & Labels)',
        a: 'Agence réceptive officielle enregistrée avec licence DIRCETUR Cusco et label mondial Safe Travels. Toutes les prestations sont garanties contractuellement.'
      },
      {
        q: 'Quelles précautions prenez-vous contre le mal des montagnes (soroche) ?',
        a: `Nous recommandons 24 à 48 heures d’acclimatation à Cusco. Nos guides sont équipés d’un oxymètre et d’oxygène médical permanent tout au long de ${destination}.`
      },
      {
        q: 'Quelle est la politique de modification ou d’annulation ?',
        a: 'Report sans frais avec un préavis de 24 heures en cas d’intempéries ou de raison médicale justifiée.'
      },
      {
        q: 'Où se situe le point de départ et à quelle heure commence l’excursion ?',
        a: 'Prise en charge personnalisée à la porte de votre hébergement dans le centre historique de Cusco, heure reconfirmée la veille au soir.'
      }
    ],
    it: [
      {
        q: `Cosa include esattamente il servizio del tour "${tourName}"?`,
        a: 'Include trasporto turistico autorizzato con aria condizionata, guida ufficiale bilingue abilitata DIRCETUR Cusco, bombola di ossigeno per l’altitudine, kit di pronto soccorso e assistenza 24/7.'
      },
      {
        q: 'Come avviene la conferma della prenotazione e quali pagamenti sono accettati?',
        a: 'Conferma immediata via WhatsApp o preventivo riservato. Accettiamo carte di credito/debito internazionali, bonifici e pagamenti digitali senza costi nascosti.'
      },
      {
        q: 'Perché è sicuro prenotare con noi? (Licenze e Certificazioni)',
        a: 'Siamo un tour operator formale registrato con partita IVA peruviana (RUC), licenza DIRCETUR Cusco e sigillo internazionale Safe Travels.'
      },
      {
        q: 'Quali precauzioni adottate per il mal di montagna (soroche)?',
        a: `Consigliamo un’acclimatazione di 24-48 ore a Cusco. La guida monitora costantemente l’ossigenazione e dispone di ossigeno medicale portatile in ${destination}.`
      },
      {
        q: 'Qual è la politica di cancellazione o riprogrammazione?',
        a: 'Riprogrammazione gratuita con 24 ore di preavviso in caso di maltempo o motivi medici documentati.'
      },
      {
        q: 'Dove si trova il punto di ritrovo e a che ora inizia il tour?',
        a: 'Offriamo prelievo diretto presso il tuo hotel o alloggio nel centro storico di Cusco, con orario esatto riconfermato la sera precedente.'
      }
    ]
  };

  const displayFaqs: FAQItem[] = (faqs && faqs.length > 0)
    ? faqs
    : (ALL_FAQS[lang] || ALL_FAQS.es);

  // Handler for New Question
  const handlePublishQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newQuestion: ForumQuestion = {
      id: `fq-${Date.now()}`,
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Usuario Comunidad',
      timeAgo: 'Recién publicado',
      category: newCategory,
      views: 1,
      description: newDescription.trim(),
      replies: [
        {
          id: `r-${Date.now()}`,
          author: 'Administrador',
          role: 'admin',
          roleLabel: 'Soporte Oficial Cusco Creativos',
          avatarBg: 'bg-[#FF5500]',
          timeAgo: 'En revisión automática',
          content: '¡Hola! Gracias por tu pregunta. Nuestro equipo de soporte y guías están revisando el tema y responderán en detalle en este hilo.'
        }
      ]
    };

    const updated = [newQuestion, ...forumQuestions];
    saveQuestions(updated);
    setNewTitle('');
    setNewAuthor('');
    setNewDescription('');
    setShowNewQuestionModal(false);
    setActiveQuestionId(newQuestion.id);
  };

  // Handler for Adding a Reply to Active Question
  const handleAddReply = (questionId: string) => {
    if (!replyContent.trim()) return;

    const newReply: ForumReply = {
      id: `r-${Date.now()}`,
      author: replyAuthor.trim() || 'Viajero de la Comunidad',
      role: 'user',
      roleLabel: 'Comunidad',
      avatarBg: 'bg-stone-700',
      timeAgo: 'Justo ahora',
      content: replyContent.trim()
    };

    const updated = forumQuestions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          views: q.views + 1,
          replies: [...q.replies, newReply]
        };
      }
      return q;
    });

    saveQuestions(updated);
    setReplyContent('');
  };

  // Filtered Forum Questions
  const filteredQuestions = forumQuestions.filter(q => {
    const matchesCategory = selectedCategory === 'Todas' || q.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeQuestion = forumQuestions.find(q => q.id === activeQuestionId);

  // Private Inquiry Anti-Spam Submit
  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSpamError(null);

    // 1. Capa 1: Honeypot
    if (honeypot.trim().length > 0) {
      setSpamError('Detección Anti-Spam: Envío bloqueado por actividad automatizada.');
      return;
    }

    // 2. Capa 2: Time-Gate
    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 2500) {
      setSpamError('Envío demasiado rápido. Por favor tómate un momento para revisar tu consulta.');
      return;
    }

    // 3. Capa 3: Desafío matemático
    const expected = mathNum1 + mathNum2;
    if (parseInt(mathAnswer.trim(), 10) !== expected) {
      setSpamError(`Verificación de seguridad: ¿Cuánto es ${mathNum1} + ${mathNum2}? Por favor introduce el resultado correcto.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const genId = `CONS-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(genId);
      setFormSubmitted(true);
    }, 600);
  };

  const st = {
    badge: lang === 'en' ? 'Help Center, Community & FAQs' : lang === 'pt' ? 'Central de Ajuda, Fórum & Suporte' : lang === 'fr' ? 'Centre d’Aide, Forum & FAQ' : lang === 'it' ? 'Centro Assistenza, Forum & FAQ' : 'Centro de Ayuda, Foro & Soporte',
    titlePrefix: lang === 'en' ? 'How can we' : lang === 'pt' ? 'Como podemos' : lang === 'fr' ? 'Comment pouvons-nous vous' : lang === 'it' ? 'Come possiamo' : '¿En qué podemos',
    titleSuffix: lang === 'en' ? 'help you?' : lang === 'pt' ? 'ajudar você?' : lang === 'fr' ? 'aider ?' : lang === 'it' ? 'aiutarti?' : 'ayudarte?',
    desc: lang === 'en'
      ? 'Join our community questions forum with verified guide answers or browse our official FAQs.'
      : lang === 'pt'
      ? 'Participe do nosso fórum de dúvidas públicas com respostas da equipe oficial ou consulte as perguntas frequentes verificadas.'
      : lang === 'fr'
      ? 'Participez à notre forum de questions publiques avec les réponses de l’équipe officielle ou consultez nos FAQ vérifiées.'
      : lang === 'it'
      ? 'Partecipa al nostro forum di domande pubbliche con le risposte del team ufficiale o consulta le nostre FAQ verificate.'
      : 'Participa en nuestro foro de consultas públicas con respuestas del equipo oficial o consulta nuestras preguntas frecuentes verificadas.',
    tabForum: isMobile ? (lang === 'en' ? 'Forum' : lang === 'pt' ? 'Fórum' : lang === 'fr' ? 'Forum' : lang === 'it' ? 'Forum' : 'Foro') : (lang === 'en' ? 'Community Forum' : lang === 'pt' ? 'Fórum da Comunidade' : lang === 'fr' ? 'Forum Communautaire' : lang === 'it' ? 'Forum della Community' : 'Foro de Ayuda & Comunidad'),
    tabFaq: isMobile ? 'FAQs' : (lang === 'en' ? 'Verified FAQs' : lang === 'pt' ? 'Perguntas Frequentes (FAQ)' : lang === 'fr' ? 'Foire Aux Questions (FAQ)' : lang === 'it' ? 'Domande Frequenti (FAQ)' : 'Preguntas Frecuentes (FAQ)'),
    tabTicket: isMobile ? (lang === 'en' ? 'Helpdesk' : lang === 'pt' ? 'Suporte' : lang === 'fr' ? 'Support' : lang === 'it' ? 'Supporto' : 'Mesa Ayuda') : (lang === 'en' ? 'Private Helpdesk' : lang === 'pt' ? 'Mesa de Ajuda Privada' : lang === 'fr' ? 'Assistance Privée' : lang === 'it' ? 'Assistenza Privata' : 'Mesa de Ayuda Privada')
  };

  return (
    <section id="soporte-faq" className={`${isMobile ? 'py-8 px-3' : 'py-20 px-6 sm:px-8'} bg-[#F9F7F4] border-t border-stone-200 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20">
            <HelpCircle size={14} />
            <span>{st.badge}</span>
          </div>

          <h2 className={`${isMobile ? 'text-xl' : 'text-3xl sm:text-4xl'} font-black tracking-tight text-stone-900`}>
            {st.titlePrefix} <span className="text-[#FF5500]">{st.titleSuffix}</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
            {st.desc}
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className={`bg-stone-200/70 rounded-2xl max-w-2xl mx-auto p-1 sm:p-1.5 ${
          isMobile ? 'grid grid-cols-3 gap-1' : 'flex flex-wrap items-center justify-center gap-2 sm:gap-3'
        }`}>
          <button
            type="button"
            onClick={() => { setActiveTab('forum'); setActiveQuestionId(null); }}
            className={`flex items-center justify-center gap-1 sm:gap-2 ${
              isMobile ? 'px-1.5 py-2 text-[10px] flex-col text-center' : 'px-4 sm:px-5 py-2.5 text-xs'
            } rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'forum'
                ? 'bg-white text-stone-900 shadow-md scale-102'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare size={14} className={activeTab === 'forum' ? 'text-[#FF5500]' : ''} />
            <span>{st.tabForum}</span>
            <span className="bg-[#FF5500]/15 text-[#FF5500] text-[9px] px-1.5 py-0.2 rounded-full font-bold">
              {forumQuestions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`flex items-center justify-center gap-1 sm:gap-2 ${
              isMobile ? 'px-1.5 py-2 text-[10px] flex-col text-center' : 'px-4 sm:px-5 py-2.5 text-xs'
            } rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-white text-stone-900 shadow-md scale-102'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle size={14} className={activeTab === 'faq' ? 'text-[#FF5500]' : ''} />
            <span>{st.tabFaq}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ticket')}
            className={`flex items-center justify-center gap-1 sm:gap-2 ${
              isMobile ? 'px-1.5 py-2 text-[10px] flex-col text-center' : 'px-4 sm:px-5 py-2.5 text-xs'
            } rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'ticket'
                ? 'bg-white text-stone-900 shadow-md scale-102'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck size={14} className={activeTab === 'ticket' ? 'text-[#FF5500]' : ''} />
            <span>{st.tabTicket}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: FORO DE AYUDA DE LA COMUNIDAD (DISEÑO REQUERIDO) */}
        {/* ======================================================== */}
        {activeTab === 'forum' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Foro Top Action Card */}
            <div className={`bg-white ${isMobile ? 'p-4 rounded-2xl space-y-3' : 'p-6 sm:p-8 rounded-3xl space-y-6'} border border-stone-200 shadow-xs`}>
              <div className={`flex ${isMobile ? 'flex-col items-stretch gap-3' : 'flex-col sm:flex-row items-start sm:items-center justify-between gap-4'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#FF5500]">
                    <Sparkles size={13} /> <span>Conversación Pública y Asistencia</span>
                  </div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-lg sm:text-2xl'} font-black text-stone-900 tracking-tight`}>
                    Foro de Ayuda
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Publica tu pregunta o problema y recibe respuestas del administrador, diseñadores y guías.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewQuestionModal(true)}
                  className={`shimmer-btn bg-gradient-to-r from-[#FF5500] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white ${
                    isMobile ? 'w-full py-2.5 px-4 justify-center text-xs' : 'px-5 py-3 text-xs'
                  } rounded-xl sm:rounded-2xl font-black uppercase tracking-wider shadow-md shadow-[#FF5500]/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0`}
                >
                  <Plus size={15} />
                  <span>Nueva Pregunta</span>
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className={`pt-2 border-t border-stone-100 flex ${isMobile ? 'flex-col gap-2.5' : 'flex-col md:flex-row items-stretch md:items-center gap-3'}`}>
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder={isMobile ? "🔎 Buscar en el foro..." : "🔎 Buscar en el foro (ej. imágenes, soroche, cancelaciones)..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full">
                  {['Todas', 'Editor & Diseño', 'Salud & Altura', 'Políticas & Reservas'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal / Panel: Formulario "+ Nueva Pregunta" */}
            {showNewQuestionModal && (
              <div className={`bg-white ${isMobile ? 'p-4 rounded-2xl' : 'p-6 sm:p-8 rounded-3xl'} border-2 border-[#FF5500]/40 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-900 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#FF5500]" />
                    <span>Crear Nueva Pregunta en el Foro</span>
                  </h4>
                  <button
                    onClick={() => setShowNewQuestionModal(false)}
                    className="text-stone-400 hover:text-stone-700 text-sm cursor-pointer p-1"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePublishQuestion} className="space-y-3 sm:space-y-4">
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-3 gap-3'}`}>
                    <div className={isMobile ? 'col-span-1' : 'sm:col-span-2'}>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Título de la Pregunta
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. ¿Cómo cambiar las imágenes de mi landing?"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Tu Nombre / Usuario
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Erik"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500]"
                    >
                      <option value="Editor & Diseño">Editor & Diseño (Imágenes, Textos, Secciones)</option>
                      <option value="Salud & Altura">Salud & Altura (Oxígeno, Aclimatación, Protocolos)</option>
                      <option value="Políticas & Reservas">Políticas & Reservas (Pagos, Cancelación, Fechas)</option>
                      <option value="Logística & Recojo">Logística & Recojo (Hoteles, Horarios, Rutas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Descripción Detallada
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe qué problema tienes o qué deseas consultar en detalle..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewQuestionModal(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="shimmer-btn bg-[#FF5500] hover:bg-[#E04B00] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                      Publicar Pregunta
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Vista Individual del Hilo Seleccionado (Pregunta + Respuestas Públicas) */}
            {activeQuestion ? (
              <div className={`bg-white ${isMobile ? 'p-4 rounded-2xl space-y-4' : 'p-6 sm:p-8 rounded-3xl space-y-6'} border border-stone-200 shadow-md animate-in fade-in duration-200`}>
                <button
                  type="button"
                  onClick={() => setActiveQuestionId(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5500] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Volver a la lista del foro</span>
                </button>

                {/* Pregunta Principal */}
                <div className="space-y-3 pb-4 sm:pb-6 border-b border-stone-200">
                  <div className={`flex ${isMobile ? 'flex-wrap gap-1.5' : 'items-center gap-2'} text-xs text-stone-500`}>
                    <span className="bg-[#FF5500]/10 text-[#FF5500] px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                      {activeQuestion.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User size={12} /> {activeQuestion.author}
                    </span>
                    <span>•</span>
                    <span>{activeQuestion.timeAgo}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-stone-400">
                      <Eye size={12} /> {activeQuestion.views} vistas
                    </span>
                  </div>

                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-black text-stone-900 tracking-tight`}>
                    {activeQuestion.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 sm:p-4 rounded-2xl border border-stone-100">
                    {activeQuestion.description}
                  </p>
                </div>

                {/* Listado de Respuestas Públicas */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 flex items-center gap-2 uppercase tracking-wider">
                      <MessageCircle size={16} className="text-[#FF5500]" />
                      <span>Respuestas ({activeQuestion.replies.length})</span>
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-stone-400">Comunidad</span>
                  </div>

                  {activeQuestion.replies.length === 0 ? (
                    <p className="text-xs text-stone-400 italic p-4 bg-stone-50 rounded-xl text-center">
                      Aún no hay respuestas en esta pregunta. ¡Sé el primero en responder!
                    </p>
                  ) : (
                    <div className="space-y-2.5 sm:space-y-3">
                      {activeQuestion.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-stone-50 p-3.5 sm:p-5 rounded-2xl border border-stone-200/80 space-y-2 hover:border-stone-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${reply.avatarBg || 'bg-stone-700'} text-white flex items-center justify-center font-bold text-[10px] sm:text-xs`}>
                                {reply.author.charAt(0)}
                              </div>
                              <div>
                                <span className="font-extrabold text-xs text-stone-900 block leading-tight">
                                  {reply.author}
                                </span>
                                <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium">
                                  {reply.roleLabel}
                                </span>
                              </div>
                            </div>

                            <span className="text-[9px] sm:text-[10px] text-stone-400">{reply.timeAgo}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-8 sm:pl-9">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Formulario para Agregar Respuesta */}
                <div className="pt-3 border-t border-stone-200 space-y-3">
                  <h5 className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Escribir Respuesta
                  </h5>

                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-2.5' : 'grid-cols-1 sm:grid-cols-4 gap-3'}`}>
                    <div className={isMobile ? 'col-span-1' : 'sm:col-span-1'}>
                      <input
                        type="text"
                        placeholder="Tu Nombre"
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30"
                      />
                    </div>
                    <div className={isMobile ? 'col-span-1' : 'sm:col-span-3'}>
                      <input
                        type="text"
                        placeholder="Escribe tu respuesta pública..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddReply(activeQuestion.id);
                          }
                        }}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-[#FF5500]/30"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleAddReply(activeQuestion.id)}
                      className={`shimmer-btn bg-stone-900 hover:bg-[#FF5500] text-white ${isMobile ? 'w-full justify-center' : 'px-5'} py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2`}
                    >
                      <Send size={13} />
                      <span>Responder</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Lista de Preguntas del Foro (Cards) */
              <div className="space-y-3">
                {filteredQuestions.length === 0 ? (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 text-center space-y-3">
                    <p className="text-xs text-stone-500">
                      No encontramos preguntas con el término &quot;{searchQuery}&quot;.
                    </p>
                    <button
                      onClick={() => setShowNewQuestionModal(true)}
                      className="bg-[#FF5500] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Sé el primero en preguntar sobre este tema
                    </button>
                  </div>
                ) : (
                  filteredQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`bg-white ${isMobile ? 'p-4 rounded-2xl' : 'p-5 sm:p-6 rounded-3xl'} border border-stone-200/80 shadow-xs hover:shadow-lg hover:border-[#FF5500]/40 transition-all duration-200 cursor-pointer group space-y-2.5`}
                    >
                      <div className={`flex ${isMobile ? 'flex-col gap-1 items-start' : 'items-center justify-between'} text-xs text-stone-500`}>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="bg-[#FF5500]/10 text-[#FF5500] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                            {q.category}
                          </span>
                          <span>•</span>
                          <span className="font-medium flex items-center gap-1 text-stone-700">
                            <User size={12} className="text-stone-400" /> {q.author}
                          </span>
                          <span>•</span>
                          <span>{q.timeAgo}</span>
                        </div>

                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Eye size={12} /> {q.views} vistas
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900 group-hover:text-[#FF5500] transition-colors leading-snug">
                        {q.title}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {q.description}
                      </p>

                      <div className={`pt-2 flex ${isMobile ? 'flex-col gap-1.5 items-start' : 'items-center justify-between'} text-xs border-t border-stone-100`}>
                        <span className="text-[11px] font-bold text-stone-700 flex flex-wrap items-center gap-1.5">
                          <MessageCircle size={14} className="text-[#FF5500]" />
                          <span>{q.replies.length} respuestas</span>
                          {q.replies.some(r => r.role === 'admin') && (
                            <span className="bg-emerald-500/10 text-emerald-700 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold">
                              ✓ Respondido por Admin
                            </span>
                          )}
                        </span>

                        <span className="text-[11px] font-bold text-[#FF5500] group-hover:underline">
                          Ver respuestas &rarr;
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PREGUNTAS FRECUENTES (FAQ OFICIAL) */}
        {/* ======================================================== */}
        {activeTab === 'faq' && (
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl mx-auto">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-[#FF5500]/40 bg-[#FFF6F0]' : 'bg-white border-stone-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2 sm:gap-2.5">
                      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-mono shrink-0 ${
                        isOpen ? 'bg-[#FF5500] text-white' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{faq.q}</span>
                    </span>
                    <div className={`shrink-0 ${isOpen ? 'text-[#FF5500]' : 'text-stone-400'}`}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed pl-10 sm:pl-12">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MESA DE ATENCIÓN PRIVADA CON ANTI-SPAM MULTICAPA */}
        {/* ======================================================== */}
        {activeTab === 'ticket' && (
          <div className={`rounded-2xl sm:rounded-3xl ${isMobile ? 'p-4' : 'p-6 sm:p-10'} shadow-xl bg-stone-900 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

            <div className={`flex flex-col ${isMobile ? 'space-y-6' : 'lg:grid lg:grid-cols-12 gap-8'} items-start relative z-10 w-full`}>
              
              {/* Left Column: Direct Agency Attention */}
              <div className={`${isMobile ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isEn ? 'Local Cusco Support Desk' : 'Mesa de Ayuda Local en Cusco'}
                </div>

                <h3 className={`${isMobile ? 'text-lg leading-snug' : 'text-xl sm:text-2xl'} font-bold tracking-tight text-white`}>
                  {isEn ? 'Need assistance or have a special request?' : '¿Necesitas asistencia o tienes una solicitud especial?'}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {isEn 
                    ? 'We are on call to coordinate hotel pickups, special dietary requirements, altitude acclimatization and last-minute reservations.'
                    : 'Estamos disponibles para coordinar recojo en tu hotel, dietas especiales, aclimatación a la altura y reservas de último minuto.'}
                </p>

                {/* Service Features Badges */}
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-3'} pt-2`}>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <PhoneCall size={16} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{isEn ? 'Cusco Office: ' : 'Central Cusco: '}<strong>{whatsapp || '+51 984 123 456'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <Clock size={16} className="text-amber-400 shrink-0" />
                    <span>{isEn ? 'Hours: ' : 'Atención: '}<strong>06:00 AM - 09:30 PM</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                    <span>{isEn ? 'Official License ' : 'Acreditación '}<strong>DIRCETUR Cusco</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <HeartHandshake size={16} className="text-rose-400 shrink-0" />
                    <span className="truncate">{isEn ? 'Official Guide: ' : 'Guía Oficial: '}<strong>{guideName}</strong></span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-[#25D366] hover:bg-[#20bd5a] text-white ${isMobile ? 'w-full justify-center text-xs py-3' : 'px-5 py-3 text-xs sm:text-sm'} rounded-xl font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:scale-102`}
                  >
                    <MessageCircle size={18} />
                    <span>{isEn ? `Chat on WhatsApp with ${guideName}` : `Chatear por WhatsApp con ${guideName}`}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Form with Anti-Spam Multicapa */}
              <div className={`${isMobile ? 'w-full' : 'lg:col-span-5'} bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 text-white space-y-3`}>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Send size={15} className="text-[#FF5500]" />
                    Consulta Privada Protegida
                  </h4>
                  <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <ShieldCheck size={11} /> Anti-Spam Activo
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 p-4 rounded-xl text-center space-y-2 animate-in zoom-in-95 duration-200">
                    <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                    <h5 className="text-xs font-bold text-white">¡Consulta Registrada con Éxito!</h5>
                    <span className="inline-block bg-white/20 text-white font-mono text-[11px] px-2.5 py-0.5 rounded-md">
                      Ticket #{ticketId}
                    </span>
                    <p className="text-[11px] text-stone-200">
                      Gracias {senderName || 'viajero'}. El guía {guideName} responderá a tu número {senderContact} en los próximos minutos.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setSenderQuestion('');
                        setMathAnswer('');
                      }}
                      className="text-[10px] text-emerald-300 hover:text-white underline pt-1 cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickInquiry} className="space-y-3">
                    
                    {/* Honeypot invisible trap */}
                    <input
                      type="text"
                      name="website_url_trap"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden absolute -left-[9999px]"
                    />

                    {/* Category selector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                        Categoría
                      </label>
                      <select
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full bg-stone-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-[#FF5500]"
                      >
                        <option value="Logística y Horarios de Recojo">Logística y Horarios de Recojo</option>
                        <option value="Aclimatación y Altitud (Soroche)">Aclimatación y Altitud (Soroche)</option>
                        <option value="Reserva Directa y Métodos de Pago">Reserva Directa y Métodos de Pago</option>
                        <option value="Requerimiento Especial / Grupo Privado">Requerimiento Especial / Grupo Privado</option>
                      </select>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-2.5'}`}>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                          Tu Nombre
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Mateo Rojas"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#FF5500]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                          WhatsApp
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+51 984..."
                          value={senderContact}
                          onChange={(e) => setSenderContact(e.target.value)}
                          className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#FF5500]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                        ¿Qué deseas consultar?
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Ej. ¿Tienen opción vegetariana? ¿Recogen en Ollantaytambo?"
                        value={senderQuestion}
                        onChange={(e) => setSenderQuestion(e.target.value)}
                        className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#FF5500] resize-none"
                      />
                    </div>

                    {/* Anti-Spam Math Security Challenge */}
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Bot size={15} className="text-[#FF8844] shrink-0" />
                        <span className="text-[10px] sm:text-[11px] text-stone-200 font-semibold">
                          Seguridad: ¿Cuánto es <strong>{mathNum1} + {mathNum2}</strong>?
                        </span>
                      </div>
                      <input
                        type="number"
                        required
                        placeholder="?"
                        value={mathAnswer}
                        onChange={(e) => setMathAnswer(e.target.value)}
                        className="w-14 bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-xs text-center font-bold text-white outline-none focus:ring-2 focus:ring-[#FF5500]"
                      />
                    </div>

                    {/* Spam Error Alert */}
                    {spamError && (
                      <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
                        <AlertTriangle size={15} className="shrink-0 text-rose-300" />
                        <span>{spamError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Validando y enviando...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Enviar Consulta Protegida</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
