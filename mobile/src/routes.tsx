import * as React from "react";

import { NavigationContainer } from "@react-navigation/native"; //NavigationContainer: BrowserRoutr da Web
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();
/*
  Navigator: que envolve todas as telas
  Screen: as telas
*/

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        {/*screenOptions={{ headerShown: false }}: desabilita o header de todas as telas, já que esta no navigator*/}
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true, //quero que essa página tenha header
            header: () => <Header title="Orfanato" showCancel={false} />, // e quero mostrar o meu componente, header. showCancel: para não mostra o X de fechar somente nesta tela
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
