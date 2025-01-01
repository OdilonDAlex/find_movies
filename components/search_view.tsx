import { Text, View, Image, StyleSheet, ViewProps } from "react-native";
import CustomText from "./text";
import Row from "./row";
import { GENRES } from "@/constants/API";

type Props = ViewProps & {
    id: number,
    title: string,
    rate: number | string,
    category: number[],
    date: string,
    original_language: string,
    poster: any
}

export default function SearchView({id, title, rate, date, category, original_language, style, poster, ...rest}: Props) {

    let category_: string[] = []
    for(let id of category){
        for(let cat of GENRES){
            if(cat.id == id){
                category_.unshift(cat.name)
            }
        }
    }


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
                source={{
                    uri: poster
                }}
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
                        text={parseFloat(rate.toString()).toFixed(2).toString()}
                        variant="rate"
                        source={require("@/assets/images/star_rate.png")}
                    />
                    <Row
                        text={category_.join(', ')}
                        variant="menu"
                        source={require("@/assets/images/ticket.png")}
                    />
                    <Row
                        text={date}
                        variant="menu"
                        source={require("@/assets/images/calendar.png")}
                    />
                    <Row
                        text={`original language: ${original_language.toString().toUpperCase()}`}
                        variant="menu"
                        source={require("@/assets/images/info.png")}
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
