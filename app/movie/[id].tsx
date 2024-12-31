import Header from "@/components/header";
import { color } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieDetails from "@/components/movie_details";
import Tab from "@/components/tab";

export default function Show() {
    const { id } = useLocalSearchParams();
    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: color.primaryBG,
                },
            ]}
        >
            <Header title={"Details"} style={{ paddingHorizontal: 20 }}>
                <Image
                    source={require("@/assets/images/watchlisted.png")}
                ></Image>
            </Header>
            <ImageBackground
                style={{
                    width: "100%",
                    height: 210,
                }}
                height={210}
                source={require("@/assets/images/image4.png")}
            ></ImageBackground>

            <MovieDetails></MovieDetails>

            <Tab
                style={{
                    alignSelf: "center",
                    marginVertical: 30
                }}
                tabs={["About Movie", "Reviews", "Cast"]}
            ></Tab>

            <View style={styles.tab}>
                <Text style={styles.description}>
                From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    tab: {
        flex: 1,
        paddingHorizontal: 30
    },
    description: {
        textAlign: 'justify',
        fontSize: 12,
        color: 'white'
    }
});
