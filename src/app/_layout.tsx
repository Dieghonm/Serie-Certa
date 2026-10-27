import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cores } from "@/styles/tema";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.texto,
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Série Certa" }} />
        <Stack.Screen name="montar" options={{ title: "Montar série" }} />
        <Stack.Screen name="historico" options={{ title: "Histórico" }} />
        <Stack.Screen name="serie/[id]" options={{ title: "Série" }} />
      </Stack>
    </>
  );
}