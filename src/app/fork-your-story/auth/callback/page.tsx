'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/fork-your-story/sign-in?error=auth_failed')
          return
        }

        if (data.session) {
          // Check if profile exists, if not create it
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.session.user.id)
            .single()

          if (!profile) {
            await supabase.from('profiles').insert({
              id: data.session.user.id,
              email: data.session.user.email,
              display_name: data.session.user.user_metadata?.full_name || null,
              avatar_url: data.session.user.user_metadata?.avatar_url || null,
              tier: 'wanderer',
              stories_count: 0,
            })
          }

          router.push('/fork-your-story/library')
        } else {
          router.push('/fork-your-story/sign-in')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/fork-your-story/sign-in?error=auth_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4">
          <div className="w-full h-full border-2 border-fys-accent border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-fys-stone">Completing sign in...</p>
      </div>
    </div>
  )
}
