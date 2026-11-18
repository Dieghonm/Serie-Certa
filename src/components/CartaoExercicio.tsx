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
  return (
    <View style={[estilos.cartao, concluido && estilos.cartaoConcluido]}>
      <View style={estilos.cabecalho}>
        <View style={estilos.numeroCaixa}>
          <Text style={estilos.numero}>{numero}</Text>
        </View>
        <Text style={estilos.nome}>{exercicio.nome}</Text>

        {editavel && (
          <Pressable
            onPress={onAlternarConcluido}
            hitSlop={8}
            style={[estilos.botaoConcluir, concluido && estilos.botaoConcluirAtivo]}
          >
            <Text
              style={[estilos.textoConcluir, concluido && estilos.textoConcluirAtivo]}
            >
              ✓
            </Text>
          </Pressable>
        )}
      </View>

      {!concluido && (
        <>
          <ImagemExercicio uri={exercicio.img} />
          <Text style={estilos.descricao}>{exercicio.descricao}</Text>

          <View style={estilos.estatisticas}>
            <Estatistica rotulo="Séries" valor={String(item.series)} />
            <Estatistica rotulo="Repetições" valor={String(item.repeticoes)} />
            <Estatistica
              rotulo="Carga"
              valor={`${String(item.carga).replace(".", ",")} kg`}
            />
            {editavel && (
              <Pressable style={estilos.botaoEditar} onPress={onEditar}>
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
        </>
      )}
    </View>
  );
}