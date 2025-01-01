import { StyleSheet, View,  Text, Image } from "react-native";
import CustomText from "./text";
import { color } from "@/constants/Colors";

type Props = {
    date?: string,
    long?: string,
    category?: {id: number, name: string, [key: string]: string | number}[]
}

export default function MovieResume({date, long, category, ...rest}: Props){
    const category_ = category?.slice(0, 2)?.map((cat) => {
        return cat.name
    }).join(', ')

    return (
        <View  {...rest} style={styles.container}>
            <View style={[styles.item, {
                borderRightColor: color.borderBottom,
                borderRightWidth: 1,
                borderStyle: 'solid'
            }]}>
                <Image
                    source={require('@/assets/images/calendar.png')}
                />
                <CustomText variant="menu">{date ?? 'Inconnue'}</CustomText>
            </View>
            <View style={[styles.item, {
                borderRightColor: color.borderBottom,
                borderRightWidth: 1,
                borderStyle: 'solid'
            }]}>
                <Image
                    source={require('@/assets/images/clock.png')}
                />
                <CustomText variant="menu">{long ?? 'Inconnue'}</CustomText>
            </View>
            <View style={styles.item}>
                <Image
                    source={require('@/assets/images/ticket.png')}
                />
                <CustomText variant="menu">{category_ ?? 'Inconnue'}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexGrow: 1
    }
})