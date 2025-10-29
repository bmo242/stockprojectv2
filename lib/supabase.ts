import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create fallback values for development
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

// Use environment variables or fallbacks
const url = supabaseUrl || fallbackUrl
const anonKey = supabaseAnonKey || fallbackKey
const serviceKey = supabaseServiceKey || anonKey

export const supabase = createClient(url, anonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(url, serviceKey)

// Export environment status for debugging
export const envStatus = {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseAnonKey: !!supabaseAnonKey,
  hasSupabaseServiceKey: !!supabaseServiceKey,
}
