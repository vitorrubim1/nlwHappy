import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//BorderlessButton: usa-se mais pra textos e icones, botão sem borda

interface TitleText {
  title: string;
  showCancel?: boolean; //pra mostrar o X de sair da página
}

export default function Header({ title, showCancel = true }: TitleText) {
  //recebo esta props das rotas
  const navigation = useNavigation();

  function handleGoBackToHomepage() {
    navigation.navigate("OrphanagesMap"); //redireciona pra tela inicial
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafc",
    borderWidth: 1,
    borderColor: "#DDE3F9",
    paddingTop: 44,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "Nunito_600SemiBold",
    color: "#8fa7b6",
    fontSize: 16,
  },
});
