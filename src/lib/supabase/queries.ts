import { createClient } from './client';
import type { ProgressoUsuario } from '../types/osce';

export async function salvarProgresso(
  semestre: number,
  topicoIndex: number,
  subtopicoId: string,
  checklistItems: string[]
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Usuário não autenticado');

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      semestre,
      topico_index: topicoIndex,
      subtopico_id: subtopicoId,
      checklist_items: checklistItems,
      concluido: checklistItems.length > 0,
      ultima_atualizacao: new Date().toISOString(),
    }, {
      onConflict: 'user_id,semestre,topico_index,subtopico_id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function carregarProgresso(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data as ProgressoUsuario[];
}

export async function carregarProgressoPorSemestre(userId: string, semestre: number) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('semestre', semestre);

  if (error) throw error;
  return data as ProgressoUsuario[];
}

export async function verificarSessaoUnica(userId: string, deviceId: string) {
  const supabase = createClient();
  
  // Buscar sessão ativa
  const { data: sessaoAtiva } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('ativo', true)
    .single();

  // Se existe sessão ativa em outro dispositivo, desativar
  if (sessaoAtiva && sessaoAtiva.device_id !== deviceId) {
    await supabase
      .from('user_sessions')
      .update({ ativo: false })
      .eq('user_id', userId);
  }

  // Criar/atualizar sessão atual
  const sessionToken = crypto.randomUUID();
  const { data, error } = await supabase
    .from('user_sessions')
    .upsert({
      user_id: userId,
      device_id: deviceId,
      session_token: sessionToken,
      ultima_atividade: new Date().toISOString(),
      ativo: true,
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function atualizarAtividadeSessao(userId: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('user_sessions')
    .update({ ultima_atividade: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('ativo', true);

  if (error) throw error;
}

export async function desativarSessao(userId: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('user_sessions')
    .update({ ativo: false })
    .eq('user_id', userId);

  if (error) throw error;
}

export async function atualizarEstatisticas(
  userId: string,
  horasEstudo?: number,
  atividadesConcluidas?: number,
  semestresConcluidos?: number[]
) {
  const supabase = createClient();
  
  const updates: any = {
    user_id: userId,
    ultima_atualizacao: new Date().toISOString(),
  };

  if (horasEstudo !== undefined) {
    updates.total_horas_estudo = horasEstudo;
  }
  if (atividadesConcluidas !== undefined) {
    updates.total_atividades_concluidas = atividadesConcluidas;
  }
  if (semestresConcluidos !== undefined) {
    updates.semestres_concluidos = semestresConcluidos;
  }

  const { data, error } = await supabase
    .from('user_stats')
    .upsert(updates, {
      onConflict: 'user_id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function carregarEstatisticas(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data;
}
