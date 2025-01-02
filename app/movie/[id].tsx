import Header from "@/components/header";
import { color } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieDetails from "@/components/movie_details";
import Tab from "@/components/tab";
import { useFetch, usePost } from "@/hooks/api_managements";
import {
    DEFAULT_GET_OPTIONS,
    DEFAULT_POST_OPTIONS,
    getImage,
} from "@/constants/API";
import Actor from "@/components/actor";
import Reviews from "@/components/reviews";

const tabNames = ["About Movie", "Reviews", "Cast"];

export default function Show() {
    const [added, setAdded] = useState(false);
    const [currentTab, setCurrentTab] = useState(tabNames[0]);
    const { id, account_id } = useLocalSearchParams();
    const [hide, setHide] = useState(false);
    const { data, isFetching } = useFetch(
        `movie/${id}`,
        ["movies", id.toString()],
        DEFAULT_GET_OPTIONS
    );

    const icon = added
        ? require("@/assets/images/watchlisted.png")
        : require("@/assets/images/watchlist.png");

    useEffect(() => {
        if (!isFetching) {
            setHide(true);
        }
    }, [isFetching]);

    const {
        data: results,
        mutate: addToWatchList,
        isSuccess,
    } = usePost(
        `account/${account_id}/watchlist`,
        {
            body: JSON.stringify({
                media_type: "movie",
                media_id: data?.id,
                watchlist: false,
            }),
        },
        ["watchlist", "add", data?.id.toString()],
        DEFAULT_POST_OPTIONS
    );

    useEffect(() => {
        if (isSuccess) {
            setAdded(true);
        }
    }, [isSuccess]);

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
                <Pressable
                    onPress={() => {
                        addToWatchList();
                    }}
                >
                    <Image
                        source={icon}
                    ></Image>
                </Pressable>
            </Header>

            {isFetching ? (
                <ActivityIndicator />
            ) : (
                <>
                    <ImageBackground
                        style={{
                            width: "100%",
                            height: 210,
                        }}
                        height={210}
                        source={{
                            uri: getImage(
                                data?.backdrop_path ?? data?.poster_path
                            ),
                        }}
                    ></ImageBackground>

                    <MovieDetails
                        date={data?.release_date.split("-").at(0)}
                        category={data?.genres}
                        title={data?.title}
                        long={`${data?.runtime} Minutes`}
                        uri={getImage(data?.poster_path ?? data?.backdrop_path)}
                    ></MovieDetails>

                    <Tab
                        currentTab={currentTab}
                        changeCurrentTab={setCurrentTab}
                        style={{
                            alignSelf: "center",
                            marginVertical: 30,
                        }}
                        tabs={tabNames}
                    ></Tab>

                    <View style={styles.tab}>
                        {currentTab === "About Movie" ? (
                            <Text style={styles.description}>
                                {data?.overview}
                            </Text>
                        ) : undefined}
                        {currentTab === "Reviews" ? (
                            <Reviews id={id.toString()} />
                        ) : undefined}
                        {currentTab === "Cast" ? (
                            <Actor movie_id={id.toString()} />
                        ) : undefined}
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    tab: {
        flex: 1,
        paddingHorizontal: 30,
    },
    description: {
        textAlign: "justify",
        fontSize: 12,
        color: "white",
    },
});
