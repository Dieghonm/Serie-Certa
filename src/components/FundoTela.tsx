// import { ReactNode } from "react";
// import { View } from "react-native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { estilosFundoTela as estilos } from "@/styles/components/fundoTela";

// export function FundoTela({ children }: { children: ReactNode }) {
//   return (
//     <View style={estilos.raiz}>
//       <Image
//         source={require("../../assets/images/fundo.jpg")}
//         style={estilos.imagem}
//         contentFit="cover"
//       />
//       <LinearGradient
//         colors={["rgba(11,15,20,0.55)", "rgba(11,15,20,0.80)", "rgba(11,15,20,0.96)"]}
//         locations={[0, 0.5, 1]}
//         style={estilos.escurecer}
//         pointerEvents="none"
//       />
//       {children}
//     </View>
//   );
// }