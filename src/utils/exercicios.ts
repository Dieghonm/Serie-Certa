import exercicios from "../data/exercicios.json";
import { Exercicio } from "../types/exercicio";

const lista: Exercicio[] = exercicios;

const NOMES_GRUPOS: Record<string, string> = {
  costas: "Costas",
  biceps: "Bíceps",
  triceps: "Tríceps",
  peito: "Peito",
  ombros: "Ombros",
  pernas: "Pernas",
  core: "Core",
};

export function buscarTodos(): Exercicio[] {
  return lista;
}

export function buscarPorId(id: string): Exercicio | undefined {
  return lista.find((e) => e.id === id);
}

export function nomeDoGrupo(grupo: string): string {
  return NOMES_GRUPOS[grupo] ?? grupo;
}