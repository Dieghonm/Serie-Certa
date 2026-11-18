import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosEditarExercicio = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  folha: {
    backgroundColor: cores.cartao,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: cores.borda,
    maxHeight: "90%",
  },
  alca: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: raios.pilula,
    backgroundColor: cores.borda,
    marginTop: 10,
  },
  conteudo: {
    padding: espacamentos.grande,
    paddingBottom: 32,
  },

  cabecalho: { gap: 2, marginBottom: espacamentos.pequeno },
  titulo: {
    color: cores.primaria,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  nome: { color: cores.texto, fontSize: 20, fontWeight: "800" },

  linha: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  linhaCampo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rotulo: { fontSize: 14, color: cores.textoSecundario },

  controlesOrdem: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamentos.pequeno,
  },
  botaoOrdem: {
    width: 40,
    height: 40,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoOrdemDesativado: { opacity: 0.3 },
  textoBotaoOrdem: { color: cores.primaria, fontSize: 14 },
  valorOrdem: {
    minWidth: 64,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
    fontVariant: ["tabular-nums"],
  },

  campoCarga: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamentos.pequeno,
  },
  entradaCarga: {
    width: 96,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: cores.texto,
  },
  unidade: { color: cores.textoSecundario, fontSize: 15 },

  blocoComentario: { gap: espacamentos.pequeno, paddingTop: 12 },
  entradaComentario: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    padding: 12,
    minHeight: 90,
    fontSize: 15,
    color: cores.texto,
    textAlignVertical: "top",
  },

  acoes: { gap: espacamentos.pequeno, marginTop: espacamentos.medio },
});