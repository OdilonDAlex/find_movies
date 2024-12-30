import { color } from "@/constants/Colors";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { router, Router } from "expo-router";

type Props = {
    placeholder?: string
}

export default function SearchBar({placeholder, ...rest}: Props) {
  const [query, setQuery]: [string, (query: string) => void] = useState("");
  const updateQuery: (text: string) => void = (text: string) => {
    setQuery(text)
  }
  return (
    <View style={[styles.input, { backgroundColor: color.secondaryBG }]}>
    
      <TextInput
        style={styles.input_control}
        placeholder="search"
        placeholderTextColor={color.navText}
        onChangeText={updateQuery}
      >{placeholder ? placeholder : ""}</TextInput>
      <Pressable onPress={() => {
        router.push({
            pathname: '/search',
            params: {query: query}
        })
      }}>
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
    color: "white",
  },
});
