import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosInicio = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 50,
    paddingLeft: 20,
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
  iconeHeader: {
    fontSize: 22,
    marginRight: espacamentos.medio,
  },
});