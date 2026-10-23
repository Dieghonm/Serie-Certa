import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { arquivarTreino, buscarTreino } from "@/utils/armazenamento";
import { Treino } from "@/types/treino";
import { estilosSerie } from "@/styles/telas/serie";

export default function DetalheSerie() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [treino, setTreino] = useState<Treino | undefined>(undefined);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setTreino(await buscarTreino(id));
        setCarregando(false);
      }
      carregar();
    }, [id])
  );

  async function arquivar() {
    await arquivarTreino(id);
    router.back();
  }

  if (treino === undefined) {
    return (
      <View style={estilosSerie.container}>
        <Text style={estilosSerie.mensagem}>
          {carregando ? "Carregando..." : "Série não encontrada."}
        </Text>
      </View>
    );
  }

  return (
    <View style={estilosSerie.container}>
      <Text style={estilosSerie.titulo}>{treino.nome}</Text>
      <Text style={estilosSerie.subtitulo}>
        {treino.exercicios.length} exercícios
      </Text>
      <Botao titulo="Arquivar" onPress={arquivar} />
    </View>
  );
}