"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  verificarSessaoUnica,
  atualizarAtividadeSessao,
  desativarSessao,
} from '@/lib/supabase/queries';

// Gerar ou recuperar device ID único
function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
}

export function useSessaoUnica() {
  const router = useRouter();
  const supabase = createClient();

  // Verificar e estabelecer sessão única
  const estabelecerSessao = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const deviceId = getDeviceId();
      await verificarSessaoUnica(user.id, deviceId);
    } catch (error) {
      console.error('Erro ao estabelecer sessão:', error);
    }
  }, [supabase.auth]);

  // Atualizar atividade da sessão (heartbeat)
  const atualizarAtividade = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await atualizarAtividadeSessao(user.id);
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
    }
  }, [supabase.auth]);

  // Encerrar sessão
  const encerrarSessao = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await desativarSessao(user.id);
      await supabase.auth.signOut();
      localStorage.removeItem('device_id');
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
    }
  }, [supabase.auth, router]);

  // Estabelecer sessão ao montar
  useEffect(() => {
    estabelecerSessao();
  }, [estabelecerSessao]);

  // Heartbeat a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      atualizarAtividade();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [atualizarAtividade]);

  // Listener para mudanças de autenticação
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          await estabelecerSessao();
        } else if (event === 'SIGNED_OUT') {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await desativarSessao(user.id);
          }
          localStorage.removeItem('device_id');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth, estabelecerSessao]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      // Não desativar sessão ao desmontar, apenas ao fazer logout explícito
    };
  }, []);

  return {
    estabelecerSessao,
    atualizarAtividade,
    encerrarSessao,
  };
}
