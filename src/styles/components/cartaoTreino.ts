import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosCartaoTreino = StyleSheet.create({
  cartao: {
    backgroundColor: cores.primaria,
    padding: espacamentos.medio,
    borderRadius: raios.medio,
    gap: 4,
  },
  nome: {
    color: cores.textoSobrePrimaria,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitulo: {
    color: cores.textoSobrePrimaria,
    fontSize: 13,
    opacity: 0.85,
  },
});