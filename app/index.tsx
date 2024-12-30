import { StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { color } from "@/constants/Colors";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import CustomText from "@/components/text";


export default function Index() {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.primaryBG}]}>

      <CustomText style={{marginVertical: 20}} variant="home_text_header">What do you want to watch ?</CustomText>

        <SearchBar/>

      <NavBar
        style={{
          borderColor: color.borderColor,
          backgroundColor: color.primaryBG,
        }}
      >
        <NavButton
          source={require("@/assets/images/home_active.png")}
          text="Home"
          link={"/"}
          active
        />
        <NavButton
          source={require("@/assets/images/search.png")}
          text="Search"
          link={"/search"}
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
        paddingHorizontal: 30
    },
})