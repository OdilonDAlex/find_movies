import { Link, RelativePathString, router } from "expo-router";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, ViewProps } from "react-native";
import CustomText from "./text";
import { color } from "@/constants/Colors";

type Props = ViewProps & {
    text: string,
    active?:boolean,
    source: ImageSourcePropType | any,
    link: any,

}

export default function NavButton({text, source, active, link, ...rest}: Props){
    return (
            <Pressable style={styles.button} onPress={ () => router.replace(link) } {...rest}>
                <Image
                    width={24}
                    height={24}
                    source={source}
                    style={{marginBottom: 7}}
                />
                <CustomText variant="menu" style={active ? { color: color.active } as any : {} }>{text}</CustomText>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        'alignItems': 'center'
    }
})