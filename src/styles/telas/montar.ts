import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosMontar = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  rotulo: { fontSize: 16, fontWeight: "600", color: cores.texto },
  campo: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    padding: espacamentos.medio,
    fontSize: 16,
    color: cores.texto,
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
});