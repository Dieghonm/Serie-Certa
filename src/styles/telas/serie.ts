import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosSerie = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  lista: { gap: espacamentos.pequeno, paddingBottom: espacamentos.medio },
  titulo: { fontSize: 24, fontWeight: "700", color: cores.texto },
  subtitulo: { fontSize: 16, color: cores.textoSecundario },
  mensagem: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },
  cartaoExercicio: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
  },
  nomeExercicio: { fontSize: 16, fontWeight: "600", color: cores.texto },
  descricao: { color: cores.textoSecundario, lineHeight: 20 },
});