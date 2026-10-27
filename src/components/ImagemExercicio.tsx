import { useState } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { estilosImagemExercicio } from "@/styles/components/imagemExercicio";

type Props = {
  uri: string;
  animar?: boolean;
};

export function ImagemExercicio({ uri, animar = true }: Props) {
  const [erro, setErro] = useState(false);

  if (uri === "" || erro) {
    return (
      <View style={estilosImagemExercicio.vazio}>
        <Text style={estilosImagemExercicio.textoVazio}>Sem imagem</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={estilosImagemExercicio.imagem}
      contentFit="contain"
      transition={200}
      cachePolicy="disk"
      autoplay={animar}
      onError={() => setErro(true)}
    />
  );
}