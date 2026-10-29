import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosInicio = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: espacamentos.medio,
    paddingVertical: espacamentos.pequeno,
    gap: 12,
    backgroundColor: cores.fundo,
  },
  areaLista: { flex: 1 },
  lista: { gap: 12 },
  vazio: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
    lineHeight: 22,
  },
});