import { estilosBotao } from "@/styles/components/botao";
import { Pressable, Text } from "react-native";

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: "primario" | "secundario";
};

export function Botao({ titulo, onPress, variante = "primario" }: Props) {
  const secundario = variante === "secundario";

  return (
    <Pressable
      style={[estilosBotao.base, secundario && estilosBotao.secundario]}
      onPress={onPress}
    >
      <Text
        style={[estilosBotao.texto, secundario && estilosBotao.textoSecundario]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}
