import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosHistorico = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: espacamentos.medio,
    paddingVertical: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  lista: { gap: 12 },
  vazio: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
    lineHeight: 22,
  },
});