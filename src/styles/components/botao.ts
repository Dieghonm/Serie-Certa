import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosBotao = StyleSheet.create({
  base: {
    backgroundColor: cores.primaria,
    padding: espacamentos.medio,
    borderRadius: raios.grande,
    alignItems: "center",
  },
  secundario: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  perigo: { backgroundColor: cores.perigo },
  texto: {
    color: cores.textoSobrePrimaria,
    fontSize: 16,
    fontWeight: "700",
  },
  textoSecundario: { color: cores.texto },
  textoPerigo: { color: cores.textoSobrePerigo },
});