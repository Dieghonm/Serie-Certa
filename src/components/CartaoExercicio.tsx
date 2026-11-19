import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ImagemExercicio } from "@/components/ImagemExercicio";
import { estilosCartaoExercicio as estilos } from "@/styles/components/cartaoExercicio";
import { Exercicio } from "@/types/exercicio";
import { ExercicioDoTreino } from "@/types/treino";

type Props = {
  numero: number;
  exercicio: Exercicio;
  item: ExercicioDoTreino;
  editavel: boolean;
  concluido: boolean;
  onEditar: () => void;
  onAlternarConcluido: () => void;
};

function Estatistica({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={estilos.estatistica}>
      <Text style={estilos.valorEstatistica}>{valor}</Text>
      <Text style={estilos.rotuloEstatistica}>{rotulo}</Text>
    </View>
  );
}

export function CartaoExercicio({
  numero,
  exercicio,
  item,
  editavel,
  concluido,
  onEditar,
  onAlternarConcluido,
}: Props) {
  const [aberto, setAberto] = useState(false);

  const carga = String(item.carga).replace(".", ",");
  const resumo =
    `${item.series} × ${item.repeticoes}${exercicio.emSegundos ? " s" : ""}` +
    (item.carga > 0 ? ` · ${carga} kg` : "");

  function alternarConcluido() {
    if (!concluido) setAberto(false);
    onAlternarConcluido();
  }

  return (
    <View style={[estilos.cartao, concluido && estilos.cartaoConcluido]}>
      <View style={estilos.cabecalho}>
        <Pressable
          style={estilos.areaTitulo}
          onPress={() => setAberto((v) => !v)}
          accessibilityRole="button"
          accessibilityState={{ expanded: aberto }}
          accessibilityLabel={`${exercicio.nome}, ${aberto ? "recolher" : "expandir"}`}
        >
          <View style={estilos.numeroCaixa}>
            <Text style={estilos.numero}>{numero}</Text>
          </View>
          <View style={estilos.textos}>
            <Text style={estilos.nome} numberOfLines={2}>
              {exercicio.nome}
            </Text>
            <Text style={estilos.resumo}>{resumo}</Text>
          </View>
        </Pressable>

        {editavel && (
          <Pressable
            onPress={alternarConcluido}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              concluido ? "Reabrir exercício" : "Marcar exercício como concluído"
            }
            style={[estilos.botaoConcluir, concluido && estilos.botaoConcluirAtivo]}
          >
            <Text
              style={[estilos.textoConcluir, concluido && estilos.textoConcluirAtivo]}
            >
              ✓
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => setAberto((v) => !v)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={aberto ? "Recolher exercício" : "Expandir exercício"}
          style={estilos.botaoExpandir}
        >
          <Text style={estilos.textoExpandir}>{aberto ? "▲" : "▼"}</Text>
        </Pressable>
      </View>

      {aberto && (
        <View style={estilos.detalhes}>
          <ImagemExercicio uri={exercicio.img} />
          <Text style={estilos.descricao}>{exercicio.descricao}</Text>

          <View style={estilos.estatisticas}>
            <Estatistica rotulo="Séries" valor={String(item.series)} />
            <Estatistica
              rotulo={exercicio.emSegundos ? "Segundos" : "Repetições"}
              valor={String(item.repeticoes)}
            />
            <Estatistica rotulo="Carga" valor={`${carga} kg`} />
            {editavel && (
              <Pressable
                style={estilos.botaoEditar}
                onPress={onEditar}
                accessibilityRole="button"
                accessibilityLabel="Editar exercício"
              >
                <Text style={estilos.iconeEditar}>✎</Text>
                <Text style={estilos.rotuloEditar}>Editar</Text>
              </Pressable>
            )}
          </View>

          {item.comentario ? (
            <View style={estilos.comentario}>
              <Text style={estilos.rotuloComentario}>Comentário</Text>
              <Text style={estilos.textoComentario}>{item.comentario}</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}