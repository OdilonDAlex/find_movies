import { StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { color } from "@/constants/Colors";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";

export default function Search() {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.primaryBG }]}
    >
      <Header title="Search" style={{ marginBottom: 10 }}>
        <Image
          source={require("@/assets/images/info.png")}
          width={36}
          height={36}
        ></Image>
      </Header>

      <SearchBar />

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
          source={require("@/assets/images/search_active.png")}
          text="Search"
          link={"/search"}
          active
        />
        <NavButton
          source={require("@/assets/images/watchlist.png")}
          text="Watch List"
          link={"/watch_list"}
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
