import { StyleSheet } from "react-native";
import { cores, raios } from "@/styles/tema";

export const estilosCronometro = StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  botao: {
    width: 30,
    height: 30,
    borderRadius: raios.pequeno,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: { color: cores.primaria, fontSize: 20, lineHeight: 22, fontWeight: "700" },
  tempo: {
    minWidth: 52,
    textAlign: "center",
    color: cores.texto,
    fontSize: 16,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  botaoPlay: {
    width: 34,
    height: 34,
    borderRadius: raios.pilula,
    backgroundColor: cores.primaria,
    alignItems: "center",
    justifyContent: "center",
  },
  textoPlay: { color: cores.textoSobrePrimaria, fontSize: 12, fontWeight: "800" },

    container: { alignItems: "center", gap: 2 },
  titulo: {
    color: cores.textoSecundario,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});