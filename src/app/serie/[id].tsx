import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { Contador } from "@/components/contador";
import {
  arquivarTreino,
  atualizarExercicio,
  buscarTreino,
  excluirTreino,
} from "@/utils/armazenamento";
import { buscarPorId } from "@/utils/exercicios";
import { ExercicioDoTreino, Treino } from "@/types/treino";
import { estilosSerie } from "@/styles/telas/serie";
import { ImagemExercicio } from "@/components/ImagemExercicio";

type Campo = keyof Omit<ExercicioDoTreino, "exercicioId">;

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

  async function excluir() {
    await excluirTreino(id);
    router.back();
  }

  function concluir() {
    router.replace("/");
  }

  function mudar(exercicioId: string, campo: Campo, delta: number, minimo: number) {
    if (treino === undefined) return;
    const atual = treino.exercicios.find((e) => e.exercicioId === exercicioId);
    if (atual === undefined) return;

    const novoValor = Math.max(minimo, atual[campo] + delta);

    setTreino({
      ...treino,
      exercicios: treino.exercicios.map((e) =>
        e.exercicioId === exercicioId ? { ...e, [campo]: novoValor } : e
      ),
    });
    atualizarExercicio(treino.id, exercicioId, campo, novoValor);
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

      <ScrollView contentContainerStyle={estilosSerie.lista}>
        {treino.exercicios.map((item) => {
          const exercicio = buscarPorId(item.exercicioId);
          if (exercicio === undefined) return null;

          return (
            <View key={item.exercicioId} style={estilosSerie.cartaoExercicio}>
              
              <Text style={estilosSerie.nomeExercicio}>{exercicio.nome}</Text>
              <ImagemExercicio uri={exercicio.img} />
              <Text style={estilosSerie.descricao}>{exercicio.descricao}</Text>

              <Contador
                rotulo="Séries"
                valor={item.series}
                onMenos={() => mudar(item.exercicioId, "series", -1, 1)}
                onMais={() => mudar(item.exercicioId, "series", 1, 1)}
              />
              <Contador
                rotulo="Repetições"
                valor={item.repeticoes}
                onMenos={() => mudar(item.exercicioId, "repeticoes", -1, 1)}
                onMais={() => mudar(item.exercicioId, "repeticoes", 1, 1)}
              />
              <Contador
                rotulo="Carga"
                valor={item.carga}
                unidade=" kg"
                onMenos={() => mudar(item.exercicioId, "carga", -1, 0)}
                onMais={() => mudar(item.exercicioId, "carga", 1, 0)}
              />
            </View>
          );
        })}
      
        {treino.arquivado ? (
          <>
            <Botao
              titulo="Desarquivar"
              onPress={() =>
                Alert.alert(
                  "Desarquivar série",
                  "Quer mesmo desarquivar esta série?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Desarquivar", onPress: arquivar },
                  ]
                )
              }
            />
            <Botao
              titulo="Excluir definitivamente"
              variante="perigo"
              onPress={() =>
                Alert.alert(
                  "Excluir série",
                  "Isso apaga a série para sempre. Continuar?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", style: "destructive", onPress: excluir },
                  ]
                )
              }
            />
          </>
        ) : (
          <>
            <Botao titulo="Concluir treino" onPress={concluir} />
            <Botao
              titulo="Arquivar"
              variante="secundario"
              onPress={() =>
                Alert.alert("Arquivar série", "Quer mesmo arquivar esta série?", [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Arquivar", onPress: arquivar },
                ])
              }
            />
          </>
        )}


      </ScrollView>
    </View>
  );
}