// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Verificar se as variáveis existem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para o banco
export interface FormSubmission {
  id: string
  category_id: string
  user_name?: string
  user_phone?: string
  user_email?: string
  form_data: Record<string, unknown>
  created_at: string
}

export interface ServiceCategory {
  id: string
  name: string
  icon?: string
  created_at: string
}