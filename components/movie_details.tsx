import { StyleSheet, View, Text } from "react-native";
import MovieTitle from "./movie_title";
import MovieResume from "./move_resume";
import Tab from "./tab";

export default function MovieDetails() {
    return (
        <View style={styles.container}>
            <MovieTitle
                style={{
                    marginBottom: 20,
                }}
                title="Spiderman no way home"
            ></MovieTitle>

            <MovieResume />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});
