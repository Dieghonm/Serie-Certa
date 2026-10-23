import { useState } from "react";
import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { criarTreino } from "@/utils/armazenamento";
import { Treino } from "@/types/treino";
import { estilosMontar } from "@/styles/telas/montar";

export default function Montar() {
  const [nome, setNome] = useState("");

  async function salvar() {
    const nomeLimpo = nome.trim();
    if (nomeLimpo === "") return;

    const novo: Treino = {
      id: Date.now().toString(),
      nome: nomeLimpo,
      arquivado: false,
      criadoEm: new Date().toISOString(),
      exercicios: [],
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
      <Pressable style={estilosMontar.botao} onPress={salvar}>
        <Text style={estilosMontar.textoBotao}>Salvar</Text>
      </Pressable>
    </View>
  );
}