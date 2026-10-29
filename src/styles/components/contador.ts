import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosContador = StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rotulo: { fontSize: 14, color: cores.textoSecundario },
  controles: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamentos.pequeno,
  },
  botao: {
    width: 40,
    height: 40,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: { fontSize: 22, fontWeight: "600", color: cores.primaria },
  valor: {
    minWidth: 64,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
    fontVariant: ["tabular-nums"],
  },
});