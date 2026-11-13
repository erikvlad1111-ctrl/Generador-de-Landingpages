import JSZip from 'jszip';

export interface ParsedDocumentData {
  // Datos de la Empresa (Marca Blanca)
  companyName?: string;
  companyRuc?: string;
  whatsapp?: string;
  companyEmail?: string;
  officeAddress?: string;
  officeHours?: string;
  companyTagline?: string;
  guideName?: string;
  guideCert?: string;

  // Datos del Tour
  name?: string;
  destination?: string;
  price?: string;
  duration?: string;
  difficulty?: string;
  altitude?: string;
  description?: string;
  recommendedTemplate?: 'agency-portal' | 'boho-nature' | 'premium' | 'adventure' | 'cultural' | 'emerald-explorer';

  // Contenido y Secciones
  heroTitle?: string;
  heroSubtitle?: string;
  heroBadge?: string;
  heroCta?: string;
  itinerary?: { step: string; title: string; desc: string }[];
  includedServices?: string[];
  notIncluded?: string[];
  whatToBring?: string[];
  faqs?: { q: string; a: string }[];
  testimonials?: { name: string; origin: string; rating: number; comment: string }[];
}

/**
 * Extrae texto de un archivo cargado en el navegador (.docx, .txt, .md, .csv)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  // 1. Archivos Word (.docx)
  if (extension === 'docx') {
    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);
      const documentXml = zip.file('word/document.xml');

      if (!documentXml) {
        throw new Error('No se encontró word/document.xml dentro del archivo .docx');
      }

      const xml = await documentXml.async('text');

      // Convertir saltos de párrafo a líneas y eliminar etiquetas XML
      const textWithBreaks = xml
        .replace(/<w:br\s*\/?>/gi, '\n')
        .replace(/<w:tab\s*\/?>/gi, '\t')
        .replace(/<\/w:p>/gi, '\n')
        .replace(/<[^>]+>/g, '');

      return textWithBreaks
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    } catch (err) {
      throw new Error(`Error al leer archivo Word (.docx): ${err instanceof Error ? err.message : 'formato inválido'}`);
    }
  }

  // 2. Archivos de texto plano (.txt, .md, .rtf, .csv, etc.)
  return await file.text();
}

/**
 * Parser NLP Heurístico Local:
 * Analiza un texto libre o documento extraído y detecta automáticamente
 * todos los campos de la empresa, tour, itinerario, inclusiones y FAQs.
 */
