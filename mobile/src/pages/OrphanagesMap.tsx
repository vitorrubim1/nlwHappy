import * as React from "react";

import { StyleSheet, Text, View, Dimensions } from "react-native";
/*
  Dimensions: me retorna o tamanho da tela, algura e largura
*/
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
/*
  PROVIDER_GOOGLE: Mapa da google, pra que todos dispositivos usem
  Marker: Marcação o mapa
  Callout: Popup
*/
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import mapMark from "../images/map-marker.png"; //O react-native decide o melhor tamanho
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = React.useState<OrphanageItem[]>([]);
  const navigation = useNavigation();

  // console.log(orphanages); //para debugar é so ir no dispositivo conectado

  React.useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.4465954,
          longitude: -46.3145157,
          latitudeDelta: 0.008, //zoom
          longitudeDelta: 0.008, //zoom
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMark}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }} //Popup ao lado do icon
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }} //Posição no mapa
          >
            <Callout
              tooltip={true}
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              {/* tooltip={true}: digo que eu farei a estilização */}
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} Orfanatos encontrados{" "}
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 5, //box-shadow
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
