import Header from "@/components/header";
import { color } from "@/constants/Colors";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import NavBar from "@/components/navbar";
import NavButton from "@/components/navbutton";
import CustomText from "@/components/text";
import { useFetch } from "@/hooks/api_managements";
import { DEFAULT_GET_OPTIONS, getImage } from "@/constants/API";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import SearchView from "@/components/search_view";

export default function WatchList() {
    const { id } = useLocalSearchParams();
    
    const { data, isFetching } = useFetch(
        `account/${id}/watchlist/movies`,
        ["watchlist", id.toString()],
        DEFAULT_GET_OPTIONS
    );

    const count = data?.results.length;
    const movies = data?.results.map(
        (movie: { [key: string]: string | Object }) => {
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
    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: color.primaryBG }]}
        >
            <Header title="Watch list">
                <Image
                    source={require("@/assets/images/watchlist.png")}
                ></Image>
            </Header>

            {count > 0 ? (
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
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                />
            ) : (
                <View style={styles.body}>
                    <Image
                        width={76}
                        height={76}
                        source={require("@/assets/images/no_watchlist.png")}
                    ></Image>
                    <CustomText variant="title">
                        There is no movie yet!
                    </CustomText>
                    <CustomText variant="menu">
                        Find your movie by type title, category, years, etc
                    </CustomText>
                </View>
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
                    source={require("@/assets/images/search.png")}
                    text="Search"
                    link={"/search"}
                />
                <NavButton
                    source={require("@/assets/images/watchlist_active.png")}
                    text="Watch List"
                    link={"/watch_list"}
                    active
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
