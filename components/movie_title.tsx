import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ViewProps, Image } from "react-native";
import { ColorSpace } from "react-native-reanimated";
import CustomText from "./text";
import { Dimensions } from "react-native";

type Props = ViewProps & {
    title: string;
};

export default function MovieTitle({ title, style, ...rest }: Props) {
    const titleRef = useRef<View>();
    const [position, setPosition] = useState<null | {
        top: number;
        left: number;
    }>();

    const [showPoster, setShowPoster] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            titleRef.current?.measureInWindow((x, y, width, height) => {
                setPosition({
                    top: - 115 + height,
                    left: x - 105,
                });

                console.log(Dimensions.get('window').width)
                setShowPoster(true);
            });
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, []);

    return (
        <View {...rest} style={[styles.title_container, style]}>
            <CustomText ref_={titleRef as React.MutableRefObject<View>}  style={{
                marginLeft: 115,
                fontSize: 30,
                marginTop: 5
            } as any} variant="home_text_header" >{title}</CustomText>
            {showPoster ? (
                <Image
                    style={[
                        styles.floating_image,
                        {
                            ...position,
                        },
                    ]}
                    source={require("@/assets/images/avengers.png")}
                />
            ) : undefined}
        </View>
    );
}

const styles = StyleSheet.create({
    title_container: {
        position: 'static',
    },

    floating_image: {
        position: "absolute",
        height: 120,
        width: 95,
    },
});