export function parseDocumentTextLocally(
  text: string,
  defaults?: Partial<ParsedDocumentData>
): ParsedDocumentData {
  const result: ParsedDocumentData = { ...defaults };
  const clean = text.replace(/\r\n/g, '\n').trim();
  const lines = clean.split('\n').map((l) => l.trim()).filter(Boolean);

  // 1. RUC (11 dígitos, inicia con 10 o 20)
  const rucMatch = clean.match(/(?:RUC|R\.U\.C\.)[:\s]*(\b(10|20)\d{9}\b)/i) || clean.match(/\b(10|20)\d{9}\b/);
  if (rucMatch) {
    result.companyRuc = (rucMatch[1] || rucMatch[0]).trim();
  }

  // 2. Correo Electrónico
  const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  if (emailMatch) {
    result.companyEmail = emailMatch[0].trim();
  }

  // 3. Teléfono / WhatsApp
  const phonePrefixMatch = clean.match(
    /(?:WhatsApp|Celular|Tel[eé]fono|M[oó]vil|Contacto|Reservas)[:\s]*([+\d\s().-]{8,22})/i
  );
  if (phonePrefixMatch && phonePrefixMatch[1]) {
    const rawNum = phonePrefixMatch[1].trim();
    const digitsOnly = rawNum.replace(/\D/g, '');
    if (digitsOnly.length >= 9) {
      result.whatsapp = rawNum.startsWith('+') ? rawNum : `+51 ${rawNum}`;
    }
  } else {
    const peruvianMobile = clean.match(/(?:\+?51\s*)?(9\d{2}[-\s]?\d{3}[-\s]?\d{3})/);
    if (peruvianMobile) {
      result.whatsapp = `+51 ${peruvianMobile[1].replace(/\s+/g, ' ')}`;
    }
  }

  // 4. Nombre de la Empresa / Agencia
  const companyKeyMatch = clean.match(
    /(?:Agencia|Empresa|Operador(?:a)?|Raz[oó]n Social|Compañ[ií]a|Nombre de la Agencia)[:\s]+([^\n]+)/i
  );
  if (companyKeyMatch && companyKeyMatch[1]) {
    result.companyName = companyKeyMatch[1].trim();
  } else {
    // Buscar si alguna de las primeras 5 líneas termina en SAC, EIRL, SRL, Travel, Expeditions
    const candidateLine = lines.slice(0, 5).find((l) =>
      /(?:S\.A\.C\.|S\.A\.|E\.I\.R\.L\.|S\.R\.L\.|Expeditions|Tours|Travel|Adventures)/i.test(l)
    );
    if (candidateLine && candidateLine.length < 70) {
      result.companyName = candidateLine.replace(/^[#*\-•\s]+/, '').trim();
    }
  }

  // 5. Dirección de Oficina
  const addressMatch = clean.match(
    /(?:Direcci[oó]n|Oficina|Ubicaci[oó]n|Sede|Office)[:\s]+([^\n]+)/i
  );
  if (addressMatch && addressMatch[1]) {
    result.officeAddress = addressMatch[1].trim();
  }

  // 6. Horario de Atención
  const hoursMatch = clean.match(
    /(?:Horario|Atenci[oó]n|Horas|Hours)[:\s]+([^\n]+)/i
  );
  if (hoursMatch && hoursMatch[1]) {
    result.officeHours = hoursMatch[1].trim();
  }

  // 7. Slogan / Lema
  const taglineMatch = clean.match(
    /(?:Slogan|Eslogan|Lema|Tagline)[:\s]+([^\n]+)/i
  );
  if (taglineMatch && taglineMatch[1]) {
    result.companyTagline = taglineMatch[1].trim();
  }

  // 8. Guía Responsable y Colegiatura
  const guideMatch = clean.match(
    /(?:Gu[ií]a(?:\s+L[ií]der)?|Guide)[:\s]+([^\n]+)/i
  );
  if (guideMatch && guideMatch[1]) {
    result.guideName = guideMatch[1].trim();
  }
  const certMatch = clean.match(
    /(?:DIRCETUR|Colegiatura|Registro(?:\s+DIRCETUR)?|Carnet)[:\s]*([^\n]+)/i
  );
  if (certMatch && certMatch[1]) {
    result.guideCert = certMatch[1].trim();
  }

  // 9. Nombre del Tour / Paquete
  const tourNameMatch = clean.match(
    /(?:Tour|Paquete(?: Tur[ií]stico)?|Ruta|Expedici[oó]n|Nombre del Tour)[:\s]+([^\n]+)/i
  );
  if (tourNameMatch && tourNameMatch[1]) {
    result.name = tourNameMatch[1].replace(/^[#*\-•\s]+/, '').trim();
  } else {
    // Si no tiene prefijo, revisar la primera línea no empresa
    const candidate = lines.find((l) =>
      !/(?:RUC|WhatsApp|Tel|Email|Correo|S\.A\.C\.|E\.I\.R\.L\.)/i.test(l) &&
      l.length > 5 &&
      l.length < 90
    );
    if (candidate) {
      result.name = candidate.replace(/^[#*\-•\s]+/, '').trim();
    }
  }

  // 10. Destino
  const destMatch = clean.match(
    /(?:Destino(?:s)?|Lugar|Zona|Circuitos?)[:\s]+([^\n]+)/i
  );
  if (destMatch && destMatch[1]) {
    result.destination = destMatch[1].trim();
  } else {
    // Inferir a partir de palabras clave cusqueñas
    const lower = clean.toLowerCase();
    if (lower.includes('humantay')) {
      result.destination = 'Laguna Humantay & Soraypampa';
    } else if (lower.includes('7 colores') || lower.includes('vinicunca') || lower.includes('rainbow')) {
      result.destination = 'Montaña de 7 Colores (Vinicunca)';
    } else if (lower.includes('salkantay')) {
      result.destination = 'Ruta Salkantay & Santuario Machu Picchu';
    } else if (lower.includes('valle sagrado') || lower.includes('maras') || lower.includes('moray') || lower.includes('pisac')) {
      result.destination = 'Valle Sagrado de los Incas (Pisac, Maras & Ollantaytambo)';
    } else if (lower.includes('city tour') || lower.includes('sacsayhuaman') || lower.includes('qorikancha')) {
      result.destination = 'Cusco Histórico & Sacsayhuamán';
    } else if (lower.includes('machu picchu') || lower.includes('aguas calientes')) {
      result.destination = 'Santuario Histórico de Machu Picchu';
    }
  }

  // 11. Precio / Tarifa
  const priceKeyMatch = clean.match(
    /(?:Precio|Tarifa|Costo|Inversi[oó]n|Price)[:\s]*([^\n]+)/i
  );
  if (priceKeyMatch && priceKeyMatch[1]) {
    result.price = priceKeyMatch[1].trim();
  } else {
    const rawPriceMatch = clean.match(
      /(?:\$|USD|S\/\.?|PEN)\s*(\d+(?:[.,]\d{1,2})?)|(\d+(?:[.,]\d{1,2})?)\s*(?:USD|\$|d[oó]lares|soles)/i
    );
    if (rawPriceMatch) {
      result.price = rawPriceMatch[0].trim();
    }
  }

  // 12. Duración
  const durMatch = clean.match(
    /(?:Duraci[oó]n|Duration|Tiempo)[:\s]+([^\n]+)/i
  );
  if (durMatch && durMatch[1]) {
    result.duration = durMatch[1].trim();
  } else {
    const rawDur = clean.match(
      /\b(\d+\s*(?:d[ií]as?|horas?|hrs?|noches?)(?:\s*(?:\/|y|-)\s*\d+\s*(?:noches?|d[ií]as?))?|full\s*day|medio\s*d[ií]a)\b/i
    );
    if (rawDur) {
      result.duration = rawDur[0].trim();
    }
  }

  // 13. Altitud
  const altMatch = clean.match(
    /(?:Altitud(?:\s*M[aá]xima)?|Altura|Elevaci[oó]n|Altitude)[:\s]+([^\n]+)/i
  );
  if (altMatch && altMatch[1]) {
    result.altitude = altMatch[1].trim();
  } else {
    const rawAlt = clean.match(/\b\d{1,2}[.,]?\d{3}\s*(?:msnm|m\.s\.n\.m\.|metros)\b/i);
    if (rawAlt) {
      result.altitude = rawAlt[0].trim();
    }
  }

  // 14. Dificultad
  const diffMatch = clean.match(
    /(?:Dificultad|Nivel(?:\s+de\s+caminata)?|Difficulty)[:\s]+([^\n]+)/i
  );
  if (diffMatch && diffMatch[1]) {
    result.difficulty = diffMatch[1].trim();
  } else {
    const lower = clean.toLowerCase();
    if (lower.includes('desafiante') || lower.includes('exigente') || lower.includes('difícil')) {
      result.difficulty = 'Desafiante / Alta Montaña';
    } else if (lower.includes('moderada') || lower.includes('medio')) {
      result.difficulty = 'Moderada';
    } else if (lower.includes('fácil') || lower.includes('familiar') || lower.includes('suave')) {
      result.difficulty = 'Fácil / Apto para Familias';
    }
  }

  // 15. Descripción
  const descMatch = clean.match(
    /(?:Descripci[oó]n|Resumen|Overview|Sobre el tour|Acerca del tour)[:\s]*\n*([\s\S]*?)(?=(?:Itinerario|Incluye|Servicios|No incluye|Qu[eé] llevar|Tarifa|Precio|$))/i
  );
  if (descMatch && descMatch[1] && descMatch[1].trim().length > 20) {
    result.description = descMatch[1].trim().replace(/\n+/g, ' ');
  } else {
    // Si no hay sección explícita, tomar el primer párrafo largo
    const candidateParagraph = clean
      .split('\n\n')
      .find((p) => p.length > 80 && !/(?:RUC|Tel|WhatsApp|Día 1|Day 1|Incluye)/i.test(p));
    if (candidateParagraph) {
      result.description = candidateParagraph.trim().replace(/\n+/g, ' ');
    }
  }

  // 16. Itinerario (Etapas o Días)
  const itineraryRegex = /(?:D[ií]a|Day|Paso|Etapa)\s*(\d+)[:\s.-]+([^\n]+)\n+([\s\S]*?)(?=(?:D[ií]a|Day|Paso|Etapa)\s*\d+|Incluye|Servicios incluidos|No incluye|Qu[eé] llevar|Tarifa|$)/gi;
  const parsedItinerary: { step: string; title: string; desc: string }[] = [];
  let itMatch: RegExpExecArray | null;

  while ((itMatch = itineraryRegex.exec(clean)) !== null) {
    const stepNum = itMatch[1];
    const title = itMatch[2].trim();
    const desc = itMatch[3].trim().replace(/\n+/g, ' ');
    if (title && desc) {
      parsedItinerary.push({
        step: `Día ${stepNum}`,
        title,
        desc: desc.length > 250 ? desc.slice(0, 247) + '...' : desc,
      });
    }
  }

  if (parsedItinerary.length > 0) {
    result.itinerary = parsedItinerary;
  }

  // 17. Inclusiones (Servicios incluidos)
  const inclMatch = clean.match(
    /(?:Incluye|Servicios incluidos|Inclusiones|Includes)[:\s]*\n*([\s\S]*?)(?=(?:No incluye|Servicios no incluidos|Qu[eé] llevar|Recomendaciones|Itinerario|$))/i
  );
  if (inclMatch && inclMatch[1]) {
    const rawItems = inclMatch[1]
      .split('\n')
      .map((l) => l.replace(/^[•*\-\d.)\s]+/, '').trim())
      .filter((l) => l.length > 4);
    if (rawItems.length > 0) {
      result.includedServices = rawItems.slice(0, 8);
    }
  }

  // 18. No Incluye (Exclusiones)
  const notInclMatch = clean.match(
    /(?:No incluye|Servicios no incluidos|Exclusiones|Does not include)[:\s]*\n*([\s\S]*?)(?=(?:Qu[eé] llevar|Recomendaciones|Requisitos|Pol[ií]ticas|$))/i
  );
  if (notInclMatch && notInclMatch[1]) {
    const rawItems = notInclMatch[1]
      .split('\n')
      .map((l) => l.replace(/^[•*\-\d.)\s]+/, '').trim())
      .filter((l) => l.length > 4);
    if (rawItems.length > 0) {
      result.notIncluded = rawItems.slice(0, 6);
    }
  }

  // 19. Qué Llevar
  const bringMatch = clean.match(
    /(?:Qu[eé] llevar|Llevar|Recomendaciones|Equipaje sugerido|What to bring)[:\s]*\n*([\s\S]*?)(?=(?:Preguntas|FAQs?|Testimonios|Pol[ií]ticas|$))/i
  );
  if (bringMatch && bringMatch[1]) {
    const rawItems = bringMatch[1]
      .split('\n')
      .map((l) => l.replace(/^[•*\-\d.)\s]+/, '').trim())
      .filter((l) => l.length > 4);
    if (rawItems.length > 0) {
      result.whatToBring = rawItems.slice(0, 6);
    }
  }

  // 20. FAQs (Preguntas Frecuentes)
  const faqBlockMatch = clean.match(
    /(?:Preguntas frecuentes|FAQs?|Preguntas y respuestas)[:\s]*\n*([\s\S]*?)(?=(?:Testimonios|Reseñas|Opiniones|$))/i
  );
  if (faqBlockMatch && faqBlockMatch[1]) {
    const rawFaqBlock = faqBlockMatch[1];
    const qaRegex = /[¿?]?([A-ZÁÉÍÓÚÑ¿][^?]+(?:\?|:))\s*([\s\S]*?)(?=[¿?][A-ZÁÉÍÓÚÑ¿]|$)/gi;
    const extractedFaqs: { q: string; a: string }[] = [];
    let qMatch: RegExpExecArray | null;

    while ((qMatch = qaRegex.exec(rawFaqBlock)) !== null) {
      let q = qMatch[1].trim();
      if (!q.startsWith('¿')) q = `¿${q}`;
      if (!q.endsWith('?')) q = `${q}?`;
      const a = qMatch[2].trim().replace(/\n+/g, ' ');
      if (q.length > 8 && a.length > 8) {
        extractedFaqs.push({ q, a: a.slice(0, 300) });
      }
    }

    if (extractedFaqs.length > 0) {
      result.faqs = extractedFaqs.slice(0, 5);
    }
  }

  // 21. Selección Automática de Plantilla según estilo del tour
  const fullContent = `${result.name || ''} ${result.destination || ''} ${clean}`.toLowerCase();
  if (
    fullContent.includes('salkantay') ||
    fullContent.includes('trek') ||
    fullContent.includes('caminata') ||
    fullContent.includes('choquequirao') ||
    fullContent.includes('inca trail')
  ) {
    result.recommendedTemplate = 'adventure';
  } else if (
    fullContent.includes('lujo') ||
    fullContent.includes('luxury') ||
    fullContent.includes('hiram bingham') ||
    fullContent.includes('vip') ||
    fullContent.includes('exclusivo')
  ) {
    result.recommendedTemplate = 'premium';
  } else if (
    fullContent.includes('city tour') ||
    fullContent.includes('cultural') ||
    fullContent.includes('ancestral') ||
    fullContent.includes('qorikancha') ||
    fullContent.includes('sacsayhuaman') ||
    fullContent.includes('arqueol')
  ) {
    result.recommendedTemplate = 'cultural';
  } else if (
    fullContent.includes('boho') ||
    fullContent.includes('fotograf') ||
    fullContent.includes('naturaleza') ||
    fullContent.includes('humantay')
  ) {
    result.recommendedTemplate = 'boho-nature';
  } else if (
    fullContent.includes('bento') ||
    fullContent.includes('modern') ||
    fullContent.includes('emerald')
  ) {
    result.recommendedTemplate = 'emerald-explorer';
  } else {
    result.recommendedTemplate = 'agency-portal';
  }

  // 22. Títulos Persuasivos para Hero Section
  const resolvedName = result.name || 'Expedición Andina Oficial';
  const resolvedDest = result.destination || 'Cusco & Machu Picchu';
  const resolvedDur = result.duration || 'Full Day';
  const resolvedPrice = result.price || 'Tarifa Especial';

  result.heroBadge = `${resolvedDest} • ${resolvedDur}`;
  result.heroTitle = resolvedName;
  result.heroSubtitle = `Descubre ${resolvedDest} con el respaldo oficial de ${
    result.companyName || 'Cusco Creativos Expeditions'
  }. Guiado oficial certificado, transporte turístico privado y logística garantizada desde ${resolvedPrice}.`;
  result.heroCta = 'Reservar Cupo por WhatsApp';

  return result;
}

