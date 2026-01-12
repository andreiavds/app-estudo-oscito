"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  salvarProgresso,
  carregarProgresso,
  carregarProgressoPorSemestre,
} from '@/lib/supabase/queries';
import type { ProgressoUsuario } from '@/lib/types/osce';

export function useProgresso(semestre?: number) {
  const [progresso, setProgresso] = useState<Map<string, string[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  // Carregar progresso do banco
  useEffect(() => {
    async function loadProgresso() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        setUserId(user.id);

        const data = semestre
          ? await carregarProgressoPorSemestre(user.id, semestre)
          : await carregarProgresso(user.id);

        const progressoMap = new Map<string, string[]>();
        data.forEach((item: ProgressoUsuario) => {
          const key = `${item.semestre}-${item.topico_index}-${item.subtopico_id}`;
          progressoMap.set(key, item.checklist_items);
        });

        setProgresso(progressoMap);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProgresso();
  }, [semestre, supabase.auth]);

  // Salvar progresso
  const salvar = useCallback(async (
    semestreNum: number,
    topicoIndex: number,
    subtopicoId: string,
    checklistItems: string[]
  ) => {
    if (!userId) return;

    try {
      await salvarProgresso(semestreNum, topicoIndex, subtopicoId, checklistItems);
      
      const key = `${semestreNum}-${topicoIndex}-${subtopicoId}`;
      setProgresso(prev => {
        const newMap = new Map(prev);
        newMap.set(key, checklistItems);
        return newMap;
      });
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      throw error;
    }
  }, [userId]);

  // Obter itens marcados
  const getChecklistItems = useCallback((
    semestreNum: number,
    topicoIndex: number,
    subtopicoId: string
  ): string[] => {
    const key = `${semestreNum}-${topicoIndex}-${subtopicoId}`;
    return progresso.get(key) || [];
  }, [progresso]);

  // Verificar se item está marcado
  const isItemChecked = useCallback((
    semestreNum: number,
    topicoIndex: number,
    subtopicoId: string,
    itemId: string
  ): boolean => {
    const items = getChecklistItems(semestreNum, topicoIndex, subtopicoId);
    return items.includes(itemId);
  }, [getChecklistItems]);

  // Toggle item do checklist
  const toggleItem = useCallback(async (
    semestreNum: number,
    topicoIndex: number,
    subtopicoId: string,
    itemId: string
  ) => {
    const currentItems = getChecklistItems(semestreNum, topicoIndex, subtopicoId);
    const newItems = currentItems.includes(itemId)
      ? currentItems.filter(id => id !== itemId)
      : [...currentItems, itemId];

    await salvar(semestreNum, topicoIndex, subtopicoId, newItems);
  }, [getChecklistItems, salvar]);

  return {
    progresso,
    loading,
    salvar,
    getChecklistItems,
    isItemChecked,
    toggleItem,
  };
}
