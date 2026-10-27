import { StyleSheet } from "react-native";
import { cores } from "@/styles/tema";

const TAMANHO = 140;

export const estilosImagemExercicio = StyleSheet.create({
  imagem: {
    width: TAMANHO,
    height: TAMANHO,
    borderRadius: 8,
    backgroundColor: cores.superficie,
  },
  vazio: {
    width: TAMANHO,
    height: TAMANHO,
    borderRadius: 8,
    backgroundColor: cores.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  textoVazio: { color: cores.textoSecundario, fontSize: 9, textAlign: "center" },
});