import { Pressable, Text, View } from "react-native";
import { estilosAcoesTreino as estilos } from "@/styles/components/acoesTreino";

type Props = {
  feitos: number;
  total: number;
  podeConcluir: boolean;
  onConcluir: () => void;
  onSair: () => void;
  onEditar: () => void;
  onArquivar: () => void;
};

export function AcoesTreino({
  feitos,
  total,
  podeConcluir,
  onConcluir,
  onSair,
  onEditar,
  onArquivar,
}: Props) {
  const minimo = Math.floor(total / 2) + 1;
  const faltam = Math.max(0, minimo - feitos);
  const progresso = total === 0 ? 0 : Math.min(1, feitos / total);

  return (
    <View style={estilos.container}>
      <View style={estilos.progresso}>
        <View style={estilos.progressoTopo}>
          <Text style={estilos.progressoRotulo}>Progresso do treino</Text>
          <Text style={estilos.progressoValor}>
            {feitos}/{total}
          </Text>
        </View>
        <View style={estilos.barra}>
          <View style={[estilos.barraPreenchida, { width: `${progresso * 100}%` }]} />
        </View>
      </View>

      <Pressable
        onPress={onConcluir}
        disabled={!podeConcluir}
        accessibilityRole="button"
        accessibilityState={{ disabled: !podeConcluir }}
        style={({ pressed }) => [
          estilos.principal,
          !podeConcluir && estilos.principalDesativado,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text
          style={[
            estilos.textoPrincipal,
            !podeConcluir && estilos.textoPrincipalDesativado,
          ]}
        >
          {podeConcluir
            ? "✓  Concluir treino"
            : `Marque mais ${faltam} para concluir`}
        </Text>
      </Pressable>

      <Pressable onPress={onSair} hitSlop={8} style={estilos.link}>
        <Text style={estilos.textoLink}>Sair sem concluir</Text>
      </Pressable>

      <View style={estilos.divisor} />

      <View style={estilos.linhaSecundarias}>
        <Pressable
          onPress={onEditar}
          accessibilityRole="button"
          style={({ pressed }) => [estilos.secundario, pressed && { opacity: 0.8 }]}
        >
          <Text style={estilos.iconeSecundario}>✎</Text>
          <Text style={estilos.textoSecundario}>Editar série</Text>
        </Pressable>

        <Pressable
          onPress={onArquivar}
          accessibilityRole="button"
          style={({ pressed }) => [estilos.secundario, pressed && { opacity: 0.8 }]}
        >
          <Text style={estilos.iconeSecundario}>📦</Text>
          <Text style={estilos.textoSecundario}>Arquivar</Text>
        </Pressable>
      </View>
    </View>
  );
}