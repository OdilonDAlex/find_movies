import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, StyleSheet, Text } from "react-native";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { Link } from "expo-router";
import { color } from "@/constants/Colors";

type Nav = {
  iconName: string;
  text: string;
};

export default function SplashScreen() {
  const navs = [
    {
      iconName: "home",
      text: "Home",
    },
    {
      iconName: "search",
      text: "Search",
    },
    {
      iconName: "watchlist",
      text: "Watch List",
    },
  ] as Nav[];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: color.primaryBG || "white" },
      ]}
    >
      <Image source={require("@/assets/images/popcorn.png")}></Image>
      
      <ActivityIndicator size={20} style={{
        marginTop: 40
      }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
