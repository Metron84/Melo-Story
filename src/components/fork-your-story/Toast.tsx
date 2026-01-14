'use client'

import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--fys-deep)',
          border: '1px solid var(--fys-earth)',
          color: 'var(--fys-ink)',
          fontFamily: 'var(--font-spectral)',
        },
        className: 'toast',
      }}
      expand={false}
      richColors
    />
  )
}

// Re-export toast function
export { toast } from 'sonner'
