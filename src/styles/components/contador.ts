import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosContador = StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rotulo: { fontSize: 14, color: cores.textoSecundario },
  controles: { flexDirection: "row", alignItems: "center", gap: espacamentos.pequeno },
  botao: {
    width: 36,
    height: 36,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: { fontSize: 20, fontWeight: "600", color: cores.texto },
  valor: { minWidth: 56, textAlign: "center", fontSize: 16, color: cores.texto },
});