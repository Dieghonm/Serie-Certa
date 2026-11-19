import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosAcoesTreino = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: espacamentos.medio,
  },

  progresso: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.grande,
    padding: 14,
    gap: 10,
  },
  progressoTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressoRotulo: {
    color: cores.textoSecundario,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  progressoValor: {
    color: cores.texto,
    fontSize: 15,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  barra: {
    height: 8,
    borderRadius: raios.pilula,
    backgroundColor: cores.superficie,
    overflow: "hidden",
  },
  barraPreenchida: {
    height: "100%",
    borderRadius: raios.pilula,
    backgroundColor: cores.primaria,
  },

  principal: {
    backgroundColor: cores.primaria,
    borderRadius: raios.grande,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  principalDesativado: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoPrincipal: {
    color: cores.textoSobrePrimaria,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  textoPrincipalDesativado: {
    color: cores.textoSecundario,
    fontSize: 15,
    fontWeight: "700",
  },

  link: { alignSelf: "center", paddingVertical: 4 },
  textoLink: {
    color: cores.textoSecundario,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  divisor: {
    height: 1,
    backgroundColor: cores.borda,
    marginVertical: 4,
  },

  linhaSecundarias: { flexDirection: "row", gap: espacamentos.pequeno },
  secundario: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.grande,
    paddingVertical: 14,
  },
  iconeSecundario: { color: cores.primaria, fontSize: 16 },
  textoSecundario: { color: cores.texto, fontSize: 14, fontWeight: "700" },
});