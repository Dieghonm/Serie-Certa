import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import { Botao } from "@/components/Botao";
import { estilosCronometro } from "@/styles/components/cronometro";
import { cores } from "@/styles/tema";

const PASSO = 10;

type Props = {
  duracao: number;
  onMudarDuracao: (segundos: number) => void;
};

function formatar(segundos: number): string {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
}

function apenasDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

export function Cronometro({ duracao, onMudarDuracao }: Props) {
  const [restante, setRestante] = useState(duracao);
  const [rodando, setRodando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [minutos, setMinutos] = useState("");
  const [segundos, setSegundos] = useState("");
  const duracaoRef = useRef(duracao);
  const fimRef = useRef(0);

  useEffect(() => {
    duracaoRef.current = duracao;
  }, [duracao]);

  useEffect(() => {
    if (!rodando) return;

    const id = setInterval(() => {
      const falta = Math.max(0, Math.ceil((fimRef.current - Date.now()) / 1000));
      if (falta === 0) {
        setRodando(false);
        setRestante(duracaoRef.current);
        Vibration.vibrate([0, 500, 200, 500]);
      } else {
        setRestante(falta);
      }
    }, 250);

    return () => clearInterval(id);
  }, [rodando]);

  function alternar() {
    if (rodando) {
      setRodando(false);
      setRestante(duracao);
      return;
    }
    fimRef.current = Date.now() + restante * 1000;
    setRodando(true);
  }

  function definirTempo(novo: number) {
    if (rodando) {
      fimRef.current += (novo - restante) * 1000;
      setRestante(novo);
    } else {
      setRestante(novo);
      onMudarDuracao(novo);
    }
  }

  function ajustar(delta: number) {
    if (rodando) {
      definirTempo(Math.max(1, restante + delta));
    } else {
      definirTempo(Math.max(PASSO, restante + delta));
    }
  }

  function abrirEdicao() {
    setMinutos(String(Math.floor(restante / 60)));
    setSegundos(String(restante % 60));
    setEditando(true);
  }

  function salvarEdicao() {
    const total = Number(minutos || "0") * 60 + Number(segundos || "0");
    if (total < 1) return;
    definirTempo(total);
    setEditando(false);
  }

  return (
    <View style={estilosCronometro.container}>
      <Text style={estilosCronometro.titulo}>Descanso</Text>
      <View style={estilosCronometro.linha}>
        <Pressable
          style={estilosCronometro.botao}
          onPress={() => ajustar(-PASSO)}
          hitSlop={4}
          accessibilityRole="button"
          accessibilityLabel={`Diminuir ${PASSO} segundos`}
        >
          <Text style={estilosCronometro.textoBotao}>‹</Text>
        </Pressable>

        <Pressable
          onPress={abrirEdicao}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Editar tempo de descanso"
        >
          <Text style={estilosCronometro.tempo}>{formatar(restante)}</Text>
        </Pressable>

        <Pressable
          style={estilosCronometro.botao}
          onPress={() => ajustar(PASSO)}
          hitSlop={4}
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${PASSO} segundos`}
        >
          <Text style={estilosCronometro.textoBotao}>›</Text>
        </Pressable>

        <Pressable
          style={estilosCronometro.botaoPlay}
          onPress={alternar}
          hitSlop={4}
          accessibilityRole="button"
          accessibilityLabel={rodando ? "Parar descanso" : "Iniciar descanso"}  
        >
          <Text style={estilosCronometro.textoPlay}>{rodando ? "■" : "▶"}</Text>
        </Pressable>
      </View>

      <Modal
        visible={editando}
        transparent
        animationType="fade"
        onRequestClose={() => setEditando(false)}
      >
        <KeyboardAvoidingView
          style={estilosCronometro.fundoModal}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable
            style={estilosCronometro.fundoToque}
            onPress={() => setEditando(false)}
          />
          <View style={estilosCronometro.cartaoModal}>
            <Text style={estilosCronometro.tituloModal}>Tempo de descanso</Text>

            <View style={estilosCronometro.camposLinha}>
              <View style={estilosCronometro.campoGrupo}>
                <TextInput
                  style={estilosCronometro.entrada}
                  value={minutos}
                  onChangeText={(t) => setMinutos(apenasDigitos(t))}
                  keyboardType="number-pad"
                  maxLength={3}
                  selectTextOnFocus
                  autoFocus
                  placeholderTextColor={cores.textoSecundario}
                  placeholder="0"
                />
                <Text style={estilosCronometro.rotuloCampo}>min</Text>
              </View>

              <Text style={estilosCronometro.separador}>:</Text>

              <View style={estilosCronometro.campoGrupo}>
                <TextInput
                  style={estilosCronometro.entrada}
                  value={segundos}
                  onChangeText={(t) => setSegundos(apenasDigitos(t))}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                  placeholderTextColor={cores.textoSecundario}
                  placeholder="0"
                />
                <Text style={estilosCronometro.rotuloCampo}>seg</Text>
              </View>
            </View>

            <View style={estilosCronometro.acoes}>
              <Botao titulo="Salvar" onPress={salvarEdicao} />
              <Botao
                titulo="Cancelar"
                variante="secundario"
                onPress={() => setEditando(false)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}