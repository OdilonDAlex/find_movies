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

const movies = [
    {
        name: "Avengers",
        poster: require("@/assets/images/avengers.png"),
    },
    {
        name: "Adventurewithdog",
        poster: require("../assets/images/adventurewithdog.png"),
    },
    {
        name: "cidadeperdira",
        poster: require("../assets/images/cidadeperdira.png"),
    },
    {
        name: "doctorstrange",
        poster: require("../assets/images/doctorstrange.png"),
    },
    {
        name: "dumbledore",
        poster: require("../assets/images/sonic.png"),
    },
    {
        name: "image1",
        poster: require("../assets/images/dumbledore.png"),
    },
    {
        name: "image2",
        poster: require("../assets/images/image2.png"),
    },
    {
        name: "image4",
        poster: require("@/assets/images/avengers.png"),
    },
    {
        name: "sonic",
        poster: require("@/assets/images/sonic.png"),
    },
    {
        name: "sonic",
        poster: require("@/assets/images/image1.png"),
    },
    {
        name: "sonic",
        poster: require("@/assets/images/dumbledore.png"),
    },
];

export default function Index() {
    const [hide, setHide] = useState(false) as [
        boolean,
        (hide: boolean) => void
    ];
    const [loaded] = useFonts({
        roboto: require("@/assets/fonts/Roboto-Medium.ttf"),
    });

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (loaded) {
            timer = setTimeout(() => {
                setHide(true);
            }, 500);
        }

        return () => {
            timer ? clearTimeout(timer) : null;
        };
    }, [loaded]);

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
            <ScrollView>
                <CustomText
                    style={{ marginVertical: 20 }}
                    variant="home_text_header"
                >
                    What do you want to watch ?
                </CustomText>

                <SearchBar />

                <Recent></Recent>

                <Tab
                    tabs={["Upcoming", "Popular", "Recent", "Now Playing"]}
                ></Tab>

                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    data={movies}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
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
                                        borderRadius: 16
                                    }}
                                    width={100}
                                    height={145}
                                    resizeMode={"stretch"}
                                    source={item.poster}
                                />
                            </Pressable>
                        );
                    }}
                    keyExtractor={(item) => `${item.name}${item.poster}`}
                    numColumns={3}
                />

                <View style={
                    {
                        height: 78,
                        width: '100%'
                    }
                }>

                </View>
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
