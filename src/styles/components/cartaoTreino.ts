import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosCartaoTreino = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: cores.cartao,
    paddingVertical: 18,
    paddingRight: espacamentos.medio,
    paddingLeft: 14,
    borderRadius: raios.grande,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  faixa: {
    width: 5,
    alignSelf: "stretch",
    borderRadius: raios.pilula,
    backgroundColor: cores.primaria,
  },
  textos: { flex: 1, gap: 4 },
  nome: {
    color: cores.texto,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 13,
    fontWeight: "600",
  },
  seta: {
    width: 36,
    height: 36,
    borderRadius: raios.pilula,
    backgroundColor: cores.primariaClara,
    alignItems: "center",
    justifyContent: "center",
  },
  textoSeta: {
    color: cores.primaria,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "700",
  },
});