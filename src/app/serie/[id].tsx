import { useCallback, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { Contador } from "@/components/contador";
import {
  arquivarTreino,
  atualizarDescanso,
  atualizarExercicio,
  buscarTreino,
  excluirTreino,
  reordenarExercicios,
} from "@/utils/armazenamento";
import { buscarPorId } from "@/utils/exercicios";
import { estilosSerie } from "@/styles/telas/serie";
import { ImagemExercicio } from "@/components/ImagemExercicio";
import { Cronometro } from "@/components/cronometro";
import { DESCANSO_PADRAO, ExercicioDoTreino, Treino } from "@/types/treino";

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

  function mover(indice: number, delta: -1 | 1) {
    if (treino === undefined) return;
    const destino = indice + delta;
    if (destino < 0 || destino >= treino.exercicios.length) return;

    const novos = [...treino.exercicios];
    [novos[indice], novos[destino]] = [novos[destino], novos[indice]];

    setTreino({ ...treino, exercicios: novos });
    reordenarExercicios(treino.id, novos);
  }

  function mudarDescanso(segundos: number) {
    if (treino === undefined) return;
    setTreino({ ...treino, descanso: segundos });
    atualizarDescanso(treino.id, segundos);
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
      <Stack.Screen
        options={{
          headerRight: treino.arquivado
            ? undefined
            : () => (
                <Cronometro
                  duracao={treino.descanso ?? DESCANSO_PADRAO}
                  onMudarDuracao={mudarDescanso}
                />
              ),
        }}
      />
      <Text style={estilosSerie.titulo}>{treino.nome}</Text>
      <Text style={estilosSerie.subtitulo}>
        {treino.exercicios.length} exercícios
      </Text>

      <ScrollView contentContainerStyle={estilosSerie.lista}>
        {treino.exercicios.map((item, indice) => {
          const exercicio = buscarPorId(item.exercicioId);
          if (exercicio === undefined) return null;

          return (
            <View key={item.exercicioId} style={estilosSerie.cartaoExercicio}>
              <View style={estilosSerie.linhaTitulo}>
                <View style={estilosSerie.numeroCaixa}>
                  <Text style={estilosSerie.numero}>{indice + 1}</Text>
                </View>
                <Text style={estilosSerie.nomeExercicio}>{exercicio.nome}</Text>

                {!treino.arquivado && (
                  <>
                    <Pressable
                      onPress={() => mover(indice, -1)}
                      disabled={indice === 0}
                      style={[
                        estilosSerie.botaoOrdem,
                        indice === 0 && estilosSerie.botaoOrdemDesativado,
                      ]}
                    >
                      <Text style={estilosSerie.textoBotaoOrdem}>▲</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => mover(indice, 1)}
                      disabled={indice === treino.exercicios.length - 1}
                      style={[
                        estilosSerie.botaoOrdem,
                        indice === treino.exercicios.length - 1 &&
                          estilosSerie.botaoOrdemDesativado,
                      ]}
                    >
                      <Text style={estilosSerie.textoBotaoOrdem}>▼</Text>
                    </Pressable>
                  </>
                )}
              </View>

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