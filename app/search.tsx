import {
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import { color } from "@/constants/Colors";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import CustomText from "@/components/text";
import { router, useLocalSearchParams } from "expo-router";
import SearchView from "@/components/search_view";
import useFetch from "@/hooks/api_managements";
import {
    DEFAULT_GET_OPTIONS,
    GENRES,
    getImage,
} from "@/constants/API";
import { useEffect, useState } from "react";
import { setOptions } from "expo-splash-screen";

type Movie = {
    id: number,
    title: string;
    rate: number;
    category: string;
    date: string;
    long: string;
    poster: any;
};

type Genre = {
    id: string | number,
    name: string
}


export default function Search() {
    const { query } = useLocalSearchParams();
    const [newQuery, setNewQuery] = useState(query)
    const [hide, setHide] = useState(false);
    const { data, isFetching } = useFetch(
        `search/movie?query=${query}`,
        ["search", query.toString()],
        DEFAULT_GET_OPTIONS
    );

    const movies = data?.results?.map(
        (movie: {
            [key: string]:
                | string
                | { id: number | string; name: string; [key: string]: any };
        }) => {
            return {
                id: movie.id,
                title: movie.title,
                rate: movie.vote_average,
                category: movie.genre_ids,
                date: movie.release_date,
                original_language: movie.original_language,
                poster: getImage(
                    (movie.poster_path ?? movie.backdrop_path) as any
                ),
            };
        }
    );

    useEffect(() => {
        if (!isFetching) {
            setHide(true);
        }
    });

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: color.primaryBG }]}
        >
            <Header title="Search" style={{ marginBottom: 10 }}>
                <Image
                    source={require("@/assets/images/info.png")}
                    width={36}
                    height={36}
                ></Image>
            </Header>

            <SearchBar
                placeholder={query?.toString() ? query?.toString() : ""}
            />

            {hide === false ? (
                <ActivityIndicator style={{
                    marginTop: 20
                }}/>
            ) : query !== undefined && movies?.length === 0 ? (
                <View style={styles.body}>
                    <Image
                        width={76}
                        height={76}
                        source={require("@/assets/images/not_found.png")}
                    ></Image>
                    <CustomText variant="title">
                        we are sorry, we can not find the movie :(
                    </CustomText>
                    <CustomText variant="menu">
                        Find your movie by type title, category, years, etc
                    </CustomText>
                </View>
            ) : query === undefined ? (
                <View style={styles.body}>
                    <CustomText variant="menu">
                        What is the title of the movie that you looking for ?
                    </CustomText>
                </View>
            ) : (
                <FlatList
                    style={{
                        marginTop: 20,
                    }}
                    contentContainerStyle={{
                        gap: 20,
                    }}
                    data={movies}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/movie/[id]",
                                        params: {
                                            id: item.id,
                                        },
                                    })
                                }
                            >
                                <SearchView {...item} />
                            </Pressable>
                        );
                    }}
                    keyExtractor={(item) => `${item.id}`}
                    numColumns={1}
                />
            )}

                <View
                    style={{
                        height: 78,
                        width: "100%",
                    }}
                ></View>

            <NavBar
                style={{
                    borderColor: color.borderColor,
                    backgroundColor: color.primaryBG,
                }}
            >
                <NavButton
                    source={require("@/assets/images/home.png")}
                    text="Home"
                    link={"/"}
                />
                <NavButton
                    source={require("@/assets/images/search_active.png")}
                    text="Search"
                    link={"/search"}
                    active
                />
                <NavButton
                    source={require("@/assets/images/watchlist.png")}
                    text="Watch List"
                    link={"/watch_list"}
                />
            </NavBar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    body: {
        flex: 1,
        marginBottom: 78,
        alignItems: "center",
        justifyContent: "center",
    },
});
