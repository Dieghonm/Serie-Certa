import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosHistorico = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    backgroundColor: cores.fundo,
  },
  lista: { gap: espacamentos.pequeno },
  vazio: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },
});