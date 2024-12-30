import { View, ViewProps, Text, StyleSheet, ImageSourcePropType} from "react-native";
import NavButton from "./navbutton";


export default function NavBar({style, children, ...rest}: ViewProps) {
  return (
    <View style={[styles.navbar, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
    navbar: {
        borderTopWidth: 1, 
        height: 78,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'red'
    }
})
