export type ExercicioDoTreino = {
  exercicioId: string;
  series: number;
  repeticoes: number;
  carga: number;
};

export const DESCANSO_PADRAO = 60;

export type Treino = {
  id: string;
  nome: string;
  arquivado: boolean;
  criadoEm: string;
  exercicios: ExercicioDoTreino[];
  descanso?: number;
};

export type Conclusao = {
  id: string;
  data: string;
  nome: string;
};