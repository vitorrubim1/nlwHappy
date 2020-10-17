import * as React from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails() {
    navigation.navigate("OrphanageDetails");
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
        <Marker
          icon={mapMark}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }} //Popup ao lado do icon
          coordinate={{
            latitude: -23.4465954,
            longitude: -46.3145157,
          }} //Posição no mapa
        >
          <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
            {/* tooltip={true}: digo que eu farei a estilização */}
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Orfanto do bem</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2 Orfanatos encontrados </Text>

        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
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
