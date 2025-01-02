import {
    ViewProps,
    View,
    ViewStyle,
    FlatList,
    ActivityIndicator,
    Text
} from "react-native";
import CustomText from "./text";
import { useFetch } from "@/hooks/api_managements";
import { DEFAULT_GET_OPTIONS } from "@/constants/API";

type ReviewType = {
    author: string;
    review: string;
    id: string;
};

type Res = {
    author: string;
    content: string;
    [key: string]: string | Object;
};

export default function Reviews({ id, ...rest }: ViewProps & { id: string }) {
    const { data, isFetching } = useFetch(
        `movie/${id}/reviews`,
        ["reviews", id],
        DEFAULT_GET_OPTIONS
    );

    const reviews = data?.results.map((res: Res) => {
        return {
            author: res.author,
            review: res.content,
            id: res.id
        };
    });

    return isFetching ? (
        <ActivityIndicator />
    ) : (
        <FlatList
            style={{
                flex: 1,
            }}
            data={reviews}
            renderItem={({ item }) => (
                <Review author={item.author} review={item.review} />
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

function Review({
    author,
    review,
}: ViewProps & { author: string; review: string }) {
    return (
        <View style={{
            marginBottom: 30
        }}>
            <CustomText variant="title">{author}</CustomText>
            <Text
                style={
                    {
                        fontWeight: "normal",
                        justifyContent: 'center',
                        color: 'white'
                    }
                }
            >
                {review}
            </Text>
        </View>
    );
}
