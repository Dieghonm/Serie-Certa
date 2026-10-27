import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { listarTreinos } from "@/utils/armazenamento";
import { Treino } from "@/types/treino";
import { estilosInicio } from "@/styles/telas/inicio";
import { Botao } from "@/components/Botao";
import { CartaoTreino } from "@/components/cartaoTreino";

export default function Inicio() {
  const [treinos, setTreinos] = useState<Treino[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const todos = await listarTreinos();
        setTreinos(todos.filter((t) => !t.arquivado));
      }
      carregar();
    }, [])
  );

  return (
    <View style={estilosInicio.container}>
      <FlatList
        style={estilosInicio.areaLista}
        contentContainerStyle={estilosInicio.lista}
        data={treinos}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <CartaoTreino
            treino={item}
            onPress={() =>
              router.push({ pathname: "/serie/[id]", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={estilosInicio.vazio}>
            Nenhuma série ainda. Toque em "Montar série" para criar a primeira.
          </Text>
        }
      />

      <Botao titulo="Montar série" onPress={() => router.push("/montar")} />
      <Botao
        titulo="Histórico"
        variante="secundario"
        onPress={() => router.push("/historico")}
      />
    </View>
  );
}