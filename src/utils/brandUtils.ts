/**
 * Utilidades para sanitización y presentación óptima de marcas,
 * logotipos y nombres de empresa en todas las plantillas (Desktop y Móvil).
 */

export function getCleanBrandName(
  companyName?: string,
  tourOrLandingName?: string,
  fallback: string = 'Agencia Turística'
): string {
  // 1. Si el usuario definió un nombre de empresa o agencia
  if (companyName && companyName.trim()) {
    const cleanedCompany = companyName
      .replace(/\s*\([Dd]ise[ñn]o\s*\d+[^)]*\)/gi, '')
      .replace(/\s*[-–:]\s*[Dd]ise[ñn]o\s*\d+.*$/gi, '')
      .replace(/^[Dd]ise[ñn]o\s*\d+\s*[-–:]\s*/i, '')
      .replace(/\s*\[[Dd]ise[ñn]o\s*\d+[^\]]*\]/gi, '')
      .trim();
    if (cleanedCompany) return cleanedCompany;
  }

  // 2. Si no hay companyName definido, extraer y limpiar el nombre de marca desde el tour/landing
  if (tourOrLandingName && tourOrLandingName.trim()) {
    let clean = tourOrLandingName
      .replace(/\s*\([Dd]ise[ñn]o\s*\d+[^)]*\)/gi, '')
      .replace(/\s*[-–:]\s*[Dd]ise[ñn]o\s*\d+.*$/gi, '')
      .replace(/^[Dd]ise[ñn]o\s*\d+\s*[-–:]\s*/i, '')
      .replace(/\s*\[[Dd]ise[ñn]o\s*\d+[^\]]*\]/gi, '')
      .replace(/:\s*la experiencia definitiva en cusco$/i, '')
      .replace(/:\s*machu picchu.*$/i, '')
      .replace(/:\s*expediciones.*$/i, '')
      .replace(/:\s*bit[áa]cora.*$/i, '')
      .replace(/:\s*experiencias.*$/i, '')
      .replace(/\s*\((expedici[óo]n|tour|privado)[^)]*\)/gi, '')
      .trim();

    if (clean) return clean;
  }

  return fallback;
}
