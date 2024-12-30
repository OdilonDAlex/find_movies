import { Link, RelativePathString, router } from "expo-router";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, ViewProps } from "react-native";
import CustomText from "./text";

type Props = ViewProps & {
    text: string,
    active?:boolean,
    source: ImageSourcePropType | any,
    link: any,
}

export default function NavButton({text, source, active, link, ...rest}: Props){
    return (
            <Pressable style={styles.button} onPress={ router.canGoBack() ?  () => router.replace(link) : null} {...rest}>
                <Image
                    width={24}
                    height={24}
                    source={source}
                    style={{marginBottom: 7}}
                />
                <CustomText variant="menu">{text}</CustomText>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        'alignItems': 'center'
    }
})