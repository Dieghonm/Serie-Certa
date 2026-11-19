import { estilosCartaoTreino } from "@/styles/components/cartaoTreino";
import { Treino } from "@/types/treino";
import { Pressable, Text, View } from "react-native";

type Props = {
  treino: Treino;
  onPress: () => void;
};

export function CartaoTreino({ treino, onPress }: Props) {
  const total = treino.exercicios.length;

  return (
    <Pressable
      style={({ pressed }) => [
        estilosCartaoTreino.cartao,
        pressed && { opacity: 0.85, transform: [{ scale: 0.985 }] },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={estilosCartaoTreino.faixa} />
      <View style={estilosCartaoTreino.textos}>
        <Text style={estilosCartaoTreino.nome}>{treino.nome}</Text>
        <Text style={estilosCartaoTreino.subtitulo}>
          {total} {total === 1 ? "exercício" : "exercícios"}
        </Text>
      </View>
      <View style={estilosCartaoTreino.seta}>
        <Text style={estilosCartaoTreino.textoSeta}>›</Text>
      </View>
    </Pressable>
  );
}