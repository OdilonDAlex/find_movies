import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ViewProps,
} from "react-native";
import CustomText from "./text";
import { color } from "@/constants/Colors";
import { useState } from "react";

type Props = ViewProps & {
    tabs: string[]
};

export default function Tab({ tabs, style,...rest }: Props) {
    const [active, setActive]: [string, (active: string) => void] = useState(tabs[0])
    return (
        <View {...rest} style={[styles.tabs, style]}>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
                {tabs ? (
                    tabs.map((tab) => (
                        <Pressable
                            key={tab}
                            style={
                                [tab === active
                                    ? {
                                          borderBottomColor: color.borderBottom,
                                          borderBottomWidth: 4,
                                          borderStyle: "solid",
                                      }
                                    : {}, {
                                        marginHorizontal: 10,
                                        // paddingBottom: 1
                                    }]
                            }
                        
                        onPress={() => {
                            setActive(tab)
                        }}
                        >
                            <CustomText variant="title">{tab}</CustomText>
                        </Pressable>
                    ))
                ) : (
                    <Text>no tabs...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tabs: {
        flex: 1,
        marginVertical: 15,
        minHeight: 38,
        maxHeight: 38,
        gap: 10,
    },

    pressable_text: {},
});
