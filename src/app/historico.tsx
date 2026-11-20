import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Botao } from "@/components/Botao";
import { listarConclusoes } from "@/utils/armazenamento";
import { MESES, chaveDia, chaveHoje, formatarDia } from "@/utils/datas";
import { Conclusao } from "@/types/treino";
import { estilosCalendario } from "@/styles/telas/calendario";

const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Historico() {
  const [mes, setMes] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });
  const [conclusoes, setConclusoes] = useState<Conclusao[]>([]);
  const [diaAberto, setDiaAberto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      listarConclusoes().then(setConclusoes);
    }, [])
  );

  const ano = mes.getFullYear();
  const numeroMes = mes.getMonth();
  const diasNoMes = new Date(ano, numeroMes + 1, 0).getDate();

  const celulas: (number | null)[] = [
    ...Array<number | null>(mes.getDay()).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];
  while (celulas.length % 7 !== 0) celulas.push(null);

  const diasConcluidos = new Set(conclusoes.map((c) => c.data));
  const hoje = chaveHoje();
  const maisRecentesPrimeiro = [...conclusoes].reverse();
  const nomesDoDia =
    diaAberto === null
      ? []
      : conclusoes.filter((c) => c.data === diaAberto).map((c) => c.nome);

  function mudarMes(delta: number) {
    setMes(new Date(ano, numeroMes + delta, 1));
  }

  return (
    <View style={estilosCalendario.container}>
      <View style={estilosCalendario.cabecalho}>
        <Pressable style={estilosCalendario.botaoMes} onPress={() => mudarMes(-1)}>
          <Text style={estilosCalendario.textoBotaoMes}>‹</Text>
        </Pressable>
        <Text style={estilosCalendario.tituloMes}>
          {MESES[numeroMes]} {ano}
        </Text>
        <Pressable style={estilosCalendario.botaoMes} onPress={() => mudarMes(1)}>
          <Text style={estilosCalendario.textoBotaoMes}>›</Text>
        </Pressable>
      </View>

      <View style={estilosCalendario.linhaSemana}>
        {SEMANA.map((letra, i) => (
          <Text key={i} style={estilosCalendario.diaSemana}>
            {letra}
          </Text>
        ))}
      </View>

      <View style={estilosCalendario.grade}>
        {celulas.map((dia, i) => {
          if (dia === null) {
            return <View key={i} style={estilosCalendario.celula} />;
          }

          const chave = chaveDia(ano, numeroMes, dia);
          const concluido = diasConcluidos.has(chave);

          return (
            <Pressable
              key={i}
              style={estilosCalendario.celula}
              disabled={!concluido}
              onPress={() => setDiaAberto(chave)}
            >
              <View
                style={[
                  estilosCalendario.dia,
                  chave === hoje && estilosCalendario.diaHoje,
                  concluido && estilosCalendario.diaConcluido,
                ]}
              >
                <Text style={estilosCalendario.numeroDia}>{dia}</Text>
                {concluido && <View style={estilosCalendario.marca} />}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text style={estilosCalendario.tituloLista}>Treinos concluídos</Text>

      <FlatList
        style={estilosCalendario.areaLista}
        contentContainerStyle={estilosCalendario.lista}
        data={maisRecentesPrimeiro}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View style={estilosCalendario.itemLista}>
            <Text style={estilosCalendario.dataItem}>{formatarDia(item.data)}</Text>
            <Text style={estilosCalendario.nomeItem}>{item.nome}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={estilosCalendario.vazio}>
            Nenhum treino concluído ainda.
          </Text>
        }
      />

      <Botao
        titulo="Séries arquivadas"
        variante="secundario"
        onPress={() => router.push("/arquivadas")}
      />

      <Modal
        visible={diaAberto !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDiaAberto(null)}
      >
        <Pressable
          style={estilosCalendario.fundoModal}
          onPress={() => setDiaAberto(null)}
        >
          <Pressable style={estilosCalendario.cartaoModal} onPress={() => {}}>
            <Text style={estilosCalendario.dataModal}>
              {diaAberto === null ? "" : formatarDia(diaAberto)}
            </Text>
            {nomesDoDia.map((nome, i) => (
              <Text key={i} style={estilosCalendario.nomeModal}>
                {nome}
              </Text>
            ))}
            <Botao
              titulo="Fechar"
              variante="secundario"
              onPress={() => setDiaAberto(null)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}