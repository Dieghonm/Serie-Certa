import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosInicio = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  botao: {
    backgroundColor: cores.primaria,
    padding: espacamentos.medio,
    borderRadius: raios.medio,
    alignItems: "center",
  },
  textoBotao: {
    color: cores.textoSobrePrimaria,
    fontSize: 16,
    fontWeight: "600",
  },
  areaLista: { flex: 1 },
  lista: { gap: espacamentos.pequeno },
  vazio: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },  
});