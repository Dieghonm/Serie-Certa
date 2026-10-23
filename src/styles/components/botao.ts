import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosBotao = StyleSheet.create({
  base: {
    backgroundColor: cores.primaria,
    padding: espacamentos.medio,
    borderRadius: raios.medio,
    alignItems: "center",
  },
  secundario: { backgroundColor: cores.primaria },
  texto: {
    color: cores.textoSobrePrimaria,
    fontSize: 16,
    fontWeight: "600",
  },
  textoSecundario: { color: cores.texto },
});