import {
    StyleSheet,
    Text,
    Image,
    Pressable,
    ImageBackground,
    ImageSourcePropType,
    View,
    ScrollView,
    FlatList,
    Touchable,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { color } from "@/constants/Colors";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import CustomText from "@/components/text";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SplashScreen from "./splash";
import Recent from "@/components/recent";
import Tab from "@/components/tab";
import useFetch from "@/hooks/api_managements";
import { router } from "expo-router";

const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzM3YzM4MjMwZDI3NDNhODE1YzRjZTlkNGM3NGVjOSIsIm5iZiI6MTczNTQ1NDUxMC41NjksInN1YiI6IjY3NzBlZjJlMDVjNDZhYjNmYzkyN2Q1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4PcA0qIztiTibpzL6gIf9KdH0_udksETGRHOlIlDgSw";

const tabsName = ["Upcoming", "Popular", "Top Rated", "Now Playing"];

export default function Index() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [hide, setHide] = useState(false) as [
        boolean,
        (hide: boolean) => void
    ];
    const [loaded] = useFonts({
        roboto: require("@/assets/fonts/Roboto-Medium.ttf"),
    });

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + API_KEY,
        },
    };
    const { data, isFetching } = useFetch(
        `movie/${currentTab.replace(" ", "_").toLowerCase()}`,
        [currentTab],
        options
    );

    const count = data?.results.length
    const movies = data?.results.map((movie: {[key: string]: string | number | Object }) => {
        return {
            id: movie.id,
            poster: movie.poster_path,
            // backdrop: movie.backdrop_path,
            // category: movie.genres,
            // description: movie.overview,
            // date: movie.realise_date,
        };
    })

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (loaded && !isFetching) {
            timer = setTimeout(() => {
                setHide(true);
            }, 500);
        }

        return () => {
            timer ? clearTimeout(timer) : null;
        };
    }, [loaded, isFetching]);

    type Movie = {
        image: string;
    };

    const recents: Movie[] = [
        {
            image: "sonic",
        },
        {
            image: "avengers",
        },
        {
            image: "cidadeperdira",
        },
    ];

    return hide ? (
        <SafeAreaView
            style={[styles.container, { backgroundColor: color.primaryBG }]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomText
                    style={{ marginVertical: 20 }}
                    variant="home_text_header"
                >
                    What do you want to watch ?
                </CustomText>

                <SearchBar />

                {isFetching ? <ActivityIndicator/> :  <Recent 
                    movies={movies.slice(0, 3)}
                    />}

                <Tab
                    currentTab={currentTab}
                    changeCurrentTab={setCurrentTab}
                    tabs={tabsName}
                ></Tab>

                {isFetching ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        data={movies.slice(3, count - (count % 3))}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => router.push({
                                        pathname:'/movie/[id]',
                                        params: {id: item.id}
                                    })}
                                    style={{
                                        width: 100,
                                        height: 145,
                                        margin: 10,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: 145,
                                            width: 100,
                                            borderRadius: 16,
                                        }}
                                        width={100}
                                        height={145}
                                        resizeMode={"stretch"}
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500/${item.poster}`,
                                        }}
                                    />
                                </Pressable>
                            );
                        }}
                        keyExtractor={(item) => `${item.name}${item.poster}`}
                        numColumns={3}
                    />
                )}

                <View
                    style={{
                        height: 78,
                        width: "100%",
                    }}
                ></View>
            </ScrollView>
            <NavBar
                style={{
                    borderColor: color.borderColor,
                    backgroundColor: color.primaryBG,
                }}
            >
                <NavButton
                    source={require("@/assets/images/home_active.png")}
                    text="Home"
                    link={"/"}
                    active
                />
                <NavButton
                    source={require("@/assets/images/search.png")}
                    text="Search"
                    link={"/search"}
                />
                <NavButton
                    source={require("@/assets/images/watchlist.png")}
                    text="Watch List"
                    link={"/watch_list"}
                />
            </NavBar>
        </SafeAreaView>
    ) : (
        <SplashScreen />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    button: {
        width: 144,
        height: 210,
    },

    pressable: {
        position: "relative",
        width: 144,
        height: 210,
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
