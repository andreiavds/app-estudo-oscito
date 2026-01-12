// Tipos para o sistema OSCE

export interface Subtopico {
  id: string;
  text: string;
  imageUrl?: string;
  contextualizacao?: string;
  passoAPasso?: PassoAPasso[];
  checklist?: ItemChecklist[];
}

export interface PassoAPasso {
  ordem: number;
  titulo: string;
  descricao: string;
  imageUrl?: string;
  pontosCriticos?: string[];
  errosComuns?: string[];
}

export interface ItemChecklist {
  id: string;
  texto: string;
  pontos: number;
  categoria: 'obrigatorio' | 'importante' | 'diferencial';
}

export interface ConteudoSemestre {
  topico: string;
  subtopicos: Subtopico[];
  categoria: string;
}

export interface DadosSemestre {
  semestre: number;
  periodo: string;
  progresso: number;
  horasEstudo: number;
  atividadesConcluidas: number;
  totalAtividades: number;
  conteudos: ConteudoSemestre[];
}

export interface ProgressoUsuario {
  user_id: string;
  semestre: number;
  topico_index: number;
  subtopico_id: string;
  checklist_items: string[]; // IDs dos itens marcados
  concluido: boolean;
  ultima_atualizacao: string;
}

export interface SessaoUsuario {
  user_id: string;
  device_id: string;
  session_token: string;
  ultima_atividade: string;
  ativo: boolean;
}
