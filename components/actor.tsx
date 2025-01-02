import {
    View,
    Image,
    StyleSheet,
    ViewProps,
    ActivityIndicator,
    Text,
    FlatList,
    ViewStyle,
} from "react-native";
import CustomText from "./text";
import {useFetch} from "@/hooks/api_managements";
import { DEFAULT_GET_OPTIONS, getImage } from "@/constants/API";
import { useEffect, useState } from "react";

type Props = ViewProps & {
    movie_id: string | number;
};
export default function Actor({ movie_id, ...rest }: Props) {
    const [hide, setHide] = useState(false);
    const { data, isFetching } = useFetch(
        `movie/${movie_id}/credits`,
        ["movie", "credits", movie_id.toString()],
        DEFAULT_GET_OPTIONS
    );

    const casts = data?.cast?.map((cast: { [key: string]: string | number }) => {
        return { name: cast.name, profile_path: cast.profile_path };
    });

    useEffect(() => {
        if (!isFetching) {
            setHide(true);
        }
    }, [isFetching]);
    return (isFetching ? <ActivityIndicator/> : <FlatList
            data={casts}
            renderItem={({item}) => <ActorItem {...item}/>}
            numColumns={2}
        />);
}

function ActorItem({name, profile_path}: {name: string, profile_path: string}) {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50
                }}
                resizeMode={"stretch"}
                width={100}
                height={100}
                source={{
                    uri: getImage(profile_path)
                }}
            ></Image>
            <CustomText
                variant="title"
                style={{
                    alignSelf: "center",
                    width: 100,
                    textAlign: "center",
                    marginTop: 5,
                    height: 50
                } as ViewStyle}
            >
                {name}
            </CustomText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "49%",
        margin: 5
    },
});
