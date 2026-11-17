import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosHistorico = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 55,
    paddingLeft: 20,
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