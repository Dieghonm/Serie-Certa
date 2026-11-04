import AsyncStorage from "@react-native-async-storage/async-storage";
import { criarSeriesIniciais } from "@/data/seriesIniciais";
import { Treino } from "@/types/treino";

const CHAVE = "serie-certa:treinos";
const CHAVE_INICIAIS = "serie-certa:series-iniciais";

export async function prepararSeriesIniciais(): Promise<void> {
  if ((await AsyncStorage.getItem(CHAVE_INICIAIS)) !== null) return;

  const treinos = await listarTreinos();
  await salvarTreinos([...treinos, ...criarSeriesIniciais()]);
  await AsyncStorage.setItem(CHAVE_INICIAIS, "1");
}

export async function listarTreinos(): Promise<Treino[]> {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto === null ? [] : (JSON.parse(texto) as Treino[]);
}

async function salvarTreinos(treinos: Treino[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(treinos));
}

export async function buscarTreino(id: string): Promise<Treino | undefined> {
  const treinos = await listarTreinos();
  return treinos.find((t) => t.id === id);
}

export async function criarTreino(treino: Treino): Promise<void> {
  const treinos = await listarTreinos();
  await salvarTreinos([...treinos, treino]);
}

export async function atualizarTreino(
  id: string,
  alteracoes: Partial<Treino>,
): Promise<void> {
  const treinos = await listarTreinos();
  await salvarTreinos(
    treinos.map((t) => (t.id === id ? { ...t, ...alteracoes } : t)),
  );
}

export async function excluirTreino(id: string): Promise<void> {
  const treinos = await listarTreinos();
  await salvarTreinos(treinos.filter((t) => t.id !== id));
}