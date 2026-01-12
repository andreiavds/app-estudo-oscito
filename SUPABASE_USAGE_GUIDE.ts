// ============================================
// GUIA DE USO DO SUPABASE COM NEXT.JS 15
// ============================================

// 1. COMPONENTES CLIENT (use client)
// ============================================
// Use src/lib/supabase/client.ts para componentes que rodam no navegador

import { createClient } from '@/lib/supabase/client'

export function ClientComponent() {
  const supabase = createClient()
  
  // Exemplo: buscar dados
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
    
    if (error) console.error(error)
    return data
  }
  
  return <div>Client Component</div>
}

// 2. SERVER COMPONENTS (padrão no App Router)
// ============================================
// Use src/lib/supabase/server.ts para componentes que rodam no servidor

import { createClient as createServerClient } from '@/lib/supabase/server'

export async function ServerComponent() {
  const supabase = await createServerClient()
  
  // Exemplo: buscar dados no servidor
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  if (error) console.error(error)
  
  return <div>Server Component with {data?.length} items</div>
}

// 3. ROUTE HANDLERS (API Routes)
// ============================================
// Use src/lib/supabase/server.ts em route handlers

import { createClient as createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}

// 4. SERVER ACTIONS
// ============================================
// Use src/lib/supabase/server.ts em server actions

'use server'

import { createClient as createServerClient } from '@/lib/supabase/server'

export async function createItem(formData: FormData) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('your_table')
    .insert({
      name: formData.get('name'),
    })
    .select()
  
  if (error) throw error
  return data
}

// 5. AUTENTICAÇÃO
// ============================================

// Client-side (componente com "use client")
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const supabase = createClient()
  
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) console.error(error)
    return data
  }
  
  return <form>...</form>
}

// Server-side (verificar usuário autenticado)
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function ProtectedPage() {
  const supabase = await createServerClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (!user) {
    // Redirecionar para login
    return <div>Not authenticated</div>
  }
  
  return <div>Welcome {user.email}</div>
}

// ============================================
// IMPORTANTE: MIDDLEWARE
// ============================================
// O arquivo middleware.ts na raiz do projeto já está configurado
// para atualizar automaticamente as sessões do Supabase
// Não é necessário fazer nada adicional!

// ============================================
// VARIÁVEIS DE AMBIENTE
// ============================================
// Copie .env.local.example para .env.local e preencha com suas credenciais:
// NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
