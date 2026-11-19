import { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Botao } from "@/components/Botao";
import { ImagemExercicio } from "@/components/ImagemExercicio";
import {
  atualizarTreino,
  buscarTreino,
  criarTreino,
} from "@/utils/armazenamento";
import { buscarTodos, nomeDoGrupo } from "@/utils/exercicios";
import { Exercicio } from "@/types/exercicio";
import { ExercicioDoTreino, Treino } from "@/types/treino";
import { estilosMontar } from "@/styles/telas/montar";
import { cores } from "@/styles/tema";

const exercicios = buscarTodos();
const grupos = ["Todos", ...new Set(exercicios.map((e) => e.grupoPrincipal))];

export default function Montar() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = id !== undefined;

  const [nome, setNome] = useState("");
  const [existentes, setExistentes] = useState<ExercicioDoTreino[]>([]);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [mostrarSelecionados, setMostrarSelecionados] = useState(false);
  const [expandidos, setExpandidos] = useState<string[]>([]);

  useEffect(() => {
    if (id === undefined) return;

    const carregar = async () => {
      const treino = await buscarTreino(id);
      if (treino === undefined) return;
      setNome(treino.nome);
      setExistentes(treino.exercicios);
      setSelecionados(treino.exercicios.map((e) => e.exercicioId));
    };
    carregar();
  }, [id]);

  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const grupoCorresponde =
      grupoAtivo === "Todos" || exercicio.grupoPrincipal === grupoAtivo;
    const selecaoCorresponde =
      !mostrarSelecionados || selecionados.includes(exercicio.id);
    return grupoCorresponde && selecaoCorresponde;
  });

  function alternarSelecao(exercicioId: string) {
    setSelecionados((atual) =>
      atual.includes(exercicioId)
        ? atual.filter((item) => item !== exercicioId)
        : [...atual, exercicioId]
    );
  }

  function alternarExpandido(exercicioId: string) {
    setExpandidos((atual) =>
      atual.includes(exercicioId)
        ? atual.filter((item) => item !== exercicioId)
        : [...atual, exercicioId]
    );
  }

  async function salvar() {
    const nomeLimpo = nome.trim();

    if (nomeLimpo === "") {
      Alert.alert("Atenção", "Informe o nome da série.");
      return;
    }
    if (selecionados.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um exercício.");
      return;
    }

    const lista: ExercicioDoTreino[] = selecionados.map(
      (exercicioId) =>
        existentes.find((e) => e.exercicioId === exercicioId) ?? {
          exercicioId,
          series: 3,
          repeticoes: 12,
          carga: 0,
        }
    );

    if (id !== undefined) {
      await atualizarTreino(id, { nome: nomeLimpo, exercicios: lista });
    } else {
      const novo: Treino = {
        id: Date.now().toString(),
        nome: nomeLimpo,
        arquivado: false,
        criadoEm: new Date().toISOString(),
        exercicios: lista,
      };
      await criarTreino(novo);
    }

    router.back();
  }

  function renderizarExercicio({ item }: { item: Exercicio }) {
    const selecionado = selecionados.includes(item.id);
    const expandido = expandidos.includes(item.id);

    return (
      <View
        style={[
          estilosMontar.cartao,
          selecionado && estilosMontar.cartaoSelecionado,
        ]}
      >
        <View style={estilosMontar.cartaoTopo}>
          <Pressable
            style={estilosMontar.areaSelecao}
            onPress={() => alternarSelecao(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selecionado }}
            accessibilityLabel={item.nome}
          >
            <Text style={estilosMontar.nomeExercicio}>{item.nome}</Text>
            <Text style={estilosMontar.marcador}>{selecionado ? "☑" : "☐"}</Text>
          </Pressable>

          <Pressable
            style={estilosMontar.botaoExpandir}
            onPress={() => alternarExpandido(item.id)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={expandido ? "Recolher exercício" : "Expandir exercício"}
          >
            <Text style={estilosMontar.textoExpandir}>{expandido ? "▲" : "▼"}</Text>
          </Pressable>
        </View>

        {expandido && (
          <>
            <ImagemExercicio uri={item.img} animar={false} />
            <Text style={estilosMontar.descricao}>{item.descricao}</Text>
            <Text style={estilosMontar.grupo}>{nomeDoGrupo(item.grupoPrincipal)}</Text>
          </>
        )}
      </View>
    );
  }

  const cabecalho = (
    <View style={estilosMontar.cabecalhoLista}>
      <Text style={estilosMontar.rotulo}>Nome da série</Text>
      <TextInput
        style={estilosMontar.campo}
        value={nome}
        onChangeText={setNome}
        placeholderTextColor={cores.textoSecundario}
        placeholder="Ex: Costas e bíceps"
      />

      <Text style={estilosMontar.tituloExercicios}>
        Exercícios ({selecionados.length} selecionados)
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={estilosMontar.filtros}
      >
        <View style={estilosMontar.filtrosLinha}>
          {grupos.map((grupo) => {
            const ativo = grupoAtivo === grupo;
            return (
              <Pressable
                key={grupo}
                onPress={() => setGrupoAtivo(grupo)}
                style={[estilosMontar.chip, ativo && estilosMontar.chipAtivo]}
              >
                <Text
                  style={[
                    estilosMontar.textoChip,
                    ativo && estilosMontar.textoChipAtivo,
                  ]}
                >
                  {nomeDoGrupo(grupo)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => setMostrarSelecionados((atual) => !atual)}
        style={estilosMontar.alternarLinha}
      >
        <Text style={estilosMontar.caixa}>{mostrarSelecionados ? "☑" : "☐"}</Text>
        <Text style={estilosMontar.textoAlternar}>
          Mostrar apenas selecionados ({selecionados.length})
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={estilosMontar.container}>
      <Stack.Screen
        options={{ title: editando ? "Editar série" : "Montar série" }}
      />

      <FlatList
        style={estilosMontar.lista}
        contentContainerStyle={estilosMontar.listaConteudo}
        data={exerciciosFiltrados}
        extraData={selecionados}
        keyExtractor={(e) => e.id}
        renderItem={renderizarExercicio}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={
          <Text style={estilosMontar.vazio}>Nenhum exercício encontrado.</Text>
        }
        keyboardShouldPersistTaps="handled"
        initialNumToRender={6}
        windowSize={5}
      />

      <Botao
        titulo={editando ? "Salvar alterações" : "Salvar série"}
        onPress={salvar}
      />
    </View>
  );
}
