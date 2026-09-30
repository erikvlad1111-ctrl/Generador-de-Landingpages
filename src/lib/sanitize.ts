/**
 * Utilidad de sanitización ligera y blindaje de entradas para prevenir XSS y ataques de inyección.
 */

export function sanitizeText(value: string | undefined | null): string {
  if (!value) return '';
  return value
    .replace(/[<>]/g, '') // Elimina etiquetas HTML potencialmente peligrosas
    .replace(/javascript:/gi, '') // Elimina pseudoprotocolos maliciosos
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result: any = { ...obj };
  for (const key in result) {
    if (typeof result[key] === 'string') {
      result[key] = sanitizeText(result[key]);
    }
  }
  return result;
}
