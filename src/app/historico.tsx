import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { CartaoTreino } from "@/components/cartaoTreino";
import { listarTreinos } from "@/utils/armazenamento";
import { Treino } from "@/types/treino";
import { estilosHistorico } from "@/styles/telas/historico";

export default function Historico() {
  const [treinos, setTreinos] = useState<Treino[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const todos = await listarTreinos();
        setTreinos(todos.filter((t) => t.arquivado));
      }
      carregar();
    }, [])
  );

  return (
    <View style={estilosHistorico.container}>
      <FlatList
        contentContainerStyle={estilosHistorico.lista}
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
          <Text style={estilosHistorico.vazio}>
            Nenhuma série arquivada ainda.
          </Text>
        }
      />
    </View>
  );
}