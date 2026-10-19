import exercicios from "../data/exercicios.json";
import { Exercicio } from "../types/exercicio";

const lista: Exercicio[] = exercicios;

export function buscarPorId(id: string): Exercicio | undefined {
  return lista.find((e) => e.id === id);
}

export function filtrarPorGrupo(grupo: string): Exercicio[] {

  return lista.filter((e) => e.grupoPrincipal === grupo);
}