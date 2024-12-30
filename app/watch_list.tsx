import Header from "@/components/header";
import { color } from "@/constants/Colors";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";

export default function WatchList() {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.primaryBG }]}
    >
      <Header title="Watch list">
        <Image source={require("@/assets/images/watchlist.png")}></Image>
      </Header>

      <NavBar
        style={{
          borderColor: color.borderColor,
          backgroundColor: color.primaryBG,
        }}
      >
        <NavButton
          source={require("@/assets/images/home.png")}
          text="Home"
          link={"/"}
        />
        <NavButton
          source={require("@/assets/images/search.png")}
          text="Search"
          link={"/search"}
        />
        <NavButton
          source={require("@/assets/images/watchlist_active.png")}
          text="Watch List"
          link={"/watch_list"}
          active
        />
      </NavBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
