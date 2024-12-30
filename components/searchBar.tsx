import { color } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

export default function SearchBar() {
  return (
    <View style={[styles.input, { backgroundColor: color.secondaryBG }]}>
      <TextInput
        style={styles.input_control}
        placeholder="search"
        placeholderTextColor={color.navText}
      ></TextInput>
      <Pressable>
        <Image
          height={36}
          width={36}
          source={require("@/assets/images/search.png")}
        ></Image>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    position: "relative",
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  input_control: {
    alignSelf: "stretch",
    width: "auto",
    backgroundColor: "transparent",
    flexGrow: 1,
  },
});
