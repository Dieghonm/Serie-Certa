import { Pressable, Text, View } from "react-native";
import { estilosContador } from "@/styles/components/contador";

type Props = {
  rotulo: string;
  valor: number;
  unidade?: string;
  onMenos: () => void;
  onMais: () => void;
};

export function Contador({ rotulo, valor, unidade = "", onMenos, onMais }: Props) {
  return (
    <View style={estilosContador.linha}>
      <Text style={estilosContador.rotulo}>{rotulo}</Text>
      <View style={estilosContador.controles}>
        <Pressable style={estilosContador.botao} onPress={onMenos}>
          <Text style={estilosContador.textoBotao}>−</Text>
        </Pressable>
        <Text style={estilosContador.valor}>
          {valor}
          {unidade}
        </Text>
        <Pressable style={estilosContador.botao} onPress={onMais}>
          <Text style={estilosContador.textoBotao}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}