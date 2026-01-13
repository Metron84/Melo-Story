# Metron Ventures WhatsApp Business Integration

This directory contains WhatsApp Business integration components and utilities for Metron Ventures Intelligence services.

## Setup

### 1. Environment Variable Configuration

Add your WhatsApp Business number to `.env.local`:

```env
NEXT_PUBLIC_METRON_WHATSAPP_NUMBER=+971501234567
```

**Format Requirements:**
- Include country code with `+` prefix (e.g., `+971` for UAE, `+1` for US)
- No spaces, dashes, or parentheses
- Full international format: `+[country code][number]`

**Examples:**
- UAE: `+971501234567`
- US: `+15551234567`
- UK: `+447911123456`

### 2. Usage

#### Basic WhatsApp Button

```tsx
import WhatsAppButton from '@/components/metron/WhatsAppButton';

export default function IntelligencePage() {
  return (
    <WhatsAppButton variant="primary" size="lg">
      Contact via WhatsApp
    </WhatsAppButton>
  );
}
```

#### Service-Specific Messages

Pre-filled messages for different client segments:

```tsx
// For Equity Firms & Investment Teams
<WhatsAppButton 
  serviceType="equityFirms"
  variant="primary"
>
  Get Investment Intelligence
</WhatsAppButton>

// For Scaling Operations & Growth Stage
<WhatsAppButton 
  serviceType="scalingOperations"
  variant="outline"
>
  Discuss Digital Transformation
</WhatsAppButton>

// For Founders & Solo Entrepreneurs
<WhatsAppButton 
  serviceType="founders"
  variant="secondary"
>
  Explore Business Research
</WhatsAppButton>

// Custom Service
<WhatsAppButton 
  serviceType="custom"
  customService="Market entry strategy for GCC region"
>
  Request Custom Research
</WhatsAppButton>
```

#### Text Link (Inline)

```tsx
import { WhatsAppLink } from '@/components/metron/WhatsAppButton';

<p>
  Have questions? <WhatsAppLink>Contact us on WhatsApp</WhatsAppLink> for immediate assistance.
</p>
```

#### Direct Link Generation

```tsx
import { getIntelligenceWhatsAppLink } from '@/lib/metron-whatsapp';

const whatsappLink = getIntelligenceWhatsAppLink();
// or with custom message
const customLink = getIntelligenceWhatsAppLink('I need help with market research');

<a href={whatsappLink}>Contact via WhatsApp</a>
```

## Component Props

### WhatsAppButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | `string?` | - | Override WhatsApp number (uses env var if not provided) |
| `message` | `string?` | - | Custom message to pre-fill |
| `serviceType` | `'equityFirms' \| 'scalingOperations' \| 'founders' \| 'custom'` | - | Service type for pre-filled message |
| `customService` | `string?` | - | Custom service description (if serviceType is 'custom') |
| `children` | `React.ReactNode` | `'Contact via WhatsApp'` | Button text |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'text'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `className` | `string?` | - | Additional CSS classes |
| `openInNewTab` | `boolean` | `false` | Open WhatsApp in new tab |

### Variants

- **primary**: Green WhatsApp-branded button (`bg-[#25D366]`)
- **secondary**: Dark theme button matching site design
- **outline**: Outlined button with WhatsApp green border
- **text**: Text-only link styled in WhatsApp green

## Message Templates

Default messages are optimized for Metron Intelligence inquiries and include:

- Service overview
- Key deliverables mention
- Timeline/pricing request
- Professional tone

Customize messages by:
1. Passing `message` prop directly
2. Using `serviceType` for pre-defined templates
3. Using utility functions with custom strings

## Best Practices

1. **Placement**: Add WhatsApp buttons in prominent locations:
   - Hero sections with CTAs
   - After service descriptions
   - In contact/footer sections
   - On pricing pages

2. **Messaging**: Use service-specific messages to:
   - Filter inquiries by client segment
   - Reduce initial clarification time
   - Improve conversion rates

3. **Mobile Optimization**: WhatsApp links work seamlessly on mobile devices, automatically opening the WhatsApp app if installed.

4. **Accessibility**: All components include proper ARIA labels for screen readers.

## Troubleshooting

### Number Not Working

1. Verify format: Must include country code with `+` prefix
2. Check environment variable: Ensure `NEXT_PUBLIC_` prefix is present
3. Restart dev server after adding environment variables

### Link Opens but Message Not Pre-filled

- Check that message is URL-encoded (handled automatically by utilities)
- Verify special characters are properly handled
- Test with simple message first

### Button Not Visible

- Check Tailwind classes are available
- Verify component import path is correct
- Ensure CSS variables are defined if using custom theme

## Integration Examples

### Intelligence Landing Page CTA

```tsx
<section className="text-center py-16">
  <h2>Get Decision-Ready Intelligence</h2>
  <p>Whether you're evaluating an acquisition or validating a business model</p>
  <div className="flex gap-4 justify-center mt-8">
    <WhatsAppButton variant="primary" size="lg">
      Initiate Contact
    </WhatsAppButton>
    <a href="/contact" className="btn-secondary">
      Email Us
    </a>
  </div>
</section>
```

### Service-Specific CTAs

```tsx
<div className="grid md:grid-cols-3 gap-8">
  <ServiceCard
    title="Equity Firms"
    cta={
      <WhatsAppButton serviceType="equityFirms" variant="outline" size="sm">
        Contact
      </WhatsAppButton>
    }
  />
  {/* ... */}
</div>
```

### Footer Integration

```tsx
<footer>
  <div>
    <p>Contact Us</p>
    <WhatsAppLink>WhatsApp Business</WhatsAppLink>
    <a href="mailto:info@metronventures.com">Email</a>
  </div>
</footer>
```
