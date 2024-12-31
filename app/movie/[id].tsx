import Header from "@/components/header";
import { color } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
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
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
    },
};
