import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosInicio = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  areaLista: { flex: 1 },
  lista: { gap: espacamentos.pequeno },
  vazio: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },
});