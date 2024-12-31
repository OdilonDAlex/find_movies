import { Text, View, Image, StyleSheet, ViewProps } from "react-native";
import CustomText from "./text";
import Row from "./row";

type Props = ViewProps & {
    title: string,
    rate: number | string,
    category: string,
    date: string,
    length: string,
    poster: any
}

export default function SearchView({title, rate, date, category, length, style, poster, ...rest}: Props) {
    return (
        <View style={[styles.container, style]} {...rest}>
            <Image
                width={95}
                height={120}
                style={{
                    height: 120,
                    width: 95,
                    borderRadius: 16,
                }}
                resizeMode={"contain"}
                source={poster}
            />

            <View style={styles.details}>
                <CustomText
                    variant="home_text_header"
                    style={{
                        marginBottom: 10,
                    }}
                >
                    {title}
                </CustomText>

                <View style={{
                    marginBottom: 2
                }}>
                    <Row
                        text={rate.toString()}
                        variant="rate"
                        source={require("@/assets/images/star_rate.png")}
                    />
                    <Row
                        text={category}
                        variant="menu"
                        source={require("@/assets/images/ticket.png")}
                    />
                    <Row
                        text={date}
                        variant="menu"
                        source={require("@/assets/images/calendar.png")}
                    />
                    <Row
                        text={length}
                        variant="menu"
                        source={require("@/assets/images/clock.png")}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    details: {
        flexGrow: 2,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
});
