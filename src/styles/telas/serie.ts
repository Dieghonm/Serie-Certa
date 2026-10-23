import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosSerie = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  titulo: { fontSize: 24, fontWeight: "700", color: cores.texto },
  subtitulo: { fontSize: 16, color: cores.textoSecundario },
  mensagem: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginTop: espacamentos.grande,
  },
});