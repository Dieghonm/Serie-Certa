import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosSerie = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  lista: { gap: 12, paddingBottom: espacamentos.grande },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: cores.texto,
    letterSpacing: 0.2,
  },
  subtitulo: {
    fontSize: 15,
    color: cores.primaria,
    fontWeight: "600",
    marginBottom: 4,
  },
  mensagem: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },
  cartaoExercicio: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.grande,
    padding: espacamentos.medio,
    gap: 12,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamentos.pequeno,
  },
  nomeExercicio: { flex: 1, fontSize: 18, fontWeight: "700", color: cores.texto },
  descricao: { color: cores.textoSecundario, lineHeight: 21 },

    numeroCaixa: {
    width: 28,
    height: 28,
    borderRadius: raios.pilula,
    backgroundColor: cores.primariaClara,
    alignItems: "center",
    justifyContent: "center",
  },
  numero: { color: cores.primaria, fontWeight: "800", fontSize: 14 },
  botaoOrdem: {
    width: 36,
    height: 36,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoOrdemDesativado: { opacity: 0.3 },
  textoBotaoOrdem: { color: cores.primaria, fontSize: 13 },
});