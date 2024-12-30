import { color } from "../constants/Colors";
import { Children } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewProps,
  Image,
} from "react-native";
import CustomText from "./text";
import { router } from "expo-router";

type Props = ViewProps & { title: string };
export default function Header({ children, title, style, ...rest }: Props) {
  return (
    <View
      {...rest}
      style={[style, styles.header, { backgroundColor: color.primaryBG }]}
    >
      <Pressable
        style={{
          width: 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={
          router.canGoBack()
            ? () => {
                router.back();
              }
            : null
        }
      >
        <Image
          source={require("@/assets/images/arrow-left.png")}
          width={36}
          height={36}
        ></Image>
      </Pressable>
      <CustomText variant="title">{title}</CustomText>
      {children ? (
        children
      ) : (
        <View style={{ width: 36, height: 36, backgroundColor: "red" }}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
    alignSelf: "stretch",
    height: 36,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
