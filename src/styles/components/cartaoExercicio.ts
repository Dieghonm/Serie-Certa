import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosCartaoExercicio = StyleSheet.create({
  cartao: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.grande,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 14,
  },
  cartaoConcluido: {
    opacity: 0.5,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  areaTitulo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  numeroCaixa: {
    width: 30,
    height: 30,
    borderRadius: raios.pilula,
    backgroundColor: cores.primaria,
    alignItems: "center",
    justifyContent: "center",
  },
  numero: {
    color: cores.textoSobrePrimaria,
    fontWeight: "800",
    fontSize: 14,
  },
  textos: { flex: 1, gap: 2 },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.texto,
    letterSpacing: 0.2,
  },
  resumo: {
    fontSize: 12,
    color: cores.textoSecundario,
    fontVariant: ["tabular-nums"],
  },

  botaoConcluir: {
    width: 36,
    height: 36,
    borderRadius: raios.pilula,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoConcluirAtivo: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  textoConcluir: { color: cores.textoSecundario, fontSize: 16, fontWeight: "700" },
  textoConcluirAtivo: { color: cores.textoSobrePrimaria },

  botaoExpandir: {
    width: 36,
    height: 36,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  textoExpandir: { color: cores.primaria, fontSize: 12 },

  detalhes: { gap: 14 },
  descricao: { color: cores.textoSecundario, lineHeight: 21, fontSize: 14 },

  estatisticas: { flexDirection: "row", gap: espacamentos.pequeno },
  estatistica: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  valorEstatistica: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  rotuloEstatistica: {
    color: cores.textoSecundario,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  botaoEditar: {
    width: 64,
    backgroundColor: cores.primariaClara,
    borderWidth: 1,
    borderColor: cores.primaria,
    borderRadius: raios.medio,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  iconeEditar: { color: cores.primaria, fontSize: 18 },
  rotuloEditar: {
    color: cores.primaria,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  comentario: {
    backgroundColor: cores.superficie,
    borderLeftWidth: 3,
    borderLeftColor: cores.primaria,
    borderRadius: raios.pequeno,
    padding: 12,
    gap: 2,
  },
  rotuloComentario: {
    color: cores.primaria,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  textoComentario: { color: cores.texto, lineHeight: 20 },
});