import { color } from "@/constants/Colors";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  ViewProps,
  ScrollView,
} from "react-native";

export default function Recent({children, ...rest}: ViewProps) {
  return (
    <View style={styles.container}>
        {children}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        >

      <Pressable
        style={styles.pressable}
        onPress={() => router.push({
          pathname: '/movie/[id]',
          params: {
            id: 'Avengers'
          }
        })}

      >
        <ImageBackground
          style={styles.button}
          width={144}
          height={210}
          source={require("@/assets/images/image1.png")}
        ></ImageBackground>

        <Text style={styles.number}>1</Text>
      </Pressable>

      <Pressable
        style={styles.pressable}
        onPress={() => console.log("Hello, world")}
      >
        <ImageBackground
          style={styles.button}
          width={144}
          height={210}
          source={require("@/assets/images/avengers.png")}
        ></ImageBackground>

        <Text style={styles.number}>2</Text>
      </Pressable>

      <Pressable
        style={styles.pressable}
        onPress={() => console.log("Hello, world")}
      >
        <ImageBackground
          style={styles.button}
          width={144}
          height={210}
          source={require("@/assets/images/sonic.png")}
        ></ImageBackground>

        <Text style={styles.number}>3</Text>
      </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexWrap: "wrap",
    marginVertical: 20,
    maxHeight: 210,
    justifyContent: "center",
    alignItems: "center",
    overflowX: "scroll",
  },

  button: {
    width: 144,
    height: 210,
  },

  pressable: {
    position: "relative",
    width: 144,
    height: 210,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },

  number: {
    position: 'absolute',
    fontSize: 72,
    color: color.borderColor,
    opacity: .4,
    left: -10,
    bottom: -30
  },
});
