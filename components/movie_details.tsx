import { StyleSheet, View, Text } from "react-native";
import MovieTitle from "./movie_title";
import MovieResume from "./move_resume";
import Tab from "./tab";

type Props = {
    title: string,
    uri: string,
    long?: string,
    date?: string,
    category?: {id: number, name: string, [key: string]: string | number}[]
}

export default function MovieDetails({title, uri, long, date, category, ...rest}: Props) {
    
    return (
        <View {...rest} style={styles.container}>
            <MovieTitle uri={uri}
                style={{
                    marginBottom: 20,
                }}
                title={title}
            ></MovieTitle>

            <MovieResume 
                long={long}
                date={date}
                category={category}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});
