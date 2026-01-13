/**
 * Metron Ventures WhatsApp Business Integration
 * Configured for Intelligence & Research Services
 */

export interface WhatsAppConfig {
  number: string; // Full international format (e.g., "+971501234567")
  message?: string; // Optional pre-filled message
}

/**
 * Default pre-filled message for Metron Intelligence inquiries
 */
const DEFAULT_INTELLIGENCE_MESSAGE = `Hello! I'm interested in Metron Intelligence research and development services. Could you provide more information about:

• Research packages and deliverables
• Timeline and process
• Pricing for my specific needs

Thank you!`;

/**
 * Generates a WhatsApp Business link for Metron Intelligence inquiries
 * 
 * @param config - WhatsApp configuration
 * @param customMessage - Optional custom message to override default
 * @returns WhatsApp deep link URL
 * 
 * @example
 * ```ts
 * const link = getMetronIntelligenceWhatsAppLink({
 *   number: process.env.NEXT_PUBLIC_METRON_WHATSAPP_NUMBER || "+971501234567"
 * });
 * ```
 */
export function getMetronIntelligenceWhatsAppLink(
  config: WhatsAppConfig,
  customMessage?: string
): string {
  const { number, message } = config;
  
  // Remove any spaces, dashes, or parentheses from the number
  const cleanNumber = number.replace(/[\s\-()]/g, '');
  
  // Ensure number starts with country code (no leading + if needed)
  const whatsappNumber = cleanNumber.startsWith('+') 
    ? cleanNumber.slice(1) 
    : cleanNumber;
  
  // Use custom message if provided, otherwise use config message, otherwise default
  const finalMessage = customMessage || message || DEFAULT_INTELLIGENCE_MESSAGE;
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(finalMessage);
  
  // Generate WhatsApp Business link
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Gets WhatsApp Business configuration from environment variables
 * Falls back to a placeholder if not configured
 */
export function getMetronWhatsAppConfig(): WhatsAppConfig {
  const number = process.env.NEXT_PUBLIC_METRON_WHATSAPP_NUMBER || '';
  
  if (!number) {
    console.warn(
      'NEXT_PUBLIC_METRON_WHATSAPP_NUMBER environment variable is not set. ' +
      'Please configure your WhatsApp Business number in .env.local'
    );
  }
  
  return {
    number,
    message: DEFAULT_INTELLIGENCE_MESSAGE,
  };
}

/**
 * Quick helper to get WhatsApp link for intelligence inquiries
 * Uses environment variable for number
 */
export function getIntelligenceWhatsAppLink(customMessage?: string): string {
  const config = getMetronWhatsAppConfig();
  return getMetronIntelligenceWhatsAppLink(config, customMessage);
}

/**
 * Service-specific message templates for different Metron Intelligence services
 */
export const INTELLIGENCE_MESSAGES = {
  general: DEFAULT_INTELLIGENCE_MESSAGE,
  
  equityFirms: `Hello! I'm from an equity firm/investment team and interested in Metron Intelligence services:

• Due diligence packages
• Market intelligence
• Portfolio company research
• Thesis validation

Could you provide more information?`,
  
  scalingOperations: `Hello! I'm from a scaling operations/growth stage company interested in:

• Digital transformation research
• Technology audits
• AI integration strategy
• Process automation research

Please share more details.`,
  
  founders: `Hello! I'm a founder/entrepreneur interested in Metron Intelligence:

• Business model research
• Market positioning
• Go-to-market strategy
• Competitive analysis

Could you provide information about packages and pricing?`,
  
  custom: (service: string) => `Hello! I'm interested in Metron Intelligence services for: ${service}

Could you provide more information about packages, timeline, and pricing?`,
} as const;
