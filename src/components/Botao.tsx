import { estilosBotao } from "@/styles/components/botao";
import { Pressable, Text } from "react-native";

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: "primario" | "secundario" | "perigo";
};

export function Botao({ titulo, onPress, variante = "primario" }: Props) {
  const secundario = variante === "secundario";
  const perigo = variante === "perigo";

  return (
    <Pressable
      style={({ pressed }) => [
        estilosBotao.base,
        secundario && estilosBotao.secundario,
        perigo && estilosBotao.perigo,
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          estilosBotao.texto,
          secundario && estilosBotao.textoSecundario,
          perigo && estilosBotao.textoPerigo,
        ]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}