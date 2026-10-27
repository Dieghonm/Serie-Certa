import { useState } from "react";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Botao } from "@/components/Botao";
import { criarTreino } from "@/utils/armazenamento";
import { buscarTodos } from "@/utils/exercicios";
import { Treino } from "@/types/treino";
import { estilosMontar } from "@/styles/telas/montar";
import { ImagemExercicio } from "@/components/ImagemExercicio";
import { cores } from "@/styles/tema";

const exercicios = buscarTodos();
const grupos = ["Todos", ...new Set(exercicios.map((e) => e.grupoPrincipal))];

export default function Montar() {
  const [nome, setNome] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [mostrarSelecionados, setMostrarSelecionados] = useState(false);

  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const grupoCorresponde =
      grupoAtivo === "Todos" || exercicio.grupoPrincipal === grupoAtivo;
    const selecaoCorresponde =
      !mostrarSelecionados || selecionados.includes(exercicio.id);
    return grupoCorresponde && selecaoCorresponde;
  });

  function alternarSelecao(id: string) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
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

    const novo: Treino = {
      id: Date.now().toString(),
      nome: nomeLimpo,
      arquivado: false,
      criadoEm: new Date().toISOString(),
      exercicios: selecionados.map((id) => ({
        exercicioId: id,
        series: 3,
        repeticoes: 12,
        carga: 0,
      })),
    };

    await criarTreino(novo);
    router.back();
  }

  return (
    <View style={estilosMontar.container}>
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
                  {grupo}
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

      <ScrollView
        style={estilosMontar.lista}
        contentContainerStyle={estilosMontar.listaConteudo}
      >
        {exerciciosFiltrados.map((exercicio) => {
          const selecionado = selecionados.includes(exercicio.id);
          return (
            <Pressable
              key={exercicio.id}
              onPress={() => alternarSelecao(exercicio.id)}
              style={[
                estilosMontar.cartao,
                selecionado && estilosMontar.cartaoSelecionado,
              ]}
            >
              <View style={estilosMontar.cartaoTopo}>
                <Text style={estilosMontar.nomeExercicio}>{exercicio.nome}</Text>
                <Text style={estilosMontar.marcador}>{selecionado ? "☑" : "☐"}</Text>
              </View>
              <ImagemExercicio uri={exercicio.img} animar={false} />
              <Text style={estilosMontar.descricao}>{exercicio.descricao}</Text>
              <Text style={estilosMontar.grupo}>{exercicio.grupoPrincipal}</Text>
            </Pressable>
          );
        })}

        {exerciciosFiltrados.length === 0 && (
          <Text style={estilosMontar.vazio}>Nenhum exercício encontrado.</Text>
        )}
      </ScrollView>

      <Botao titulo="Salvar série" onPress={salvar} />
    </View>
  );
}