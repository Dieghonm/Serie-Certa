import { estilosCartaoTreino } from "@/styles/components/cartaoTreino";
import { Treino } from "@/types/treino";
import { Pressable, Text } from "react-native";

type Props = {
  treino: Treino;
  onPress: () => void;
};

export function CartaoTreino({ treino, onPress }: Props) {
  return (
    <Pressable style={estilosCartaoTreino.cartao} onPress={onPress}>
      <Text style={estilosCartaoTreino.nome}>{treino.nome}</Text>
      <Text style={estilosCartaoTreino.subtitulo}>
        {treino.exercicios.length} exercícios
      </Text>
    </Pressable>
  );
}
