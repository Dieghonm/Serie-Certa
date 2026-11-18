import { useEffect, useRef, useState } from "react";
import { Pressable, Text, Vibration, View } from "react-native";
import { estilosCronometro } from "@/styles/components/cronometro";

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

export function Cronometro({ duracao, onMudarDuracao }: Props) {
  const [restante, setRestante] = useState(duracao);
  const [rodando, setRodando] = useState(false);
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
      return;
    }
    fimRef.current = Date.now() + restante * 1000;
    setRodando(true);
  }

  function ajustar(delta: number) {
    if (rodando) {
      const novo = Math.max(1, restante + delta);
      fimRef.current += (novo - restante) * 1000;
      setRestante(novo);
    } else {
      const novo = Math.max(PASSO, restante + delta);
      setRestante(novo);
      onMudarDuracao(novo);
    }
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

        <Text style={estilosCronometro.tempo}>{formatar(restante)}</Text>

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
          accessibilityLabel={rodando ? "Pausar descanso" : "Iniciar descanso"}
        >
          <Text style={estilosCronometro.textoPlay}>{rodando ? "❚❚" : "▶"}</Text>
        </Pressable>
      </View>
    </View>
  )
}