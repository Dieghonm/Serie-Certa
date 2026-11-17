import { useCallback, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { Contador } from "@/components/contador";
import { Cronometro } from "@/components/cronometro";
import { ImagemExercicio } from "@/components/ImagemExercicio";
import {
  atualizarTreino,
  buscarTreino,
  excluirTreino,
  registrarConclusao,
} from "@/utils/armazenamento";
import { buscarPorId } from "@/utils/exercicios";
import { estilosSerie } from "@/styles/telas/serie";
import { DESCANSO_PADRAO, ExercicioDoTreino, Treino } from "@/types/treino";

type Campo = keyof Omit<ExercicioDoTreino, "exercicioId">;

type ConfigCampo = {
  campo: Campo;
  rotulo: string;
  minimo: number;
  unidade?: string;
};

const CAMPOS: ConfigCampo[] = [
  { campo: "series", rotulo: "Séries", minimo: 1 },
  { campo: "repeticoes", rotulo: "Repetições", minimo: 1 },
  { campo: "carga", rotulo: "Carga", minimo: 0, unidade: " kg" },
];

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

type PropsBotaoOrdem = {
  simbolo: string;
  desativado: boolean;
  onPress: () => void;
};

function BotaoOrdem({ simbolo, desativado, onPress }: PropsBotaoOrdem) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desativado}
      style={[
        estilosSerie.botaoOrdem,
        desativado && estilosSerie.botaoOrdemDesativado,
      ]}
    >
      <Text style={estilosSerie.textoBotaoOrdem}>{simbolo}</Text>
    </Pressable>
  );
}

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

  function mudar(exercicioId: string, config: ConfigCampo, delta: number) {
    if (treino === undefined) return;
    atualizar({
      exercicios: treino.exercicios.map((e) =>
        e.exercicioId === exercicioId
          ? { ...e, [config.campo]: Math.max(config.minimo, e[config.campo] + delta) }
          : e
      ),
    });
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
  const ultimo = exercicios.length - 1;

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
            <View key={item.exercicioId} style={estilosSerie.cartaoExercicio}>
              <View style={estilosSerie.linhaTitulo}>
                <View style={estilosSerie.numeroCaixa}>
                  <Text style={estilosSerie.numero}>{indice + 1}</Text>
                </View>
                <Text style={estilosSerie.nomeExercicio}>{exercicio.nome}</Text>

                {!arquivado && (
                  <>
                    <BotaoOrdem
                      simbolo="▲"
                      desativado={indice === 0}
                      onPress={() => mover(indice, -1)}
                    />
                    <BotaoOrdem
                      simbolo="▼"
                      desativado={indice === ultimo}
                      onPress={() => mover(indice, 1)}
                    />
                  </>
                )}
              </View>

              <ImagemExercicio uri={exercicio.img} />
              <Text style={estilosSerie.descricao}>{exercicio.descricao}</Text>

              {CAMPOS.map((config) => (
                <Contador
                  key={config.campo}
                  rotulo={config.rotulo}
                  valor={item[config.campo]}
                  unidade={config.unidade}
                  onMenos={() => mudar(item.exercicioId, config, -1)}
                  onMais={() => mudar(item.exercicioId, config, 1)}
                />
              ))}
            </View>
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
            <Botao titulo="Concluir treino" onPress={concluir} />
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
    </View>
  );
}