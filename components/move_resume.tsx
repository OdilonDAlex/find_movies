import { StyleSheet, View,  Text, Image } from "react-native";
import CustomText from "./text";
import { color } from "@/constants/Colors";

export default function MovieResume(){
    return (
        <View style={styles.container}>
            <View style={[styles.item, {
                borderRightColor: color.borderBottom,
                borderRightWidth: 1,
                borderStyle: 'solid'
            }]}>
                <Image
                    source={require('@/assets/images/calendar.png')}
                />
                <CustomText variant="menu">2021</CustomText>
            </View>
            <View style={[styles.item, {
                borderRightColor: color.borderBottom,
                borderRightWidth: 1,
                borderStyle: 'solid'
            }]}>
                <Image
                    source={require('@/assets/images/clock.png')}
                />
                <CustomText variant="menu">148 Minutes</CustomText>
            </View>
            <View style={styles.item}>
                <Image
                    source={require('@/assets/images/ticket.png')}
                />
                <CustomText variant="menu">Action</CustomText>
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