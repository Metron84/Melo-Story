'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Share2, 
  X, 
  Twitter, 
  Linkedin, 
  Link2, 
  Mail, 
  Check,
  Facebook
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from './Toast'

interface ShareButtonProps {
  title: string
  description?: string
  url?: string
  quote?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function ShareButton({ 
  title, 
  description, 
  url, 
  quote,
  className,
  variant = 'secondary'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'ghost' && 'btn-ghost',
          'inline-flex items-center gap-2',
          className
        )}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        url={url}
        quote={quote}
      />
    </>
  )
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  url?: string
  quote?: string
}

export function ShareModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  url,
  quote 
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = quote || description || title

  const shareOptions = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'hover:bg-black/5',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        window.open(twitterUrl, '_blank', 'width=550,height=420')
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-500/5',
      action: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        window.open(fbUrl, '_blank', 'width=550,height=420')
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-blue-600/5',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        window.open(linkedinUrl, '_blank', 'width=550,height=420')
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-fys-sage/10',
      action: () => {
        const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
        window.location.href = mailUrl
      }
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-fys-ink/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-fys-deep border border-fys-earth/20 rounded-sm shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-fys-earth/10">
              <h3 className="font-serif text-lg">Share Story</h3>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-fys-stone hover:text-fys-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Preview */}
            <div className="p-4 border-b border-fys-earth/10">
              <p className="font-serif text-fys-ink mb-1">{title}</p>
              {description && (
                <p className="text-sm text-fys-stone line-clamp-2">{description}</p>
              )}
            </div>

            {/* Share Options */}
            <div className="p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-fys-stone mb-3">
                Share via
              </p>
              <div className="grid grid-cols-2 gap-2">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-sm border border-fys-earth/20 transition-colors',
                      option.color
                    )}
                  >
                    <option.icon className="w-5 h-5 text-fys-stone" />
                    <span className="text-sm text-fys-ink">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Link */}
            <div className="p-4 border-t border-fys-earth/10">
              <p className="text-xs uppercase tracking-wider text-fys-stone mb-3">
                Or copy link
              </p>
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 bg-fys-cream/50 border border-fys-earth/20 rounded-sm">
                  <p className="text-sm text-fys-stone truncate">{shareUrl}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={cn(
                    'px-4 py-2 rounded-sm border transition-all duration-200',
                    copied
                      ? 'bg-fys-sage/20 border-fys-sage text-fys-sage'
                      : 'border-fys-earth/20 text-fys-stone hover:border-fys-accent hover:text-fys-ink'
                  )}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Link2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Social Share Card Preview (for generating OG images)
interface ShareCardProps {
  title: string
  excerpt: string
  historicalParallels?: string[]
  fork?: { title: string; subtitle: string }
}

export function ShareCardPreview({ title, excerpt, historicalParallels, fork }: ShareCardProps) {
  return (
    <div className="w-[1200px] h-[630px] bg-fys-deep p-12 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-fys-ink flex items-center justify-center">
          <span className="font-serif text-fys-deep text-xl">M</span>
        </div>
        <span className="font-serif text-2xl">Fork Your Story</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-serif text-5xl text-fys-ink mb-6 leading-tight">
          {title}
        </h1>
        <p className="font-sans text-xl text-fys-stone leading-relaxed max-w-3xl">
          {excerpt}
        </p>

        {/* Historical Parallels */}
        {historicalParallels && historicalParallels.length > 0 && (
          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm uppercase tracking-wider text-fys-stone">
              Creative DNA:
            </span>
            {historicalParallels.map((name) => (
              <span key={name} className="badge">{name}</span>
            ))}
          </div>
        )}

        {/* Fork Preview */}
        {fork && (
          <div className="mt-8 p-6 border border-fys-earth/20 rounded-sm max-w-xl">
            <p className="text-xs uppercase tracking-wider text-fys-accent mb-2">
              Narrative Fork
            </p>
            <p className="font-serif text-xl text-fys-ink">{fork.title}</p>
            <p className="text-sm text-fys-stone">{fork.subtitle}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-fys-earth/20">
        <p className="text-fys-stone">mrmelo.com/fork-your-story</p>
        <p className="font-serif italic text-fys-stone">
          &quot;Discover the forks in your story&quot;
        </p>
      </div>
    </div>
  )
}
