import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewProps,
} from "react-native";
import { color } from "@/constants/Colors";

type Props = ViewProps & {
  variant: string;
};

export default function CustomText({
  variant,
  children,
  style,
  ...rest
}: Props) {
  type styleType = [string, { [key: string]: string | number }];

  const getStyle: (variant: string) => styleType | undefined = (
    variant: string
  ): styleType | undefined => {
    const asArray: styleType[] = Object.entries(styles);
    return asArray.find((e) => e[0] === variant);
  };

  let textStyle = getStyle(variant);
  return (
    <Text
      {...rest}
                                                            // pour eviter l'erreur de ts
      style={[textStyle ? (textStyle[1] as TextStyle) : null, style as any]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  menu: {
    fontWeight: "medium",
    fontSize: 12,
    color: color.navText,
  },
  title: {
    fontWeight: 500,
    fontSize: 16,
    color: color.title,
    textTransform: "capitalize",
  },

  home_text_header: {
    fontSize: 18,
    fontWeight: 500,
    color: "white",
  },
});
