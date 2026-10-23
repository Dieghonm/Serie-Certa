import AsyncStorage from "@react-native-async-storage/async-storage";
import { Treino } from "../types/treino";

const CHAVE = "serie-certa:treinos";

export async function listarTreinos(): Promise<Treino[]> {
  const texto = await AsyncStorage.getItem(CHAVE);
  if (texto === null) return [];
  return JSON.parse(texto) as Treino[];
}

async function salvarTreinos(treinos: Treino[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
}

export async function criarTreino(treino: Treino): Promise<void> {
  const treinos = await listarTreinos();
  await salvarTreinos([...treinos, treino]);
}

export async function arquivarTreino(id: string): Promise<void> {
  const treinos = await listarTreinos();
  const atualizados = treinos.map((t) =>
    t.id === id ? { ...t, arquivado: true } : t,
  );
  await salvarTreinos(atualizados);
}

export async function excluirTreino(id: string): Promise<void> {
  const treinos = await listarTreinos();
  const restantes = treinos.filter((t) => t.id !== id);
  await salvarTreinos(restantes);
}

export async function buscarTreino(id: string): Promise<Treino | undefined> {
  const treinos = await listarTreinos();
  return treinos.find((t) => t.id === id);
}
