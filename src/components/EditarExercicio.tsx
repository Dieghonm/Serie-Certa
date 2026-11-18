import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Botao } from "@/components/Botao";
import { Contador } from "@/components/contador";
import { estilosEditarExercicio as estilos } from "@/styles/components/editarExercicio";
import { ExercicioDoTreino } from "@/types/treino";
import { cores } from "@/styles/tema";

type Props = {
  nome: string;
  item: ExercicioDoTreino;
  posicao: number;
  total: number;
  onSubir: () => void;
  onDescer: () => void;
  onSalvar: (alteracoes: Partial<ExercicioDoTreino>) => void;
  onFechar: () => void;
};

type PropsBotaoOrdem = {
  simbolo: string;
  desativado: boolean;
  onPress: () => void;
};

function BotaoOrdem({ simbolo, desativado, onPress }: PropsBotaoOrdem) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desativado}
      style={[estilos.botaoOrdem, desativado && estilos.botaoOrdemDesativado]}
    >
      <Text style={estilos.textoBotaoOrdem}>{simbolo}</Text>
    </Pressable>
  );
}

export function EditarExercicio({
  nome,
  item,
  posicao,
  total,
  onSubir,
  onDescer,
  onSalvar,
  onFechar,
}: Props) {
  const [series, setSeries] = useState(item.series);
  const [repeticoes, setRepeticoes] = useState(item.repeticoes);
  const [carga, setCarga] = useState(String(item.carga).replace(".", ","));
  const [comentario, setComentario] = useState(item.comentario ?? "");

  function salvar() {
    const numero = Number(carga.replace(",", "."));
    onSalvar({
      series,
      repeticoes,
      carga: Number.isFinite(numero) && numero >= 0 ? numero : item.carga,
      comentario: comentario.trim(),
    });
  }

  return (
    <Modal transparent animationType="slide" visible onRequestClose={onFechar}>
      <KeyboardAvoidingView
        style={estilos.fundo}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onFechar} />

        <View style={estilos.folha}>
          <View style={estilos.alca} />
          <ScrollView
            contentContainerStyle={estilos.conteudo}
            keyboardShouldPersistTaps="handled"
          >
            <View style={estilos.cabecalho}>
              <Text style={estilos.titulo}>Editar exercício</Text>
              <Text style={estilos.nome}>{nome}</Text>
            </View>

            <View style={estilos.linha}>
              <View style={estilos.linhaCampo}>
                <Text style={estilos.rotulo}>Posição</Text>
                <View style={estilos.controlesOrdem}>
                  <BotaoOrdem simbolo="▲" desativado={posicao === 1} onPress={onSubir} />
                  <Text style={estilos.valorOrdem}>
                    {posicao}/{total}
                  </Text>
                  <BotaoOrdem
                    simbolo="▼"
                    desativado={posicao === total}
                    onPress={onDescer}
                  />
                </View>
              </View>
            </View>

            <View style={estilos.linha}>
              <Contador
                rotulo="Séries"
                valor={series}
                onMenos={() => setSeries((v) => Math.max(1, v - 1))}
                onMais={() => setSeries((v) => v + 1)}
              />
            </View>

            <View style={estilos.linha}>
              <Contador
                rotulo="Repetições"
                valor={repeticoes}
                onMenos={() => setRepeticoes((v) => Math.max(1, v - 1))}
                onMais={() => setRepeticoes((v) => v + 1)}
              />
            </View>

            <View style={estilos.linha}>
              <View style={estilos.linhaCampo}>
                <Text style={estilos.rotulo}>Carga</Text>
                <View style={estilos.campoCarga}>
                  <TextInput
                    style={estilos.entradaCarga}
                    value={carga}
                    onChangeText={setCarga}
                    keyboardType="decimal-pad"
                    selectTextOnFocus
                  />
                  <Text style={estilos.unidade}>kg</Text>
                </View>
              </View>
            </View>

            <View style={estilos.blocoComentario}>
              <Text style={estilos.rotulo}>Comentário</Text>
              <TextInput
                style={estilos.entradaComentario}
                value={comentario}
                onChangeText={setComentario}
                placeholder="Ex: subir a carga na próxima semana"
                placeholderTextColor={cores.textoSecundario}
                multiline
                maxLength={200}
              />
            </View>

            <View style={estilos.acoes}>
              <Botao titulo="Salvar" onPress={salvar} />
              <Botao titulo="Cancelar" variante="secundario" onPress={onFechar} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}