import { StyleSheet, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { color } from "@/constants/Colors";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import CustomText from "@/components/text";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const { query } = useLocalSearchParams()
  const movies: any[] = [];
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

      <SearchBar placeholder={query?.toString() ? query?.toString() : ""}/>

      {((query !== undefined) && movies.length === 0) ? (
        <View style={styles.body}>
          <Image
            width={76}
            height={76}
            source={require("@/assets/images/not_found.png")}
          ></Image>
          <CustomText variant="title">
            we are sorry, we can not find the movie :(
          </CustomText>
          <CustomText variant="menu">
            Find your movie by type title, category, years, etc
          </CustomText>
        </View>
      ) : 
      (
      <View style={styles.body}>
        <CustomText variant="menu">What is the name of the movie that you looking for ?</CustomText>
      </View>
        )  }

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

  body: {
    flex: 1,
    marginBottom: 78,
    alignItems: "center",
    justifyContent: "center",
  },
});
