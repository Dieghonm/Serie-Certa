import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Série Certa" }} />
      <Stack.Screen name="montar" options={{ title: "Montar série" }} />
      <Stack.Screen name="historico" options={{ title: "Histórico" }} />
      <Stack.Screen name="serie/[id]" options={{ title: "Série" }} />
    </Stack>
  );
}