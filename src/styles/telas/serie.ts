import { StyleSheet } from "react-native";
import { cores, espacamentos } from "@/styles/tema";

export const estilosSerie = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
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
});