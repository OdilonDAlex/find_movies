import { View, Image, ViewProps } from "react-native";
import CustomText from "./text";

type Props = ViewProps & {
    text: string,
    source: any,
    variant: string
}

export default function Row({text, source, variant}: Props) {
    return (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            <Image
                style={{
                    width: 16,
                    height: 16,
                    marginRight: 5,
                }}
                width={16}
                height={16}
                source={source}
            />
            <CustomText variant={variant}>{text}</CustomText>
        </View>
    );
}
