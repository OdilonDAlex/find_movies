import Header from "@/components/header";
import { color } from "@/constants/Colors";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import CustomText from "@/components/text";

export default function WatchList() {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.primaryBG }]}
    >
      <Header title="Watch list">
        <Image source={require("@/assets/images/watchlist.png")}></Image>
      </Header>

      <View style={styles.body}>
        <Image
          width={76}
          height={76}
          source={require("@/assets/images/no_watchlist.png")}
        ></Image>
        <CustomText variant="title">There is no movie yet!</CustomText>
        <CustomText variant="menu">
          Find your movie by type title, category, years, etc
        </CustomText>
      </View>

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

  body: {
    flex: 1,
    marginBottom: 78,
    alignItems: "center",
    justifyContent: "center",
  },
});
