import { useCallback, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { CartaoExercicio } from "@/components/CartaoExercicio";
import { Cronometro } from "@/components/cronometro";
import { EditarExercicio } from "@/components/EditarExercicio";
import {
  atualizarTreino,
  buscarTreino,
  excluirTreino,
  registrarConclusao,
} from "@/utils/armazenamento";
import { buscarPorId } from "@/utils/exercicios";
import { estilosSerie } from "@/styles/telas/serie";
import { DESCANSO_PADRAO, ExercicioDoTreino, Treino } from "@/types/treino";

function confirmar(
  titulo: string,
  mensagem: string,
  acao: string,
  aoConfirmar: () => void,
  destrutivo = false
) {
  Alert.alert(titulo, mensagem, [
    { text: "Cancelar", style: "cancel" },
    {
      text: acao,
      style: destrutivo ? "destructive" : "default",
      onPress: aoConfirmar,
    },
  ]);
}

export default function DetalheSerie() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [treino, setTreino] = useState<Treino | undefined>(undefined);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [concluidos, setConcluidos] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setTreino(await buscarTreino(id));
        setCarregando(false);
      }
      carregar();
    }, [id])
  );

  async function atualizar(alteracoes: Partial<Treino>) {
    if (treino === undefined) return;
    setTreino({ ...treino, ...alteracoes });
    await atualizarTreino(treino.id, alteracoes);
  }

  async function alternarArquivamento() {
    if (treino === undefined) return;
    await atualizar({ arquivado: !treino.arquivado });
    router.back();
  }

  async function excluir() {
    await excluirTreino(id);
    router.back();
  }

  async function concluir() {
    if (treino === undefined) return;
    await registrarConclusao(treino.nome);
    router.replace("/");
  }

  function alternarConcluido(exercicioId: string) {
    setConcluidos((atual) =>
      atual.includes(exercicioId)
        ? atual.filter((item) => item !== exercicioId)
        : [...atual, exercicioId]
    );
  }

  function salvarExercicio(
    exercicioId: string,
    alteracoes: Partial<ExercicioDoTreino>
  ) {
    if (treino === undefined) return;
    atualizar({
      exercicios: treino.exercicios.map((e) =>
        e.exercicioId === exercicioId ? { ...e, ...alteracoes } : e
      ),
    });
    setEditandoId(null);
  }

  function mover(indice: number, delta: -1 | 1) {
    if (treino === undefined) return;
    const destino = indice + delta;
    if (destino < 0 || destino >= treino.exercicios.length) return;

    const novos = [...treino.exercicios];
    [novos[indice], novos[destino]] = [novos[destino], novos[indice]];
    atualizar({ exercicios: novos });
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

  const { nome, arquivado, exercicios, descanso } = treino;
  const feitos = exercicios.filter((e) => concluidos.includes(e.exercicioId)).length;
  const podeConcluir = feitos > exercicios.length / 2;
  const indiceEditando = exercicios.findIndex((e) => e.exercicioId === editandoId);
  const itemEditando = exercicios.find((e) => e.exercicioId === editandoId);

  return (
    <View style={estilosSerie.container}>
      <Stack.Screen
        options={{
          headerRight: arquivado
            ? undefined
            : () => (
                <Cronometro
                  duracao={descanso ?? DESCANSO_PADRAO}
                  onMudarDuracao={(segundos) => atualizar({ descanso: segundos })}
                />
              ),
        }}
      />

      <Text style={estilosSerie.titulo}>{nome}</Text>
      <Text style={estilosSerie.subtitulo}>{exercicios.length} exercícios</Text>

      <ScrollView contentContainerStyle={estilosSerie.lista}>
        {exercicios.map((item, indice) => {
          const exercicio = buscarPorId(item.exercicioId);
          if (exercicio === undefined) return null;

          return (
            <CartaoExercicio
              key={item.exercicioId}
              numero={indice + 1}
              exercicio={exercicio}
              item={item}
              editavel={!arquivado}
              concluido={concluidos.includes(item.exercicioId)}
              onEditar={() => setEditandoId(item.exercicioId)}
              onAlternarConcluido={() => alternarConcluido(item.exercicioId)}
            />
          );
        })}

        {arquivado ? (
          <>
            <Botao
              titulo="Desarquivar"
              onPress={() =>
                confirmar(
                  "Desarquivar série",
                  "Quer mesmo desarquivar esta série?",
                  "Desarquivar",
                  alternarArquivamento
                )
              }
            />
            <Botao
              titulo="Excluir definitivamente"
              variante="perigo"
              onPress={() =>
                confirmar(
                  "Excluir série",
                  "Isso apaga a série para sempre. Continuar?",
                  "Excluir",
                  excluir,
                  true
                )
              }
            />
          </>
        ) : (
          <>
                        {podeConcluir ? (
              <Botao titulo="Concluir treino" onPress={concluir} />
            ) : (
              <Botao
                titulo="Sair sem concluir"
                variante="secundario"
                onPress={() => router.replace("/")}
              />
            )}
            <Botao
              titulo="Editar série"
              variante="secundario"
              onPress={() =>
                router.push({ pathname: "/montar", params: { id } })
              }
            />
            <Botao
              titulo="Arquivar"
              variante="secundario"
              onPress={() =>
                confirmar(
                  "Arquivar série",
                  "Quer mesmo arquivar esta série?",
                  "Arquivar",
                  alternarArquivamento
                )
              }
            />
          </>
        )}
      </ScrollView>

      {itemEditando !== undefined && (
        <EditarExercicio
          key={itemEditando.exercicioId}
          nome={buscarPorId(itemEditando.exercicioId)?.nome ?? ""}
          item={itemEditando}
          posicao={indiceEditando + 1}
          total={exercicios.length}
          onSubir={() => mover(indiceEditando, -1)}
          onDescer={() => mover(indiceEditando, 1)}
          onSalvar={(alteracoes) =>
            salvarExercicio(itemEditando.exercicioId, alteracoes)
          }
          onFechar={() => setEditandoId(null)}
        />
      )}
    </View>
  );
}