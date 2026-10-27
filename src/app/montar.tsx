import { useState } from "react";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { criarTreino } from "@/utils/armazenamento";
import { buscarTodos } from "@/utils/exercicios";
import { Treino } from "@/types/treino";
import { estilosMontar } from "@/styles/telas/montar";

const exercicios = buscarTodos();

export default function Montar() {
  const [nome, setNome] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [mostrarSelecionados, setMostrarSelecionados] = useState(false);

  const grupos = [
    "Todos",
    ...new Set(exercicios.map((exercicio) => exercicio.grupoPrincipal)),
  ];

  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const grupoCorresponde =
      grupoAtivo === "Todos" || exercicio.grupoPrincipal === grupoAtivo;

    const selecaoCorresponde =
      !mostrarSelecionados || selecionados.includes(exercicio.id);

    return grupoCorresponde && selecaoCorresponde;
  });

  function alternarSelecao(id: string) {
    setSelecionados((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
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
        placeholder="Ex: Costas e bíceps"
      />

      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 }}>
        Exercícios ({selecionados.length} selecionados)
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginBottom: 12 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {grupos.map((grupo) => (
            <Pressable
              key={grupo}
              onPress={() => setGrupoAtivo(grupo)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor: grupoAtivo === grupo ? "#2563eb" : "#e5e7eb",
              }}
            >
              <Text style={{ color: grupoAtivo === grupo ? "#ffffff" : "#374151" }}>
                {grupo}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => setMostrarSelecionados((atual) => !atual)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {mostrarSelecionados ? "☑" : "☐"}
        </Text>
        <Text>
          Mostrar apenas selecionados ({selecionados.length})
        </Text>
      </Pressable>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
        {exerciciosFiltrados.map((exercicio) => {
          const selecionado = selecionados.includes(exercicio.id);

          return (
            <Pressable
              key={exercicio.id}
              onPress={() => alternarSelecao(exercicio.id)}
              style={{
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selecionado ? "#2563eb" : "#e5e7eb",
                backgroundColor: selecionado ? "#eff6ff" : "#ffffff",
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: "600", color: "#111827" }}>
                  {exercicio.nome}
                </Text>

                <Text style={{ fontSize: 20, color: "#2563eb" }}>
                  {selecionado ? "☑" : "☐"}
                </Text>
              </View>

              <Text style={{ marginTop: 8, color: "#4b5563", lineHeight: 20 }}>
                {exercicio.descricao}
              </Text>

              <Text style={{ marginTop: 10, fontSize: 12, color: "#2563eb" }}>
                {exercicio.grupoPrincipal}
              </Text>
            </Pressable>
          );
        })}

        {exerciciosFiltrados.length === 0 && (
          <Text style={{ textAlign: "center", padding: 24, color: "#6b7280" }}>
            Nenhum exercício encontrado.
          </Text>
        )}
      </ScrollView>

      <Pressable style={estilosMontar.botao} onPress={salvar}>
        <Text style={estilosMontar.textoBotao}>Salvar série</Text>
      </Pressable>
    </View>
  );
}