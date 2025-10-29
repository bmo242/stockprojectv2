'use client'

import { useEffect, useState } from 'react'

export function EnvCheck() {
  const [envStatus, setEnvStatus] = useState({
    supabaseUrl: false,
    supabaseAnonKey: false,
    supabaseServiceKey: false,
  })

  useEffect(() => {
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    })
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs">
      <div>Supabase URL: {envStatus.supabaseUrl ? '✅' : '❌'}</div>
      <div>Supabase Anon Key: {envStatus.supabaseAnonKey ? '✅' : '❌'}</div>
      <div>Supabase Service Key: {envStatus.supabaseServiceKey ? '✅' : '❌'}</div>
    </div>
  )
}
