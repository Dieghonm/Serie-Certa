import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosCartaoTreino = StyleSheet.create({
  cartao: {
    backgroundColor: cores.cartao,
    padding: espacamentos.medio,
    borderRadius: raios.grande,
    borderWidth: 1,
    borderColor: cores.borda,
    borderLeftWidth: 4,
    borderLeftColor: cores.primaria,
    gap: 4,
  },
  nome: {
    color: cores.texto,
    fontSize: 17,
    fontWeight: "700",
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 13,
  },
});