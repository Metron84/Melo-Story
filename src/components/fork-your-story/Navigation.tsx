'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  PenLine, 
  Sparkles,
  ChevronDown,
  Library,
  BarChart3
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/fork-your-story', label: 'Home', exact: true },
  { href: '/fork-your-story/library', label: 'Library' },
  { href: '/fork-your-story/write', label: 'Write' },
  { href: '/fork-your-story/pricing', label: 'Pricing' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, profile, signOut, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsUserMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-fys-deep/95 backdrop-blur-md shadow-sm border-b border-fys-earth/10' 
            : 'bg-transparent'
        )}
      >
        <nav className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              href="/fork-your-story" 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-fys-ink flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="font-serif text-fys-deep text-lg font-medium">M</span>
              </div>
              <span className="font-serif text-xl tracking-tight hidden sm:block">
                MrMelo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 font-sans text-sm tracking-wide transition-colors duration-200',
                    isActive(link.href, link.exact)
                      ? 'text-fys-ink'
                      : 'text-fys-stone hover:text-fys-ink'
                  )}
                >
                  {link.label}
                  {isActive(link.href, link.exact) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="h-px bg-fys-accent mt-0.5"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? (
                <div className="w-24 h-9 skeleton" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-fys-cream/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-fys-sage/30 flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt="" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-fys-stone" />
                      )}
                    </div>
                    <span className="font-sans text-sm text-fys-ink">
                      {profile?.display_name || 'Account'}
                    </span>
                    <ChevronDown className={cn(
                      'w-4 h-4 text-fys-stone transition-transform duration-200',
                      isUserMenuOpen && 'rotate-180'
                    )} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 bg-fys-deep border border-fys-earth/20 shadow-lg rounded-sm z-50"
                        >
                          <div className="p-3 border-b border-fys-earth/10">
                            <p className="font-serif text-sm text-fys-ink">
                              {profile?.display_name || 'Writer'}
                            </p>
                            <p className="text-xs text-fys-stone truncate">
                              {profile?.email}
                            </p>
                          </div>
                          <div className="p-2">
                            <Link
                              href="/fork-your-story/library"
                              className="flex items-center gap-3 px-3 py-2 text-sm text-fys-stone hover:text-fys-ink hover:bg-fys-cream/50 rounded-sm transition-colors"
                            >
                              <Library className="w-4 h-4" />
                              My Library
                            </Link>
                            <Link
                              href="/fork-your-story/library/insights"
                              className="flex items-center gap-3 px-3 py-2 text-sm text-fys-stone hover:text-fys-ink hover:bg-fys-cream/50 rounded-sm transition-colors"
                            >
                              <BarChart3 className="w-4 h-4" />
                              Insights
                            </Link>
                            <Link
                              href="/fork-your-story/settings"
                              className="flex items-center gap-3 px-3 py-2 text-sm text-fys-stone hover:text-fys-ink hover:bg-fys-cream/50 rounded-sm transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                              Settings
                            </Link>
                          </div>
                          <div className="p-2 border-t border-fys-earth/10">
                            <button
                              onClick={() => signOut()}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-fys-stone hover:text-fys-ink hover:bg-fys-cream/50 rounded-sm transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/fork-your-story/sign-in"
                    className="btn-ghost"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/fork-your-story/sign-up"
                    className="btn-primary text-xs py-2"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2 text-fys-ink"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-fys-ink/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-fys-deep z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-fys-earth/10">
                  <span className="font-serif text-lg">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-4">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-sm transition-colors',
                            isActive(link.href, link.exact)
                              ? 'bg-fys-cream text-fys-ink'
                              : 'text-fys-stone hover:bg-fys-cream/50 hover:text-fys-ink'
                          )}
                        >
                          {link.label === 'Home' && <BookOpen className="w-5 h-5" />}
                          {link.label === 'Library' && <Library className="w-5 h-5" />}
                          {link.label === 'Write' && <PenLine className="w-5 h-5" />}
                          {link.label === 'Pricing' && <Sparkles className="w-5 h-5" />}
                          <span className="font-sans">{link.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {user && (
                    <div className="mt-6 px-4">
                      <div className="h-px bg-fys-earth/10 mb-4" />
                      <p className="px-4 text-xs uppercase tracking-wider text-fys-stone mb-2">
                        Account
                      </p>
                      <Link
                        href="/fork-your-story/library/insights"
                        className="flex items-center gap-3 px-4 py-3 text-fys-stone hover:bg-fys-cream/50 hover:text-fys-ink rounded-sm transition-colors"
                      >
                        <BarChart3 className="w-5 h-5" />
                        <span>Creative DNA Insights</span>
                      </Link>
                      <Link
                        href="/fork-your-story/settings"
                        className="flex items-center gap-3 px-4 py-3 text-fys-stone hover:bg-fys-cream/50 hover:text-fys-ink rounded-sm transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                    </div>
                  )}
                </nav>

                {/* Mobile Auth Section */}
                <div className="p-4 border-t border-fys-earth/10">
                  {isLoading ? (
                    <div className="h-12 skeleton rounded-sm" />
                  ) : user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-fys-sage/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-fys-stone" />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-fys-ink">
                            {profile?.display_name || 'Writer'}
                          </p>
                          <p className="text-xs text-fys-stone truncate">
                            {profile?.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full btn-secondary flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/fork-your-story/sign-up"
                        className="w-full btn-primary block text-center"
                      >
                        Sign Up Free
                      </Link>
                      <Link
                        href="/fork-your-story/sign-in"
                        className="w-full btn-secondary block text-center"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
