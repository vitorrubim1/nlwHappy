import * as React from "react";

import { useFonts } from "expo-font";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    //fontsLoaded: vai retornar true ou false caso as fontes estejam carregadas
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Routes />
  );
}

