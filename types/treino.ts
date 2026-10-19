export type ExercicioDoTreino = {
  exercicioId: string;
  series: number;
  repeticoes: number;
  carga: number;
};

export type Treino = {
  id: string;
  nome: string;
  arquivado: boolean;
  criadoEm: string;
  exercicios: ExercicioDoTreino[];
};