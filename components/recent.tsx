import { getImage } from "@/constants/API";
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

type Props = ViewProps & {
    movies: any[] | undefined;
    account_id: string | number
};

export default function Recent({ account_id, children, movies, ...rest }: Props) {
    return (
        <View style={styles.container}>
            {children}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >

                {movies?.map((movie) => (
                    <View key={movie.id}>
                        <Pressable
                            style={styles.pressable}
                            onPress={() => router.push({
                              pathname: '/movie/[id]',
                              params: {
                                id: movie.id,
                                account_id: account_id
                              }
                            })}
                        >
                            <ImageBackground
                                style={styles.button}
                                width={144}
                                height={210}
                                source={{
                                  uri: getImage(movie.poster)
                                }}
                            ></ImageBackground>
                        </Pressable>

                    </View>
                ))}
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
        overflow: "hidden",
    },

    number: {
        position: "absolute",
        fontSize: 72,
        color: color.borderColor,
        opacity: 0.4,
        left: -10,
        bottom: -30,
    },
});
