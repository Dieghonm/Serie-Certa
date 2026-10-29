import { StyleSheet } from "react-native";
import { cores, raios } from "@/styles/tema";

export const estilosImagemExercicio = StyleSheet.create({
  imagem: {
    width: "100%",
    aspectRatio: 1.4,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
  },
  vazio: {
    width: "100%",
    aspectRatio: 1.4,
    borderRadius: raios.medio,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  textoVazio: { color: cores.textoSecundario, fontSize: 12, textAlign: "center" },
});