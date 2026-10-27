import { StyleSheet } from "react-native";
import { cores, espacamentos, raios } from "@/styles/tema";

export const estilosMontar = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.medio,
    gap: espacamentos.pequeno,
    backgroundColor: cores.fundo,
  },
  rotulo: { fontSize: 16, fontWeight: "600", color: cores.texto },
  campo: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.medio,
    padding: espacamentos.medio,
    fontSize: 16,
    color: cores.texto,
  },
  tituloExercicios: {
    fontSize: 18,
    fontWeight: "600",
    color: cores.texto,
    marginTop: espacamentos.medio,
  },
  filtros: { flexGrow: 0 },
  filtrosLinha: { flexDirection: "row", gap: espacamentos.pequeno },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: raios.pilula,
    backgroundColor: cores.superficie,
  },
  chipAtivo: { backgroundColor: cores.primaria },
  textoChip: { color: cores.texto },
  textoChipAtivo: { color: cores.textoSobrePrimaria },
  alternarLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacamentos.pequeno,
    paddingVertical: 10,
  },
  caixa: { fontSize: 18, color: cores.texto },
  lista: { flex: 1 },
  listaConteudo: { paddingBottom: espacamentos.medio },
  cartao: {
    padding: espacamentos.medio,
    marginBottom: 12,
    borderRadius: raios.medio,
    borderWidth: 2,
    borderColor: cores.superficie,
    backgroundColor: cores.fundo,
  },
  cartaoSelecionado: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  cartaoTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  nomeExercicio: { flex: 1, fontSize: 16, fontWeight: "600", color: cores.texto },
  marcador: { fontSize: 20, color: cores.primaria },
  descricao: { marginTop: 8, color: cores.textoSecundario, lineHeight: 20 },
  grupo: { marginTop: 10, fontSize: 12, color: cores.primaria },
  vazio: { textAlign: "center", padding: 24, color: cores.textoSecundario },
});