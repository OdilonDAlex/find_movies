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
import { useFetch, useInfiniteFetch } from "@/hooks/api_managements";
import { router } from "expo-router";
import { DEFAULT_GET_OPTIONS } from "@/constants/API";

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

    const { data, isFetching, fetchNextPage } = useInfiniteFetch(
        `movie/${currentTab.replace(" ", "_").toLowerCase()}`,
        [currentTab],
        DEFAULT_GET_OPTIONS
    );

    const movies = data?.pages
        .flatMap((page) => page.results)
        .map((movie: any) => {
            return {
                id: movie.id,
                poster: movie.poster_path,
                // backdrop: movie.backdrop_path,
                // category: movie.genres,
                // description: movie.overview,
                // date: movie.realise_date,
            };
        });
    // const count = data?.results?.length;
    // const movies = data?.results?.map(

    //     }
    // );

    const {data: data_, isFetching: fetching} = useFetch('account', ['account'], DEFAULT_GET_OPTIONS)
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

                <Recent account_id={data_?.id} movies={movies?.slice(0, 5)} />
                <Tab
                    currentTab={currentTab}
                    changeCurrentTab={setCurrentTab}
                    tabs={tabsName}
                    
                ></Tab>

                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    data={movies?.slice(5, 100)}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/movie/[id]",
                                        params: { id: item.id as string | number },
                                    })
                                }
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
                    keyExtractor={(item) => `${item.id}`}
                    ListFooterComponent={<ActivityIndicator />}
                    onEndReached={async () => {
                        await setTimeout(() => {
                            fetchNextPage()
                        }, 2000);
                    }}
                    numColumns={3}
                />

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
                    params={{
                        id: data_?.id
                    }}
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
