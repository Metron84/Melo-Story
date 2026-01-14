'use client';

import Link from 'next/link';
import { getIntelligenceWhatsAppLink, getMetronIntelligenceWhatsAppLink, INTELLIGENCE_MESSAGES } from '@/lib/metron-whatsapp';

interface WhatsAppButtonProps {
  /**
   * Optional custom WhatsApp number override
   * If not provided, uses NEXT_PUBLIC_METRON_WHATSAPP_NUMBER from environment
   */
  number?: string;
  
  /**
   * Optional custom message override
   * If not provided, uses default intelligence inquiry message
   */
  message?: string;
  
  /**
   * Service type for pre-filled messages
   */
  serviceType?: keyof typeof INTELLIGENCE_MESSAGES | 'custom';
  
  /**
   * Custom service description (only used if serviceType is 'custom')
   */
  customService?: string;
  
  /**
   * Button text
   */
  children?: React.ReactNode;
  
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Open in new tab?
   */
  openInNewTab?: boolean;
}

/**
 * WhatsApp Business Button Component for Metron Ventures Intelligence
 * 
 * Professional WhatsApp contact button optimized for research & development inquiries
 * 
 * @example
 * ```tsx
 * <WhatsAppButton variant="primary" size="lg">
 *   Contact via WhatsApp
 * </WhatsAppButton>
 * ```
 * 
 * @example
 * ```tsx
 * <WhatsAppButton 
 *   serviceType="equityFirms"
 *   variant="outline"
 * >
 *   Get Investment Intelligence
 * </WhatsAppButton>
 * ```
 */
export default function WhatsAppButton({
  number,
  message,
  serviceType,
  customService,
  children = 'Contact via WhatsApp',
  variant = 'primary',
  size = 'md',
  className = '',
  openInNewTab = false,
}: WhatsAppButtonProps) {
  // Determine the message to use
  let finalMessage = message;
  
  if (!finalMessage && serviceType) {
    if (serviceType === 'custom' && customService) {
      finalMessage = INTELLIGENCE_MESSAGES.custom(customService);
    } else if (serviceType !== 'custom') {
      finalMessage = INTELLIGENCE_MESSAGES[serviceType];
    }
  }
  
  // Generate WhatsApp link
  const whatsappLink = number
    ? getMetronIntelligenceWhatsAppLink({ number, message: finalMessage }, finalMessage)
    : getIntelligenceWhatsAppLink(finalMessage);
  
  // Button base classes
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles
  const variantClasses = {
    primary: 'bg-[#25D366] text-white hover:bg-[#20BA5A] focus:ring-[#25D366]',
    secondary: 'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground',
    outline: 'border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 focus:ring-[#25D366]',
    text: 'text-[#25D366] hover:bg-[#25D366]/10 focus:ring-[#25D366]',
  };
  
  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // WhatsApp icon SVG
  const WhatsAppIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
  
  return (
    <Link
      href={whatsappLink}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={buttonClasses}
      aria-label="Contact Metron Intelligence via WhatsApp Business"
    >
      <WhatsAppIcon />
      {children}
    </Link>
  );
}

/**
 * Inline WhatsApp link component (text link, not a button)
 */
export function WhatsAppLink({
  number,
  message,
  serviceType,
  customService,
  children = 'WhatsApp',
  className = '',
  openInNewTab = true,
}: Omit<WhatsAppButtonProps, 'variant' | 'size'>) {
  let finalMessage = message;
  
  if (!finalMessage && serviceType) {
    if (serviceType === 'custom' && customService) {
      finalMessage = INTELLIGENCE_MESSAGES.custom(customService);
    } else if (serviceType !== 'custom') {
      finalMessage = INTELLIGENCE_MESSAGES[serviceType];
    }
  }
  
  const whatsappLink = number
    ? getMetronIntelligenceWhatsAppLink({ number, message: finalMessage }, finalMessage)
    : getIntelligenceWhatsAppLink(finalMessage);
  
  return (
    <Link
      href={whatsappLink}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1 text-[#25D366] hover:underline ${className}`}
      aria-label="Contact Metron Intelligence via WhatsApp"
    >
      {children}
    </Link>
  );
}
